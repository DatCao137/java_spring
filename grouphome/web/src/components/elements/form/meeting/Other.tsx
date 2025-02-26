import React from 'react';
import { FormField } from "@/components/ui/Form";
import { Item } from '../Item';
import { TextArea } from '../Controls';

interface Props {
    form: any;
    path?: string;
}

export const ItemsConsidered = React.forwardRef<HTMLElement, Props>(({
    form, path = "itemsConsidered"
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

export const ResultsConsideration1 = React.forwardRef<HTMLElement, Props>(({
    form, path = "resultsConsideration1"
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

export const ResultsConsideration2 = React.forwardRef<HTMLElement, Props>(({
    form, path = "resultsConsideration2"
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