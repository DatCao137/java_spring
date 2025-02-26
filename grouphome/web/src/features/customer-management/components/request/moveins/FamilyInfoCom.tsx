import { ContentMoveIn } from '@/features/customer-management/types/Request';

import { InputCheckbox } from '../InputCheckBox';
import { getAddress } from '@/utils/Helper';
import { useSelectList } from '@/features/customer-management/contexts/SelectListContext';
import { InputCheckboxRadio } from '../InputCheckboxRadio';

type props = {
  content: ContentMoveIn;
};

export const FamilyInfoCom = ({ content }: props) => {
  const { selectListData } = useSelectList();
  const prefectures = selectListData.get('prefectures')?.filter((e) => e.value) || [];
  const { family } = content;
  return (
    <>
      <div className="mt-6">家族構成</div>
      <div className="ml-6 grid grid-cols-12">
        <div className="col-span-4 border-collapse border text-center">
          氏名(ふりがな)
        </div>
        <div className="col-span-2 border-collapse border text-center">
          続柄
        </div>
        <div className="col-span-6 border-collapse border text-center">
          住所
        </div>
        {family?.map((item, index) => (
          <span className="col-span-12 grid grid-cols-12" key={index}>
            <div className="col-span-4 border-collapse content-center border text-center">
              {item?.name || ''}
              {item?.gana ? '(' + item?.gana + ')' : ''}
            </div>
            <div className="col-span-2 border-collapse content-center border text-center">
              {item.relationship || ''}
            </div>
            <div className="col-span-6 border-collapse border px-2">
              <InputCheckboxRadio
                checked={item?.together?.has === true}
                label="同居"
                className="mr-2"
              />
              <InputCheckboxRadio checked={item?.together?.has === false} label="別居" />
              {item?.together?.has === false && item?.together?.address
                ? '→〒'
                  + (item?.together?.address?.postNo1st || '')
                  +  '-'
                  + (item?.together?.address?.postNo2nd || '')
                  + ' ' + getAddress(prefectures, item?.together?.address)
                : ''}
            </div>
          </span>
        ))}
      </div>
    </>
  );
};
