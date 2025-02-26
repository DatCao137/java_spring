import { CommonTable } from '@/components/elements/common/CommonTable'
import { SupportPlan as ApiSupportPlan } from '@/features/blc-common/assets/ApiPath';
import { getTableColumns, supportPlanListData, SupportPlanListColumns, TableFilterDef, getFilterItems} from './SupportPlanTableDef'
import { CallBackSelect } from '@/components/elements/Common';
import { useState } from 'react';

type ArgsData = {
    cbSelect: CallBackSelect;
    seq: number;
    resetSelections?: boolean;
}

const defaultFilter: TableFilterDef = {
    name: null,
    createDate: null,
    planStartDate: null,
    planStartEnd: null,
    homeName: null,
    heldDate: null,
    creator: null,
    applyDate: null,
    status: null,
    additionalInfo: null,
};

function exchangeData(row:[]): SupportPlanListColumns[] {
    var ret:SupportPlanListColumns[] = [];
    console.log ('row', row);
    row.forEach((item) => {
        ret.push({
            id: item['id'],
            name: item['name'],
            createDate: item['createDate'],
            planStartDate: item['planStartDate'],
            planStartEnd: item['planStartEnd'],
            homeName: item['homeName'],
            heldDate: item['heldDate'],
            creator: item['creator'],
            applyDate: item['applyDate'],
            status: item['status'],
            additionalInfo: item['additionalInfo'],
            updatedAt: item['updatedAt'],
        });
    });
    return ret;
}

export function SupportPlanTable({cbSelect, seq, resetSelections= true}: ArgsData) {
    const [ filter, setFilter ] = useState<TableFilterDef>(defaultFilter);
    const columns = getTableColumns();
    const filterDef = getFilterItems();

    return (
        <>
            <CommonTable<TableFilterDef>
                column={columns}
                data={supportPlanListData}
                path={ApiSupportPlan}
                cbSelect={cbSelect}
                cbExchangeData={exchangeData}
                seq={seq}
                pager={true}
                filter={{ vals: filter, setter: setFilter, def: filterDef }}
                resetSelections={resetSelections}
            />
        </>
    )
}
