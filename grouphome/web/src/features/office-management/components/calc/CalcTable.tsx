import { CommonTable } from '@/components/elements/common/CommonTable'
import { Calc as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { getTableColumns, calcListData, calcListColumns } from './CalcTableDef'
import { CallBackClick } from '@/components/elements/Common';
  
type ArgsData = {
  branchId: number
  cbClick: CallBackClick
  seq: number
}

function exchangeData(row:[]): calcListColumns[] {
  var ret:calcListColumns[] = [];
  if (row && row.length > 0) {
    row.forEach((item) => {
      const start = item['validStartDate'] || '';
      const end = item['validEndDate'] || '';
      const period = start + (start != '' || end != '' ? '〜' : '') + end

      ret.push({
        id: item['id'],
        calcItemId: item['calcItemId'],
        name: item['name'],
        classification: item['classification'],
        startDate: item['startDate'],
        notificationDate: item['notificationDate'],
        period: period,
        comment: item['remark'],
      });
    });
  }
  return ret;
}

function CalcTable({branchId, cbClick, seq}: ArgsData) {
  const columns = getTableColumns(cbClick);
  const param = { branchId: branchId };
  return (
<>
  <CommonTable
        column={columns}
        cbSelect={cbClick}
        body={param}
        data={calcListData}
        path={ApiPath}
        cbExchangeData={exchangeData}
        seq={seq}
        hidePage={true}/>
</>
  )
}
export { CalcTable }
