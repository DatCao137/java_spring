import React from 'react'
import { FormField } from '@/components/ui/Form';
import { Item } from '../../Item';
import { Calendar, DatePickerUI, Number, Text, TextArea, WithInput } from '../../Controls';
import { RadioChoices } from '../../RadioChoices';
import { jpFormatTemplate02, reiwaFormatDate } from '@/utils/DateUtils';
import DatePicker from '@/components/elements/CalendarPicker';

interface Props {
    form: any;
    path?: string;
}

interface DesiredDateProps {
    form: any;
    path?: string;
    val: string;
    setVal: (data: string) => void;

}
interface HasProps {
    form: any;
    list: { name: string, value: boolean }[];
    has: boolean | null | undefined;
    path?: string;
    preString?: string;
    mesKey?: string;
    isSmall?: boolean;
}
interface ChoiceProps {
    form: any;
    list: { name: string, value: boolean }[];
    path?: string;
}
interface TimeProps {
    form: any;
    path: string;
    type: string;
}
interface TimeRangeProps {
    form: any;
    path: string;
    label: string;
}

export const DesiredDate = React.forwardRef<HTMLElement, DesiredDateProps>(({
    form, path = 'desiredDate', val, setVal
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item className="space-x-2 desiredDate-container " contents={(<>
                    <span className="text-nowrap">{val}</span>
                    <DatePicker
                        value={field.value  || null}
                        onChange={(e) => {
                            setVal(
                                reiwaFormatDate(typeof e.target.value === 'string' ? e.target.value : null, '年MM月頃'),
                            );
                            field.onChange(e);
                        }}
                        mode="single"
                        placeholder="YYYY年MM月"
                        className="custom-datepicker desiredDate-datepicker content-center"
                        inputClassName="custom-input border !border-0"
                        format="YYYY年MM月"
                        name=""
                        viewMode="month"
                    />
                </>
                )} />
            )}
        />
    )
})

export const Gana = React.forwardRef<HTMLElement, Props>(({
    form, path = "contents.gana"
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item contents={(<Text field={field} />)} />
            )}
        />
    )
})

export const Has = React.forwardRef<HTMLElement, HasProps>(({
    form, path = "", list, has, preString, mesKey = "name"
}, ref
) => {
    const pre = preString ?? '(';
    const post = preString ? '' : ')';
    const isSmall = preString ? true : false;
    return (<>
        <FormField
            control={form.control}
            name={`${path}.has`}
            render={({ field }) => (
                <Item className="col-span-10 space-y-3"
                    contents={(<RadioChoices field={field}
                        list={list}
                        groupClass='flex flex-row text-nowrap items-center space-x-1' />)} />)} />
        {has && (<WithInput control={form.control} path={`${path}.${mesKey}`} preString={pre} postString={post} isSmall={isSmall} />)}
    </>)
})
export const Motive = React.forwardRef<HTMLElement, Props>(({
    form, path = "contents.motive"
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item className='w-full' contents={(<TextArea field={field} rows={2} />)} />
            )}
        />
    )
})
export const TextLine = React.forwardRef<HTMLElement, Props>(({
    form, path = ""
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item className="w-full" contents={(<Text field={field} />)} />
            )}
        />
    )
})

export const FailureSituation = React.forwardRef<HTMLElement, Props>(({
    form, path = "contents.failureSituation"
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item className="w-full" contents={(<Text field={field} />)} />
            )}
        />
    )
})

export const Numbers = React.forwardRef<HTMLElement, Props>(({
    form, path = ""
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item className="w-full" contents={(<Number field={field} min={0} />)} />
            )}
        />
    )
})
export const Times = React.forwardRef<HTMLElement, TimeProps>(({
    form, path, type
}, ref
) => {
    return (
        <div className="col-span-3 flex flex-row items-center px-2">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="col-span-2" contents={(<Text field={field} type='time' pre={type} post='時頃' />)} />
                )}
            />
        </div>
    )
})
export const LifeStyle = React.forwardRef<HTMLElement, HasProps>(({
    form, path = "contents.physicalInfo.lifestyle", list, has
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={`${path}.has`}
            render={({ field }) => (
                <Item className="col-span-5 space-y-3" contents={(<>
                    <RadioChoices field={field} list={list} groupClass='flex text-nowrap flex-row items-center space-x-1' />
                    {has && (<WithInput control={form.control} path={`${path}.contents`} preString='(' postString=')' />)}
                </>)} />
            )}
        />
    )
})
export const Choices = React.forwardRef<HTMLElement, ChoiceProps>(({
    form, path = "", list
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item className="space-y-3" contents={(
                    <RadioChoices field={field} list={list} groupClass='flex flex-row items-center space-x-1' />
                )} />
            )} />
    )
})
export const InsuranceCare = React.forwardRef<HTMLElement, ChoiceProps>(({
    form, path = "contents.insurance.care.has", list
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item className='space-y-3' contents={(
                    <RadioChoices field={field} groupClass='flex flex-row items-center space-x-1' list={list} preString='利用' />
                )} />
            )}
        />
    )
})
export const InsuranceLimit = React.forwardRef<HTMLElement, Props>(({
    form, path = "contents.insurance.limit"
}, ref
) => {
    return (<>
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                // <Item className="" contents={<Calendar field={field} label="有効期限" template={jpFormatTemplate02} />} />
                <Item className="" contents={<DatePickerUI field={field} className="custom-datepicker content-center" inputClassName="custom-input  border border-0" name="" viewMode = "date" />} />

            )}
        />
        <span>まで</span>
    </>
    )
})

export const TimeRange = React.forwardRef<HTMLElement, TimeRangeProps>(({
    form, path, label
}, ref
) => {
    return (<>
        <span className="text-nowrap">{label}:</span>
        <FormField
            control={form.control}
            name={`${path}.startHour`}
            render={({ field }) => (<>
                <Item className="" contents={<Number field={field} min={0} max={23} />} />
                <small className="-ml-3">時</small>
            </>)}
        />
        <small> ~</small>
        <FormField
            control={form.control}
            name={`${path}.endHour`}
            render={({ field }) => (<>
                <Item className="" contents={<Number field={field} min={0} max={23} />} />
                <small className="-ml-3">時</small>
            </>)}
        />
    </>)
});

export const FreeText = React.forwardRef<HTMLElement, Props>(({
    form, path = ""
}, ref
) => {
    return (
        <div className="col-span-1 rounded border border-black px-2">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full" contents={(<TextArea field={field} rows={4} />)} />
                )}
            />
        </div>
    )
})
