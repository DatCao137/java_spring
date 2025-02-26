import { useEffect, useRef, useState } from 'react'
import { Row } from '@tanstack/react-table'
import { CommonItemBox } from '@/components/elements/common/CommonItemBox'
import { InquiryDetailBasic as ApiPath, InquiryDetailSave } from '@/features/blc-common/assets/ApiPath';
import { ItemArgsData } from '@/components/elements/Common';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { Button } from '@/components/ui/ButtonCus';
import { Popup } from '@/components/elements/Popup';
import { formatJPDate } from '@/utils/DateUtils';
import { InquiryItemFormData, InquiryItemSaveFormData } from '@/features/customer-management/types/Inquiry';
import { CreateOrEditPopup } from '../form/InquiryItemCreateOrEdit';
import { InquiryDetailTable } from './InquiryDetailTable';
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { compareDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupConfirmParams } from '@/components/elements/Common';
import { PopupConfirm } from '@/components/elements/PopupConfirm';

type ArgsData = {
    tgtId: string | null
}

const defaultItemFormData: InquiryItemFormData = {
    id: null,
    inquiryInfoId: '',
    status: null,
    homeId: null,
    ghData: '',
    date: null,

    breakdownSelf: null,
    breakdownFamily: null,
    breakdownCounselor: null,
    breakdownSupport: null,
    breakdownThirdParty: null,
    breakdownSum: 0,

    recordTime: '',
    recordVisitTime: '',
    recordFreeTrial: null,
    recordPaidTrial: null,
    recordSsCompletion: null,
    recordContractDate: '',
    recordPlanStatus: null,

    updatedAt: '',
};

