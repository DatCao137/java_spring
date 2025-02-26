import React from 'react';
import styled from 'styled-components';

interface CommonCheckBoxRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  value: any | null;
  onChange: (e: { target: { name: string; value: any | null } }) => void;
  options?: { label: string; value: any }[];
  className?: string;
  title?: string;
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledLabel = styled.label`
  font-size: small;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledInput = styled.input`
  appearance: none;
  margin-right: 5px;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &:checked::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: #ee887a;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    border-color: #409eff;
  }

  &:focus {
    border-color: #409eff;
  }
`;

const StyleContainerLabel = styled.label`
  color: rgb(103 103 103);
  margin-right: 5px;
  font-size: 12px;
`;

export const CommonCheckBoxRadio = React.forwardRef<HTMLInputElement, CommonCheckBoxRadioProps>(({
  name = '',
  value = null,
  onChange,
  options = [
    { label: '有', value: true },
    { label: '無', value: false },
  ],
  className = '',
  title = '',
  ...props
}, ref) => {
  const handleChange = (selectedValue: any | null) => {
    onChange({
      target: {
        name,
        value: value === selectedValue ? null : selectedValue,
      },
    });
  };

  return (
    <>
      {title && <StyleContainerLabel>{title}</StyleContainerLabel>}
      <StyledContainer ref={ref} className={className}>
        {options.map((option) => (
          <StyledLabel key={String(option.value)}>
            <StyledInput
              type="checkbox"
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              {...props}
            />
            {option.label}
          </StyledLabel>
        ))}
      </StyledContainer>
    </>

  );
}
);

CommonCheckBoxRadio.displayName = 'CommonCheckBoxRadio';