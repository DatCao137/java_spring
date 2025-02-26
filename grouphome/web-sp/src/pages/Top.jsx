import { useEffect, useState } from "react";
import { CommonLayout } from "../layout/CommonLayout"
import { LinkButton } from '../components/LinkButton';
import { useLocation } from "react-router-dom";


const workList = [
  { buttonLink: "/inputWakeTime", buttonText: "起床" },
  { buttonLink: "/inputVitals", buttonText: "バイタル" },
  { buttonLink: "/inputMealTop", buttonText: "食事" },
  { buttonLink: "/inputMedicines", buttonText: "服薬" },
  { buttonLink: "/inputDayCare", buttonText: "通所" },
  { buttonLink: "/inputBathing", buttonText: "入浴" },
  { buttonLink: "/inputBedtime", buttonText: "就寝" },
  { buttonLink: "/inputDaySupport", buttonText: "日中支援" },
  { buttonLink: "/inputDayState", buttonText: "1日の様子" },
  { buttonLink: "/inputHospitalHome", buttonText: "入院/帰省" },
  { buttonLink: "/inputRemarks", buttonText: "備考" },
  { buttonLink: "/inputNightPatrol", buttonText: "夜間巡回" },
];

const userList = [
  { buttonLink: "/inputByUser", buttonText1: "1A", buttonText2: " 清水 洋輔", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1B", buttonText2: " 星 和宏", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1C", buttonText2: " 磯貝 剛", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1D", buttonText2: " 相川 敦志", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1E", buttonText2: " 横田 宏太", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1F", buttonText2: " 鈴木 健太郎", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1G", buttonText2: " 寺岡 勇樹", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1H", buttonText2: " 市野 衛", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1I", buttonText2: " 杉山 有司", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputByUser", buttonText1: "1J", buttonText2: " 小泉 仁史", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputRemarks?user", buttonText2: "備考", userPhoto: "" },
  { buttonLink: "/inputNightPatrol?user", buttonText2: "夜間巡回", userPhoto: "" },
];

export const Top = () => {
  const [ content, setContent ] = useState("WtoP");
  const location = useLocation();

  const changeContent = () => {
    setContent((prevContent) =>
      prevContent === "WtoP" ? "PtoW" : "WtoP"
    );
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("user")) {
      setContent("PtoW");
    } else {
      setContent("WtoP");
    }
  }, [location]);

  return (
    <CommonLayout>
      <button className="bl_headerBtn" onClick={ changeContent }>
        { content === "WtoP" ? (
          <img src="/img/icon_switchWtoP.svg" alt="利用者ごとの入力に切り替える" />
        ) : (
          <img src="/img/icon_switchPtoW.svg" alt="業務ごとの入力に切り替える" />
        )}
      </button>

      <div className="bl_ghdWrapper">
        <div className="bl_ghd">
          <h2 className="bl_title__common">事業所</h2>
          <div className="bl_narrow el_txt__size24">
            <p>AMANEKU千葉</p>
            <p>大木戸町B棟1階</p>
          </div>
        </div>

        <div className="bl_ghd">
          <h2 className="bl_title__common">日付</h2>
          <div className="bl_narrow el_txt__size24 hp_mgnB32">
            <p>2024/07/26（金）</p>
          </div>
        </div>

        <LinkButton
          buttonLink="/inputGroupHomeDate"
          buttonText="事業所・日付を変更"
        />
      </div>

      <hr className="el_hr__mgn36" />

      <h2 className="bl_title__common hp_mgnB24">利用者様情報記録</h2>

      <div className="bl_btnWrapper__top">
        { content === "WtoP" ? (
          <>
            { workList.map(( button, index ) => (
              <LinkButton
                key={index}
                buttonLink={button.buttonLink}
                buttonText={button.buttonText}
              />
            ))}
          </>
        ) : (
          <>
            { userList.map(( button, index ) => (
              <LinkButton
                key={index}
                buttonLink={button.buttonLink}
                buttonText={<><span>{button.buttonText1}</span> {button.buttonText2}</>}
                userPhoto={button.userPhoto}
              />
            ))}
          </>
        )}
      </div>

      <hr className="el_hr__mgn36" />

      <h2 className="bl_title__common hp_mgnB24">初期データ・テンプレート入力</h2>

      <div className="bl_btnWrapper__top">
        <LinkButton
          buttonLink="/inputUserInitialDataTop"
          buttonText="利用者様初期データ"
        />

        <LinkButton
          buttonLink="/inputDayStateTemplate"
          buttonText="1日の様子テンプレート"
        />
      </div>
    </CommonLayout>
  )
}
