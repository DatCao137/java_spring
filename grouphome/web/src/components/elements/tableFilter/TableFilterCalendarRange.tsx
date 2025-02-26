import React, { useEffect, useState } from 'react';
import { CommonInput } from '../common/CommonInput';
import DatePicker from '../CalendarPicker';
import { formatJPDate } from '@/utils/DateUtils';

interface TableFilterCalendarRangeProps {
    value: string;
    handle: (e: any) => void;
    format?: string;
    typeDate?: "W" | "J"
}

export const TableFilterCalendarRange: React.FC<TableFilterCalendarRangeProps> = ({ value, handle, format="YYYY年MM月DD日(ddd)", typeDate="J" }) => {
    const [min, setMin] = useState<string | null>(value.split(",")[0] || null);
    const [max, setMax] = useState<string | null>(value.split(",")[1] || null);

    const handleMinChange = (e: any) => {
        const newValue = e.target.value;
        setMin(newValue); 
    };

    const handleMaxChange = (e: any) => {
        const newValue = e.target.value;
        setMax(newValue); 

    };

    useEffect(() => {
        handle({ target: { value: [min || '', max || ''].join(",") } });
    }, [min, max]);

    return (
        <div style={{display: "flex"}}>
            <DatePicker
                value={min || null}
                onChange={handleMinChange}
                mode="single"
                placeholder={format}
                className="filter-custom-datepicker filter-datepicker-range content-center !mt-0"
                inputClassName="filter-custom-input"
                format={format}
                type={typeDate}
                name="calendarMinRangeFilter"
              />
            ～
            <DatePicker
                value={max || null}
                onChange={handleMaxChange}
                mode="single"
                placeholder={format}
                className="filter-custom-datepicker filter-datepicker-range content-center !mt-0"
                inputClassName="filter-custom-input"
                format={format}
                type={typeDate}
                name="calendarMaxRangeFilter"
              />
        </div>
    );
};