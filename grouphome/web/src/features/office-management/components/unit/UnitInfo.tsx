import { useState, useEffect, useRef } from 'react';

import { Post, Del } from '@/features/blc-common/utils/ServerRequest';
import { UnitSave as SaveApiPath, UnitDel as DelApiPath } from '@/features/blc-common/assets/ApiPath';
import { TypeFormData, TypeUnitInfo, TypeUnitInfoSaveDto, TypeContents } from '../../types/UnitInfo';
import { Popup } from '@/components/elements/Popup';
import { CreateOrEditPopup } from './UnitInfoCreateOrEdit';
import { toast } from 'react-toastify';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { jsonParse } from '@/utils/JsonUtils';
import { checkDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupConfirmParams } from '@/components/elements/Common';
import { UnitTable } from './UnitTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CalcInfo } from '../calc/CalcInfo';
import { UnitDetail } from './UnitDetail';
import { Structure } from '../structure/StructureInfo';
import 'react-tabs/style/react-tabs.css';
import { UnitInfoCss } from '../../assets/UnitInfoCss'
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';

type ArgsData = {
  homeId: number | null;
  loadParentData?: () => void;
  seq: number;
  branchId: number | null;
};

type FormDataDto = TypeFormData;
const defaultFormData: FormDataDto = {
  unitId: null, homeId: null,
  name: '',
  addrId: null, postNo: '', prefId: '', city: '', town: '', tel: '', fax: '',
  mail: '',
  startDate: null, capacity: null, concept: '',
  featuresSystem: false, featuresBarrierFree: false,
  featuresMenOnly: false, featuresWomenOnly: false,
  serviceGH: false, serviceSS: false,
  updatedAtAddr: '', updatedAtUnit: '',
  postNo1st: '', postNo2nd: ''
};
const DefaultContents: TypeContents = {
  basic: { startDate: null, capacity: 0, concept: '' },
  features: { system: false, barrierFree: false, menOnly: false, womenOnly: false },
  services: { GH: false, SS: false},
}

