import React, { forwardRef } from 'react';
import styled from 'styled-components';
import md5 from 'md5';

interface Option {
  name: string;
  value: any;
  disabled?: boolean;
}

interface CommonSelectProps {
  options: Option[];
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  title?: string;
  disabled?: boolean;
  name?: string;
}

const StyledSelect = styled.select`
  border: 0.5px solid #aeaeae;
  border-radius: 5px;
  height: 25px; 
  padding: 0 10px; 
  font-size: 14px;
  color: rgb(46, 46, 46); 
  background-color: white; 

  &:hover,
  &:focus {
    border-color: #409eff;
    outline: none; 
  }

  option {
    color: rgb(46, 46, 46); 
  }

  option:disabled {
    color: #999; // Style for disabled options
  }
`;

const StyledLabel = styled.label`
  color: rgb(103 103 103);
  margin-right: 5px;
  font-size: 12px;
`;

const CommonSelect = React.forwardRef<HTMLSelectElement, CommonSelectProps>(({
  options,
  value,
  onChange,
  className = '',
  id = '',
  title = '',
  name = '',
  disabled = false,
  placeholder,
  ...props
}, ref) => {
  const selectValue = value ?? '';

  return (
    <>
      {title && <StyledLabel htmlFor={id}>{title}</StyledLabel>}
      <StyledSelect
        id={id}
        name={name}
        value={selectValue}
        onChange={onChange}
        className={className}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <option value="" disabled hidden></option>
        {options.map((item) => {
          const uniqueKey = md5(JSON.stringify(item));
          return (
            <option key={uniqueKey} value={item.value} disabled={item.disabled}>
              {item.name}
            </option>
          )
        })}
      </StyledSelect>
    </>
  );
});

export { CommonSelect };