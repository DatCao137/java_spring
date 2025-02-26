import { CommonLayout } from "../layout/CommonLayout"
import { SubmitButton } from "../components/SubmitButton"
import { BackButton } from "../components/BackButton";
import { Select } from "../components/Select";
import { InputWidthFull } from "../components/InputWidthFull";

const groupHomeList1 = [
  'AMANEKU千葉',
  'AMANEKU南足柄'
];

const groupHomeList2 = [
  '大木戸町B棟1階',
  '大木戸町B棟2階'
];



export const InputGroupHomeDate = () => {
  return (
    <CommonLayout>
      <div className="bl_narrow__tablet">
        <h2 className="bl_title__common">事業所</h2>

        <Select
          divClass="hp_mgnB16"
          selectName=""
          selectClass="el_txt__size24"
        >
          { groupHomeList1.map((item, index) => (
            <option
              key={index}
              value={item}
            >
              {item}
            </option>
          ))}
        </Select>

        <Select
          divClass=""
          selectName=""
          selectClass="el_txt__size24"
        >
          { groupHomeList2.map((item, index) => (
            <option
              key={index}
              value={item}
            >
              {item}
            </option>
          ))}
        </Select>

        <h2 className="bl_title__common">日付</h2>

        <InputWidthFull
          divClass="hp_mgnB40"
          inputType="date"
          inputName=""
          inputClass="el_txt__size24"
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
  )
}
