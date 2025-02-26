import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';

export type UnitListColumns = {
  addrId: string;
  city: string;
  contents: string;
  fax: string;
  homeId: string;
  mail: string;
  postNo: string;
  prefId: string;
  prefName: string;
  tel: string;
  town: string;
  unitId: string;
  unitName: string;
  updatedAtAddr: string;
  updatedAtUnit: string;
  address: string;
  concept: string;
};

export type TableFilterDef = {

}

export const unitListData: UnitListColumns[] = [];


export function getFilterItems(): { [key: string]: FilterItem } {
  return {
    
  }
}

export function getTableColumns() {
  const columnHelper = createColumnHelper<UnitListColumns>();
  return [
    columnHelper.accessor('unitName', {
      header: () => <div>共同生活住居地</div>,
      cell: ({ row }) => {
        return <div>{row.original.unitName}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('tel', {
      header: () => <span>電話番号</span>,
      cell: ({ row }) => {
        return <div>{row.original.tel}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('concept', {
      header: () => <span></span>,
      cell: ({ row }) => {
        return <div>{row.original.concept}</div>;
      },
      footer: (info) => info.column.id,
    }),
  ];
}
