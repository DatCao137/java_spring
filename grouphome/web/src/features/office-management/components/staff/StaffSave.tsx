import { Dispatch, forwardRef, SetStateAction, useImperativeHandle, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StaffSave } from '../../validations/staff';
import { StaffDetailFormData } from '../../types/Staff';
import { Select } from '@/features/blc-common/assets/ApiPath';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { CommonSelect } from '@/components/elements/common/CommonSelect';

interface SavePopupProps {
    formData: StaffDetailFormData | null;
    setFormData: Dispatch<SetStateAction<StaffDetailFormData>>;
}

interface Option {
    name: string;
    value: string | null;
}

const SavePopup = forwardRef(({ formData, setFormData }: SavePopupProps, ref) => {

    const [selBranch, setSelBranch] = useState<Option[]>([]);
    const [selHome, setSelHome] = useState<Option[]>([]);

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(StaffSave),
        defaultValues: formData || {},
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));

        switch (name) {
            case 'branchId':
                setFormData((prev: any) => ({ ...prev, branch: selBranch.find(item => item.value == value)?.name }));
                break;
            case 'mainHomeId':
                setFormData((prev: any) => ({ ...prev, mainHome: selHome.find(item => item.value == value)?.name }));
                break;
            case 'subHomeId':
                setFormData((prev: any) => ({ ...prev, subHome: selHome.find(item => item.value == value)?.name }));
                break;
            default:
                break;
        }
    };

    const initialSelectList = async () => {
        Post({
            apiPath: Select,
            params: { type: ['cust__branch', 'cust__home'] },
            onSuccess: (res) => {
                setSelBranch(res.data.cust__branch);
                setSelHome(res.data.cust__home);
            }
        });
    };

    const initialFormState = () => {
        try {
            initialSelectList();
        } catch (error) {
            console.error('Error fetching data: ', error);
            alert('Error fetching data');
        }
    }

    useImperativeHandle(ref, () => ({
        validateForm: async () => {
            const isValid = await trigger();
            return isValid;
        }
    }));

    useEffect(() => {
        initialFormState();
    }, []);

    return (
        <form>
            <div className="box p-6 bg-white border rounded-lg shadow">
                <span className="box-title text-xl font-bold block"></span>
                <div className="staff-detail-container space-y-6">
                    <div className="staff-detail-section grid grid-cols-3 gap-y-2 gap-x-4">
                        <div className="font-bold">事業所</div>
                        <div className="col-span-2">
{/*                            <CommonSelect
                                id='branchId'
                                {...register('branchId')}
                                options={selBranch}
                                value={formData?.branchId}
                                onChange={handleInputChange}
                                className={`office-code-box w-full ${errors.branchId ? 'error-background' : ''}`}
                            />
                            {errors.branchId && <span className="error-message">{errors.branchId.message}</span>}
*/}                        </div>
                        <div className="font-bold">ホーム名</div>
                        <div className="col-span-2">
{/*                            <CommonSelect
                                id='mainHomeId'
                                {...register('mainHomeId')}
                                options={selHome}
                                value={formData?.mainHomeId}
                                onChange={handleInputChange}
                                className={`office-code-box w-full ${errors.mainHomeId ? 'error-background' : ''}`}
                            />
                            {errors.mainHomeId && <span className="error-message">{errors.mainHomeId.message}</span>}
*/}                        </div>
                        <div className="font-bold">共同生活住居地</div>
                        <div className="col-span-2">
{/*                            <CommonSelect
                                id='subHomeId'
                                {...register('subHomeId')}
                                options={selHome}
                                value={formData?.subHomeId}
                                onChange={handleInputChange}
                                className={`office-code-box w-full ${errors.subHomeId ? 'error-background' : ''}`}
                            />
                            {errors.subHomeId && <span className="error-message">{errors.subHomeId.message}</span>}
*/}                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

export { SavePopup };