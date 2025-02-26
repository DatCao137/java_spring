import { useState, useEffect, useRef } from 'react';

import { UnitInfoCss } from '../../assets/UnitInfoCss'
import { RoomTable } from './RoomTable'
import { Button } from '@/components/ui/button';
import { FormDataType } from '../../types/OfficeRoom'
import {
  OfficeRoomSave as SaveApiPath,
  OfficeRoomDelete as DeleteApiPath,
} from '@/features/blc-common/assets/ApiPath';
import { CreateOrEditPopup } from './RoomCreateOrEdit'
import { Popup } from '@/components/elements/Popup'
import { PopupConfirm } from '@/components/elements/PopupConfirm'
import { PopupConfirmParams } from '@/components/elements/Common';
import { Post, Del } from '@/features/blc-common/utils/ServerRequest';
import { checkDataDifferent } from '@/components/elements/common/CommonUtils';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';

type ArgsData = {
  unitId: number | null;
};

const defaultFormData: FormDataType = {
  id: null,
  unitId: null,
  name: '',
  contents: {
    basic: {
      fee: null
    },
    remark: ''
  },
  fee: null,
  remark: '',
  updatedAt: null
};

function RoomInfo({ unitId }: ArgsData) {
  const [resetSelections, setResetSelections] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [formData, setFormData] = useState<FormDataType>(defaultFormData);
  const [oldFormData, setOldFormData] = useState<FormDataType>(defaultFormData);
  const formRef = useRef<any>(null);
  const [rowData, setRowData] = useState<any>(null);
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: '',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });
  const [seq, setSeq] = useState(0);

  const handleOpenPopupCreate = () => {
    setFormData(defaultFormData);
    setOldFormData(defaultFormData);
    setIsPopupOpen(true)
    setTitleText('居室情報(追加)');
    setBtnText('保存');
    setResetSelections(true);
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

  const handleSaveData = async () => {
    var data = formData
    data['unitId'] = unitId
    const cleanedValueFee = formData?.fee?.toString().replace(/[￥,]/g, '') ?? '';
    formData.fee = parseInt(cleanedValueFee)
    data['contents'] = {
      basic: {
        fee: formData.fee
      },
      remark: formData.remark
    }

    const isValid = await formRef.current?.validateForm();
    if (!isValid) {
      return;
    }

    Post({
      apiPath: SaveApiPath,
      params: data,
      message: '事業所情報を' + btnText + 'しました。',
      onSuccess: (res) => {
        closePopup();
        reload();
      }
    });
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  }

  const chgTgtData = (row: FormData): void => {
    setRowData(row);
  };

  const handleOpenPopupEdit = () => {
    setFormData(rowData);
    setOldFormData(rowData);
    setTitleText('居室情報(編集)');
    setBtnText('更新');
    setIsPopupOpen(true);
  };

  const openDeletePopup = () => {
    setConfirmParam(prevState => ({
      ...prevState,
      textConfirm: 'OK',
      isShowCancel: true,
      message: '選択したホーム(' + rowData.name + ')を削除しますか？',
      confirmAction: () => deleteItem(),
      isOpen: true
    }));
  };

  const deleteItem = async () => {
    Del({
      apiPath: DeleteApiPath + '/' + rowData?.id,
      params: {}});
    closePopup();
    reload();
    setResetSelections(true);
  };

  const handleCloseConfirm = () => {
    setConfirmParam(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };

  const reload = async () => {
    setRowData(null);
    setSeq(seq + 1)
  }

  const contentData = <CreateOrEditPopup ref={formRef} formData={formData} setFormData={setFormData} />;

  return (
    <>
      <style>
        <UnitInfoCss />
      </style>

      <div className='text-right'>
        <Button className="btn-style" onClick={handleOpenPopupCreate} disabled={!unitId}>追加</Button>
        <Button className="btn-style" onClick={handleOpenPopupEdit} disabled={!unitId || rowData?.id == null}>編集</Button>
        <Button className="btn-style" onClick={openDeletePopup} disabled={!unitId || rowData?.id == null}>削除</Button>
      </div>
      <div className='roomList'>
        <RoomTable cbSelect={chgTgtData} seq={seq} resetSelections={resetSelections} unitId={unitId} />
      </div>

      <Popup
          title={titleText} doText={btnText}
          isOpen={isPopupOpen}
          onClose={handleClosePopup} onOK={handleSaveData}
          contents={contentData} />

      <PopupConfirm
          param={confirmParam} />
    </>
  );
}

export { RoomInfo };
