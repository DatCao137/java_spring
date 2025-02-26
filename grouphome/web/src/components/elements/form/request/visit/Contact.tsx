
import React from 'react';
import { FormField } from "@/components/ui/Form";
import { Item } from '../../Item';
import { Text } from '../../Controls';

export interface ContactsProps {
    control: any;
    path: string;
    itemClass?: string;
}

export const Contacts = React.forwardRef<HTMLElement, ContactsProps>(({
    control, path, itemClass
}, ref
) => {
    return (
        <>
            <div className="col-span-1 flex flex-row items-center space-x-2">
                <span className="text-nowrap">電話:</span>
                <FormField
                    control={control}
                    name={`${path}.tel`}
                    render={({ field }) => (
                        <Item className={itemClass} contents={<Text field={field} />} />
                    )}
                />
            </div>

            <div className="col-span-1 flex flex-row items-center space-x-2">
                <span className="text-nowrap">FAX:</span>
                <FormField
                    control={control}
                    name={`${path}.fax`}
                    render={({ field }) => (
                        <Item className={itemClass} contents={<Text field={field} />} />
                    )}
                />
            </div>

            <div className="col-span-1 flex flex-row items-center space-x-2">
                <span className="text-nowrap">メール:</span>
                <FormField
                    control={control}
                    name={`${path}.mail`}
                    render={({ field }) => (
                        <Item className={itemClass} contents={<Text field={field} />} />
                    )}
                />
            </div>

        </>
    )
}
)
