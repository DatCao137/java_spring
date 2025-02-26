import { TenantMainContext } from "@/features/customer-management/pages/TenantMain";
import { useContext, useEffect } from "react";
import { TenantTabContext } from "../../Tabs";
import { useSelectList } from "@/features/customer-management/contexts/SelectListContext";
import { TenantHandbookDetail } from "@/features/blc-common/assets/ApiPath";
import { Get } from '@/features/blc-common/utils/ServerRequest';
import { SaveCustomerHandbookStatusRequestDto } from "@/features/customer-management/validator/tenant/CustomerHandbookStatusSchema";
import { convertToJapaneseEra, formatJPDate } from "@/utils/DateUtils";
import { convertBoolean2Value, findNameByValue, formatCurrency } from "@/utils/Helper";

export const Tab = () => {
  const { customerId } = useContext(TenantMainContext);
  const { selectListData } = useSelectList();
  const categories = selectListData.get('support_type')?.filter((e) => e.value) || [];
  const { handbook, setHandbook } = useContext(TenantTabContext);

  const fetchData = async () => {
    Get({
      apiPath: `${TenantHandbookDetail}/${customerId}`,
      params: {},
      onSuccess: (res) => {
        setHandbook(res.data.data as SaveCustomerHandbookStatusRequestDto);
      },
      onError: (res) => {
        setHandbook(null);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [customerId, handbook?.id]);

  if (!customerId) return (<></>);
  return (
    <div className='p-5'>
      {/* box 1 */}
      <div className="grid grid-cols-12 mt-3">
        {/* line 1 */}
        <div className="col-span-6 lg:col-span-3">受給者番号</div>
        <div className="col-span-6 lg:col-span-3">{handbook?.recipient?.no}</div>
        <div className='col-span-12 lg:col-span-6 grid grid-cols-12'>
          <div className="col-span-6 lg:col-span-7">通所先</div>
          <div className="col-span-6 lg:col-span-5">{handbook?.visitingPlace}</div>
        </div>

        {/* line 2 */}
        <div className="col-span-6 lg:col-span-3">受給者証（GH支給決定を受けたもの）</div>
        <div className="col-span-6 lg:col-span-3">
          {convertBoolean2Value(handbook?.recipient?.certificateGH)}
        </div>
        <div className='col-span-12 lg:col-span-6 grid grid-cols-12'>
          <div className="col-span-6 lg:col-span-7">何の支給決定（他サービス）を受けているか</div>
          <div className="col-span-6 lg:col-span-5">{handbook?.service}</div>
        </div>

        {/* line 3 */}
        <div className="col-span-6 lg:col-span-3">支給決定期限（和暦）</div>
        <div className="col-span-6 lg:col-span-3">
          {formatJPDate(handbook?.recipient?.limit ? String(handbook?.recipient?.limit) : null)}
          {formatJPDate(handbook?.recipient?.limit ? String(handbook?.recipient?.limit): null) ? `（${convertToJapaneseEra(handbook?.recipient?.limit)}）` : null}
        </div>
        <div className='col-span-12 lg:col-span-6 grid grid-cols-12'>
          <div className="col-span-6 lg:col-span-7">障がい者手帳</div>
          <div className="col-span-6 lg:col-span-5">{handbook?.handbookType}</div>
        </div>
      </div>

      {/* box 2 */}
      <div className="grid grid-cols-12 mt-8">
        {/* line 1 */}
        <div className="col-span-6 lg:col-span-3">障害者支援区分</div>
        <div className="col-span-6 lg:col-span-9">
          {findNameByValue(categories, handbook?.disabled?.category?.toString() || '')}
        </div>

        {/* line 2 */}
        <div className="col-span-6 lg:col-span-3">認定期限（和暦）</div>
        <div className="col-span-6 lg:col-span-9">
          {formatJPDate(handbook?.disabled?.limit ? String(handbook?.disabled?.limit ) : null)}
          {formatJPDate(handbook?.disabled?.limit ? String(handbook?.disabled?.limit ) : null) ? `（${convertToJapaneseEra(handbook?.disabled?.limit)}）` : null}
        </div>
      </div>

      {/* box 3 */}
      <div className="grid grid-cols-12 mt-8">
        {/* line 1 */}
        <div className="col-span-6 lg:col-span-3">上限額管理</div>
        <div className="col-span-6 lg:col-span-9">{formatCurrency(handbook?.limit?.amount)}</div>

        {/* line 2 */}
        <div className="col-span-6 lg:col-span-3">上限額管理期限（和暦）</div>
        <div className="col-span-6 lg:col-span-9">
          {formatJPDate(handbook?.limit?.limit ? String(handbook?.limit?.limit) : null)}
          {formatJPDate(handbook?.limit?.limit ? String(handbook?.limit?.limit) : null) ? `（${convertToJapaneseEra(handbook?.limit?.limit)}）` : null}
        </div>
      </div>
    </div>
  )
}
