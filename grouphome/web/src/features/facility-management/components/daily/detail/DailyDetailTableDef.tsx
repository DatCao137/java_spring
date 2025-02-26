import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';
import { DailyDetailUnitResponseDto } from '../../../types/Daily';

export type TableFilterDef = {
	'unitId': number | null;
	'unitName': string | null;
}

export const unitListData: DailyDetailUnitResponseDto[] = [];

export function getFilterItems(): { [key: string]: FilterItem } {
	return {
		'unitId': 	{ name: "unitId", type: 'text' },
		'unitName': { name: "unitName", type: 'text' },
	}
}

export function getTableColumns() {
	const columnHelper = createColumnHelper<DailyDetailUnitResponseDto>();
	return [
		columnHelper.accessor('unitId', {
			header: () => <span>氏名</span>,
			cell: ({ row }) => {
				return <div>{row.original.unitId}</div>;
			},
			footer: (info) => info.column.id,
			meta: {
				className: 'w-1/4'
			}
		}),
		columnHelper.accessor('unitName', {
			header: () => <span>ふりがな</span>,
			cell: ({ row }) => {
				return <div>{row.original.unitName}</div>;
			},
			footer: (info) => info.column.id,
			meta: {
				className: 'w-1/4'
			}
		})
	];
}
