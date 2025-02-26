import { useState, useRef, useLayoutEffect } from 'react';

export const ResizeTextarea = ({ divClass, value, onChange, closeButton, onDelete }) => {
  const textareaRef = useRef(null);
  const [internalValue, setInternalValue] = useState(value || ""); // 内部ステート

  // 外部 `value` が変更された場合に内部ステートを更新
  useLayoutEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  const currentValue = value !== undefined ? value : internalValue; // 優先順位: 外部 `value` → 内部ステート

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  };

  useLayoutEffect(() => {
    adjustHeight();
  }, [currentValue]);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resizeObserver = new ResizeObserver(() => {
      adjustHeight();
    });

    resizeObserver.observe(textarea.parentElement); // 親要素を監視
    return () => resizeObserver.disconnect(); // クリーンアップ
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(e); // 外部の `onChange` を呼び出し
    } else {
      setInternalValue(newValue); // 内部ステートを更新
    }
  };

  return (
    <div className={divClass}>
      <label className="el_textareaWrapper">
        <textarea
          ref={textareaRef}
          value={currentValue}
          rows="1"
          onChange={handleChange}
          className="el_textarea"
        ></textarea>
        {closeButton === true ? (
          <button
            type="button"
            className="el_deleteBtn"
            onClick={onDelete}
          ></button>
        ) : ''}
      </label>
      <span className="el_errorTxt"></span>
    </div>
  );
};
