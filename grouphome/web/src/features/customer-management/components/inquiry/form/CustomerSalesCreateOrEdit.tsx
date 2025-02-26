import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { CustomerSalesInfo } from '@/features/customer-management/types/Inquiry'
import { setValue } from '@/components/elements/common/CommonUtils';
import { useForm } from 'react-hook-form';
import { CustomerSalesSave } from '../../../validator/inquiry/CustomerSalesSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/elements/CalendarPicker';

interface CreateOrEditPopupProps {
    formData: CustomerSalesInfo | null;
    firstInquiryHowList: any;
    setFormData: Dispatch<SetStateAction<CustomerSalesInfo>>;
}

const CreateOrEditPopup = forwardRef(({ formData, firstInquiryHowList, setFormData }: CreateOrEditPopupProps, ref) => {

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(CustomerSalesSave),
        defaultValues: formData || {},
    });

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
        setValue<CustomerSalesInfo>(e, setFormData);
    };

    return (
        <form>
            <div className="box-container-form box-container-parent">
                <div className="">
                    <span className="box-title text-xl pt-0">営業ツール</span>
                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">流入経路</div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/2 px-1">
                                <label className="label-input-custom" htmlFor="firstInquiryDate">初回問合わせ</label>
                                <DatePicker
                                    value={formData?.firstInquiryDate || null}
                                    {...register('firstInquiryDate')}
                                    onChange={handleInputChange}
                                    mode="single"
                                    placeholder="YYYY年MM月DD日"
                                    className="custom-datepicker content-center"
                                    inputClassName="custom-input"
                                    format="YYYY年MM月DD日"
                                    name="firstInquiryDate"
                                />
                                {errors.firstInquiryDate && <span className="error-message">{errors.firstInquiryDate.message}</span>}
                            </div>

                            <div className="w-full md:w-1/2 px-1">
                                <CommonSelect
                                    id='firstInquiryHow'
                                    {...register('firstInquiryHow')}
                                    options={firstInquiryHowList}
                                    value={formData?.firstInquiryHow}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.firstInquiryHow ? 'error-background' : ''}`}
                                    title="初回問合わせ方法"
                                />
                                {errors.firstInquiryHow && <span className="error-message">{errors.firstInquiryHow.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">ご連絡先</div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/2 px-1">
                                <CommonInput
                                    id='tel'
                                    {...register('tel')}
                                    title="TEL"
                                    className={`w-full ${errors.tel ? 'error-background' : ''}`}
                                    value={formData?.tel}
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                {errors.tel && <span className="error-message">{errors.tel.message}</span>}
                            </div>

                            <div className="w-full md:w-1/2 px-1">
                                <CommonInput
                                    id='maker'
                                    {...register('maker')}
                                    title="意思決定者連絡先"
                                    className={`w-full ${errors.maker ? 'error-background' : ''}`}
                                    value={formData?.maker}
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                {errors.maker && <span className="error-message">{errors.maker.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/2 px-1">
                                <CommonInput
                                    id='fax'
                                    {...register('fax')}
                                    title="FAX"
                                    className={`w-full ${errors.fax ? 'error-background' : ''}`}
                                    value={formData?.fax}
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                {errors.fax && <span className="error-message">{errors.fax.message}</span>}
                            </div>

                            <div className="w-full md:w-1/2 px-1">
                                <CommonInput
                                    id='name'
                                    {...register('name')}
                                    title="氏名"
                                    className={`w-full ${errors.name ? 'error-background' : ''}`}
                                    value={formData?.name}
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/2 px-1">
                                <CommonInput
                                    id='mail'
                                    {...register('mail')}
                                    title="Mail"
                                    className={`w-full ${errors.mail ? 'error-background' : ''}`}
                                    value={formData?.mail}
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                {errors.mail && <span className="error-message">{errors.mail.message}</span>}
                            </div>

                            <div className="w-full md:w-1/2 px-1">
                                <CommonInput
                                    id='address'
                                    {...register('address')}
                                    title="ご住所"
                                    className={`w-full ${errors.address ? 'error-background' : ''}`}
                                    value={formData?.address}
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                {errors.address && <span className="error-message">{errors.address.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/2 px-1">
                                
                            </div>

                            <div className="w-full md:w-1/2 px-1">
                                <CommonInput
                                    id='contactableHour'
                                    {...register('contactableHour')}
                                    title="連絡可能時間帯"
                                    className={`w-full ${errors.contactableHour ? 'error-background' : ''}`}
                                    value={formData?.contactableHour}
                                    type="text"
                                    onChange={handleInputChange}
                                />
                                {errors.contactableHour && <span className="error-message">{errors.contactableHour.message}</span>}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </form>
    );

});

export { CreateOrEditPopup };
