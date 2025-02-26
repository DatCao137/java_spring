import React, { useState } from "react";

export const InputWidth150px = ({divClass, spanText, inputName, inputValue, inputUnit}) => {

  const [value, setValue] = useState(inputValue);

  return (
    <div className={`el_txt__size24 ${divClass || ''}`}>
      <label className="bl_label__flex">
        <span className="bl_label__title">{spanText}</span>
        <input
          type="text"
          name={inputName}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="el_input el_input__w150px el_txt__center"
        />
        {inputUnit}
      </label>
      <span className="el_errorTxt"></span>
    </div>
  );
};
