import { createContext, useEffect, useState } from 'react'
import { TenantTable } from '../components/tenant/TenantTable';
import { SelectListProvider } from '../contexts/SelectListContext';
import { Details } from '@/features/customer-management/components/tenant/details/Details';
import { CustomerForm } from '@/features/customer-management/components/tenant/details/tabs/common/CustomerForm';
import { Popup } from '@/components/elements/Popup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormData, TenantDetailResponseDto, TenantListResponseDto } from '../types/Tenant';
import { defaultFormData } from '../data/tenant';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { Get, Del } from '@/features/blc-common/utils/ServerRequest';
import { Tenant, TenantDelete } from '@/features/blc-common/assets/ApiPath';
import { ButtonProps, ButtonType, TableOpeButtons } from '@/components/elements/TableOpeButtons';
import { TenantCss } from '../assets/TenantCss';
import { RoomChoice } from '@/features/blc-common/components/RoomChoice';


type TenantMainContextType = {
  detailBasic: TenantDetailResponseDto | null;
  setDetailBasic: React.Dispatch<React.SetStateAction<TenantDetailResponseDto | null>> | undefined;
  customerId: number | null;
}
export const TenantMainContext = createContext<TenantMainContextType>({ detailBasic: null, setDetailBasic: undefined, customerId: null });

