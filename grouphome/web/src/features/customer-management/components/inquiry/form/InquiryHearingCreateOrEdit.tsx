import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { InquiryHearingSave } from '@/features/blc-common/assets/ApiPath';
import { checkDataDifferent, setValue, closeX } from '@/components/elements/common/CommonUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InquiryHearingValForm } from '@/features/office-management/validations/inquiry';
import { HearingResponseDto, InquiryFormData, InquiryHearingFormData } from '@/features/customer-management/types/Inquiry';
import { Button } from '@/components/ui/ButtonCus';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupConfirmParams } from '@/components/elements/Common';

interface CreateOrEditPopupProps {
    formDataEdit: InquiryHearingFormData;
    onCancelClick: () => void;
    fetchData: () => void;
    setConfirmParam: React.Dispatch<React.SetStateAction<PopupConfirmParams>>;
}

const InquiryHearingCreateOrEdit = forwardRef(({ formDataEdit, onCancelClick, fetchData, setConfirmParam }: CreateOrEditPopupProps, ref) => {
    const [formData, setFormData] = useState<InquiryHearingFormData>(formDataEdit);
    const [oldFormData, setOldFormData] = useState<InquiryHearingFormData>(formDataEdit);
    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(InquiryHearingValForm),
        defaultValues: formData || {},
    });

    const handleInputChange = (e: any) => {
        setValue<InquiryHearingFormData>(e, setFormData);
    };

    const onSave = async (event: any) => {
        event.preventDefault();
        const isValid = await trigger();

        if (!isValid) {
            console.log('Validation errors:', errors);
            return;
        }
        Post({
            apiPath: InquiryHearingSave,
            params: formData,
            message: '保存に成功しました',
            errMessage: '更新に失敗しました',
            onSuccess: (res) => {
                fetchData();
                onCancelClick();
            }
        });
    }

    const handleCancelClick = (event: any) => {
        event.preventDefault();
        if (checkDataDifferent(oldFormData, formData)) {
          setConfirmParam(prevState => ({
            ...prevState, 
            textConfirm: '閉じる',
            isShowCancel: true,
            message: TEXT_CONFIRM_DATA_CHANGE,
            confirmAction: () => onCancelClick(),
            isOpen: true
          }));
        } else {
            onCancelClick();
        }
    };

    const handleCloseX = closeX()
    handleCloseX((e: any) => {
        e.preventDefault();
        handleCancelClick(e);
    })

    return (
        <form>
            <div className="box-container-form box-container-parent">
                <span className="box-title text-xl pt-0 font-bold">ヒアリング内容</span>
                <div className="">
                    <div className="w-full pb-2">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <label htmlFor='result' className="label-input-custom">結果</label>
                                <textarea
                                    id="result"
                                    {...register('result')}
                                    value={formData?.result}
                                    className={`text-aria-custom text-aria-hearing-result outline-none ${errors.result ? 'error-background' : ''}`}
                                    aria-required="true"
                                    onChange={handleInputChange}
                                />
                                {errors.result && <span className="error-message">{errors.result.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="w-full pb-2">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <label htmlFor='prospect' className="label-input-custom">見込み状況</label>
                                <textarea
                                    id="prospect"
                                    {...register('prospect')}
                                    value={formData?.prospect}
                                    className={`text-aria-custom text-aria-hearing-prospect outline-none ${errors.prospect ? 'error-background' : ''}`}
                                    aria-required="true"
                                    onChange={handleInputChange}
                                />
                                {errors.prospect && <span className="error-message">{errors.prospect.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="w-full pb-2">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <label htmlFor='remark' className="label-input-custom">メモ</label>
                                <textarea
                                    id="remark"
                                    {...register('remark')}
                                    value={formData?.remark}
                                    className={`text-aria-custom outline-none text-aria-hearing-remark ${errors.remark ? 'error-background' : ''}`}
                                    aria-required="true"
                                    onChange={handleInputChange}
                                />
                                {errors.remark && <span className="error-message">{errors.remark.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-2 flex justify-end gap-5 px-4">
                    <Button className="common-cancel-button" onClick={handleCancelClick} children="キャンセル" />
                    <Button className="common-save-button" onClick={onSave} children="更新" />
                </div>
            </div>
        </form>
        
    );
});

export { InquiryHearingCreateOrEdit };
