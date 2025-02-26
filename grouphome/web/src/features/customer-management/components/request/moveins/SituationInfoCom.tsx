import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { ContentMoveIn } from '@/features/customer-management/types/Request';

import { InputCheckbox } from '../InputCheckBox';
import { InputCheckboxRadio } from '../InputCheckboxRadio';

type props = {
  content: ContentMoveIn;
};

const WEEKS = 'weeks';
const TRANSFER_TYPE = 'transfer_type';
const TRANSPORTATION_TYPE = 'transportation_type';
const MONEY_MANAGEMENT = 'money_management';
const transferTypeSelfEfficacy = '1'; //自力通所
const transferTypeOrther = '4'; //その他


export const SituationInfoCom = ({ content }: props) => {
  const { selectListData } = useSelectList();
  const weeks = selectListData.get(WEEKS)?.filter((e) => e.value) || [];
  const transferTypes =
    selectListData.get(TRANSFER_TYPE)?.filter((e) => e.value) || [];
  const transportationTypes =
    selectListData.get(TRANSPORTATION_TYPE)?.filter((e) => e.value) || [];
  const moneyManagement =
    selectListData.get(MONEY_MANAGEMENT)?.filter((e) => e.value) || [];

  const { situation } = content;
  return (
    <>
      <div className="mt-6">活動状況</div>
      <div className="ml-6 grid grid-cols-8">
        <div className="col-span-1 border-collapse content-center border px-2 text-center">
          現在の日中活動先
        </div>
        <div className="col-span-4 border-collapse border px-2">
          <div>(※未定の場合は入居後の希望活動場所等)</div>
          <div>
            <InputCheckboxRadio checked={situation?.place?.has === false} label="なし" />
            <InputCheckboxRadio
              checked={situation?.place?.has === true}
              label={`あり${situation?.place?.has && situation?.place?.contents ? '(' + situation?.place?.contents + ')' : ''}`}
              className="mr-4"
            />
          </div>
        </div>
        <div className="col-span-1 border-collapse content-center border px-2 text-center">
          その他利用中サービス
        </div>
        <div className="col-span-2 border-collapse border px-2">
          {situation?.etcService || ''}
        </div>

        <div className="col-span-1 border-collapse content-center border px-2 text-center">
          活動日
        </div>
        <div className="col-span-7 grid border-collapse grid-cols-7 border px-2">
          <div className="col-span-3">
            {weeks?.map((item, index) => (
              <InputCheckbox
                key={index}
                checked={situation?.activity?.weeks?.includes(item.value)}
                label={item?.name || ''}
                className="mr-4"
              />
            ))}
          </div>
          <div className="col-span-1">
            計週{situation?.activity?.weeks?.length || 0}回
          </div>
          <div className="col-span-3">
            活動時間 : {situation?.activity?.startHour || ''}時 ~{' '}
            {situation?.activity?.endHour || ''}時
          </div>
          <div className="col-span-7">
            特記事項({situation?.activity?.notes || ''})
          </div>
        </div>
        <div className="col-span-1 border-collapse content-center border px-2 text-center">
          送迎の有無
        </div>
        <div className="col-span-7 border-collapse border px-2">
          <div>
            {transferTypes?.map((item, index) => (
              <InputCheckboxRadio
                key={index}
                checked={situation?.transfer?.transferType == item.value}
                label={`${item?.name || ''}${situation?.transfer?.transferType == transferTypeOrther && situation?.transfer?.transferType == item.value && situation?.transfer?.contents ? '(' + situation?.transfer?.contents + ')' : ''}`}
                className="mr-4"
              />
            ))}
          </div>
          <div>
            {situation?.transfer?.transferType === transferTypeSelfEfficacy && (
              <div>
                (利用できる交通手段→
                {transportationTypes.map((item, index) => (
                  <InputCheckboxRadio
                    key={index}
                    checked={situation?.transfer?.transportationType == item.value}
                    label={item?.name || ''}
                    className="mr-4"
                  />
                ))}
                )
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 border-collapse content-center border px-2 text-center">
          日中活動に行かない日の支援の必要性
        </div>
        <div className="col-span-7 border-collapse border px-2 py-3">
          <div>
            <InputCheckboxRadio
              checked={situation?.needSupport?.has === false}
              label="不要(一人で過ごせる)"
              className="mr-4"
            />
            <InputCheckboxRadio
              checked={situation?.needSupport?.has === true}
              label={`必要${situation?.needSupport?.has && situation?.needSupport?.contents ? '(' + situation?.needSupport?.contents + ')' : ''}`}
            />
          </div>
        </div>

        <div className="col-span-1 border-collapse content-center border px-5 text-center">
          土日祝の過ごし方
        </div>
        <div className="col-span-7 border-collapse border px-2">
          {situation?.howToSpend || ''}
        </div>

        <div className="col-span-1 border-collapse content-center border px-2 text-center">
          服薬状況
        </div>
        <div className="col-span-7 border-collapse border px-2">
          <div>
            <InputCheckboxRadio
              checked={situation?.medication?.has === false}
              label="なし"
              className="mr-4"
            />
            <InputCheckboxRadio
              checked={situation?.medication?.has === true}
              label={`あり${situation?.medication?.has && situation?.medication?.contents ? '(' + situation?.medication?.contents + ')' : ''}`}
            />
          </div>
        </div>

        <div className="col-span-1 border-collapse content-center border px-2 text-center">
          医療的ケア
        </div>
        <div className="col-span-7 border-collapse border px-2">
          <div>
            <InputCheckboxRadio
              checked={situation?.care?.has === false}
              label="なし"
              className="mr-4"
            />
            <InputCheckboxRadio
              checked={situation?.care?.has === true}
              label={`あり${situation?.care?.has && situation?.care?.contents ? '(' + situation?.care?.contents + ')' : ''}`}
            />
          </div>
        </div>

        <div className="col-span-1 border-collapse content-center border px-2 text-center">
          金銭管理
        </div>
        <div className="col-span-7 border-collapse border px-2">
          {moneyManagement?.map((item, index) => (
            <InputCheckboxRadio
              key={index}
              checked={situation?.money == item.value}
              label={item?.name || ''}
              className="mr-4"
            />
          ))}
        </div>
      </div>
    </>
  );
};
