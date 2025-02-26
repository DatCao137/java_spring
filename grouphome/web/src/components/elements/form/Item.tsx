import React from 'react';
import { FormItem, FormMessage } from "@/components/ui/Form";

export interface ItemProps {
    index?: string;
    className?: string;
    contents: JSX.Element;
}

export const Item = React.forwardRef<HTMLElement, ItemProps>(({
    index, className, contents
}, ref
) => {
    return (
        <FormItem key={index} className={className}>
            {contents}
            <FormMessage />
        </FormItem>
    )
}
)