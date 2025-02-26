import { Dispatch, forwardRef, KeyboardEvent, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import {
    Select as ApiPathSelect,
    StructureInfo as ApiPathInfo,
    StructureSave as ApiPathSave
} from '@/features/blc-common/assets/ApiPath';
import { Form } from '@/components/ui/Form';
import { defaultValues, SaveStructureRequestDto, StructureFormSchema } from '../../validator/StructureFormSchema';
import { CommonSelect } from '@/components/elements/form/common/CommonSelect';
import { CommonInput } from '@/components/elements/form/common/CommonInput';
import { CommonNumber } from '@/components/elements/form/common/CommonNumber';
import { CommonMultiSelect } from '@/components/elements/form/common/CommonMultiSelect';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { PopupButtons } from '@/components/elements/PopupButtons';
import { CommonDatePicker } from '@/components/elements/form/common/CommonDatePicker';
import { checkDataDifferent } from '@/components/elements/common/CommonUtils';

interface CreateOrEditPopupProps {
    id?: number;
    branchId: number;
    isUpdated: Dispatch<SetStateAction<boolean>>;
    onClose: (isNonCheck?: boolean) => void;
}

const CreateOrEditPopup = forwardRef(({
    id, branchId, onClose, isUpdated
}: CreateOrEditPopupProps, ref) => {
    const [typeTraining, setTypeTraining] = useState<SelectListResponseDto[]>
        ([{ value: "basic", name: '基礎研修' },
        { value: "update", name: '更新研修' }]);
    const [staffList, setStaffList] = useState<SelectListResponseDto[]>([]);
    const [data, setData] = useState<SaveStructureRequestDto>();
    const [oldData, setOldData] = useState<SaveStructureRequestDto>(defaultValues);

    const form = useForm<SaveStructureRequestDto>({
        mode: 'onChange',
        resolver: zodResolver(StructureFormSchema),
        defaultValues: defaultValues,
    });

    const chkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key == 'Enter') {
            if (!(e.target instanceof HTMLTextAreaElement)
                && !(e.target instanceof HTMLButtonElement)
                && !(e.target instanceof HTMLAnchorElement)) {
                e.preventDefault();
            }
        }
    }

    const setRecvData = () => {
        if (!data) return;
        form.setValue('id', data.id);
        form.setValue('branchId', data.branchId);
        form.setValue('managerName', data.managerName);
        form.setValue('service1.name', data.service1?.name);
        form.setValue('service1.training.type', data.service1?.training.type);
        form.setValue('service1.training.implementation', data.service1?.training.implementation)
        form.setValue('service1.training.limit', data.service1?.training.limit);
        form.setValue('service2.name', data.service2?.name);
        form.setValue('service2.training.type', data.service2?.training.type);
        form.setValue('service2.training.implementation', data.service2?.training.implementation)
        form.setValue('service2.training.limit', data.service2?.training.limit);
        form.setValue('lifeSupporter.name', data.lifeSupporter?.name);
        form.setValue('welfareWorker.name', data.welfareWorker?.name);
        form.setValue('nurse.name', data.nurse?.name);
        form.setValue('visitingContract.capacity', data.visitingContract?.capacity);
        form.setValue('updatedAt', data.updatedAt);
        setOldData(structuredClone(form.getValues()));
    }

    const getStructureData = () => {
        Post({
            apiPath: ApiPathInfo,
            params: { id: id },
            onSuccess: (res => {
                setData(res.data.data);
            })
        })
    }
    const getSelectData = () => {
        Post({
            apiPath: ApiPathSelect,
            params: { type: ['cust__staff'], param: [{ key: 'cust__staff', params: [{ name: 'branch', value: branchId }] }] },
            onSuccess: (res => {
                setStaffList(res.data.cust__staff)
            })
        })
    }

    useEffect(() => {
        isUpdated(checkDataDifferent(oldData, form.getValues()));
    }, [form.watch()]);

    useEffect(() => {
        setRecvData();
    }, [data])

    useEffect(() => {
        if (branchId)
            getSelectData();
    }, [branchId]);

    useEffect(() => {
        if (id)
            getStructureData();
    }, [id]);

    useEffect(() => {
        if (Object.keys(form.formState.errors).length != 0)
            console.log("バリデーションエラー : ", form.formState.errors);
    }, [form.formState.errors]);

    const onSubmit = async (values: SaveStructureRequestDto) => {
        doSave(values);
    }

    const doSave = (data: any) => {
        Post({
            apiPath: ApiPathSave,
            params: data,
            message: "人員体制を保存しました。",
            onSuccess: ((res) => {
                onClose(true);
            })
        })
    }

    const serviceTag = (type: string) => {
        return (
            <div className="flex flex-wrap w-full">
                <div className="w-full md:w-1/4 px-1">
                    <CommonSelect title="名前" form={form} name={`${type}.name`} items={staffList} />
                </div>
                <div className="w-full md:w-1/4 px-1">
                    <CommonSelect title="研修種別" form={form} name={`${type}.training.type`} items={typeTraining} />
                </div>
                <div className="w-full md:w-1/4 px-1">
                    <CommonDatePicker title="受講日" form={form} name={`${type}.training.implementation`} />
                </div>
                <div className="w-full md:w-1/4 px-1">
                    <CommonDatePicker title="期限" form={form} name={`${type}.training.limit`} viewMode='month' placeholder='YYYY年MM月' format='YYYY年MM月' />
                </div>
            </div>
        )
    }
    return (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={chkKeyDown}>
                <div className="box-container-form box-container-parent">
                    <div className="">
                        <div className="w-full pb-2 ">
                            <div className="flex md:w-1/2 flex-wrap">
                                <div className="w-full md:w-3/4">
                                    <CommonInput title="管理者" form={form} name="managerName" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="box-container-form text-gray-700 mb-2">
                            <span className="box-title text-xl pt-0">サービス管理責任者①</span>
                            <div className="w-full">
                                {serviceTag("service1")}
                            </div>
                        </div>

                        <div className="box-container-form text-gray-700 mb-2">
                            <span className="box-title text-xl pt-0">サービス管理責任者②</span>
                            <div className="w-full">
                                {serviceTag("service2")}
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="flex flex-wrap w-full">
                                <div className="w-full md:w-1/2 px-1">
                                    <CommonMultiSelect title="常勤生活支援員" form={form} name="lifeSupporter.name" items={staffList} />
                                </div>
                                <div className="w-full md:w-1/2 px-1">
                                    <CommonMultiSelect title="常勤福祉士" form={form} name="welfareWorker.name" items={staffList} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full mb-4">
                            <div className="flex flex-wrap w-full">
                                <div className="w-full md:w-1/2 px-1">
                                    <CommonMultiSelect title="正看護師名" form={form} name="nurse.name" items={staffList} />
                                </div>
                                <div className="w-full md:w-1/2 px-1 pt-3">
                                    <label className='itemTitleLabel'>正看護師数</label>
                                    <label>{form.watch("nurse.name")?.length ?? 0} 人</label>
                                </div>
                            </div>
                        </div>

                        <div className="box-container-form text-gray-700 mb-2">
                            <span className="box-title text-xl pt-0">訪看契約</span>
                            <div className="w-full">
                                <div className="flex flex-wrap w-full">
                                    <div className="md:w-1/4">
                                        <label>{form.watch("visitingContract.capacity") ?? 0 == 0 ? "契約あり" : "契約なし"}</label>
                                    </div>
                                    <div className="md:w-1/4">
                                        <CommonNumber title="契約人数" form={form} name="visitingContract.capacity" enableZero={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PopupButtons title='保存' onClose={() => onClose(false)} />
            </form>
        </Form>
    </>
    );

});

export { CreateOrEditPopup };
