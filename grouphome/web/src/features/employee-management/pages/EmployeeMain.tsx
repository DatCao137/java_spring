import { useEffect, useRef, useState } from 'react'
import { HomeSave as SaveApiPath, HomeDel as DelApiPath } from '@/features/blc-common/assets/ApiPath';
import { EmployeeCss } from '../assets/EmployeeCss'

//import { FormData, HomeInfoSaveDto } from '../types/Home'
// import { CreateOrEditPopup } from '../components/home/HomeCreateOrEdit'
import { Post, Del } from '@/features/blc-common/utils/ServerRequest';
import { Popup } from '@/components/elements/Popup'
import { PopupConfirm } from '@/components/elements/PopupConfirm'
import { checkDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupConfirmParams } from '@/components/elements/Common';
// import { UnitInfo } from '../components/unit/UnitInfo'
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { UnitInfo } from '@/features/office-management/components/unit/UnitInfo';
//import { HomeTable } from '@/features/office-management/components/home/HomeTable';
//import {FormData, HomeInfoSaveDto } from '@/features/employee-management/types/home';


import { CreateOrEditPopup } from '@/features/office-management/components/home/HomeCreateOrEdit';
import { EmployeeTable } from '../components/home/EmployeeTable';
import { FormData ,HomeInfoSaveDto } from '@/features/office-management/types/Home';
 //import { FormData,EmployeeInfoSaveDto } from '../types/Employee';

type FormDataDto = FormData;
const defaultFormData: FormDataDto = {
  id: null, homeName: '', branchId: 0, branchName: '',
  prefId: '', addrId: null, city: '', town: '', postNo: '', tel: '',
  units: '', updatedAtAddr: '', updatedAtHome: ''
};

export const EmployeeMain = () => {
  const pageTitle = 'QUẢN LÝ NGƯỜI LÀM'

  const [homeId, setHomeId] = useState<number | null>(null);
  const [branchId, setBranchId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataDto>(defaultFormData);
  const [oldFormData, setOldFormData] = useState<FormDataDto>(defaultFormData);
  const [seq, setSeq] = useState(0);
  const [titleText, setTitleText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [rowData, setRowData] = useState<any>(null);
  const formRef = useRef<any>(null);
  const [resetSelections, setResetSelections] = useState(false);
  const [isMatchedTown, setIsMatchedTown] = useState(true);
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: '',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const contentData = <CreateOrEditPopup
    ref={formRef}
    formData={formData}
    setFormData={setFormData}
    isMatchedTown={setIsMatchedTown}
    isLoaded={setIsLoaded} />;


  const chgTgtData = (row: FormData): void => {
    setRowData(row);
    setHomeId(row?.id);
    setBranchId(row?.branchId);
  }

  const openDeletePopup = () => {
    setConfirmParam(prevState => ({
      ...prevState,
      textConfirm: 'OK',
      isShowCancel: true,
      message: '選択したホーム(' + rowData.homeName + ')を削除しますか？',
      confirmAction: () => deleteHome(),
      isOpen: true
    }));
  };

  const reload = async () => {
    setRowData(null);
    setHomeId(null);
    setBranchId(null);
    setSeq(seq + 1);
  }

  const reloadButKeepDetailShow = async () => {
    setResetSelections(false);
    setSeq(seq + 1);
  }

  const deleteHome = async () => {
    Del({ apiPath: `${DelApiPath}${homeId}`, params: {} });
    reload();
  };

  const handleOpenPopupCreate = () => {
    setIsLoaded(false);
    setTitleText(pageTitle + '(追加)');
    setBtnText('追加');
    setFormData(defaultFormData);
    setOldFormData(defaultFormData);
    setIsPopupOpen(true)
    setResetSelections(true)
  };

  const handleOpenPopupEdit = () => {
    setIsLoaded(false);
    const postNo = rowData.postNo?.replace('-', '');

    let dataEdit = {
      // id: rowData.id,
      // name: rowData.name,
      // birthDay: rowData.birthDay,
      // address: rowData.address,
      // message: rowData.message,
      // unitId: rowData.unitId,
      // postNo1st: postNo?.substring(0, 3) ?? '',
      // postNo2nd: postNo?.substring(3) ?? '',
      // postNo: postNo,
      // updatedAt: rowData.updatedAtAddr,
      id: rowData.id,
      homeName: rowData.homeName,
      branchId: rowData.branchId,
      branchName: rowData.branchName,
      prefId: String(rowData.prefId ?? ''),
      addrId: rowData.addrId,
      city: rowData.city,
      town: rowData.town,
      postNo1st: postNo?.substring(0, 3) ?? '',
      postNo2nd: postNo?.substring(3) ?? '',
      postNo: postNo,
      tel: rowData.tel,
      units: rowData.units,
      updatedAtAddr: rowData.updatedAtAddr,
      updatedAtHome: rowData.updatedAtHome,
    };

    setFormData(dataEdit);
    setOldFormData(dataEdit);

    setTitleText(pageTitle + '(編集)');
    setBtnText('更新');
    setIsPopupOpen(true);
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
      // id: data.id,
      // birthDay: data.birthDay,
      // address: data.address,
      // message: data.message,
      // unitId: data.unitId,
      // postNo: data.postNo,
      // updatedAt: data.updatedAt,
      homeId: data.id,
      addrId: data.addrId,
      branchId: data.branchId,
      name: data.homeName,
      sameBranch: false,
      postNo: data.postNo,
      prefId: data.prefId,
      city: data.city,
      town: data.town,
      tel: data.tel,
      fax: '',
      contents: '{}',
      updatedAtHome: data.updatedAtHome,
      updatedAtAddr: data.updatedAtAddr,
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

  const doSave = (data: HomeInfoSaveDto) => {
    Post({
      apiPath: SaveApiPath,
      params: data,
      message: 'ホーム情報を' + btnText + 'しました。',
      errMessage: btnText + 'に失敗しました。',
      onSuccess: (res) => {
        setIsPopupOpen(false);
        if (data.homeId) {
          reloadButKeepDetailShow();
        } else {
          reload();
        }
      }
    });
  }

  useEffect(() => {
    if (isLoaded) {
      setOldFormData(formData);
    }
  }, [isLoaded]);

  return (
    <>
      <style>
        <EmployeeCss />
      </style>
      <div id="home">
        <TableOpeButtons items={[
          { name: "Thêm", buttonType: ButtonType.Add, cb: handleOpenPopupCreate },
          { name: "Sửa", buttonType: ButtonType.Edit, cb: handleOpenPopupEdit, selectedState: homeId },
          { name: "Xóa", buttonType: ButtonType.Del, cb: openDeletePopup, selectedState: homeId },
        ] as ButtonProps[]} />
        
        <div id="homeList"><EmployeeTable cbSelect={chgTgtData} seq={seq} resetSelections={resetSelections} /></div>

        {homeId &&
          <div id="unitInfo">
            <UnitInfo loadParentData={reloadButKeepDetailShow} branchId={branchId} homeId={homeId} seq={seq} />
          </div>
        }

        <Popup title={titleText} doText={btnText}
          isOpen={isPopupOpen}
          onClose={handleClosePopup} onOK={handleSaveData}
          contents={contentData} 
          />

        <PopupConfirm
          param={confirmParam}
        />
      </div>
    </>
  )
}

