import { Button } from "@/components/ui/button";
import { TypeContents, TypeUnitInfo } from "../../types/UnitInfo";
import { jsonParse } from "@/utils/JsonUtils";
import { FEATURES_BARRIERFREE, FEATURES_MEN_ONLY, FEATURES_SYSTEM, FEATURES_WOMEN_ONLY, SERVICE_GH, SERVICE_SS } from "@/features/blc-common/assets/StringConst";

type UnitCardItemProps = {
  item: TypeUnitInfo;
  handleOpenPopupEdit: (item: TypeUnitInfo) => void;
  openDeletePopup: (item: TypeUnitInfo) => void;
};
const DefaultContents: TypeContents = {
  basic: { startDate: null, capacity: 0, concept: '' },
  features: { system: false, barrierFree: false, menOnly: false, womenOnly: false },
  services: { GH: false, SS: false},
}

function UnitCardItem({
  item,
  handleOpenPopupEdit,
  openDeletePopup,
}: UnitCardItemProps) {
  const contents = jsonParse('contents', item.contents, DefaultContents);
  const basic = contents.basic;
  const features = contents.features;
  const featureArrays = [];
  if (features.system) {
      featureArrays.push(FEATURES_SYSTEM);
  }
  if (features.barrierFree) {
      featureArrays.push(FEATURES_BARRIERFREE);
  }
  if (features.menOnly) {
      featureArrays.push(FEATURES_MEN_ONLY);
  }
  if (features.womenOnly) {
      featureArrays.push(FEATURES_WOMEN_ONLY);
  }

  const services = contents.services;
  const serviceArrays = [];
  if (services.GH) {
      serviceArrays.push(SERVICE_GH);
  }
  if (services.SS) {
      serviceArrays.push(SERVICE_SS);
  }

  return (
    <div className="card">
      <div>{item.unitName}</div>
      <div>{(basic.startDate || '').toString()}</div>
      <div>〒{item.postNo}</div>
      <div>{item.prefName + item.city + item.town}</div>
      <div>{item.tel}</div>
      <div>{item.mail}</div>
      <div>{basic.capacity}</div>
      <div>{basic.concept}</div>
      <div>{featureArrays.join('、 ')}</div>
      <div>{serviceArrays.join('、 ')}</div>
      <div className="text-right unit-action-button-container">
        <Button
          className="btn-style unit-action-button"
          onClick={() => openDeletePopup(item)}
        >
          削除
        </Button>
        <Button
          className="btn-style unit-action-button"
          onClick={() => handleOpenPopupEdit(item)}
        >
          編集
        </Button>
      </div>
    </div>
  );
}

export { UnitCardItem };
