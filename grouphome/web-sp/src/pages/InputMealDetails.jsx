import { useState } from "react";
import { CommonLayout } from "../layout/CommonLayout";
import { UserName } from "../components/UserName";
import { InputRadio } from "../components/InputRadio";
import { InputWidth100px } from "../components/InputWidth100px";
import { InputCheckBox } from "../components/InputCheckBox";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const initialUserList = [
  { roomNumber: "1A", userName: "清水 洋輔", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1B", userName: "星 和宏", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1C", userName: "磯貝 剛", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1D", userName: "相川 敦志", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1E", userName: "横田 宏太", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1F", userName: "鈴木 健太郎", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1G", userName: "寺岡 勇樹", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1H", userName: "市野 衛", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1I", userName: "杉山 有司", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
  { roomNumber: "1J", userName: "小泉 仁史", userPhoto: '/img/no-image.png', mealTime: "朝食", selectedMeal: 0, mealPercent: 100, refill: "", selectedMealStatus: [false, false, false] },
];

export const InputMealDetails = () => {
  const [userList, setUserList] = useState(initialUserList);

  const handleRadioChange = (index, newSelectedMeal) => {
    const updatedUserList = userList.map((user, i) =>
      i === index ? { ...user, selectedMeal: newSelectedMeal } : user
    );
    setUserList(updatedUserList);
  };

  const handleCheckBoxChange = (index, optionIndex) => {
    const updatedUserList = userList.map((user, i) =>
      i === index
        ? {
            ...user,
            selectedCheckBox: user.selectedCheckBox.map((checked, j) =>
              j === optionIndex ? !checked : checked
            ),
          }
        : user
    );
    setUserList(updatedUserList);
  };

  const optionsMeal = ["○ 全て提供", "1 ごはんのみ", "2 みそ汁のみ", "3 ごはん・みそ汁のみ", "4 おかずのみ", "5 みそ汁のみ抜き", "6 ごはんのみ抜き"];
  const optionsMealStatus = ["前日・当日キャンセル", "ムース", "やわらか"];

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
              <p className="el_txt__size24 hp_mgnB16">{user.mealTime}</p>

              <InputRadio
                divClass="un_meal hp_mgnB16 hp_pdgL16"
                radioName=""
                options={optionsMeal}
                selectedMeal={user.selectedMeal}
                onRadioChange={(newSelectedMeal) => handleRadioChange(index, newSelectedMeal)}
              />

              <InputWidth100px
                divClass="hp_mgnB12 hp_pdgL16"
                spanText="割合"
                inputName1=""
                inputValue1={user.mealPercent}
                inputUnit="％"
              />

              <InputWidth100px
                divClass="hp_mgnB16 hp_pdgL16"
                spanText="有料おかわり"
                inputName1=""
                inputValue1={user.refill}
                inputUnit="回"
              />

              <InputCheckBox
                divClass="hp_pdgL16"
                checkBoxName=""
                options={optionsMealStatus}
                selectedCheckBox={user.selectedMealStatus}
                onCheckBoxChange={(optionIndex) => handleCheckBoxChange(index, optionIndex)}
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
  );
};
