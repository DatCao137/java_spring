export const InputRadio = ({divClass, radioName, options, selectedRadio, onRadioChange}) => {
  return (
    <div className={`el_txt__size24 ${divClass || ''}`}>
      {options.map((radioLabel, index) => (
        <label key={index} className="el_input__radio">
          <input
            type="radio"
            name={radioName}
            value={radioLabel}
            checked={selectedRadio === index}
            onChange={() => onRadioChange(index)}
          />
          {radioLabel}
        </label>
      ))}
      <span className="el_errorTxt"></span>
    </div>
  );
};
