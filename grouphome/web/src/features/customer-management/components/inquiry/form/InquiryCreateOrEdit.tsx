import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { CommonCheckBox } from '@/components/elements/common/CommonCheckBox';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { Select as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { setValue } from '@/components/elements/common/CommonUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InquiryCreateOrEdit } from '@/features/office-management/validations/inquiry';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { CommonCheckBoxRadio } from '@/components/elements/common/CommonCheckBoxRadio';
import { InquiryFormData } from '@/features/customer-management/types/Inquiry';
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';

interface Option {
    name: string;
    value: string | null;
}

interface CreateOrEditPopupProps {
    formData: InquiryFormData | null;
    setFormData: Dispatch<SetStateAction<InquiryFormData>>;
    isLoaded: Dispatch<SetStateAction<boolean>>;
}

const CreateOrEditPopup = forwardRef(({ formData, setFormData, isLoaded }: CreateOrEditPopupProps, ref) => {
    const { selectListData } = useSelectList();
    const selCustStatus = selectListData.get('cust_status')|| [];
    const selReqRoute = selectListData.get('req_route')|| [];
    const selRelationship = selectListData.get('relationship') || [];

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(InquiryCreateOrEdit),
        defaultValues: formData || {},
    });

    // Expose validateForm function to parent component
    useImperativeHandle(ref, () => ({
        validateForm: async () => {
            const isValid = await trigger();
            if (!isValid) {
                console.log('Validation errors:', errors);
            }
            return isValid;
        }
    }));

    const handleInputChange = (e: any) => {
        if (e && e.target ) {
            let { id, value} = e.target;
            if( id == "age" ){
                setFormData((prev: any) => {
                    return { ...prev, ["age"]: (value.trim() == "" || /^[0-9]+$/.test(value)) ? value : "" };
                });
                return;
            }
        }
        setValue<InquiryFormData>(e, setFormData);
    };

    const handleInputChangeRadio = (e: any) => {
        const { name, value } = e.target;

        setFormData((prev: any) => {
            return { ...prev, [name]: value };
        });
    };

    return (
        <form>
            <div className="box-container-form box-container-parent">
                <span className="box-title text-xl pt-0 font-bold">基本情報</span>
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="w-full pb-2">
                            <div className="w-full">
                                <CommonInput
                                    id='name'
                                    {...register('name')}
                                    title="氏名"
                                    placeholder="氏名"
                                    className={`w-full ${errors.name ? 'error-background' : ''}`}
                                    value={formData?.name}
                                    onChange={handleInputChange}
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </div>

                            <div className="w-full">
                                <CommonInput
                                    id='gana'
                                    {...register('gana')}
                                    title="ふりがな"
                                    placeholder="ふりがな"
                                    className={`w-full ${errors.gana ? 'error-background' : ''}`}
                                    value={formData?.gana}
                                    onChange={handleInputChange}
                                />
                                {errors.gana && <span className="error-message">{errors.gana.message}</span>}
                            </div>

                            <div className="w-full">
                                <CommonSelect
                                    id='status'
                                    {...register('status')}
                                    title="ステータス"
                                    options={selCustStatus}
                                    value={formData?.status}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.status ? 'error-background' : ''}`}
                                />
                                {errors.status && <span className="error-message">{errors.status.message}</span>}
                            </div>
                        </div>

                        <div className="w-full pb-2">
                            <div className="flex flex-wrap">
                                <div className="w-full inquiry-radio">
                                    <CommonCheckBoxRadio
                                        name="sex"
                                        value={
                                            formData?.sex
                                        }
                                        title="性別"
                                        onChange={handleInputChangeRadio}
                                        options={[
                                            { label: '男性', value: "1" },
                                            { label: '女性', value: "2" },
                                        ]}
                                        className={`form-check-input col-span-1 ${errors.sex ? 'error-background' : ''}`}
                                    />
                                    {errors.sex && <span className="error-message">{errors.sex.message}</span>}
                                </div>

                                <div className="w-full">
                                    <CommonInput
                                        id='age'
                                        {...register('age')}
                                        title="年齢"
                                        placeholder="年齢"
                                        className={`w-full ${errors.age ? 'error-background' : ''}`}
                                        value={formData?.age}
                                        onChange={handleInputChange}
                                    />
                                    {errors.age && <span className="error-message">{errors.age.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pb-2">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <label htmlFor='nextAction' className="label-input-custom">ネクストアクション</label>
                                <textarea
                                    id="nextAction"
                                    {...register('nextAction')}
                                    value={formData?.nextAction}
                                    className={`text-aria-custom outline-none ${errors.nextAction ? 'error-background' : ''}`}
                                    aria-required="true"
                                    onChange={handleInputChange}
                                />
                                {errors.nextAction && <span className="error-message">{errors.nextAction.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="box-container-form text-gray-700 mb-2">
                        <span className="box-title text-xl pt-0">問合わせ支援機関等</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="w-full pb-2">
                                <div className="w-full">
                                    <CommonInput
                                        id='inquirySrcName'
                                        {...register('inquirySrcName')}
                                        title="問合わせ元"
                                        placeholder="問合わせ元"
                                        className={`w-full ${errors.inquirySrcName ? 'error-background' : ''}`}
                                        value={formData?.inquirySrcName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.inquirySrcName && <span className="error-message">{errors.inquirySrcName.message}</span>}
                                </div>
                                <div className="w-full">
                                    <CommonInput
                                        id='inquirySrcStaff'
                                        {...register('inquirySrcStaff')}
                                        title="支援機関等担当者"
                                        placeholder="支援機関等担当者"
                                        className={`w-full ${errors.inquirySrcStaff ? 'error-background' : ''}`}
                                        value={formData?.inquirySrcStaff}
                                        onChange={handleInputChange}
                                    />
                                    {errors.inquirySrcStaff && <span className="error-message">{errors.inquirySrcStaff.message}</span>}
                                </div>
                                <div className="w-full">
                                    <CommonSelect
                                        id='inquirySrcRoute'
                                        {...register('inquirySrcRoute')}
                                        title="問合わせ経路"
                                        options={selReqRoute}
                                        value={formData?.inquirySrcRoute}
                                        onChange={handleInputChange}
                                        className={`w-full ${errors.inquirySrcRoute ? 'error-background' : ''}`}
                                    />
                                    {errors.inquirySrcRoute && <span className="error-message">{errors.inquirySrcRoute.message}</span>}
                                </div>
                            </div>
                            <div className="w-full pb-2">
                            <div className="w-full">
                                    <CommonInput
                                        id='inquirySrcPhone'
                                        {...register('inquirySrcPhone')}
                                        title="連絡先"
                                        placeholder="連絡先"
                                        className={`w-full ${errors.inquirySrcPhone ? 'error-background' : ''}`}
                                        value={formData?.inquirySrcPhone}
                                        onChange={handleInputChange}
                                    />
                                    {errors.inquirySrcPhone && <span className="error-message">{errors.inquirySrcPhone.message}</span>}
                                </div>
                                <div className="w-full">
                                    <CommonSelect
                                        id='inquirySrcLink'
                                        {...register('inquirySrcLink')}
                                        title="本人との関係"
                                        options={selRelationship}
                                        value={formData?.inquirySrcLink}
                                        onChange={handleInputChange}
                                        className={`w-full ${errors.inquirySrcLink ? 'error-background' : ''}`}
                                    />
                                    {errors.inquirySrcLink && <span className="error-message">{errors.inquirySrcLink.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export { CreateOrEditPopup };
