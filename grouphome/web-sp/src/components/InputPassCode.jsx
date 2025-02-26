import React, { useState, useRef } from 'react';

export const InputPassCode = ({divClass, spanText}) => {
  const [values, setValues] = useState(['', '', '', '']); // 4つの入力フィールドの状態
  const inputsRef = useRef([]); // 各 input 要素への参照

  const handleChange = (e, index) => {
    const value = e.target.value;

    // 数字または空文字列を許可する
    if (/^\d$/.test(value) || value === '') {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // すべての入力が完了したら、onCompleteコールバックを呼び出す
      if (newValues.every((v) => v !== '')) {
        onComplete(newValues.join(''));
      }

      // 次のフィールドにフォーカスを移動
      if (index < 3 && value !== '') {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && values[index] === '') {
      if (index > 0) {
        inputsRef.current[index - 1].focus(); // 前のフィールドにフォーカス
      }
    }
  };

  return (
    <div className={divClass || ''}>
      <label className="el_input__passcode">
        <span className="el_txt__bold">{spanText}</span>
        <div>
          {values.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => inputsRef.current[index] = el}  // refを設定
            />
          ))}
        </div>
      </label>
      <span className="el_errorTxt"></span>
    </div>
  );
};
