import { CommonTable } from '@/components/elements/common/CommonTable'
import { getTableColumns, staffListData, StaffListColumns, TableFilterDef, getFilterItems } from './StaffTableDef'
import { StaffList as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { CallBackSelect } from '@/components/elements/Common';
import { useEffect, useState } from 'react';

type ArgsData = {
    cbSelect: CallBackSelect
    seq: number
    filter: TableFilterDef,
    resetSelections?: boolean,
}

const defaultFilter: TableFilterDef = {
    branchId: null,
    homeId: null,
    unitId: null,
    employeeNo: null,
    name: null,
    enrollmentStatus: null,
    occupationName: null,
    employeeType: null,
    hasQualification: null
};

function exchangeData(row: any[]): StaffListColumns[] {
    const ret: StaffListColumns[] = [];
    row.forEach((item) => {
        ret.push({
            id: item['id'],
            employeeNo: item['employeeNo'],
            name: item['name'],
            enrollmentStatus: item['enrollmentStatus'] ?? null,
            occupation: item['occupation'] ?? null,
            branchNames: JSON.parse(item['branchNames'])?.join(' '),
            homeNames: JSON.parse(item['homeNames'])?.join(' '),
            unitNames: JSON.parse(item['unitNames'])?.join(' '),
            employeeType: item['employeeType'] ?? null,
            enrollmentPeriod: item['enrollmentPeriod'],
            hasQualification: item['hasQualification'],
        });
    });
    return ret;
}

function StaffTable({ cbSelect, seq, resetSelections }: ArgsData) {
    const columns = getTableColumns();
    const [ filter, setFilter ] = useState<TableFilterDef>(defaultFilter);
    const filterDef = getFilterItems();

    return (
        <>
            <CommonTable
                column={columns}
                data={staffListData}
                path={ApiPath}
                pager={true}
                filter={{ vals: filter, setter: setFilter, def: filterDef }}
                cbSelect={cbSelect}
                cbExchangeData={exchangeData}
                resetSelections={resetSelections}
                seq={seq}
            />
        </>
    );
}
export { StaffTable, defaultFilter }
