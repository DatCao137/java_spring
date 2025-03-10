import { CommonTable } from '@/components/elements/common/CommonTable';

import { jsonParse } from '@/utils/JsonUtils';
import { getTableColumns, EmployeeListData, EmployeeListColumns, getFilterItems, TableFilterDef } from '@/features/employee-management/components/home/EmployeeTableDef';
// import { Home as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { Employee as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { CallBackSelect } from '@/components/elements/Common';
import { useState } from 'react';

type ArgsData = {
  cbSelect: CallBackSelect;
  seq: number;
  resetSelections?: boolean;
};

const defaultFilter: TableFilterDef = {
  name: null,
  birthDay:  null,
  address: null,
  message: null,
  unitId:  null
};

function exchangeData(row:[]): EmployeeListColumns[] {
  var ret:EmployeeListColumns[] = [];
  row.forEach((item) => {
    const wk = jsonParse('unitId', item['uniId'], []);
    var unitId = '';
    wk.forEach(unit => {
        unitId = unitId + unit['name'] + '\n';
    })
    ret.push({
      id: item['id'],
      name: item['name'],
      birthDay:  item['birthDay'],
      address: item['address'],
      message: item['message'],
      unitId:  item['unitId'],
      updatedAt: item['updatedAt'],
      // branchId: item['branchId'],
      // branchName: item['branchName'],
      // postNo: item['postNo'],
      // prefId: item['prefId'],
      // prefName: item['prefName'],
      // addrId: item['addrId'],
      // address: "",
      // city: item['city'],
      // town: item['town'],
      // tel: item['tel'],
      // units: units,
      // updatedAtHome: item['updatedAtHome'],
      // updatedAtAddr: item['updatedAtAddr'],
    });
  });
  return ret;
}

function EmployeeTable({ cbSelect, seq, resetSelections }: ArgsData) {
  const columns = getTableColumns();
  const [ filter, setFilter ] = useState<TableFilterDef>(defaultFilter);
  const filterDef = getFilterItems();
  return (
    <>
      <CommonTable
        column={columns}
        data={EmployeeListData}
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
export { EmployeeTable, exchangeData };
