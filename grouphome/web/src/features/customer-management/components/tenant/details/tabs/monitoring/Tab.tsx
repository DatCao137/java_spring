import { SaveCustomerMonitoringRequestDto } from '@/features/customer-management/validator/tenant/CustomerMonitoringSchema';
import { BoxType2 } from '../common/BoxType2'
import { useContext, useEffect, useRef, useState } from 'react';
import { SelectListResponseDto, useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { TenantTabContext } from '../../Tabs';
import { TenantMainContext } from '@/features/customer-management/pages/TenantMain';
import { Get, Del } from '@/features/blc-common/utils/ServerRequest';
import { TenantMonitoring, TenantMonitoringDetail } from '@/features/blc-common/assets/ApiPath';
import { Form } from './Form';
import { Button } from '@/components/ui/ButtonCus';
import { Plus } from 'lucide-react';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { formatJPDate, jpFormatTemplate03 } from '@/utils/DateUtils';
import { convertBoolean2Value, findNameByValue } from '@/utils/Helper';
import { getStaffByBranchId } from '../moveinDocumentStatus/Tab';

export const Tab = () => {
  const { customerId, detailBasic } = useContext(TenantMainContext);
  const { selectListData } = useSelectList();
  const continueOptions = selectListData.get('continue_or_change')?.filter((e) => e.value) || [];
  const [monitories, setMonitories] = useState<SaveCustomerMonitoringRequestDto[] | null>(null);
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
  const [seq, setSeq] = useState<number>(0);
  const [staffs, setStaffs] = useState<SelectListResponseDto[]>([]);

  const fetchData = async () => {
    Get({
      apiPath: `${TenantMonitoring}/${customerId}`,
      params: {},
      onSuccess: (res) => {
        setMonitories(res.data.data as SaveCustomerMonitoringRequestDto[]);
      },
      onError: (err) => {
        setMonitories(null);
      }
    });
  }

  useEffect(() => {
    const getStaffs = async () => {
      const staffs: SelectListResponseDto[] = await getStaffByBranchId(detailBasic?.branchId || -1, true);
      setStaffs(staffs);
    }

    getStaffs();
  }, [])

  useEffect(() => {
    fetchData();
    if (customerId && scrollToEndRef.current) {
      scrollToEndRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [customerId, seq]);

  const onAddClick = () => {
    const formData = {
      customerId: customerId || -1,
    } as SaveCustomerMonitoringRequestDto
    setIsPopupOpen && setIsPopupOpen(true);
    setTitle && setTitle('モニタリング');
    setForm && setForm(<Form formData={formData} onCancelClick={onClosePopup} setSeq={setSeq} />);
  }

  const onClosePopup = () => {
    setIsPopupOpen && setIsPopupOpen(false);
  }

  const onEditClick = async (id: number) => {
    Get({
      apiPath: `${TenantMonitoringDetail}/${id || -1}`,
      params: {},
      onSuccess: (res) => {
        const formData = getCustomerMonitoring(res.data.data as SaveCustomerMonitoringRequestDto);
        setIsPopupOpen && setIsPopupOpen(true);
        setTitle && setTitle('モニタリング');
        setForm && setForm(<Form formData={formData} onCancelClick={onClosePopup} setSeq={setSeq} />);
      },
    });
  }

  const onDeleteClick = async (monitoring: SaveCustomerMonitoringRequestDto) => {
    setConfirmParam((prev: any) => ({
      ...prev,
      isOpen: true,
      textConfirm: 'OK',
      message: '本当に削除しますか？',
      confirmAction: () => deleteMonitoring(monitoring),
    }));
  }

  const getCustomerMonitoring = (monitoring: SaveCustomerMonitoringRequestDto): SaveCustomerMonitoringRequestDto => {
    return {
      id: monitoring?.id ?? undefined,
      customerId: customerId || -1,
      yyyymm: monitoring?.yyyymm,
      info: {
        lastUpdatedAt: monitoring?.info.lastUpdatedAt || null,
        plan: {
          start: monitoring?.info?.plan?.start || null,
          end: monitoring?.info?.plan?.end || null,
          season: monitoring?.info?.plan?.season ?? undefined,
        },
        monitoring: {
          store: monitoring?.info?.monitoring?.store ?? undefined,
          sign: monitoring?.info?.monitoring?.sign ?? undefined,
          continueValue: monitoring?.info?.monitoring?.continueValue ?? undefined,
          createdAt: monitoring?.info?.monitoring?.createdAt || null,
          fileId: monitoring?.info?.monitoring?.fileId ?? undefined,
        },
        draft: {
          store: monitoring?.info?.draft?.store ?? undefined,
          sign: monitoring?.info?.draft?.sign ?? undefined,
          staff: monitoring?.info?.draft?.staff ?? undefined,
          createdAt: monitoring?.info?.draft?.createdAt || null,
          fileId: monitoring?.info?.draft?.fileId ?? undefined,
        },
        meeting: {
          store: monitoring?.info?.meeting?.store ?? undefined,
          writeCheck: monitoring?.info?.meeting?.writeCheck ?? undefined,
          createdAt: monitoring?.info?.meeting?.createdAt || null,
          fileId: monitoring?.info?.meeting?.fileId ?? undefined,
        },
        main: {
          store: monitoring?.info?.main?.store ?? undefined,
          sign: monitoring?.info?.main?.sign ?? undefined,
          staff: monitoring?.info?.main?.staff ?? undefined,
          createdAt: monitoring?.info?.main?.createdAt || null,
          fileId: monitoring?.info?.main?.fileId ?? undefined,
        },
      },
      updatedAt: monitoring?.updatedAt ?? undefined,
    };
  }

  const handleCloseConfirm = () => {
    setConfirmParam((prev: any) => ({
      ...prev,
      isOpen: false
    }));
  };

  const deleteMonitoring = async (monitoring: SaveCustomerMonitoringRequestDto) => {
    Del({
      apiPath: `${TenantMonitoring}/${monitoring?.id || -1}`,
      params: {
        data: {
          customerId: customerId,
          updatedAt: monitoring?.updatedAt || undefined
        }
      },
      onSuccess: (res) => {
        setSeq((prev) => prev + 1);
      }
    });
  }

  const getMonitoringTitle = (monitoring: SaveCustomerMonitoringRequestDto) => {
    let title = `【${monitoring.info?.plan?.season || ''}】`;
    title += formatJPDate(`${monitoring.yyyymm}01`, 'YYYY/MM');
    title += ` 計画期間`;
    title += monitoring.info?.plan?.start ? ` ：${formatJPDate(monitoring.info?.plan?.start, 'MM/DD')}-${formatJPDate(monitoring.info?.plan?.end, 'MM/DD')}` : '';
    return title;
  }

  if (!customerId) return (<></>);

  return (
    <div className='p-5'>

      {/* list box*/}
      <div className="flex justify-end mt-6 mb-2">
        <Button onClick={onAddClick} size={"sm"} type="button" disabled={!customerId} className="px-2 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">
          <Plus size={'16'} className="mr-3" />追加
        </Button>
      </div>
      <div ref={scrollToEndRef} className='w-full max-w-full overflow-hidden overflow-x-scroll border-collapse border border-gray-400 h-72 xl:h-[330px] 2xl:h-[360px]'>
        <div className="tab-table-ruby flex w-max divide-x divide-gray-400">
          <div className="tab-table-ruby flex w-max">
            {
              monitories?.map((monitoring, index) => (
                <BoxType2 title={getMonitoringTitle(monitoring)} className={`h-full w-full lg:w-5/6 xl:w-2/3 2xl:3/5 overflow-y-auto ${index < monitories?.length - 1 || monitories?.length === 1 ? 'border-r border-gray-400' : ''}`} key={index}>
                  <div className='col-span-12 mt-5 space-x-5 text-nowrap mb-10'>
                    <span>最遅作成日</span>
                    <span>{formatJPDate(monitoring.info?.lastUpdatedAt, jpFormatTemplate03)}</span>
                  </div>

                  <div className='col-span-3 space-y-2'>
                    <div className='w-full underline'>モニタリング</div>
                    <div className='w-full space-x-2'>
                      <span>格納有無</span>
                      <span>{convertBoolean2Value(monitoring.info?.monitoring?.store)}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>サイン＋印</span>
                      <span>{convertBoolean2Value(monitoring.info?.monitoring?.sign)}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>継続是非</span>
                      <span>{findNameByValue(continueOptions, monitoring.info?.monitoring?.continueValue?.toString())}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>作成日付</span>
                      <span>{formatJPDate(monitoring.info?.monitoring?.createdAt, jpFormatTemplate03)}</span>
                    </div>
                  </div>

                  <div className='col-span-3 space-y-2'>
                    <div className='w-full underline'>原案</div>
                    <div className='w-full space-x-2'>
                      <span>格納有無</span>
                      <span>{convertBoolean2Value(monitoring.info?.draft?.store)}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>サイン＋印</span>
                      <span>{convertBoolean2Value(monitoring.info?.draft?.sign)}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>サビ管名</span>
                      <span>{findNameByValue(staffs, monitoring.info?.draft?.staff?.toString())}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>作成日付</span>
                      <span>{formatJPDate(monitoring.info?.draft?.createdAt, jpFormatTemplate03)}</span>
                    </div>
                  </div>

                  <div className='col-span-3 space-y-2'>
                    <div className='w-full underline'>担当者会議録</div>
                    <div className='w-full space-x-2'>
                      <span>格納有無</span>
                      <span>{convertBoolean2Value(monitoring.info?.meeting?.store)}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>記入者名</span>
                      <span>{convertBoolean2Value(monitoring.info?.meeting?.writeCheck)}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>作成日付</span>
                      <span>{formatJPDate(monitoring.info?.meeting?.createdAt, jpFormatTemplate03)}</span>
                    </div>
                  </div>

                  <div className='col-span-3 space-y-2'>
                    <div className='w-full underline'>本案</div>
                    <div className='w-full space-x-2'>
                      <span>格納有無</span>
                      <span>{convertBoolean2Value(monitoring.info?.main?.store)}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>サイン＋印</span>
                      <span>{convertBoolean2Value(monitoring.info?.main?.sign)}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>サビ管名</span>
                      <span>{findNameByValue(staffs, monitoring.info?.main?.staff?.toString())}</span>
                    </div>
                    <div className='w-full space-x-2'>
                      <span>作成日付</span>
                      <span>{formatJPDate(monitoring.info?.main?.createdAt, jpFormatTemplate03)}</span>
                    </div>
                  </div>

                  <div className="col-span-12 flex justify-end space-x-2 mt-5">
                    <Button onClick={() => onEditClick(monitoring.id || -1)} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">編集</Button>
                    <Button onClick={() => onDeleteClick(monitoring)} size={'sm'} type="button" className="px-5 h-7 bg-[#999999] hover:bg-[#b7b7b7] text-black">削除</Button>
                  </div>
                </BoxType2>
              ))
            }
          </div>
        </div>
      </div>
      <PopupConfirm
        param={confirmParam}
      />
    </div>
  )
}
