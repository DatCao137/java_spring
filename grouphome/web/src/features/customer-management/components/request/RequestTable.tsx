import dayjs from 'dayjs';

import { CallBackSelect } from '@/components/elements/Common';
import { CommonTable } from '@/components/elements/common/CommonTable';
import { Request as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { deepMerge } from '@/utils/Helper';
import { jsonParse } from '@/utils/JsonUtils';

import { DesiredDate, RepresentativeInfo } from '../../types/Request';

import {
  getTableColumns,
  requestListData,
  RequestListColumns,
  REQUEST_TYPE,
  REQUEST_ITEM,
  UPCASE_REQUEST_ITEM_KEY,
  getFilterItems,
  TableFilterDef,
} from './RequestTableDef';
import { useState } from 'react';
import { formatJPDate } from '@/utils/DateUtils';

type ArgsData = {
  cbSelect: CallBackSelect;
  seq: number;
  resetSelections?: boolean;
};

export const defaultDesiredDate: DesiredDate = {
  first: {
    date: '',
    time: '',
  },
  second: {
    date: '',
    time: '',
  },
  desired: '',
};

const defaultFilter: TableFilterDef = {
  id: null,
  name: null,
  requestDate: null,
  homeName: null,
  desiredDate: null,
  requestType: null,
  requestItem: null,
  representativeName: null,
  representativeCall: null,
  remark: null
};

export const defaultRepresentative: RepresentativeInfo = {
  name: '',
  tel: '',
};

function exchangeData(rows: any[]): RequestListColumns[] {
  if (rows.length == 0) return [];
  const results: RequestListColumns[] = [];
  // TODO: Fetch data from server or local storage and convert to RequestListColumns[] format.
  rows.forEach((item) => {
    if (item?.id) {
      let desiredDate = jsonParse(
        'desiredDate',
        item?.desiredDate || '{}',
        defaultDesiredDate,
      );

      desiredDate = deepMerge(defaultDesiredDate, desiredDate);
      const desiredDateOriginal: DesiredDate = JSON.parse(
        JSON.stringify(desiredDate),
      );
      const requestItemOriginal =
        UPCASE_REQUEST_ITEM_KEY.get(item?.requestItem) || '';
      const newDesiredDate = {
        first: `${formatJPDate(desiredDate?.first?.date || '')} ${desiredDate?.first?.time || ''}`,
        second: `${formatJPDate(desiredDate?.second?.date || '')} ${desiredDate?.second?.time || ''}`,
        desired: desiredDate?.desired?.substring(0, 7) || '',
      };
      const dateValues = Object.values(newDesiredDate);

      const representative = jsonParse(
        'representative',
        item?.representative,
        defaultRepresentative,
      );

      const row: RequestListColumns = {
        id: item.id,
        name: item.name,
        requestDate: item?.requestDate?.trim()
          ? dayjs(item.requestDate.trim()).format('YYYY/MM/DD')
          : '',
        requestType: REQUEST_TYPE.get(item?.requestType) || '',
        requestItem: REQUEST_ITEM.get(item?.requestItem) || '',
        homeName: item?.homeName || '',
        homeId: item?.homeId || '',
        customerId: item?.customerId || null,
        desiredDate: dateValues || [],
        representativeName: representative?.name || '',
        representativeCall: representative?.tel || '',
        remark: item?.remark || '',
        requestInfoDetailId: item?.requestInfoDetailId || '',
        desiredDateOriginal,
        requestItemOriginal,
        updatedAtRequest: item.updatedAtRequest
      };

      results.push(row);
    }
  });

  return results;
}

function RequestTable({ cbSelect, seq, resetSelections }: ArgsData) {
  const [ filter, setFilter ] = useState<TableFilterDef>(defaultFilter);
  const columns = getTableColumns();
  const filterDef = getFilterItems();

  return (
    <>
      <CommonTable<TableFilterDef>
        column={columns}
        data={requestListData}
        path={ApiPath}
        cbSelect={cbSelect}
        cbExchangeData={exchangeData}
        seq={seq}
        pager={true}
        resetSelections={resetSelections}
        filter={{ vals: filter, setter: setFilter, def: filterDef }}
      />
    </>
  );
}
export { RequestTable, exchangeData };

