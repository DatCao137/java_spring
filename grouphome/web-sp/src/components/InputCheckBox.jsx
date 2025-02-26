export const InputCheckBox = ({ divClass, checkBoxName, options, selectedCheckBox, onCheckBoxChange }) => {
  return (
    <div className={`el_txt__size24 ${divClass || ''}`}>
      {options.map((checkBoxLabel, index) => (
        <label key={index} className="el_input__checkBox">
          <input
            type="checkbox"
            name={checkBoxName}
            value={checkBoxLabel}
            checked={options.length > 1 ? selectedCheckBox[index] : selectedCheckBox}
            onChange={() => onCheckBoxChange(index)}
          />
          {checkBoxLabel}
        </label>
      ))}
      <span className="el_errorTxt"></span>
    </div>
  );
};
