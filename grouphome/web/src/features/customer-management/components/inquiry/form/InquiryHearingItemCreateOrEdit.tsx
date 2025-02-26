import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { InquiryHearingDetailSave } from '@/features/blc-common/assets/ApiPath';
import { compareDataDifferent, setValue, closeX } from '@/components/elements/common/CommonUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InquiryHearingDetailValForm } from '@/features/office-management/validations/inquiry';
import { HearingResponseDto, InquiryHearingDetailFormData } from '@/features/customer-management/types/Inquiry';
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { Button } from '@/components/ui/button';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { PopupConfirmParams } from '@/components/elements/Common';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';

interface CreateOrEditPopupProps {
    formDataEdit: InquiryHearingDetailFormData;
    onCancelClick: () => void;
    fetchData: () => void;
    setConfirmParam: React.Dispatch<React.SetStateAction<PopupConfirmParams>>;
}

const InquiryHearingItemCreateOrEdit = forwardRef(({ formDataEdit, onCancelClick, fetchData, setConfirmParam }: CreateOrEditPopupProps, ref) => {
    const { selectListData } = useSelectList();
    const selHearingStep = selectListData.get('hearing_step') || [];
    const [formData, setFormData] = useState<InquiryHearingDetailFormData>(formDataEdit);
    const [oldFormData, setOldFormData] = useState<InquiryHearingDetailFormData>(formDataEdit);
    
    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(InquiryHearingDetailValForm),
        defaultValues: formData || {},
    });

    const handleInputChange = (e: any) => {
        if (e && e.target ) {
            let { id, value} = e.target;
            if( id == "step" ){
                setFormData((prev: any) => {
                    return { ...prev, ["step"]: (value.trim() == "" || /^[0-9]+$/.test(value)) ? value : "" };
                });
                return;
            }
        }
        setValue<InquiryHearingDetailFormData>(e, setFormData);
    };

    const onSave = async (event: any) => {
        event.preventDefault();
        const isValid = await trigger();
        if (!isValid) {
            console.log('Validation errors:', errors);
            return;
        }

        Post({
            apiPath: InquiryHearingDetailSave,
            params: formData,
            message: '保存に成功しました',
            errMessage: '更新に失敗しました',
            onSuccess: (res) => {
                fetchData();
                onCancelClick();
            }
        });
    }

    const closePopup = () => {
        onCancelClick();
    }

    const handleCancelClick = (event: any) => {
        let newFormData: any = {...formData}
        event.preventDefault();
        if (!compareDataDifferent(oldFormData, newFormData)) {
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
                    <div className="w-full">
                         <CommonInput
                            id='step'
                            {...register('step')}
                            title="STEP"
                            placeholder="STEP"
                            className={`w-full ${errors.step ? 'error-background' : ''}`}
                            value={formData?.step}
                            onChange={handleInputChange}
                        />
                        {errors.step && <span className="error-message">{errors.step.message}</span>}
                    </div>

                    <div className="w-full pb-2">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <label htmlFor='contents' className="label-input-custom">内容</label>
                                <textarea
                                    id="contents"
                                    {...register('contents')}
                                    value={formData?.contents}
                                    className={`text-aria-custom text-aria-hearing-contents outline-none ${errors.contents ? 'error-background' : ''}`}
                                    aria-required="true"
                                    onChange={handleInputChange}
                                />
                                {errors.contents && <span className="error-message">{errors.contents.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-2 flex justify-end gap-5 px-4">
                <Button className="common-cancel-button" onClick={handleCancelClick} children="キャンセル" />
                <Button className="common-save-button" onClick={onSave} children={formData?.id ? "更新" : "追加"} />
            </div>
        </form>
    );
});

export { InquiryHearingItemCreateOrEdit };
