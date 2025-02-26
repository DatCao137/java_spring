import { createColumnHelper } from '@tanstack/react-table'
import { FilterItem } from '@/components/elements/tableFilter/TableFilter';

export type DocManageListColumns = {
    id: number;
    docId: number;
    docName: string;
    fileName: string;
    dataFile: File | null;
    comment: string;
    created_at: string;
    updated_at: string;
};

export type TableFilterDef = {
    pathId: number | null;
    docName: string | null;
    fileName: string | null;
    comment: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export type TableHistoryDef = {
    id: string | null;
    date: string | null;
    comment: string | null;
}

export const docManageListData: DocManageListColumns[] = [
];

export function getFilterItems(): {[key:string]:FilterItem} {
    return {
      pathId: { name: "pathId", type: 'text' },
      docName: { name: "docName", type: 'text' },
      fileName: { name: "fileName", type: 'text' },
      comment: { name: "comment", type: 'text' },
      created_at: { name: "created_at", type: 'calendar', format: "YYYY/MM/DD", typeDate: "W" },
      updated_at: { name: "updated_at", type: 'calendar', format: "YYYY/MM/DD", typeDate: "W" },
    }
  }

export function getTableColumns() {
    const columnHelper = createColumnHelper<DocManageListColumns>()
    return [
        columnHelper.accessor('docName', {
            header: () => <span>文書名</span>,
            cell: ({row}) => {
                return <div className='w-150'>{row.original.docName}</div>;
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('fileName', {
            header: () => <span>ファイル名</span>,
            cell: ({row}) => {
                return <div className='w-150'>{row.original.fileName}</div>;
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('comment', {
            header: () => <span>コメント</span>,
            cell: ({row}) => {
                return <div className=''>{row.original.comment}</div>;
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('created_at', {
            header: () => <span>追加日時</span>,
            cell: ({row}) => {
                return <div className='w-150'>{row.original.created_at}</div>;
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('updated_at', {
            header: () => <span>更新日時</span>,
            cell: ({row}) => {
                return <div className='w-150'>{row.original.updated_at}</div>;
            },
            footer: info => info.column.id,
        })
    ]
}