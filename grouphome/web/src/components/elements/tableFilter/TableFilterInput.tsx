import React from 'react';
import { CommonInput } from '../common/CommonInput';

interface TableFilterInputProps {
    value: string;
    handle: (e: any) => void;
}

export const TableFilterInput: React.FC<TableFilterInputProps> = ({ value, handle }) => {
    return (
        <>
            <CommonInput className="table-filter-input" value={value} onChange={handle} />
        </>
    );
}