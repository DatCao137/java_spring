import { FormField } from "@/components/ui/Form";
import { forwardRef } from "react";
import { Item } from "../Item";
import DatePicker from "../../CalendarPicker";

interface DatePickerProps {
    title?: string;
    form: any;
    name: string;
    viewMode?: "month" | "date";
    itemClass?: string;
    placeholder?: string;
    format?: string;
}

export const CommonDatePicker = forwardRef(({
    title, form, name, itemClass = '', viewMode = "date", placeholder = "YYYY年MM月DD日", format = "YYYY年MM月DD日"
}: DatePickerProps, ref: any) => {

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (<>
                {title !== '' && <label className="itemTitleLabel">{title}</label>}
                <Item className={itemClass} contents={(
                    <DatePicker
                        value={field.value}
                        name={field.name}
                        onChange={field.onChange}
                        viewMode={viewMode}
                        placeholder={placeholder}
                        className="custom-datepicker-calc custom-datepicker content-center"
                        inputClassName="custom-input"
                        format={format}
                    />
                )} />
            </>)}
        />
    )
}
)