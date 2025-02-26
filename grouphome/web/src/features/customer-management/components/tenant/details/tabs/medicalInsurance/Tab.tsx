import { CustomerMedicalDto } from "@/features/customer-management/types/Tenant"
import { BoxType1 } from "../common/BoxType1"
import { Button } from "@/components/ui/ButtonCus"
import { Plus } from "lucide-react"
import { useContext, useEffect, useRef } from "react"
import { InsuranceServiceForm } from "../common/InsuranceServiceForm"
import { TenantMainContext } from "@/features/customer-management/pages/TenantMain"
import { findNameByValue } from "@/utils/Helper"
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext"
import { defaultTab1Form2Data } from "@/features/customer-management/data/tenant"
import { Get } from '@/features/blc-common/utils/ServerRequest';
import { TenantMedical } from "@/features/blc-common/assets/ApiPath"
import { TenantTabContext } from "../../Tabs"
import { SaveCustomerMedicalOrCareDetailRequest } from "@/features/customer-management/validator/tenant/CustomerMedicalOrCareDetailSchema"

export const Tab = () => {
  const { customerId } = useContext(TenantMainContext);
  const { selectListData } = useSelectList();
  const insuranceTypes = selectListData.get('insurance_type')?.filter((e) => e.value) || [];
  const { medical, setMedical } = useContext(TenantTabContext);
  const { setTitle, setForm, setIsPopupOpen } = useContext(TenantTabContext);
  const scrollToEndRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    Get({
      apiPath: `${TenantMedical}/${customerId}`,
      params: {},
      onSuccess: (res) => {
        setMedical(res.data.data as CustomerMedicalDto);
      },
      onError: (err) => {
        setMedical(null);
      }
    });
  }

  useEffect(() => {
    fetchData();
    if (customerId && scrollToEndRef.current) {
      scrollToEndRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [customerId, medical?.id]);

  const handleCreateItem = () => {
    const formData: SaveCustomerMedicalOrCareDetailRequest = JSON.parse(JSON.stringify(defaultTab1Form2Data));
    formData.medicalId = medical?.id || -1;
    formData.customerId = customerId || -1;
    formData.careId = 1;
    formData.useCompany = 'default';
    setIsPopupOpen && setIsPopupOpen(true);
    setTitle && setTitle('医療保険サービス');
    setForm && setForm(<InsuranceServiceForm formData={formData} onCancelClick={onClosePopup} />);
  }

  const onClosePopup = () => {
    setIsPopupOpen && setIsPopupOpen(false);
  }

  if (!customerId) return (<></>);

  return (
    <div className='p-5'>
      {/* info */}
      <div className="grid grid-cols-12">
        <div className='col-span-12 md:col-span-4 xl:col-span-2 text-nowrap'>保険証種別</div>
        <div className='col-span-12 md:col-span-8 xl:col-span-10'>
          {findNameByValue(insuranceTypes, medical?.insuranceTypeId?.toString() || '')}
        </div>

        <div className='col-span-12 md:col-span-4 xl:col-span-2 text-nowrap'>記号-番号-枝番（半角）</div>
        <div className='col-span-12 md:col-span-8 xl:col-span-10'>
          {medical?.number}
        </div>
      </div>

      {/* list */}
      <div className="flex justify-end mt-6 mb-2">
        <Button onClick={handleCreateItem} size={"sm"} type="button" disabled={!medical?.id} className="px-2 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">
          <Plus size={'16'} className="mr-3" />追加
        </Button>
      </div>
      <div ref={scrollToEndRef} className='w-full max-w-full overflow-x-scroll'>
        {
          (medical?.details?.length && medical.details.length > 0) ? (
            <div className="tab-table-ruby flex w-max">
              {
                medical?.details?.map((item, index) => (
                  <BoxType1 key={index} data={item as SaveCustomerMedicalOrCareDetailRequest} index={index} length={medical.details?.length || 0}/>
                ))
              }
            </div>
          ) : (
            <div className="h-40 w-full border border-gray-400 mb-2"></div>
          )
        }

      </div>
    </div>
  )
}
