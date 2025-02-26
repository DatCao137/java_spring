import React from 'react'
import { Plus } from 'lucide-react';
import { UseFieldArrayReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { HistoryItem } from '@/components/elements/form/request/movein/HistoryItem';
import { FamilyItem } from '@/components/elements/form/request/movein/FamilyItem';


interface Props {
    form: any;
    fields: UseFieldArrayReturn<any>;
    cbAddress?: (index: number, isMatched: boolean | undefined) => void;
}

export const History = React.forwardRef<HTMLElement, Props>(({
    form, fields
}, ref
) => {
    return (<>
        <div className="col-span-7 mb-2 mr-2 flex justify-end">
            <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={() => {
                    const histories = form.getValues('contents.history');
                    const lastHistory = histories[histories.length - 1];
                    if (
                        histories.length == 0 ||
                        (lastHistory &&
                            (lastHistory?.name || lastHistory?.medical))
                    ) {
                        fields.append({
                            name: '',
                            medical: '',
                        });
                    }
                }}
            >
                <Plus className="size-4" />
            </Button>
        </div>
        {fields.fields.map((field, index) => (
            <fieldset key={field.id} className="col-span-7">
                <HistoryItem
                    control={form.control}
                    update={fields.update}
                    remove={fields.remove}
                    index={index}
                    value={field}
                />
            </fieldset>
        ))}

    </>)
})

const ExchangeFamilyType = (data: any) => {
    return {
        name: data.name ?? '',
        gana: data.gana ?? '',
        relationship: data.relationship ?? '',
        together: {
            has: data.together?.has ?? true,
            address: {
                postNo1st: data.together?.address?.postNo1st ?? '',
                postNo2nd: data.together?.address?.postNo2nd ?? '',
                prefId: data.together?.address?.prefId ?? null,
                city: data.together?.address?.city ?? '',
                town: data.together?.address?.town ?? '',
            },
        },
    }
}
export const Family = React.forwardRef<HTMLElement, Props>(({
    form, fields, cbAddress
}, ref
) => {
    return (<>
        <div className="col-span-12 mb-2 flex justify-end">
            <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={() => {
                    const families = form.getValues('contents.family');
                    const lastFamily = families[families.length - 1];
                    if (
                        families.length == 0 ||
                        (lastFamily &&
                            (lastFamily?.gana ||
                                lastFamily?.name ||
                                lastFamily?.relationship))
                    ) {
                        fields.append(ExchangeFamilyType({}));
                    }
                }}
            >
                <Plus className="size-4" />
            </Button>
        </div>
        <div className="col-span-2 border-collapse border text-center">氏名</div>
        <div className="col-span-2 border-collapse border text-center">氏名(ふりがな)</div>
        <div className="col-span-2 border-collapse border text-center">続柄</div>
        <div className="col-span-5 border-collapse border text-center">住所</div>
        <div className="col-span-1 border-collapse border text-center"></div>
        {fields.fields.map((field, index) => (
            <fieldset key={field.id} className="col-span-12">
                <FamilyItem
                    remove={fields.remove}
                    index={index}
                    data={ExchangeFamilyType(field)}
                    cbMatchedTown={cbAddress}
                    errors={form.formState.errors}
                />
            </fieldset>
        ))}

    </>)
})