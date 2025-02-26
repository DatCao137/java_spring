import React from 'react'
import { FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { Checkbox as CheckboxUI } from '@/components/ui/Checkbox';
import { Input as InputUI } from '@/components/ui/Input';
import { Item } from '../../Item';
import { Select } from '../../Controls';
import { RadioChoices } from '../../RadioChoices';

interface Props {
    form: any;
    path?: string;
    listPhysical: SelectListResponseDto[];
    listMental: SelectListResponseDto[];
}

export const Book = React.forwardRef<HTMLElement, Props>(({
    form, path = 'contents.book', listPhysical, listMental
}, ref
) => {
    return (<>
        <div className="col-span-6 grid border-collapse grid-cols-12 space-x-4 space-y-2 border py-2">
            <div className="col-span-5 flex flex-row items-center px-5">
                <FormField
                    control={form.control}
                    name={`${path}.has`}
                    render={({ field }) => (
                        <Item className="space-y-3" contents={(
                            <RadioChoices field={field} groupClass='flex flex-row items-center space-x-1' list={[
                                { name: '有', value: true },
                                { name: '無', value: false },
                            ]} />
                        )} />
                    )}
                />
            </div>

            <div className="col-span-5 flex flex-row items-center space-x-2">
                <FormField
                    control={form.control}
                    name={`${path}.physical.has`}
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <CheckboxUI
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(checked)}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <small className="ml-2 text-nowrap">身体障がい手帳 :</small>
                <FormField
                    control={form.control}
                    name={`${path}.physical.degree`}
                    render={({ field }) => (
                        <Item className="w-full xl:w-2/5" contents={(
                            <Select field={field} selectList={listPhysical} classNameTrigger='' />
                        )} />
                    )}
                />
            </div>
            <div className="col-span-5 flex flex-row items-center">
                <FormField
                    control={form.control}
                    name={`${path}.treatment.has`}
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <CheckboxUI
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(checked)}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <small className="ml-2 text-nowrap">療育手帳-程度</small>
                <FormField
                    control={form.control}
                    name={`${path}.treatment.degree`}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <span className="flex flex-row items-center space-x-2">
                                <small className="text-nowrap">{'(程度 : '}</small>
                                <InputUI
                                    type="text"
                                    {...field}
                                    className="rounded-none border-0 pr-2 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />

                                <small className="text-nowrap">{')'}</small>
                            </span>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="col-span-5 flex flex-row items-center space-x-2">
                <FormField
                    control={form.control}
                    name={`${path}.mental.has`}
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <CheckboxUI
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(checked)}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <small className="ml-2 text-nowrap">精神保健手帳 :</small>
                <FormField
                    control={form.control}
                    name={`${path}.mental.degree`}
                    render={({ field }) => (
                        <Item className="w-full xl:w-2/5" contents={(
                            <Select field={field} selectList={listMental} classNameTrigger='' />
                        )} />
                    )}
                />
            </div>
        </div>
    </>)
}
)