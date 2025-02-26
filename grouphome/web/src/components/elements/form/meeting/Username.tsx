import React from 'react'
import { FormField } from "@/components/ui/Form";
import { Item } from '../Item';
import { Text } from '../Controls';

interface Props {
    form: any;
    path?: string;
}

export const Username = React.forwardRef<HTMLElement, Props>(({
    form, path = "username"
}, ref
) => {
    return (<>
        <div className="col-span-3 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1">
                <FormField
                    control={form.control}
                    name={path}
                    render={({ field }) => (
                        <Item className="w-full" contents={<Text field={field} />} />
                    )}
                />
            </div>
        </div>
    </>)
})
