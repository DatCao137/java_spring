import React from 'react';
import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { FormField } from "@/components/ui/Form";
import { Item } from '../../Item';
import { Number, TextArea } from '../../Controls';
import { DesireDateTime } from './DesireDateTime';
import { CheckList } from '../../CheckList';

export interface DesiredItemProps {
    form: any;
    list: SelectListResponseDto[]
    path?: string;
    pathDate?: string;
}

export const DesiredItem = React.forwardRef<HTMLElement, DesiredItemProps>(({
    form, list, path = 'desired', pathDate = 'desiredDate'
}, ref
) => {
    return (
        <>
            {/* line 1 */}
            <div className="col-span-7 grid grid-cols-11">
                <div className="col-span-2 border-collapse content-center text-wrap border text-center">第１希望</div>
                <div className="col-span-2 border-collapse content-center text-wrap border text-center">第2希望</div>
                <div className="col-span-4 border-collapse content-center text-wrap border text-center">希望人数・属性</div>
                <div className="col-span-3 border-collapse content-center text-wrap border text-center">当日連絡先</div>
            </div>

            {/* line 2 */}
            <div className="col-span-7 grid grid-cols-11">
                <div className="col-span-2 border-collapse border px-2">
                    <DesireDateTime control={form.control} path={`${pathDate}.first`} />
                </div>
                <div className="col-span-2 border-collapse border px-2">
                    <DesireDateTime control={form.control} path={`${pathDate}.second`} />
                </div>
                <div className="col-span-4 border-collapse border px-2">
                    <div className="text-left">
                        <FormField
                            control={form.control}
                            name="desired.count"
                            render={({ field }) => (
                                <Item className='w-full' contents={(<Number field={field} min={1} className='border-b text-end' postString='人' />)} />
                            )}
                        />
                    </div>
                    <div className="py-3">
                        <FormField
                            control={form.control}
                            name={`${path}.attribute`}
                            render={() => (
                                <Item className="col-span-4 grid grid-cols-4 items-center space-y-0 2xl:flex 2xl:flex-row 2xl:space-x-2"
                                      contents={<CheckList form={form} path={`${path}.attribute`} list={list} />} />
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-3 border-collapse border px-2">
                    <div className="h-full content-center text-left">
                        <FormField
                            control={form.control}
                            name={`${path}.contactInfo`}
                            render={({ field }) => (
                                <Item className="w-full" contents={(<TextArea field={field} rows={4} />)} />
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
)
