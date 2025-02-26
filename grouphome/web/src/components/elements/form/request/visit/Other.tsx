import React from 'react';
import { FormField } from "@/components/ui/Form";
import { Item } from '../../Item';
import { TextArea } from '../../Controls';

interface Props {
    form: any;
    path?: string;
}

export const Etc = React.forwardRef<HTMLElement, Props>(({
    form, path = "etc"
}, ref
) => {
    return (
        <div className="col-span-7 border-collapse content-center border px-2">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full" contents={(<TextArea field={field} rows={4} />)} />
                )}
            />
        </div>
    )
}
)

export const Remark = React.forwardRef<HTMLElement, Props>(({
    form, path = "remark"
}, ref
) => {
    return (
        <div className="col-span-7 border-collapse content-center border px-2">
            <FormField
                control={form.control}
                name={path}
                render={({ field }) => (
                    <Item className="w-full" contents={(<TextArea field={field} rows={4} />)} />
                )}
            />
        </div>
    )
}
)