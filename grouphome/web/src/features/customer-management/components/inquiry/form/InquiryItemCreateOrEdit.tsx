import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { CommonCheckBox } from '@/components/elements/common/CommonCheckBox';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { Select as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { setValue } from '@/components/elements/common/CommonUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InquiryCreateOrEdit, InquiryDetailCreateOrEdit } from '@/features/office-management/validations/inquiry';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { CommonCheckBoxRadio } from '@/components/elements/common/CommonCheckBoxRadio';
import { InquiryItemFormData } from '@/features/customer-management/types/Inquiry';
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import DatePicker from '@/components/elements/CalendarPicker';

interface Option {
    name: string;
    value: string | null;
}

interface CreateOrEditPopupProps {
    formData: InquiryItemFormData | null;
    setFormData: Dispatch<SetStateAction<InquiryItemFormData>>;
}

const CreateOrEditPopup = forwardRef(({ formData, setFormData }: CreateOrEditPopupProps, ref) => {
    const { selectListData } = useSelectList();
    const selCustProgres = selectListData.get('cust_progres') || [];
    const selSupportPlanStatus = selectListData.get('support_plan_status') || [];
    const selCustHome = selectListData.get('cust__home') || [];

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(InquiryDetailCreateOrEdit),
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
        if (e && e.target) {
            let { id, value} = e.target;
            if( ["breakdownSelf", "breakdownFamily", "breakdownSupport", "breakdownCounselor", "breakdownThirdParty"].includes(id) && formData){
                let newValue = 0;
                if( value.trim() == "" || /^[0-9]+$/.test(value) ) {
                    newValue = Number(value);
                } 

                setFormData((prev: any) => {
                    const currentValue = Number(prev[id]); 
                    const total = Number(prev["breakdownSum"]);
                    return { ...prev, ["breakdownSum"]: (isNaN(total) ? 0 : total)  + (isNaN(newValue) ? 0 : newValue)  - (isNaN(currentValue) ? 0 : currentValue)}; 
                });

                setFormData((prev: any) => {
                    return { ...prev, [id]: newValue}
                });

                return;
            }
        }
        setValue<InquiryItemFormData>(e, setFormData);
    };

    return (
        <form>
            <div className="box-container-form box-container-parent">
                <span className="box-title text-xl pt-0 font-bold">コンタクト・進捗管理</span>
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="w-full pb-2">
                            <div className="w-full">
                                <CommonSelect
                                    id='status'
                                    {...register('status')}
                                    title="進捗状況"
                                    options={selCustProgres}
                                    value={formData?.status}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    className={`w-full ${errors.status ? 'error-background' : ''}`}
                                />
                                {errors.status && <span className="error-message">{errors.status.message}</span>}
                            </div>

                            <div className="w-full">
                                <CommonInput
                                    id='ghData'
                                    {...register('ghData')}
                                    title="契約GH転送用データ"
                                    placeholder="契約GH転送用データ"
                                    className={`w-full ${errors.ghData ? 'error-background' : ''}`}
                                    value={formData?.ghData}
                                    onChange={handleInputChange}
                                />
                                {errors.ghData && <span className="error-message">{errors.ghData.message}</span>}
                            </div>
                        </div>
                        <div className="w-full pb-2">
                            <div className="flex flex-wrap">
                                <div className="w-full">
                                    <CommonSelect
                                        id='homeId'
                                        {...register('homeId')}
                                        title="対象ホーム"
                                        options={selCustHome}
                                        value={formData?.homeId}
                                        onChange={handleInputChange}
                                        className={`w-full ${errors.homeId ? 'error-background' : ''}`}
                                    />
                                    {errors.homeId && <span className="error-message">{errors.homeId.message}</span>}
                                </div>

                                <div id="" className="w-full">
                                    <label className="label-input-custom" htmlFor="date">日付</label>
                                    <DatePicker
                                        value={formData?.date || null}
                                        {...register('date')}
                                        onChange={handleInputChange}
                                        mode="single"
                                        placeholder="YYYY年MM月DD日"
                                        className="custom-datepicker content-center"
                                        inputClassName="custom-input"
                                        format="YYYY年MM月DD日"
                                        name="date"
                                    />

                                    {errors.date && <span className="error-message">{errors.date.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-container-form text-gray-700 mb-2">
                        <span className="box-title text-xl pt-0">内訳人数</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            <div className="w-full pb-2">
                                <div className="w-full">
                                    <CommonInput
                                        id='breakdownSelf'
                                        {...register('breakdownSelf')}
                                        title="本人"
                                        placeholder="本人"
                                        className={`w-full ${errors.breakdownSelf ? 'error-background' : ''}`}
                                        value={formData?.breakdownSelf}
                                        onChange={handleInputChange}
                                    />
                                    {errors.breakdownSelf && <span className="error-message">{errors.breakdownSelf.message}</span>}
                                </div>
                                <div className="w-full">
                                    <CommonInput
                                        id='breakdownSupport'
                                        {...register('breakdownSupport')}
                                        title="支援員"
                                        placeholder="支援員"
                                        className={`w-full ${errors.breakdownSupport ? 'error-background' : ''}`}
                                        value={formData?.breakdownSupport}
                                        onChange={handleInputChange}
                                    />
                                    {errors.breakdownSupport && <span className="error-message">{errors.breakdownSupport.message}</span>}
                                </div>
                            </div>
                            <div className="w-full pb-2">
                                <div className="w-full">
                                    <CommonInput
                                        id='breakdownFamily'
                                        {...register('breakdownFamily')}
                                        title="ご家族"
                                        placeholder="ご家族"
                                        className={`w-full ${errors.breakdownFamily ? 'error-background' : ''}`}
                                        value={formData?.breakdownFamily}
                                        onChange={handleInputChange}
                                    />
                                    {errors.breakdownFamily && <span className="error-message">{errors.breakdownFamily.message}</span>}
                                </div>
                                <div className="w-full">
                                    <CommonInput
                                        id='breakdownThirdParty'
                                        {...register('breakdownThirdParty')}
                                        title="第三者"
                                        placeholder="第三者"
                                        className={`w-full ${errors.breakdownThirdParty ? 'error-background' : ''}`}
                                        value={formData?.breakdownThirdParty}
                                        onChange={handleInputChange}
                                    />
                                    {errors.breakdownThirdParty && <span className="error-message">{errors.breakdownThirdParty.message}</span>}
                                </div>
                            </div>
                            <div className="w-full pb-2">
                                <div className="w-full">
                                    <CommonInput
                                        id='breakdownCounselor'
                                        {...register('breakdownCounselor')}
                                        title="相談員"
                                        placeholder="相談員"
                                        className={`w-full ${errors.breakdownCounselor ? 'error-background' : ''}`}
                                        value={formData?.breakdownCounselor}
                                        onChange={handleInputChange}
                                    />
                                    {errors.breakdownCounselor && <span className="error-message">{errors.breakdownCounselor.message}</span>}
                                </div>
                                <div className="w-full">
                                    <CommonInput
                                        title="合計"
                                        placeholder="合計"
                                        className={`w-full`}
                                        value={formData?.breakdownSum}
                                        disabled={true}
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-container-form text-gray-700 mb-2">
                        <span className="box-title text-xl pt-0">備考欄</span>
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            <div className="w-full pb-2 col-span-1">
                                <div className="w-full">
                                    <CommonInput
                                        id='recordTime'
                                        {...register('recordTime')}
                                        title="問合せ時刻"
                                        type="time"
                                        className={`w-full ${errors.recordTime ? 'error-background' : ''}`}
                                        value={formData?.recordTime}
                                        onChange={handleInputChange}
                                    />
                                    {errors.recordTime && <span className="error-message">{errors.recordTime.message}</span>}
                                </div>
                                <div className="w-full">
                                    <label className="label-input-custom" htmlFor="recordSsCompletion">SS終了日</label>
                                    <DatePicker
                                        value={formData?.recordSsCompletion || null}
                                        {...register('recordSsCompletion')}
                                        onChange={handleInputChange}
                                        mode="single"
                                        placeholder="YYYY年MM月DD日"
                                        className="custom-datepicker content-center"
                                        inputClassName="custom-input"
                                        format="YYYY年MM月DD日(ddd)"
                                        name="recordSsCompletion"
                                    />
                                    {errors.recordSsCompletion && <span className="error-message">{errors.recordSsCompletion.message}</span>}
                                </div>
                            </div>
                            <div className="w-full pb-2 col-span-1">
                                <div className="w-full">
                                    <CommonInput
                                        id='recordVisitTime'
                                        {...register('recordVisitTime')}
                                        title="見学時刻"
                                        type="time"
                                        className={`w-full ${errors.recordVisitTime ? 'error-background' : ''}`}
                                        value={formData?.recordVisitTime}
                                        onChange={handleInputChange}
                                    />
                                    {errors.recordVisitTime && <span className="error-message">{errors.recordVisitTime.message}</span>}
                                </div>
                                <div className="w-full">
                                    <CommonInput
                                        id='recordContractDate'
                                        {...register('recordContractDate')}
                                        title="契約時刻"
                                        type="time"
                                        className={`w-full ${errors.recordContractDate ? 'error-background' : ''}`}
                                        value={formData?.recordContractDate}
                                        onChange={handleInputChange}
                                    />
                                    {errors.recordContractDate && <span className="error-message">{errors.recordContractDate.message}</span>}
                                </div>
                            </div>
                            <div className="w-full pb-2 col-span-2">

                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <label className="label-input-custom" htmlFor="recordFreeTrial">(無料)体験終了日</label>
                                        <DatePicker
                                            value={formData?.recordFreeTrial || null}
                                            {...register('recordFreeTrial')}
                                            onChange={handleInputChange}
                                            mode="single"
                                            placeholder="YYYY年MM月DD日"
                                            className="custom-datepicker content-center"
                                            inputClassName="custom-input"
                                            format="YYYY年MM月DD日(ddd)"
                                            name="recordFreeTrial"
                                        />
                                        {errors.recordFreeTrial && <span className="error-message">{errors.recordFreeTrial.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <label className="label-input-custom" htmlFor="recordPaidTrial">(有料)体験修了日</label>
                                        <DatePicker
                                            value={formData?.recordPaidTrial || null}
                                            {...register('recordPaidTrial')}
                                            onChange={handleInputChange}
                                            mode="single"
                                            placeholder="YYYY年MM月DD日"
                                            className="custom-datepicker content-center"
                                            inputClassName="custom-input"
                                            format="YYYY年MM月DD日(ddd)"
                                            name="recordPaidTrial"
                                        />
                                        {errors.recordPaidTrial && <span className="error-message">{errors.recordPaidTrial.message}</span>}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <CommonSelect
                                        id='recordPlanStatus'
                                        {...register('recordPlanStatus')}
                                        title="支援計画状況"
                                        options={selSupportPlanStatus}
                                        value={formData?.recordPlanStatus}
                                        onChange={handleInputChange}
                                        className={`w-full ${errors.recordPlanStatus ? 'error-background' : ''}`}
                                    />
                                    {errors.recordPlanStatus && <span className="error-message">{errors.recordPlanStatus.message}</span>}
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
