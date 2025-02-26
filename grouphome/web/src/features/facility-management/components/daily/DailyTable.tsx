import { CallBackSelect } from "@/components/elements/Common";
import { CommonTable } from "@/components/elements/common/CommonTable";
import { dailyListData, getFilterItems, getTableColumns, TableFilterDef } from "./DailyTableDef";
import { useState } from "react";
import { DailyListResponseDto } from "../../types/Daily";
import { Branch as ApiPath } from "@/features/blc-common/assets/ApiPath";
import { useNavigate } from "react-router-dom";
import { FacilityDaily as FacilityDailyApiPath } from "@/features/blc-common/assets/ApiPath";

type ArgsData = {
  cbSelect: CallBackSelect;
  seq: number;
};

const defaultFilter: TableFilterDef = {
  'branchName': null, 'homeName': null, 'location': null,
};

export const DailyTable = ({ cbSelect, seq }: ArgsData) => {
  const columns = getTableColumns();
  const [filter, setFilter] = useState<TableFilterDef>(defaultFilter);
  const filterDef = getFilterItems();
  const navigate = useNavigate();


  const exchangeData = (rows: DailyListResponseDto[]): DailyListResponseDto[] => {
    cbSelect(null);

    if (rows.length == 0) return [];

    const results: DailyListResponseDto[] = [];
    rows.forEach((item) => {
      if (item) {
        let location = (item.prefName ?? '') + ' ' + (item.city ?? '') + ' ' + (item.town ?? '');
        const row: any = {
          branchId: item.branchId,
          homeId: item.homeId,
          branchName: item.branchName,
          homeName: item?.homeName || '',
          location: location,
          updatedAt: item.updatedAt
        };

        results.push(row);
      }
    });

    return results;
  }

  const handleRedirect = (row: DailyListResponseDto) => {
    localStorage.setItem('branchName', row.branchName || '');
    localStorage.setItem('homeName', row.homeName || '');
    navigate(`/app/facility/daily-detail?homeId=${row.homeId || 0}`);
  };

  return (
    <>
      <CommonTable
        column={columns}
        data={dailyListData}
        path={FacilityDailyApiPath}
        pager={true}
        seq={seq}
        filter={{ vals: filter, setter: setFilter, def: filterDef }}
        cbSelect={cbSelect}
        onRowDbClick={handleRedirect}
        cbExchangeData={exchangeData}
        resetSelections={true}
      />
    </>
  );
}
