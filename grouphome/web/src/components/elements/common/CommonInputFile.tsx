import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { PopupConfirmParams } from '@/components/elements/Common';
import { PopupConfirm } from '@/components/elements/PopupConfirm'

interface CommonInputFileProps {
  value?: any;
  onChange?: (file: File | null) => void;
  className?: string;
  id?: string;
  title?: string;
  accept?: string; // ex: 'image/*'
  maxSize?: number;
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

const StyledLabel = styled.label`
  color: rgb(103 103 103);
  margin-right: 5px;
  font-size: 12px;
`;

const StyledButton = styled.label`
  display: inline-block;
  background-color: hsl(222.2 47.4% 11.2%);
  color: white;
  padding: 2px 0px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  width: 70px;

  &:hover {
    background-color: hsl(150 40% 10%);
  }
`;

const CommonInputFile = forwardRef<HTMLInputElement, CommonInputFileProps>(
  (
    {
      value,
      onChange,
      className = '',
      id = '',
      title = '',
      accept,
      maxSize = 5 * 1024 * 1024, // Default 5MB
      ...props
    },
    ref
  ) => {

    const [inputValue, setInputValue] = useState(value?? "");

    const [ confirmParam, setConfirmParam ] = useState<PopupConfirmParams>({
      isOpen: false,
      textConfirm: '',
      message: '',
      isShowCancel: false,
      confirmAction: () => { },
      onClose: () => handleCloseConfirm()
    });

    const handleCloseConfirm = () => {
      setConfirmParam(prevState => ({
        ...prevState, 
        isOpen: false
      }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;

      if (file) {
        const extension = file?.name.split('.').pop()?.toLowerCase() || "";

        if (accept && !accept.includes(extension)) {
          setConfirmParam(prevState => ({
            ...prevState, 
            textConfirm: 'OK',
            isShowCancel: false,
            message: '無効なファイルタイプ。',
            isOpen: true
          }));
    
          return;
        }
  
        if (file.size > maxSize) {
          setConfirmParam(prevState => ({
            ...prevState, 
            textConfirm: 'OK',
            isShowCancel: false,
            message: `ファイルサイズが上限（${maxSize / 1024 / 1024}M）を超えています。`,
            isOpen: true
          }));
    
          return;
        }
        
        setInputValue(file?.name);

        onChange?.(file);
      }else {
        setInputValue("");
        onChange?.(null);
      }
    };

    const handleClearFile = () => {
      setInputValue("");
      if (onChange) {
        onChange(null);
      }
    };

    return (
      <>
        {title !== '' && <StyledLabel>{title}</StyledLabel>}
        <StyledInput
          id="input_file"
          type='file'
          onChange={handleFileChange}
          className={`outline-none `}
          style={{ display: 'none' }}
          accept={accept}
          {...props}
        />
        <div className="w-full" style={{ display: 'inline-flex' }}>
          <div className="md:w-3/4">
            <StyledInput
              ref={ref as React.Ref<HTMLInputElement>}
              id={id}
              type='text'
              className={`outline-none ${className}`}
              value={inputValue}
              readOnly
              {...props}
            />
          </div>
          <div className="md:w-1/4 w-full pl-1">
            <StyledButton htmlFor="input_file">選択</StyledButton>
            <span> </span>
            <StyledButton onClick={() => handleClearFile()}>クリア</StyledButton>
          </div>
        </div>
        <PopupConfirm
          param={confirmParam}
        />
      </>
    );
  }
);

export { CommonInputFile };