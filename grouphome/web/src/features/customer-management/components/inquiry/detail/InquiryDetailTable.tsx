import { CommonTable } from '@/components/elements/common/CommonTable'
import { InquiryDetail as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { CallBackSelect } from '@/components/elements/Common';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelectList } from '../../../contexts/SelectListContext';
import { getTableColumns, inquiryDetailData, InquiryDetailDataColumns } from './InquiryDetailTableDef';

type ArgsData = {
    cbSelect: CallBackSelect;
    seq: number;
    tgtId: string | null;
    resetSelections: boolean;
    reload: () => void;
}

export function InquiryDetailTable({cbSelect, seq, tgtId, resetSelections = false, reload}: ArgsData) {
    const { selectListData } = useSelectList();
    const selCustProgres = selectListData.get('cust_progres')?.filter((e) => e.value) || [];
    const columns = getTableColumns();
    const [ filter, setFilter ] = useState({id: null});
    const toNumber = (value: string): number => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num; 
    };
    const breakdownCaculator = (breakdownSelf: string, breakdownFamily: string, breakdownCounselor: string, breakdownSupport: string, breakdownThirdParty: string) => {
        if(breakdownSelf || breakdownFamily || breakdownCounselor || breakdownSupport || breakdownThirdParty) {
            return (
                toNumber(breakdownSelf) +
                toNumber(breakdownFamily) +
                toNumber(breakdownCounselor) +
                toNumber(breakdownSupport) +
                toNumber(breakdownThirdParty)
            );
        } else return ""
    }; 

    function exchangeData(row:[]): InquiryDetailDataColumns[] {
        var ret:InquiryDetailDataColumns[] = [];
        selCustProgres.forEach((sel) => {
            const item = row.find((element: InquiryDetailDataColumns) => String(element.status) === sel.value);
            ret.push({
                id: item ? item['id'] : "",
                status: item ? item['status'] : sel.value,
                statusName: item ? item['statusName'] : sel.name,
                homeId: item ? item['homeId'] : "",
                homeName: item ? item['homeName'] : "",
                ghData: item ? item['ghData'] : "",
                date: item ? item['date'] : "",

                breakdownSelf: item ? item['breakdownSelf'] : "",
                breakdownFamily: item ? item['breakdownFamily'] : "",
                breakdownCounselor: item ? item['breakdownCounselor'] : "",
                breakdownSupport: item ? item['breakdownSupport'] : "",
                breakdownThirdParty: item ? item['breakdownThirdParty'] : "",
                breakdownSum: item ? breakdownCaculator(item['breakdownSelf'], item['breakdownFamily'], item['breakdownCounselor'], item['breakdownSupport'], item['breakdownThirdParty']).toString() : "",

                recordTime: item ? item['recordTime'] : "",
                recordVisitTime: item ? item['recordVisitTime'] : "",
                recordFreeTrial: item ? item['recordFreeTrial'] : "",
                recordPaidTrial: item ? item['recordPaidTrial'] : "",
                recordSsCompletion: item ? item['recordSsCompletion'] : "",
                recordContractDate: item ? item['recordContractDate'] : "",
                recordPlanStatus: item ? item['recordPlanStatus'] : "",
                recordDlanStatusName: item ? item['recordDlanStatusName'] : "",
                updatedAt: item ? item['updatedAt'] : "",
            });
        });
        return ret;
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            reload();
            if(tgtId){
                setFilter((prev: any) => {
                    return { ...prev, ["id"]: tgtId };
                });
            }
        };
        fetchInitialData();
      }, [tgtId]);

    return (
<>
        <CommonTable
            column={columns}
            data={inquiryDetailData}
            path={ApiPath}
            cbSelect={cbSelect}
            cbExchangeData={exchangeData}
            seq={seq} 
            pager={false}
            hidePage={true}
            filter={{ vals: filter, setter: setFilter, def: {} }}
            resetSelections={resetSelections}/>
</>
    )
}
