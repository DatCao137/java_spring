import { axios } from '@/lib/axios';
import { toast } from 'react-toastify';
import { HttpStatusCode } from 'axios';
import ErrorManager from '@/features/blc-common/utils/ErrorManager';

export interface ServerRequestProps {
    apiPath: string;
    params: {};
    onSuccess?: (res: any, params: any) => void;
    onError?: (err: any) => void;
    onValidation?: (err:any) => void;
    message?: string;
    errMessage?: string;
}

const statusCheck = (res: any,
    param: ServerRequestProps
) => {
    switch (res.status) {
        case HttpStatusCode.Ok:
            param.message && toast.success(param.message);
            param.onSuccess && param.onSuccess(res, param.params);
            return;
        case HttpStatusCode.NotFound:
            toast.info("対象が見つかりませんでした。");
            param.onSuccess && param.onSuccess(res, param.params);
            return;
        case HttpStatusCode.UnprocessableEntity:
            if(param.onValidation) {
                param.onValidation(res);
            } else {
                toast.error("検証エラーが発生しました。");
            }
            return;
        case HttpStatusCode.Conflict:
            toast.error("他のユーザに更新されています。");
            return;
        default:
            ErrorManager.showErrors(res.response?.data ? res.response.data : res);
            param.onError && param.onError(res);
    }
}

export const Post = async (param: ServerRequestProps) => {
    let headers = {};
    if(param.apiPath == "/api/doc/file/save"||param.apiPath == "/api/employee/save") {
        headers = {
            "Content-Type": "multipart/form-data",
            };
    }

    await axios.post(param.apiPath, param.params, { headers })
        .then((res) => {
            statusCheck(res, param);
        })
        .catch((err) => {
            statusCheck(err, param);
        });
}

export const Get = async (param: ServerRequestProps) => {
    await axios.get(param.apiPath, param.params)
        .then((res) => {
            statusCheck(res, param);
        })
        .catch((err) => {
            statusCheck(err, param);
        });
}

export const Del = async (param: ServerRequestProps) => {
    await axios.delete(param.apiPath, param.params)
        .then((res) => {
            if(!param.message)
                param.message = "削除しました";
            statusCheck(res, param);
        })
        .catch((err) => {
            var mes = param.errMessage ? param.errMessage : "削除に失敗しました。";

            toast.error(mes + err.message ? "(" + err.message + ")" : "");
            console.error(err.message);
            param.onError && param.onError(err);
        })
}