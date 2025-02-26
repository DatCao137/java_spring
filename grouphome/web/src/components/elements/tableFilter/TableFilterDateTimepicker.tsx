import React from 'react';
import { CommonInput } from '../common/CommonInput';

interface TableFilterDatepickerProps {
    value: string;
    handle: (e: any) => void;
}

export const TableFilterDateTimepicker: React.FC<TableFilterDatepickerProps> = ({ value, handle }) => {
    return (
        <>
            <CommonInput className="table-filter-input" type="datetime-local" value={value} onChange={handle} />
        </>
    );
}