import { FormField } from "@/components/ui/Form";
import { Input as InputUI } from "@/components/ui/Input";
import { forwardRef } from "react";
import { Item } from "../Item";
import { Number } from "../Controls";

interface NumberProps {
    title?: string;
    form: any;
    name: string;
    itemClass?: string;
    enableZero?: boolean;
}

export const CommonNumber = forwardRef(({
    title, form, name, itemClass = '', enableZero = false
}: NumberProps, ref: any) => {

    return (<>
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (<>
                {title !== '' && <label className="itemTitleLabel">{title}</label>}
                <Item className={itemClass} contents={(<Number field={field} min={0} enableZero={enableZero}/>)} />
            </>)}
        />
    </>)
}
)