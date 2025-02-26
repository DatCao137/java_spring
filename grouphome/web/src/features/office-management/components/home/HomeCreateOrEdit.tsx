import React, { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { HomeCss } from '../../assets/HomeCss';
import { setValue } from '@/components/elements/common/CommonUtils';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { Select as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { FormData } from '../../types/Home'
import { useForm } from 'react-hook-form';
import { HomeCreateOrEdit } from '../../validations/home';
import { PostalAddress } from '../../../blc-common/components/PostalAddress';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateOrEditPopupProps {
    formData: FormData | null;
    setFormData: Dispatch<SetStateAction<FormData>>;
    isMatchedTown: Dispatch<SetStateAction<boolean>>;
    isLoaded: Dispatch<SetStateAction<boolean>>
}

const CreateOrEditPopup = forwardRef(({ formData, setFormData, isMatchedTown, isLoaded }: CreateOrEditPopupProps, ref) => {
    const [selPref, setSelPref] = useState([]);
    const [selBranch, setSelBranch] = useState([]);
    const handleInputChange = (e: any) => {
        setValue<FormData>(e, setFormData);
    };

    const getSelectData = async () => {
        Post({
            apiPath: ApiPath,
            params: { type: ['cust__branch', 'prefectures'] },
            onSuccess: (res) => {
                setSelPref(res.data.prefectures);

                const convertedSelBranch = res.data.cust__branch.map((item: any) => ({
                    ...item,
                    value: Number(item.value),
                }));

                setSelBranch(convertedSelBranch);
            }
        });
    }
    useEffect(() => {
        getSelectData();
    }, []);

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(HomeCreateOrEdit),
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
                            <div className="md:w-1/3">
                                <label htmlFor='homeName' className="home-label1">ホーム名</label>
                            </div>
                            <div className="md:w-2/3 p-1">
                                <CommonInput
                                    id='homeName'
                                    {...register('homeName')}
                                    value={formData?.homeName}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.homeName ? 'error-background' : ''}`}
                                />
                                {errors.homeName && <span className="error-message">{errors.homeName.message}</span>}
                            </div>
                            <div className="md:w-1/3 p-1">
                                <label htmlFor='branchId' className="home-label1">事業所名</label>
                            </div>
                            <div className="md:w-2/3 p-1">
                                <CommonSelect
                                    id='branchId'
                                    {...register('branchId')}
                                    options={selBranch}
                                    value={formData?.branchId}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.branchId ? 'error-background' : ''}`}
                                />
                                {errors.branchId && <span className="error-message">{errors.branchId.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="box-container-form text-gray-700">
                        <span className="box-title text-xl pt-0">所在地</span>
                        <div className="w-full">
                            <PostalAddress
                                onChange={handleInputChange}
                                isMatchedTown={isMatchedTown}
                                formData={formData}
                                register={register}
                                errors={errors}
                                isLoaded={isLoaded}
                            />
                            <div className="md:w-1/3 px-1">
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
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
});

export { CreateOrEditPopup };
