import { useState } from "react";
import { CommonLayout } from "../layout/CommonLayout"
import { InputTime } from "../components/InputTime"
import { BackButton } from "../components/BackButton"
import { SubmitButton } from "../components/SubmitButton"

const user = { roomNumber: "1A", userName: "清水 洋輔", userPhoto: '/img/no-image.png' };

const timeList = [
  { spanText: "起床", inputName1: "", inputName2: "" },
  { spanText: "出勤", inputName1: "", inputName2: "" },
  { spanText: "帰宅", inputName1: "", inputName2: "" },
  { spanText: "入浴", inputName1: "", inputName2: "" },
  { spanText: "就寝", inputName1: "", inputName2: "" },
];

export const InputUserInitialDataDetail = () => {
  const [userPhoto, setUserPhoto] = useState(user.userPhoto);

  const uploadPhoto = () => {
    document.getElementById('photoUploadInput').click();
  };

  const changePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setUserPhoto(newPhotoUrl);
    }
  };

  return (
    <CommonLayout>
      <div className="bl_narrow__tablet">
        <h2 className="bl_title__name">{user.roomNumber} {user.userName}</h2>

        <div className="bl_narrow">
          <div className="bl_imageUpload hp_mgnB32">
            <div className="bl_imageWrapper">
              <img src={userPhoto} alt="" />
            </div>
            <button
              type="button"
              className="el_btnSquare el_btn__blue"
              onClick={uploadPhoto}
            >
              写真を選択
            </button>
            <input
              type="file"
              id="photoUploadInput"
              onChange={changePhoto}
            />
          </div>

          { timeList.map(( time, index ) => (
            <InputTime
              key={index}
              divClass="hp_mgnB16"
              spanText={time.spanText}
              inputName1={time.inputName1}
              inputName2={time.inputName2}
            />
          ))}
        </div>
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
