import { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import { OfficeCss } from '../../assets/OfficeCss';
import { setValue } from '@/components/elements/common/CommonUtils';
import { CommonSelect } from '@/components/elements/common/CommonSelect';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { FormData } from '../../types/Branch';
import { useForm } from 'react-hook-form';
import { OfficeCreateOrEdit } from '@/features/office-management/validations/office';
import { PostalAddress } from '../../../blc-common/components/PostalAddress';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { Select as ApiPathSelect} from '@/features/blc-common/assets/ApiPath';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateOrEditPopupProps {
    formData: FormData | null;
    setFormData: Dispatch<SetStateAction<FormData>>;
    isMatchedTown: Dispatch<SetStateAction<boolean>>;
    isLoaded: Dispatch<SetStateAction<boolean>>
}

const CreateOrEditPopup = forwardRef(({ formData, setFormData, isMatchedTown, isLoaded }: CreateOrEditPopupProps, ref) => {
    const [selType, setSelType] = useState([]);
    const [selClassDivision, setSelClassDivision] = useState([]);

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(OfficeCreateOrEdit),
        defaultValues: formData || {},
    });

    // Expose validateForm function to parent component
    useImperativeHandle(ref, () => ({
        validateForm: async () => {
            const isValid = await trigger();
            return isValid;
        }
    }));

    const handleInputChange = (e: any) => {
        if ( e.target ) {
            let { id, value } = e.target;
            if(id == "fee" && !/^[0-9]*$/.test(value)) {
                return;
            }
        }
        setValue<FormData>(e, setFormData);
    };

    const getSelectData = async () => {
        Post({
            apiPath: ApiPathSelect,
            params: { type: ['group_home_type', 'class_division'] },
            onSuccess: (res) => {
                setSelType(res.data.group_home_type);
                setSelClassDivision(res.data.class_division);
            }
        });
    };

    useEffect(() => {
        getSelectData();
    }, []);

    <style>
        <OfficeCss />
    </style>
    return (
        <form>
            <div className="box-container-form box-container-parent">
                <span className="box-title font-bold">基本情報</span>
                <div className="">
                    <div className="flex flex-wrap w-full">
                        <div className="w-full md:w-1/5 text-center">
                            <CommonInput
                                id='no'
                                {...register('no')}
                                value={formData?.no}
                                type='number'
                                onChange={handleInputChange}
                                className={`office-code-box w-full ${errors.no ? 'error-background' : ''}`}
                            />
                            {errors.no && <span className="error-message">{errors.no.message}</span>}
                        </div>
                        <div className="w-full md:w-2/5 pl-4">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/3">
                                    <label htmlFor='branchName' className="office-label1">事業所名</label>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <CommonInput
                                        id='branchName'
                                        {...register('branchName')}
                                        value={formData?.branchName}
                                        onChange={handleInputChange}
                                        className={`w-full ${errors.branchName ? 'error-background' : ''}`}
                                    />
                                    {errors.branchName && <span className="error-message">{errors.branchName.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                            <div className="pl-2">
                                <CommonSelect
                                    id='groupHomeTypeId'
                                    {...register('groupHomeTypeId')}
                                    title='類型'
                                    options={selType}
                                    value={formData?.groupHomeTypeId}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.groupHomeTypeId ? 'error-background' : ''}`}
                                />
                                {errors.groupHomeTypeId && <span className="error-message">{errors.groupHomeTypeId.message}</span>}
                            </div>

                            <div className="pl-2">
                                <CommonSelect
                                    id='classDivisionId'
                                    {...register('classDivisionId')}
                                    title='級地区分'
                                    options={selClassDivision}
                                    value={formData?.classDivisionId}
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.classDivisionId ? 'error-background' : ''}`}
                                />
                                {errors.classDivisionId && <span className="error-message">{errors.classDivisionId.message}</span>}
                            </div>
                            <div className="pl-2">
                                <CommonInput
                                    id='fee'
                                    {...register('fee')}
                                    title='賃料'
                                    value={formData?.fee}
                                    type='number'
                                    onChange={handleInputChange}
                                    className={`w-full ${errors.fee ? 'error-background' : ''}`}
                                />
                                {errors.fee && <span className="error-message">{errors.fee.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="box-container-form text-gray-700">
                        <span className="box-title text-xl font-bold mb-4">所在地</span>

                        <div className="flex flex-wrap w-full">
                            <div className="w-full md:w-3/4 pr-4">
                                <PostalAddress
                                    isLoaded={isLoaded}
                                    isMatchedTown={isMatchedTown}
                                    onChange={handleInputChange}
                                    formData={formData}
                                    register={register}
                                    errors={errors}
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

                    <div className="flex flex-wrap w-full">
                        <div className="w-full md:w-2/3 px-1">
                            <div className="box-container-form pt-0">
                                <span className="box-title text-xl">事業者番号</span>
                                <div className="radio-button-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                    <div>
                                        <CommonInput
                                            id='officeNoGH'
                                            {...register('officeNoGH')}
                                            title='GH'
                                            value={formData?.officeNoGH}
                                            onChange={handleInputChange}
                                            className={`w-full ${errors.officeNoGH ? 'error-background' : ''}`}
                                        />
                                        {errors.officeNoGH && <span className="error-message">{errors.officeNoGH.message}</span>}
                                    </div>
                                    <div>
                                        <CommonInput
                                            id='officeNoSS'
                                            {...register('officeNoSS')}
                                            title='SS'
                                            value={formData?.officeNoSS}
                                            onChange={handleInputChange}
                                            className={`w-full ${errors.officeNoSS ? 'error-background' : ''}`}
                                        />
                                        {errors.officeNoSS && <span className="error-message">{errors.officeNoSS.message}</span>}
                                    </div>
                                    <div>
                                        <CommonInput
                                            id='officeNoA'
                                            {...register('officeNoA')}
                                            title='A型'
                                            value={formData?.officeNoA}
                                            onChange={handleInputChange}
                                            className={`w-full ${errors.officeNoA ? 'error-background' : ''}`}
                                        />
                                        {errors.officeNoA && <span className="error-message">{errors.officeNoA.message}</span>}
                                    </div>
                                    <div>
                                        <CommonInput
                                            id='officeNoB'
                                            {...register('officeNoB')}
                                            title='B型'
                                            value={formData?.officeNoB}
                                            onChange={handleInputChange}
                                            className={`w-full ${errors.officeNoB ? 'error-background' : ''}`}
                                        />
                                        {errors.officeNoB && <span className="error-message">{errors.officeNoB.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-1">
                            <textarea
                                id="memo"
                                {...register('memo')}
                                value={formData?.memo}
                                className={`office-text-aria outline-none ${errors.memo ? 'error-background' : ''}`}
                                aria-required="true"
                                placeholder="メモ"
                                onChange={handleInputChange}
                                style={{ marginTop: '1em' }} />
                            {errors.memo && <span className="error-message">{errors.memo.message}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export { CreateOrEditPopup };
