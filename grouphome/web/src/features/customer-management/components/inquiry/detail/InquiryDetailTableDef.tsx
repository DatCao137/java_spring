import { formatJPDate } from '@/utils/DateUtils';
import { createColumnHelper } from '@tanstack/react-table'

export type InquiryDetailDataColumns = {
    id: string,
    status: string,
    statusName: string,
    homeId: string,
    homeName: string,
    ghData: string,
    date: string,

    breakdownSelf: string,
    breakdownFamily: string,
    breakdownCounselor: string,
    breakdownSupport: string,
    breakdownThirdParty: string,
    breakdownSum: string;

    recordTime: string,
    recordVisitTime: string,
    recordFreeTrial: string,
    recordPaidTrial: string,
    recordSsCompletion: string,
    recordContractDate: string,
    recordPlanStatus: string,
    recordDlanStatusName: string,
    
    updatedAt: string
};

export const inquiryDetailData: InquiryDetailDataColumns[] = [
];

export function getTableColumns() {
    const columnHelper = createColumnHelper<InquiryDetailDataColumns>()
    return [
        columnHelper.accessor('status', {
            header: () => <span className="status-detail-header">進捗状況  <br/><span className="text-red-500 font-weight-bold">※予定含</span></span>,
            cell: ({row}) => {
                return (<div>{row.original.statusName}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('homeId', {
            header: () => <span className="home-detail-header">対象ホーム  <br/><span className="text-red-500 font-weight-bold">※予定含</span></span>,
            cell: ({row}) => {
                return (<div>{row.original.homeName}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('ghData', {
            header: () => <span className="ghData-detail-header">契約GH<br/><span>転送用データ</span> </span>,
            cell: ({row}) => {
                return (<div>{row.original.ghData}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor('date', {
            header: () => <span className="date-detail-header">日付 <br/><span className="text-red-500 font-weight-bold">※予定含</span></span>,
            cell: ({row}) => {
                return (<div>{formatJPDate(row.original.date || '', "YYYY/MM/DD", false)}</div> )
            },
            footer: info => info.column.id,
        }),
        columnHelper.group({
            header: '内訳人数',
            columns: [
                columnHelper.accessor('breakdownSelf', {
                    header: () => <span>本人</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.breakdownSelf}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('breakdownFamily', {
                    header: () => <span>ご家族</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.breakdownFamily}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('breakdownCounselor', {
                    header: () => <span>相談員</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.breakdownCounselor}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('breakdownSupport', {
                    header: () => <span>支援員</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.breakdownSupport}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('breakdownThirdParty', {
                    header: () => <span>第三者</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.breakdownThirdParty}</div>)
                    },
                    footer: info => info.column.id,
                }),
                columnHelper.accessor('breakdownSum', {
                    header: () => <span>合計</span>,
                    cell: ({row}) => {
                        return (<div className="alignCenter">{row.original.breakdownSum}</div>)
                    },
                    footer: info => info.column.id,
                }),
            ]
        }),
    ]
}