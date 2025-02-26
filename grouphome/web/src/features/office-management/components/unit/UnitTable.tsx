import { CommonTable } from '@/components/elements/common/CommonTable';
import { Unit as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { jsonParse } from '@/utils/JsonUtils';

import { TypeServices, TypeFeatures } from '../../types/Branch';

import {
  getTableColumns,
  unitListData,
  UnitListColumns,
  getFilterItems,
  TableFilterDef,
} from './UnitTableDef';
import { CallBackSelect } from '@/components/elements/Common';
import { useState } from 'react';

type ArgsData = {
  cbSelect: CallBackSelect;
  seq: number;
  resetSelections?: boolean;
  homeId: number | null;
};

const defaultFilter: TableFilterDef = {

};

export const DefaultFeatures: TypeFeatures = {
  system: false,
  barrierFree: false,
  menOnly: false,
  womenOnly: false,
};
export const DefaultServices: TypeServices = {
  GH: false,
  SS: false,
};

function exchangeData(row: []): UnitListColumns[] {
  const ret: any[] = [];
  if (row && row.length > 0) {
    row.forEach((item) => {
      const address = `${item['prefName']} ${item['city']} ${item['town']}`;
  
      ret.push({
        addrId: item['addrId'],
        city: item['city'],
        contents: item['contents'],
        fax: item['fax'],
        homeId: item['homeId'],
        mail: item['mail'],
        postNo: item['postNo'],
        prefId: item['prefId'],
        prefName: item['prefName'],
        tel: item['tel'],
        town: item['town'],
        unitId: item['unitId'],
        unitName: item['unitName'],
        updatedAtAddr: item['updatedAtAddr'],
        updatedAtUnit: item['updatedAtUnit'],
        address: address,
        concept: ''
      });
    });
  }
  return ret;
}

function UnitTable({ cbSelect, seq, resetSelections, homeId }: ArgsData) {
  const columns = getTableColumns();
  const body = {homeId: homeId ? homeId : 0}
  const seqHomeId = homeId ? (homeId + seq) : seq

  return (
    <>
      <CommonTable<TableFilterDef>
        column={columns}
        data={unitListData}
        path={ApiPath}
        seq={seqHomeId}
        cbSelect={cbSelect}
        cbExchangeData={exchangeData}
        resetSelections={resetSelections}
        body={body}
      />
    </>
  );
}
export { UnitTable, exchangeData };
