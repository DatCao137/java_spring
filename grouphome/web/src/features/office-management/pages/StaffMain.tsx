import { useState, useRef } from 'react';
import { StaffCss } from '../assets/StaffCss';
import { StaffTable } from '../components/staff/StaffTable';
import { StaffDetail } from '../components/staff/StaffDetail';
import { SavePopup } from '../components/staff/StaffSave';
import { Popup } from '@/components/elements/Popup';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import { StaffDetailFormData, StaffSaveFormData, StaffSaveQualificationFormData } from '../types/Staff';
import { TableFilterDef } from '../components/staff/StaffTableDef';
import { defaultFilter } from '../components/staff/StaffTable';
import { StaffSave, StaffSaveQualification } from '@/features/blc-common/assets/ApiPath';
import { PopupConfirmParams } from '@/components/elements/Common';
import { SaveQualificationPopup } from '../components/staff/StaffSaveQualification';

const defaultFormData: StaffDetailFormData = {
  id: null,
  nameSei: '',
  nameMei: '',
  kanaSei: '',
  kanaMei: '',
  birthDay: '',
  age: 0,
  sex: '',
  businessNameSei: '',
  businessNameMei: '',
  businessNameKanaSei: '',
  businessNameKanaMei: '',
  mail: '',
  employeeNo: '',
  branchNames: '',
  homeNames: '',
  unitNames: '',
  businessContent: '',
  occupationId: 0,
  occupation: null,
  employeeType: '',
  paymentForm: '',
  grade: '',
  positioning: [],
  enrollmentStatus: '',
  joinAt: '',
  enrollmentPeriod: '',
  leaveAt: '',
  leaveReason: '',
  address: {
    postNo: '',
    pref: '',
    city: '',
    town: '',
    postNo1st: '',
    postNo2nd: '',
    prefId: ''
  },
  building: '',
  tel: '',
  holder: '',
  relationship: '',
  residentAddress: {
    postNo: '',
    pref: '',
    city: '',
    town: '',
    postNo1st: '',
    postNo2nd: '',
    prefId: ''
  },
  residentBuilding: '',
  residentTel: '',
  residentHolder: '',
  residentRelationship: '',
  emergencyNameSei: '',
  emergencyNameMei: '',
  emergencyNameKanaSei: '',
  emergencyNameKanaMei: '',
  emergencyRelationship: '',
  emergencyTel: '',
  emergencyBuilding: '',
  emergencyAddress: {
    postNo: '',
    pref: '',
    city: '',
    town: '',
    postNo1st: '',
    postNo2nd: '',
    prefId: ''
  },
  contractType: '',
  contractStartAt: '',
  contractEndAt: '',
  contractRenewalType: '',
  remainingSei: '',
  remainingMei: '',
  remainingMiddleName: '',
  remainingNo: '',
  remainingNationality: '',
  remainingStatus: '',
  remainingLimitAt: '',
  remainingPermission: false,
  remainingClass: '',
  twinsMore: false,
  scheduledBirthAt: '',
  birthAt: null,
  prenatalStartAt: null,
  postpartumEndAt: null,
  childcareStartAt: null,
  childcareEndAt: null,
  plannedReturnAt: null,
  usePlus: false,
  paymentFormId: null,
  gradeId: null,
  contractTypeId: null,
  contractRenewalTypeId: null,
  remainingNationalityId: null,
  remainingStatusId: null,
  remainingClassId: null,
  employeeTypeId: null,
  enrollmentStatusId: null,
  updatedAt: '',
  qualification: []
};

