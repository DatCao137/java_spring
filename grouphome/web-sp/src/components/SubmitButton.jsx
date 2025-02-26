export const SubmitButton = ({buttonClass, buttonText}) => {
  return (
    <button type="submit" className={`el_btn el_btn__yellow ${buttonClass || ''}`}>
      {buttonText}
    </button>
  );
};
