import React from 'react'
import { FormField } from "@/components/ui/Form";
import { Item } from '../Item';
import { Calendar, Text } from '../Controls';
import { jpFormatTemplate02 } from '@/utils/DateUtils';

interface ListProps {
    form: any;
    pathStar?: string;
    pathEnd?: string;
}

export const TimeRange = React.forwardRef<HTMLElement, ListProps>(({
    form, pathStar = "timeStart", pathEnd = "timeEnd"
}, ref
) => {
    return (<>
        <div className="col-span-3 grid border-collapse grid-cols-9 border px-2">
            <div className="col-span-3 inputCalendar">
                <FormField
                    control={form.control}
                    name={pathStar}
                    render={({ field }) => (
                        <Item className="w-full" contents={<Text field={field} type="time" />} />
                    )}
                />
            </div>
            <div className="col-span-1 pt-2 text-center">~</div>
            <div className="col-span-3 inputCalendar">
                <FormField
                    control={form.control}
                    name={pathEnd}
                    render={({ field }) => (
                        <Item className="w-full" contents={<Text field={field} type="time" />} />
                    )}
                />
            </div>
        </div>
    </>)
})
