import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { ContentMoveIn } from '@/features/customer-management/types/Request';
import { formatJPDate, jpFormatTemplate02 } from '@/utils/DateUtils';

import { InputCheckbox } from '../InputCheckBox';
import { InputCheckboxRadio } from '../InputCheckboxRadio';

type props = {
  content: ContentMoveIn;
};

const HEALTH_INSURANCE = 'health_insurance';

const EXPENSES_TYPE = [
  { name: '自己負担', value: '1' },
  { name: '自立支援医療', value: '2' },
];

export const InsuranceInfoCom = ({ content }: props) => {
  const { selectListData } = useSelectList();
  const healthInsuranceList =
    selectListData.get(HEALTH_INSURANCE)?.filter((e) => e.value) || [];
  const { insurance } = content;

  return (
    <>
      <div className="mt-6">保険</div>
      <div className="ml-6 grid grid-cols-10">
        {/* Line 1 */}
        <div className="col-span-1 border-collapse content-center border text-center">
          健康保険
        </div>
        <div className="col-span-4 border-collapse border px-2 space-x-1">
          {healthInsuranceList.map((item) => (
            <InputCheckboxRadio
              key={item.value}
              checked={insurance?.type?.type == item.value}
              label={
                item.name
                + (insurance?.type?.type == item.value && item.name == 'その他' && insurance?.type?.contents
                  ? '(' + insurance?.type?.contents + ')' : '')
              }
            />
          ))}
        </div>
        <div className="col-span-1 border-collapse content-center border text-center">
          介護保険
        </div>
        <div className="col-span-4 border-collapse border px-2 space-x-1">
          <InputCheckboxRadio checked={insurance?.care?.has === true} label="利用あり" />
          <InputCheckboxRadio checked={insurance?.care?.has === false} label="利用なし" />
        </div>
        {/* Line2 */}
        <div className="col-span-1 border-collapse content-center border text-center">
          有効期限
        </div>
        <div className="col-span-4 border-collapse border px-2">
          {formatJPDate(
            typeof insurance.limit == 'string' ? insurance.limit : '',
            jpFormatTemplate02,
          )}{' '}
          まで
        </div>
        <div className="col-span-1 border-collapse content-center border text-center">
          医療費
        </div>
        <div className="col-span-4 border-collapse border px-2 space-x-1">
          {EXPENSES_TYPE.map((item) => {
            let label = item?.name || '';
            let valueExpensesType = '2';
            label += (insurance?.expenses?.type == valueExpensesType && item.value == valueExpensesType) ? '(負担額上限' : '';
            label += (insurance?.expenses?.type == valueExpensesType && item.value == valueExpensesType) ? (insurance?.expenses?.type == item.value && insurance?.expenses?.limit ? insurance?.expenses?.limit : '__') : '';
            label += (insurance?.expenses?.type == valueExpensesType && item.value == valueExpensesType) ? '円)' : '';
            return (
              <InputCheckboxRadio
                key={item.value}
                checked={insurance?.expenses?.type == item.value}
                label={label}
              />
            )
          })}
        </div>
      </div>
    </>
  );
};
