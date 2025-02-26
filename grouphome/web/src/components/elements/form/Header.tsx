import React from 'react';
import { FormField } from "@/components/ui/Form";
import { Calendar, DatePickerUI } from './Controls';
import { Item } from './Item';
import { RadioBySelect } from './RadioChoices';
import { jpFormatTemplate01 } from '@/utils/DateUtils';


export interface HeaderProps {
    control: any;
    requestItems: { name: string, value: string }[];
    pathItem: string;
    pathDate: string;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(({
    control, requestItems, pathItem, pathDate
}, ref
) => {
    return (
        <div className="grid grid-cols-8 gap-2">
            <div className="col-span-5 flex items-center space-x-2">
                <FormField
                    control={control}
                    name={pathItem}
                    render={({ field }) => (
                        <Item className="space-y-3" contents={<RadioBySelect field={field} list={requestItems} doCancel={false} />} />
                    )}
                />
            </div>
            <span className="col-span-1 col-start-6 content-center pr-2 text-right">
                申込日
            </span>
            <span className="col-span-2 col-start-7 content-center text-left">
                <FormField
                    control={control}
                    name={pathDate}
                    render={({ field }) => (<>
                        {/* <Item className="" contents={<Calendar field={field} label="申込日" template={jpFormatTemplate01} />} /> */}
                        <Item className="" contents={<DatePickerUI field={field} className="custom-datepicker content-center" inputClassName="custom-input" name="" viewMode = "date" format="YYYY年MM月DD日(ddd)"  />} />
                    </>)}
                />
            </span>
        </div>
    )
}
)