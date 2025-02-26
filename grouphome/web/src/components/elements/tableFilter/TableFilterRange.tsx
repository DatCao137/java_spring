import React, { useEffect, useState } from 'react';
import { CommonInput } from '../common/CommonInput';

interface TableFilterRangeProps {
    value: string;
    handle: (e: any) => void;
    minRange?: number;
}

export const TableFilterRange: React.FC<TableFilterRangeProps> = ({ value, handle, minRange = 0  }) => {
    const [min, setMin] = useState<string>(value.split(",")[0] ?? "");
    const [max, setMax] = useState<string>(value.split(",")[1] ?? "");

    const handleMinChange = (e: any) => {
        if(e.target && e.target.value.length > 3) return;
        if(e.target && (e.target.value.trim() == "" || /^[0-9]+$/.test(e.target.value))) {
            setMin(e.target.value);
        } else {
            setMin(String(minRange));
        }
    }

    const handleMaxChange = (e: any) => {
        if(e.target && e.target.value.length > 3) return;
        if(e.target && (e.target.value.trim() == "" || /^[0-9]+$/.test(e.target.value))) {
            setMax(e.target.value);
        } else {
            setMax(String(minRange));
        }
    }

    useEffect(() => {
        handle({ target: { value: [min, max].join(",") } });
    }, [min, max]);

    return (
        <>
            <div style={{display:"flex"}}>
            <CommonInput className="table-filter-range" value={min} onChange={handleMinChange} />
            ～
            <CommonInput className="table-filter-range" value={max} onChange={handleMaxChange} />
            </div>
        </>
    );
}