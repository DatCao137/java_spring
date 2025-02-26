import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { VisitBase } from '@/features/customer-management/types/Request';

import { InputCheckbox } from '../InputCheckBox';
import { InputCheckboxRadio } from '../InputCheckboxRadio';
import { z } from 'zod';
import { PostalAddress } from '@/features/office-management/validations/address';
import { getAddress, getPrefByID } from '@/utils/Helper';

export type visitBaseProps = {
  base: VisitBase;
};

export const visitBaseDefault: VisitBase = {
  hopeItems: [],
  hopeOther: '',
  name: '',
  gana: '',
  sex: '',
  age: 0,
  address: {
    postNo1st: '',
    postNo2nd: '',
    prefId: null,
    city: '',
    town: '',
  },
  contact: {
    tel: '',
    fax: '',
    mail: '',
  },
  disability: {
    name: '',
    type: '',
    pocketbook: {
      has: null,
      contents: '',
    },
  },
  recipient: {
    has: null,
  },
  visiting: {
    has: null,
    contents: '',
  },
  attached: {
    has: null,
    contents: '',
    isBring: false,
  },
};

const HOPE_ITEM = 'hope_items';
const SEX = 'sex';
const OTHER_OPTION = 'その他';
const POCKET_BOOK = 'pocket_book';
const PREFECTURES = 'prefectures';
const SUPPORT_TYPE = 'support_type';

