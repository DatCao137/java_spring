import React, { useEffect, useState } from 'react';
import { CommonInput } from '../common/CommonInput';

interface TableFilterInputNumberProps {
    value: string;
    handle: (e: { target: { value: string } }) => void;
    minNumber?: number;
}

export const TableFilterInputNumber: React.FC<TableFilterInputNumberProps> = ({ value, handle, minNumber = 0 }) => {const [inputValue, setInputValue] = useState<string>(() => {
        const initial = value?.split(",")[0] ?? "";
        const numericValue = parseInt(initial, 10);
        return !isNaN(numericValue) && numericValue >= minNumber ? String(numericValue) : "";
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const input = e.target.value;

        if (/^-?[0-9]*$/.test(input)) {
            const numericValue = parseInt(input, 10);
            if (numericValue >= minNumber || input === "" || isNaN(numericValue)) {
                setInputValue(input);
            } else {
                setInputValue(String(minNumber));
            }
        }
    };

    useEffect(() => {
        if (inputValue == '') {
            handle({ target: { value: "" } });
        } else {
            handle({ target: { value: inputValue } });
        }
    }, [inputValue]);

    return (
        <div>
            <CommonInput
                className="table-filter-input"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};
