import { CommonTable } from '@/components/elements/common/CommonTable';
import { getTableColumns, tenantListData, getFilterItems, TableFilterDef } from './TenantTableDef';
import { Tenant as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { CallBackSelect } from '@/components/elements/Common';
import { useContext, useState } from 'react';
import { TenantListResponseDto } from '../../types/Tenant';
import { useSelectList } from '../../contexts/SelectListContext';
import { TenantMainContext } from '../../pages/TenantMain';

type ArgsData = {
  cbSelect: CallBackSelect;
  seq: number;
};

const defaultFilter: TableFilterDef = {
  'name': null, 'nameGana': null, 'personal.sex': null, 'personal.birthDay': null,
  'brunchName': null, 'unitName': null, 'roomNo': null,
  'status': null, 'moveInAt': null, 'leavingAt': null, 'category': null,
};

export const TenantTable = ({ cbSelect, seq }: ArgsData) => {
  const { selectListData } = useSelectList();
  const supportTypes = selectListData.get('support_type')?.filter((e) => e.value) || [];
  const statuses = selectListData.get('cust_unit_status')?.filter((e) => e.value) || [];
  const sexes = selectListData.get('sex')?.filter((e) => e.value) || [];
  const { customerId } = useContext(TenantMainContext);

  const options = {
    'supportTypes': supportTypes,
    'statuses': statuses,
    'sexes': sexes,
  }
  const columns = getTableColumns(options);
  const [filter, setFilter] = useState<TableFilterDef>(defaultFilter);
  const filterDef = getFilterItems(options);


  const exchangeData = (rows: TenantListResponseDto[]): TenantListResponseDto[] => {
    cbSelect(null);
    return rows;
  }

  const handleCbSelect = (row: TenantListResponseDto) => {
    if (!row || row.id === customerId) {
      cbSelect(null);
      return;
    }
    cbSelect(row);
  }

  return (
    <>
      <CommonTable
        column={columns}
        data={tenantListData}
        path={ApiPath}
        pager={true}
        seq={seq}
        filter={{ vals: filter, setter: setFilter, def: filterDef }}
        cbSelect={handleCbSelect}
        cbExchangeData={exchangeData}
        resetSelections={true}
      />
    </>
  );
}