export const StaffMain = () => {
  const pageTitle = '職員情報';
  const [tgtId, setTgtId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupQualificationOpen, setIsPopupQualificationOpen] = useState(false);
  const [formData, setFormData] = useState<StaffDetailFormData>(defaultFormData);
  const [seq, setSeq] = useState(0);
  const [titleText, setTitleText] = useState('');
  const [btnText, setBtnText] = useState('');
  const [rowData, setRowData] = useState<any>(null);
  const formRef = useRef<any>(null);
  const contentData = <SavePopup ref={formRef} formData={formData} setFormData={setFormData} />;
  const contentQualificationData = <SaveQualificationPopup ref={formRef} formData={formData} setFormData={setFormData} />;
  const [resetSelections, setResetSelections] = useState(false);
  const [filter, setFilter] = useState<TableFilterDef>(defaultFilter);

  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: 'OK',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const chgTgtId = (row: StaffDetailFormData): void => {
    if (row) {
      setRowData(row);
      setTgtId(row.id);
    }
  };

  const reload = async () => {
    setRowData(null);
    setTgtId(null);
    setSeq(seq + 1);
  };

  const reloadButKeepDetailShow = async () => {
    setResetSelections(false);
    setSeq(seq + 1);
  };

  const handleOpenPopupEdit = () => {
    setTitleText(pageTitle + '(編集)');
    setBtnText('更新');
    setIsPopupOpen(true);
  };

  const handleOpenPopupEditQualification = () => {
    setTitleText(pageTitle + '(編集)');
    setBtnText('更新');
    setIsPopupQualificationOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCloseQualificationPopup = () => {
    setIsPopupQualificationOpen(false);
  };

  const handleCloseConfirm = () => {
    setConfirmParam(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };

  const handleSaveData = async () => {
    const isValid = await formRef.current?.validateForm();

    if (!isValid) {
      return;
    }

    const saveFormData = {
      id: formData.id,
      branchNames: formData.branchNames,
      homeNames: formData.homeNames,
      unitNames: formData.unitNames,
      updatedAt: formData.updatedAt
    } as StaffSaveFormData;

    doSave(saveFormData);
  };

  const doSave = (data: StaffSaveFormData) => {
    Post({
      apiPath: StaffSave,
      params: data,
      message: `職員情報を${btnText}しました。`,
      errMessage: `${btnText}に失敗しました。`,
      onSuccess: (res) => {
        setIsPopupOpen(false);
        if (data.id) {
          reloadButKeepDetailShow();
        } else {
          reload();
        }
      }
    });
  };

  const handleSaveQualificationData = async () => {
    const isValid = await formRef.current?.validateForm();

    if (!isValid) {
      return;
    }

    // Filter out empty qualification and order by id
    const saveQualification = formData.qualification
      .sort((a, b) => (a.qualificationId > b.qualificationId ? 1 : -1)) // Sort by qualificationId
      .filter((qualification) => (qualification.hold !== null && qualification.qualificationType != 'etc') || qualification.etcName) // Filter the qualifications
      .map((qualification) => {
        if (qualification.etcName) {
          return { ...qualification, hold: true };
        }
        return qualification;
      });

    const saveFormData = {
      id: formData.id,
      qualification: saveQualification,
      updatedAt: formData.updatedAt
    } as StaffSaveQualificationFormData;

    doSaveQualification(saveFormData);
  };

  const doSaveQualification = (data: StaffSaveQualificationFormData) => {
    Post({
      apiPath: StaffSaveQualification,
      params: data,
      message: `職員情報を${btnText}しました。`,
      errMessage: `${btnText}に失敗しました。`,
      onSuccess: (res) => {
        setIsPopupQualificationOpen(false);
        if (data.id) {
          reloadButKeepDetailShow();
        } else {
          reload();
        }
      }
    });
  };

  return (
    <>
      <style>
        <StaffCss />
      </style>
      <div id="staff">
        <div id="staffList"><StaffTable cbSelect={chgTgtId} seq={seq} filter={filter} resetSelections={resetSelections} /></div>
        {tgtId && (
          <div id="staffDetail">
            <StaffDetail tgtId={tgtId} seq={seq} cbLoaded={setFormData} onEditBasic={handleOpenPopupEdit} onEditQualification={handleOpenPopupEditQualification} />
          </div>
        )}
        <Popup
          title={titleText}
          doText={btnText}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onOK={handleSaveData}
          contents={contentData}
        />
        <Popup
          title={titleText}
          doText={btnText}
          isOpen={isPopupQualificationOpen}
          onClose={handleCloseQualificationPopup}
          onOK={handleSaveQualificationData}
          contents={contentQualificationData}
        />
        <PopupConfirm
          param={confirmParam}
        />
      </div>
    </>
  );
};