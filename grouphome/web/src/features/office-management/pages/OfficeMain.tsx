import { useRef, useState, useEffect } from 'react'
import { BranchSave as SaveApiPath, BranchDel as DelApiPath } from '@/features/blc-common/assets/ApiPath';
import { OfficeCss } from '../assets/OfficeCss'
import { OfficeTable } from '../components/office/OfficeTable'
import { OfficeDetail } from '../components/office/OfficeDetail'
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons'; 
import { BranchInfoSaveDto, FormData, TypeContents } from '../types/Branch'
import { CreateOrEditPopup } from '../components/office/OfficeCreateOrEdit'
import { Post, Del } from '@/features/blc-common/utils/ServerRequest';
import { Popup } from '@/components/elements/Popup'
import { PopupConfirm } from '@/components/elements/PopupConfirm'
import { jsonParse } from '@/utils/JsonUtils'
import { checkDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupConfirmParams } from '@/components/elements/Common';

type FormDataDto = FormData;
const defaultFormData: FormDataDto = {
  id: null, no: 0, branchName: '', homeId: null, homeName: '',
  groupHomeTypeId: 0, classDivisionId: 0, fee: null,
  prefId: '', addrId: null, city: '', town: '', postNo1st: '', postNo2nd: '', postNo: '', tel: '', fax: '',
  officeNoGH: '', officeNoSS: '', officeNoA: '', officeNoB: '',
  memo: '', updatedAtBranch: '', updatedAtAddr: '', contents: ''
};

const DefaultContents: TypeContents = {
  basic: { groupHomeTypeId: 0, classDivisionId: 0, fee: null },
  officeNumber: { GH: null, SS: null, typeA: null, typeB: null }
}

