import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table'

export type InquiryListColumns = {
    id: string;
    name: string;
    gana: string;
    sex: number;
    sexName: string;
    age: number;
    inquirySrcName: string;
    inquirySrcStaff: string;
    inquirySrcRoute: number;
    inquirySrcRouteName: string;
    inquirySrcPhone: string;
    inquirySrcLink: number;
    inquirySrcLinkName: string;
    status: number;
    statusName: string;
    nextAction: string;
    updatedAt: string;
};

export type TableFilterDef = {
    name: string | null;
    gana: string | null;
    sex: string | null;
    age: string | null;
    inquirySrcName: string | null;
    inquirySrcStaff: string | null;
    inquirySrcRoute: string | null;
    inquirySrcPhone: string | null;
    inquirySrcLink: string | null;
    status: string | null;
    nextAction: string | null;
}

export function getFilterItems(): {[key:string]:FilterItem} {
    return {
        name: { name: "name", type: 'text' },
        gana: { name: "gana", type: 'text' },
        sex: { name: "sex", type: 'select', select: 'sex'},
        age: { name: "age", type: 'range', min: 0 },
        inquirySrcName: { name: "inquirySrcName", type: 'text' },
        inquirySrcStaff: { name: "inquirySrcStaff", type: 'text' },
        inquirySrcRoute: { name: "inquirySrcRoute", type: 'select', select: 'req_route' },
        inquirySrcPhone: { name: "inquirySrcPhone", type: 'text' },
        inquirySrcLink: { name: "inquirySrcLink", type: 'select', select: 'relationship' },
        status: { name: "status", type: 'select', select: 'cust_status' },
        nextAction: { name: "nextAction", type: 'text' },
    }
}


export const inquiryListData: InquiryListColumns[] = [
];

export function getTableColumns() {
    const columnHelper = createColumnHelper<InquiryListColumns>()
    return [
        columnHelper.accessor('id', {
            header: () => <span className="no-header" >No</span>,
            cell: ({row}) => {
                return (<div className="alignCenter"  >{row.original.id}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('name', {
            header: () => <span className="name-header">氏名</span>,
            cell: ({row}) => {
                return (<div>{row.original.name}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('gana', {
            header: () => <span className="gana-header">ふりがな</span>,
            cell: ({row}) => {
                return (<div>{row.original.gana}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('sex', {
            header: () => <span className="sex-header">性別</span>,
            cell: ({row}) => {
                return (<div className="alignCenter">{row.original.sexName}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('age', {
            header: () => <span className="age-header">年齢</span>,
            cell: ({row}) => {
                return (<div className="alignCenter">{row.original.age}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.group({
            header: '問合わせ支援機関等',
            columns: [
                columnHelper.accessor('inquirySrcName', {
                    header: () => <span>問合わせ元</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.inquirySrcName}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('inquirySrcStaff', {
                    header: () => <span>担当</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.inquirySrcStaff}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('inquirySrcRoute', {
                    header: () => <span>問合わせ経路</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.inquirySrcRouteName}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('inquirySrcPhone', {
                    header: () => <span className="inquirySrcPhone-header">連絡先</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.inquirySrcPhone}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('inquirySrcLink', {
                    header: () => <span className="inquirySrcLink-header">本人との関係</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.inquirySrcLinkName}</div>)
                    },
                    footer: info => info.column.id,
                }),

            ]
        }),
        columnHelper.accessor('status', {
            header: () => <span className="status-header">ステータス</span>,
            cell: ({row}) => {
                return (<div>{row.original.statusName}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('nextAction', {
            header: () => <span className="nextAction-header">ネクストアクション</span>,
            cell: ({row}) => {
                return (<div>{row.original.nextAction}</div> )
            },
            footer: info => info.column.id,
        }),
    ]
}