import React from 'react';
import { CommonInput } from '../common/CommonInput';
import DatePicker from '../CalendarPicker';

interface TableFilterCalendarProps {
    value: string;
    handle: (e: any) => void;        
    format?: string;
    typeDate?: "W" | "J"
}

export const TableFilterCalendar: React.FC<TableFilterCalendarProps> = ({ value, handle, format="YYYY年MM月DD日", typeDate="J" }) => {
    return (
        <>
             <DatePicker
                value={value || null}
                onChange={handle}
                mode="single"
                placeholder={format}
                className="filter-custom-datepicker content-center !mt-0"
                inputClassName="filter-custom-input"
                format={format}
                type={typeDate}
                name="calendarFilter"
              />
        </>
    );
}