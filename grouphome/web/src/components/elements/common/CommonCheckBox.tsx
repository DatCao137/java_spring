import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface CommonCheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
}

const StyledInput = styled.input`
  height: 16px;
  width: 16px;
  
  &:hover {
    border: 0.5px solid #409eff;
  }

  &:focus {
   border: 0.5px solid #409eff;
  }
`;

const CommonCheckBox = forwardRef<HTMLInputElement, CommonCheckBoxProps>(({
  checked, 
  onChange, 
  className = '', 
  id = '',
  ...props 
}, ref) => {
  return (
    <>
      <StyledInput  
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange} 
        className={`outline-none ${checked ? 'bg-[#EE887A]' : ''} ${className}`} 
        ref={ref}
        {...props} 
      />
    </>
  );
});

export { CommonCheckBox };
