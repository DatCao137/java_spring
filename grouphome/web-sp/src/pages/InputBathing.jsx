import { CommonLayout } from "../layout/CommonLayout"
import { UserName } from "../components/UserName";
import { InputTime } from "../components/InputTime";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const userList = [
  { roomNumber: "1A", userName: "清水 洋輔", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1B", userName: "星 和宏", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1C", userName: "磯貝 剛", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1D", userName: "相川 敦志", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1E", userName: "横田 宏太", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1F", userName: "鈴木 健太郎", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1G", userName: "寺岡 勇樹", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1H", userName: "市野 衛", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1I", userName: "杉山 有司", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
  { roomNumber: "1J", userName: "小泉 仁史", userPhoto: '/img/no-image.png', initial1: "20", initial2: "00" , lastDay1: "20", lastDay2: "30" },
];

export const InputBathing = () => {
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
              <InputTime
                key={index}
                divClass="hp_mgnB12"
                spanText="入浴"
                isButton={true}
                valueInitial1={user.initial1}
                valueInitial2={user.initial2}
                valueLastDay1={user.lastDay1}
                valueLastDay2={user.lastDay2}
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
