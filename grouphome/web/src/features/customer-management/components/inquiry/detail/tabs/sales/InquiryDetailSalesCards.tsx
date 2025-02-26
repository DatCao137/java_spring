
import { useState, useEffect, useRef } from 'react';
import { formatJPDate, getDateNow, countDiffDay } from '@/utils/DateUtils';
import { CustomerSalesFollowInfo, SalesFollowInfo } from '@/features/customer-management/types/Inquiry'
import { Popup } from '@/components/elements/Popup'
import { CreateOrEditPopup } from '../../../form/CustomerSalesFollowCreateOrEdit';
import { Post, Del } from '@/features/blc-common/utils/ServerRequest';
import {
    InquiryFollowSave as InquiryFollowSavePath,
    InquiryFollow as FollowApiPath,
    InquiryFollowDelete as InquiryFollowDeletePath,
} from '@/features/blc-common/assets/ApiPath';
import { InquiryCss } from '@/features/customer-management/assets/InquiryCss'
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { PopupConfirmParams } from '@/components/elements/Common';
import { PopupConfirm } from '@/components/elements/PopupConfirm'
import { Button } from '@/components/ui/button';
import { checkDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';

type ArrayData = {
  staffList: any;
  tgtId: string;
  salesInfoId: string;
  firstInquiryDate: string | null;
};

const defaultFormData: CustomerSalesFollowInfo = {
    id: null,
    salesInfoId: null,
    step: 1,
    followDate: getDateNow(),
    staffId: null,
    staffName: '',
    contents: '',
    updatedAt: ''
};

export function InquiryDetailSalesCards({ staffList, tgtId, salesInfoId, firstInquiryDate }: ArrayData) {
    const [formData, setFormData] = useState<CustomerSalesFollowInfo>(defaultFormData);
    const [oldFormData, setOldFormData] = useState<CustomerSalesFollowInfo>(defaultFormData);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [btnText, setBtnText] = useState("");
    const formRef = useRef<any>(null);
    const [salesFollows, setSalesFollows] = useState<SalesFollowInfo[]>([])
      const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
        isOpen: false,
        textConfirm: '',
        message: '',
        isShowCancel: true,
        confirmAction: () => { },
        onClose: () => handleCloseConfirm()
      });

    const getSalesFollows = async () => {
        Post({
            apiPath: FollowApiPath,
            params: { inquiryId: salesInfoId },
            onSuccess: (res) => {
                setSalesFollows(res.data.data);
            }});
    }

    const checkNewStep = () => {
        let newStep = salesFollows.length + 1;
        if (salesFollows && salesFollows.length > 0) {
            let stepArr = salesFollows.map(obj => parseInt(obj.step));
            let maxStep = Math.max(...stepArr);
            for (let i = 1; i <= maxStep; i++) {
                if (!stepArr.includes(i)) {
                    newStep = i;
                    break;
                }
            }
        }
        return newStep;
    }

    const handleOpenPopupCreate = () => {
        defaultFormData.salesInfoId = parseInt(salesInfoId);
        defaultFormData.step = checkNewStep();
        setFormData({
            ...defaultFormData, 
            followDate: getDateNow(), 
        });
        setOldFormData({
            ...defaultFormData, 
            followDate: getDateNow(), 
        });
        setIsPopupOpen(true)
        setTitleText('営業ツール(保存)');
        setBtnText('保存');
    };

    const handleOpenPopupEdit = (item: any) => {
        let formData = { ...item };
        formData.followDate = formData.followDate || getDateNow()

        setFormData(formData);
        setOldFormData(formData);
        setIsPopupOpen(true);
        setTitleText('営業ツール(更新)');
        setBtnText('更新');
    };

    const handleClosePopup = () => {
        let newFormData: any = {...formData}
        if (newFormData['staffId'] === '') {
            newFormData['staffId'] = null
        }
        if (newFormData['followDate'] === '') {
            newFormData['followDate'] = null
        }
        if (checkDataDifferent(oldFormData, newFormData)) {
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
        setIsPopupOpen(false);
    };
        
    const handleSaveData = async () => {
        var data = formData

        const isValid = await formRef.current?.validateForm();
        if (!isValid) {
            return;
        }

        Post({
            apiPath: InquiryFollowSavePath,
            params: data,
            message: '事業所情報を' + btnText + 'しました。',
            onSuccess: (res) => {
                reload();
                setIsPopupOpen(false);
            }
        });
    };

    const openDeletePopup = (item: any) => {
        setConfirmParam(prevState => ({
            ...prevState,
            textConfirm: 'OK',
            isShowCancel: true,
            message: '選択したホーム(' + item.stepName + ')を削除しますか？',
            confirmAction: () => deleteItem(item),
            isOpen: true
        }));
    };

    const deleteItem = async (item: any) => {
        await Del({
            apiPath: InquiryFollowDeletePath + '/' + item?.id,
            params: {}});
        setIsPopupOpen(false);
        await reload();
    };

    const handleCloseConfirm = () => {
        setConfirmParam(prevState => ({
            ...prevState,
            isOpen: false
        }));
    };

    const reload = async () => {
        getSalesFollows();
    }

    useEffect(() => {
        reload();
    }, [tgtId, salesInfoId])

    const contentData = <CreateOrEditPopup ref={formRef} formData={formData} setFormData={setFormData} staffList={staffList} />;

    return (
        <>
            <style>
                <InquiryCss />
            </style>

            <div className='text-right'>
                <Button className="my-2" onClick={handleOpenPopupCreate} children="追加" disabled={!salesInfoId} />
            </div>

            <div className="w-full max-w-full overflow-x-scroll salesFollowItemContainer">
                {salesFollows.length && salesFollows.length > 0 ? (
                <div className="tab-table-ruby flex w-full">
                    {salesFollows.map((item, index) => {
                    return (
                        <div key={index} className="salesFollowItem" >
                            <div className="border border-gray-400 px-2 py-1">
                                {item.stepName}
                            </div>
                            <div className="border border-t-0 border-collapse border-gray-400 grid grid-cols-12">
                                <div className="col-span-12 md:col-span-6 lg:col-span-5 border-r border-gray-400 px-2">
                                    <div className='col-span-12 md:col-span-12'>フォロー日付 </div>
                                    <div className='col-span-12 md:col-span-12 h-6 text-right'>{ formatJPDate(item.followDate) }</div>
                                    <div className='col-span-12 md:col-span-12'>経過日数: { countDiffDay(item?.followDate, firstInquiryDate) }日 </div>
                                    <div className='col-span-12 md:col-span-12'>担当: { item.staffName }</div>
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-7">
                                    <div className='col-span-12 md:col-span-12 mb-1 border-b border-gray-400 px-2'>フォロー内容</div>
                                    <div className='col-span-12 md:col-span-12 mb-1 px-2 displayContents'>{ item.contents }</div>
                                </div>
                            </div>
                            <div className="border border-gray-400 px-2 py-1 footer">
                                <TableOpeButtons items={[
                                    { name: "編集", buttonType: ButtonType.Edit, cb: () => { handleOpenPopupEdit(item) } },
                                    { name: "削除", buttonType: ButtonType.Del, cb: () => { openDeletePopup(item) } },
                                ] as ButtonProps[]} />
                            </div>
                        </div>
                    );
                    })}
                </div>
                ) : (
                <div className="h-40 w-full border border-gray-400 mb-2"></div>
                )}
            </div>
                        
            <Popup
                title={titleText} doText={btnText}
                isOpen={isPopupOpen}
                onClose={handleClosePopup} onOK={handleSaveData}
                contents={contentData} />
            
            <PopupConfirm
                    param={confirmParam} />
        </>
    );
}
