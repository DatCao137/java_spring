import { useState, useEffect, useRef } from 'react';
import { 
    InquiryProfile as ApiProfileList, 
    InquiryProfileSave as ApiProfileSave
    } from '@/features/blc-common/assets/ApiPath';
import { Post, Get, Del } from '@/features/blc-common/utils/ServerRequest';

import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';

import { PopupConfirmParams } from '@/components/elements/Common';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { Popup } from '@/components/elements/Popup';
import { FormCreateOrEdit } from './FormCreateOrEdit';
import { ProfileFormData, InquiryProfileSaveDto } from '@/features/customer-management/types/Inquiry';
import { compareDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';

type ArgsData = {
    tgtId: string | null
}

const defaultFormData = (src:ProfileFormData|null) => {
    return {
        id: src?.id ?? 0,
        inquiryInfoId: src?.inquiryInfoId ?? 0,
        introducerName: src?.introducerName ?? '',
        introducerType: src?.introducerType ?? '',
        introducerAddr: src?.introducerAddr ?? '',
        disabledType: src?.disabledType ?? '',
        disabledClass: src?.disabledClass ?? '',
        pocketBookType: src?.pocketBookType ?? 0,
        pocketBookTypeName: src?.pocketBookTypeName ?? '',
        pocketBookGrade: src?.pocketBookGrade ?? '',
        pocketBookWheelChair: src?.pocketBookWheelChair ?? 0,
        pocketBookWheelChairName: src?.pocketBookWheelChairName ?? '',
        serviceDays: src?.serviceDays ?? '',
        serviceName: src?.serviceName ?? '',
        serviceAddr: src?.serviceAddr ?? '',
        serviceVisit: src?.serviceVisit ?? '',
        serviceEtc: src?.serviceEtc ?? '',
        serviceRecipient: src?.serviceRecipient ?? '',
        residenceType: src?.residenceType ?? '',
        residenceRemark: src?.residenceRemark ?? '',
        updatedAt: src?.updatedAt ?? ''
    }
  };

export function InquiryDetailProfile({tgtId}: ArgsData) {

    const pageTitle = '本人プロフィール'
    const [ titleText, setTitleText ] = useState("");
    const [ btnText, setBtnText ] = useState("");
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ seq, setSeq ] = useState(0);

    const formRef = useRef<any>(null);
    const [formData, setFormData] = useState<ProfileFormData>(defaultFormData(null));
    const [oldFormData, setOldFormData] = useState<ProfileFormData>(defaultFormData(null));
    const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
        isOpen: false,
        textConfirm: '',
        message: '',
        isShowCancel: true,
        confirmAction: () => { },
        onClose: () => handleCloseConfirm()
    });

    const contentData = <FormCreateOrEdit
        ref={formRef}
        formData={formData}
        setFormData={setFormData}
    />;

    if(tgtId == null) {
        return (<></>);
    }
    const getProfileInfo = async() => {
        Post({
            apiPath: ApiProfileList,
            params: { inquiryId: tgtId },
            onSuccess: (res) => {
                setFormData(defaultFormData(res.data));
                setOldFormData(defaultFormData(res.data));
        }});
    }

    useEffect(() => {
        getProfileInfo();
    }, [tgtId])

    const handleEditPopup = () => {
        setTitleText(pageTitle + '(編集)');
        setBtnText("更新");
        setIsPopupOpen(true);
    };

    const handleCloseConfirm = () => {
        setConfirmParam(prevState => ({
          ...prevState,
          isOpen: false
        }));
    };

    const handleClosePopup = () => {
        if (!compareDataDifferent(oldFormData, formData)) {
          setConfirmParam(prevState => ({
            ...prevState, 
            textConfirm: '閉じる',
            isShowCancel: true,
            message: TEXT_CONFIRM_DATA_CHANGE,
            confirmAction: () => closePopup(),
            isOpen: true
          }));
        } else {
          closePopup();
        }
      };

    const closePopup = () => {
        setFormData(oldFormData);
        setIsPopupOpen(false);
    };

    const handleSaveData = async () => {
        let data = formData;
    
        const isValid = await formRef.current?.validateForm();
    
        if (!isValid) {
          return;
        }
    
        let saveData = {
            id: data.id,
            inquiryInfoId: parseInt(tgtId, 10),
            introducer: {
                name: data.introducerName,
                type: data.introducerType,
                addr: data.introducerAddr
            },
            disabled: {
                type: data.disabledType,
                class: data.disabledClass
            },
            pocketBook: {
                type: data.pocketBookType,
                grade: data.pocketBookGrade,
                wheelchair: data.pocketBookWheelChair
            },
            service: {
                days: data.serviceDays,
                name: data.serviceName,
                addr: data.serviceAddr,
                visit: data.serviceVisit,
                etc: data.serviceEtc,
                recipient: data.serviceRecipient
            },
            residence: {
                type: data.residenceType,
                remark: data.residenceRemark
            },
            // created_at: data.updatedAt,
            // updatedAt: data.updatedAt,

        }
    
        doSave(saveData);
    }

    const doSave = async (data: InquiryProfileSaveDto) => {
        Post({
            apiPath: ApiProfileSave,
            params: data,
            message: '本人プロフィール' + btnText + 'しました。',
            errMessage: btnText + 'に失敗しました。',
            onSuccess: (res) => {
                setIsPopupOpen(false);
                let dataUpdate = formData;
                dataUpdate.id = res.data.id;
                setOldFormData(dataUpdate);
                setFormData(dataUpdate);
            }
        });
    }

    const reload = async() => {
        setSeq(seq + 1);
    }

    return (
    <>
        <TableOpeButtons items={[
          { name: "編集", buttonType: ButtonType.Edit, cb: handleEditPopup },
        ] as ButtonProps[]} />

        <div className="flex flex-wrap w-full">
            <div className="w-full md:w-1/4 panel-left">
                <div className="box-profile pt-1">
                    <div className='box box-style'>
                        <span className="box-title">紹介者</span>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/3">
                                <span>機関名等：</span>
                            </div>
                            <div className="w-full md:w-2/3">
                                <span>{ oldFormData?.introducerName }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/3">
                                <span>機関種別：</span>
                            </div>
                            <div className="w-full md:w-2/3">
                                <span>{ oldFormData?.introducerType }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/3">
                                <span>所在地：</span>
                            </div>
                            <div className="w-full md:w-2/3">
                                <span>{ oldFormData?.introducerAddr }</span>
                            </div>
                        </div>
                    </div>

                    <div className='box box-style'>
                        <span className="box-title">障がい特性</span>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/3">
                                <span>種別：</span>
                            </div>
                            <div className="w-full md:w-2/3">
                                <span>{ oldFormData?.disabledType }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/3">
                                <span>区分：</span>
                            </div>
                            <div className="w-full md:w-2/3">
                                <span>{ oldFormData?.disabledClass }</span>
                            </div>
                        </div>
                    </div>

                    <div className='box box-style'>
                        <span className="box-title">手帳状況</span>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/3">
                                <span>手帳有無：</span>
                            </div>
                            <div className="w-full md:w-2/3">
                                <span>{ oldFormData?.pocketBookTypeName }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/3">
                                <span>等級：</span>
                            </div>
                            <div className="w-full md:w-2/3">
                                <span>{ oldFormData?.pocketBookGrade }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/3">
                                <span>車椅子：</span>
                            </div>
                            <div className="w-full md:w-2/3">
                                <span>{ oldFormData?.pocketBookWheelChairName }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-3/4 pl-4 panel-right">
                <div className="box-profile pt-1">
                    <div className='box box-style'>
                        <span className="box-title">利用中サービス</span>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/5">
                                <span>日中活動：</span>
                            </div>
                            <div className="w-full md:w-4/5">
                                <span>{ oldFormData?.serviceDays }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/5">
                                <span>日中活動先名：</span>
                            </div>
                            <div className="w-full md:w-4/5">
                                <span>{ oldFormData?.serviceName }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/5">
                                <span>所在地：</span>
                            </div>
                            <div className="w-full md:w-4/5">
                                <span>{ oldFormData?.serviceAddr }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/5">
                                <span>訪問サービス：</span>
                            </div>
                            <div className="w-full md:w-4/5">
                                <span>{ oldFormData?.serviceVisit }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/5">
                                <span>その他サービス：</span>
                            </div>
                            <div className="w-full md:w-4/5">
                                <span>{ oldFormData?.serviceEtc }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/5">
                                <span>受給者証：</span>
                            </div>
                            <div className="w-full md:w-4/5">
                                <span>{ oldFormData?.serviceRecipient }</span>
                            </div>
                        </div>
                    </div>
                    <div className='box box-style'>
                        <span className="box-title">現在の住居</span>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/5">
                                <span>住居種別：</span>
                            </div>
                            <div className="w-full md:w-4/5">
                                <span>{ oldFormData?.residenceType }</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/5">
                                <span>住居名、備考等：</span>
                            </div>
                            <div className="w-full md:w-4/5">
                                <span>{ oldFormData?.residenceRemark }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Popup title={titleText} doText={btnText}
            isOpen={isPopupOpen}
            onClose={handleClosePopup} 
            onOK={handleSaveData}
            contents={contentData} />
    
        <PopupConfirm
          param={confirmParam}
        />
    </>
    );
}
