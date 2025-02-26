import React from 'react'
import { FormField } from "@/components/ui/Form";
import { Item } from '../Item';
import { Calendar, DatePickerUI } from '../Controls';
import { jpFormatTemplate02 } from '@/utils/DateUtils';

interface ListProps {
    form: any;
    path?: string;
}

export const Date = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "date"
}, ref
) => {
    return (<>
        <div className="col-span-3 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1 inputCalendar">
                <FormField
                    control={form.control}
                    name={path}
                    render={({ field }) => (
                        <Item className="" contents={<DatePickerUI field={field} className="custom-datepicker content-center" inputClassName="custom-input border border-0" name="" viewMode = "date" />} />
                    )}
                />
            </div>
        </div>
    </>)
})