export const OfficeMain = () => {
  const pageTitle = '事業所情報'

  const [branchId, setBranchId] = useState<number | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [resetSelections, setResetSelections] = useState(false);
  const [formData, setFormData] = useState<FormDataDto>(defaultFormData);
  const [oldFormData, setOldFormData] = useState<FormDataDto>(defaultFormData);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [seq, setSeq] = useState(0);
  const [titleText, setTitleText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [rowData, setRowData] = useState<any>(null);
  const [rowDataDetail, setRowDataDetail] = useState<any>(null);
  const [homeId, setHomeId] = useState<number | null>(null);
  const [isMatchedTown, setIsMatchedTown] = useState(true);
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: '',
    message: '',
    isShowCancel: false,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });
  const formRef = useRef<any>(null);

  const chgTgtData = (row: FormData): void => {
    setRowData(row);
    setBranchId(row?.id);
    setHomeId(row?.homeId);
  }

  const openDeletePopup = () => {
    setConfirmParam(prevState => ({
      ...prevState, 
      textConfirm: 'OK',
      isShowCancel: true,
      message: '選択した事業所(' + rowData.branchName + ')を削除しますか？',
      confirmAction: () => deleteOffice(),
      isOpen: true
    }));
  };

  const reload = async () => {
    setRowData(null);
    setBranchId(null);
    setHomeId(null);
    setResetSelections(true);
    setSeq(seq + 1);
  }

  const reloadButKeepDetailShow = async () => {
    setResetSelections(false);
    setSeq(seq + 1);
  }

  const deleteOffice = async () => {
    Del({
      apiPath: `${DelApiPath}${branchId}`,
      params: {},
      onSuccess: (res) => {
        reload();
      }
    });
  };

  const handleOpenPopupCreate = () => {
    setTitleText(pageTitle + '(追加)');
    setBtnText('追加');
    setFormData(defaultFormData);
    setOldFormData(defaultFormData);
    setIsPopupOpen(true);
  };

  const handleOpenPopupEdit = () => {
    setIsLoaded(false);
    const contents = jsonParse('contents', rowData.contents, DefaultContents);
    const basic = contents.basic;
    const officeNo = contents.officeNumber;
    const postNo = rowDataDetail.postNo?.replace('-', '');

    let dataEdit = {
      id: rowData.id,
      no: rowData.no,
      branchName: rowData.branchName,
      homeId: rowData.homeId,
      homeName: rowData.homeName,
      groupHomeTypeId: basic?.groupHomeTypeId ?? 0,
      classDivisionId: basic?.classDivisionId ?? 0,
      fee: basic?.fee,
      prefId: String(rowDataDetail.prefId ?? ''),
      city: rowDataDetail.city,
      town: rowDataDetail.town,
      postNo: rowDataDetail.postNo,
      postNo1st: postNo?.substring(0, 3) ?? '',
      postNo2nd: postNo?.substring(3) ?? '',
      tel: rowDataDetail.tel,
      fax: rowDataDetail.fax,
      officeNoGH: officeNo?.GH ?? '',
      officeNoSS: officeNo?.SS ?? '',
      officeNoA: officeNo?.typeA ?? '',
      officeNoB: officeNo?.typeB ?? '',
      memo: rowDataDetail.memo,
      addrId: rowData.addrId,
      updatedAtAddr: rowDataDetail.updatedAtAddr,
      updatedAtBranch: rowDataDetail.updatedAtBranch,
      contents: rowData.contents,
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
      branchId: data.id,
      addrId: data.addrId,
      no: data.no,
      name: data.branchName,
      contents: {
        basic: {
          groupHomeTypeId: data.groupHomeTypeId,
          classDivisionId: data.classDivisionId,
          fee: data.fee
        },
        officeNumber: {
          GH: data.officeNoGH,
          SS: data.officeNoSS,
          typeA: data.officeNoA,
          typeB: data.officeNoB,
        }
      },
      memo: data.memo,
      postNo: (data.postNo1st && data.postNo2nd) ? `${data.postNo1st}-${data.postNo2nd}` : null,
      prefId: data.prefId || '',
      city: data.city,
      town: data.town,
      tel: data.tel,
      fax: data.fax,
      updatedAtBranch: data.updatedAtBranch,
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

  const doSave = (data: BranchInfoSaveDto) => {
    Post({
      apiPath: SaveApiPath,
      params: data,
      message: '事業所情報を' + btnText + 'しました。',
      onSuccess: (res) => {
        setIsPopupOpen(false);
        if (data.branchId) {
          reloadButKeepDetailShow();
        } else {
          reload();
        }
      }
    });
    setResetSelections(false);
  }

  useEffect(() => {
    if (isLoaded) {
      setOldFormData(formData);
    }
  }, [ isLoaded ]);

  const contentData = <CreateOrEditPopup
    ref={formRef}
    formData={formData}
    setFormData={setFormData}
    isMatchedTown={setIsMatchedTown}
    isLoaded={setIsLoaded} />;

  return (
    <>
      <style>
        <OfficeCss />
      </style>

      <div id="office">
        <TableOpeButtons items={[
            { name: "追加", buttonType: ButtonType.Add, cb:handleOpenPopupCreate},
            { name: "編集", buttonType: ButtonType.Edit, cb:handleOpenPopupEdit, selectedState:branchId},
            { name: "削除", buttonType: ButtonType.Del, cb:openDeletePopup, selectedState:branchId},
          ] as ButtonProps[]} />

        <div id="officeList"><OfficeTable cbSelect={chgTgtData} seq={seq} resetSelections={resetSelections} /></div>
        <div id="officeDetail"><OfficeDetail branchId={branchId} seq={seq} homeId={homeId} setRowDataDetail={setRowDataDetail} loadParentData={reloadButKeepDetailShow} /></div>

        <Popup title={titleText} doText={btnText}
          isOpen={isPopupOpen}
          onClose={handleClosePopup} onOK={handleSaveData}
          contents={contentData} />

        <PopupConfirm
          param={confirmParam}
        />
      </div>
    </>
  )
}