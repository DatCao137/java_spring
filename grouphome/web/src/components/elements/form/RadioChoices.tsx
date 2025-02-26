
import React from 'react';
import { FormControl, FormItem } from "@/components/ui/Form";
import { RadioGroup } from '@/components/ui/RadioGroup';
import { RadioButton } from './Controls';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';

export const optionYesNo = [
    { name: 'あり', value: true },
    { name: 'なし', value: false },
];
export const optionNoYes = [
    { name: 'なし', value: false },
    { name: 'あり', value: true },
];

export interface RadioChoicesProps {
    field: any;
    groupClass?: string;
    colSpan?: string;
    preString?: string;
    postString?: string;
    list?: { name: string, value: boolean }[];
    tgtId?: number;
    contents?: JSX.Element;
}

export interface RadioBySelectProps {
    field: any;
    list: SelectListResponseDto[];
    groupClass?: string;
    className?: string;
    doCancel?: boolean;
}

export const RadioChoices = React.forwardRef<HTMLElement, RadioChoicesProps>(({
    field, groupClass, colSpan, list = optionYesNo, preString = '', postString = '',
    tgtId, contents = (<></>)
}, ref
) => {
    return (
        <FormControl>
            <RadioGroup
                className={groupClass}
                onValueChange={(val: string) => {
                    field.onChange(val == '1' ? true : false)
                }
                }
                defaultValue={field.value == null ? '' : field.value ? '1' : '0'}
                value={field.value == null ? '' : field.value ? '1' : '0'}
            >
                {list.map((option, i) => (
                    <FormItem key={i} className={`${colSpan} text-nowrap flex items-center space-x-3 space-y-0`}>
                        <RadioButton field={field} item={option} defValue={null} preString={preString} postString={postString} />
                        {field.value && i == tgtId && contents}
                    </FormItem>
                ))}
            </RadioGroup>
        </FormControl>
    )
}
)

export const RadioBySelect = React.forwardRef<HTMLElement, RadioBySelectProps>(({
    field, groupClass = 'flex flex-row items-center space-x-1', className = 'flex items-center space-x-3 space-y-0', list, doCancel = true
}, ref
) => {
    return (
        <FormControl>
            <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                className={groupClass}
            >
                {list.map((item, i) => (
                    <FormItem
                        key={i}
                        className={className}
                        aria-disabled={true}
                    >
                        <RadioButton field={field} item={item} doCancel={doCancel} />
                    </FormItem>
                ))}
            </RadioGroup>
        </FormControl>
    )
}
)
