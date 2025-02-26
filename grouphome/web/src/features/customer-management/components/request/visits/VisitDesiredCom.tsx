import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { VisitDesired } from '@/features/customer-management/types/Request';
import { formatJPDate, jpFormatTemplate02 } from '@/utils/DateUtils';

import { InputCheckbox } from '../InputCheckBox';
import { defaultDesiredDate } from '../RequestTable';

type desiredProps = {
  desired: VisitDesired;
  requestInfo: any;
};

const ATTRIBUTE = 'attendant_attr';

export const VisitDesiredCom = ({ desired, requestInfo }: desiredProps) => {
  const { selectListData } = useSelectList();
  const attributes =
    selectListData.get(ATTRIBUTE)?.filter((e) => e.value) || [];
  const desiredDate =
    requestInfo?.desiredDate || Object.values(defaultDesiredDate);
  const desiredFirst = desiredDate[0] ? desiredDate[0]?.split(' ') : [];
  const desiredSecond = desiredDate[1] ? desiredDate[1]?.split(' ') : [];

  return (
    <>
      <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
        希望日時
      </div>
      <div className="col-span-7 grid grid-cols-subgrid">
        {/* line 1 */}
        <div className="col-span-7 grid grid-cols-11">
          <div className="col-span-2 border-collapse content-center text-wrap border text-center">
            第１希望
          </div>
          <div className="col-span-2 border-collapse content-center text-wrap border text-center">
            第2希望
          </div>
          <div className="col-span-4 border-collapse content-center text-wrap border text-center">
            希望人数・属性
          </div>
          <div className="col-span-3 border-collapse content-center text-wrap border text-center">
            当日連絡先
          </div>
        </div>

        {/* line 2 */}
        <div className="col-span-7 grid grid-cols-11">
          <div className="col-span-2 border-collapse border px-2">
            <div className="text-left">
              {formatJPDate(desiredFirst[0], jpFormatTemplate02)}
            </div>
            <div className="text-left">時間帯 : {desiredFirst[1]}</div>
          </div>
          <div className="col-span-2 border-collapse border px-2">
            <div className="text-left">
              {formatJPDate(desiredSecond[0], jpFormatTemplate02)}
            </div>
            <div className="text-left">時間帯 : {desiredSecond[1]}</div>
          </div>
          <div className="col-span-4 border-collapse border px-2">
            <div className="text-left">{desired?.count || 0}人</div>
            <div className="grid grid-cols-6 2xl:flex 2xl:flex-row items-center">
              {attributes.map((item, index) => (
                <InputCheckbox
                  key={index}
                  checked={desired?.attribute.includes(item.value)}
                  label={item.name}
                  className="col-span-3 mr-2 text-nowrap"
                />
              ))}
            </div>
          </div>
          <div className="col-span-3 border-collapse border px-2">
            <div className="text-left whitespace-pre-line">{desired?.contactInfo || ''}</div>
          </div>
        </div>
      </div>
    </>
  );
};
