import React, { forwardRef } from 'react';
import Select, { MultiValue, Props as SelectProps } from 'react-select';
import styled from 'styled-components';
import { TableCss } from '../TableCss';

interface Option {
  name: string;
  value: any;
}

interface CommonMultipleSelectProps {
  options: Option[];
  value: any[] | undefined;
  onChange: (e: { value: string[], id: string }) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  title?: string;
}

const StyledLabel = styled.label`
  color: rgb(103, 103, 103);
  margin-right: 5px;
  font-size: 12px;
`;

const CommonMultipleSelect = forwardRef<any, CommonMultipleSelectProps>(
  ({
    options,
    value,
    onChange,
    placeholder = "",
    className = '',
    id = '',
    title = '',
  }, ref) => {
    const handleChange = (selected: MultiValue<{ value: any; label: string }> | null) => {
      const selectedValues = (selected || []).map(option => option.value);
      onChange({ value: selectedValues, id: id });
    };

    return (
      <>
        <style>
          <TableCss />
        </style>
        {title !== '' && <StyledLabel htmlFor={id}>{title}</StyledLabel>}
        <Select
          ref={ref}
          id={id}
          options={options.map(option => ({ value: option.value, label: option.name }))}
          value={value?.map(val => ({ value: val, label: options.find(option => option.value == val)?.name || '' }))}
          onChange={handleChange}
          placeholder={placeholder}
          isMulti
          className="custom-select-react"
        />
      </>
    );
  }
);

export { CommonMultipleSelect };
