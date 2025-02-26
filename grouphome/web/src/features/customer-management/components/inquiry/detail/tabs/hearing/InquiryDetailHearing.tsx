import { useState, useEffect, useRef } from 'react';
import { Del, Get } from '@/features/blc-common/utils/ServerRequest';
import {
    InquiryHearingDetail,
    InquiryHearingInfo,
} from '@/features/blc-common/assets/ApiPath';

import { InquiryDetailHearingCards } from './InquiryDetailHearingCards';
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { HearingResponseDto, InquiryHearingDetailFormData, InquiryHearingFormData } from '@/features/customer-management/types/Inquiry';
import { Popup } from '@/components/elements/Popup';
import { InquiryHearingCreateOrEdit } from '../../../form/InquiryHearingCreateOrEdit';
import { InquiryHearingItemCreateOrEdit } from '../../../form/InquiryHearingItemCreateOrEdit';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';

type ArgsData = {
    tgtId: string | null
}

export function InquiryDetailHearing({ tgtId }: ArgsData) {
    const [hearingInfo, setHearingInfo] = useState<HearingResponseDto | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [contentData, setContentData] = useState<JSX.Element>(<></>);
    const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
        isOpen: false,
        textConfirm: '',
        message: '',
        isShowCancel: true,
        confirmAction: () => { },
        onClose: () => handleCloseConfirm()
    });

    const fetchData = async () => {
        Get({
            apiPath: `${InquiryHearingInfo}/${tgtId}`,
            params: {},
            onSuccess: (res) => {
                setHearingInfo(res.data.data as HearingResponseDto);
            },
            onError: (res) => {
                setHearingInfo(null);
            },
        });
    }

    useEffect(() => {
        fetchData();
    }, [tgtId]);

    const onUpdateClick = () => {
        let dataEdit = {
            id: hearingInfo?.id ?? null,
            inquiryInfoId: tgtId || '',
            result: hearingInfo?.result || '',
            prospect: hearingInfo?.prospect || '',
            remark: hearingInfo?.remark || '',
            updatedAt: hearingInfo?.updatedAt || '',
        } as InquiryHearingFormData;

        setTitleText('ヒアリング内容 - 基本情報(編集)');
        setContentData(<InquiryHearingCreateOrEdit formDataEdit={dataEdit} onCancelClick={handleClosePopup} fetchData={fetchData} setConfirmParam={setConfirmParam} />);
        setIsPopupOpen(true);
    };

    const onCreateItemClick = () => {
        let dataCreate = {
            id: null,
            hearingInfoId: hearingInfo?.id || '',
            step: null,
            contents: '',
            updatedAt: '',
        } as InquiryHearingDetailFormData;

        setTitleText('ヒアリング内容(追加)');
        setContentData(<InquiryHearingItemCreateOrEdit formDataEdit={dataCreate} onCancelClick={handleClosePopup} fetchData={fetchData} setConfirmParam={setConfirmParam} />);
        setIsPopupOpen(true);
    };

    const onUpdateItemClick = (editForm: InquiryHearingDetailFormData) => {
        setTitleText('ヒアリング内容(編集)');
        setContentData(<InquiryHearingItemCreateOrEdit formDataEdit={editForm} onCancelClick={handleClosePopup} fetchData={fetchData} setConfirmParam={setConfirmParam} />);
        setIsPopupOpen(true);
    };

    const onDeleteItemClick = (id: number | null) => {
        setConfirmParam(prevState => ({
            ...prevState,
            textConfirm: 'OK',
            isShowCancel: true,
            message: '選択したヒアリング内容を削除してもよろしいですか？',
            confirmAction: () => deleteHearing(id),
            isOpen: true
        }));
    };

    const deleteHearing = (id: number | null) => {
        Del({
            apiPath: `${InquiryHearingDetail}/${String(id)}`,
            params: {},
            onSuccess: (res) => {
                fetchData();
            }
        });
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleCloseConfirm = () => {
        setConfirmParam(prevState => ({
            ...prevState,
            isOpen: false
        }));
    };

    return (
        <>
            <TableOpeButtons items={[
                { name: "編集", buttonType: ButtonType.Edit, cb: onUpdateClick },
            ] as ButtonProps[]} />
            <div className="flex flex-wrap w-full">

                <div className="w-full md:w-1/2 panel-left">
                    <div className="pt-3">
                        <div className='box box-style box-doc-hearing'>
                            <span className="box-title">結果</span>
                            <div className="box-hearing-result flex flex-wrap w-full whitespace-pre-line">
                                {hearingInfo?.result}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 pl-4 panel-right">
                    <div className="pt-3">
                        <div className='box box-style box-style-sub'>
                            <span className="box-title">見込み状況</span>
                            <div className="box-hearing-prospect flex flex-wrap w-full whitespace-pre-line">
                                {hearingInfo?.prospect}
                            </div>
                        </div>
                        <div className='box box-style box-style-sub'>
                            <span className="box-title">メモ</span>
                            <div className="box-hearing-remark flex flex-wrap w-full whitespace-pre-line">
                                {hearingInfo?.remark}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="info-row">
                <InquiryDetailHearingCards hearingId={hearingInfo?.id} data={hearingInfo} onCreateItemClick={onCreateItemClick} onUpdateItemClick={onUpdateItemClick} onDeleteItemClick={onDeleteItemClick} />
            </div>
            <Popup title={titleText}
                doText={""}
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                contents={contentData}
                hideFooter={true}
            />
            <PopupConfirm
                param={confirmParam}
            />

        </>
    );
}
