import { CommonLayout } from "../layout/CommonLayout"
import { UserName } from "../components/UserName";
import { InputTime2line } from "../components/InputTime2line";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const userList = [
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

export const InputMedicines = () => {
  return (
    <CommonLayout>
      <div className="bl_inputWrapper">
        {userList.map((user, index) => (
          <div className={index === userList.length - 1 ? 'hp_mgnB40' : ''}>
            <UserName
              roomNumber={user.roomNumber}
              userName={user.userName}
              userPhoto={user.userPhoto}
            />

            <div className="bl_narrow">
              <div className="un_medicine bl_label__flex bl_label__flexStart">
                <p className="bl_label__title el_txt__size24 el_txt__whiteSpace">服薬</p>

                <div>
                  <InputTime2line
                    time="朝"
                    divClass="hp_mgnB24"
                  />

                  <InputTime2line
                    time="昼"
                    divClass="hp_mgnB24"
                  />

                  <InputTime2line
                    time="夜"
                    divClass=""
                  />
                </div>
              </div>
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
