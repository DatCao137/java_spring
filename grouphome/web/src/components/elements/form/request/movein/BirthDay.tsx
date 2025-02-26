import React from 'react'
import { FormField } from '@/components/ui/Form';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { Input as InputUI } from '@/components/ui/Input';
import { Item } from '../../Item';
import { RadioBySelect } from '../../RadioChoices';
import { Text } from '../../Controls';


interface BirthDayProps {
    form: any;
    path?: string;
    list: SelectListResponseDto[];
    val: number | null;
}

export const BirthDay = React.forwardRef<HTMLElement, BirthDayProps>(({
    form, path = "contents.birth", list, val = null
}, ref
) => {
    return (<>
        <div className="col-span-9 col-start-2 grid grid-cols-1">
            <FormField
                control={form.control}
                name={`${path}.era`}
                render={({ field }) => (
                    <Item className="flex flex-row items-center space-y-3"
                        contents={(
                            <RadioBySelect field={field}
                                groupClass='flex flex-row items-center space-x-1'
                                list={list} />
                        )} />
                )}
            />
        </div>
        <div className="col-span-3 col-start-2">
            <FormField
                control={form.control}
                name={`${path}.date`}
                render={({ field }) => (
                    <Item contents={(<Text field={field} type="date" />)} />
                )}
            />
        </div>
        <div className="col-span-2">
            <FormField
                control={form.control}
                name={`${path}.age`}
                render={({ field }) => (
                    <Item className="w-full"
                        contents={(
                            <div className="flex flex-row items-center space-y-0">
                                <InputUI
                                    type="text"
                                    readOnly
                                    value={val || null}
                                    className="rounded-none border-0 border-b text-end focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                <strong className="-ml-3">歳</strong>
                            </div>
                        )} />
                )}
            />
        </div>
    </>)
})

