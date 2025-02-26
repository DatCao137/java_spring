import { TenantMainContext } from "@/features/customer-management/pages/TenantMain";
import { useContext, useEffect, useState } from "react";
import { TenantTabContext } from "../../Tabs";
import { StaffList, TenantMoveinDocumentDetail } from "@/features/blc-common/assets/ApiPath";
import { Get } from '@/features/blc-common/utils/ServerRequest';
import { SaveCustomerMoveinDocumentStatusRequestDto } from "@/features/customer-management/validator/tenant/CustomerMoveinDocumentStatusSchema";
import { formatJPDate, jpFormatTemplate03 } from "@/utils/DateUtils";
import { convertBoolean2Value, findNameByValue } from "@/utils/Helper";
import { SelectListResponseDto } from "@/features/customer-management/contexts/SelectListContext";

export const getStaffByBranchId = async (branchId: number, hasDefault: boolean = false): Promise<SelectListResponseDto[]> => {
  const defaultValue: SelectListResponseDto = {
    name: 'データなし',
    value: '0'
  };

  if (branchId < 1) return hasDefault ? [defaultValue] : [];
  var staffs: SelectListResponseDto[] = [];
  await Get({
    apiPath: `${StaffList}/${branchId}`,
    params: {},
    onSuccess: (res) => {
       staffs = res.data.data?.map((item: any) => {
        return {
          name: `${item.nameSei} ${item.nameMei}`,
          value: `${item.id}`
        } as SelectListResponseDto
      }) || (hasDefault ? [defaultValue] : []);
    },
    onError: (err) => {
      staffs = (hasDefault ? [defaultValue] : []);
    }
  });
  return staffs;
}

