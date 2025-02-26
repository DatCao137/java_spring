export const PlusButton = ({onClick}) => {
  return (
    <div className="bl_btnWrapper__right">
      <button
        type="button"
        className="el_btnSquare el_btnSquare__plus el_btn__blue"
        onClick={onClick}
      >
        追加
      </button>
    </div>
  );
};
