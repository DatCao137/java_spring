import { CommonTable } from '@/components/elements/common/CommonTable';
import { Branch as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { jsonParse } from '@/utils/JsonUtils';

import { TypeServices, TypeFeatures } from '../../types/Branch';

import {
  getTableColumns,
  officeListData,
  OfficeListColumns,
  getFilterItems,
  TableFilterDef,
} from './OfficeTableDef';
import { CallBackSelect } from '@/components/elements/Common';
import { useState } from 'react';

type ArgsData = {
  cbSelect: CallBackSelect;
  seq: number;
  resetSelections?: boolean;
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
const defaultFilter: TableFilterDef = {
  branchName: null, homeName: null, capacity: null, groupType: null,
  features: null, address: null, services: null
};

function exchangeData(row: []): OfficeListColumns[] {
  const ret: OfficeListColumns[] = [];
  row.forEach((item) => {
    const features = jsonParse('features', item['features'], DefaultFeatures);
    const services = jsonParse('services', item['services'], DefaultServices);
    const address = `${item['prefName']}${item['city']}${item['town']}`;

    ret.push({
      id: item['id'],
      no: item['no'],
      branchName: item['branchName'],
      homeName: item['homeName'],
      capacity: item['capacity'],
      groupHomeTypeId: item['groupHomeTypeId'],
      groupHomeName: item['groupHomeName'],
      features: item['features'],
      featureSystem: features?.system ? '○' : '',
      featureBarrierFree: features?.barrierFree ? '○' : '',
      featureMenOnly: features?.menOnly ? '○' : '',
      featureWomenOnly: features?.womenOnly ? '○' : '',
      addrId: item['addrId'],
      address: address,
      contents: item['contents'],
      servicegh: services?.GH ? '○' : '',
      servicess: services?.SS ? '○' : '',
      homeId: item['homeId'],
      prefName: item['prefName']
    });
  });
  return ret;
}

function OfficeTable({ cbSelect, seq, resetSelections }: ArgsData) {
  const [ filter, setFilter ] = useState<TableFilterDef>(defaultFilter);
  const columns = getTableColumns();
  const filterDef = getFilterItems();

  return (
    <>
      <CommonTable<TableFilterDef>
        column={columns}
        data={officeListData}
        path={ApiPath}
        pager={true}
        seq={seq}
        filter={{ vals: filter, setter: setFilter, def: filterDef }}
        cbSelect={cbSelect}
        cbExchangeData={exchangeData}
        resetSelections={resetSelections}
      />
    </>
  );
}
export { OfficeTable, exchangeData };
