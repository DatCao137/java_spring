import React from 'react'
import { FormField } from '@/components/ui/Form';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { Item } from '../../Item';
import { RadioBySelect } from '../../RadioChoices';
import { CheckList } from '../../CheckList';
import { Number, Select, Text, WithInput } from '../../Controls';

interface ListProps {
    form: any;
    path?: string;
    list: SelectListResponseDto[];
    val?: string | undefined;
    tgt?: string;
}
interface TransferListProps {
    form: any;
    path?: string;
    list: SelectListResponseDto[];
    transport: SelectListResponseDto[];
    val?: string | undefined;
    tgt?: string;
    tgt2?: string;
}

export const Name = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "contents", list
}, ref
) => {
    return (<>
        <div className="col-span-7 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1">
                <FormField
                    control={form.control}
                    name={`${path}.name`}
                    render={({ field }) => (
                        <Item contents={<Text field={field} />} />
                    )}
                />
            </div>
            <div className="col-span-1 flex flex-row items-center space-x-2">
                <span className="text-nowrap">代筆者名 :</span>
                <FormField
                    control={form.control}
                    name={`${path}.representative`}
                    render={({ field }) => (
                        <Item contents={<Text field={field} />} />
                    )}
                />
            </div>
        </div>
        <div className="col-span-2 items-center">
            <FormField
                control={form.control}
                name={`${path}.sex`}
                render={({ field }) => (
                    <Item contents={(
                        <RadioBySelect field={field}
                            list={list}
                            className='flex items-center space-x-3 space-y-0 py-2'
                            groupClass='flex w-full flex-col items-center divide-y' />
                    )} />
                )}
            />
        </div>
    </>)
})

export const Selects = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "", list
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={({ field }) => (
                <Item className="space-y-3" contents={(
                    <RadioBySelect field={field} list={list} groupClass='flex text-nowrap flex-row items-center space-x-1' />
                )} />
            )}
        />)
})

export const Requirements = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "contents.requirements.items", list
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name={path}
            render={() => (
                <Item className="col-span-7 grid grid-cols-12"
                    contents={
                        <CheckList form={form} path='contents.requirements.items' list={list} otherPath='contents.requirements.contents' otherWidth='col-span-10' />
                    } />
            )}
        />
    )
})


export const DisabilityClass = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "contents.disabilityClass", list
}, ref
) => {
    return (
        <FormField
            control={form.control}
            name="contents.disabilityClass"
            render={({ field }) => (
                <Item className='col-span-2 p-2' contents={(
                    <Select field={field} selectList={list} classNameTrigger='' />
                )} />
            )}
        />
    )
})

export const InsuranceType = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "contents.insurance.type", list, val, tgt = 'その他'
}, ref
) => {
    return (<>
        <Selects form={form} path={`${path}.type`} list={list} />
        {
            list.findIndex((item) => item.value == val && item.name == tgt) > -1 && (
                <WithInput control={form.control} path={`${path}.contents`} itemClass='w-2/5' classAdd='mt-2' />
            )
        }</>
    )
})
export const InsuranceExpenses = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "contents.insurance.expenses", list, val, tgt
}, ref
) => {
    return (<>
        <Selects form={form} path={`${path}.type`} list={list} />
        {
            list.findIndex((item) => item.value == val && item.value == tgt) > -1 && (
                <FormField
                    control={form.control}
                    name={`${path}.limit`}
                    render={({ field }) => (
                        <Item className="w-full" contents={(
                            <Number field={field} min={0} preString='(負担額上限' postString='円)' className='ml-2 h-8 border-b bg-[#e0e0e0e0] text-right' />
                        )} />
                    )} />
            )
        }
    </>
    )
})

export const Transfer = React.forwardRef<HTMLElement, TransferListProps>(({
    form, path = "contents.situation.transfer", list, transport, val, tgt = 'その他', tgt2
}, ref
) => {
    return (<>
        <div className="col-span-7 flex flex-row items-center space-x-2 mt-1">
            <Selects form={form} path={`${path}.transferType`} list={list} />

            {list.findIndex(
                (item) =>
                    item.value == val && item.name == tgt,
            ) > -1 && (
                    <FormField
                        control={form.control}
                        name={`${path}.contents`}
                        render={({ field }) => (
                            <Item className='w-full' contents={(
                                <WithInput control={form.control} path={`${path}.contents`} preString='(' postString=')' />
                            )} />
                        )}
                    />
                )}
        </div>
        {list.findIndex(
            (item) => item.value == val && item.value == tgt2,
        ) > -1 && (
                <div className="col-span-7 flex flex-row items-center space-x-2">
                    <small className="mr-2 text-nowrap">
                        利用できる交通手段→
                    </small>
                    <FormField
                        control={form.control}
                        name="contents.situation.transfer.transportationType"
                        render={({ field }) => (
                            <Item className='space-y-3 p-2' contents={(
                                <RadioBySelect field={field} list={transport} />
                            )} />
                        )}
                    />
                </div>
            )}
    </>)
})
