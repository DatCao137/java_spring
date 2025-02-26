import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';
import { DailyListResponseDto } from '../../types/Daily';

export enum ColumnNames {
	BUSINESS_NAME = '事業所名',
	HOME_NAME = 'ホーム名',
	LOCATION = '所在地',
}

export type TableFilterDef = {
	'branchName': string | null;
	'homeName': string | null;
	'location': string | null;

}

export const dailyListData: DailyListResponseDto[] = [];

export function getFilterItems(): { [key: string]: FilterItem } {
	return {
		'branchName': { name: "branchName", type: 'text' },
		'homeName': { name: "homeName", type: 'text' },
		'location': { name: "location", type: 'text' },
	}
}

export function getTableColumns() {
	const columnHelper = createColumnHelper<DailyListResponseDto>();
	return [
		columnHelper.accessor('branchName', {
			header: () => <span>{ColumnNames.BUSINESS_NAME}</span>,
			cell: ({ row }) => {
				return <div>{row.original.branchName}</div>;
			},
			footer: (info) => info.column.id,
			meta: {
				className: 'w-1/4'
			}
		}),
		columnHelper.accessor('homeName', {
			header: () => <span>{ColumnNames.HOME_NAME}</span>,
			cell: ({ row }) => {
				return <div>{row.original.homeName}</div>;
			},
			footer: (info) => info.column.id,
			meta: {
				className: 'w-1/4'
			}
		}),
		columnHelper.accessor('location', {
			header: () => <span>{ColumnNames.LOCATION}</span>,
			cell: ({ row }) => {
				return <div>{row.original.location}</div>;
			},
			footer: (info) => info.column.id,
			meta: {
				className: 'w-2/4'
			}
		})
	];
}
