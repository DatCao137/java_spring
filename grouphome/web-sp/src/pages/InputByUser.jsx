import { useState } from "react";
import { CommonLayout } from "../layout/CommonLayout"
import { UserName } from "../components/UserName";
import { InputWidthFull } from "../components/InputWidthFull";
import { InputWidth150px } from "../components/InputWidth150px";
import { InputWidth100px } from "../components/InputWidth100px";
import { InputRadio } from "../components/InputRadio";
import { InputCheckBox } from "../components/InputCheckBox";
import { InputTime } from "../components/InputTime";
import { InputTime2line } from "../components/InputTime2line";
import { InputTemplate } from "../components/InputTemplate";
import { SubmitButton } from "../components/SubmitButton";
import { BackButton } from "../components/BackButton";

const userData = {
  roomNumber: "1A",
  name: "清水 洋輔",
  userPhoto: '/img/no-image.png',
  initialWake1: "09", initialWake2: "00" ,
  lastDayWake1: "09", lastDayWake2: "00",
  selectedMorning: 0,
  mealPercentMorning: 100,
  refillMorning: "",
  selectedMorningStatus: [false, false, false],
  selectedDayCare: 2,
  initialWork1: "09", initialWork2: "00" ,
  lastDayWork1: "09", lastDayWork2: "10",
  initialHome1: "16", initialHome2: "00" ,
  lastDayHome1: "16", lastDayHome2: "30",
  selectedNoon: 0,
  mealPercentNoon: 100,
  refillNoon: "",
  selectedNoonStatus: [false, false, false],
  initialBath1: "16", initialBath2: "00" ,
  lastDayBath1: "16", lastDayBath2: "30",
  selectedEvening: 0,
  mealPercentEvening: 100,
  refillNight: "",
  selectedNightStatus: [false, false, false],
  initialBed1: "23", initialBed2: "00" ,
  lastDayBed1: "22", lastDayBed2: "30",
  selectedDaySupport: true,
  selectedHospitalHome: [false, false, false, false, false, false],
};

const anchorLink = [
  { id: "wakeTime", text: "起床" },
  { id: "vital", text: "バイタル" },
  { id: "mealMorning", text: "朝食" },
  { id: "medicineMorning", text: "服薬（朝）" },
  { id: "dayCare", text: "通所" },
  { id: "mealNoon", text: "昼食" },
  { id: "medicineNoon", text: "服薬（昼）" },
  { id: "bathing", text: "入浴" },
  { id: "mealEvening", text: "夕食" },
  { id: "medicineEvening", text: "服薬（夜）" },
  { id: "bedtime", text: "就寝" },
  { id: "daySupport", text: "日中支援" },
  { id: "dayState", text: "1日の様子" },
  { id: "hospitalHome", text: "入院/帰省" },
];