function InquiryDetailInfo({ tgtId }: ArgsData) {
    const [inquiryTime, setInquiryTime] = useState();
    const [visit, setVisit] = useState();
    const [freeTrial, setFreeTrial] = useState('');
    const [paidTrial, setPaidTrial] = useState('');
    const [ssCompletion, setSSCompletion] = useState('');
    const [contractDate, setContractDate] = useState();
    const [planStatus, setPlanStatus] = useState();
    const [seq, setSeq] = useState(0);
    const [idItemData, setIdItemData] = useState<string | null>(null)
    const [rowItemData, setRowItemData] = useState<any>(null);
    const [formItemData, setFormItemData] = useState<InquiryItemFormData>(defaultItemFormData);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const formRef = useRef<any>(null);
    const [resetSelections, setResetSelections] = useState(false);
    const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
        isOpen: false,
        textConfirm: '',
        message: '',
        isShowCancel: true,
        confirmAction: () => { },
        onClose: () => handleCloseConfirm()
    });

    const handleCloseConfirm = () => {
      setConfirmParam(prevState => ({
        ...prevState,
        isOpen: false
      }));
    };

    const contentData = <CreateOrEditPopup
        ref={formRef}
        formData={formItemData}
        setFormData={setFormItemData}
    />;

    if (tgtId == null) {
        return (<></>);
    }
    const chgTgtData = (row: Row<any>) => {
        setIdItemData(row?.id);
        setRowItemData(row);
    }

    const getDetailBasic = async () => {
        setInquiryTime(rowItemData?.recordTime || "");
        setVisit(rowItemData?.recordVisitTime || "");
        setFreeTrial(formatJPDate(rowItemData?.recordFreeTrial || '', "YYYY/MM/DD", false));
        setPaidTrial(formatJPDate(rowItemData?.recordPaidTrial || '', "YYYY/MM/DD", false));
        setSSCompletion(formatJPDate(rowItemData?.recordSsCompletion || '', "YYYY/MM/DD", false));
        setContractDate(rowItemData?.recordContractDate || "");
        setPlanStatus(rowItemData?.recordDlanStatusName || "");
    }

    useEffect(() => {
        getDetailBasic();
    }, [seq, idItemData, rowItemData]);

    const items: ItemArgsData[] = [
        { title: { label: '問合わせ時刻', class: 'mt-2' }, val: { val: inquiryTime, class: 'ml-2 mt-2' } },
        { title: { label: '見学時刻', class: 'mt-2' }, val: { val: visit, class: 'ml-2 mt-2' } },
        { title: { label: '(無料)体験修了日', class: 'mt-2' }, val: { val: freeTrial, class: 'ml-2 mt-2' } },
        { title: { label: '(有料)体験修了日', class: 'mt-2' }, val: { val: paidTrial, class: 'ml-2 mt-2' } },
        { title: { label: 'SS修了日', class: 'mt-2' }, val: { val: ssCompletion, class: 'ml-2 mt-2' } },
        { title: { label: '契約時刻', class: 'mt-2' }, val: { val: contractDate, class: 'ml-2 mt-2' } },
        { title: { label: '支援計画状況', class: 'mt-2' }, val: { val: planStatus, class: 'ml-2 mt-2' } }
    ];

    const onUpdateClick = () => {
        let dataEdit = {
            id: rowItemData?.id ?? null,
            inquiryInfoId: tgtId || '',
            status: rowItemData?.status ?? null,
            homeId: rowItemData?.homeId ?? null,
            ghData: rowItemData?.ghData || '',
            date: rowItemData?.date || '',

            breakdownSelf: rowItemData?.breakdownSelf ?? null,
            breakdownFamily: rowItemData?.breakdownFamily ?? null,
            breakdownCounselor: rowItemData?.breakdownCounselor ?? null,
            breakdownSupport: rowItemData?.breakdownSupport ?? null,
            breakdownThirdParty: rowItemData?.breakdownThirdParty ?? null,
            breakdownSum: rowItemData?.breakdownSum ?? 0,

            recordTime: rowItemData?.recordTime || '',
            recordVisitTime: rowItemData?.recordVisitTime || '',
            recordFreeTrial: rowItemData?.recordFreeTrial || null,
            recordPaidTrial: rowItemData?.recordPaidTrial || null,
            recordSsCompletion: rowItemData?.recordSsCompletion || null,
            recordContractDate: rowItemData?.recordContractDate || '',
            recordPlanStatus: rowItemData?.recordPlanStatus ?? null,

            updatedAt: rowItemData?.updatedAt,
        };

        setFormItemData(dataEdit);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        let oldData: any = { ...rowItemData }
        let newData: any = { ...formItemData }
        if (!oldData.hasOwnProperty('inquiryInfoId') && newData.hasOwnProperty('inquiryInfoId')) {
            delete newData['inquiryInfoId']
        }
        if (!newData.hasOwnProperty('homeName') && oldData.hasOwnProperty('homeName')) {
            delete oldData['homeName']
        }
        if (!newData.hasOwnProperty('statusName') && oldData.hasOwnProperty('statusName')) {
            delete oldData['statusName']
        }
        if (!newData.hasOwnProperty('recordDlanStatusName') && oldData.hasOwnProperty('recordDlanStatusName')) {
            delete oldData['recordDlanStatusName']
        }
        if (!compareDataDifferent(oldData, newData)) {
            setConfirmParam(prevState => ({
                ...prevState, 
                textConfirm: '閉じる',
                isShowCancel: true,
                message: TEXT_CONFIRM_DATA_CHANGE,
                confirmAction: () => setIsPopupOpen(false),
                isOpen: true
            }));
        } else {
            setIsPopupOpen(false);
        }
    };

    const handleSaveData = async () => {
        let data = formItemData
        const isValid = await formRef.current?.validateForm();
        if (!isValid) {
            return;
        }
        let saveData = {
            id: data.id,
            inquiryInfoId: data.inquiryInfoId,
            status: data.status,
            homeId: data.homeId,
            ghData: data.ghData,
            date: data.date,
            breakdown: {
                self: data.breakdownSelf,
                family: data.breakdownFamily,
                counselor: data.breakdownCounselor,
                support: data.breakdownSupport,
                thirdParty: data.breakdownThirdParty,
            },
            record: {
                time: data.recordTime,
                visitTime: data.recordVisitTime,
                freeTrial: data.recordFreeTrial,
                paidTrial: data.recordPaidTrial,
                ssCompletion: data.recordSsCompletion,
                contractDate: data.recordContractDate,
                planStatus: data.recordPlanStatus,

            },
            updatedAt: data.updatedAt,
        }

        doSave(saveData);
    };

    const doSave = (data: InquiryItemSaveFormData) => {
        Post({
            apiPath: InquiryDetailSave,
            params: data,
            message: '詳細情報編集しました。',
            errMessage: '編集に失敗しました。',
            onSuccess: (res) => {
                setIsPopupOpen(false);
                reloadButKeepDetailShow();
            }
        });
    };

    const reloadButKeepDetailShow = async () => {
        setResetSelections(false);
        setSeq(seq + 1);
    }

    const reload = async () => {
        setResetSelections(true);
        setIdItemData(null);
        setRowItemData(null);
        setSeq(seq + 1);
    }

    return (
        <>
            <div className="box">
                <span className="box-title">コンタクト・進捗管理</span>

                <div className="detail-info-line">
                    <div id="inquiryDetailTable"><InquiryDetailTable cbSelect={chgTgtData} resetSelections={resetSelections} reload={reload} seq={seq} tgtId={tgtId} /></div>
                    <div><TableOpeButtons items={[
                        { name: "編集", buttonType: ButtonType.Edit, cb: onUpdateClick, selectedState: rowItemData },
                    ] as ButtonProps[]} />
                        <div className="box ml-2 inquiry-detail-item">
                            <CommonItemBox arrayData={items} />
                        </div>
                    </div>

                </div>
                <Popup title={"詳細情報(編集)"} doText={"更新"}
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup} onOK={handleSaveData}
                    contents={contentData} />
                <PopupConfirm
                    param={confirmParam}
                />
            </div>
        </>
    )
}

export { InquiryDetailInfo }
