import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, forwardRef, KeyboardEvent, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { List } from '@/components/elements/calc/List';
import { TypeCalcMaster } from '../../types/CalcInfo';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { CalcItems as ApiPathCalcItem, CalcSave as ApiPathCalcSave } from '@/features/blc-common/assets/ApiPath';
import { Form } from '@/components/ui/Form';
import { CalcItemSchema, defaultValues, SaveCalcRequestDto } from '../../validator/CalcFormSchema';
import { PopupButtons } from '@/components/elements/PopupButtons';

interface CreateOrEditPopupProps {
    branchId: number;
    masterData: TypeCalcMaster[];
    isUpdated: Dispatch<SetStateAction<boolean>>;
    onClose: (isNonCheck?:boolean) => void;
}
export interface CalcItemDto {
    id: number|null;
    branchId: number;
    startDate: string|null;
    notificationDate: string|null;
    validStartDate: string|null;
    validEndDate: string|null;
    calcItemsId: number;
    value: string|string[];
    remark: string;
    updatedAt: string|null;
}
export const CreateOrEditPopup = forwardRef(({
    branchId, masterData, isUpdated, onClose
}: CreateOrEditPopupProps, ref) => {
    const [ data, setData ] = useState<CalcItemDto[]>();

    const form = useForm<SaveCalcRequestDto>({
        mode: 'onChange',
        resolver: zodResolver(CalcItemSchema),
        defaultValues
    });

    const chkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if(e.key == 'Enter') {
            if(!(e.target instanceof HTMLTextAreaElement)
            && !(e.target instanceof HTMLButtonElement)
            && !(e.target instanceof HTMLAnchorElement)) {
                e.preventDefault();
            }
        }
    }
    const getCalcData = async () => {
        Post({
            apiPath: ApiPathCalcItem,
            params: { branchId: branchId },
            onSuccess: (res) => {
                setData(res.data.data);
            }
        });
    };

    useEffect(() => {
        getCalcData();
    }, []);

    useEffect(() => {
        if(Object.keys(form.formState.errors).length != 0)
        console.log("バリデーションエラー : ", form.formState.errors);
      }, [ form.formState.errors ]);
  
    const onSubmit = async (values: SaveCalcRequestDto) => {
        const dtos: CalcItemDto[] = [];
        values.item.forEach((item) => {
            dtos.push({
                id: item?.id || null,
                branchId: item.branchId,
                startDate: item?.startDate || null,
                notificationDate: item?.notificationDate || null,
                validStartDate: item?.validStartDate || null,
                validEndDate: item?.validEndDate || null,
                calcItemsId: item.calcItemsId,
                value: Array.isArray(item.value) ? item.value : [ item?.value || '' ],
                remark: item?.remark || '',
                updatedAt: item?.updatedAt || null,
            })
        })
        doSave(dtos);
    }
    const doSave = (data: any) => {
        Post({
            apiPath: ApiPathCalcSave,
            params: data,
            message: "算定情報を保存しました。",
            onSuccess: ((res) => {
                onClose(true);
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={chkKeyDown}>
                <div className="w-full pb-2 calc-container">
                    <List branchId={branchId} defines={masterData} data={data} isUpdated={isUpdated} />
                </div>
                <PopupButtons title='保存' onClose={() => onClose(false)} />
            </form>
        </Form>
    );
});
CreateOrEditPopup.displayName = "CalcCreateOrEditPopup";
