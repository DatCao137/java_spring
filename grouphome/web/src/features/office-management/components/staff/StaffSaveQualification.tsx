import { Dispatch, forwardRef, SetStateAction, useImperativeHandle, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StaffSaveQualification } from '../../validations/staff';
import { StaffDetailFormData } from '../../types/Staff';
import { SelectQualifcation } from '@/features/blc-common/assets/ApiPath';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { CommonCheckBoxRadio } from '@/components/elements/common/CommonCheckBoxRadio';
import { CommonInput } from '@/components/elements/common/CommonInput';
import { Button } from '@/components/ui/button';

interface SaveQualificationPopupProps {
    formData: StaffDetailFormData | null;
    setFormData: Dispatch<SetStateAction<StaffDetailFormData>>;
}

interface Option {
    name: string;
    value: string | null;
}

const SaveQualificationPopup = forwardRef(({ formData, setFormData }: SaveQualificationPopupProps, ref) => {

    const [selQualifcation, setSelQualifcation] = useState<Qualification[]>([]);
    const [selQualifcationGroup, setSelQualifcationGroup] = useState<Option[]>([]);

    const { register, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(StaffSaveQualification),
        defaultValues: formData || {},
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prev: any) => {
            if (name.startsWith('qualification.')) {
                const [, id, field] = name.split('.'); // Extract 'id' and 'field'
                const qualificationId = Number(id); // Convert id to number

                // Ensure `qualification` remains an array
                const updatedQualifications = Array.isArray(prev.qualification)
                    ? [...prev.qualification]
                    : [];

                // Find the qualification by id
                const index = updatedQualifications.findIndex(
                    (q: any) => q.qualificationId === qualificationId
                );

                if (index !== -1) {
                    // Update existing qualification
                    updatedQualifications[index] = {
                        ...updatedQualifications[index],
                        [field]: value,
                    };
                } else {
                    // Add new qualification
                    updatedQualifications.push({
                        qualificationId,
                        [field]: value,
                    });
                }

                return {
                    ...prev,
                    qualification: updatedQualifications,
                };
            }

            // Default case
            return { ...prev, [name]: value };
        });
    };
    
    const groups = [
        { name: '共通', value: "common" },
        { name: '福祉介護医療', value: "care" },
        { name: '関連資格', value: "related" },
        { name: '建設関連', value: "construction" },
        { name: 'その他', value: "etc" },
    ]

    const initialSelectList = async () => {
        Post({
            apiPath: SelectQualifcation,
            params: {},
            onSuccess: (res) => {
                const qualifications = res.data.data;
                const group = Array.from(new Set(qualifications.map((item: Qualification) => item.type)) as Set<string>)
                    .map((type: string) => {
                        const matchedGroup = groups.find((group) => group.value === type);
                        return { name: matchedGroup?.name || 'Unknown', value: type };
                    });
                setSelQualifcation(qualifications);
                setSelQualifcationGroup(group);
            }
        })
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
                    <div className="staff-detail-section">
                        {selQualifcationGroup?.length > 0 ? (
                            selQualifcationGroup.map((groupItem: Option) => (
                                <div key={groupItem.value} className="staff-detail-section grid grid-cols-6 gap-y-2 pb-2">
                                    <div className="font-bold">{groupItem.name || '資格名なし'}</div>
                                    <div className='col-span-5'>
                                        {selQualifcation?.length > 0 ? (
                                            selQualifcation.filter((item) => item.type === groupItem.value).map((item: Qualification) => (
                                                <div key={item.id} className="staff-detail-section grid grid-cols-4 gap-y-2 pb-2">
                                                    <div className={groupItem.value === 'etc' ? "col-span-5" : "col-span-2"}>
                                                        {groupItem.value === 'etc' ? (
                                                            <CommonInput
                                                                type='textarea'
                                                                name={`qualification.${item.id}.etcName`}
                                                                value={
                                                                    formData?.qualification?.find(
                                                                        (q) => q.qualificationId === item.id
                                                                    )?.etcName ?? null
                                                                }
                                                                onChange={handleInputChange}
                                                                className={`form-control ${errors.qualification?.[item.id]?.etcName
                                                                    ? 'error-background'
                                                                    : ''
                                                                    }`}
                                                            />
                                                        ) : (
                                                            <span>{item.name}</span>
                                                        )
                                                        }
                                                    </div>
                                                    {groupItem.value === 'etc' ? (
                                                        <></>
                                                    ) : (
                                                        <div className="col-span-2 ml-10">
                                                            <CommonCheckBoxRadio
                                                                name={`qualification.${item.id}.hold`}
                                                                value={
                                                                    formData?.qualification?.find(
                                                                        (q) =>
                                                                            q.qualificationId ===
                                                                            item.id
                                                                    )?.hold ?? null
                                                                }
                                                                onChange={handleInputChange}
                                                                options={[
                                                                    { label: '有り', value: true },
                                                                    { label: '無し', value: false },
                                                                ]}
                                                                className={`form-check-input col-span-1 ${errors.qualification?.[item.id]?.hold ? 'error-background' : ''}`}
                                                            />
                                                        </div>
                                                    )}
                                                    {errors.qualification?.[item.id]?.hold && (
                                                        <span className="error-message">
                                                            {
                                                                errors.qualification?.[item.id]
                                                                    ?.hold?.message
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div>資格情報がありません</div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>資格情報がありません</div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
});

export { SaveQualificationPopup };