export const TenantMain = () => {
  const [tgtData, setTgtData] = useState<string | null>(null)
  const [seq, setSeq] = useState(0);
  const [popupTitle, setPopupTitle] = useState<string>("基本情報");
  const [form, setForm] = useState<JSX.Element>(<></>);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [detailBasic, setDetailBasic] = useState<TenantDetailResponseDto | null>(null)
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: 'OK',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const chgTgtData = async (row: TenantListResponseDto) => {
    if (row && tgtData == row.id.toString()) {
      setTgtData(null);
      setDetailBasic(null);
      setSeq(seq + 1);
    } else {
      setTgtData(row?.id?.toString());
      Get({
        apiPath: `${Tenant}/${row?.id || -1}`,
        params: {},
        onSuccess: (res) => {
          setDetailBasic({ ...res.data.data, moveInAt: row?.moveInAt ?? undefined } as TenantDetailResponseDto);
        },
        onError: (err) => {
          setDetailBasic(null);
        }
      });
    }
  }

  const changeTableStyle = () => {
    const main = document.querySelector('main') as HTMLElement;
    const mainContent = document.querySelector('main #main-contents') as HTMLElement;
    const table = document.querySelector('#tenant-list .bl_tableWrapper') as HTMLElement;

    if (mainContent && table) {
      const mainStyle = getComputedStyle(main);
      const style = getComputedStyle(mainContent);

      const paddingLeftMain = parseFloat(mainStyle.paddingLeft) || 0;
      const paddingRightMain = parseFloat(mainStyle.paddingRight) || 0;

      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      mainContent.style.width = (main.clientWidth - paddingLeftMain - paddingRightMain) + 'px';
      const w = (+mainContent.style.width - paddingLeft - paddingRight) + 'px';
      table.style.width = w;
    }
  }

  useEffect(() => {
    const handleClick = () => {
      setTimeout(() => {
        changeTableStyle();
      }, 100);
    };

    const asideLogo = document.querySelector('.bl_asideLogo');
    asideLogo?.addEventListener('click', handleClick);
    window.addEventListener('resize', () => {
      setTimeout(() => {
        changeTableStyle();
      }, 100);
    });

    return () => {
      asideLogo?.removeEventListener('click', handleClick);
      window.removeEventListener('resize', () => {
        setTimeout(() => {
          changeTableStyle();
        }, 100);
      });
    };
  }, []);

  const reload = async () => {
    setTgtData(null);
    setSeq(seq + 1);
  };

  const handleRoomChoice = () => {
    let custId = Number(tgtData);
    if(!custId)
      return;
    setPopupTitle("居室情報の選択");
    setForm(<RoomChoice customerId={custId} category={detailBasic?.category} />);
    setIsPopupOpen(true);
  }

  const handleCreateCustomerInfo = () => {
    setPopupTitle("基本情報");
    setForm(<CustomerForm onCancelClick={handleBtnCancelClick} formData={defaultFormData} />)
    setIsPopupOpen(true);
  }

  const handleEditCustomerInfo = () => {
    const formData: FormData = {
      id: detailBasic?.id,
      name: detailBasic?.name,
      nameGana: detailBasic?.nameGana,
      personal: {
        nickname: detailBasic?.personal?.nickname,
        birthDay: detailBasic?.personal?.birthDay || null,
        sex: detailBasic?.personal?.sex || undefined,
      },
      details: {
        disabilityType: detailBasic?.details?.disabilityType,
        mentallyDisabled: detailBasic?.details?.mentallyDisabled ?? undefined,
        severelyDisabled: detailBasic?.details?.severelyDisabled ?? undefined,
        behavioralDisorder: detailBasic?.details?.behavioralDisorder ?? undefined,
        homeCare: detailBasic?.details?.homeCare ?? undefined,
        usedOffice: detailBasic?.details?.usedOffice || '',
        usedPace: detailBasic?.details?.usedPace || undefined,
        beforePlace: detailBasic?.details?.beforePlace || '',
        beforeOffice: detailBasic?.details?.beforeOffice || '',
        beforeService2: detailBasic?.details?.beforeService2 || '',
        beforeServiceOffice2: detailBasic?.details?.beforeServiceOffice2 || '',
        beforeService3: detailBasic?.details?.beforeService3 || '',
        beforeServiceOffice3: detailBasic?.details?.beforeServiceOffice3 || '',
        memo: detailBasic?.details?.memo || '',
      },
      category: detailBasic?.category || undefined,
      baseCustomerId: undefined,
      updatedAt: detailBasic?.infoUpdatedAt || undefined,
    }

    setPopupTitle("基本情報");
    setForm(<CustomerForm onCancelClick={handleBtnCancelClick} formData={formData} />)
    setIsPopupOpen(true);
  }

  const handleDeleteCustomerInfo = () => {
    setConfirmParam((prev: any) => ({
      ...prev,
      message: 'この顧客情報を本当に削除してもよろしいですか？',
      confirmAction: onConfirmDelete,
      isOpen: true,
    }));
  }

  const handleBtnCancelClick = () => {
    setIsPopupOpen(false);
    reload();
  };

  const handleCloseConfirm = () => {
    setConfirmParam((prev: any) => ({
      ...prev,
      isOpen: false
    }));
  };

  const onConfirmDelete = async () => {
    Del({
      apiPath: `${TenantDelete}${detailBasic?.id || -1}`,
      params: {},
      onSuccess: (res) => {
        reload();
      }
    });
  };

  return (
    <SelectListProvider
      type={[
        'support_type',
        'cust_service_pace',
        'cust_service_status',
        'sex',
        'cust_unit_status',
        'insurance_type',
        'care_type',
        'personal_liability_type',
        'continue_or_change',
      ]}
    >
      <style>
        <TenantCss />
      </style>

      <TenantMainContext.Provider value={{ detailBasic, setDetailBasic, customerId: Number.parseInt(tgtData ?? '-1') }}>
        <TableOpeButtons items={[
            { name: "追加", buttonType: ButtonType.Add, cb:handleCreateCustomerInfo},
            { name: "編集", buttonType: ButtonType.Edit, cb:handleEditCustomerInfo, selectedState:tgtData},
            { name: "削除", buttonType: ButtonType.Del, cb:handleDeleteCustomerInfo, selectedState:tgtData},
            { name: "居室割当", buttonType: ButtonType.Other, cb:handleRoomChoice, selectedState:tgtData},
          ] as ButtonProps[]} />
        <div id="tenant-management">
          <div id="tenant-list"><TenantTable cbSelect={chgTgtData} seq={seq} /></div>
          <div id="tenant-detail">
            {tgtData && (
              <Details
                id={tgtData}
              />
            )}
          </div>
        </div>

        <Popup
          title={popupTitle}
          doText={""}
          isOpen={isPopupOpen}
          contents={form}
          hideFooter={true}
          onClose={() => setIsPopupOpen(false)}
        />
        <ToastContainer position="top-right" autoClose={2000} />
        <PopupConfirm
          param={confirmParam}
        />
      </TenantMainContext.Provider>
    </SelectListProvider>
  )
}
