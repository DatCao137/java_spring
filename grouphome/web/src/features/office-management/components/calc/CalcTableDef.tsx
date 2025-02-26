import { createColumnHelper } from '@tanstack/react-table'

export type calcListColumns = {
    id: number;
    calcItemId: string;
    name: string;
    classification: string;
    startDate: string;
    notificationDate: string;
    period: string;
    comment: string;
};

export const calcListData: calcListColumns[] = [
];
interface rowInterface {
    id: number;
  }
  
type CallBack = {
    (tgt:string, row:rowInterface):void
}

export function getTableColumns(cb:CallBack) {
    const columnHelper = createColumnHelper<calcListColumns>()
    return [
        columnHelper.accessor('classification', {
            header: () => <span className="type-calc-header">区分</span>,
            cell: ({row}) => {
                return (<div>{row.original.classification}</div>)
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('name', {
            header: () => <span className="name-calc-header">名称</span>,
            cell: ({row}) => {
                return (<div>{row.original.name}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('startDate', {
            header: () => <span className="startDate-calc-header">適用開始日</span>,
            cell: ({row}) => {
                return (<div>{row.original.startDate}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('notificationDate', {
            header: () => <span className="notice-date-calc-header">届出日</span>,
            cell: ({row}) => {
                return (<div>{row.original.notificationDate}</div>)
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('period', {
            header: () => <span className="period-calc-header">有効期間</span>,
            cell: ({row}) => {
                return (<div>{row.original.period}</div>)
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('comment', {
            header: () => <span className="comment-calc-header">備考</span>,
            cell: ({row}) => {
                return (<div>{row.original.comment}</div>)
            },
            footer: info => info.column.id,
        })
    ]
}