export const Tab = () => {
  const { customerId, detailBasic } = useContext(TenantMainContext);
  const { moveinDocument, setMoveinDocument } = useContext(TenantTabContext);
  const [staffs, setStaffs] = useState<SelectListResponseDto[]>([]);

  const fetchData = async () => {
    Get({
      apiPath: `${TenantMoveinDocumentDetail}/${customerId}`,
      params: {},
      onSuccess: (res) => {
        setMoveinDocument(res.data.data as SaveCustomerMoveinDocumentStatusRequestDto);
      },
      onError: (err) => {
        setMoveinDocument(null);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [customerId, moveinDocument?.id]);

  useEffect(() => {
    const getStaffs = async () => {
      const staffs = await getStaffByBranchId(detailBasic?.branchId || -1);
      setStaffs(staffs);
    }
    getStaffs();
  }, [])

  if (!customerId) return (<></>);
  return (
    <div className='p-5'>
      <div className='w-full overflow-x-auto space-y-5'>
        {/* line 1 */}
        <div className='flex flex-row'>
          <div className='w-1/3 lg:w-1/6'>基本書類</div>
          <div className='w-1/3 lg:w-1/6 space-y-1'>
            <div className="underline text-nowrap">判定</div>
            <div className="text-nowrap">{moveinDocument?.basic?.judge}</div>
          </div>
          <div className='w-1/3 lg:w-1/5 2xl:w-1/6 space-y-1'>
            <div className="underline text-nowrap">利用申込書</div>
            <div className="text-nowrap">格納有無<span className='ml-2'>{convertBoolean2Value(moveinDocument?.basic?.usage?.store)}</span></div>
            <div className="text-nowrap">作成日付<span className='ml-2'>{moveinDocument?.basic?.usage?.createdAt ?  formatJPDate(String(moveinDocument?.basic?.usage?.createdAt), jpFormatTemplate03) : null}</span></div>
          </div>

          <div className='w-1/3 lg:w-1/5 2xl:w-1/6 space-y-1'>
            <div className="underline text-nowrap">フェイスシート</div>
            <div className="text-nowrap">格納有無<span className='ml-2'>{convertBoolean2Value(moveinDocument?.basic?.faceSheet?.store)}</span></div>
            <div className="text-nowrap">作成日付<span className='ml-2'>{moveinDocument?.basic?.faceSheet?.createdAt ? formatJPDate(String(moveinDocument?.basic?.faceSheet?.createdAt), jpFormatTemplate03) : null}</span></div>
          </div>

          <div className='w-1/3 lg:w-1/5 2xl:w-1/6 space-y-1'>
            <div className="underline text-nowrap">重要事項説明書</div>
            <div className="text-nowrap">格納有無<span className='ml-2'>{convertBoolean2Value(moveinDocument?.basic?.important?.store)}</span></div>
            <div className="text-nowrap">サイン＋印<span className='ml-2'>{convertBoolean2Value(moveinDocument?.basic?.important?.sign)}</span></div>
            <div className="text-nowrap">作成日付<span className='ml-2'>{moveinDocument?.basic?.important?.createdAt ? formatJPDate(String(moveinDocument?.basic?.important?.createdAt), jpFormatTemplate03) : null}</span></div>
          </div>

          <div className='w-1/3 lg:w-1/5 2xl:w-1/6 space-y-1'>
            <div className="underline text-nowrap">利用契約書</div>
            <div className="text-nowrap">格納有無<span className='ml-2'>{convertBoolean2Value(moveinDocument?.basic?.usageContract?.store)}</span></div>
            <div className="text-nowrap">サイン＋印<span className='ml-2'>{convertBoolean2Value(moveinDocument?.basic?.usageContract?.sign)}</span></div>
            <div className="text-nowrap">作成日付<span className='ml-2'>{moveinDocument?.basic?.usageContract?.createdAt ? formatJPDate(String(moveinDocument?.basic?.usageContract?.createdAt), jpFormatTemplate03): null}</span></div>
          </div>
        </div>

        {/* line 2 */}
        <div className='flex flex-row'>
          <div className='w-1/3 lg:w-1/6'>初回個別支援計画</div>
          <div className='w-1/3 lg:w-1/6 space-y-1'>
            <div className="underline text-nowrap">判定</div>
            <div className="text-nowrap">{moveinDocument?.plan1st?.judge}</div>
          </div>

          <div className='w-1/3 lg:w-1/5 2xl:w-1/6 space-y-1'>
            <div className="underline text-nowrap">最遅作成日</div>
            <div className="text-nowrap">{moveinDocument?.plan1st?.lastUpdatedAt ? formatJPDate(String(moveinDocument?.plan1st?.lastUpdatedAt), jpFormatTemplate03) : null}</div>
          </div>

          <div className='w-1/3 lg:w-1/5 2xl:w-1/6 space-y-1'>
            <div className="underline text-nowrap">原案</div>
            <div className="text-nowrap">格納有無<span className='ml-2'>{convertBoolean2Value(moveinDocument?.plan1st?.draft?.store)}</span></div>
            <div className="text-nowrap">サイン＋印<span className='ml-2'>{convertBoolean2Value(moveinDocument?.plan1st?.draft?.sign)}</span></div>
            <div className="text-nowrap">サビ管名<span className='ml-2'>{findNameByValue(staffs, moveinDocument?.plan1st?.draft?.staff?.toString())}</span></div>
            <div className="text-nowrap">作成日付<span className='ml-2'>{moveinDocument?.plan1st?.draft?.createdAt ? formatJPDate(String(moveinDocument?.plan1st?.draft?.createdAt), jpFormatTemplate03) : null}</span></div>
          </div>

          <div className='w-1/3 lg:w-1/5 2xl:w-1/6 space-y-1'>
            <div className="underline text-nowrap">担当者会議録</div>
            <div className="text-nowrap">格納有無<span className='ml-2'>{convertBoolean2Value(moveinDocument?.plan1st?.meeting?.store)}</span></div>
            <div className="text-nowrap">記入者名<span className='ml-2'>{convertBoolean2Value(moveinDocument?.plan1st?.meeting?.writeCheck)}</span></div>
            <div className="text-nowrap">作成日付<span className='ml-2'>{moveinDocument?.plan1st?.meeting?.createdAt ? formatJPDate(String(moveinDocument?.plan1st?.meeting?.createdAt), jpFormatTemplate03) : null}</span></div>
          </div>
          <div className='w-1/3 lg:w-1/5 2xl:w-1/6 space-y-1'>
            <div className="underline text-nowrap">本案</div>
            <div className="text-nowrap">格納有無<span className='ml-2'>{convertBoolean2Value(moveinDocument?.plan1st?.main?.store)}</span></div>
            <div className="text-nowrap">サイン＋印<span className='ml-2'>{convertBoolean2Value(moveinDocument?.plan1st?.main?.sign)}</span></div>
            <div className="text-nowrap">サビ管名<span className='ml-2'>{findNameByValue(staffs, moveinDocument?.plan1st?.main?.staff?.toString())}</span></div>
            <div className="text-nowrap">作成日付<span className='ml-2'>{moveinDocument?.plan1st?.main?.createdAt ? formatJPDate(String(moveinDocument?.plan1st?.main?.createdAt), jpFormatTemplate03) : null}</span></div>
          </div>
        </div>

        {/* line 3 */}
        <div className='flex flex-row'>
          <div className='w-1/3 lg:w-1/6'>MEMO</div>
          <div className='w-2/3 lg:w-5/6 whitespace-pre-line border border-gray-300 min-h-24 p-2'>{moveinDocument?.memo}</div>
        </div>
      </div>
    </div>
  )
}