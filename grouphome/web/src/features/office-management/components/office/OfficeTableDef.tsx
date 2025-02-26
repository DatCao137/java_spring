import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';

export type OfficeListColumns = {
  id: string;
  no: string;
  branchName: string;
  homeName: string;
  capacity: string;
  groupHomeTypeId: string;
  groupHomeName: string;
  features: string;
  featureSystem: string;
  featureBarrierFree: string;
  featureMenOnly: string;
  featureWomenOnly: string;
  addrId: string;
  address: string;
  contents: string;
  servicegh: string;
  servicess: string;
  homeId: string;
  prefName: string;
};

export type TableFilterDef = {
  branchName: string | null;
  homeName: string | null;
  capacity: string | null;
  groupType: string | null;
  features: string | null;
  address: string | null;
  services: string | null;
}

export const officeListData: OfficeListColumns[] = [];

const featureChoices = [
  { name: "featureSystem", value: "24時間" },
  { name: "featureBarrierFree", value: "バリアフリー" },
  { name: "featureMenOnly", value: "男性専用" },
  { name: "featureWomenOnly", value: "女性専用" },
];
const servicesChoices = [
  { name: "servicegh", value: "グループホーム" },
  { name: "servicess", value: "ショートステイ" },
];

export function getFilterItems(): { [key: string]: FilterItem } {
  return {
    branchName: { name: "branchName", type: 'text' },
    homeName: { name: "homeName", type: 'text' },
    capacity: { name: "capacity", type: 'range' },
    groupHomeName: { name: "groupType", type: 'select', select: 'group_home_type' },
    features: { name: "features", type: 'choice', choices: featureChoices },
    featureSystem: { name: "features", type: 'choice', choices: featureChoices },
    featureBarrierFree: { name: "features", type: 'choice', choices: featureChoices },
    featureMenOnly: { name: "features", type: 'choice', choices: featureChoices },
    featureWomenOnly: { name: "features", type: 'choice', choices: featureChoices },
    address: { name: "address", type: 'text' },
    services: { name: "services", type: 'choice', choices: servicesChoices },
    servicess: { name: "services", type: 'choice', choices: servicesChoices },
    servicegh: { name: "services", type: 'choice', choices: servicesChoices },
  }
}

export function getTableColumns() {
  const columnHelper = createColumnHelper<OfficeListColumns>();
  return [
    columnHelper.accessor('no', {
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="alignCenter">{row.original.no}</div>;
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
    columnHelper.accessor('homeName', {
      header: () => <span>ホーム名</span>,
      cell: ({ row }) => {
        return <div>{row.original.homeName}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('capacity', {
      header: () => <span>定員数</span>,
      cell: ({ row }) => {
        return <div className="alignCenter">{row.original.capacity}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('groupHomeName', {
      header: () => <span>類型</span>,
      cell: ({ row }) => {
        return <div>{row.original.groupHomeName}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.group({
      id: 'features',
      header: '特色',
      columns: [
        columnHelper.accessor('featureSystem', {
          header: () => <span>24時間</span>,
          cell: ({ row }) => {
            return <div className="alignCenter">{row.original.featureSystem}</div>;
          },
          footer: (info) => info.column.id,
          meta: { className: 'hidden-arrow' },
        }),
        columnHelper.accessor('featureBarrierFree', {
          header: () => <span>バリアフリー</span>,
          cell: ({ row }) => {
            return <div className="alignCenter">{row.original.featureBarrierFree}</div>;
          },
          footer: (info) => info.column.id,
          meta: { className: 'hidden-arrow' },
        }),
        columnHelper.accessor('featureMenOnly', {
          header: () => <span>男性専用</span>,
          cell: ({ row }) => {
            return <div className="alignCenter">{row.original.featureMenOnly}</div>;
          },
          footer: (info) => info.column.id,
          meta: { className: 'hidden-arrow' },
        }),
        columnHelper.accessor('featureWomenOnly', {
          header: () => <span>女性専用</span>,
          cell: ({ row }) => {
            return <div className="alignCenter">{row.original.featureWomenOnly}</div>;
          },
          footer: (info) => info.column.id,
          meta: { className: 'hidden-arrow' },
        }),
      ],
    }),
    columnHelper.accessor('address', {
      header: () => <span>所在地</span>,
      cell: ({ row }) => {
        return <div>{row.original.address}</div>;
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.group({
      id: 'services',
      header: 'サービス内容',
      columns: [
        columnHelper.accessor('servicegh', {
          header: () => <span>グループホーム</span>,
          cell: ({ row }) => {
            return <div className="alignCenter">{row.original.servicegh}</div>;
          },
          footer: (info) => info.column.id,
          meta: { className: 'hidden-arrow' },
        }),
        columnHelper.accessor('servicess', {
          header: () => <span>ショートステイ</span>,
          cell: ({ row }) => {
            return <div className="alignCenter">{row.original.servicess}</div>;
          },
          footer: (info) => info.column.id,
          meta: { className: 'hidden-arrow' },
        }),
      ],
    }),
  ];
}
