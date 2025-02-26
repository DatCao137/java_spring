import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { setValue } from '@/components/elements/common/CommonUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileCreateOrEdit } from '@/features/office-management/validations/inquiry';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { ProfileFormData } from '@/features/customer-management/types/Inquiry';
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';

interface props {
    formData: ProfileFormData | null;
    setFormData: Dispatch<SetStateAction<ProfileFormData>>;
}

const FormCreateOrEdit = forwardRef(({ formData, setFormData }: props, ref) => {
    const { selectListData } = useSelectList();
    const selPocketBook = selectListData.get('pocket_book') || [];
    const selWheelChair = selectListData.get('car_char') || [];

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(ProfileCreateOrEdit),
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
        setValue<ProfileFormData>(e, setFormData);
    };

    return (
        <form>
            <div className="box-container-form box-container-parent">
                <span className="box-title text-xl pt-0 font-bold">本人プロフィール</span>
                <div className="">
                    <div className="flex flex-wrap w-full">
                        <div className="w-full md:w-1/2 panel-left">
                            <div className="box-profile">
                                <div className='box-container-form text-gray-700'>
                                    <span className="box-title">紹介者</span>
                                    <div className="w-full">
                                        <CommonInput
                                            id='introducerName'
                                            {...register('introducerName')}
                                            title="機関名等"
                                            className={`w-full ${errors.introducerName ? 'error-background' : ''}`}
                                            value={formData?.introducerName}
                                            onChange={handleInputChange}
                                        />
                                        {errors.introducerName && <span className="error-message">{errors.introducerName.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='introducerType'
                                            {...register('introducerType')}
                                            title="機関種別"
                                            className={`w-full ${errors.introducerType ? 'error-background' : ''}`}
                                            value={formData?.introducerType}
                                            onChange={handleInputChange}
                                        />
                                        {errors.introducerType && <span className="error-message">{errors.introducerType.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='introducerAddr'
                                            {...register('introducerAddr')}
                                            title="所在地"
                                            className={`w-full ${errors.introducerAddr ? 'error-background' : ''}`}
                                            value={formData?.introducerAddr}
                                            onChange={handleInputChange}
                                        />
                                        {errors.introducerAddr && <span className="error-message">{errors.introducerAddr.message}</span>}
                                    </div>
                                </div>

                                <div className='box-container-form text-gray-700'>
                                    <span className="box-title">障がい特性</span>
                                    <div className="w-full">
                                        <CommonInput
                                            id='disabledType'
                                            {...register('disabledType')}
                                            title="種別"
                                            className={`w-full ${errors.disabledType ? 'error-background' : ''}`}
                                            value={formData?.disabledType}
                                            onChange={handleInputChange}
                                        />
                                        {errors.disabledType && <span className="error-message">{errors.disabledType.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='disabledClass'
                                            {...register('disabledClass')}
                                            title="区分"
                                            className={`w-full ${errors.disabledClass ? 'error-background' : ''}`}
                                            value={formData?.disabledClass}
                                            onChange={handleInputChange}
                                        />
                                        {errors.disabledClass && <span className="error-message">{errors.disabledClass.message}</span>}
                                    </div>
                                </div>

                                <div className='box-container-form text-gray-700'>
                                    <span className="box-title">手帳状況</span>
                                    <div className="w-full">
                                        <CommonSelect
                                            id='pocketBookType'
                                            {...register('pocketBookType')}
                                            title="手帳有無"
                                            options={selPocketBook}
                                            value={formData?.pocketBookType}
                                            onChange={handleInputChange}
                                            className={`w-full ${errors.pocketBookType ? 'error-background' : ''}`}
                                        />
                                        {errors.pocketBookType && <span className="error-message">{errors.pocketBookType.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='pocketBookGrade'
                                            {...register('pocketBookGrade')}
                                            title="等級"
                                            className={`w-full ${errors.pocketBookGrade ? 'error-background' : ''}`}
                                            value={formData?.pocketBookGrade}
                                            onChange={handleInputChange}
                                        />
                                        {errors.pocketBookGrade && <span className="error-message">{errors.pocketBookGrade.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonSelect
                                            id='pocketBookWheelChair'
                                            {...register('pocketBookWheelChair')}
                                            title="車椅子"
                                            options={selWheelChair}
                                            value={formData?.pocketBookWheelChair}
                                            onChange={handleInputChange}
                                            className={`w-full ${errors.pocketBookWheelChair ? 'error-background' : ''}`}
                                        />
                                        {errors.pocketBookWheelChair && <span className="error-message">{errors.pocketBookWheelChair.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 pl-3 panel-right">
                            <div className="box-profile">
                                <div className='box-container-form text-gray-700'>
                                    <span className="box-title">利用中サービス</span>
                                    <div className="w-full">
                                        <CommonInput
                                            id='serviceDays'
                                            {...register('serviceDays')}
                                            title="日中活動"
                                            className={`w-full ${errors.serviceDays ? 'error-background' : ''}`}
                                            value={formData?.serviceDays}
                                            onChange={handleInputChange}
                                        />
                                        {errors.serviceDays && <span className="error-message">{errors.serviceDays.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='serviceName'
                                            {...register('serviceName')}
                                            title="日中活動先名"
                                            className={`w-full ${errors.serviceName ? 'error-background' : ''}`}
                                            value={formData?.serviceName}
                                            onChange={handleInputChange}
                                        />
                                        {errors.serviceName && <span className="error-message">{errors.serviceName.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='serviceAddr'
                                            {...register('serviceAddr')}
                                            title="所在地"
                                            className={`w-full ${errors.serviceAddr ? 'error-background' : ''}`}
                                            value={formData?.serviceAddr}
                                            onChange={handleInputChange}
                                        />
                                        {errors.serviceAddr && <span className="error-message">{errors.serviceAddr.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='serviceVisit'
                                            {...register('serviceVisit')}
                                            title="訪問サービス"
                                            className={`w-full ${errors.serviceVisit ? 'error-background' : ''}`}
                                            value={formData?.serviceVisit}
                                            onChange={handleInputChange}
                                        />
                                        {errors.serviceVisit && <span className="error-message">{errors.serviceVisit.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='serviceEtc'
                                            {...register('serviceEtc')}
                                            title="その他サービス"
                                            className={`w-full ${errors.serviceEtc ? 'error-background' : ''}`}
                                            value={formData?.serviceEtc}
                                            onChange={handleInputChange}
                                        />
                                        {errors.serviceEtc && <span className="error-message">{errors.serviceEtc.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='serviceRecipient'
                                            {...register('serviceRecipient')}
                                            title="受給者証"
                                            className={`w-full ${errors.serviceRecipient ? 'error-background' : ''}`}
                                            value={formData?.serviceRecipient}
                                            onChange={handleInputChange}
                                        />
                                        {errors.serviceRecipient && <span className="error-message">{errors.serviceRecipient.message}</span>}
                                    </div>
                                </div>
                                <div className='box-container-form text-gray-700'>
                                    <span className="box-title">現在の住居</span>
                                    <div className="w-full">
                                        <CommonInput
                                            id='residenceType'
                                            {...register('residenceType')}
                                            title="住居種別"
                                            className={`w-full ${errors.residenceType ? 'error-background' : ''}`}
                                            value={formData?.residenceType}
                                            onChange={handleInputChange}
                                        />
                                        {errors.residenceType && <span className="error-message">{errors.residenceType.message}</span>}
                                    </div>
                                    <div className="w-full">
                                        <CommonInput
                                            id='residenceRemark'
                                            {...register('residenceRemark')}
                                            title="住居名、備考等"
                                            className={`w-full ${errors.residenceRemark ? 'error-background' : ''}`}
                                            value={formData?.residenceRemark}
                                            onChange={handleInputChange}
                                        />
                                        {errors.residenceRemark && <span className="error-message">{errors.residenceRemark.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export { FormCreateOrEdit };
