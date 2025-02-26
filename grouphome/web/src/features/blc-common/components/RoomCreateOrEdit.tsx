import { useEffect, useState } from "react";
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { roomManage as ApiPathGet,
         roomManageIsFree as ApiPathIsFree,
         roomManageSave as ApiPathSave,
         roomManageDelete as ApiPathDelete } from '@/features/blc-common/assets/ApiPath';

import { Post, Del } from "@/features/blc-common/utils/ServerRequest";
import { CommonInput } from "@/components/elements/common/CommonInput";
import { setValue } from "@/components/elements/common/CommonUtils";

export interface RoomForm {
    id: number|undefined;
    customerId?: number|undefined;
    roomId?: number|undefined;
    unitId?: number|undefined;
    moveinAt: String|undefined;
    leavingAt?: String|undefined;
    categoryId?: number|undefined;
    updatedAt?: string|undefined;
}

interface props {
    onClose: () => void;
    roomForm: RoomForm;
}

export const RoomCreateOrEdit = ({
    onClose, roomForm
}: props) => {
    const [ form, setForm ] = useState<RoomForm>(roomForm);
    const [ title, setTitle ] = useState<string>("");
    const [ confirmParam, setConfirmParam ] = useState<PopupConfirmParams>({
        isOpen: false,
        textConfirm: 'OK',
        message: '',
        isShowCancel: true,
        confirmAction: () => { },
        onClose: () => handleCloseConfirm()
      });

    const handleInputChange = (e: any) => {
        setValue<RoomForm>(e, setForm);
    };
      
    const handleCloseConfirm = () => {
        setConfirmParam((prev: any) => ({
          ...prev,
          isOpen: false
        }));
    };

    const editConfirm = () => {
        Post({
            apiPath: ApiPathIsFree,
            params: { roomId: form.roomId, customerId: form.customerId, startDate: form.moveinAt, endDate: form.leavingAt },
            onSuccess: (res) => {
                let data = res.data.data;
                let startDate = data.startDate;
                let mes = "";
                let limitDate:string;
                if(data.isFree) {
                    mes = (form.leavingAt)
                        ? `${form.moveinAt}から${form.leavingAt}の利用を${title}しますか？`
                        : `${form.moveinAt}からの利用を${title}しますか？`;
                } else {
                    let endDate = new Date(startDate);
                    endDate.setDate(endDate.getDate() - 1);
                    limitDate = endDate.toLocaleDateString('sv');
                    mes = `${startDate}から利用があります。${limitDate}までの利用で${title}しますか？`;
                }
                setConfirmParam((prev: any) => ({
                    ...prev,
                    message: mes,
                    confirmAction: () => {
                        let roomForm = form;
                        if(limitDate) {
                            roomForm.leavingAt = limitDate;
                            setForm(roomForm);
                        }
                        saveRoomManage(roomForm);
                    },
                    isOpen: true,
                    }));
            }
        })

    }

    const saveRoomManage = (para: RoomForm) => {
        console.log(form);
        Post({
            apiPath: ApiPathSave,
            params: para,
            message: "記録しました。",
            onSuccess: () => { onClose(); }
        })
    }
    
    const delCofirm = () => {
        if(!form || (form.id == undefined))
            return;
        let tgtId = form.id;
        setConfirmParam((prev: any) => ({
            ...prev,
            message: `削除しますか？`,
            confirmAction: () => {
                del(tgtId);
            },
            isOpen: true,
          }));
    }
    const del = (id: number) => {
        Del({
            apiPath: `${ApiPathDelete}${String(id)}`,
            params: {},
            onSuccess: () => onClose()
        })
    }
    const setData = (data?: RoomForm) => {
        setForm({
            id: data?.id,
            customerId: data?.customerId,
            roomId: data?.roomId,
            unitId: data?.unitId,
            moveinAt: data?.moveinAt,
            leavingAt: data?.leavingAt,
            categoryId: data?.categoryId ?? 9,
            updatedAt: data?.updatedAt,
                   
        })
    }

    useEffect(() => {
        if(form.id != undefined) {
            setTitle("更新");
            Post({
                apiPath: ApiPathGet,
                params: { id: form.id },
                onSuccess: (res) => { setData(res.data.data[0]) }
            })
        } else {
            setTitle("登録");
        }
    }, []);

    return (<>
        <div className="box-container-form box-container-parent">
            <CommonInput id="moveinAt" title="入居開始日" value={form?.moveinAt} onChange={handleInputChange} />〜
            <CommonInput id="leavingAt" title="退所日" value={form?.leavingAt} onChange={handleInputChange} />
        </div>
        <div className="mt-5 mb-2 flex justify-end gap-5 px-4">
            <TableOpeButtons items={[
                { name: "キャンセル", buttonType: ButtonType.Other, cb:onClose},
                { name: "保存", buttonType: ButtonType.Add, cb:editConfirm},
                { name: "削除", buttonType: ButtonType.Del, cb:delCofirm, selectedState: form.id },
            ] as ButtonProps[]} />
        </div>
        
        <PopupConfirm param={confirmParam} />
    </>

    )
}