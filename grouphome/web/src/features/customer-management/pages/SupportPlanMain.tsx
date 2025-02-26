import { createContext, useState, useRef } from 'react'
import { Row } from '@tanstack/react-table'
import { SupportPlanCss } from '../assets/SupportPlanCss'
import { SupportPlanTable } from '../components/supportPlan/SupportPlanTable'
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { SelectListProvider } from '../contexts/SelectListContext';
import { SupportPlanDetail } from '../components/supportPlan/detail/SupportPlanDetail';
import { Popup } from '@/components/elements/Popup';
import { SupportPlanDto } from '../types/SupportPlan';
import { SupportPlanForm } from '../components/supportPlan/form/SupportPlanForm';

import { MeetingForm } from '../components/supportPlan/forms/MeetingForm';
import formSchemaMeeting, { defaultValuesMeeting } from '@/features/customer-management/validator/tenant/MeetingFormSchema';

type SupportPlanMainContextType = {
  inquiryId: number | null;
  defaultValues: SupportPlanDto;
}

export const VERSION_TYPE = '1';
export const MEETING_TYPE = '2';

export const defaultValues: SupportPlanDto = {
  id: null,
  year: '2024',
  userName: '阿部達也',
  createDate: '20240802',
  name: 'AMANEKU平塚',
  userRequest: '',
  parentRequest: '',
  desiredLife: '',
  planFrom: '20240901',
  planTo: '20241231',

  dailyLife: '（日常生活）',
  job1: '',
  support1: '（日常生活支援）',
  frequency1: '常時',
  where1: 'GH',
  forWhom1: '本人支援員',
  comment1: '',
  priority1: '1',

  provideMeals: '（食事提供）',
  job2: '',
  support2: '（食事提供支援）',
  frequency2: '通所日',
  where2: 'GH',
  forWhom2: '本人支援員',
  comment2: '',
  priority2: '2',

  nursingCare: '（介護等）',
  job3: '',
  support3: '（介護等支援）',
  frequency3: '随時',
  where3: 'GH',
  forWhom3: '本人支援員',
  comment3: '',
  priority3: '3',

  supportDuringHospitalization: '入院時については、被服の準備や相談援助を行い日常生活上の支援を行うとともに、退院後の円滑な生活移行に向けた連絡調整を行う',
  supportWhenReturningCountry: '帰省の際には、都度必要に応じて、親族等との連絡調整や交通手段の確保のサポートを行う',
  medicalSupport1: '所属する看護師または訪問看護との連携により、日常的な健康管理を行い、他必要な支援を行っていく',
  medicalSupport2: '心身の健康上の理由でホーム外での生活が困難な場合については、支援員のサポートを受けながら日中生活を送る。また、通所又は就労等が困難な日については、支援員のサポートを受けながら日中生活を送る',
  nightSupport: '心身の状況の急変に備え、22時・0時・5時に居室内の様子確認やトイレの声掛け等を行うと共に、必要に応じて身体介助等を行っていく',
  independentLivingSupport: '退去が見込まれる場合には、退去後の居住の場の確保にむけた連絡調整や相談援助を行う',
  useHomeCare: '症状の急変他事情により居宅介護等の利用が必要な場合にあたっては、適切な事業者の選定及び日々の連絡調整等についてサポートする',
  regionalMigration: '担当者会議を通じた連絡調整により社会資源の有効活用を目指し、日中活動先の確保と安定した活動継続に向けた身の回り支援を行っていく',
};

export const SupportPlanMainContext = createContext<SupportPlanMainContextType>({ inquiryId: null, defaultValues: defaultValues });

export const SupportPlanMain = () => {
  const [tgtData, setTgtData] = useState<string | null>(null)
  const [rowData, setRowData] = useState<any>(null);
  const [seq, setSeq] = useState(0);
  const [resetSelections, setResetSelections] = useState(false);
  const [contentData, setContentData] = useState<JSX.Element>(<></>);
  const [titleText, setTitleText] = useState('');
  const [btnText, setBtnText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const formRef = useRef<any>(null);

  const chgTgtData = (row: Row<any>) => {
    setTgtData(row?.id);
    setRowData(row);
  }

  const handleBtnCancelClick = () => {
    setIsPopupOpen(false);
  };


  const handleAddClick = (type: string = '') => {
    if (type == VERSION_TYPE) {
      setContentData(
        <SupportPlanForm
          ref={formRef}
          onCancelClick={handleBtnCancelClick}
          defaultValues={defaultValues}
        />,
      );
      setTitleText('①支援計画');
    } else {
      setContentData(
        <MeetingForm ref={formRef} onCancelClick={handleBtnCancelClick} contents={defaultValuesMeeting} />,
      );
      setTitleText('担当者会議録');
    }
    setIsPopupOpen(true);
    setBtnText('更新');
  };

  return (
    <SelectListProvider
      type={[
        'pocket_book', 'req_route'
      ]}
    >
      <style>
        <SupportPlanCss />
      </style>

      <SupportPlanMainContext.Provider value={{ inquiryId: Number.parseInt(tgtData ?? '-1'), defaultValues }}>
        <div id="supportPlan">
          <TableOpeButtons items={[
            { name: "支援計画追加", buttonType: ButtonType.Add, cb: () => handleAddClick(VERSION_TYPE) },
            { name: "担当者会議録追加", buttonType: ButtonType.Add, cb:() => handleAddClick(MEETING_TYPE) },
            { name: "編集", buttonType: ButtonType.Edit },
            { name: "削除", buttonType: ButtonType.Del },
          ] as ButtonProps[]} />
          <div id="supportPlanTable">
            <SupportPlanTable cbSelect={chgTgtData} resetSelections={resetSelections} seq={seq} />
          </div>
          <div id="supportPlanDetail">
            <SupportPlanDetail tgtId={tgtData} />
          </div>
          <Popup
            title={titleText}
            doText={btnText}
            isOpen={isPopupOpen}
            contents={contentData}
            hideFooter={true}
            onClose={() => setIsPopupOpen(false)}
          />
        </div>
      </SupportPlanMainContext.Provider>

      <Popup
        title={titleText}
        doText={btnText}
        isOpen={isPopupOpen}
        contents={contentData}
        hideFooter={true}
        onClose={() => setIsPopupOpen(false)}
      />
    </SelectListProvider>
  )
}