export const VisitBaseCom = ({ base }: visitBaseProps) => {
  const { selectListData } = useSelectList();
  const hopeItems = selectListData.get(HOPE_ITEM)?.filter((e) => e.value) || [];
  const sexes = selectListData.get(SEX)?.filter((e) => e.value) || [];
  const pocketBooks =
    selectListData.get(POCKET_BOOK)?.filter((e) => e.value) || [];
  const prefectures = selectListData.get(PREFECTURES)?.filter((e) => e.value) || [];

  const supportTypes =
      selectListData.get(SUPPORT_TYPE)?.filter((e) => e.value) || [];

  const pocketContent =
    base?.disability?.pocketbook?.has && base?.disability?.pocketbook?.contents
      ? pocketBooks.find(
        (e) => e.value == base?.disability?.pocketbook?.contents,
      )?.name || ''
      : '';

  const disabilityType = supportTypes.find(item => item.value == base?.disability?.type);
  const disabilityTypeName =  disabilityType ? disabilityType.name : '';   
  return (
    <>
      <div className="col-span-1 border-collapse content-center text-wrap border px-3 text-center">
        希望内容
      </div>
      <div className="col-span-7 grid grid-cols-subgrid">
        <div className="col-span-7 grid border-collapse grid-cols-12 gap-1 border p-2">
          {hopeItems.map((item, index) => (
            <InputCheckbox
              key={index}
              checked={base?.hopeItems?.includes(item.value) || false}
              label={`${item.name} ${base?.hopeItems?.includes(item.value) &&
                item.name == OTHER_OPTION
                ? '(' + base?.hopeOther + ')'
                : ''
                }`}
              className={`${base?.hopeItems?.includes(item.value) &&
                item.name == OTHER_OPTION
                ? 'col-span-6'
                : 'col-span-2'
                }`}
            />
          ))}
        </div>

        {/* お名前 */}
        <div className="col-span-7 grid grid-cols-10">
          <div className="col-span-1 border-collapse content-center text-wrap border text-center">
            お名前
          </div>
          <div className="col-span-6 grid border-collapse grid-cols-1 border px-2">
            <div className="col-span-1">{base?.gana || ''}</div>
            <div className="col-span-1">{base?.name || ''}</div>
          </div>
          <div className="col-span-3 grid border-collapse grid-cols-subgrid border px-2">
            <div className="col-span-1 border-b border-r">性別</div>
            <div className="col-span-2 border-b px-2">
              {sexes.map((sex, index) => (
                <InputCheckboxRadio
                  key={index}
                  checked={base?.sex == sex.value}
                  label={sex.name}
                  className="mr-2"
                />
              ))}
            </div>
            <div className="col-span-1 border-r">ご年齢</div>
            <div className="col-span-2 px-2">{base?.age || ''}歳</div>
          </div>
        </div>

        {/* ご住所 */}
        <div className="col-span-7 grid grid-cols-10">
          <div className="col-span-1 border-collapse content-center text-wrap border text-center">
            ご住所
          </div>
          <div className="col-span-9 border-collapse border px-2">
            <div>〒{(base?.address?.postNo1st || '') + '-' + (base?.address?.postNo2nd || '')}</div>
            <div>{getAddress(prefectures, base?.address)}</div>
          </div>
        </div>

        {/* ご連絡先 */}
        <div className="col-span-7 grid grid-cols-10">
          <div className="col-span-1 border-collapse content-center text-wrap border text-center">
            ご連絡先
          </div>
          <div className="col-span-9 grid border-collapse grid-cols-2 border px-2">
            <div className="col-span-1">電話 : {base?.contact?.tel || ''}</div>
            <div className="col-span-1">FAX : {base?.contact?.fax}</div>
            <div className="col-span-1">メール : {base?.contact?.mail}</div>
          </div>
        </div>

        {/* 障がい名 */}
        <div className="col-span-7 grid grid-cols-10">
          <div className="col-span-1 border-collapse content-center text-wrap border text-center">
            障がい名
          </div>
          <div className="col-span-4 px-2">{base?.disability?.name || ''}</div>
          <div className="col-span-2 border-collapse border text-center">
            障がい支援区分
          </div>
          <div className="col-span-3 border-collapse border px-2">
            {disabilityTypeName}
          </div>
        </div>

        {/* 障がい者手帳の有無 */}
        <div className="col-span-7 grid grid-cols-10">
          <div className="col-span-1 row-span-2 border-collapse content-center text-wrap border text-center">
            障がい者手帳の有無
          </div>
          <div className="col-span-4 grid border-collapse grid-cols-1 border px-2">
            <InputCheckboxRadio
              checked={base?.disability?.pocketbook?.has === true}
              label={`あり${pocketContent ? '(' + pocketContent + ')' : ''}`}
              className="col-span-1"
            />
            <InputCheckboxRadio
              checked={base?.disability?.pocketbook?.has === false}
              label={`なし`}
              className="col-span-1"
            />
          </div>
          <div className="col-span-2 content-center text-wrap text-center">
            受給者証の有無
          </div>
          <div className="col-span-3 grid border-collapse grid-cols-1 border px-2">
            <InputCheckboxRadio
              checked={base?.recipient?.has === true}
              label={`あり`}
              className="col-span-1"
            />
            <InputCheckboxRadio
              checked={base?.recipient?.has === false}
              label={`なし`}
              className="col-span-1"
            />
          </div>
        </div>

        {/* 通所先 */}
        <div className="col-span-7 grid grid-cols-10 border-collapse border">
          <div className="col-span-1 row-span-2 content-center text-wrap border-r text-center">
            通所先
          </div>
          <InputCheckboxRadio
            checked={base?.visiting?.has === false}
            label={`なし`}
            className="text-nowrap px-2"
          />
          <InputCheckboxRadio
            checked={base?.visiting?.has === true}
            label={`あり${base?.visiting?.has ? '(' + (base?.visiting?.contents || ' ') + ')' : ''}`}
            className="text-nowrap px-2"
          />
        </div>

        {/* 添付書類 */}
        <div className="col-span-7 grid grid-cols-10 border-collapse border">
          <div className="col-span-1 row-span-2 content-center text-wrap border-r text-center">
            添付書類
          </div>
          <InputCheckboxRadio
            checked={base?.attached?.has === false}
            label={`なし`}
            className="text-nowrap px-2"
          />
          <InputCheckboxRadio
            checked={base?.attached?.has === true}
            label={`あり${base?.attached?.has && base?.attached?.contents ? '(' + (base?.attached?.contents || ' ') + ')' : ''}`}
            className="text-nowrap px-2"
          />
          <div className="col-span-9 px-2">
            ※既往歴や看護サマリーなど 当日お持ちいただける場合はチェック→
            <InputCheckbox
              checked={base?.attached?.isBring}
              label={``}
              className="px-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};
