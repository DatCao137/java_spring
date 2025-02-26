import React, { useState } from "react";

export const InputWidth100px = ({divClass, spanText, inputName1, inputValue1, inputUnit, isValue2, inputName2, inputValue2}) => {

  const [value1, setValue1] = useState(inputValue1);
  const [value2, setValue2] = useState(inputValue2);

  return (
    <div className={`el_txt__size24 ${divClass || ''}`}>
      <label className="bl_label__flex">
        <span className="bl_label__title">{spanText}</span>
        <input
          type="text"
          name={inputName1}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          className="el_input el_input__w100px el_txt__center"
        />

        {inputUnit}

        {isValue2 ? (
          <input
            type="text"
            name={inputName2}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className="el_input el_input__w100px el_txt__center"
          />
        ) : null}
      </label>
      <span className="el_errorTxt"></span>
    </div>
  );
};
