import { useState } from "react";
import { CommonLayout } from "../layout/CommonLayout";
import { ResizeTextarea } from "../components/ResizeTextarea";
import { LinkButton } from "../components/LinkButton";
import { BackButton } from "../components/BackButton";

const initialMealList = [
  { title: "朝", menu: "ラタトゥイユ\n白いんげん豆とツナサラダ" },
  { title: "昼", menu: "チキンカツ\nさつまいもの彩り煮\nほうれん草とピーナツ和え" },
  { title: "夕", menu: "豚肉の塩ダレ煮\nかにかまオムレツ\n大根なます" },
];

export const InputMealTop = () => {
  const [mealList, setMealList] = useState(initialMealList);

  const handleChange = (index, newValue) => {
    setMealList((prevMealList) => {
      const updatedMealList = [...prevMealList];
      updatedMealList[index] = { ...updatedMealList[index], menu: newValue };
      return updatedMealList;
    });
  };

  return (
    <CommonLayout>
      <h2 className="bl_title__common">本日の献立</h2>

      <div className="bl_inputWrapper__top">
        {mealList.map((meal, index) => (
          <div key={index}>
            <p className="el_txt__size24 hp_mgnB12">{meal.title}</p>
            <ResizeTextarea
              divClass={index === mealList.length - 1 ? "hp_mgnB40" : "hp_mgnB24"}
              value={meal.menu}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <h2 className="bl_title__common">食事入力</h2>

      <div className="bl_btnWrapper__top hp_mgnB60">
        <LinkButton buttonLink="/inputMealDetails" buttonText="朝食" />
        <LinkButton buttonLink="/inputMealDetails" buttonText="昼食" />
        <LinkButton buttonLink="/inputMealDetails" buttonText="夕食" />
      </div>

      <div className="bl_btnWrapper__bottom">
        <BackButton buttonLink="/top" buttonText="戻る" />
      </div>
    </CommonLayout>
  );
};
