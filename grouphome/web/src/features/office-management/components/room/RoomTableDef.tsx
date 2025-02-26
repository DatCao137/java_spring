import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';

export type ListColumns = {
  id: number;
  unitId: number;
  name: string;
  fee: string;
  scorpion: string;
  remark: any;
  updatedAt: string;
};

export type TableFilterDef = {

}

export const listData: ListColumns[] = [];


export function getFilterItems(): { [key: string]: FilterItem } {
  return {
    
  }
}

export function getTableColumns() {
  const columnHelper = createColumnHelper<ListColumns>();
  return [
    columnHelper.accessor('name', {
      header: () => <span>部屋番号</span>,
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('fee', {
      header: () => <span>賃料</span>,
      cell: ({ row }) => {
        return <div className='alignRight'>{row.original.fee}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('scorpion', {
      header: () => <span>状態</span>,
      cell: ({ row }) => {
        return <div>{row.original.scorpion}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('remark', {
      header: () => <span>備考</span>,
      cell: ({ row }) => {
        return <div>{row.original.remark}</div>;
      },
      footer: (info) => info.column.id,
    }),
  ];
}
