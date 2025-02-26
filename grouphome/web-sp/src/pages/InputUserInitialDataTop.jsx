import { CommonLayout } from "../layout/CommonLayout";
import { LinkButton } from "../components/LinkButton";
import { BackButton } from "../components/BackButton";

const userList = [
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1A", buttonText2: " 清水 洋輔", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1B", buttonText2: " 星 和宏", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1C", buttonText2: " 磯貝 剛", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1D", buttonText2: " 相川 敦志", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1E", buttonText2: " 横田 宏太", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1F", buttonText2: " 鈴木 健太郎", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1G", buttonText2: " 寺岡 勇樹", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1H", buttonText2: " 市野 衛", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1I", buttonText2: " 杉山 有司", userPhoto: '/img/no-image.png' },
  { buttonLink: "/inputUserInitialDataDetail", buttonText1: "1J", buttonText2: " 小泉 仁史", userPhoto: '/img/no-image.png' },
];

export const InputUserInitialDataTop = () => {
  return (
    <CommonLayout>
      <h2 className="bl_title__common hp_mgnB24">利用者様初期データ</h2>

      <div className="bl_btnWrapper__top hp_mgnB60">
        {userList.map(( button, index ) => (
          <LinkButton
            key={index}
            buttonLink={button.buttonLink}
            buttonText={<><span>{button.buttonText1}</span> {button.buttonText2}</>}
            userPhoto={button.userPhoto}
          />
        ))}
      </div>

      <div className="bl_btnWrapper__bottom">
        <BackButton
          buttonLink="/top"
          buttonText="戻る"
        />
      </div>
    </CommonLayout>
  )
}
