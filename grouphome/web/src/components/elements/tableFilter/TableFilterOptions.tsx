import React, { useState, useEffect } from 'react';
import { SelectItem } from '../Common';

interface TableFilterOptionsProps {
    options: SelectItem[]; // List of selectable options
    value: string | number | (string | number)[]; // Current selected value(s)
    handle: (e: any) => void; // Callback to handle changes
    multiple?: boolean; // Allow multiple selections or not
    allowToggle?: boolean; // Allow switching between radio and multiple tick
    className?: string; // Custom class for styling
}

export const TableFilterOptions: React.FC<TableFilterOptionsProps> = ({
    options,
    value,
    handle,
    multiple = true,
    allowToggle = false,
    className = '',
}) => {
    const [selected, setSelected] = useState<string | number | (string | number)[]>(value);
    const [isMultiple, setIsMultiple] = useState<boolean>(multiple);

    const handleChange = (optionValue: string | number) => {
        if (isMultiple) {
            // Handle multiple selection
            const updatedSelection = Array.isArray(selected)
                ? selected.includes(optionValue)
                    ? selected.filter((v) => v !== optionValue) // Remove if already selected
                    : [...selected, optionValue] // Add if not selected
                : [optionValue];
            setSelected(updatedSelection);
        } else {
            // Handle single selection
            setSelected(optionValue);
        }
    };

    useEffect(() => {
        // Notify parent component when selection changes
        handle({ target: { value: selected } });
    }, [selected]);

    const toggleMode = () => {
        setIsMultiple(!isMultiple); // Toggle between radio and multiple tick modes
        setSelected(isMultiple ? "" : []); // Reset selection when switching modes
    };

    return (
        <div className={`table-filter-options ${className}`}>
            {allowToggle && (
                <div className="toggle-mode">
                    <button type="button" onClick={toggleMode}>
                        {isMultiple ? "単一選択に切り替え" : "複数選択に切り替え"}
                    </button>
                </div>
            )}
            {options.map((option) => (
                <div key={option.value} className="table-filter-option">
                    <label>
                        <input
                            type={isMultiple ? 'checkbox' : 'radio'} // Dynamic input type
                            name="table-filter-option"
                            value={option.value} // Keep original type
                            checked={
                                isMultiple
                                    ? Array.isArray(selected) && selected.some((v) => v === option.value)
                                    : selected === option.value
                            }
                            className='mr-2'
                            onChange={() => handleChange(option.value)} // Update state
                        />
                        {option.name} {/* Display the option name */}
                    </label>
                </div>
            ))}
        </div>
    );
};