import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Tab as TabReact, TabList, TabPanel, Tabs as  TabsReact } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Tab as MedicalInsuranceTab} from './tabs/medicalInsurance/Tab';
import { Tab as NursingCareInsuranceTab} from './tabs/nursingCareInsurance/Tab';
import { Tab as StatusOfNotebookTab} from './tabs/statusOfNotebook/Tab';
import { Tab as BillingStatusTab} from './tabs/billingStatus/Tab';
import { Tab as DocumentStatusTab} from './tabs/documentStatus/Tab';
import { Tab as MoveinDocumentStatusTab} from './tabs/moveinDocumentStatus/Tab';
import { Tab as ApplicationStatusTab} from './tabs/applicationStatus/Tab';
import { Tab as MonitoringTab} from './tabs/monitoring/Tab';
import { Button } from '@/components/ui/ButtonCus';
import { Popup } from '@/components/elements/Popup';
import { Form as MedicalInsuranceForm } from './tabs/medicalInsurance/Form';
import { getUserAgent } from '@/utils/Helper';
import '../../../assets/TenantTab.css';
import { SaveBillingDto, CustomerCareDto, CustomerMedicalDto, SaveApplicationStatusDto, BillingResponseDto, ApplicationStatusResponseDto } from '@/features/customer-management/types/Tenant';
import { TenantMainContext } from '@/features/customer-management/pages/TenantMain';
import { Form as NursingCareInsuranceForm} from './tabs/nursingCareInsurance/Form';
import { SaveCustomerCareRequestDto } from '@/features/customer-management/validator/tenant/CustomerCareSchema';
import { SaveCustomerMedicalRequestDto } from '@/features/customer-management/validator/tenant/CustomerMedicalSchema';
import { FormDetail } from './tabs/billingStatus/FormDetail';
import { Form as ApplicationStatusForm} from './tabs/applicationStatus/Form';
import { SaveCustomerHandbookStatusRequestDto } from '@/features/customer-management/validator/tenant/CustomerHandbookStatusSchema';
import { Form as StatusOfNotebookForm} from './tabs/statusOfNotebook/Form';
import { Form as DocumentStatusForm} from './tabs/documentStatus/Form';
import { MonitoringDto, SaveCustomerDocumentStatusRequestDto } from '@/features/customer-management/validator/tenant/CustomerDocumentStatusSchema';
import { SaveCustomerMoveinDocumentStatusRequestDto } from '@/features/customer-management/validator/tenant/CustomerMoveinDocumentStatusSchema';
import { Form as MoveinDocumentStatusForm} from './tabs/moveinDocumentStatus/Form';

enum TAB_TYPE {
  INSURANCE_SERVICE = 0,
  NURSING_CARE_INSURANCE_SERVICE = 1,
  STATUS_OF_NOTEBOOK = 2,
  APPLICATION_STATUS = 3,
  DOCUMENT_STATUS = 4,
  MOVEIN_DOCUMENT_STATUS = 5,
  BILLING_STATUS_LIST = 6,
  MONITORING = 7
}

type TenantTabContextValue = {
  userAgent: string;
  medical: CustomerMedicalDto | null;
  setMedical: Dispatch<SetStateAction<CustomerMedicalDto | null>>;
  care: CustomerCareDto | null;
  setCare: Dispatch<SetStateAction<CustomerCareDto | null>>;
  setForm?: Dispatch<SetStateAction<JSX.Element>>;
  setIsPopupOpen?: Dispatch<SetStateAction<boolean>>;
  setTitle?: Dispatch<SetStateAction<string>>;
  handbook: SaveCustomerHandbookStatusRequestDto | null;
  setHandbook: Dispatch<SetStateAction<SaveCustomerHandbookStatusRequestDto | null>>;
  document: SaveCustomerDocumentStatusRequestDto | null;
  setDocument: Dispatch<SetStateAction<SaveCustomerDocumentStatusRequestDto | null>>;
  billingInfo: BillingResponseDto | null;
  setBillingInfo: Dispatch<SetStateAction<BillingResponseDto | null>>;
  applicationStatusInfo: ApplicationStatusResponseDto | null;
  setApplicationStatusInfo: Dispatch<SetStateAction<ApplicationStatusResponseDto | null>>;
  moveinDocument: SaveCustomerMoveinDocumentStatusRequestDto | null;
  setMoveinDocument: Dispatch<SetStateAction<SaveCustomerMoveinDocumentStatusRequestDto | null>>;
}

