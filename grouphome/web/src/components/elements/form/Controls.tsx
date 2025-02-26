
import React from 'react';
import ReactSelect, { MultiValue } from 'react-select';
import { FormControl, FormField, FormLabel } from "@/components/ui/Form";
import { Button as ButtonUI } from '@/components/ui/button';
import { Calendar as CalendarUI } from '@/components/ui/Calendar';
import { Checkbox as CheckboxUI } from '@/components/ui/Checkbox';
import { Input as InputUI } from '@/components/ui/Input';
import { RadioGroupItem as RadioGroupItemUI } from '@/components/ui/RadioGroup';
import { Textarea as TextareaUI } from '@/components/ui/Textarea';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/Popover';
import {
    Select as SelectUI,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { formatJPDate } from '@/utils/DateUtils';

import { Item } from './Item';

import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import DatePicker from '../CalendarPicker';

interface TextProps {
    field: any;
    className?: string;
    type?: string;
    pre?: string;
    post?: string;
    disabled?: boolean;
}

const Text = React.forwardRef<HTMLElement, TextProps>(({
    field, pre, post, className = "", type = "text", disabled = false
}, ref
) => {
    return (
        <FormControl>
            <span className="flex flex-row items-center">
                {pre && (<span className="text-nowrap">{pre}</span>)}
                <InputUI
                    type={type}
                    {...field}
                    className={`${className} rounded-none border-0 border-b focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                    disabled={disabled}
                />
                {post && (<span className={`text-nowrap ${disabled ? 'text-gray-400' : ''}`} >{post}</span>)}
            </span>
        </FormControl>
    )
}
)

interface TextAreaProps {
    field: any;
    rows: number;
    disabled?: boolean;
}

const TextArea = React.forwardRef<HTMLElement, TextAreaProps>(({
    field, rows, disabled = false
}, ref
) => {
    return (
        <FormControl>
            <TextareaUI
                rows={rows}
                {...field}
                className="rounded-none border-0 border-b focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={disabled}
            />
        </FormControl>
    )
}
)

interface NumberProps {
    field: any;
    max?: number;
    min?: number;
    className?: string;
    preString?: string;
    postString?: string;
    strong?: boolean;
    enableZero?: boolean;
}

const Number = React.forwardRef<HTMLElement, NumberProps>(({
    field, max, min, className = "", preString, postString, strong = false, enableZero=false
}, ref
) => {
    return (
        <FormControl>
            <div className="flex flex-row items-center space-y-0">
                {preString && (<small className="text-nowrap">{preString}</small>)}
                <InputUI
                    {...field}
                    type="number"
                    onChange={(e) =>
                        field.onChange(+e.target.value || (enableZero ? 0 : null))
                    }
                    min={min}
                    max={max}
                    className={`rounded-none border-0 ${className} focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                {postString && strong && (<strong className="-ml-3">{postString}</strong>)}
                {postString && !strong && (<small className="text-nowrap">{postString}</small>)}
            </div>
        </FormControl>
    )
}
)

interface WithInputProps {
    control: any;
    path: string;
    preString?: string;
    postString?: string;
    itemClass?: string;
    classAdd?: string;
    isSmall?: boolean;
    disabled?: boolean
}

const WithInput = React.forwardRef<HTMLElement, WithInputProps>(({
    control, path, preString, postString, itemClass = 'w-full', classAdd = '', isSmall = false, disabled = false
}, ref
) => {
    return (
        <FormField
            control={control}
            name={path}
            render={({ field }) => (
                <Item className={itemClass} contents={
                    <span className='flex flex-row items-center'>
                        {preString && (isSmall ? <small className='text-nowrap'>{preString}</small> : <span>{preString}</span>)}
                        <InputUI
                            {...field}
                            disabled={disabled}
                            className={`${classAdd} h-8 rounded-none border-0 border-b bg-[#e0e0e0e0] focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                        />
                        {postString && (isSmall ? <small className='text-nowrap'>{postString}</small> : <span>{postString}</span>)}
                    </span>
                }
                />
            )}
        />
    )
}
)

interface SelectProps {
    field: any;
    selectList: SelectListResponseDto[];
    classNameTrigger: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
    field, selectList, classNameTrigger, ...props
}, ref
) => {
    return (
        <SelectUI
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
        >
            <FormControl>
                <SelectTrigger className={`${classNameTrigger} outline-none focus:ring-0 focus:ring-offset-0`}>
                    <SelectValue />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {selectList.map((item, index) => (
                    <SelectItem key={index} value={item.value} onSelect={field.onChange}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectUI>
    )
}
)

interface CommonMultipleSelectProps {
    field: any;
    selectList: SelectListResponseDto[];
    className?: string;
    onChange: (e: string[]) => void;
}

const SelectMulti = React.forwardRef<HTMLSelectElement, CommonMultipleSelectProps>(({
    field, selectList, className, onChange
}, ref
) => {
    const values:string[] = field.value ?? [];
    const handleChange = (selected: MultiValue<{ value: any; label: string }> | null) => {
        const selectedValues = (selected || []).map(option => option.value);
        onChange(selectedValues);
    };
    
    return (<>
        <ReactSelect
            options={selectList.filter(opt => opt.name != "").map(option => ({ value: option.value, label: option.name }))}
            value={values.map(val => ({ value: val, label: selectList.find(option => option.value == val)?.name || '' }))}
            onChange={handleChange}
            isMulti
            className="custom-select-react"
        />
    </>)
}
)

interface RadioButtonProps {
    field: any;
    item: { name: string, value: string | boolean };
    defValue?: string | null
    preString?: string;
    postString?: string;
    doCancel?: boolean;
    disabled?: boolean;
}

const RadioButton = React.forwardRef<HTMLElement, RadioButtonProps>(({
    field, item, defValue = '', preString = '', postString = '', doCancel = true, disabled = false
}, ref
) => {
    return (
        <>
            <FormControl>
                <RadioGroupItemUI
                    disabled={disabled}
                    value={typeof item.value == "boolean" ? (item.value ? '1' : '0') : item.value}
                    onClick={(e) => {
                        if (doCancel && e.currentTarget.ariaChecked)
                            field.onChange(defValue);
                    }}
                />
            </FormControl>
            <FormLabel>
                <small className="text-nowrap">{preString}{item.name}{postString}</small>
            </FormLabel>
        </>
    )
}
)

interface CheckBoxProps {
    field: any;
    item: SelectListResponseDto;
    checked: boolean;
    disabled?: boolean;
}

const CheckBox = React.forwardRef<HTMLElement, CheckBoxProps>(({
    field, item, checked, disabled = false
}, ref
) => {
    return (
        <>
            <FormControl>
                <CheckboxUI
                    disabled={disabled}
                    checked={checked}
                    onCheckedChange={(checked) => {
                        const v = checked
                            ? (field.value ? [...field.value, item.value] : [item.value])
                            : field.value?.filter(
                                (value: string) => (value !== item.value && value !== ""),
                            );
                        return field.onChange(v);
                    }}
                />
            </FormControl>
            <small className="text-nowrap">
                {item.name}
            </small>
        </>
    )
}
)

interface CalendarProps {
    label: string;
    field: any;
    template: string;
    disabled?: boolean;
    isShowIcon?: boolean;
}

const Calendar = React.forwardRef<HTMLElement, CalendarProps>(({
    label, field, template, disabled = false, isShowIcon = true
}, ref
) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <ButtonUI
                        variant={'outline'}
                        className={cn(
                            'w-[240px] h-fit pl-3 text-left font-normal calender-btn-custom',
                            !field.value && 'text-muted-foreground',
                        )}
                        disabled={disabled}
                    >
                        {field.value ? (
                            formatJPDate(
                                field.value?.toString(),
                                template,
                            )
                        ) : (
                            <span>{label}</span>
                        )}
                        {isShowIcon && (<CalendarIcon className="ml-auto size-4 opacity-50" />)}
                    </ButtonUI>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent
                className="p-0"
                align="end"
                style={{ zIndex: 1001 }}
            >
                <CalendarUI
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                    initialFocus
                    hideHead
                />
            </PopoverContent>
        </Popover>
    )
}
)

interface DatePickerProps {
    placeholder?: string;
    field: any;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
    format?: string;
    name: string;
    mode?: "single" | "range" | "multiple";
    viewMode?: "month" | "date";
}

const DatePickerUI = React.forwardRef<HTMLElement, DatePickerProps>(({
    placeholder = "YYYY年MM月DD日", field, className, inputClassName = "", format = "YYYY年MM月DD日", name, disabled = false, mode = "single", viewMode="date"
}, ref
) => {
    return (
        <FormControl>
            <span className="flex flex-row items-center">
                <DatePicker
                    value={field.value  || null}
                    onChange={field.onChange}
                    mode={mode}
                    placeholder={placeholder}
                    className={className}
                    inputClassName={inputClassName}
                    format={format}
                    name={name}
                    disabled={disabled}
                    viewMode={viewMode}
                />
            </span>
        </FormControl>
    )
}
)

export { Text, TextArea, WithInput, Number, Select, SelectMulti, Calendar, CheckBox, RadioButton, DatePickerUI }
