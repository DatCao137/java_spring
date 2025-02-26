import { useEffect, useState } from 'react';

import { CommonItem } from '@/components/elements/common/CommonItem';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { Button } from '@/components/ui/button';
import { StructureDto } from '../../types/Structure';
import { Popup } from '@/components/elements/Popup';
import { CreateOrEditPopup } from './StructureCreateOrEdit';
import { Structure as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { TEXT_CONFIRM_DATA_CHANGE } from '@/features/blc-common/assets/StringConst';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';

type ArgsData = {
  branchId: number | null;
  loadParentData?: () => void;
};

function Structure({ branchId, loadParentData }: ArgsData) {
  const [titleText, setTitleText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [data, setData] = useState<StructureDto>();
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: '閉じる',
    message: '',
    isShowCancel: true,
    confirmAction: () => {},
    onClose: () => handleCloseConfirm()
  });


  if (branchId == null) {
    return <></>;
  }

  const TRAINING_MAP = [{ type: 'basic', text: '基礎研修' }
    , { type: 'update', text: '更新研修' }];
  const getTrainingType = (val?: string) => {
    if (!val) return '';
    let ret = TRAINING_MAP.filter((item) => item.type == val);
    return ret.length == 0 ? '' : ret[0].text;
  }

  const getDetailPersonStructure = async () => {
    Post({
      apiPath: ApiPath,
      params: { branchId: branchId },
      onSuccess: (res) => {
        setData(res.data.data);
      },
      onError: (err) => {
        console.error('Error fetching data: ', err);
        setData(undefined);
      }
    });
  };


  useEffect(() => {
    getDetailPersonStructure();
  }, [branchId]);

  const onClose = () => {
    getDetailPersonStructure();
    closePopup();
  }

  const handleCloseConfirm = () => {
    setConfirmParam(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };

  const handleOpenPopupUpdate = () => {
    setTitleText("人員体制");
    setBtnText("保存");
    setIsPopupOpen(true)
  };

  const handleClosePopup = (isNonCheck: boolean = false) => {
    if (!isNonCheck && isUpdate) {
      setConfirmParam(prevState => ({
        ...prevState,
        textConfirm: '閉じる',
        isShowCancel: true,
        message: TEXT_CONFIRM_DATA_CHANGE,
        confirmAction: () => onClose(),
        isOpen: true
      }));
    } else {
      onClose();
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  }

  const contentData = <CreateOrEditPopup id={data?.id} branchId={branchId} onClose={handleClosePopup} isUpdated={setIsUpdate}/>;

  const ServiceMng1 = () => (
    <>
      <div className="service-line">
        <p>{data?.service1Name ? data.service1Name : ''}</p>
        <p>{getTrainingType(data?.training1Type)}</p>
        <p>{data?.training1Impl ? data.training1Impl : ''}</p>
        <p>期限</p>
        <p>{data?.training1Limit ? data.training1Limit : ''}</p>
      </div>
    </>
  );

  const ServiceMng2 = () => (
    <>
      <div className="service-line">
        <p>{data?.service2Name ? data.service2Name : ''}</p>
        <p>{getTrainingType(data?.training2Type)}</p>
        <p>{data?.training2Impl ? data.training2Impl : ''}</p>
        <p>期限</p>
        <p>{data?.training2Limit ? data.training2Limit : ''}</p>
      </div>
    </>
  );

  const Visiting = () => (
    <div className="service-line">
      <p>{(data?.visitingAmount ?? 0) == 0 ? 'なし' : 'あり'}</p>
      <p>{data?.visitingAmount} 名分</p>
    </div>
  )

  const args = [
    { title: { label: '管理者' }, val: { val: data?.managerName ?? "" } },
    { title: { label: 'サービス管理責任者①' }, val: { val: <ServiceMng1 /> } },
    { title: { label: 'サービス管理責任者②' }, val: { val: <ServiceMng2 /> } },
    { title: { label: '常勤生活支援員' }, val: { val: data?.supporter ?? "" } },
    { title: { label: '常勤福祉士' }, val: { val: data?.welfare ?? "" } },
    { title: { label: '正看護師数' }, val: { val: (data?.nurseAmount ?? 0)+"人" } },
    { title: { label: '正看護師名' }, val: { val: data?.nurse ?? "" } },
    { title: { label: '訪看契約' }, val: { val: <Visiting /> } },
  ];


  return (
    <>
      <div className='structureInfo'>
        <div className='text-right'>
          <Button className="btn-style" onClick={handleOpenPopupUpdate}>編集</Button>
        </div>
        <div className="person-line">
          {args?.map((item, index) => {
            return <CommonItem key={index} title={item.title} val={item.val} />;
          })}
        </div>
      </div>

      <Popup title={titleText} doText={btnText}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        hideFooter={true}
        contents={contentData} />
      <PopupConfirm param={confirmParam} />

    </>
  );
}

export { Structure };
