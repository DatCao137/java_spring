import React from 'react';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { FormField } from '@/components/ui/Form';
import { Checkbox as CheckboxUI } from '@/components/ui/Checkbox';
import { Contacts } from './Contact';
import { Item } from '../../Item';
import { Number, Select, Text, WithInput } from '../../Controls';
import { RadioBySelect, RadioChoices } from '../../RadioChoices';
import { CheckList } from '../../CheckList';

interface Props {
    form: any;
    path?: string;
}
interface ListProps {
    form: any;
    list: SelectListResponseDto[];
    path?: string;
}
interface NameProps {
    form: any;
    path?: string;
    pathGana?: string;
}
interface HasProps {
    form: any;
    list: { name: string, value: boolean }[];
    has: boolean | null | undefined;
    path?: string;
}

export const Desired = React.forwardRef<HTMLElement, ListProps>(({
    form, list, path = "base.hopeItems"
}, ref
) => {
    return (<>
        <div className="col-span-7 border-collapse border p-2">
            <FormField
                control={form.control}
                name={path}
                render={() => (
                    <Item className="col-span-7 grid grid-cols-12"
                        contents={<CheckList form={form} path={path} list={list} otherPath='base.hopeOther' otherWidth='col-span-12'/>} />
                )}
            />
        </div>
    </>)
})

export const Name = React.forwardRef<HTMLElement, NameProps>(({
    form, path = "base.name", pathGana = "base.gana"
}, ref
) => {
    return (<>
        <div className="col-span-5 grid grid-cols-1 px-2">
            <div className="col-span-1">
                <FormField
                    control={form.control}
                    name={pathGana}
                    render={({ field }) => (
                        <Item contents={<Text field={field} pre={"(ふりがな)"} />} />
                    )}
                />
            </div>
            <div className="col-span-1">
                <FormField
                    control={form.control}
                    name={path}
                    render={({ field }) => (
                        <Item contents={<Text field={field} />} />
                    )}
                />
            </div>
        </div>
    </>)
})

export const Sex = React.forwardRef<HTMLElement, ListProps>(({
    form, list, path = "base.sex"
}, ref
) => {
    return (
        <div className="col-span-3 flex border-collapse items-center border p-2">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className='space-y-3' contents={(<RadioBySelect field={field} list={list} />)} />
                )}
            />
        </div>
    )
})

export const Age = React.forwardRef<HTMLElement, Props>(({
    form, path = "base.age"
}, ref
) => {
    return (
        <div className="col-span-3 flex border-collapse items-center border">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full" contents={<Number field={field} min={0} max={120} />} />
                )}
            />
        </div>
    )
})

export const Contact = React.forwardRef<HTMLElement, Props>(({
    form, path = "base.contact"
}, ref
) => {
    return (
        <div className="col-span-9 grid border-collapse grid-cols-2 border px-2">
            <Contacts control={form.control} path={path} />
        </div>
    )
})

export const Disability = React.forwardRef<HTMLElement, Props>(({
    form, path = "base.disability.name"
}, ref
) => {
    return (
        <div className="col-span-4 border-collapse border px-2">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item contents={<Text field={field} />} />
                )}
            />
        </div>
    )
})

export const DisabilityType = React.forwardRef<HTMLElement, ListProps>(({
    form, list, path = "base.disability.type"
}, ref
) => {
    return (
        <div className="col-span-3 border-collapse border">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full" contents={<Select field={field} selectList={list} classNameTrigger='border-none' />} />
                )}
            />
        </div>
    )
})

export const PocketBook = React.forwardRef<HTMLElement, ListProps>(({
    form, list, path = "base.disability.pocketbook"
}, ref
) => {
    return (
        <div className="col-span-4 grid border-collapse grid-cols-1 content-center border p-2 px-3">
            <FormField
                control={form.control}
                name={`${path}.has`}
                render={({ field }) => (
                    <Item className="space-y-3" contents={<RadioChoices field={field} colSpan='col-span-1' tgtId={0} contents={
                        <FormField
                            control={form.control}
                            name={`${path}.contents`}
                            render={({ field }) => (
                                <Item className="w-full" contents={<Select field={field} selectList={list} classNameTrigger='h-8' />} />
                            )} />} />} />
                )}
            />
        </div>
    )
})

export const Recipient = React.forwardRef<HTMLElement, Props>(({
    form, path = "base.recipient.has"
}, ref
) => {
    return (
        <div className="col-span-3 grid border-collapse grid-cols-1 content-center border p-5">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="space-y-3" contents={<RadioChoices field={field} colSpan='col-span-1' />} />
                )}
            />
        </div>
    )
})

export const Visiting = React.forwardRef<HTMLElement, HasProps>(({
    form, list, has, path = "base.visiting"
}, ref
) => {
    return (
        <div className="col-span-9 flex flex-row items-center border-collapse border space-x-2 px-3 ">
            <FormField
                control={form.control}
                name={`${path}.has`}
                render={({ field }) => (
                    <Item className="flex items-center space-x-3 space-y-0"
                        contents={
                            <RadioChoices field={field} list={list} groupClass='flex flex-row items-center space-x-1' />
                        }
                    />
                )}
            />
            {has && (<WithInput control={form.control} path={`${path}.contents`} />)}
        </div>
    )
})

export const Attached = React.forwardRef<HTMLElement, HasProps>(({
    form, list, has, path = "base.attached"
}, ref
) => {
    return (
        <div className='col-span-9 border-collapse items-center border space-x-2 space-y-2 px-3'>
            <div className="flex flex-row items-center space-x-2 mt-2">
                <FormField
                    control={form.control}
                    name={`${path}.has`}
                    render={({ field }) => (
                        <Item className="flex items-center space-x-3 space-y-0"
                            contents={
                                <RadioChoices field={field} list={list} groupClass='flex flex-row items-center space-x-1' />
                            }
                        />
                    )}
                />
                {has && (<WithInput control={form.control} path={`${path}.contents`} />)}
            </div>
            <div className="flex flex-row items-center space-x-1">
                <small>※既往歴や看護サマリーなど当日お持ちいただける場合はチェック→</small>
                <FormField
                    control={form.control}
                    name={`${path}.isBring`}
                    render={({ field }) => (
                        <Item className="flex items-center" contents={(<CheckboxUI
                            checked={field.value}
                            onCheckedChange={(checked) =>
                                field.onChange(checked)
                            }
                        />)} />
                    )}
                />
            </div>
        </div>
    )
})
