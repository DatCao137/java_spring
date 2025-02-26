import { createContext, useEffect, useRef, useState } from 'react'
import { Row } from '@tanstack/react-table'
import { InquiryCss } from '../assets/InquiryCss'
import { InquiryTable } from '../components/inquiry/InquiryTable'
import { InquiryDetail } from '../components/inquiry/detail/InquiryDetail';
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { Popup } from '@/components/elements/Popup';
import { CreateOrEditPopup } from '../components/inquiry/form/InquiryCreateOrEdit';
import { Del, Post } from '@/features/blc-common/utils/ServerRequest';
import {
  InquirySave as ApiPathSave,
  Select as ApiPathSelect,
  Inquiry as ApiPath
} from '@/features/blc-common/assets/ApiPath';
import { PopupConfirmParams } from '@/components/elements/Common';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { InquiryFormData, InquirySaveFormData } from '../types/Inquiry';
import { SelectListProvider } from '../contexts/SelectListContext';
import { compareDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';

const defaultFormData: InquiryFormData = {
  id: null,
  name: '',
  gana: '',
  sex: '',
  age: '',
  inquirySrcName: '',
  inquirySrcStaff: '',
  inquirySrcRoute: null,
  inquirySrcPhone: '',
  inquirySrcLink: null,
  status: '',
  nextAction: '',
  updatedAt: ''
};

interface Option {
  name: string;
  value: string | null;
}

type InquiryMainContextType = {
  inquiryId: number | null;
}
export const InquiryMainContext = createContext<InquiryMainContextType>({ inquiryId: null });

export const InquiryMain = () => {
  const [tgtData, setTgtData] = useState<string | null>(null)
  const [rowData, setRowData] = useState<any>(null);
  const [seq, setSeq] = useState(0);
  const pageTitle = '問合わせ情報';
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [titleText, setTitleText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [formData, setFormData] = useState<InquiryFormData>(defaultFormData);
  const [oldFormData, setOldFormData] = useState<InquiryFormData>(defaultFormData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [resetSelections, setResetSelections] = useState(false);
  const formRef = useRef<any>(null);
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: '',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const chgTgtData = (row: Row<any>) => {
    setTgtData(row?.id);
    setRowData(row);
  }

  const contentData = <CreateOrEditPopup
    ref={formRef}
    formData={formData}
    setFormData={setFormData}
    isLoaded={setIsLoaded}
    />;

  const reload = async () => {
    setResetSelections(true);
    setRowData(null);
    setTgtData(null);
    setSeq(seq + 1);
  }

  const reloadButKeepDetailShow = async () => {
    setResetSelections(false);
    setSeq(seq + 1);
  }

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
    let dataEdit = {
      id: rowData?.id ?? null,
      name: rowData?.name || '',
      gana: rowData?.gana || '',
      sex: rowData?.sex ?? null,
      age: rowData?.age ?? null,
      inquirySrcName: rowData?.inquirySrcName || '',
      inquirySrcStaff: rowData?.inquirySrcStaff || '',
      inquirySrcRoute: rowData?.inquirySrcRoute ?? null,
      inquirySrcPhone: rowData?.inquirySrcPhone || '',
      inquirySrcLink: rowData?.inquirySrcLink ?? null,
      status: rowData?.status ?? null,
      nextAction: rowData?.nextAction || '',
      updatedAt: rowData?.updatedAt,
    };

    setFormData(dataEdit);
    setOldFormData(dataEdit);
    setTitleText(pageTitle + '(編集)');
    setBtnText('更新');
    setIsPopupOpen(true);
  };

  const openDeletePopup = () => {
    setConfirmParam(prevState => ({
      ...prevState,
      textConfirm: 'OK',
      isShowCancel: true,
      message: '選択した問い合わせ情報 (' + rowData.name + ') を削除しますか?',
      confirmAction: () => deleteInquiry(),
      isOpen: true
    }));
  };

  const deleteInquiry = async () => {
    Del({
      apiPath: `${ApiPath}/${tgtData}`,
      params: {},
      onSuccess: (res) => {
        reload();
      }
    });
  };

  const handleClosePopup = () => {
    if (!compareDataDifferent(oldFormData, formData)) {
      setConfirmParam(prevState => ({
        ...prevState, 
        textConfirm: '閉じる',
        isShowCancel: true,
        message: TEXT_CONFIRM_DATA_CHANGE,
        confirmAction: () => setIsPopupOpen(false),
        isOpen: true
      }));
    } else {
      setIsPopupOpen(false);
    }
  };

  const handleSaveData = async () => {
    let data = formData;
    const isValid = await formRef.current?.validateForm();
    if (!isValid) {
      return;
    }
    let saveData = {
      id: data.id,
      name: data.name,
      gana: data.gana,
      sex: data.sex,
      age: data.age,
      inquirySrc: {
        link: data.inquirySrcLink,
        name: data.inquirySrcName,
        phone: data.inquirySrcPhone,
        route: data.inquirySrcRoute,
        staff: data.inquirySrcStaff,
      },
      status: data.status,
      nextAction: data.nextAction,
      updatedAt: data.updatedAt,
    }
    doSave(saveData);
  };

  const doSave = (data: InquirySaveFormData) => {
    Post({
      apiPath: ApiPathSave,
      params: data,
      message: '問合わせ情報' + btnText + 'しました。',
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

  const handleCloseConfirm = () => {
    setConfirmParam(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };

  return (
    <SelectListProvider
      type={[
        'cust_status', 'req_route', 'relationship', 'cust_progres', 'support_plan_status', 'cust__home', 'hearing_step', 'pocket_book', 'car_char'
      ]}
    >
      <style>
        <InquiryCss />
      </style>

      <InquiryMainContext.Provider value={{ inquiryId: Number.parseInt(tgtData ?? '-1') }}>
        <div id="inquiry">
          <TableOpeButtons items={[
            { name: "追加", buttonType: ButtonType.Add, cb: handleOpenPopupCreate },
            { name: "編集", buttonType: ButtonType.Edit, cb: handleOpenPopupEdit, selectedState: tgtData },
            { name: "削除", buttonType: ButtonType.Del, cb: openDeletePopup, selectedState: tgtData },
          ] as ButtonProps[]} />
          <div id="inquiryTable"><InquiryTable cbSelect={chgTgtData} resetSelections={resetSelections} seq={seq} /></div>
          <div id="inquiryDetail"><InquiryDetail tgtId={tgtData} /></div>

          <Popup title={titleText} doText={btnText}
            isOpen={isPopupOpen}
            onClose={handleClosePopup} onOK={handleSaveData}
            contents={contentData} />
          <PopupConfirm
            param={confirmParam}
          />
        </div>
      </InquiryMainContext.Provider>
    </SelectListProvider>
  )
}
