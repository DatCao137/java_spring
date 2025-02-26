import { BoxType2 } from '../common/BoxType2'
import { useContext, useEffect, useRef } from 'react';
import { TenantMainContext } from '@/features/customer-management/pages/TenantMain';
import { convertToJapaneseEra, formatJPDate } from '@/utils/DateUtils';
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { TenantTabContext } from '../../Tabs';
import { Get } from '@/features/blc-common/utils/ServerRequest';
import { TenantApplicationStatus } from '@/features/blc-common/assets/ApiPath';
import { ApplicationStatusResponseDto } from '@/features/customer-management/types/Tenant';
import { convertBoolean2Value, formatCurrency } from '@/utils/Helper';

export const Tab = () => {
  const { customerId } = useContext(TenantMainContext);
  const { applicationStatusInfo, setApplicationStatusInfo } = useContext(TenantTabContext);
  const scrollToEndRef = useRef<HTMLDivElement>(null);
  const { selectListData } = useSelectList();
  const insuranceTypes =
    selectListData.get('personal_liability_type')?.filter((e) => e.value) || [];

  const fetchData = async () => {
    Get({
      apiPath: `${TenantApplicationStatus}/${customerId}`,
      params: {},
      onSuccess: (res) => {
        setApplicationStatusInfo(res.data.data as ApplicationStatusResponseDto);
      },
      onError: (res) => {
        setApplicationStatusInfo(null);

      },
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
  }, [customerId, applicationStatusInfo?.id]);
  return (
    <div className='p-5'>
      {/* d_customer_application_status.government */}
      <div className='grid grid-cols-12 mt-5'>
        <div className='col-span-12 md:col-span-6 lg:col-span-3'>援護自治体（受給者証発行元）</div>
        <div className='col-span-12 md:col-span-6 lg:col-span-8'>{applicationStatusInfo?.government}</div>
      </div>

      {/* list box */}
      <div className='w-full max-w-full overflow-hidden overflow-x-scroll mt-6 border-collapse border border-gray-400 h-48 lg:h-52 xl:h-56'>
        <div className="tab-table-ruby flex w-max divide-x divide-gray-400">
          {/* box 1 */}
          <BoxType2 title='国GH家賃補助金' className='h-full w-full md:w-1/2 lg:w-1/3 overflow-y-auto' key="box-1">
            <div className='col-span-12 md:col-span-6 mb-1'>国　特別給付費の有無</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{convertBoolean2Value(applicationStatusInfo?.nationalRentSubsidy?.specialBenefit)}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>補足給付期限</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{applicationStatusInfo?.nationalRentSubsidy?.limit ? formatJPDate(String(applicationStatusInfo?.nationalRentSubsidy?.limit)) : ''}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>補足給付期限（和暦）</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{convertToJapaneseEra(applicationStatusInfo?.nationalRentSubsidy?.limit)}</div>
          </BoxType2>

          {/* box 2 */}
          <BoxType2 title='市区町村GH家賃補助金' className='h-full w-full md:w-1/2 lg:w-1/3 overflow-y-auto' key="box-2">
            <div className='col-span-12 md:col-span-6 mb-1'>対象可否</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{convertBoolean2Value(applicationStatusInfo?.municipalRentSubsidy?.subject)}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>申請日</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{applicationStatusInfo?.municipalRentSubsidy?.requestAt ? formatJPDate(String(applicationStatusInfo?.municipalRentSubsidy?.requestAt)) : ''}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>金額</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{formatCurrency(applicationStatusInfo?.municipalRentSubsidy?.amount)}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>MEMO</div>
            <div className='col-span-12 md:col-span-6 mb-1 whitespace-pre-line'>{applicationStatusInfo?.municipalRentSubsidy?.memo}</div>
          </BoxType2>

          {/* box 3 */}
          <BoxType2 title='自治体単独加算' className='h-full w-full md:w-1/2 lg:w-1/3 overflow-y-auto' key="box-3">
            <div className='col-span-12 md:col-span-6 mb-1'>申請日</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{applicationStatusInfo?.individualMunicipality?.requestAt ? formatJPDate(String(applicationStatusInfo?.individualMunicipality?.requestAt)) : ''}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>算定加算</div>
            <div className='col-span-12 md:col-span-6 mb-1'>
              <ul className="list-disc">
                {applicationStatusInfo?.individualMunicipality?.addition.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className='col-span-12 md:col-span-6 mb-1'>MEMO</div>
            <div className='col-span-12 md:col-span-6 mb-1 whitespace-pre-line'>{applicationStatusInfo?.individualMunicipality?.memo}</div>
          </BoxType2>

          {/* box 4 */}
          <BoxType2 title='生保・年金状況' className='h-full w-full md:w-1/2 lg:w-1/3 overflow-y-auto' key="box-4">
            <div className='col-span-12 md:col-span-6 mb-1'>生活保護</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{convertBoolean2Value(applicationStatusInfo?.lifeInsurancePension?.basic)}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>特別基準有無</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{convertBoolean2Value(applicationStatusInfo?.lifeInsurancePension?.special)}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>障がい者年金</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{convertBoolean2Value(applicationStatusInfo?.lifeInsurancePension?.disabled)}</div>
          </BoxType2>

          {/* box 5 */}
          <BoxType2 title='個人賠償責任保険' className='h-full w-full md:w-1/2 lg:w-1/3 overflow-y-auto' key="box-5">
            <div className='col-span-12 md:col-span-6 mb-1'>加入状況</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{applicationStatusInfo?.personalLiability?.status}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>加入保険</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{insuranceTypes.find(
              (item) => item.value == String(applicationStatusInfo?.personalLiability?.insuranceType || 0)
            )?.name || ''
            }</div>
            <div className='col-span-12 md:col-span-6 mb-1'>保険会社名</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{applicationStatusInfo?.personalLiability?.insuranceName}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>代理店名</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{applicationStatusInfo?.personalLiability?.agency}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>担当者</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{applicationStatusInfo?.personalLiability?.staff}</div>
            <div className='col-span-12 md:col-span-6 mb-1'>連絡先</div>
            <div className='col-span-12 md:col-span-6 mb-1'>{applicationStatusInfo?.personalLiability?.contact}</div>
          </BoxType2>
        </div>
      </div>
    </div>
  )
}
