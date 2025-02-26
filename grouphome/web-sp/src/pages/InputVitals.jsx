import { CommonLayout } from "../layout/CommonLayout"
import { UserName } from "../components/UserName";
import { InputWidth150px } from "../components/InputWidth150px";
import { InputWidth100px } from "../components/InputWidth100px";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const userList = [
  { roomNumber: "1A", userName: "清水 洋輔", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1B", userName: "星 和宏", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1C", userName: "磯貝 剛", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1D", userName: "相川 敦志", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1E", userName: "横田 宏太", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1F", userName: "鈴木 健太郎", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1G", userName: "寺岡 勇樹", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1H", userName: "市野 衛", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1I", userName: "杉山 有司", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
  { roomNumber: "1J", userName: "小泉 仁史", userPhoto: '/img/no-image.png' , btMorning: "36.1", btNoon: "36.5", btEvening: "36.2", bpTop: "120", bpBottom: "75", pulse: "70", spo2: "98" },
];

export const InputVitals = () => {
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

            <div className="bl_narrow un_vital el_txt__whiteSpace">
              <div className="bl_label__flex bl_label__flexStart">
                <p className="bl_label__title el_txt__size24">体温</p>

                <div>
                  <InputWidth150px
                    divClass="hp_mgnB12"
                    spanText="朝"
                    inputName=""
                    inputValue={user.btMorning}
                    inputUnit="℃"
                  />

                  <InputWidth150px
                    divClass="hp_mgnB12"
                    spanText="昼"
                    inputName=""
                    inputValue={user.btNoon}
                    inputUnit="℃"
                  />

                  <InputWidth150px
                    divClass="hp_mgnB20"
                    spanText="夕"
                    inputName=""
                    inputValue={user.btEvening}
                    inputUnit="℃"
                  />
                </div>
              </div>

              <InputWidth100px
                divClass="hp_mgnB12"
                spanText="血圧"
                inputName1=""
                inputValue1={user.bpTop}
                inputUnit="/"
                isValue2={true}
                inputName2=""
                inputValue2={user.bpBottom}
              />

              <InputWidth100px
                divClass="hp_mgnB12"
                spanText="脈拍"
                inputName1=""
                inputValue1={user.pulse}
                inputUnit=""
              />

              <InputWidth100px
                divClass=""
                spanText="血中酸素濃度"
                inputName1=""
                inputValue1={user.spo2}
                inputUnit="％"
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
