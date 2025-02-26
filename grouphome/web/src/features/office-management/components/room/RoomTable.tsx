import { CommonTable } from '@/components/elements/common/CommonTable';
import { OfficeRoom as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { jsonParse } from '@/utils/JsonUtils';
import { formatCurrency } from "@/utils/Helper"

import {
  getTableColumns,
  listData,
  ListColumns,
  TableFilterDef,
} from './RoomTableDef';
import { CallBackSelect } from '@/components/elements/Common';

type ArgsData = {
  cbSelect: CallBackSelect;
  seq: number;
  resetSelections?: boolean;
  unitId: number | null;
};

function exchangeData(row: any[]): ListColumns[] {
  var rowResult: ListColumns[] = [];
  const defaultContents = {
    basic: {
      fee: null
    },
    remark: ''
  }
  if (row && row.length > 0) {
    row.forEach((item) => {
      const contents = jsonParse('contents', item['contents'], defaultContents);
      rowResult.push({
        id: item?.id,
        unitId: item?.unitId,
        name: item?.name || '',
        fee: formatCurrency(contents?.basic?.fee) || '',
        scorpion: '',
        remark: contents?.remark || '',
        updatedAt: item?.updatedAt || ''
      });
    });
  }
  return rowResult;
}

function RoomTable({ cbSelect, seq, resetSelections, unitId }: ArgsData) {
  const columns = getTableColumns();
  const body = {unitId: unitId}
  const seqUnitId = unitId ? (unitId + seq) : seq

  return (
    <>
      <CommonTable<TableFilterDef>
        column={columns}
        data={listData}
        path={ApiPath}
        seq={seqUnitId}
        cbSelect={cbSelect}
        cbExchangeData={exchangeData}
        resetSelections={resetSelections}
        body={body}
      />
    </>
  );
}
export { RoomTable, exchangeData };
