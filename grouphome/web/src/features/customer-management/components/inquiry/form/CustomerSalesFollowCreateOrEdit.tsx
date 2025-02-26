import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { CustomerSalesFollowInfo } from '@/features/customer-management/types/Inquiry'
import { setValue } from '@/components/elements/common/CommonUtils';
import { useForm } from 'react-hook-form';
import { CustomerSalesFollowSave } from '../../../validator/inquiry/CustomerSalesFollowSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/elements/CalendarPicker';

interface CreateOrEditPopupProps {
    formData: CustomerSalesFollowInfo | null;
    staffList: any;
    setFormData: Dispatch<SetStateAction<CustomerSalesFollowInfo>>;
}

const CreateOrEditPopup = forwardRef(({ formData, staffList, setFormData }: CreateOrEditPopupProps, ref) => {
    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(CustomerSalesFollowSave),
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
        if ( e.target ) {
            let { id, value } = e.target;
            if (id === 'step') {
                if( value.trim() == "" || !/^[0-9]+$/.test(value) ) {
                    return;
                }
            }

            if (id === 'staffId') {
                let textSelected = e.target.options[e.target.selectedIndex].text;
                let objInput = {'staffName': textSelected}
                setValue<CustomerSalesFollowInfo>(objInput, setFormData);
            }
        }
        setValue<CustomerSalesFollowInfo>(e, setFormData);
    };

    return (
        <form>
            <div className="box-container-form box-container-parent customerSalesFollowCreateOrEdit">
                <div className="">
                    <span className="box-title text-xl pt-0">営業ツール</span>
                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/4 px-1">
                                <CommonInput
                                    id='step'
                                    {...register('step')}
                                    type='number'
                                    value={formData?.step}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.step ? 'error-background' : ''}`}
                                    min={1}
                                    title="フォロー回"
                                />
                                {errors.step && <span className="error-message">{errors.step.message}</span>}
                            </div>
                            <div className="w-full md:w-1/4 px-1 d-block mt-6">
                                <span>回目フォロー</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/2 px-1">
                                {/* <CommonInput
                                    id='followDate'
                                    {...register('followDate')}
                                    type='date'
                                    value={formData?.followDate}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.followDate ? 'error-background' : ''}`}
                                    title="フォロー日付"
                                /> */}
                                <label className="label-input-custom" htmlFor="followDate">初回問合わせ</label>
                                <DatePicker
                                    value={formData?.followDate || null}
                                    {...register('followDate')}
                                    onChange={handleInputChange}
                                    mode="single"
                                    placeholder="YYYY年MM月DD日"
                                    className="custom-datepicker content-center"
                                    inputClassName="custom-input"
                                    format="YYYY年MM月DD日(ddd)"
                                    name="followDate"
                                />
                                {errors.followDate && <span className="error-message">{errors.followDate.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-1/2 px-1">
                                <CommonSelect
                                    id='staffId'
                                    {...register('staffId')}
                                    options={staffList}
                                    value={formData?.staffId}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.staffId ? 'error-background' : ''}`}
                                    title="担当職員"
                                />
                                {errors.staffId && <span className="error-message">{errors.staffId.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-2">
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-2/2 px-1">
                                <CommonInput
                                    id='contents'
                                    {...register('contents')}
                                    title="フォロー内容"
                                    className={`w-full ${errors.contents ? 'error-background' : ''}`}
                                    value={formData?.contents}
                                    type="textarea"
                                    onChange={handleInputChange}
                                />
                                {errors.contents && <span className="error-message">{errors.contents.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );

});

export { CreateOrEditPopup };
