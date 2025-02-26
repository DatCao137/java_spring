import { CommonTable } from '@/components/elements/common/CommonTable'
import { Inquiry as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { getTableColumns, inquiryListData, InquiryListColumns, TableFilterDef, getFilterItems} from './InquiryTableDef'
import { CallBackSelect } from '@/components/elements/Common';
import { useState } from 'react';

type ArgsData = {
    cbSelect: CallBackSelect;
    seq: number;
    resetSelections?: boolean;

}

const defaultFilter: TableFilterDef = {
    name: null,
    gana: null,
    sex: null,
    age: null,
    inquirySrcName: null,
    inquirySrcStaff: null,
    inquirySrcRoute: null,
    inquirySrcPhone: null,
    inquirySrcLink: null,
    status: null,
    nextAction: null,
};

function exchangeData(row:[]): InquiryListColumns[] {
    var ret:InquiryListColumns[] = [];
    row.forEach((item) => {
        ret.push({
            id: item['id'],
            name: item['name'],
            gana: item['gana'],
            sex: item['sex'],
            age: item['age'],
            sexName: item['sexName'],
            inquirySrcName: item['inquirySrcName'],
            inquirySrcStaff: item['inquirySrcStaff'],
            inquirySrcRoute: item['inquirySrcRoute'],
            inquirySrcRouteName: item['inquirySrcRouteName'],
            inquirySrcPhone: item['inquirySrcPhone'],
            inquirySrcLink: item['inquirySrcLink'],
            inquirySrcLinkName: item['inquirySrcLinkName'],
            status: item['status'],
            statusName: item['statusName'],
            nextAction: item['nextAction'],
            updatedAt: item['updatedAt'],
        });
    });
    return ret;
}

export function InquiryTable({cbSelect, seq, resetSelections= true}: ArgsData) {
    const [ filter, setFilter ] = useState<TableFilterDef>(defaultFilter);
    const columns = getTableColumns();
    const filterDef = getFilterItems();

    return (
<>
<CommonTable<TableFilterDef>
        column={columns}
        data={inquiryListData}
        path={ApiPath}
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
