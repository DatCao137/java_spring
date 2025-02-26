import React from 'react'
import { FormField } from "@/components/ui/Form";
import { Item } from '../Item';
import { Number, Select, Text, WithInput } from '../Controls';

interface ListProps {
    form: any;
    path?: string;
}

export const WrittenBy = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "writtenBy"
}, ref
) => {
    return (<>
        <div className="col-span-3 grid border-collapse grid-cols-1 border px-2">
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
