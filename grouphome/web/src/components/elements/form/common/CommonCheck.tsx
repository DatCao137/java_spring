import { FormField } from "@/components/ui/Form";
import { forwardRef } from "react";
import { Checks } from "../Checks";
import { SelectOpt } from "./Common";
import { Item } from "../Item";

interface CheckProps {
    title?: string;
    form: any;
    name: string;
    items: SelectOpt[];
    itemClass?: string;
}

export const CommonCheck = forwardRef(({
    title, form, name, items, itemClass
}: CheckProps, ref: any) => {
    return (<>
        {items.filter((item) => !item.unvisible).map((item, idx) => (
            <FormField
                key={idx}
                control={form.control}
                name={name}
                render={({ field }) => {
                    field.value = form.getValues(name);
                    const checked = field.value?.includes(item.name);
                    return (<>
                        {title !== '' && <label className="itemTitleLabel">{title}</label>}
                        <Item className={itemClass} contents={(
                            <Checks control={form.control}
                                    field={field}
                                    index={idx}
                                    item={{ name: item.name, value: item.name }}
                                    checked={checked}
                                    disabled={item.disabled} />
                        )} />
                    </>);
                }}
            />
        ))}
    </>)
}
)