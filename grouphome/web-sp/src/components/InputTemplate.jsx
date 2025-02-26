import { useState } from "react";
import { ResizeTextarea } from "./ResizeTextarea";

export const InputTemplate = ({divClass, timeText, templateText}) => {
  const [showTemplate, setShowTemplate] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const onClickShow = () => {
    setShowTemplate((prev) => !prev);
  };

  const onClickInput = (event) => {
    setTextareaValue((prev) => prev + event.target.textContent);
    setShowTemplate(false);
  }

  return (
    <div className={`${divClass || ''}`}>
      <div className="bl_label__flex bl_label__flexStart">
        <p className="bl_label__title el_txt__size24">{timeText}</p>
        <ResizeTextarea
          divClass="hp_mgnB8 el_input__wFull"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
      </div>

      <div className="bl_btnWrapper__right">
        <button
          type="button"
          className="el_btnSquare el_btn__blue"
          onClick={onClickShow}
        >
          テンプレート選択
        </button>

        <ul class={`bl_templateModal ${showTemplate ? 'show' : ''}`}>
          {templateText.map((templateText, index) => (
            <li key={index} onClick={onClickInput}>{templateText.value}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
