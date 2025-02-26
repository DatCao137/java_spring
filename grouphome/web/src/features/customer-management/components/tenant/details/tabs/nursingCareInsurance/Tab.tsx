import { Button } from "@/components/ui/ButtonCus"
import { BoxType1 } from "../common/BoxType1"
import { Plus } from "lucide-react"
import { useContext, useEffect, useRef } from "react"
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext"
import { TenantTabContext } from "../../Tabs"
import { Get } from '@/features/blc-common/utils/ServerRequest';
import { TenantCare } from "@/features/blc-common/assets/ApiPath"
import { TenantMainContext } from "@/features/customer-management/pages/TenantMain"
import { CustomerCareDto } from "@/features/customer-management/types/Tenant"
import { defaultTab1Form2Data } from "@/features/customer-management/data/tenant"
import { findNameByValue, formatCurrency } from "@/utils/Helper"
import { InsuranceServiceForm } from "../common/InsuranceServiceForm"
import { SaveCustomerMedicalOrCareDetailRequest } from "@/features/customer-management/validator/tenant/CustomerMedicalOrCareDetailSchema"

export const Tab = () => {
  const { customerId } = useContext(TenantMainContext);
  const { selectListData } = useSelectList();
  const careTypes = selectListData.get('care_type')?.filter((e) => e.value) || [];
  const { care, setCare } = useContext(TenantTabContext);
  const { setTitle, setForm, setIsPopupOpen } = useContext(TenantTabContext);
  const scrollToEndRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    Get({
      apiPath: `${TenantCare}/${customerId}`,
      params: {},
      onSuccess: (res) => {
        setCare(res.data.data as CustomerCareDto);
      },
      onError: (res) => {
        setCare(null);
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
  }, [customerId, care?.id]);

  const handleCreateItem = () => {
    const formData: SaveCustomerMedicalOrCareDetailRequest = JSON.parse(JSON.stringify(defaultTab1Form2Data));
    formData.customerId = customerId || -1;
    formData.careId = care?.id || -1;
    formData.medicalId = 1;
    formData.institution = 'default';
    setIsPopupOpen && setIsPopupOpen(true);
    setTitle && setTitle('介護保険サービス');
    setForm && setForm(<InsuranceServiceForm formData={formData} onCancelClick={onClosePopup} isTab1={false} />);
  }

  const onClosePopup = () => {
    setIsPopupOpen && setIsPopupOpen(false);
  }

  if (!customerId) return (<></>);

  return (
    <div className='p-5'>
      {/* info */}
      <div className="grid grid-cols-12 mt-2 gap-2">
        <div className='col-span-12 md:col-span-4 xl:col-span-3 text-nowrap'>介護保険被保険者証（番号）</div>
        <div className='col-span-12 md:col-span-8 xl:col-span-9'>
          {care?.careNo}
        </div>

        <div className='col-span-12 md:col-span-4 xl:col-span-3 text-nowrap'>要介護区分</div>
        <div className='col-span-12 md:col-span-8 xl:col-span-9'>
          {findNameByValue(careTypes, care?.careTypeId?.toString() || '')}
        </div>

        <div className='col-span-12 md:col-span-4 xl:col-span-3 text-nowrap'>支給限度額</div>
        <div className='col-span-12 md:col-span-8 xl:col-span-9'>
          {formatCurrency(care?.limit)}
        </div>
      </div>

      <div className="flex justify-end mt-6 mb-2">
        <Button onClick={handleCreateItem} size={"sm"} type="button" disabled={!care?.id} className="px-2 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">
          <Plus size={'16'} className="mr-3" />追加
        </Button>
      </div>
      <div className='w-full max-w-full overflow-x-scroll mt-6'>

        {
          care?.details?.length && care.details.length > 0 ? (
            <div className="tab-table-ruby flex w-max">
              {
                care?.details?.map((item: any, index: number) => (
                  <BoxType1 key={index} data={item} isTab1={false} index={index} length={care.details?.length || 0} />
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
