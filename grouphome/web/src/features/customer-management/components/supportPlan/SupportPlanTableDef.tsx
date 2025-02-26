import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table'

export type SupportPlanListColumns = {
    id: string;
    name: string;
    createDate: string;
    planStartDate: string;
    planStartEnd: string;
    homeName: string;
    heldDate: string;
    creator: string;
    applyDate: string;
    status: string;
    additionalInfo: string;
    updatedAt: string;
};

export type TableFilterDef = {
    name: string | null;
    createDate: string | null;
    planStartDate: string | null;
    planStartEnd: string | null;
    homeName: string | null;
    heldDate: string | null;
    creator: string | null;
    applyDate: string | null;
    status: string | null;
    additionalInfo: string | null;
}

export function getFilterItems(): {[key:string]:FilterItem} {
    return {
        id: { name: "id", type: 'range', min: 0 },
        name: { name: "name", type: 'text' },
        createDate: { name: "createDate", type: 'calendar-range', format: "YYYY/MM/DD", typeDate: "W"  },
        planStartDate: { name: "planStartDate", type: 'calendar-range', format: "YYYY/MM/DD", typeDate: "W"  },
        planStartEnd: { name: "planStartEnd", type: 'calendar-range', format: "YYYY/MM/DD", typeDate: "W"  },
        homeName: { name: "homeName", type: 'text' },
        heldDate: { name: "heldDate", type: 'calendar-range', format: "YYYY/MM/DD", typeDate: "W"  },
        creator: { name: "creator", type: 'text' },
        applyDate: { name: "applyDate", type: 'calendar-range', format: "YYYY/MM/DD", typeDate: "W"  },
        status: { name: "status", type: 'select', select: 'pocket_book' },
        additionalInfo: { name: "additionalInfo", type: 'text' },
    }
}

export const supportPlanListData: SupportPlanListColumns[] = [
];

export function getTableColumns() {
    const columnHelper = createColumnHelper<SupportPlanListColumns>()
    return [
        columnHelper.accessor('id', {
            header: () => <span>No</span>,
            cell: ({row}) => {
                return (<div className="alignCenter" >{row.original.id}</div> )
            },
            footer: info => info.column.id,
            meta: {
                className: 'w-[60px]'
            }
        }),
        columnHelper.accessor('name', {
            header: () => <span>氏名</span>,
            cell: ({row}) => {
                return (<div>{row.original.name}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('createDate', {
            header: () => <span>作成日</span>,
            cell: ({row}) => {
                return (<div className="alignCenter">{row.original.createDate}</div> )
            },
            footer: info => info.column.id,
            meta: {
                className: 'w-[110px]'
            }
        }),
        columnHelper.group({
            header: '計画期間',
            columns: [
                columnHelper.accessor('planStartDate', {
                    header: () => <span>開始</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.planStartDate}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('planStartEnd', {
                    header: () => <span>終了</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.planStartEnd}</div>)
                    },
                    footer: info => info.column.id,
                }),
            ],
            meta: {
                className: 'w-[220px]'
            }
        }),
        columnHelper.accessor('homeName', {
            header: () => <span>ホーム名</span>,
            cell: ({row}) => {
                return (<div className="alignCenter">{row.original.homeName}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.group({
            header: '担当者会議録',
            columns: [
                columnHelper.accessor('heldDate', {
                    header: () => <span>開催年月日</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.heldDate}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('creator', {
                    header: () => <span>作成者</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.creator}</div>)
                    },
                    footer: info => info.column.id,
                }),
            ],
            meta: {
                className: 'w-[220px]'
            }
        }),
        columnHelper.accessor('applyDate', {
            header: () => <span>個別支援計画 同意日</span>,
            cell: ({row}) => {
                return (<div className="alignCenter">{row.original.applyDate}</div> )
            },
            footer: info => info.column.id,
            meta: {
                className: 'w-[120px]'
            }
        }),
        columnHelper.accessor('status', {
            header: () => <span>ステータス</span>,
            cell: ({row}) => {
                return (<div className="alignCenter">{row.original.status}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('additionalInfo', {
            header: () => <span>補足</span>,
            cell: ({row}) => {
                return (<div>{row.original.additionalInfo}</div> )
            },
            footer: info => info.column.id,
        }),
    ]
}