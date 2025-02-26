
import { useState, useEffect, useRef } from 'react';
import { CommonItemBox } from '@/components/elements/common/CommonItemBox';
import {
    InquirySales as SalesApiPath,
    InquirySalesSave as InquirySalesSavePath,
    Select as ApiPathSelect,
    Select as SelectFirstInquiryHowPath
} from '@/features/blc-common/assets/ApiPath';
import { ItemArgsData } from '@/components/elements/Common';

import { Post, Get } from '@/features/blc-common/utils/ServerRequest';
import { formatJPDate } from '@/utils/DateUtils';
import { jsonParse } from '@/utils/JsonUtils';
import { CustomerSalesInfo, CustomerSalesSave } from '@/features/customer-management/types/Inquiry'
import { Popup } from '@/components/elements/Popup'
import { CreateOrEditPopup } from '../../../form/CustomerSalesCreateOrEdit';
import { InquiryDetailSalesCards } from './InquiryDetailSalesCards';
import { PopupConfirmParams } from '@/components/elements/Common';
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { InquiryCss } from '@/features/customer-management/assets/InquiryCss'
import { compareDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';

type ArgsData = {
    tgtId: string | null
}

const defaultFormData: CustomerSalesInfo = {
    id: null,
    inquiryInfoId: 0,
    firstInquiryDate: null,
    firstInquiryHow: 0,
    tel: '',
    fax: '',
    mail: '',
    name: '',
    maker: '',
    address: '',
    contactableHour: '',
    contact: {
        tel: '',
        fax: '',
        mail: ''
    },
    decision: {
        name: '',
        maker: '',
        address: '',
        contactableHour: ''
    },
    updatedAt: ''
};

interface Option {
    name: string;
    value: string | null;
}

export function InquiryDetailSales({ tgtId }: ArgsData) {
    const [inquiryDate, setInquiryDate] = useState('');
    const [inquiryMethod, setInquiryMethod] = useState('');
    const [tel, setTel] = useState('');
    const [fax, setFax] = useState('');
    const [mail, setMail] = useState('');
    const [decisionMaker, setDecisionMaker] = useState('');
    const [decisionName, setDecisionName] = useState('');
    const [decisionAddress, setDecisionAddress] = useState('');
    const [contactableHours, setContactableHours] = useState('');
    const [formData, setFormData] = useState<CustomerSalesInfo>(defaultFormData);
    const [oldFormData, setOldFormData] = useState<CustomerSalesInfo>(defaultFormData);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [btnText, setBtnText] = useState("");
    const formRef = useRef<any>(null);
    const [firstInquiryHowList, setFirstInquiryHowList] = useState<Option[]>([]);
    const [staffList, setStaffList] = useState<SelectListResponseDto[]>([]);
    const [salesInfoId, setSalesInfoId] = useState('');
    const [firstInquiryDate, setFirstInquiryDate] = useState('');
    const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
        isOpen: false,
        textConfirm: '',
        message: '',
        isShowCancel: true,
        confirmAction: () => { },
        onClose: () => handleCloseConfirm()
      });

    if (tgtId == null) {
        return (<></>);
    }

    const getList = async () => {
        Post({
            apiPath: SalesApiPath,
            params: { inquiryId: tgtId },
            onSuccess: (res) => {
                let data = res.data.data
                let defaultContact = {
                    fax: '',
                    tel: '',
                    mail: ''
                }
                let defaultDecision = {
                    name: '',
                    maker: '',
                    address: '',
                    contactableHour: ''
                }
                let contact = jsonParse('contact', data?.contact, defaultContact);
                let decision = jsonParse('decision', data?.decision, defaultDecision);

                setInquiryDate(formatJPDate(data.firstInquiryDate));
                setInquiryMethod(data.firstInquiryHowName);
                setTel(contact?.tel);
                setFax(contact?.fax);
                setMail(contact?.mail);
                setDecisionMaker(decision?.maker);
                setDecisionName(decision?.name);
                setDecisionAddress(decision?.address);
                setContactableHours(decision?.contactableHour);
                data['inquiryInfoId'] = parseInt(tgtId);
                data['tel'] = contact?.tel || '';
                data['fax'] = contact?.fax || '';
                data['mail'] = contact?.mail || '';
                data['maker'] = decision?.maker || '';
                data['name'] = decision?.name || '';
                data['address'] = decision?.address || '';
                data['contactableHour'] = decision?.contactableHour || '';
                data['firstInquiryDate'] = data?.firstInquiryDate || '';
                data['firstInquiryHow'] = data?.firstInquiryHow || '';

                setFormData(data);
                setOldFormData(data);
                setSalesInfoId(data?.id)
                setFirstInquiryDate(data.firstInquiryDate)
            }});
    }

    useEffect(() => {
        getList();
        initialFormState();
        getStaffList();
    }, [tgtId])


    const header1: ItemArgsData[] = [
        { title: { label: '流入経路' }, val: { val: '' } },
    ];
    const header2: ItemArgsData[] = [
        { title: { label: 'ご連絡先', class: 'inquiry-item2-info' }, val: { val: '' } },
    ];
    const header3: ItemArgsData[] = [
        { title: { label: '', class: 'inquiry-item3-info' }, val: { val: '' } },
    ];
    const header4: ItemArgsData[] = [
        { title: { label: '', class: 'inquiry-item2-info' }, val: { val: '' } },
    ];
    const item1: ItemArgsData[] = [
        { title: { label: '初回問合わせ' }, val: { val: inquiryDate } },
        { title: { label: '初回問合わせ方法' }, val: { val: inquiryMethod } },
        { title: { label: '', class: 'h-6' }, val: { val: '' } },
    ];
    const item2: ItemArgsData[] = [
        { title: { label: 'TEL', class: 'inquiry-item2-info' }, val: { val: tel } },
        { title: { label: 'FAX', class: 'inquiry-item2-info' }, val: { val: fax } },
        { title: { label: 'Mail', class: 'inquiry-item2-info' }, val: { val: mail } },
    ];
    const item3: ItemArgsData[] = [
        { title: { label: '意思決定者連絡先', class: 'inquiry-item3-info' }, val: { val: decisionMaker } },
        { title: { label: 'ご住所', class: 'inquiry-item3-info' }, val: { val: decisionAddress } },
        { title: { label: '連絡可能時間帯', class: 'inquiry-item3-info' }, val: { val: contactableHours } },
    ];
    const item4: ItemArgsData[] = [
        { title: { label: '氏名', class: 'inquiry-item2-info' }, val: { val: decisionName } },
    ];

    const handleOpenPopupEdit = () => {
        setFormData(oldFormData);
        setIsPopupOpen(true);
        setTitleText('営業ツール(更新)');
        setBtnText('更新');
    };

    const closePopup = () => {
        setIsPopupOpen(false);
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
    
    
    const handleSaveData = async () => {
        let data = {
                id: formData.id,
                inquiryInfoId: formData.inquiryInfoId,
                firstInquiryDate: formData.firstInquiryDate,
                firstInquiryHow: formData.firstInquiryHow,
                contact: {
                    tel: formData.tel,
                    fax: formData.fax,
                    mail: formData.mail,
                },
                decision: {
                    name: formData.name,
                    maker: formData.maker,
                    address: formData.address,
                    contactableHour: formData.contactableHour
                },
                updatedAt: formData.updatedAt
            } as CustomerSalesSave;

        const isValid = await formRef.current?.validateForm();
        if (!isValid) {
            return;
        }

        Post({
            apiPath: InquirySalesSavePath,
            params: data,
            message: '事業所情報を' + btnText + 'しました。',
            onSuccess: (res) => {
                setIsPopupOpen(false);
                getList();
            }
        });
    };

    const getFirstInquiryHowList = async () => {
        Post({
            apiPath: SelectFirstInquiryHowPath,
            params: { type: ['first_inquiry_how'] },
            onSuccess: (res) => {
                setFirstInquiryHowList(res.data.first_inquiry_how);
            }
        });
    };

    const initialFormState = () => {
        try {
            getFirstInquiryHowList();
        } catch (error) {
            console.error('Error fetching data: ', error);
            alert('Error fetching data');
        }
    }
    
    const getStaffList = async () => {
        Post({
            apiPath: ApiPathSelect,
            params: { type: ['cust__staff'] },
            onSuccess: (res) => {
                setStaffList(res.data.cust__staff || []);
            }
        });
    };

    const handleCloseConfirm = () => {
        setConfirmParam(prevState => ({
            ...prevState, 
            isOpen: false
        }));
    };

    const contentData = <CreateOrEditPopup ref={formRef} formData={formData} setFormData={setFormData} firstInquiryHowList={firstInquiryHowList} />;

    return (
        <>
            <style>
                <InquiryCss />
            </style>

            <div className='inquiryCustomerSalesInfo'>
                <div className='text-right'>
                    <TableOpeButtons items={[
                        { name: "編集", buttonType: ButtonType.Edit, cb: handleOpenPopupEdit },
                    ] as ButtonProps[]} />
                </div>

                <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/5 panel-left">
                        <div className="box-doc-manage pt-1">
                            <div className='box box-style tabGroup1'>
                                <span className="box-title">流入経路</span>
                                <CommonItemBox arrayData={item1} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-4/5 pl-4 panel-right">
                        <div className="box-doc-manage pt-1">
                            <div className='box box-style'>
                                <span className="box-title">ご連絡先</span>
                                <div className='flex flex-wrap w-full'>
                                    <div className="w-full md:w-2/5">
                                        <CommonItemBox arrayData={item2} />
                                    </div>
                                    <div className="w-full md:w-2/5">
                                        <CommonItemBox arrayData={item3} />
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <CommonItemBox arrayData={item4} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-row">
                    <InquiryDetailSalesCards staffList={staffList} tgtId={tgtId} salesInfoId={salesInfoId} firstInquiryDate={firstInquiryDate} />
                </div>
            </div>

            <PopupConfirm
                param={confirmParam}
            />
            
            <Popup
                title={titleText} doText={btnText}
                isOpen={isPopupOpen}
                onClose={handleClosePopup} onOK={handleSaveData}
                contents={contentData} />
        </>
    );
}
