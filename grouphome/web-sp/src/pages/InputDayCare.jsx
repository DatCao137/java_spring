import { useState } from "react";
import { CommonLayout } from "../layout/CommonLayout"
import { UserName } from "../components/UserName";
import { InputRadio } from "../components/InputRadio";
import { InputWidthFull } from "../components/InputWidthFull";
import { InputTime } from "../components/InputTime";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const initialUserList = [
  { roomNumber: "1A", userName: "清水 洋輔", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1B", userName: "星 和宏", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1C", userName: "磯貝 剛", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1D", userName: "相川 敦志", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1E", userName: "横田 宏太", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1F", userName: "鈴木 健太郎", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1G", userName: "寺岡 勇樹", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1H", userName: "市野 衛", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1I", userName: "杉山 有司", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
  { roomNumber: "1J", userName: "小泉 仁史", userPhoto: '/img/no-image.png', selectedRadio: 2, initialWork1: "09", initialWork2: "00" , lastDayWork1: "09", lastDayWork2: "00", initialHome1: "16", initialHome2: "00" , lastDayHome1: "16", lastDayHome2: "15" },
];

export const InputDayCare = () => {
  const [userList, setUserList] = useState(initialUserList);

  const handleRadioChange = (index, newSelectedRadio) => {
    const updatedUserList = userList.map((user, i) =>
      i === index ? { ...user, selectedRadio: newSelectedRadio } : user
    );
    setUserList(updatedUserList);
  };

  const options = ["通所/通勤", "欠席/欠勤", "予定なし"];

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
              <div className="un_dayCare bl_label__flex bl_label__flexStart">
                <p className="el_txt__size24 hp_pdgR20">通所等予定</p>
                <InputRadio
                  divClass="hp_mgnB16"
                  radioName=""
                  options={options}
                  selectedRadio={user.selectedRadio}
                  onRadioChange={(newSelectedRadio) => handleRadioChange(index, newSelectedRadio)}
                />
              </div>

              <div className="bl_label__flex bl_label__flexStart hp_mgnB24">
                <p className="bl_label__title el_txt__size24 el_txt__whiteSpace">外出先</p>
                <InputWidthFull
                  divClass=""
                  inputType="text"
                  inputName=""
                  inputClass="el_txt__size24"
                />
              </div>

              <InputTime
                divClass="hp_mgnB12"
                spanText="出勤"
                isButton={true}
                divClassButton="hp_mgnB24"
                valueInitial1={user.initialWork1}
                valueInitial2={user.initialWork2}
                valueLastDay1={user.lastDayWork1}
                valueLastDay2={user.lastDayWork2}
              />

              <InputTime
                divClass="hp_mgnB12"
                spanText="帰宅"
                isButton={true}
                valueInitial1={user.initialHome1}
                valueInitial2={user.initialHome2}
                valueLastDay1={user.lastDayHome1}
                valueLastDay2={user.lastDayHome2}
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
