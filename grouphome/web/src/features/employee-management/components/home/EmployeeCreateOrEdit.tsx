import React, { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { Post } from '@/features/blc-common/utils/ServerRequest';
//import { HomeCss } from '../../assets/HomeCss';
import { setValue } from '@/components/elements/common/CommonUtils';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { Select as ApiPath } from '@/features/blc-common/assets/ApiPath';
//import { FormData } from '../../types/Home'
import { useForm } from 'react-hook-form';
//import { HomeCreateOrEdit } from '../../validations/home';
import { PostalAddress } from '../../../blc-common/components/PostalAddress';
import { zodResolver } from '@hookform/resolvers/zod';

import { HomeCss } from '@/features/office-management/assets/HomeCss';

//import { HomeCreateOrEdit } from '@/features/office-management/validations/home';
import { EmployeeFormData } from '../../types/Employee';
import DatePicker from '@/components/elements/CalendarPicker';
import { EmployeeCreateOrEdit } from '../../validations/employee';
import { CommonInputFile } from '@/components/elements/common/CommonInputFile';
//import { FormData } from '@/features/office-management/types/Home';


interface CreateOrEditPopupProps {
    employeeformData: EmployeeFormData | null;
    setEmployeeFormData: Dispatch<SetStateAction<EmployeeFormData>>;
   // isMatchedTown: Dispatch<SetStateAction<boolean>>;
    //isLoaded: Dispatch<SetStateAction<boolean>>
}

const CreateOrEditPopup = forwardRef(({ employeeformData, setEmployeeFormData,  }: CreateOrEditPopupProps, ref) => {
    const [selPref, setSelPref] = useState([]);
    const [selBranch, setSelBranch] = useState([]);
    const handleInputChange = (e: any) => {
        setValue<EmployeeFormData>(e, setEmployeeFormData);
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
    
    const handleInputFileChange = (file: File | null) => {

        //const extension = file?.name.split('.').pop()?.toLowerCase() || "";
        setEmployeeFormData((prev) => ({
            ...prev,
            fileName: file?.name || "",
            //ext: extension,
            imageEmployee: file,
          
        }));

        document.getElementById("fileName")?.focus();

    };
    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(EmployeeCreateOrEdit),
        defaultValues: employeeformData || {},
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
                <span className="box-title font-bold">情報`</span>
                <div className="">
                    <div className="flex flex-wrap w-full">
                        <div className="flex flex-wrap">
                            <div className="md:w-1/3">
                                <label htmlFor='name' className="home-label1">Tên</label>
                            </div>
                            <div className="md:w-2/3 p-1">
                                <CommonInput
                                    id='name'
                                    {...register('name')}
                                    value={employeeformData?.name}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.name ? 'error-background' : ''}`}
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </div>
                            <div className="md:w-1/3 p-1">
                                <label htmlFor='birthDay' className="home-label1">Ngày Sinh </label>
                            </div>
                            <div className="w-full md:w-1/4">
                                    <label htmlFor='birthDay' className="label-input-custom">Ngày Sinh </label>
                                </div>
                                <div className="w-full md:w-3/4">
                                    <DatePicker
                                        value={employeeformData?.birthDay || null}
                                        {...register('birthDay')}
                                        onChange={handleInputChange}
                                        mode="single"
                                        placeholder="YYYY/MM/DD"
                                        className="custom-datepicker content-center"
                                        inputClassName="custom-input"
                                        format="YYYY/MM/DD"
                                        name="birthDay"
                                    />
                                    {errors.birthDay && <span className="error-message">{errors.birthDay.message}</span>}
                                </div>
                            <div className="md:w-1/3">
                                <label htmlFor='address' className="home-label1">Địa Chỉ</label>
                            </div>
                            <div className="md:w-2/3 p-1">
                                <CommonInput
                                    id='address'
                                    {...register('address')}
                                    value={employeeformData?.address}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.address ? 'error-background' : ''}`}
                                />
                                {errors.address && <span className="error-message">{errors.address.message}</span>}
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor='message' className="home-label1">Ghi Chú</label>
                            </div>
                            <div className="md:w-2/3 p-1">
                                <CommonInput
                                    id='message'
                                    {...register('message')}
                                    value={employeeformData?.message}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.message ? 'error-background' : ''}`}
                                />
                                {errors.message && <span className="error-message">{errors.message.message}</span>}
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor='imageEmployee' className="home-label1">Ảnh</label>
                            </div>
                            <div className="md:w-3/4 p-1">
                                <CommonInputFile
                                    id='imageEmployee'
                                    {...register('imageEmployee')}
                                    value={employeeformData?.imageEmployee}
                                    onChange={handleInputFileChange}
                                    className={`w-full ${errors.imageEmployee ? 'error-background' : ''}`}
                                    accept=".txt, .pdf, image/png, image/jpg, image/gif, image/webp"
                                />
                                {errors.imageEmployee && <span className="error-message">{errors.imageEmployee.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* <div className="box-container-form text-gray-700">
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
                    </div> */}

                </div>
            </div>
        </form>
    );
});

export { CreateOrEditPopup };
