import { TypeUnitInfo } from "../../types/UnitInfo";
import { UnitCardItem } from "./UnitCardItem";
import md5 from 'md5';

type ArrayData = {
  data: TypeUnitInfo[];
  handleOpenPopupEdit: (item: TypeUnitInfo) => void;
  openDeletePopup: (item: TypeUnitInfo) => void;
};

function UnitCards({
  data,
  handleOpenPopupEdit,
  openDeletePopup,
}: ArrayData) {
  return (
    <>
      {data?.map((item) => {
        const uniqueKey = md5(JSON.stringify(item));
        return (
          <UnitCardItem
            key={uniqueKey}
            item={item}
            handleOpenPopupEdit={handleOpenPopupEdit}
            openDeletePopup={openDeletePopup}
          />
        );
      })}
    </>
  );
}

export { UnitCards };
