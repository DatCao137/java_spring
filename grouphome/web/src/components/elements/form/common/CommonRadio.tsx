import { FormControl, FormField, FormItem } from "@/components/ui/Form";
import { forwardRef } from "react";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { RadioButton } from "../Controls";
import { SelectOpt } from "./Common";
import { Item } from "../Item";

interface RadioProps {
    title?: string;
    form: any;
    name: string;
    option: SelectOpt[];
    groupClass: string;
    itemClass: string;
}
interface RadioBySelectProps {
    field: any;
    list: SelectOpt[];
    groupClass?: string;
    className?: string;
    doCancel?: boolean;
}


export const CommonRadio = forwardRef(({
    title, form, name, option, groupClass, itemClass
}: RadioProps, ref: any) => {
    return (
        <FormField control={form.control}
            name={name}
            render={({ field }) => (<>
                {title !== '' && <label className="itemTitleLabel">{title}</label>}
                <RadioBySelect field={field} groupClass={groupClass} className={itemClass} list={option} />
            </>)}
        />
    )
}
)

const RadioBySelect = forwardRef<HTMLElement, RadioBySelectProps>(({
    field, groupClass = 'flex flex-row items-center space-x-1'
         , className = 'flex items-center space-x-3 space-y-0'
         , list, doCancel = true
}, ref
) => {
    return (
        <FormControl>
            <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                className={groupClass}
            >
                {list.filter((item) => !item.unvisible).map((item, i) => (
                    <Item index={String(i)} className ={className} contents={(
                        <RadioButton field={field} item={{name:item.name, value:item.name}} doCancel={doCancel} disabled={item.disabled} />
                    )} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}
)
