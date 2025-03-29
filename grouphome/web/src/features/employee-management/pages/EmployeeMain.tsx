import { useEffect, useRef, useState } from 'react'
//import { HomeSave as SaveApiPath, HomeDel as DelApiPath } from '@/features/blc-common/assets/ApiPath';
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

      
//import { CreateOrEditPopup } from '@/features/office-management/components/home/HomeCreateOrEdit';
import { EmployeeTable } from '../components/home/EmployeeTable';
//import { FormData ,HomeInfoSaveDto } from '@/features/office-management/types/Home';
import { CreateOrEditPopup } from '../components/home/EmployeeCreateOrEdit';
import { EmployeeFormData, EmployeeInfoSaveDto  } from '../types/Employee';
//import {EmployeeFormData, EmployeeInfoSaveDto } from '@/features/employee-management/types/home';
import { EmployeeSave as SavApiPath, EmployeeDel as DellApiPath } from '@/features/blc-common/assets/ApiPath';
type NewType = EmployeeFormData;

 //import { FormData,EmployeeInfoSaveDto } from '../types/Employee';

type FormDataDto = NewType;
const defaultFormData: FormDataDto = {
  id: null, name: '',  birthDay: '',
  address: '', unitId: null , message: '', 
   updatedAt: '',imageEmployee: null
};

export const EmployeeMain = () => {
  const pageTitle = 'QUẢN LÝ NGƯỜI LÀM'

  // const [homeId, setHomeId] = useState<number | null>(null);
  // const [branchId, setBranchId] = useState<number | null>(null);
  const [id, setid] = useState<number | null>(null);
  //const [branchId, setBranchId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [employeeformData, setEmployeeFormData] = useState<FormDataDto>(defaultFormData);
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
    employeeformData={employeeformData}
    setEmployeeFormData={setEmployeeFormData}
    //isMatchedTown={setIsMatchedTown}
    //isLoaded={setIsLoaded} 
    />;


  const chgTgtData = (row: EmployeeFormData): void => {
    setRowData(row);
    setid(row?.id);
    //setBranchId(row?.branchId);
  }

  const openDeletePopup = () => {
    setConfirmParam(prevState => ({
      ...prevState,
      textConfirm: 'OK',
      isShowCancel: true,
      message: '選択したホーム(' + rowData.name + ')を削除しますか？',
      confirmAction: () => deleteHome(),
      isOpen: true
    }));
  };

  const reload = async () => {
    setRowData(null);
    setid(null);
    //setBranchId(null);
    setSeq(seq + 1);
  }

  const reloadButKeepDetailShow = async () => {
    setResetSelections(false);
    setSeq(seq + 1);
  }

  const deleteHome = async () => {
    Del({ apiPath: `${DellApiPath}${id}`, params: {} });
    reload();
  };

  const handleOpenPopupCreate = () => {
    setIsLoaded(false);
    setTitleText(pageTitle + '(Thêm Mới)');
    setBtnText('Lưu Lại');
    setEmployeeFormData(defaultFormData);
    setOldFormData(defaultFormData);
    setIsPopupOpen(true)
    setResetSelections(true)
  };

  const handleOpenPopupEdit = () => {
    setIsLoaded(false);
    //const postNo = rowData.postNo?.replace('-', '');
    console.log("sssssssssss", rowData);
    let dataEdit = {
      id: rowData.id,
      name: rowData.name,
      birthDay: rowData.birthDay,
      address: rowData.address,
      message: rowData.message,
      unitId: rowData.unitId,
      imageEmployee: rowData.imageEmployee,
      // postNo1st: postNo?.substring(0, 3) ?? '',
      // postNo2nd: postNo?.substring(3) ?? '',
      // postNo: postNo,
      updatedAt: rowData.updatedAt,
      // id: rowData.id,
      // homeName: rowData.homeName,
      // branchId: rowData.branchId,
      // branchName: rowData.branchName,
      // prefId: String(rowData.prefId ?? ''),
      // addrId: rowData.addrId,
      // city: rowData.city,
      // town: rowData.town,
      // postNo1st: postNo?.substring(0, 3) ?? '',
      // postNo2nd: postNo?.substring(3) ?? '',
      // postNo: postNo,
      // tel: rowData.tel,
      // units: rowData.units,
      // updatedAtAddr: rowData.updatedAtAddr,
      // updatedAtHome: rowData.updatedAtHome,
    };

    setEmployeeFormData(dataEdit);
    setOldFormData(dataEdit);

    setTitleText(pageTitle + '(編集)');
    setBtnText('更新');
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    if (checkDataDifferent(oldFormData, employeeformData)) {
      setConfirmParam(prevState => ({
        ...prevState,
        textConfirm: 'Đóng',
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
    let data = employeeformData
    console.log("+++++++++++++++++++: ", data);
    const isValid = await formRef.current?.validateForm();  
    if (!isValid) {
      return;
    }
    
    let saveData = {
      id: data.id,
      name: data.name,
      birthDay: data.birthDay,
      address: data.address,
      message: data.message,
      unitId: data.unitId,
      updatedAt: data.updatedAt,
      imageEmployee: data.imageEmployee,
      // homeId: data.id,
      // addrId: data.addrId,
      // branchId: data.branchId,
      // name: data.homeName,
      // sameBranch: false,
      // postNo: data.postNo,
      // prefId: data.prefId,
      // city: data.city,
      // town: data.town,
      // tel: data.tel,
      // fax: '',
      // contents: '{}',
      // updatedAtHome: data.updatedAtHome,
      // updatedAtAddr: data.updatedAtAddr,
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

  const doSave = (data: EmployeeInfoSaveDto) => {
    console.log('8888888', data);
    data.unitId = 1;
    Post({
      apiPath: SavApiPath,
      params: data,
      //message: 'ホーム情報を' + btnText + 'しました。',
      message: 'Đã lưu',
      errMessage: btnText + 'に失敗しました。',
      onSuccess: (res) => {
        setIsPopupOpen(false);
        if (data.id) {
          reloadButKeepDetailShow();
        } else {
          reload();
        }
      }
    });
  }

  useEffect(() => {
    if (isLoaded) {
      setOldFormData(employeeformData);
    }
  }, [isLoaded]);

  return (
    <>
      <style>
        <EmployeeCss />
      </style>
      <div id="employee">
        <TableOpeButtons items={[
          { name: "Thêm", buttonType: ButtonType.Add, cb: handleOpenPopupCreate },
          { name: "Sửa", buttonType: ButtonType.Edit, cb: handleOpenPopupEdit, selectedState: id },
          { name: "Xóa", buttonType: ButtonType.Del, cb: openDeletePopup, selectedState: id },
        ] as ButtonProps[]} />
        
        <div id="employeeList"><EmployeeTable cbSelect={chgTgtData} seq={seq} resetSelections={resetSelections} /></div>

        {/* {id &&
          <div id="unitInfo">
            <UnitInfo loadParentData={reloadButKeepDetailShow} branchId={branchId} homeId={id} seq={seq} />
          </div>
        } */}

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