export const InputByUser = () => {
  // ページ内スムーズスクロール
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const scrollOptions = {
      behavior: 'smooth',
      top: element.offsetTop - 72,
    };
    
    window.scrollTo(scrollOptions);
  };

  // ラジオボタン選択
  const [selectedMorning, setSelectedMorning] = useState(userData.selectedMorning);
  const [selectedNoon, setSelectedNoon] = useState(userData.selectedNoon);
  const [selectedEvening, setSelectedEvening] = useState(userData.selectedEvening);
  const [selectedDayCare, setSelectedDayCare] = useState(userData.selectedDayCare);

  const handleRadioChange = (itemType, index) => {
    switch (itemType) {
      case 'morning':
        setSelectedMorning(index);
        break;
      case 'noon':
        setSelectedNoon(index);
        break;
      case 'evening':
        setSelectedEvening(index);
        break;
      case 'dayCare':
        setSelectedDayCare(index);
        break;
      default:
        break;
    }
  };

  // チェックボックス選択
  const [checkedMorningStatus, setCheckedMorningStatus] = useState(userData.selectedMorningStatus);
  const [checkedNoonStatus, setCheckedNoonStatus] = useState(userData.selectedNoonStatus);
  const [checkedNightStatus, setCheckedNightStatus] = useState(userData.selectedNightStatus);
  const [checkedDaySupport, setCheckedDaySupport] = useState(userData.selectedDaySupport);
  const [checkedHospitalHome, setCheckedHospitalHome] = useState(userData.selectedHospitalHome);

  const handleCheckBoxChange = (group, optionIndex) => {
    if (group === "morningStatus") {
      const updateMorningStatus = checkedMorningStatus.map((checked, i) =>
        i === optionIndex ? !checked: checked
      );
      setCheckedMorningStatus(updateMorningStatus);
    } else if (group === "noonStatus") {
      const updateNoonStatus = checkedNoonStatus.map((checked, i) =>
        i === optionIndex ? !checked: checked
      );
      setCheckedNoonStatus(updateNoonStatus);
    } else if (group === "nightStatus") {
      const updateNightStatus = checkedNightStatus.map((checked, i) =>
        i === optionIndex ? !checked: checked
      );
      setCheckedNightStatus(updateNightStatus);
    } else if (group === "daySupport") {
      setCheckedDaySupport(!checkedDaySupport);
    } else if (group === "hospitalHome") {
      const updatedHospitalHome = checkedHospitalHome.map((checked, i) =>
        i === optionIndex ? !checked : checked
      );
      setCheckedHospitalHome(updatedHospitalHome);
    }
  };

  const optionsMeal = ["○ 全て提供", "1 ごはんのみ", "2 みそ汁のみ", "3 ごはん・みそ汁のみ", "4 おかずのみ", "5 みそ汁のみ抜き", "6 ごはんのみ抜き"];

  const optionsMealStatus = ["前日・当日キャンセル", "ムース", "やわらか"];

  const optionsDayCare = ["通所/通勤", "欠席/欠勤", "予定なし"];

  const optionsDaySupport = ["日中支援"]

  const optionsHospitalHome = ["入院初日", "入院中", "退院日", "帰省初日", "帰省中", "帰ホーム日"];

  const morningTemplate = [
    {value: "声掛けにて起床される。"},
    {value: "朝食後は自室で過ごされる。"},
    {value: "朝食後はリビングで過ごされる。"},
  ];
  
  const noonTemplate = [
    {value: "通所。"},
    {value: "昼食後は自室で過ごされる。"},
    {value: "昼食後はリビングで過ごされる。"},
  ];
  
  const eveningTemplate = [
    {value: "入浴後に夕食を召し上がる。"},
    {value: "入浴を声掛けするが、入られなかった。"},
  ];

  return (
    <CommonLayout>
      <UserName
        h2Class="un_byUser"
        roomNumber={userData.roomNumber}
        userName={userData.name}
        userPhoto={userData.userPhoto}
      />

      <ul className="bl_anchorLink hp_mgnB40">
        {anchorLink.map((item, index) => (
          <li
            key={index}
            className={item.class}
            onClick={() => scrollToSection(item.id)}
          >
            {item.text}
          </li>
        ))}
      </ul>

      <div id="wakeTime" className="bl_flex__time">
        <InputTime
          divClass="hp_mgnB12"
          spanText="起床"
          isButton={true}
          valueInitial1={userData.initialWake1}
          valueInitial2={userData.initialWake2}
          valueLastDay1={userData.lastDayWake1}
          valueLastDay2={userData.lastDayWake2}
        />
      </div>

      <hr className="el_hr__mgn28" />

      <div id="vital" className="bl_flex__1n">
        <div className="bl_label__flex bl_label__flexStart hp_mgnB12">
          <p className="bl_label__title el_txt__size24">体温</p>

          <div>
            <InputWidth150px
              divClass="hp_mgnB12"
              spanText="朝"
              inputName=""
              inputValue=""
              inputUnit="℃"
            />

            <InputWidth150px
              divClass="hp_mgnB12"
              spanText="昼"
              inputName=""
              inputValue=""
              inputUnit="℃"
            />

            <InputWidth150px
              divClass=""
              spanText="夕"
              inputName=""
              inputValue=""
              inputUnit="℃"
            />
          </div>
        </div>

        <div>
          <InputWidth100px
            divClass="hp_mgnB12"
            spanText="血圧"
            inputName1=""
            inputValue1=""
            inputUnit="/"
            isValue2={true}
            inputName2=""
            inputValue2=""
          />

          <InputWidth100px
            divClass="hp_mgnB12"
            spanText="脈拍"
            inputName1=""
            inputValue1=""
            inputUnit=""
          />

          <InputWidth100px
            divClass=""
            spanText="血中酸素濃度"
            inputName1=""
            inputValue1=""
            inputUnit="％"
          />
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="mealMorning">
        <div className="un_medicine bl_label__flex bl_label__flexStart">
          <p className="bl_label__title hp_height36 el_txt__size24 el_txt__whiteSpace">朝食</p>

          <div className="bl_flex__meal">
            <InputRadio
              divClass="hp_mgnB16"
              radioName=""
              options={optionsMeal}
              selectedRadio={selectedMorning}
              onRadioChange={(index) => handleRadioChange('morning', index)}
            />

            <InputWidth100px
              divClass="hp_mgnB12"
              spanText="割合"
              inputName1=""
              inputValue1={userData.mealPercentMorning}
              inputUnit="％"
            />

            <InputWidth100px
              divClass="un_refill hp_mgnB16"
              spanText="有料おかわり"
              inputName1=""
              inputValue1={userData.refillMorning}
              inputUnit="回"
            />

            <InputCheckBox
              divClass=""
              checkBoxName=""
              options={optionsMealStatus}
              selectedCheckBox={checkedMorningStatus}
              onCheckBoxChange={(optionIndex) => handleCheckBoxChange("morningStatus", optionIndex)}
            />
          </div>
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="medicineMorning">
        <div className="un_medicine bl_label__flex bl_label__flexStart">
          <p className="bl_label__title el_txt__size24 el_txt__whiteSpace">服薬</p>

          <div>
            <InputTime2line
              time="朝"
            />
          </div>
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="dayCare">
        <div className="bl_flex__1n">
          <div className="bl_label__flex bl_label__flexStart">
            <p className="el_txt__size24 hp_pdgR20">通所等予定</p>

            <InputRadio
              divClass="hp_mgnB16"
              radioName=""
              options={optionsDayCare}
              selectedRadio={selectedDayCare}
              onRadioChange={(index) => handleRadioChange('dayCare', index)}
              />
          </div>

          <div className="bl_label__flex bl_label__flexStart hp_mgnB24">
            <p className="bl_label__title el_txt__size24 el_txt__whiteSpace">外出先</p>

            <InputWidthFull
              divClass="el_input__wFull"
              inputType="text"
              inputName=""
              inputClass="el_txt__size24"
            />
          </div>
        </div>

        <div className="bl_flex__time hp_mgnB24">
          <InputTime
            divClass="hp_mgnB12"
            spanText="出勤"
            isButton={true}
            divClassButton="hp_mgnB24"
            valueInitial1={userData.initialWork1}
            valueInitial2={userData.initialWork2}
            valueLastDay1={userData.lastDayWork1}
            valueLastDay2={userData.lastDayWork2}
          />
        </div>

        <div className="bl_flex__time">
          <InputTime
            divClass="hp_mgnB12"
            spanText="帰宅"
            isButton={true}
            valueInitial1={userData.initialHome1}
            valueInitial2={userData.initialHome2}
            valueLastDay1={userData.lastDayHome1}
            valueLastDay2={userData.lastDayHome2}
          />
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="mealNoon">
        <div className="un_medicine bl_label__flex bl_label__flexStart">
          <p className="bl_label__title hp_height36 el_txt__size24 el_txt__whiteSpace">昼食</p>

          <div className="bl_flex__meal">
            <InputRadio
              divClass="hp_mgnB16"
              radioName=""
              options={optionsMeal}
              selectedRadio={selectedNoon}
              onRadioChange={(index) => handleRadioChange('noon', index)}
            />

            <InputWidth100px
              divClass=" hp_mgnB12"
              spanText="割合"
              inputName1=""
              inputValue1={userData.mealPercentNoon}
              inputUnit="％"
            />

            <InputWidth100px
              divClass="un_refill hp_mgnB16"
              spanText="有料おかわり"
              inputName1=""
              inputValue1={userData.refillNoon}
              inputUnit="回"
            />

            <InputCheckBox
              divClass=""
              checkBoxName=""
              options={optionsMealStatus}
              selectedCheckBox={checkedNoonStatus}
              onCheckBoxChange={(optionIndex) => handleCheckBoxChange("noonStatus", optionIndex)}
            />
          </div>
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="medicineNoon">
        <div className="un_medicine bl_label__flex bl_label__flexStart">
          <p className="bl_label__title el_txt__size24 el_txt__whiteSpace">服薬</p>

          <div>
            <InputTime2line
              time="昼"
            />
          </div>
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="bathing" className="bl_flex__time">
        <InputTime
          divClass="hp_mgnB12"
          spanText="入浴"
          isButton={true}
          valueInitial1={userData.initialBath1}
          valueInitial2={userData.initialBath2}
          valueLastDay1={userData.lastDayBath1}
          valueLastDay2={userData.lastDayBath2}
        />
      </div>

      <hr className="el_hr__mgn28" />

      <div id="mealEvening">
        <div className="un_medicine bl_label__flex bl_label__flexStart">
          <p className="bl_label__title hp_height36 el_txt__size24 el_txt__whiteSpace">夕食</p>

          <div className="bl_flex__meal">
            <InputRadio
              divClass="hp_mgnB16"
              radioName=""
              options={optionsMeal}
              selectedRadio={selectedEvening}
              onRadioChange={(index) => handleRadioChange('evening', index)}
            />

            <InputWidth100px
              divClass="hp_mgnB12"
              spanText="割合"
              inputName1=""
              inputValue1={userData.mealPercentEvening}
              inputUnit="％"
            />


            <InputWidth100px
              divClass="un_refill hp_mgnB16"
              spanText="有料おかわり"
              inputName1=""
              inputValue1={userData.refillNight}
              inputUnit="回"
            />

            <InputCheckBox
              divClass=""
              checkBoxName=""
              options={optionsMealStatus}
              selectedCheckBox={checkedNightStatus}
              onCheckBoxChange={(optionIndex) => handleCheckBoxChange("nightStatus", optionIndex)}
            />
          </div>
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="medicineEvening">
        <div className="un_medicine bl_label__flex bl_label__flexStart">
          <p className="bl_label__title el_txt__size24 el_txt__whiteSpace">服薬</p>

          <div>
            <InputTime2line
              time="夜"
            />
          </div>
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="bedtime" className="bl_flex__time">
        <InputTime
          divClass="hp_mgnB12"
          spanText="就寝"
          isButton={true}
          valueInitial1={userData.initialBed1}
          valueInitial2={userData.initialBed2}
          valueLastDay1={userData.lastDayBed1}
          valueLastDay2={userData.lastDayBed2}
        />
      </div>

      <hr className="el_hr__mgn28" />

      <div id="daySupport">
        <InputCheckBox
          checkBoxName=""
          options={optionsDaySupport}
          selectedCheckBox={checkedDaySupport}
          onCheckBoxChange={(optionIndex) => handleCheckBoxChange("daySupport", optionIndex)}
        />
      </div>

      <hr className="el_hr__mgn28" />

      <div id="dayState">
        <p className="el_txt__size24 hp_mgnB12">1日の様子</p>

        <div className="bl_narrow bl_flex__dayState">
          <InputTemplate
            divClass="hp_mgnB16"
            timeText="朝"
            templateText={morningTemplate}
          />

          <InputTemplate
            divClass="hp_mgnB16"
            timeText="昼"
            templateText={noonTemplate}
          />

          <InputTemplate
            timeText="夜"
            templateText={eveningTemplate}
          />
        </div>
      </div>

      <hr className="el_hr__mgn28" />

      <div id="hospitalHome">
        <p className="el_txt__size24 hp_mgnB12">入院/帰省について</p>

        <div className="bl_narrow hp_mgnB40">
          <InputCheckBox
            divClass="bl_2column"
            checkBoxName=""
            options={optionsHospitalHome}
            selectedCheckBox={checkedHospitalHome}
            onCheckBoxChange={(optionIndex) => handleCheckBoxChange("hospitalHome", optionIndex)}
          />
        </div>
      </div>

      <div className="bl_btnWrapper__bottom">
        <SubmitButton
          buttonText="保存"
        />

        <BackButton
          buttonLink="/top?user"
          buttonText="戻る"
        />
      </div>
    </CommonLayout>
  )
}
