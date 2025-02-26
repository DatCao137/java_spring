import React from 'react';
import { FormField } from "@/components/ui/Form";
import { Contacts } from './Contact';
import { Item } from '../../Item';
import { Text } from '../../Controls';

interface Props {
    form: any;
    path?: string;
}

export const AttendantName = React.forwardRef<HTMLElement, Props>(({
    form, path = "attendant.name"
}, ref
) => {
    return (
        <div className="col-span-9 border-collapse border px-2">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full" contents={<Text field={field} />} />
                )}
            />
        </div>
    )
}

)

export const AttendantContact = React.forwardRef<HTMLElement, Props>(({
    form, path = "attendant.contact"
}, ref
) => {
    return (
        <div className="col-span-9 grid border-collapse grid-cols-1 border px-2">
            <Contacts control={form.control} path={path} itemClass='w-full' />
        </div>
    )
}

)