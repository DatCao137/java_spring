import { FormField } from "@/components/ui/Form";
import { forwardRef } from "react";
import { SelectMulti } from "../Controls";
import { SelectListResponseDto } from "@/features/customer-management/contexts/SelectListContext";
import { Item } from "../Item";

interface SelectProps {
    title?: string;
    form: any;
    name: string;
    items: SelectListResponseDto[];
    itemClass?: string;
}

export const CommonMultiSelect = forwardRef(({
    title, form, name, items, itemClass
}: SelectProps, ref: any) => {
    const handleInputChange = (e:string[]) => {
        form.setValue(name, e);
    }
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (<>
                {title !== '' && <label className="itemTitleLabel">{title}</label>}
                <Item className={itemClass} contents={(
                    <SelectMulti field={field} selectList={items} onChange={handleInputChange} />
                )} />
            </>)}
        />
    )
}
)