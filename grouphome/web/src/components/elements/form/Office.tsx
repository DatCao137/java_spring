import React from 'react';
import { FormField } from "@/components/ui/Form";
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { Item } from './Item';
import { Select } from './Controls';

export interface Props {
    form: any;
    list: SelectListResponseDto[]
    path?: string;
}

export const Office = React.forwardRef<HTMLElement, Props>(({
    form, list, path = "homeId"
}, ref
) => {
    return (
        <div className="col-span-7 border-collapse border border-b-0 p-2">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full xl:w-1/4" contents={<Select field={field} selectList={list} classNameTrigger='h-8' />} />
                )}
            />
        </div>
    )
}

)