import { useEffect, useState } from 'react'
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { CalcMaster as ApiPathCalcMaster } from '@/features/blc-common/assets/ApiPath';
import { CalcTable } from './CalcTable';
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { Popup } from '@/components/elements/Popup';
import { CreateOrEditPopup } from './CalcCreateOrEdit';
import { TypeCalcMaster } from '../../types/CalcInfo';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';

type ArgsData = {
    branchId: number | null
}

function CalcInfo({ branchId }: ArgsData) {
    const [ tgtData, setTgtData ] = useState<string | null>(null)
    const [ seq, setSeq ] = useState(0);
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ master, setMaster ] = useState<TypeCalcMaster[]>([]);
    const [ isUpdate, setIsUpdate ] = useState<boolean>(false);
    const [ confirmParam, setConfirmParam ] = useState<PopupConfirmParams>({
        isOpen: false,
        textConfirm: '閉じる',
        message: '',
        isShowCancel: true,
        confirmAction: () => {},
        onClose: () => handleCloseConfirm()
      });

    
    if (branchId == null) {
        return (<></>);
    }

    const getMasterData = async () => {
        Post({
            apiPath: ApiPathCalcMaster,
            params: { branchId: branchId },
            onSuccess: (res) => {
                setMaster(res.data.data);
            }
        });
    };

    useEffect(() => {
        getMasterData();
        setSeq(seq+1);
    }, [ branchId ]);

    const chgTgtData = (tgt: string): void => {
        setTgtData(tgt);
    }

    const handleUpdate = () => {
        setIsPopupOpen(true)
    };

    const onClose = () => {
        setIsPopupOpen(false);
        setSeq(seq + 1);
    }
    const handleCloseConfirm = () => {
        setConfirmParam(prevState => ({
          ...prevState, 
          isOpen: false
        }));
      };

    const handleClosePopup = (isNonCheck:boolean = false) => {
        if(!isNonCheck && isUpdate) {
            setConfirmParam(prevState => ({
                ...prevState, 
                textConfirm: '閉じる',
                isShowCancel: true,
                message: TEXT_CONFIRM_DATA_CHANGE,
                confirmAction: () => onClose(),
                isOpen: true
            }));
        } else {
            onClose();
        }
    };

    const contentData = <CreateOrEditPopup branchId={branchId} masterData={master} isUpdated={setIsUpdate} onClose={handleClosePopup}/>;

    return (
        <>
            <div className="calc-line">
                <TableOpeButtons items={[
                    { name: "編集", buttonType: ButtonType.Edit, cb: handleUpdate },
                ] as ButtonProps[]} />
                <div id="calcTableTable">
                    <CalcTable branchId={branchId} cbClick={chgTgtData} seq={seq} />
                </div>
            </div>
            <Popup title={"算定情報（編集）"} doText={"保存"}
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                hideFooter={true}
                contents={contentData}
            />
            <PopupConfirm param={confirmParam} />

        </>
    )
}

export { CalcInfo }