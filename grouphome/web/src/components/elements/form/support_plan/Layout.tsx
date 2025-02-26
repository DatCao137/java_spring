import React from 'react'
import { FormField } from '@/components/ui/Form';

import { jpFormatTemplate02 } from '@/utils/DateUtils';
import { Item } from '../Item';
import { TextArea, Text, Calendar, DatePickerUI } from '../Controls';

interface Props {
    form: any;
    path?: string;
    disabled?: boolean;
}

interface CalendarProps {
    form: any;
    path?: string;
    disabled?: boolean;
    label?: string;
    isShowIcon?: boolean;
}

interface CalendarRangeProps {
    form: any;
    pathFrom?: string;
    pathTo?: string;
    disabled?: boolean;
}

export const YearInput = React.forwardRef<HTMLElement, Props>(({
    form, path = "", disabled = false
}, ref
) => {
    return (
        <div className="col-span-3 flex flex-row items-center container-common">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="col-span-2" contents={(<Text field={field} type='number' post='年度' disabled={disabled} />)} />
                )}
            />
        </div>
    )
})

export const CalendarInput = React.forwardRef<HTMLElement, CalendarProps>(({
    form, path = "", disabled = false, label="YYYY年MM月DD日", isShowIcon = true
}, ref
) => {
    return (
        <div className="col-span-1 flex flex-row items-center container-common h-full">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="" contents={<DatePickerUI field={field} className="custom-datepicker content-center" inputClassName="custom-input border border-0" name="" viewMode = "date" disabled={disabled} placeholder={label} />} />
                )}
            />
        </div>
    )
})

export const CalendarRangeInput = React.forwardRef<HTMLElement, CalendarRangeProps>(({
    form, pathFrom = "", pathTo = "", disabled = false
}, ref
) => {
    return (
        <div className="col-span-1 flex flex-row items-center container-common h-full">
            <FormField
                control={form.control}
                name={pathFrom}
                render={({ field }) => (
                    <Item className="" contents={<DatePickerUI field={field} className="custom-datepicker content-center" inputClassName="custom-input border border-0" name="" viewMode = "date" disabled={disabled} />} />
                )}
            />
            <div className="text-xl">~</div>
            <FormField
                control={form.control}
                name={pathTo}
                render={({ field }) => (
                    <Item className="" contents={<DatePickerUI field={field} className="custom-datepicker content-center" inputClassName="custom-input border border-0" name="" viewMode = "date" disabled={disabled} />} />
                )}
            />
        </div>
    )
})

export const TextInput = React.forwardRef<HTMLElement, Props>(({
    form, path = "", disabled = false
}, ref
) => {
    return (
        <div className="container-common">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full" contents={(<Text field={field} disabled={disabled} />)} />
                )}
            />
        </div>
    )
})

export const FreeText = React.forwardRef<HTMLElement, Props>(({
    form, path = "", disabled = false
}, ref
) => {
    return (
        <div className="container-common">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full" contents={(<TextArea field={field} rows={4} disabled={disabled} />)} />
                )}
            />
        </div>
    )
})




