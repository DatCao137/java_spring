import React from 'react';
import { FormField } from "@/components/ui/Form";
import { Item } from '../../Item';
import { DatePickerUI, Text } from '../../Controls';

export interface DesireDateTimeProps {
    control: any;
    path: string;
}

export const DesireDateTime = React.forwardRef<HTMLElement, DesireDateTimeProps>(({
    control, path
}, ref
) => {
    return (
        <>
            <div className="text-left">
                <FormField
                    control={control}
                    name={`${path}.date`}
                    render={({ field }) => (
                        // <Item className="w-full" contents={<Text field={field} type="date" />} />
                        <Item className="" contents={<DatePickerUI field={field} className="desire-custom-datepicker content-center" inputClassName="custom-input border border-0 !px-2" name="" />} />
                    )}
                />
            </div>
            <div className="items-center 2xl:flex 2xl:flex-row">
                <small className="text-nowrap">時間帯 :</small>
                <FormField
                    control={control}
                    name={`${path}.time`}
                    render={({ field }) => (
                        <Item className="w-full" contents={<Text field={field} type="time" />} />
                    )}
                />
            </div>
        </>
    )
}
)
