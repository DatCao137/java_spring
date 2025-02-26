import { CommonLayout } from "../layout/CommonLayout"
import { UserName } from "../components/UserName";
import { InputTemplate } from "../components/InputTemplate";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const userList =  [
  { roomNumber: "1A", userName: "清水 洋輔", userPhoto: '/img/no-image.png' },
  { roomNumber: "1B", userName: "星 和宏", userPhoto: '/img/no-image.png' },
  { roomNumber: "1C", userName: "磯貝 剛", userPhoto: '/img/no-image.png' },
  { roomNumber: "1D", userName: "相川 敦志", userPhoto: '/img/no-image.png' },
  { roomNumber: "1E", userName: "横田 宏太", userPhoto: '/img/no-image.png' },
  { roomNumber: "1F", userName: "鈴木 健太郎", userPhoto: '/img/no-image.png' },
  { roomNumber: "1G", userName: "寺岡 勇樹", userPhoto: '/img/no-image.png' },
  { roomNumber: "1H", userName: "市野 衛", userPhoto: '/img/no-image.png' },
  { roomNumber: "1I", userName: "杉山 有司", userPhoto: '/img/no-image.png' },
  { roomNumber: "1J", userName: "小泉 仁史", userPhoto: '/img/no-image.png' },
];

const morningTemplate = [
  {value: "声掛けにて起床される。"},
  {value: "朝食後は自室で過ごされる。"},
  {value: "朝食後はリビングで過ごされる。"},
];

const noonTemplate = [
  {value: "通所。"},
  {value: "昼食後は自室で過ごされる。"},
  {value: "昼食後はリビングで過ごされる。"},
];

const eveningTemplate = [
  {value: "入浴後に夕食を召し上がる。"},
  {value: "入浴を声掛けするが、入られなかった。"},
];

export const InputDayState = () => {
  return (
    <CommonLayout>
      <div className="bl_inputWrapper">
        {userList.map((user, index) => (
          <div className={index === userList.length - 1 ? 'hp_mgnB40' : null}>
            <UserName
              roomNumber={user.roomNumber}
              userName={user.userName}
              userPhoto={user.userPhoto}
            />

            <div className="bl_narrow">
              <p className="el_txt__size24 hp_mgnB12">1日の様子</p>

              <InputTemplate
                divClass="hp_mgnB16"
                timeText="朝"
                templateText={morningTemplate}
              />

              <InputTemplate
                divClass="hp_mgnB16"
                timeText="昼"
                templateText={noonTemplate}
              />

              <InputTemplate
                timeText="夜"
                templateText={eveningTemplate}
              />
            </div>

            {index === userList.length - 1 ? '' : <hr className="el_hr__mgn28" />}
          </div>
        ))}
      </div>

      <div className="bl_btnWrapper__bottom">
        <SubmitButton
          buttonText="保存"
        />

        <BackButton
          buttonLink="/top"
          buttonText="戻る"
        />
      </div>
    </CommonLayout>
  )
}
