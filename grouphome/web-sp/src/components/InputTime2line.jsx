import { InputTime } from "./InputTime"

export const InputTime2line = ({time, divClass}) => {
  return (
    <div className="bl_label__flex bl_label__flexStart">
      <p className="bl_label__title el_txt__size24 el_txt__whiteSpace">{time}</p>
      <div className="bl_flex__medicine">
        <div className="bl_label__flex hp_mgnB12">
          <span>①</span>
          <InputTime/>
        </div>
        <div className={`bl_label__flex ${divClass || ''}`}>
          <span>②</span>
          <InputTime/>
        </div>
      </div>
    </div>
  )
}
