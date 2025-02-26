type inputParams = {
  checked: boolean;
  label: string;
  className?: string;
  inputClassName?: string;
};

export const InputCheckbox = (param: inputParams) => {
  const cursorClass = param.checked
    ? 'hover:cursor-pointer'
    : 'hover:cursor-not-allowed';
  return (
    <span className={`${cursorClass} ${param?.className || ''}`}>
      <input
        className={`mr-1 ${cursorClass} ${param?.inputClassName || ''}`}
        type="checkbox"
        checked={param.checked}
        disabled={!param.checked}
        readOnly
      />
      {param.label}
    </span>
  );
};
