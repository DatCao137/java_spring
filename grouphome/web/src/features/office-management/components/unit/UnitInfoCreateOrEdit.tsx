import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { CommonCheckBox } from '@/components/elements/common/CommonCheckBox';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { TypeFormData, TypeUnitInfoSaveDto } from '../../types/UnitInfo';
import { Select as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { setValue } from '@/components/elements/common/CommonUtils';
import { useForm } from 'react-hook-form';
import { OfficeUnitInfoCreateOrEdit } from '../../validations/office';
import { PostalAddress } from '../../../blc-common/components/PostalAddress';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/elements/CalendarPicker';

interface CreateOrEditPopupProps {
    formData: TypeFormData | null;
    setFormData: Dispatch<SetStateAction<TypeFormData>>;
    isMatchedTown: Dispatch<SetStateAction<boolean>>;
    isLoaded: Dispatch<SetStateAction<boolean>>
}

const CreateOrEditPopup = forwardRef(({ formData, setFormData, isMatchedTown, isLoaded }: CreateOrEditPopupProps, ref) => {
    const [selPref, setSelPref] = useState([]);

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(OfficeUnitInfoCreateOrEdit),
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
            if(id == "capacity" && !/^[0-9]*$/.test(value)) {
                return;
            }
        }
        setValue<TypeFormData>(e, setFormData);
    };

    const getSelectData = async () => {
        Post({
            apiPath: ApiPath,
            params: { type: ['prefectures'] },
            onSuccess: (res) => {
                setSelPref(res.data.prefectures);
            }
        });
    }
    useEffect(() => {
        getSelectData();
    }, []);

    return (
        <form>
            <div className="box-container-form box-container-parent">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="w-full pb-2">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/4">
                                    <label htmlFor='name' className="label-input-custom">共同生活住居名</label>
                                </div>
                                <div className="w-full md:w-3/4">
                                    <CommonInput
                                        id='name'
                                        {...register('name')}
                                        value={formData?.name}
                                        onChange={handleInputChange}
                                        className={`w-full ${errors.name ? 'error-background' : ''}`}
                                    />
                                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="w-full pb-2">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/4">
                                    <label htmlFor='startDate' className="label-input-custom">指定日</label>
                                </div>
                                <div className="w-full md:w-3/4">
                                    <DatePicker
                                        value={formData?.startDate || null}
                                        {...register('startDate')}
                                        onChange={handleInputChange}
                                        mode="single"
                                        placeholder="YYYY年MM月DD日"
                                        className="custom-datepicker content-center"
                                        inputClassName="custom-input"
                                        format="YYYY年MM月DD日"
                                        name="startDate"
                                    />
                                    {errors.startDate && <span className="error-message">{errors.startDate.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="w-full pb-2">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/4">
                                    <label htmlFor='mail' className="label-input-custom">メール</label>
                                </div>
                                <div className="w-full md:w-3/4">
                                    <CommonInput
                                        id='mail'
                                        {...register('mail')}
                                        value={formData?.mail}
                                        onChange={handleInputChange}
                                        className={`w-full ${errors.mail ? 'error-background' : ''}`}
                                    />
                                    {errors.mail && <span className="error-message">{errors.mail.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="w-full pb-2">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/4">
                                    <label htmlFor='mail' className="label-input-custom">定員数</label>
                                </div>
                                <div className="w-full md:w-3/4">
                                    <CommonInput
                                        id='capacity'
                                        {...register('capacity')}
                                        value={formData?.capacity}
                                        onChange={handleInputChange}
                                        type='number'
                                        className={`w-full ${errors.capacity ? 'error-background' : ''}`}
                                    />
                                    {errors.capacity && <span className="error-message">{errors.capacity.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box-container-form text-gray-700 mb-2">
                        <span className="box-title text-xl pt-0">所在地</span>
                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-3/4 pr-4">
                                <PostalAddress
                                    onChange={handleInputChange}
                                    isMatchedTown={isMatchedTown}
                                    formData={formData}
                                    register={register}
                                    errors={errors}
                                    isLoaded={isLoaded}
                                />
                            </div>

                            <div className="w-full md:w-1/4 flex flex-col space-y-4">
                                <div className="w-full">
                                    <CommonInput
                                        id='tel'
                                        {...register('tel')}
                                        title="電話番号"
                                        placeholder="電話番号"
                                        className={`w-full ${errors.tel ? 'error-background' : ''}`}
                                        value={formData?.tel}
                                        onChange={handleInputChange}
                                    />
                                    {errors.tel && <span className="error-message">{errors.tel.message}</span>}
                                </div>
                                <div className="w-full">
                                    <CommonInput
                                        id='fax'
                                        {...register('fax')}
                                        title="FAX番号"
                                        placeholder="FAX番号"
                                        className={`w-full ${errors.fax ? 'error-background' : ''}`}
                                        value={formData?.fax}
                                        onChange={handleInputChange}
                                    />
                                    {errors.fax && <span className="error-message">{errors.fax.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="box-container-form md:w-2/5 ">
                            <span className="box-title text-xl">サービス内容</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                <div className="pl-2 text-center">
                                    <label htmlFor='serviceGH' className="check-box-label">グループホーム</label>
                                    <CommonCheckBox
                                        id='serviceGH'
                                        {...register('serviceGH')}
                                        checked={formData ? formData?.serviceGH : false}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="pl-2 text-center">
                                    <label htmlFor='serviceSS' className="check-box-label">ショートステイ</label>
                                    <CommonCheckBox
                                        id='serviceSS'
                                        {...register('serviceSS')}
                                        checked={formData ? formData?.serviceSS : false}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="box-container-form md:w-3/5 ">
                            <span className="box-title text-xl">特色</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="pl-2 items-center">
                                    <label htmlFor='featuresSystem' className="check-box-label">24時間</label>
                                    <CommonCheckBox
                                        id='featuresSystem'
                                        {...register('featuresSystem')}
                                        checked={formData ? formData?.featuresSystem : false}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="pl-2">
                                    <label htmlFor='featuresBarrierFree' className="check-box-label">バリアフリー</label>
                                    <CommonCheckBox
                                        id='featuresBarrierFree'
                                        {...register('featuresBarrierFree')}
                                        checked={formData ? formData?.featuresBarrierFree : false}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="pl-2">
                                    <label htmlFor='featuresMenOnly' className="check-box-label">男性専用</label>
                                    <CommonCheckBox
                                        id='featuresMenOnly'
                                        {...register('featuresMenOnly')}
                                        checked={formData ? formData?.featuresMenOnly : false}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="pl-2">
                                    <label htmlFor='featuresWomenOnly' className="check-box-label">女性専用</label>
                                    <CommonCheckBox
                                        id='featuresWomenOnly'
                                        {...register('featuresWomenOnly')}
                                        checked={formData ? formData?.featuresWomenOnly : false}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full pb-2">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/4">
                                <label htmlFor='concept' className="label-input-custom">コンセプト</label>
                            </div>
                            <div className="w-full md:w-3/4">
                                <textarea
                                    id="concept"
                                    {...register('concept')}
                                    value={formData?.concept}
                                    className={`text-aria-custom outline-none ${errors.concept ? 'error-background' : ''}`}
                                    aria-required="true"
                                    onChange={handleInputChange}
                                />
                                {errors.concept && <span className="error-message">{errors.concept.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export { CreateOrEditPopup };
