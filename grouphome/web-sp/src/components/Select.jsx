export const Select = ({divClass, selectName, selectClass, children}) => {
  return (
    <div className={ divClass || '' }>
      <div className="bl_select">
        <select
          className={selectClass}
          name={selectName}
        >
          {children}
        </select>
      </div>
      <span className="el_errorTxt"></span>
    </div>
  );
};
