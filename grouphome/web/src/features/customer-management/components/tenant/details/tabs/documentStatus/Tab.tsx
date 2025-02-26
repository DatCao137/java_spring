import { TenantMainContext } from "@/features/customer-management/pages/TenantMain";
import { useContext, useEffect } from "react";
import { TenantTabContext } from "../../Tabs";
import { TenantDocumentDetail } from "@/features/blc-common/assets/ApiPath";
import { Get } from '@/features/blc-common/utils/ServerRequest';
import { SaveCustomerHandbookStatusRequestDto } from "@/features/customer-management/validator/tenant/CustomerHandbookStatusSchema";
import { MonitoringDto } from "@/features/customer-management/validator/tenant/CustomerDocumentStatusSchema";
import { convertBoolean2Value } from "@/utils/Helper";

export const Tab = () => {
  const { customerId } = useContext(TenantMainContext);
  const { document, setDocument } = useContext(TenantTabContext);

  const fetchData = async () => {
    Get({
      apiPath: `${TenantDocumentDetail}/${customerId}`,
      params: {},
      onSuccess: (res) => {
        setDocument(res.data.data as SaveCustomerHandbookStatusRequestDto);
      },
      onError: (err) => {
        setDocument(null);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [customerId, document?.id]);

  if (!customerId) return (<></>);
  return (
    <div className='p-5'>
      <div className="flex items-start mt-5">
        {/* left column */}
        <div className='w-full md:w-1/2 grid grid-cols-12 gap-y-2'>
          <div className='col-span-8 md:col-span-5'>見学申込書</div>
          <div className='col-span-4 md:col-span-6'>
            {convertBoolean2Value(document?.tour?.apply)}
          </div>

          <div className='col-span-8 md:col-span-5'>アセスメントシート</div>
          <div className='col-span-4 md:col-span-6'>
            {convertBoolean2Value(document?.assessment?.apply)}
          </div>

          <div className='col-span-8 md:col-span-5'>体験利用契約</div>
          <div className='col-span-4 md:col-span-6'>
            {convertBoolean2Value(document?.trial?.apply)}
          </div>

          <div className='col-span-8 md:col-span-5'>体験重要事項説明書</div>
          <div className='col-span-4 md:col-span-6'>
            {convertBoolean2Value(document?.trialImportantExperience?.apply)}
          </div>

          <div className='col-span-8 md:col-span-5'>利用契約</div>
          <div className='col-span-4 md:col-span-6'>
            {convertBoolean2Value(document?.usageContract?.apply)}
          </div>

          <div className='col-span-8 md:col-span-5'>重要事項説明書</div>
          <div className='col-span-4 md:col-span-6'>
            {convertBoolean2Value(document?.importantExperience?.apply)}
          </div>

          <div className='col-span-8 md:col-span-5'>個別支援計画</div>
          <div className='col-span-4 md:col-span-6'>
            {convertBoolean2Value(document?.plan?.apply)}
          </div>

        </div>

        {/* right column */}
        <div className='w-full md:w-1/2 grid grid-cols-12 gap-y-2'>
          {document?.monitoring && document.monitoring.length ? document?.monitoring?.map((item: MonitoringDto, index) => (
            <div key={index} className="col-span-12 flex flex-row items-center">
              <div className='w-2/3 md:w-5/12'>モニタリング{index + 1}</div>
              <div className='w-1/3 md:w-1/2'>
                {item.apply === true ? '〇' : (item.apply === false ? '✕' : undefined)}
              </div>
            </div>
          )) : (
            <>
              <div className='col-span-8 md:col-span-5'>モニタリング1</div>
              <div className='col-span-4 md:col-span-6'></div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}