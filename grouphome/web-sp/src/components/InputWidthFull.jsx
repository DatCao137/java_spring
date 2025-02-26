import React, { useState } from "react";

export const InputWidthFull = ({divClass, spanClass, spanText, inputType, inputName, inputValue, inputClass}) => {

  const [value, setValue] = useState(inputValue);

  return (
    <div className={divClass || ''}>
      <label>
        {spanText ? <span className={spanClass || ''}>{spanText}</span> : null}
        <input
          type={inputType}
          name={inputName}
          value={inputValue}
          onChange={(e) => setValue(e.target.value)}
          className={`el_input el_input__wFull ${inputClass || '' }`}
        />
      </label>
      <span className="el_errorTxt"></span>
    </div>
  );
};
