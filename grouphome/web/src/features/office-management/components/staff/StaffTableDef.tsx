import { FilterItem } from '@/components/elements/tableFilter/TableFilter';
import { createColumnHelper } from '@tanstack/react-table';

export type StaffListColumns = {
    id: number;
    employeeNo: string;
    name: string;
    enrollmentStatus: string | null;
    occupation: string | null;
    branchNames: string;
    homeNames: string;
    unitNames: string;
    employeeType: string | null;
    enrollmentPeriod: string;
    hasQualification: string;
};

export type TableFilterDef = {
    branchId: string | null;
    homeId: string | null;
    unitId: string | null;
    employeeNo: string | null;
    name: string | null;
    enrollmentStatus: number[] | null;
    occupationName: string | null;
    employeeType: string | null;
    hasQualification: number | null;
};

const enrollmentStatuses = [
    { name: "在職中", value: 1 },
    { name: "休職中", value: 2 },
    { name: "退職済", value: 3 },
];

const qualificationStatuses = [
    { name: "あり", value: 1 },
    { name: "なし", value: 0 },
];

export function getFilterItems(): { [key: string]: FilterItem } {
    return {
        employeeNo: { name: "employeeNo", type: 'text' }, // 社員番号
        name: { name: "name", type: 'text' }, // 氏名
        enrollmentStatus: { name: "enrollmentStatus", type: 'option', options: enrollmentStatuses }, // 在籍状況
        occupation: { name: "occupationTypeId", type: 'select', select: 'hr_occupation' }, // 職種
//        branchNames: { name: "branchId", type: 'select', select: 'cust__branch' }, // 事業所
//        homeNames: { name: "homeId", type: 'select', select: 'cust__home' }, // ホーム名
//        unitNames: { name: "unitId", type: 'select', select: 'cust__unit' }, // ユニット名
        employeeType: { name: "employeeTypeId", type: 'select', select: 'hr_employee_type' }, // 雇用形態
        enrollmentPeriod: { name: "enrollmentPeriod", type: 'month-range' }, // 在籍期間
        hasQualification: { name: "hasQualification", type: 'option', options: qualificationStatuses, optionMultiple: false }, // 保有資格
    };
}

export const staffListData: StaffListColumns[] = [];

export function getTableColumns() {
    const columnHelper = createColumnHelper<StaffListColumns>();
    return [
        columnHelper.accessor('employeeNo', {
            header: () => <span>社員番号</span>,
            cell: ({ row }) => <div>{row.original.employeeNo}</div>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('name', {
            header: () => <span>氏名</span>,
            cell: ({ row }) => <div>{row.original.name}</div>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('enrollmentStatus', {
            header: () => <span>在籍状況</span>,
            cell: ({ row }) => <div>{row.original.enrollmentStatus}</div>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('occupation', {
            header: () => <span>職種</span>,
            cell: ({ row }) => <div>{row.original.occupation}</div>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('branchNames', {
            header: () => <span>事業所</span>,
            cell: ({ row }) => <div>{row.original.branchNames}</div>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('homeNames', {
            header: () => <span>ホーム名</span>,
            cell: ({ row }) => <div>{row.original.homeNames}</div>,
            footer: info=>info.column.id,
        }),
        columnHelper.accessor('unitNames', {
            header: () => <span>共同生活住居地</span>,
            cell: ({ row }) => <div>{row.original.unitNames}</div>,
            footer: info=>info.column.id,
        }),
        columnHelper.accessor('employeeType', {
            header: () => <span>雇用形態</span>,
            cell: ({ row }) => <div>{row.original.employeeType}</div>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('enrollmentPeriod', {
            header: () => <span>在籍期間</span>,
            cell: ({ row }) => <div>{row.original.enrollmentPeriod}</div>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('hasQualification', {
            header: () => <span>保有資格</span>,
            cell: ({ row }) => <div>{row.original.hasQualification}</div>,
            footer: info => info.column.id,
        }),
    ];
}