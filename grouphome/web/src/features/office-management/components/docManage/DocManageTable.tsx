import { CommonTable } from '@/components/elements/common/CommonTable'
import { DocFileList as ApiDocFileList } from '@/features/blc-common/assets/ApiPath';
import { getTableColumns, docManageListData, DocManageListColumns, getFilterItems, TableFilterDef } from './DocManageTableDef'
import { CallBackSelect } from '@/components/elements/Common';
import { useState } from 'react';

type ArgsData = {
    cbSelect: CallBackSelect
    seq: number,
    filter: TableFilterDef,
    resetSelections?: boolean;
}

const defaultFilter: TableFilterDef = {
    pathId: null,
    docName: null, 
    fileName: null, 
    comment: null,  
    created_at: null,
    updated_at: null
  };

function exchangeData(row:[]): DocManageListColumns[] {
    var ret:DocManageListColumns[] = [];
    row.forEach((item) => {

        const blob = new Blob([item['data']], { type: "application/octet-stream" });
        const file = new File([blob], item['fileName'], { type: item['ext'] });

        ret.push({
            id: item['id'],
            docId: item['docId'],
            docName: item['docName'],
            fileName: item['fileName'],
            dataFile:  file,
            comment: item['comment'],
            created_at: item['created_at'],
            updated_at: item['updated_at']
        });
    });
    return ret;
}

function DocManageTable({cbSelect, seq, filter, resetSelections}: ArgsData) {

    const pathId = filter.pathId;
    const [filterState, setFilterState] = useState(filter);
    const columns = getTableColumns();
    const filterDef = getFilterItems();
    filterState.pathId = pathId;
    
    return (
<>
        <CommonTable<TableFilterDef>
            column={columns}
            data={docManageListData}
            path={ApiDocFileList}
            pager={true}
            seq={seq}
            filter={{ vals: filterState, setter: setFilterState, def: filterDef }}
            cbSelect={cbSelect}
            cbExchangeData={exchangeData}
            resetSelections={resetSelections}
        />
</>
    )
}
export { DocManageTable, exchangeData, defaultFilter }
