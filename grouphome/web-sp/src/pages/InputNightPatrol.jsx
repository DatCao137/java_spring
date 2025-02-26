import { useState } from "react";
import { CommonLayout } from "../layout/CommonLayout";
import { InputTime } from "../components/InputTime";
import { InputRadio } from "../components/InputRadio";
import { ResizeTextarea } from "../components/ResizeTextarea";
import { InputCheckBox } from "../components/InputCheckBox";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";
import { useLocation } from "react-router-dom";

const initialTimeList = [
  { value: "1時巡回", selectedRadio: 0 },
  { value: "3時巡回", selectedRadio: 0 },
  { value: "4時巡回", selectedRadio: 0 },
];

export const InputNightPatrol = () => {
  const [timeList, setTimeList] = useState(initialTimeList);
  const [specialReport, setSpecialReport] = useState(0);
  const [reportText, setReportText] = useState("");
  const [isWaterReplaced, setIsWaterReplaced] = useState(false);

  const handleRadioChange = (index, newSelectedRadio) => {
    const updatedTimeList = timeList.map((time, i) =>
      i === index ? { ...time, selectedRadio: newSelectedRadio } : time
    );
    setTimeList(updatedTimeList);
  };

  const handleSpecialReportChange = (newSelectedRadio) => {
    setSpecialReport(newSelectedRadio);
    if (newSelectedRadio === 0) {
      setReportText(""); // 「異常なし」を選択した場合、テキストをリセット
    }
  };

  const options = ["異常なし", "報告有り"];
  const option = ["入れ替え"];

  const param = useLocation().search;

  return (
    <CommonLayout>
      <div className="bl_inputWrapper__2column">
        <div className="un_nightPatrol">
          <h2 className="bl_title__common">夜間巡回</h2>

          {timeList.map((time, index) => (
            <div className={`hp_pdgL16 ${index === timeList.length - 1 ? '' : 'hp_mgnB32'}`} key={index}>
              <InputTime divClass="hp_mgnB12" spanText={time.value} />

              <InputRadio
                radioName={`patrol-${index}`}
                options={options}
                selectedRadio={time.selectedRadio}
                onRadioChange={(newSelectedRadio) => handleRadioChange(index, newSelectedRadio)}
              />
            </div>
          ))}

          <hr className="el_hr__mgn28" />
        </div>

        <div className="un_nightPatrol">
          <h2 className="bl_title__common">特記事項報告</h2>

          <div className="bl_narrow hp_mgnB32">
            <InputRadio
              divClass="hp_mgnB8"
              radioName="specialReport"
              options={options}
              selectedRadio={specialReport}
              onRadioChange={handleSpecialReportChange}
            />
            {specialReport === 1 && (
              <ResizeTextarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
              />
            )}
          </div>

          <h2 className="bl_title__common">非常用水入れ替え</h2>

          <div className="bl_narrow">
            <InputCheckBox
              divClass="hp_mgnB40"
              checkBoxName=""
              options={option}
              selectedCheckBox={isWaterReplaced}
              onCheckBoxChange={() => setIsWaterReplaced(!isWaterReplaced)}
            />
          </div>
        </div>
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
  );
};
