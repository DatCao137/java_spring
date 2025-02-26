import { PopupConfirmParams } from "@/components/elements/Common";
import { PopupConfirm } from "@/components/elements/PopupConfirm";
import { Button } from "@/components/ui/ButtonCus";
import { TenantCaretDetailDelete, TenantMedicalDetailDelete } from "@/features/blc-common/assets/ApiPath";
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext";
import { TenantMainContext } from "@/features/customer-management/pages/TenantMain";
import { Del } from '@/features/blc-common/utils/ServerRequest';
import { findNameByValue } from "@/utils/Helper";
import { useContext, useState } from "react";
import { InsuranceServiceForm } from "./InsuranceServiceForm";
import { TenantTabContext } from "../../Tabs";
import { SaveCustomerMedicalOrCareDetailRequest } from "@/features/customer-management/validator/tenant/CustomerMedicalOrCareDetailSchema";

type props = {
  data?: SaveCustomerMedicalOrCareDetailRequest;
  isTab1?: boolean;
  index: number;
  length: number;
}
export const BoxType1 = ({ data = {
  id: undefined,
  medicalId: -1,
  careId: -1,
  customerId: -1,
  sub: -1,
  serviceName: '',
  institution: '',
  useCompany: '',
  status: -1,
  pace: -1,
  updatedAt: undefined,
}, isTab1 = true, index, length }: props) => {
  const { selectListData } = useSelectList();
  const paces = selectListData.get('cust_service_pace')?.filter((e) => e.value) || [];
  const statuses = selectListData.get('cust_service_status')?.filter((e) => e.value) || [];
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: 'OK',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const { setMedical, setTitle, setIsPopupOpen, setForm, setCare } = useContext(TenantTabContext);
  const { customerId } = useContext(TenantMainContext);

  const editMedicalDetail = () => {
    const formData: SaveCustomerMedicalOrCareDetailRequest = {
      ...data, medicalId: isTab1 ? data.medicalId : 1,
      careId: isTab1 ? 1 : data.careId, customerId: customerId || -1,
      institution: isTab1 ? data.institution : 'default', useCompany: isTab1 ? 'default' : data.useCompany
    };

    setIsPopupOpen && setIsPopupOpen(true);
    setTitle && (isTab1 ? setTitle('医療保険サービス') : setTitle('介護保険サービス'));
    setForm && setForm(<InsuranceServiceForm formData={formData} onCancelClick={onClosePopup} isTab1={isTab1} />);
  }

  const onClosePopup = () => {
    setIsPopupOpen && setIsPopupOpen(false);
  }

  const deleteMedicalDetail = async () => {
    const deleteApi = isTab1 ? TenantMedicalDetailDelete : TenantCaretDetailDelete;
    Del({
      apiPath: `${deleteApi}${data?.id || -1}`,
      params: {
        data: {
          customerId: customerId,
          updatedAt: data.updatedAt
        }
      },
      onSuccess: (res) => {
        isTab1 ? setMedical((prev: any) => ({
          ...prev, id: undefined,
        })) : setCare((prev: any) => ({
          ...prev, id: undefined,
        }));
      }
    });
  }

  const onHandleDeleteItem = () => {
    setConfirmParam((prev: any) => ({
      ...prev,
      isOpen: true,
      textConfirm: 'OK',
      message: '本当に削除しますか？',
      confirmAction: deleteMedicalDetail
    }));
  }

  const handleCloseConfirm = () => {
    setConfirmParam((prev: any) => ({
      ...prev,
      isOpen: false
    }));
  };
  return (
    <div className='w-full md:w-1/2 xl:w-2/5'>
      <div className='border border-gray-400 px-2 py-1'>
        {length - index}
      </div>
      <div className='border border-t-0 border-collapse border-gray-400 px-2 py-1 grid grid-cols-12'>
        {/* line 1 */}
        <div className='col-span-12 md:col-span-6 lg:col-span-4'>利用サービス</div>
        <div className='col-span-12 md:col-span-6 lg:col-span-8'>{data.serviceName}</div>

        {/* line 2 */}
        {
          isTab1 ? (
            <>
              <div className='col-span-12 md:col-span-6 lg:col-span-4'>利用機関</div>
              <div className='col-span-12 md:col-span-6 lg:col-span-8'>{data.institution}</div>
            </>
          ) : (
            <>
              <div className='col-span-12 md:col-span-6 lg:col-span-4'>利用事業者</div>
              <div className='col-span-12 md:col-span-6 lg:col-span-8'>{data.useCompany}</div>
            </>
          )
        }

        {/* line 3 */}
        <div className='col-span-12 md:col-span-6 lg:col-span-4'>ステータス</div>
        <div className='col-span-12 md:col-span-6 lg:col-span-8'>
          {findNameByValue(statuses, data.status?.toString())}
        </div>

        {/* line 4 */}
        <div className='col-span-12 md:col-span-6 lg:col-span-4'>利用頻度</div>
        <div className='col-span-12 md:col-span-6 lg:col-span-8'>
          {findNameByValue(paces, data.pace?.toString())}
        </div>

        <div className="col-span-12 flex justify-end space-x-2 mt-5">
          <Button onClick={editMedicalDetail} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
          <Button onClick={onHandleDeleteItem} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">削除</Button>
        </div>
      </div>
      <PopupConfirm
        param={confirmParam}
      />
    </div>
  )
}
