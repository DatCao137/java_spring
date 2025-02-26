import { CommonTable } from '@/components/elements/common/CommonTable';

import { jsonParse } from '@/utils/JsonUtils';
import { getTableColumns, homeListData, HomeListColumns, getFilterItems, TableFilterDef } from './HomeTableDef';
import { Home as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { CallBackSelect } from '@/components/elements/Common';
import { useState } from 'react';

type ArgsData = {
  cbSelect: CallBackSelect;
  seq: number;
  resetSelections?: boolean;
};

const defaultFilter: TableFilterDef = {
  homeName: null, branchName: null, address: null, tel: null,
  units: null
};

function exchangeData(row:[]): HomeListColumns[] {
  var ret:HomeListColumns[] = [];
  row.forEach((item) => {
    const wk = jsonParse('units', item['units'], []);
    var units = '';
    wk.forEach(unit => {
        units = units + unit['name'] + '\n';
    })
    ret.push({
      id: item['id'],
      homeName: item['homeName'],
      branchId: item['branchId'],
      branchName: item['branchName'],
      postNo: item['postNo'],
      prefId: item['prefId'],
      prefName: item['prefName'],
      addrId: item['addrId'],
      address: "",
      city: item['city'],
      town: item['town'],
      tel: item['tel'],
      units: units,
      updatedAtHome: item['updatedAtHome'],
      updatedAtAddr: item['updatedAtAddr'],
    });
  });
  return ret;
}

function HomeTable({ cbSelect, seq, resetSelections }: ArgsData) {
  const columns = getTableColumns();
  const [ filter, setFilter ] = useState<TableFilterDef>(defaultFilter);
  const filterDef = getFilterItems();
  return (
    <>
      <CommonTable
        column={columns}
        data={homeListData}
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
export { HomeTable, exchangeData };
