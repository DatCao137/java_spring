import React from 'react';
import { FormItem } from "@/components/ui/Form";
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { CheckBox, WithInput } from './Controls';


export interface ChecksProps {
    control: any;
    field: any;
    index: any;
    item: SelectListResponseDto;
    checked: boolean;
    disabled?: boolean;
    path?: string|null;
    gridWidth?: string;
}

export const Checks = React.forwardRef<HTMLElement, ChecksProps>(({
    control, field, index, item, checked, disabled = false, path = null, gridWidth = "col-span-2"
}, ref
) => {
    return (
        <FormItem
            key={index}
            className={`${gridWidth} flex flex-row items-center space-x-3 space-y-0`}
        >
            <CheckBox field={field} item={item} checked={checked} disabled={disabled} />
            { path != null && (<WithInput control={control} path={path} />)}
        </FormItem>
    )
}
)