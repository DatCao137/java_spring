import { FormField } from "@/components/ui/Form";
import { Input as InputUI } from "@/components/ui/Input";
import { forwardRef } from "react";
import { Item } from "../Item";

interface InputProps {
    title?: string;
    form: any;
    name: string;
    type: string;
    itemClass?: string;
}

export const CommonInput = forwardRef(({
    title, form, name, type, itemClass = ''
}: InputProps, ref: any) => {

    return (<>
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (<>
                {title !== '' && <label className="itemTitleLabel">{title}</label>}
                <Item className={itemClass} contents={(<InputUI type={type} {...field} />)} />
            </>)}
        />
    </>)
}
)