export const TenantTabContext = createContext<TenantTabContextValue>({
  userAgent: '',
  medical: null,
  setMedical: () => { },
  care: null,
  setCare: () => { },
  setForm: () => { },
  setIsPopupOpen: () => { },
  setTitle: () => { },
  handbook: null,
  setHandbook: () => { },
  document: null,
  setDocument: () => { },
  billingInfo: null,
  setBillingInfo: () => { },
  applicationStatusInfo: null,
  setApplicationStatusInfo: () => { },
  moveinDocument: null,
  setMoveinDocument: () => { },
});

type props = {
  defaultIndex?: number;
}

export const Tabs = ({ defaultIndex }: props) => {
  const [tabIndex, setTabIndex] = useState<number>(defaultIndex || 0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [form, setForm] = useState<JSX.Element>(<></>);
  const [userAgent, setUserAgent] = useState<string>('chrome');
  const { customerId } = useContext(TenantMainContext);
  const [title, setTitle] = useState<string>('');
  const [medical, setMedical] = useState<CustomerMedicalDto | null>(null);
  const [care, setCare] = useState<CustomerCareDto | null>(null);

  const [billingInfo, setBillingInfo] = useState<BillingResponseDto | null>(null)
  const [applicationStatusInfo, setApplicationStatusInfo] = useState<ApplicationStatusResponseDto | null>(null)

  const [handbook, setHandbook] = useState<SaveCustomerHandbookStatusRequestDto | null>(null);
  const [document, setDocument] = useState<SaveCustomerDocumentStatusRequestDto | null>(null);
  const [moveinDocument, setMoveinDocument] = useState<SaveCustomerMoveinDocumentStatusRequestDto | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const agent: string = getUserAgent(userAgent);
    setUserAgent(agent);
  }, []);

  const onAddClick = () => {
    setIsPopupOpen(true);
    let formData;
    switch (tabIndex) {
      case TAB_TYPE.INSURANCE_SERVICE:
        formData = {
          id: medical?.id,
          customerId: customerId || -1,
          insuranceTypeId: medical?.insuranceTypeId ?? undefined,
          number: medical?.number ?? undefined,
          updatedAt: medical?.updatedAt ?? undefined,
        } as SaveCustomerMedicalRequestDto;
        setTitle('医療保険サービス');
        setForm(<MedicalInsuranceForm formData={formData} onCancelClick={handlePopupClose} />);
        break;
      case TAB_TYPE.NURSING_CARE_INSURANCE_SERVICE:
        formData = {
          id: care?.id ?? undefined,
          customerId: customerId || -1,
          careNo: care?.careNo ?? undefined,
          careTypeId: care?.careTypeId ?? undefined,
          limit: care?.limit ?? undefined,
          updatedAt: care?.updatedAt ?? undefined,
        } as SaveCustomerCareRequestDto;
        setTitle('介護保険サービス');
        setForm(<NursingCareInsuranceForm formData={formData} onCancelClick={handlePopupClose} />);
        break;
      case TAB_TYPE.APPLICATION_STATUS:
        formData = {
          id: applicationStatusInfo?.id,
          customerId: customerId || -1,
          government: applicationStatusInfo?.government || '',
          nationalRentSubsidy: {
            specialBenefit: applicationStatusInfo?.nationalRentSubsidy?.specialBenefit ?? null,
            limit: applicationStatusInfo?.nationalRentSubsidy?.limit || '',
          },
          municipalRentSubsidy: {
            subject: applicationStatusInfo?.municipalRentSubsidy?.subject ?? null,
            requestAt: applicationStatusInfo?.municipalRentSubsidy?.requestAt || '',
            amount: applicationStatusInfo?.municipalRentSubsidy?.amount || null,
            memo: applicationStatusInfo?.municipalRentSubsidy?.memo || '',
          },
          individualMunicipality: {
            requestAt: applicationStatusInfo?.individualMunicipality?.requestAt || '',
            addition: applicationStatusInfo?.individualMunicipality?.addition || [],
            memo: applicationStatusInfo?.individualMunicipality?.memo || '',
          },
          lifeInsurancePension: {
            basic: applicationStatusInfo?.lifeInsurancePension?.basic ?? null,
            special: applicationStatusInfo?.lifeInsurancePension?.special ?? null,
            disabled: applicationStatusInfo?.lifeInsurancePension?.disabled ?? null,
          },
          personalLiability: {
            status: applicationStatusInfo?.personalLiability?.status || '',
            insuranceType: applicationStatusInfo?.personalLiability?.insuranceType || null,
            insuranceName: applicationStatusInfo?.personalLiability?.insuranceName || '',
            agency: applicationStatusInfo?.personalLiability?.agency || '',
            staff: applicationStatusInfo?.personalLiability?.staff || '',
            contact: applicationStatusInfo?.personalLiability?.contact || '',
          },
          updatedAt: applicationStatusInfo?.updatedAt,
        } as SaveApplicationStatusDto;
        setTitle('申請状況');
        setForm(<ApplicationStatusForm formData={formData} onCancelClick={handlePopupClose} />);
        break;
        
      case TAB_TYPE.BILLING_STATUS_LIST:
        formData = {
          id: billingInfo?.id,
          customerId: customerId || -1,
          movein1stAt: billingInfo?.movein1stAt || '',
          rpInputAt: billingInfo?.rpInputAt || '',
          originalRequestAt: billingInfo?.originalRequestAt || '',
          transfer1stAt: billingInfo?.transfer1stAt || '',
          remark: billingInfo?.remark || '',
          updatedAt: billingInfo?.updatedAt,

        } as SaveBillingDto;
        setTitle('請求状況一覧');
        setForm(<FormDetail formData={formData} onCancelClick={handlePopupClose} />);
        break;
      case TAB_TYPE.STATUS_OF_NOTEBOOK:
        formData = {
          id: handbook?.id ?? undefined,
          customerId: customerId || - 1,
          recipient: {
            no: handbook?.recipient?.no ?? undefined,
            certificateGH: handbook?.recipient?.certificateGH ?? undefined,
            limit: handbook?.recipient?.limit || null,
          },
          disabled: {
            category: handbook?.disabled?.category ?? undefined,
            limit: handbook?.disabled?.limit || null,
          },
          limit: {
            amount: handbook?.limit?.amount ?? undefined,
            limit: handbook?.limit?.limit || null,
          },
          visitingPlace: handbook?.visitingPlace ?? undefined,
          service: handbook?.service ?? undefined,
          handbookType: handbook?.handbookType ?? undefined,
          updatedAt: handbook?.updatedAt ?? undefined,
        } as SaveCustomerHandbookStatusRequestDto;
        setTitle('手帳等状況');
        setForm(<StatusOfNotebookForm formData={formData} onCancelClick={handlePopupClose} />);
        break;
      case TAB_TYPE.DOCUMENT_STATUS:
        formData = {
          id: document?.id ?? undefined,
          customerId: customerId || 0,
          tour: {
            apply: document?.tour?.apply ?? undefined,
            fileId: document?.tour?.fileId ?? undefined
          },
          assessment: {
            apply: document?.assessment?.apply ?? undefined,
            fileId: document?.assessment?.fileId ?? undefined
          },
          trial: {
            apply: document?.trial?.apply ?? undefined,
            fileId: document?.trial?.fileId ?? undefined
          },
          trialImportantExperience: {
            apply: document?.trialImportantExperience?.apply ?? undefined,
            fileId: document?.trialImportantExperience?.fileId ?? undefined
          },
          usageContract: {
            apply: document?.usageContract?.apply ?? undefined,
            fileId: document?.usageContract?.fileId ?? undefined
          },
          importantExperience: {
            apply: document?.importantExperience?.apply ?? undefined,
            fileId: document?.importantExperience?.fileId ?? undefined
          },
          plan: {
            apply: document?.plan?.apply ?? undefined,
            fileId: document?.plan?.fileId ?? undefined
          },
          monitoring: getMonitoring(document?.monitoring),
          updatedAt: document?.updatedAt || undefined,
        } as SaveCustomerDocumentStatusRequestDto;
        setTitle('書類状況');
        setForm(<DocumentStatusForm formData={formData} onCancelClick={handlePopupClose} />);
        break;
      case TAB_TYPE.MOVEIN_DOCUMENT_STATUS:
        formData = getMoveinDocumentStatusFormData();
        setTitle('書類状況(本入居)');
        setForm(<MoveinDocumentStatusForm formData={formData} onCancelClick={handlePopupClose} />);
        break;
      default:
        break;
    }
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  }

  const getMonitoring = (monitoring: MonitoringDto[] | null | undefined) => {
    if (!monitoring || !monitoring?.length) {
      return [{
        id: 1,
        apply: undefined,
        fileId: undefined,
      }]
    }

    return monitoring?.map((item, index) => {
      return {
        id: item.id || (index + 1),
        apply: item.apply ?? undefined,
        fileId: item.fileId ?? undefined,
      }
    })
  }

  const getMoveinDocumentStatusFormData = (): SaveCustomerMoveinDocumentStatusRequestDto => {
    return {
      id: moveinDocument?.id ?? undefined,
      customerId: customerId || -1,
      basic: {
        judge: moveinDocument?.basic?.judge ?? undefined,
        usage: {
          store: moveinDocument?.basic?.usage?.store ?? undefined,
          createdAt: moveinDocument?.basic?.usage?.createdAt || null,
          fileId: moveinDocument?.basic?.usage?.fileId ?? undefined,
        },
        faceSheet: {
          store: moveinDocument?.basic?.faceSheet?.store ?? undefined,
          createdAt: moveinDocument?.basic?.faceSheet?.createdAt || null,
          fileId: moveinDocument?.basic?.faceSheet?.fileId ?? undefined,
        },
        important: {
          store: moveinDocument?.basic?.important?.store ?? undefined,
          sign: moveinDocument?.basic?.important?.sign ?? undefined,
          createdAt: moveinDocument?.basic?.important?.createdAt || null,
          fileId: moveinDocument?.basic?.important?.fileId ?? undefined,
        },
        usageContract: {
          store: moveinDocument?.basic?.usageContract?.store ?? undefined,
          sign: moveinDocument?.basic?.usageContract?.sign ?? undefined,
          createdAt: moveinDocument?.basic?.usageContract?.createdAt || null,
          fileId: moveinDocument?.basic?.usageContract?.fileId ?? undefined,
        },
      },
      plan1st: {
        judge: moveinDocument?.plan1st?.judge ?? undefined,
        lastUpdatedAt: moveinDocument?.plan1st?.lastUpdatedAt || null,
        draft: {
          store: moveinDocument?.plan1st?.draft?.store ?? undefined,
          sign: moveinDocument?.plan1st?.draft?.sign ?? undefined,
          staff: moveinDocument?.plan1st?.draft?.staff ?? undefined,
          createdAt: moveinDocument?.plan1st?.draft?.createdAt || null,
          fileId: moveinDocument?.plan1st?.draft?.fileId ?? undefined,
        },
        meeting: {
          store: moveinDocument?.plan1st?.meeting?.store ?? undefined,
          writeCheck: moveinDocument?.plan1st?.meeting?.writeCheck ?? undefined,
          createdAt: moveinDocument?.plan1st?.meeting?.createdAt || null,
          fileId: moveinDocument?.plan1st?.meeting?.fileId ?? undefined,
        },
        main: {
          store: moveinDocument?.plan1st?.main?.store ?? undefined,
          sign: moveinDocument?.plan1st?.main?.sign ?? undefined,
          staff: moveinDocument?.plan1st?.main?.staff ?? undefined,
          createdAt: moveinDocument?.plan1st?.main?.createdAt || null,
          fileId: moveinDocument?.plan1st?.main?.fileId ?? undefined,
        },
      },
      memo: moveinDocument?.memo ?? undefined,
      updatedAt: moveinDocument?.updatedAt ?? undefined,
    };

  }

  if (!customerId) return (<></>);

  return (
    <TenantTabContext.Provider value={{
      userAgent: userAgent,
      medical: medical,
      setMedical: setMedical,
      care: care,
      setCare: setCare,
      setForm: setForm,
      setIsPopupOpen: setIsPopupOpen,
      setTitle: setTitle,
      handbook: handbook,
      setHandbook: setHandbook,
      document: document,
      setDocument: setDocument,
      billingInfo: billingInfo,
      setBillingInfo: setBillingInfo,
      applicationStatusInfo: applicationStatusInfo,
      setApplicationStatusInfo: setApplicationStatusInfo,
      moveinDocument: moveinDocument,
      setMoveinDocument: setMoveinDocument,
    }} >
      <div className={userAgent}>
        <TabsReact defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)} >
          <TabList>
            <TabReact><span className='text-xs xl:text-sm 2xl:text-base'>医療保険サービス</span></TabReact>
            <TabReact><span className='text-xs xl:text-sm 2xl:text-base'>介護保険サービス</span></TabReact>
            <TabReact><span className='text-xs xl:text-sm 2xl:text-base'>手帳等状況</span></TabReact>
            <TabReact><span className='text-xs xl:text-sm 2xl:text-base'>申請状況</span></TabReact>
            <TabReact><span className='text-xs xl:text-sm 2xl:text-base'>書類状況</span></TabReact>
            <TabReact><span className='text-xs xl:text-sm 2xl:text-base'>書類状況(本入居)</span></TabReact>
            <TabReact><span className='text-xs xl:text-sm 2xl:text-base'>請求状況一覧</span></TabReact>
            <TabReact><span className='text-xs xl:text-sm 2xl:text-base'>モニタリング</span></TabReact>
          </TabList>

          <TabPanel>
            <div className={'border-x border-b border-gray-400 text-xs xl:text-sm 2xl:text-base -mt-[10px]'}>
              <div className='flex p-2 justify-between'>
                <div className='text-nowrap'>※訪問看護・訪問診療等</div>
                <Button onClick={onAddClick} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
              </div>
              <div>
                <MedicalInsuranceTab />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={'border-x border-b border-gray-400 text-xs xl:text-sm 2xl:text-base -mt-[10px]'}>
              <div className='flex p-2 justify-end'>
                <Button onClick={onAddClick} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
              </div>
              <NursingCareInsuranceTab />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={'border-x border-b border-gray-400 text-xs xl:text-sm 2xl:text-base -mt-[10px]'}>
              <div className='flex p-2 justify-end mt-2'>
                <Button onClick={onAddClick} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
              </div>
              <StatusOfNotebookTab />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={'border-x border-b border-gray-400 text-xs xl:text-sm 2xl:text-base -mt-[10px]'}>
              <div className='flex p-2 justify-end'>
                <Button onClick={onAddClick} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
              </div>
              <ApplicationStatusTab />
            </div>

          </TabPanel>
          <TabPanel>
            <div className='border-x border-b border-gray-400 text-xs xl:text-sm 2xl:text-base -mt-[10px]'>
              <div className='flex p-2 justify-end mt-2'>
                <Button onClick={onAddClick} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
              </div>
              <DocumentStatusTab />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='border-x border-b border-gray-400 text-xs xl:text-sm 2xl:text-base -mt-[10px]'>
              <div className='flex p-2 justify-end mt-2'>
                <Button onClick={onAddClick} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
              </div>
              <MoveinDocumentStatusTab />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={'border-x border-b border-gray-400 text-xs xl:text-sm 2xl:text-base -mt-[10px]'}>
              <div className='flex p-2 justify-end'>
                <Button onClick={onAddClick} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
              </div>
              <BillingStatusTab />
            </div>
          </TabPanel>
          <TabPanel>
            <div className='border-x border-b border-gray-400 text-xs xl:text-sm 2xl:text-base -mt-[10px]'>
              <MonitoringTab />
            </div>
          </TabPanel>
        </TabsReact>

        <Popup
          title={title}
          doText={""}
          isOpen={isPopupOpen}
          contents={form}
          hideFooter={true}
          onClose={() => setIsPopupOpen(false)}
        />
      </div>
    </TenantTabContext.Provider>
  )
}
