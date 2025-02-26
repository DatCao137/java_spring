import React from 'react'
import { FormField } from '@/components/ui/Form';
import { SelectListResponseDto } from "@/features/customer-management/contexts/SelectListContext";
import { Item } from '../../Item';
import { Text } from '../../Controls';
import { RadioBySelect } from '../../RadioChoices';

interface ContactProps {
    form: any;
    path: string;
    pathTel?: string;
    address: JSX.Element;
    phoneTypes: SelectListResponseDto[];
    reqName: boolean;
}
interface PhoneProps {
    form: any;
    path?: string;
    list: SelectListResponseDto[];
}

export const Contact = React.forwardRef<HTMLElement, ContactProps>(({
    form, path = "contents.currentAddress", pathTel = "", address, phoneTypes, reqName
}, ref
) => {
    return (<>
        {reqName && (<>
            <div className="col-span-3 grid grid-cols-9 align-middle">
                <div className="col-span-1 border-collapse content-center border text-center">氏名</div>
                <div className="col-span-8 flex border-collapse items-center border px-2">
                    <FormField
                        control={form.control}
                        name={`${path}.name`}
                        render={({ field }) => (
                            <Item className='w-full' contents={(<Text field={field} className='h-[26px]' />)} />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-3 grid grid-cols-5">
                <div className="col-span-5 grid grid-cols-5">
                    <div className="col-span-1 border-collapse content-center border text-center">続柄</div>
                    <div className="col-span-4 flex border-collapse items-center border px-2">
                        <FormField
                            control={form.control}
                            name={`${path}.relationship`}
                            render={({ field }) => (
                                <Item className='w-full' contents={(<Text field={field} />)} />
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-3 grid grid-cols-9 align-middle">
                <div className="col-span-1 row-span-3 border-collapse content-center border text-center">
                    <span
                        style={{
                            textOrientation: 'mixed',
                            writingMode: 'vertical-lr',
                        }}
                    >
                        住 所
                    </span>
                </div>
                <div className="col-span-8 row-span-3 border-collapse content-center border px-2">
                    {address}
                </div>
            </div>
        </>)}
        {!reqName && (
            <div className="col-span-3 border-collapse content-center border px-2">
                {address}
            </div>
        )}
        <div className="col-span-3 grid grid-cols-5 gap-2 border px-2">
            <Phone form={form} path={`${path}${pathTel}.tel`} list={phoneTypes} />
        </div>
    </>)
})

export const Phone = React.forwardRef<HTMLElement, PhoneProps>(({
    form, path = "contents.currentAddress.tel", list
}, ref
) => {
    return (<>
        <div className="col-span-4 flex flex-row items-center space-x-2">
            <span className="text-nowrap">電話番号</span>
            <FormField
                control={form.control}
                name={`${path}.type`}
                render={({ field }) => (
                    <Item className='flex flex-row items-center space-y-3' contents={(
                        <RadioBySelect field={field} list={list} />
                    )} />
                )}
            />
        </div >
        <div className="col-span-4 col-start-1 flex flex-row items-center space-x-2">
            <FormField
                control={form.control}
                name={`${path}.no`}
                render={({ field }) => (
                    <Item className='col-span-2' contents={(
                        <Text field={field} />
                    )} />
                )}
            />
            <span>{'('}</span>
            <FormField
                control={form.control}
                name={`${path}.inner`}
                render={({ field }) => (
                    <Item className="col-span-2" contents={(
                        <Text field={field} />
                    )} />
                )}
            />
            <span>{')'}</span>
        </div>
        <div className="col-span-4 flex flex-row items-center space-x-2">
            <span className="text-nowrap">メール</span>
            <FormField
                control={form.control}
                name={`${path}.mail`}
                render={({ field }) => (
                    <Item contents={(<Text field={field} />)} />
                )}
            />
        </div>

    </>)

})

