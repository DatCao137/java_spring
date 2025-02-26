import { useEffect, useRef, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Popup } from '@/components/elements/Popup';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { SelectListProvider } from '@/features/customer-management/contexts/SelectListContext';
import { Post, Del } from '@/features/blc-common/utils/ServerRequest';

import { RequestCss } from '../assets/RequestCss';
import { EXPENSES_TYPE, RequestMoveInForm } from '../components/request/forms/RequestMoveInForm';
import { RequestVisitForm } from '../components/request/forms/RequestVisitForm';
import { RequestDetailHope } from '../components/request/RequestDetailHope';
import { RequestTable } from '../components/request/RequestTable';

import 'react-toastify/dist/ReactToastify.css';
import { jsonParse } from '@/utils/JsonUtils';
import { contentVisitDefault } from '../components/request/RequestInfoDetailVisit';
import { deepMerge } from '@/utils/Helper';
import { contentMoveInDefault } from '../components/request/RequestInfoDetailMoveIn';
import { ContentMoveIn, ContentVisit } from '../types/Request';
import { Select as ApiPathSelect } from '@/features/blc-common/assets/ApiPath';
import { PopupConfirmParams } from '@/components/elements/Common';
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';

type RequestTypeOption = {
  name: string;
  value: string;
};

export const VISIT_TYPE = 'VISIT';
export const MOVEIN_TYPE = 'MOVEIN';

export const selectRequestTypeOptions: RequestTypeOption[] = [
  {
    name: '入居・追加',
    value: MOVEIN_TYPE,
  },
  {
    name: '見学・体験　追加',
    value: VISIT_TYPE,
  },
];

