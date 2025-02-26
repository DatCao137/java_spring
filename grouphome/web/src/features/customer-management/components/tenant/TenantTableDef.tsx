import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';
import { TenantListResponseDto } from '../../types/Tenant';
import { getAge } from '@/utils/DateUtils';
import dayjs from 'dayjs';
import { SelectListResponseDto } from '../../contexts/SelectListContext';
import { findNameByValue } from '@/utils/Helper';

export enum ColumnNames {
	ID = 'ID',
	OFFICE = '事業所',
	UNIT = 'ユニット',
	ROOM_NO = '居室番号',
	NAME = '氏名',
	NAME_GANA = 'ふりがな',
	STATUS = '入居状況',
	MOVING_AT = '入居開始日',
	LEAVING_AT = '退去日・移動日',
	CATEGORY = '支援区分',
	AGE = '年齢',
	GENDER = '性別'
}

export type TableFilterDef = {
	'name': string | null;
	'nameGana': string | null;
	'personal.sex': string | null;
	'personal.birthDay': string | null;
	'brunchName': string | null;
	'unitName': string | null;
	'roomNo': string | null;
	'status': string | null;
	'moveInAt': string | null;
	'leavingAt': string | null;
	'category': string | null;

}

export const tenantListData: TenantListResponseDto[] = [];

export function getFilterItems(options: Record<string, SelectListResponseDto[]>): { [key: string]: FilterItem } {
	return {
		'name': { name: "name", type: 'text' },
		'nameGana': { name: "nameGana", type: 'text' },
		'personal_sex': { name: "personal.sex", type: 'select', select: 'sex'},
		'personal_birthDay': { name: "personal.birthDay", type: 'range', min: 0 },
		'brunchName': { name: 'brunchName', type: 'text' },
		'unitName': { name: 'unitName', type: 'text' },
		'roomNo': { name: 'roomNo', type: 'text' },
		//  'status': { name: 'status', type: 'option', options: options['statuses'] },
		'status': { name: 'status', type: 'select', select: 'cust_unit_status' },
		'moveInAt': { name: 'moveInAt', type: 'calendar' },
		'leavingAt': { name: 'leavingAt', type: 'calendar' },
		'category': { name: 'category', type: 'select', select: 'support_type' },
	}
}

export function getTableColumns(options: Record<string, SelectListResponseDto[]>) {
	const columnHelper = createColumnHelper<TenantListResponseDto>();
	return [
		columnHelper.accessor('brunchName', {
			header: () => <span>{ColumnNames.OFFICE}</span>,
			cell: ({ row }) => {
				return <div className='truncate max-w-40'>{row.original.brunchName}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('unitName', {
			header: () => <span>{ColumnNames.UNIT}</span>,
			cell: ({ row }) => {
				return <div className='truncate max-w-36'>{row.original.unitName}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('roomNo', {
			header: () => <span>{ColumnNames.ROOM_NO}</span>,
			cell: ({ row }) => {
				return <div className='truncate text-center max-w-20'>{row.original.roomNo}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('name', {
			header: () => <span>{ColumnNames.NAME}</span>,
			cell: ({ row }) => {
				return <div className='truncate max-w-52'>{row.original.name}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('nameGana', {
			header: () => <span>{ColumnNames.NAME_GANA}</span>,
			cell: ({ row }) => {
				return <div className='truncate max-w-52'>{row.original.nameGana}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('status', {
			header: () => <span>{ColumnNames.STATUS}</span>,
			cell: ({ row }) => {
				return <div className='truncate max-w-36'>{findNameByValue(options['statuses'], row.original.status?.toString())}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('moveInAt', {
			header: () => <span>{ColumnNames.MOVING_AT}</span>,
			cell: ({ row }) => {
				return <div className='truncate max-w-36 text-center'>{row.original.moveInAt ? dayjs(row.original.moveInAt).format('YYYY/MM/DD') : null}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('leavingAt', {
			header: () => <span>{ColumnNames.LEAVING_AT}</span>,
			cell: ({ row }) => {
				return <div className='truncate max-w-36 text-center'>{row.original.leavingAt ? dayjs(row.original.leavingAt).format('YYYY/MM/DD') : null}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('category', {
			header: () => <span>{ColumnNames.CATEGORY}</span>,
			cell: ({ row }) => {
				return <div className='truncate max-w-36'>{findNameByValue(options['supportTypes'], row.original.category?.toString())}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('personal.birthDay', {
			header: () => <span>{ColumnNames.AGE}</span>,
			cell: ({ row }) => {
				return <div className='truncate text-center max-w-16'>{getAge(row.original.personal?.birthDay ? String(row.original.personal?.birthDay) : null)}</div>;
			},
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('personal.sex', {
			header: () => <span>{ColumnNames.GENDER}</span>,
			cell: ({ row }) => {
				return <div className='truncate text-center max-w-16'>{findNameByValue(options['sexes'], row.original.personal?.sex || '')}</div>;
			},
			footer: (info) => info.column.id,
		}),
	];
}
