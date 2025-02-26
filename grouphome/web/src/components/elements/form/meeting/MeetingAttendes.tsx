import React from 'react'
import { FormField } from "@/components/ui/Form";
import { Item } from '../Item';
import { Number, Select, Text, WithInput } from '../Controls';

interface ListProps {
    form: any;
    path?: string;
}

export const MeetingAttendes = React.forwardRef<HTMLElement, ListProps>(({
    form, path = "meetingAttendees"
}, ref
) => {
    return (<>
        <div className="col-span-2 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1 p-2 text-center">職種</div>
        </div>
        <div className="col-span-2 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1 p-2 text-center">氏名</div>
        </div>
        <div className="col-span-2 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1 p-2 text-center">職種</div>
        </div>
        <div className="col-span-2 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1 p-2 text-center">氏名</div>
        </div>

        {[...Array(8)].map(function(object, i){
            return (<>
                <div className="col-span-2 grid border-collapse grid-cols-1 border px-2">
                    <div className="col-span-1">
                        <FormField
                            control={form.control}
                            name={ path + '.profession' + (i+1) }
                            render={({ field }) => (
                                <Item contents={<Text field={field} />} />
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-2 grid border-collapse grid-cols-1 border px-2">
                    <div className="col-span-1">
                        <FormField
                            control={form.control}
                            name={ path + '.name' + (i+1) }
                            render={({ field }) => (
                                <Item contents={<Text field={field} />} />
                            )}
                        />
                    </div>
                </div>
            </>)
        })}
    </>)
})
