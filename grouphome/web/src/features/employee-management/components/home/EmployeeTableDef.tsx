import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';

export type EmployeeListColumns = {
  id: string;
  name: string;
  birthDay: string;
  address: string;
  message: string;
  unitId: number;
  updatedAt: string;
  // branchId: string;
  // branchName: string;
  // postNo: string;
  // prefId: string;
  // prefName: string;
  // addrId: string;
  // address: string;
  // city: string;
  // town: string;
  // tel: string;
  // units: string;
  // updatedAtHome: string;
  // updatedAtAddr: string;
};

export type TableFilterDef = {
  name: string | null;
  birthDay: string | null;
  address: string | null;
  message: string | null;
  unitId: number | null ;
}

export const EmployeeListData: EmployeeListColumns[] = [];

export function getFilterItems(): {[key:string]:FilterItem} {
  return {
    name: { name: "name", type: 'text' },
    // birthDay: { name: "birthDay", type: 'text' },
    // address: { name: "address", type: 'text' },
    // message: { name: "message", type: 'text' },
    // unitId: { name: "unitId", type: 'text' },
    // branchName: { name: "branchName", type: 'text' },
    // address: { name: "address", type: 'text' },
    // tel: { name: "tel", type: 'text' },
    // units: { name: "units", type: 'text' },
  }
}

export function getTableColumns() {
  const columnHelper = createColumnHelper<EmployeeListColumns>();
  return [
    columnHelper.accessor('name', {
      header: () => <span>Tên</span>,
      cell: ({ row }) => {
        return <div>{row.original.name}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('birthDay', {
      header: () => <span>Ngày Sinh</span>,
      cell: ({ row }) => {
        return <div>{row.original.birthDay}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('address', {
      header: () => <span>Địa Chỉ</span>,
      cell: ({ row }) => {
        return <div>{row.original.address}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('message', {
        header: () => <span>Ghi Chú</span>,
        cell: ({ row }) => {
          return <div>{row.original.message}</div>;
        },
        footer: (info) => info.column.id,
    }),
    // columnHelper.accessor('unitId', {
    //     header: () => <span>id người làm</span>,
    //     cell: ({ row }) => {
    //       return <div className='enableRet'>{row.original.unitId}</div>;
    //     },
    //     footer: (info) => info.column.id,
    // }),
  ];
}
