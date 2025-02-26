import { Dispatch, SetStateAction, useRef } from 'react';

import { OfficeDetailInfo } from './OfficeDetailInfo';
import { UnitInfo } from '../unit/UnitInfo';

type ArgsData = {
  branchId: number | null;
  homeId: number | null;
  seq: number;
  setRowDataDetail: Dispatch<SetStateAction<FormData>>;
  loadParentData?: () => void;
};


function OfficeDetail({ branchId, homeId, setRowDataDetail, loadParentData, seq }: ArgsData) {
  const reloadData = async () => {
    if ( loadParentData ) {
      loadParentData(); 
    }
  }
  
  if (branchId == null) {
    return <></>;
  }
  return (
    <>
      <div id="officeDetailInfo">
        <OfficeDetailInfo
          branchId={branchId}
          seq={seq}
          setRowDataDetail={setRowDataDetail}
        />
      </div>

      <div id="unitInfo">
        <UnitInfo loadParentData={reloadData} branchId={branchId} homeId={homeId} seq={seq} />
      </div>
    </>
  );
}

export { OfficeDetail };
