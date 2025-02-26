import React, { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { HomeCss } from '../../assets/HomeCss';
import { setValue } from '@/components/elements/common/CommonUtils';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDataType } from '../../types/OfficeRoom'
import { OfficeRoomCreateOrEdit } from '../../validations/office';
import { formatCurrencyNumberWithDecimal } from "@/utils/Helper"

interface CreateOrEditPopupProps {
    formData: FormDataType | null;
    setFormData: Dispatch<SetStateAction<FormDataType>>;
}

const CreateOrEditPopup = forwardRef(({ formData, setFormData }: CreateOrEditPopupProps, ref) => {
    const [feeCurrency, setFeeCurrency] = useState<any>(formData?.fee);

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(OfficeRoomCreateOrEdit),
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
        if ( e.target ) {
            let { id, value } = e.target;

            if (id === 'fee') {
                setFeeCurrency(formatCurrencyNumberWithDecimal(value));
            }
        }
        setValue<FormDataType>(e, setFormData);
    };

    <style>
        <HomeCss />
    </style>

    return (
        <form>
            <div className="box-container-form box-container-parent">
                <span className="box-title font-bold">情報</span>
                <div className="">
                    <div className="flex flex-wrap w-full">
                        <div className="flex flex-wrap">
                            <div className="md:w-1/5">
                                <label htmlFor='name' className="home-label1">部屋番号</label>
                            </div>
                            <div className="md:w-4/5 p-1">
                                <CommonInput
                                    id='name'
                                    {...register('name')}
                                    onChange={handleInputChange}
                                    value={formData?.name}
                                    className={`w-full ${errors.name ? 'error-background' : ''}`}
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </div>
                            <div className="md:w-1/5 p-1">
                                <label htmlFor='fee' className="home-label1">賃料</label>
                            </div>
                            <div className="md:w-4/5 p-1">
                                <CommonInput
                                    type="text"
                                    id='fee'
                                    {...register('fee')}
                                    onChange={handleInputChange}
                                    value={feeCurrency}
                                    className={`w-full ${errors.fee ? 'error-background' : ''}`}
                                />
                                {errors.fee && <span className="error-message">{errors.fee.message}</span>}
                                ※未入力の場合、住居の賃料が引き継がれます。
                            </div>
                            <div className="md:w-1/5 p-1">
                                <label htmlFor='remark' className="home-label1">備考</label>
                            </div>
                            <div className="md:w-4/5 p-1">
                              <textarea
                                id="remark"
                                {...register('remark')}
                                className={`office-text-aria outline-none `}
                                aria-required="true"
                                onChange={handleInputChange}
                                    value={formData?.remark}
                                style={{ marginTop: '1em' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export { CreateOrEditPopup };
