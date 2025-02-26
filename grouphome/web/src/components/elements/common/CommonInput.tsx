import React from 'react';
import styled from 'styled-components';

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type?: string;
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  title?: string;
  maxLength?: number;
}

const StyledInput = styled.input`
  border: 0.5px solid #aeaeae;
  border-radius: 5px;
  height: 25px;
  padding-left: 10px;
  font-size: 14px;
  color: rgb(46 46 46);

  &:hover {
    border: 0.5px solid #409eff;
  }

  &:focus {
    border: 0.5px solid #409eff;
  }
`;

const StyledTextarea = styled.textarea`
  border: 0.5px solid #aeaeae;
  border-radius: 5px;
  height: auto;
  width: 100%;
  padding: 5px 10px;
  font-size: 14px;
  color: rgb(46 46 46);
  resize: vertical;
  // overflow: scroll;

  &:hover {
    border: 0.5px solid #409eff;
  }

  &:focus {
    border: 0.5px solid #409eff;
  }
`;

const StyledLabel = styled.label`
  color: rgb(103 103 103);
  margin-right: 5px;
  font-size: 12px;
`;

const CommonInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, CommonInputProps>(
  (
    {
      type = 'text',
      value,
      onChange,
      placeholder = '',
      className = '',
      id = '',
      title = '',
      maxLength,
      ...props
    },
    ref
  ) => {
    const inputValue = value ?? '';

    if (type === 'textarea') {
      return (
        <>
          {title !== '' && <StyledLabel htmlFor={id}>{title}</StyledLabel>}
          <StyledTextarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            value={inputValue}
            onChange={onChange}
            placeholder={placeholder}
            className={`outline-none ${className}`}
            maxLength={maxLength}
            {...props}
          />
        </>
      );
    }

    return (
      <>
        {title !== '' && <StyledLabel htmlFor={id}>{title}</StyledLabel>}
        <StyledInput
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          type={type}
          value={inputValue}
          onChange={onChange}
          placeholder={placeholder}
          className={`outline-none ${className}`}
          maxLength={maxLength}
          {...props}
        />
      </>
    );
  }
);

export { CommonInput };