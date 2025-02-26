import React, { useState } from "react";

export const InputTime = ({divClass, spanText, inputName1, inputValue1, inputName2, inputValue2, isButton, divClassButton, valueInitial1, valueInitial2, valueLastDay1, valueLastDay2}) => {
  const [value1, setValue1] = useState(inputValue1);
  const [value2, setValue2] = useState(inputValue2);

  return (
    <>
      <div className={`el_txt__size24 ${divClass}`}>
        <label className="bl_label__flex">
          {spanText ? <span className="bl_label__title">{spanText}</span> : ''}
          <input
            type="text"
            maxlength="2"
            inputmode="numeric"
            name={inputName1}
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="--"
            className="el_input el_input__w80px el_txt__center"
          />
          ：
          <input
            type="text"
            maxlength="2"
            inputmode="numeric"
            name={inputName2}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="--"
            className="el_input el_input__w80px el_txt__center"
          />
        </label>
        <span className="el_errorTxt"></span>
      </div>

      {isButton ? (
        <div className={`bl_btnWrapper__flex ${divClassButton || ''}`}>
          <button
            type="button"
            name=""
            value=""
            className="el_btnSquare el_btn__blue"
            onClick={() => {
              setValue1(valueInitial1);
              setValue2(valueInitial2);
            }}
          >
            初期 {valueInitial1}:{valueInitial2}
          </button>
    
          <button
            type="button"
            name=""
            value=""
            className="el_btnSquare el_btn__red"
            onClick={() => {
              setValue1(valueLastDay1);
              setValue2(valueLastDay2);
            }}
          >
            前日 {valueLastDay1}:{valueLastDay2}
          </button>
        </div>
      ) : ''}
    </>
  )
}
