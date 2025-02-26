import { useState } from "react";
import { useLocation } from "react-router-dom"
import { CommonLayout } from "../layout/CommonLayout"
import { ResizeTextarea } from "../components/ResizeTextarea"
import { SubmitButton } from "../components/SubmitButton"
import { BackButton } from "../components/BackButton"

export const InputRemarks = () => {
  const [remarkText, setRemarkText] = useState("");
  const param = useLocation().search;

  return (
    <CommonLayout>
      <div className="bl_narrow__tablet">
        <h2 className="bl_title__common">備考</h2>

        <ResizeTextarea
          divClass="hp_mgnB40 un_remarks"
          value={remarkText}
          onChange={(e) => setRemarkText(e.target.value)}
        />
      </div>

      <div className="bl_btnWrapper__bottom">
        <SubmitButton
          buttonText="保存"
        />

        <BackButton
          buttonLink={`/top${param ? `${param}` : ''}`}
          buttonText="戻る"
        />
      </div>
    </CommonLayout>
  )
}
