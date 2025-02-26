import React, { useEffect, useState } from 'react';
import { CommonInput } from '../common/CommonInput';

interface TableFilterDateRangeProps {
    value: string;
    handle: (e: any) => void;
}

export const TableFilterDateRange: React.FC<TableFilterDateRangeProps> = ({ value, handle }) => {
    const [min, setMin] = useState<string>(value.split(",")[0] ?? "");
    const [max, setMax] = useState<string>(value.split(",")[1] ?? "");

    // Xử lý thay đổi giá trị min
    const handleMinChange = (e: any) => {
        const newValue = e.target.value;
        if (newValue.trim() === "" || /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(newValue)) {
            setMin(newValue); // Lưu giá trị min hợp lệ
        }
    };

    // Xử lý thay đổi giá trị max
    const handleMaxChange = (e: any) => {
        const newValue = e.target.value;
        if (newValue.trim() === "" || /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(newValue)) {
            setMax(newValue); // Lưu giá trị max hợp lệ
        }
    };

    useEffect(() => {
        handle({ target: { value: [min, max].join(",") } });
    }, [min, max]);

    return (
        <div style={{display: "flex"}}>
            <CommonInput className="table-filter-date-range" type ="date" value={min} onChange={handleMinChange}/>
            ～
            <CommonInput className="table-filter-date-range" type ='date' value={max} onChange={handleMaxChange}/>
        </div>
    );
};