export const RequestMain = () => {
  const [tgtData, setTgtData] = useState<string | null>(null);
  const [doMovein, setDoMovein] = useState<string | null>(null);
  const [requestInfo, setRequestInfo] = useState<any>({});
  const [seq, setSeq] = useState(0);
  const [requestType, setRequestType] = useState<string>(VISIT_TYPE);
  const [titleText, setTitleText] = useState('');
  const [btnText, setBtnText] = useState('');
  const [requestInfoDetail, setRequestInfoDetail] = useState<any>(null);
  const [contentData, setContentData] = useState<JSX.Element>(<></>);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: 'OK',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });
  const [redirect, setRedirect] = useState<string|undefined>(undefined);

  const formRef = useRef<any>(null);

  const apiMoveInRequestPath = '/api/request/gomovein';
  const apiDeleteRequestPath = '/api/request/delete/';

  const chgTgtData = (row: any) => {
    setTgtData(row.requestInfoDetailId);
    setRequestInfo(row);
  };

  useEffect(() => {
    setDoMovein(requestInfo.requestType == '入居' ? tgtData : null);
  }, [ tgtData ]);

  useEffect(() => {
    setRequestType(requestInfoDetail?.requestType?.toUpperCase() || VISIT_TYPE);
  }, [requestInfoDetail?.requestType]);

  const openDeletePopup = () => {
    setConfirmParam(prevState => ({
      ...prevState, 
      message: '選択した項目(' + requestInfo.id + ')を削除しますか？',

      confirmAction: () => deleteRequest(),
      isOpen: true,
    }));
  };

  const deleteRequest = async () => {
    Del({
      apiPath: `${apiDeleteRequestPath}${requestInfo.id}`,
      params: {},
      onSuccess: (res) => { reload(); }
    });
  };

  const checkGoMoveinPopup = () => {
    if(requestInfo.customerId == null) {
      setConfirmParam(prevState => ({
        ...prevState, 
        message: '選択した項目(' + requestInfo.id + ')の入居手続きを開始しますか？',

        confirmAction: () => doMoveinRequest(),
        isOpen: true,
      }));
    } else {
      setConfirmParam(prevState => ({
        ...prevState, 
        message: `選択した項目(${requestInfo.id})の入居手続きは開始しています。
                  入居者情報管理のページへ移動しますか?`,
        confirmAction: () => setRedirect('/app/tenant'),
        isOpen: true,
      }));
    }
  }

  const doMoveinRequest = async() => {
    Post({
      apiPath: `${apiMoveInRequestPath}`,
      params: { id: requestInfo.id, updatedAt: requestInfoDetail.infoUpdatedAt },
      onSuccess: (res) => { setRedirect('/app/tenant') }
    });
  }

  const reload = async () => {
    setRequestInfo({});
    setRequestInfoDetail(null);
    setTgtData(null);
    setSeq(seq + 1);
  };

  const handleAddClick = (type: string = 'VISIT') => {
    if (type == VISIT_TYPE) {
      setContentData(
        <RequestVisitForm ref={formRef} onCancelClick={handleBtnCancelClick} contents={contentVisitDefault} />,
      );
      setTitleText('見学・体験');
    } else {
      setContentData(
        <RequestMoveInForm
          ref={formRef}
          onCancelClick={handleBtnCancelClick}
          contents={contentMoveInDefault}
        />,
      );
      setTitleText('入居申込書兼フェイスシート');
    }
    setIsPopupOpen(true);
    setBtnText('更新');
  };

  const getContents = <T extends object>(defaultValues: T): T => {
    const contents = jsonParse<T>(
      'contents',
      requestInfoDetail?.contents,
      defaultValues
    );

    return deepMerge(defaultValues, contents);
  };

  const handleOpenPopupEdit = async () => {
    const data = {
      requestInfo,
      requestInfoDetail,
    };
    if (requestType == VISIT_TYPE) {
      let contents = getContents<ContentVisit>(contentVisitDefault);
      const pocketbook = contents.base.disability.pocketbook;
      const { visiting, attached } = contents.base;
      pocketbook.contents = pocketbook.has ? pocketbook.contents : '';
      visiting.contents = visiting.has ? visiting.contents : '';
      attached.contents = attached.has ? attached.contents : '';

      Post({
        apiPath: ApiPathSelect,
        params: { type: ['hope_items'] },
        onSuccess: (res) => {
          const hopeItems = res.data['hope_items']?.map((item: any) => ({
            name: item.name,
            value: item.value,
          })) || [];
          const hope = hopeItems.find((item: any) => contents.base.hopeItems.includes(item.value) && item.name === 'その他');
          contents.base.hopeOther = hope ? contents.base.hopeOther : '';
        }
      });

      setContentData(
        <RequestVisitForm
          ref={formRef}
          onCancelClick={handleBtnCancelClick}
          data={data}
          contents={contents}
        />,
      );
      setTitleText('見学・体験');
    } else {
      let contents = getContents<ContentMoveIn>(contentMoveInDefault);
      contents.insurance.limit = contents.insurance.limit || null;
      contents.underwriter.name = contents.underwriter.has ? contents.underwriter.name : '';
      contents.successor.name = contents.successor.has ? contents.successor.name : '';
      contents.physicalInfo.lifestyle.contents = contents.physicalInfo.lifestyle.has ? contents.physicalInfo.lifestyle.contents : '';
      contents.insurance.expenses.limit = EXPENSES_TYPE.findIndex((item) => item.value == contents.insurance.expenses.type && item.name == '自立支援医療') > -1 ? contents.insurance.expenses.limit : null;

      const { physical, treatment, mental } = contents.book;
      const { needSupport, medication, care, place } = contents.situation;
      const { pension, pensionOther, welfare, familyAssist, others, working } = contents.income;

      physical.degree = physical.has ? physical.degree : '';
      treatment.degree = treatment.has ? treatment.degree : '';
      mental.degree = mental.has ? mental.degree : '';
      needSupport.contents = needSupport.has ? needSupport.contents : '';
      medication.contents = medication.has ? medication.contents : '';
      care.contents = care.has ? care.contents : '';
      place.contents = place.has ? place.contents : '';
      pension.amount = pension.available ? pension.amount : '';
      pensionOther.amount = pensionOther.available ? pensionOther.amount : '';
      welfare.amount = welfare.available ? welfare.amount : '';
      familyAssist.amount = familyAssist.available ? familyAssist.amount : '';
      others.amount = others.available ? others.amount : '';
      others.name = others.available ? others.name : '';
      working.amount = working.available ? working.amount : '';

      Post({
        apiPath: ApiPathSelect,
        params: { type: ['request_type', 'health_insurance', 'transfer_type'] },
        onSuccess: (res) => {
          const requests = res.data['request_type']?.map((item: any) => ({
            name: item.name,
            value: item.value,
          })) || [];
          const request = requests.find((item: any) => contents.requirements.items?.includes(item.value) && item.name == 'その他');
          contents.requirements.contents = request ? contents.requirements.contents : '';

          const healthInsuranceList = res.data['health_insurance']?.map((item: any) => ({
            name: item.name,
            value: item.value
          })) || [];

          const healthInsurance = healthInsuranceList.find((item: any) => contents.insurance.type.type == item.value && item.name == 'その他');
          contents.insurance.type.contents = healthInsurance ? contents.insurance.type.contents : '';

          const transferTypes = res.data['transfer_type']?.map((item: any) => ({
            name: item.name,
            value: item.value
          })) || [];

          const transferType = transferTypes.find((item: any) => contents.situation.transfer.transferType == item.value && item.name == 'その他');
          contents.situation.transfer.contents = transferType ? contents.situation.transfer.contents : '';
        }
      });

      setContentData(
        <RequestMoveInForm
          ref={formRef}
          onCancelClick={handleBtnCancelClick}
          data={data}
          contents={contents}
        />,
      );
      setTitleText('入居申込書兼フェイスシート');
    }
    setBtnText('更新');
    setIsPopupOpen(true);
  };

  const handleBtnCancelClick = () => {
    setIsPopupOpen(false);
    reload();
  };

  const handleCloseConfirm = () => {
    setConfirmParam(prevState => ({
      ...prevState, 
      isOpen: false
    }));
  };

  if(redirect)
    return (<Navigate replace to={redirect} />)
  return (
    <SelectListProvider
      type={[
        'hope_items',
        'sex',
        'pocket_book',
        'health_insurance',
        'weeks',
        'money_management',
        'request_type',
        'phone_type',
        'support_type',
        'transfer_type',
        'transportation_type',
        'relationship',
        'attendant_attr',
        'physical_grade',
        'mental_grade',
        'prefectures',
      ]}
    >
      <style>
        <RequestCss />
      </style>
      <div id="request">
        <TableOpeButtons items={[
            { name: "見学・体験 追加", buttonType: ButtonType.Add, cb:() => handleAddClick(VISIT_TYPE)},
            { name: "入居 追加", buttonType: ButtonType.Add, cb:() => handleAddClick(MOVEIN_TYPE)},
            { name: "編集", buttonType: ButtonType.Edit, cb:handleOpenPopupEdit, selectedState:tgtData},
            { name: "削除", buttonType: ButtonType.Del, cb:openDeletePopup, selectedState:tgtData},
            { name: "入居手続き開始", buttonType: ButtonType.Other, cb:checkGoMoveinPopup, selectedState:doMovein}
          ] as ButtonProps[]} />
        
        <div id="requestTable">
          <RequestTable cbSelect={chgTgtData} seq={seq} />
        </div>
        <div id="requestDetail">
          <RequestDetailHope
            tgtId={tgtData}
            requestInfo={requestInfo}
            setRequestInfoDetail={setRequestInfoDetail}
          />
        </div>
      </div>
      <Popup
        title={titleText}
        doText={btnText}
        isOpen={isPopupOpen}
        contents={contentData}
        hideFooter={true}
        onClose={() => setIsPopupOpen(false)}
      />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <PopupConfirm
        param={confirmParam}
      />
    </SelectListProvider>
  );
};
