import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';

export type HomeListColumns = {
  id: string;
  homeName: string;
  branchId: string;
  branchName: string;
  postNo: string;
  prefId: string;
  prefName: string;
  addrId: string;
  address: string;
  city: string;
  town: string;
  tel: string;
  units: string;
  updatedAtHome: string;
  updatedAtAddr: string;
};

export type TableFilterDef = {
  homeName: string | null;
  branchName: string | null;
  address: string | null;
  tel: string | null;
  units: string | null;
}

export const homeListData: HomeListColumns[] = [];

export function getFilterItems(): {[key:string]:FilterItem} {
  return {
    homeName: { name: "homeName", type: 'text' },
    branchName: { name: "branchName", type: 'text' },
    address: { name: "address", type: 'text' },
    tel: { name: "tel", type: 'text' },
    units: { name: "units", type: 'text' },
  }
}

export function getTableColumns() {
  const columnHelper = createColumnHelper<HomeListColumns>();
  return [
    columnHelper.accessor('homeName', {
      header: () => <span>ホーム名</span>,
      cell: ({ row }) => {
        return <div>{row.original.homeName}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('branchName', {
      header: () => <span>事業所名</span>,
      cell: ({ row }) => {
        return <div>{row.original.branchName}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('address', {
      header: () => <span>所在地</span>,
      cell: ({ row }) => {
        return <div>{row.original.prefName}{row.original.city}{row.original.town}</div>;
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
    columnHelper.accessor('units', {
        header: () => <span>所属居住地</span>,
        cell: ({ row }) => {
          return <div className='enableRet'>{row.original.units}</div>;
        },
        footer: (info) => info.column.id,
    }),
  ];
}
