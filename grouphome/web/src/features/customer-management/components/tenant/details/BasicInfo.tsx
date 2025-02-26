import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { TenantMainContext } from '@/features/customer-management/pages/TenantMain';
import { convertToJapaneseEra } from '@/utils/DateUtils';
import { findNameByValue } from '@/utils/Helper';
import { useContext } from 'react';

const yesNoOptions = [
  { name: 'あり', value: 'true' },
  { name: 'なし', value: 'false' },
];

export const BasicInfo = () => {
  const { selectListData } = useSelectList();
  const supportTypes = selectListData.get('support_type')?.filter((e) => e.value) || [];
  const servicePaces = selectListData.get('cust_service_pace')?.filter((e) => e.value) || [];
  const { detailBasic } = useContext(TenantMainContext);

  if (!detailBasic) return (<></>);

  return (
    <div>
      <div className="border border-gray-400 mx-5 my-2 p-1">
        <div className='text-left'>
          基本情報
        </div>
        <div className="p-5">
          <div className="grid grid-cols-12">
            {/* line 1 */}
            <div className="col-span-6 xl:col-span-4">ニックネーム</div>
            <div className="col-span-6 xl:col-span-2">{detailBasic.personal?.nickname}</div>
            <div className="col-span-6 xl:col-span-3">利用事業所名</div>
            <div className="col-span-6 xl:col-span-3">{detailBasic.details?.usedOffice}</div>

            {/* line 2 */}
            <div className="col-span-6 xl:col-span-4">生年月日</div>
            <div className="col-span-6 xl:col-span-2">{convertToJapaneseEra(detailBasic.personal?.birthDay)}</div>
            <div className="col-span-6 xl:col-span-3">利用頻度／週</div>
            <div className="col-span-6 xl:col-span-3">{findNameByValue(servicePaces, `${detailBasic.details?.usedPace}`)}</div>

            {/* line 3 */}
            <div className="col-span-6 xl:col-span-4">障害支援区分</div>
            <div className="col-span-6 xl:col-span-2">{findNameByValue(supportTypes, detailBasic.category?.toString() || '')}</div>
            <div className="col-span-6 xl:col-span-3">入居前の生活場所</div>
            <div className="col-span-6 xl:col-span-3">{detailBasic.details?.beforePlace}</div>

            {/* line 4 */}
            <div className="col-span-6 xl:col-span-4">障害種別と特性（症状名等）</div>
            <div className="col-span-6 xl:col-span-2">{detailBasic.details?.disabilityType}</div>
            <div className="col-span-6 xl:col-span-3">入居前の居住系利用サービス事業所名①</div>
            <div className="col-span-6 xl:col-span-3">{detailBasic.details?.beforeOffice}</div>

            {/* line 5 */}
            <div className="col-span-6 xl:col-span-4">精神障害者地域移行特別加算対象の有無、他</div>
            <div className="col-span-6 xl:col-span-2">{findNameByValue(yesNoOptions, `${detailBasic.details?.mentallyDisabled}`)}</div>
            <div className="col-span-6 xl:col-span-3">入居前の利用福祉サービス②</div>
            <div className="col-span-6 xl:col-span-3">{detailBasic.details?.beforeService2}</div>

            {/* line 6 */}
            <div className="col-span-6 xl:col-span-4">重度障害者支援加算の対象有無</div>
            <div className="col-span-6 xl:col-span-2">{findNameByValue(yesNoOptions, `${detailBasic.details?.severelyDisabled}`)}</div>
            <div className="col-span-6 xl:col-span-3">入居前の利用サービス事業所名</div>
            <div className="col-span-6 xl:col-span-3">{detailBasic.details?.beforeServiceOffice2}</div>

            {/* line 7 */}
            <div className="col-span-6 xl:col-span-4">強度行動障害支援者対象の有無</div>
            <div className="col-span-6 xl:col-span-2">{findNameByValue(yesNoOptions, `${detailBasic.details?.behavioralDisorder}`)}</div>
            <div className="col-span-6 xl:col-span-3">入居前の利用福祉サービス③</div>
            <div className="col-span-6 xl:col-span-3">{detailBasic.details?.beforeService3}</div>

            {/* line 8 */}
            <div className="col-span-6 xl:col-span-4">個人単位で居宅介護の利用有無</div>
            <div className="col-span-6 xl:col-span-2">{findNameByValue(yesNoOptions, `${detailBasic.details?.homeCare}`)}</div>
            <div className="col-span-6 xl:col-span-3">入居前の利用サービス事業所名</div>
            <div className="col-span-6 xl:col-span-3">{detailBasic.details?.beforeServiceOffice3}</div>
          </div>

          <div className="grid grid-cols-8 mt-5">
            <div className="col-span-2 xl:col-span-1">MEMO</div>
            <div className="col-span-5 xl:col-span-7 whitespace-pre-line">{detailBasic.details?.memo}</div>
          </div>
        </div>
      </div>
    </div>
  )
}