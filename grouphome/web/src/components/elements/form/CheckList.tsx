import { FormField } from "@/components/ui/Form";
import { SelectListResponseDto } from "@/features/customer-management/contexts/SelectListContext";
import React from "react";
import { Checks } from "./Checks";

export interface CheckListProps {
    form: any;
    list: SelectListResponseDto[]
    path: string;
    otherPath?: string;
    gridWidth?: string;
    otherWidth?: string;
}

export const CheckList = React.forwardRef<HTMLElement, CheckListProps>(({
    form, list, path, otherPath, gridWidth = "col-span-2", otherWidth
}, ref
) => {
    return list.map((item, index) => (
        <FormField
            key={index}
            control={form.control}
            name={path}
            render={({ field }) => {
                field.value = form.getValues(path);
                const checked = field.value?.includes(item.value);
                const other = checked && item.name == 'その他' ? otherPath : null;
                const width = other != null ? otherWidth : gridWidth;
                return (
                    <Checks control={form.control} field={field} index={index} item={item} checked={checked} path={other} gridWidth={width} />
                );
            }}
        />
    ))
});
