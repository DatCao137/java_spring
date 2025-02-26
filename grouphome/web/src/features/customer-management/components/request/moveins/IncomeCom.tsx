import { ContentMoveIn } from '@/features/customer-management/types/Request';

import { InputCheckbox } from '../InputCheckBox';

type props = {
  content: ContentMoveIn;
};

export const IncomeCom = ({ content }: props) => {
  const { pension, welfare, pensionOther, working, familyAssist, others } = content.income;
  return (
    <>
      <div className="mt-6">入居後収入</div>
      <div className="ml-6 grid grid-cols-12 border-collapse border p-2">
        <div className="col-span-6 lg:col-span-4 2xl:col-span-3 flex flex-row items-center">
          <InputCheckbox
            checked={pension?.available}
            label={`障害基礎/厚生年金(月額${pension?.available && pension?.amount ? pension.amount : '___'}円)`}
            className="mr-2"
          />
        </div>
        <div className="col-span-6 lg:col-span-4 2xl:col-span-3 flex flex-row items-center">
          <InputCheckbox
            checked={welfare?.available}
            label={`生活保護(月額${welfare?.available && welfare?.amount ? welfare.amount : '___'}円)`}
            className="mr-2"
          />
        </div>
        <div className="col-span-6 lg:col-span-4 2xl:col-span-6 flex flex-row items-center">
          <InputCheckbox
            checked={pensionOther?.available}
            label={`その他年金(月額${pensionOther?.available && pensionOther?.amount ? pensionOther.amount : '___'}円)`}
            className="mr-2"
          />
        </div>
        <div className="col-span-6 lg:col-span-4 2xl:col-span-3 flex flex-row items-center">
          <InputCheckbox
            checked={working?.available}
            label={`就労収入(月額${working?.available && working?.amount ? working.amount : '___'}円)`}
            className="mr-2"
          />
        </div>
        <div className="col-span-6 lg:col-span-4 2xl:col-span-3 flex flex-row items-center">
          <InputCheckbox
            checked={familyAssist?.available}
            label={`家族援助(月額${familyAssist?.available && familyAssist?.amount ? familyAssist.amount : '___'}円)`}
            className="mr-2"
          />
        </div>
        <div className="col-span-6 lg:col-span-4 2xl:col-span-3 flex flex-row items-center">
          <InputCheckbox
            checked={others?.available}
            label={`その他(${others?.available && others?.name ? others.name : '___'}月額${others.available && others.amount ? others.amount : '___'}円)`}
            className="mr-2"
          />
        </div>
      </div>
    </>
  );
};
