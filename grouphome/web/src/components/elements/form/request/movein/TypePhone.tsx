import React from 'react'
import { FormField } from '@/components/ui/Form';
import { Item } from '../../Item';
import { Text } from '../../Controls';

interface TypePhoneProps {
    form: any;
    path: string;
    label: string;
}

export const TypePhone = React.forwardRef<HTMLElement, TypePhoneProps>(({
    form, path, label
}, ref
) => {
    const tgt = [
        { name: "電話 : (" + label + ")", type: ".tel" },
        { name: "(携帯)", type: ".mobile" },
        { name: "(FAX)", type: ".fax" },
    ];
    return tgt.map((item, index) => (
        <div className="col-span-3 flex flex-row items-center space-x-2">
            <span className="text-nowrap">{item.name}</span>
            <FormField
                control={form.control}
                name={`${path}${item.type}`}
                render={({ field }) => (
                    <Item contents={(<Text field={field} />)} />
                )}
            />
        </div>
    ));
})
