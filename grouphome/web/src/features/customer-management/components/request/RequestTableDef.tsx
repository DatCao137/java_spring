/* eslint-disable tailwindcss/no-custom-classname */
import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';

export type RequestListColumns = {
  id: string;
  name: string;
  requestDate: string;
  requestType: string;
  requestItem: string;
  homeName: string;
  homeId: string;
  customerId: string;
  desiredDate: (string | null)[];
  representativeName: string;
  representativeCall: string;
  remark: string;
  requestInfoDetailId: string;
  desiredDateOriginal: any;
  requestItemOriginal: any;
  updatedAtRequest: string;
};

export type TableFilterDef = {
  id: string | null;
  name: string | null;
  requestDate: string | null;
  homeName: string | null;
  desiredDate: string | null;
  requestType: string | null;
  requestItem: string | null;
  representativeName: string | null;
  representativeCall: string | null;
  remark: string | null;
}

export const REQUEST_ITEM = new Map<string, string>([
  ['visit', '見学'],
  ['exp', '体験入居'],
  ['exp-free', '体験(無料)'],
  ['exp-pay', '体験(有料)'],
  ['movein', '本入居'],
]);

export const UPCASE_REQUEST_ITEM_KEY = new Map<string, string>([
  ['visit', 'VISIT'],
  ['exp', 'EXP'],
  ['exp-free', 'EXP_FREE'],
  ['exp-pay', 'EXP_PAY'],
  ['movein', 'MOVEIN'],
]);

export function getFilterItems(): {[key:string]:FilterItem} {
  return {
    id: { name: "id", type: 'number', min: 1 },
    name: { name: "name", type: 'text' },
    requestDate: { name: "requestDate", type: 'calendar-range', format: "YYYY/MM/DD", typeDate: "W" },
    homeName: { name: "homeName", type: 'text' },
    desiredDate: { name: "desiredDate", type: 'calendar-range', format: "YYYY/MM/DD", typeDate: "W" },
    requestType: { name: "requestType", type: 'select', select: 'appl_form_type' },
    requestItem: { name: "requestItem", type: 'select', select: 'appl_form_item' },
    representativeName: { name: "representativeName", type: 'text' },
    representativeCall: { name: "representativeCall", type: 'text' },
    remark: { name: "remark", type: 'text' },
  }
}

export const findKeyByValue = (
  map: Map<string, string>,
  value: string,
): string | null => {
  for (const [key, val] of map.entries()) {
    if (val === value) {
      return key;
    }
  }
  return null;
};

export const REQUEST_TYPE = new Map<string, string>([
  ['visit', '見学・体験'],
  ['movein', '入居'],
]);

export const requestListData: RequestListColumns[] = [];

export function getTableColumns() {
  const columnHelper = createColumnHelper<RequestListColumns>();
  return [
    columnHelper.accessor('id', {
      header: () => <span>No</span>,
      cell: (info) => (
        <div className="content-center text-center">{info.getValue()}</div>
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('name', {
      header: () => <span>氏名</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('requestDate', {
      header: () => <span>申込日</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.group({
      header: '種類',
      columns: [
        columnHelper.accessor('requestType', {
          header: () => <span>申込書</span>,
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor('requestItem', {
          header: () => <span>項目</span>,
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
      ],
    }),
    columnHelper.accessor('homeName', {
      header: () => <span>対象事業所(ホーム)</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('desiredDate', {
      header: () => <span>希望日(時間)</span>,
      cell: ({ row }) => {
        return (
          <div className="alignCenter">
            {row.original?.desiredDate.map((dateValue, index) => dateValue && (
              <div key={index}>{dateValue}</div>
            ))}
          </div>
        );
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.group({
      header: '代表(付添人・代理人)情報',
      columns: [
        columnHelper.accessor('representativeName', {
          header: () => <span>氏名</span>,
          cell: ({ row }) => {
            return (
              <div className="alignCenter">
                {row.original?.representativeName || ''}
              </div>
            );
          },
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor('representativeCall', {
          header: () => <span>連絡先</span>,
          cell: ({ row }) => {
            return (
              <div className="alignCenter">
                {row.original?.representativeCall || ''}
              </div>
            );
          },
          footer: (info) => info.column.id,
          meta: { className: 'representative-call-header-col' },
        }),
      ],
    }),
    columnHelper.accessor('remark', {
      header: () => <span>補足</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];
}
