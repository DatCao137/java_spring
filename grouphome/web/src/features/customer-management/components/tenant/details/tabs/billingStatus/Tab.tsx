import { useContext, useEffect, useRef, useState } from 'react';
import { BoxType2 } from '../common/BoxType2'
import { Button } from '@/components/ui/ButtonCus';
import { TenantMainContext } from '@/features/customer-management/pages/TenantMain';
import { TenantTabContext } from '../../Tabs';
import { BillingResponseDto, SaveBillingDetailDto } from '@/features/customer-management/types/Tenant';
import { Form } from './Form';
import { Plus } from 'lucide-react';
import { TenantBilling, TenantBillingDetailDelete } from '@/features/blc-common/assets/ApiPath';
import { Get, Del } from '@/features/blc-common/utils/ServerRequest';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { formatJPDate } from '@/utils/DateUtils';

export const Tab = () => {
  const { customerId } = useContext(TenantMainContext);
  const { billingInfo, setBillingInfo } = useContext(TenantTabContext);
  const { setTitle, setForm, setIsPopupOpen } = useContext(TenantTabContext);
  const scrollToEndRef = useRef<HTMLDivElement>(null);
  const [confirmParam, setConfirmParam] = useState<PopupConfirmParams>({
    isOpen: false,
    textConfirm: 'OK',
    message: '',
    isShowCancel: true,
    confirmAction: () => { },
    onClose: () => handleCloseConfirm()
  });

  const fetchData = async () => {
    Get({
      apiPath: `${TenantBilling}/${customerId}`,
      params: {},
      onSuccess: (res) => {
        setBillingInfo(res.data.data as BillingResponseDto);
      },
      onError: (res) => {
        setBillingInfo(null);
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
  }, [customerId, billingInfo?.id]);
  
  const onAddClick = (billingDetail: any) => {
    setIsPopupOpen && setIsPopupOpen(true);
    setTitle && setTitle('請求状況一覧');
    let formData = {
      id: billingDetail?.id,
      billingId: billingInfo?.id ?? -1,
      yyyymm: billingDetail?.yyyymm ? formatJPDate(billingDetail?.yyyymm, "YYYY-MM") : null,
      nationalAt: billingDetail?.nationalAt,
      selfGoverningAt: billingDetail?.selfGoverningAt,
      otherAt: billingDetail?.otherAt,
      issueAt: billingDetail?.issueAt,
      memo: billingDetail?.memo || '',
      updatedAt: billingDetail?.updatedAt,

    } as SaveBillingDetailDto;  

    setForm && setForm(<Form formData={formData} onCancelClick={handlePopupClose} />);
  }

  const handlePopupClose = () => {
    setIsPopupOpen && setIsPopupOpen(false);
  }

  const handleDeleteBilling = (id: any) => {
    setConfirmParam && setConfirmParam((prev: any) => ({
      ...prev,
      message: 'この請求詳細を本当に削除してもよろしいですか？',
      confirmAction: () => onConfirmDelete(id),
      isOpen: true,
    }));
  }

  const onConfirmDelete = async (id: any) => {
    Del({
      apiPath: `${TenantBillingDetailDelete}${id || -1}`,
      params: {},
      onSuccess: (res) => {
        setBillingInfo((prev: any) => ({
          ...prev, id: undefined,
        }));
      }
    });
  };

  const handleCloseConfirm = () => {
    setConfirmParam((prev: any) => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <div className='p-5'>
      {/* d_customer_application_status.government */}
      <div className='grid grid-cols-12 mt-5 space-y-2' >
        <div className='col-span-4 md:col-span-3 lg:col-span-2'>請求書発行</div>
        <div className='col-span-4 md:col-span-3 lg:col-span-2'>
          <div className="w-full">本入居分（初回）</div>
          <div className="w-full">備考</div>
        </div>
        <div className='col-span-4 md:col-span-3 space-y-2'>
          <div className="w-full">{formatJPDate(billingInfo?.movein1stAt || '', "YYYY/MM/DD", true) }</div>
          <div className="w-full break-words whitespace-pre-line pr-2">{billingInfo?.remark || ''}</div>

        </div>
        <div className='col-span-4 md:col-span-3 lg:col-span-2 space-y-2'>
          <div className="w-full">口座振替依頼書原本発送</div>
          <div className="w-full">口座振替RP入力</div>
          <div className="w-full">初回口座振替日</div>
        </div>
        <div className='col-span-4 md:col-span-3 space-y-2'>
          <div className="w-full">{formatJPDate(billingInfo?.originalRequestAt || '', "YYYY/MM/DD", true) }</div>
          <div className="w-full">{formatJPDate(billingInfo?.rpInputAt || '', "YYYY/MM/DD", true)}</div>
          <div className="w-full">{formatJPDate(billingInfo?.transfer1stAt || '', "YYYY/MM/DD", true)}</div>
        </div>
      </div>

      {/* list box */}
      <div className='col-span-12 md:col-span-12 flex p-2 justify-end '>
        <Button onClick={() => onAddClick(null)} size={"sm"} disabled={!billingInfo?.id} type="button" className="px-2 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">
          <Plus size={'16'} className="mr-3" />追加
        </Button>
      </div>

      <div className='w-full max-w-full overflow-hidden overflow-x-scroll border-collapse border border-gray-400 h-52 lg:h-56 xl:h-64'>

          {
            billingInfo?.tenantBillingDetails?.length && billingInfo.tenantBillingDetails.length > 0 ? (
              <div className="tab-table-ruby flex w-max divide-gray-400">
                {
                  billingInfo?.tenantBillingDetails?.map((item: any, index: number) => (

                    <BoxType2
                      title={`提供月：${formatJPDate(item?.yyyymm, "YYYY/MM")}`}
                      className='h-full w-full md:w-1/2 lg:w-1/3 overflow-y-auto border-r border-l border-gray-400'
                      key={index}
                    >
                      <div className='col-span-12 md:col-span-6 mb-2'>国保連(※)</div>
                      <div className='col-span-12 md:col-span-6 mb-2'>{formatJPDate(item?.nationalAt || '', "YYYY/MM/DD", true)}</div>
                      <div className='col-span-12 md:col-span-6 mb-2'>自治単独加算等(※)</div>
                      <div className='col-span-12 md:col-span-6 mb-2'>{formatJPDate(item?.selfGoverningAt || '', "YYYY/MM/DD", true)}</div>
                      <div className='col-span-12 md:col-span-6 mb-2'>その他助成金等(※)</div>
                      <div className='col-span-12 md:col-span-6 mb-2'>{formatJPDate(item?.otherAt || '', "YYYY/MM/DD", true)}</div>
                      <div className='col-span-12 md:col-span-6 mb-2'>利用料請求(発行日付)</div>
                      <div className='col-span-12 md:col-span-6 mb-2'>{formatJPDate(item?.issueAt || '', "YYYY/MM/DD", true)}</div>
                      <div className='col-span-12 md:col-span-6 mb-2'>メモ</div>
                      <div className='col-span-12 md:col-span-6 mb-2 whitespace-pre-line'>{item?.memo}</div>
                      <div className='col-span-12 md:col-span-12 flex p-2 justify-end '>
                        <Button onClick={() => onAddClick(item)} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
                        <Button onClick={() => handleDeleteBilling(item?.id)} size={'sm'} type="button" className="ml-1 px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">削除</Button>
                      </div>
                    </BoxType2>
                  ))
                }
              </div>
            ) : (
               <></>
            )
          }
      </div>

      {/* ※処理日付 */}
      <div className="flex mt-4 text-nowrap space-x-5">
        <span>※処理日付</span>
      </div>
      <PopupConfirm
        param={confirmParam}
      />
    </div>
  )
}

