import { useState } from "react";
import { CommonLayout } from "../layout/CommonLayout"
import { UserName } from "../components/UserName";
import { InputCheckBox } from "../components/InputCheckBox";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const initialUserList =  [
  { roomNumber: "1A", userName: "清水 洋輔", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1B", userName: "星 和宏", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1C", userName: "磯貝 剛", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1D", userName: "相川 敦志", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1E", userName: "横田 宏太", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1F", userName: "鈴木 健太郎", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1G", userName: "寺岡 勇樹", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1H", userName: "市野 衛", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1I", userName: "杉山 有司", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
  { roomNumber: "1J", userName: "小泉 仁史", userPhoto: '/img/no-image.png', selectedCheckBox: [false, false, false, false, false, false] },
];

export const InputHospitalHome = () => {
  const [userList, setUserList] = useState(initialUserList);

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

  const options = ["入院初日", "入院中", "退院日", "帰省初日", "帰省中", "帰ホーム日"];

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
              <InputCheckBox
                checkBoxName=""
                options={options}
                selectedCheckBox={user.selectedCheckBox}
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
  )
}