function UnitInfo({ homeId, loadParentData, seq, branchId }: ArgsData) {
  const [titleText, setTitleText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [formData, setFormData] = useState<FormDataDto>(defaultFormData);
  const [oldFormData, setOldFormData] = useState<FormDataDto>(defaultFormData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [isMatchedTown, setIsMatchedTown] = useState(true);
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: '',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const formRef = useRef<any>(null);
  const [rowData, setRowData] = useState<any>(null);
  const [tgtData, setTgtData] = useState<number | null>(null)
  const [resetSelections, setResetSelections] = useState(false);
  const [unitId, setUnitId] = useState(null);

  const contentData = <CreateOrEditPopup
    ref={formRef}
    formData={formData}
    setFormData={setFormData}
    isMatchedTown={setIsMatchedTown}
    isLoaded={setIsLoaded}/>;
  const [itemData, setItemData] = useState<TypeUnitInfo>();

  const _loadParentData = async () => {
    if (loadParentData) {
        loadParentData();
    }
  };

  const handleOpenPopupCreate = () => {
    setIsLoaded(true);
    setTitleText("住居情報(追加)");
    setBtnText("追加");
    setFormData(defaultFormData);
    setOldFormData(defaultFormData);
    setIsPopupOpen(true)
    setResetSelections(true)
    setUnitId(null)
  };

  const handleOpenPopupEdit = () => {
    const item = rowData
    setIsLoaded(true);
    const contents = jsonParse('contents', item.contents, DefaultContents);
    const basic = contents.basic;
    const features = contents.features;
    const services = contents.services;
    const postNo = item.postNo?.replace('-', '');

    let dataEdit = {
      unitId: item.unitId,
      homeId: item.homeId,
      name: item.unitName,
      addrId: item.addrId,
      postNo1st: postNo?.substring(0, 3) ?? '',
      postNo2nd: postNo?.substring(3) ?? '',
      postNo: postNo,
      prefId: String(item.prefId ?? ''),
      city: item.city,
      town: item.town,
      tel: item.tel,
      fax: item.fax ?? '',
      mail: item.mail,
      startDate: basic?.startDate,
      capacity: basic?.capacity,
      concept: basic?.concept,
      featuresSystem: features?.system,
      featuresBarrierFree: features?.barrierFree,
      featuresMenOnly: features?.menOnly,
      featuresWomenOnly: features?.womenOnly,
      serviceGH: services?.GH,
      serviceSS: services?.SS,
      updatedAtAddr: item.updatedAtAddr,
      updatedAtUnit: item.updatedAtUnit,
    };

    setFormData(dataEdit);
    setOldFormData(dataEdit);

    setTitleText('住居情報(編集)');
    setBtnText('更新');
    setIsPopupOpen(true);
    setResetSelections(false)
  };

  const openDeletePopup = () => {
    setItemData(rowData);
    setConfirmParam(prevState => ({
      ...prevState, 
      textConfirm: 'OK',
      isShowCancel: true,
      message: '選択した住居(' + rowData.unitName + ')を削除しますか？',
      confirmAction: () => deleteUnitInfo(),
      isOpen: true
    }));
  };

  const handleClosePopup = () => {
    if (checkDataDifferent(oldFormData, formData)) {
      setConfirmParam(prevState => ({
        ...prevState, 
        textConfirm: '閉じる',
        isShowCancel: true,
        message: TEXT_CONFIRM_DATA_CHANGE,
        confirmAction: () => closePopup(),
        isOpen: true
      }));
    } else {
      closePopup();
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  }

  const handleCloseConfirm = () => {
    setConfirmParam(prevState => ({
      ...prevState, 
      isOpen: false
    }));
  };

  const handleSaveData = async () => {
    let data = formData
    const isValid = await formRef.current?.validateForm();

    if (!isValid) {
      return;
    }

    let saveData = {
      unitId: data.unitId,
      homeId: homeId,
      name: data.name,
      addrId: data.addrId,
      postNo: (data.postNo1st && data.postNo2nd) ? `${data.postNo1st}-${data.postNo2nd}` : null,
      prefId: data.prefId,
      city: data.city,
      town: data.town,
      tel: data.tel,
      fax: data.fax,
      mail: data.mail,
      contents: {
        basic: {
          startDate: data.startDate,
          capacity: data.capacity,
          concept: data.concept,
        },
        features: {
          system: data.featuresSystem,
          barrierFree: data.featuresBarrierFree,
          menOnly: data.featuresMenOnly,
          womenOnly: data.featuresWomenOnly,
        },
        services: {
          GH: data.serviceGH,
          SS: data.serviceSS
        },
      },
      updatedAtAddr: data.updatedAtAddr,
      updatedAtUnit: data.updatedAtUnit,
    }
    if (isMatchedTown === false) {
      setConfirmParam(prevState => ({
        ...prevState, 
        textConfirm: 'OK',
        isShowCancel: true,
        message: '郵便番号と住所が一致しませんが保存してよろしいですか？',
        confirmAction: () => doSave(saveData),
        isOpen: true
      }));
      return;
    } else {
      doSave(saveData);
    }
  };

  const doSave = (data: TypeUnitInfoSaveDto) => {
    Post({
      apiPath: SaveApiPath,
      params: data,
      message: '住居情報を' + btnText + 'しました。',
      onSuccess: (res) => {
        setIsPopupOpen(false);
        if (loadParentData) {
          loadParentData();
        }
      }
    });
  };

  const deleteUnitInfo = async () => {
    if (itemData == undefined) {
      toast.error('削除に失敗しました。(none)');
      return;
    }

    Del({
      apiPath: `${DelApiPath}${itemData.unitId}`,
      params: {}});
    if (loadParentData) {
      loadParentData();
    }
  };

  const chgTgtData = (row: any): void => {
    setRowData(row);
    setTgtData(row?.unitId);
    setUnitId(row?.unitId)
  }

  useEffect(() => {
    setResetSelections(true)
    setRowData(defaultFormData)
    setUnitId(null)
  }, [homeId, seq]);

  useEffect(() => {
    if (isLoaded) {
      
    }
  }, [ isLoaded ]);

  return (
    <>
      <style>
        <UnitInfoCss />
      </style>

      <div className="box mt-6">
        <span className="box-title">事業所詳細</span>

        <div className="unitList mt-6">
          <TableOpeButtons items={[
              { name: "追加", buttonType: ButtonType.Add, cb:handleOpenPopupCreate},
              { name: "編集", buttonType: ButtonType.Edit, cb:handleOpenPopupEdit, keyIdState: homeId, selectedState:tgtData},
              { name: "削除", buttonType: ButtonType.Del, cb:openDeletePopup, keyIdState: homeId, selectedState:tgtData},
            ] as ButtonProps[]} />
          <UnitTable cbSelect={chgTgtData} seq={seq} resetSelections={resetSelections} homeId={homeId} />
        </div>

        <Tabs className="mt-10">
          <TabList>
            <Tab>住居情報</Tab>
            <Tab>人員体制</Tab>
            <Tab>算定情報</Tab>
          </TabList>
          <TabPanel>
            <UnitDetail loadParentData={_loadParentData} homeId={homeId} unitId={unitId} seq={seq} rowData={rowData}/>
          </TabPanel>
          <TabPanel>
            <Structure loadParentData={_loadParentData} branchId={branchId} />
          </TabPanel>
          <TabPanel>
            <CalcInfo branchId={branchId} />
          </TabPanel>
        </Tabs>

        <Popup title={titleText} doText={btnText}
          isOpen={isPopupOpen}
          onClose={handleClosePopup} onOK={handleSaveData}
          contents={contentData} />

        <PopupConfirm
          param={confirmParam}
        />
      </div>
    </>
  );
}

export { UnitInfo };
