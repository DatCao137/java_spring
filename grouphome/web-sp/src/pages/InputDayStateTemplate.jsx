import { useState, useRef, useEffect } from "react";
import { CommonLayout } from "../layout/CommonLayout";
import { ResizeTextarea } from "../components/ResizeTextarea";
import { PlusButton } from "../components/PlusButton";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const ListSection = ({ title, list, addItem, deleteItem, handleChange }) => (
  <div className="hp_mgnB24">
    <p className="el_txt__size24 hp_mgnB12">{title}</p>
    {list.map((item) => (
      <ResizeTextarea
        key={item.id}
        divClass="hp_mgnB12"
        value={item.value}
        closeButton={true}
        onChange={(e) => handleChange(item.id, e.target.value)} // 変更処理を呼び出す
        onDelete={() => deleteItem(item.id)}
      />
    ))}
    <PlusButton onClick={addItem} />
  </div>
);

export const InputDayStateTemplate = () => {
  const [morningList, setMorningList] = useState([
    { id: 1, value: "声掛けにて起床される。" },
    { id: 2, value: "朝食後は自室で過ごされる。" },
    { id: 3, value: "朝食後はリビングで過ごされる。" },
  ]);

  const [noonList, setNoonList] = useState([
    { id: 1, value: "通所。" },
    { id: 2, value: "昼食後は自室で過ごされる。" },
    { id: 3, value: "昼食後はリビングで過ごされる。" },
  ]);

  const [eveningList, setEveningList] = useState([
    { id: 1, value: "入浴後に夕食を召し上がる。" },
    { id: 2, value: "入浴を声掛けするが、入られなかった。" },
  ]);

  const nextMorningId = useRef(morningList.length + 1);
  const nextNoonId = useRef(noonList.length + 1);
  const nextEveningId = useRef(eveningList.length + 1);

  // 各リストを更新するhandleChange関数
  const handleMorningChange = (id, newValue) => {
    setMorningList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  const handleNoonChange = (id, newValue) => {
    setNoonList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  const handleEveningChange = (id, newValue) => {
    setEveningList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  // リストに新しい項目を追加する関数
  const addMorningItem = () => {
    setMorningList([...morningList, { id: nextMorningId.current, value: "" }]);
    nextMorningId.current += 1;
  };

  const addNoonItem = () => {
    setNoonList([...noonList, { id: nextNoonId.current, value: "" }]);
    nextNoonId.current += 1;
  };

  const addEveningItem = () => {
    setEveningList([...eveningList, { id: nextEveningId.current, value: "" }]);
    nextEveningId.current += 1;
  };

  // リストの項目を削除する関数
  const deleteMorningItem = (id) => {
    setMorningList(morningList.filter((item) => item.id !== id));
  };

  const deleteNoonItem = (id) => {
    setNoonList(noonList.filter((item) => item.id !== id));
  };

  const deleteEveningItem = (id) => {
    setEveningList(eveningList.filter((item) => item.id !== id));
  };

  return (
    <CommonLayout>
      <div className="bl_narrow__tablet">
        <h2 className="bl_title__common">1日の様子テンプレート</h2>

        <ListSection
          title="朝"
          list={morningList}
          addItem={() =>
            setMorningList([
              ...morningList,
              { id: nextMorningId.current++, value: "" },
            ])
          }
          deleteItem={(id) =>
            setMorningList(morningList.filter((item) => item.id !== id))
          }
          handleChange={handleMorningChange}
        />

        <ListSection
          title="昼"
          list={noonList}
          addItem={() =>
            setNoonList([...noonList, { id: nextNoonId.current++, value: "" }])
          }
          deleteItem={(id) =>
            setNoonList(noonList.filter((item) => item.id !== id))
          }
          handleChange={handleNoonChange}
        />

        <ListSection
          title="夜"
          list={eveningList}
          addItem={() =>
            setEveningList([
              ...eveningList,
              { id: nextEveningId.current++, value: "" },
            ])
          }
          deleteItem={(id) =>
            setEveningList(eveningList.filter((item) => item.id !== id))
          }
          handleChange={handleEveningChange}
        />
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
