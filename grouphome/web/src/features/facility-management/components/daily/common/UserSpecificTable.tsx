import { CommonTable } from '@/components/elements/form/daily/DailyRecorder/CommonTable'
import { useEffect, useState } from 'react'
import { getFilterItems, getTableColumns } from './UserSpecificTableDef';
import { useLocation } from 'react-router-dom';
import { UserSpecificListResponseDto, UserSpecificTableFilterDef } from '@/features/facility-management/types/Daily';
import { FacilityDailyCustomerItems as ApiPath } from "@/features/blc-common/assets/ApiPath";
import { CallBackSelect } from '@/components/elements/Common';
import { getUniqueValues } from '@/utils/general';
import dayjs from 'dayjs';
import { TypeOption } from './function';
import "../../../assets/daily/UserSpecificTable.css";

type props = {
  cbSelect: CallBackSelect;
  seq: number;
  type: TypeOption;
  date: string;
  unit: number;
}

const UserSpecificTable = ({ cbSelect, seq = 0, type = 1, date = dayjs().format('YYYYMMDD'), unit = 0 }: props) => {
  const [homeId, setHomeId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [unitId, setUnitId] = useState(unit);
  const location = useLocation();
  const [filter, setFilter] = useState<UserSpecificTableFilterDef>({
    customerId,
    yyyymmdd: date,
    homeId,
    type,
    unitId,
  });
  const filterDef = getFilterItems();
  const [createdNameMorning, setCreatedNameMorning] = useState<string>('');
  const [createdNameNoon, setCreatedNameNoon] = useState<string>('');
  const [createdNameNight, setCreatedNameNight] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [rowIndex, setRowIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const exchangeData = (rows: UserSpecificListResponseDto[]): UserSpecificListResponseDto[] => {
    cbSelect(null);
    setCreatedNameMorning(getUniqueValues(rows, 'createdNameMorning').join(','));
    setCreatedNameNoon(getUniqueValues(rows, 'createdNameNoon').join(','));
    setCreatedNameNight(getUniqueValues(rows, 'createdNameNight').join(','));
    return rows;
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const homeId = parseInt(query.get('homeId') || '0');
    const customerId = parseInt(query.get('customerId') || '0');

    setHomeId(Number(homeId));
    setCustomerId(Number(customerId));
    setFilter({...filter, yyyymmdd: date, customerId, homeId, type });
    setIsLoading(false);
  }, [location.search, date]);

  const footer = (type: number = 1, createdNameMorning: string, createdNameNoon: string, createdNameNight: string) => {
    if (type === 2) {
      return (<></>);
    }

    return (
      <>
        <div className="flex justify-between w-1/2 text-sm p-2">
          <span className="whitespace-nowrap">朝の記録者：{createdNameMorning}</span>
          <span className="whitespace-nowrap">昼の記録者：{createdNameNoon}</span>
          <span className="whitespace-nowrap">夜の記録者：{createdNameNight}</span>
        </div>
      </>
    );
  };

  const columns = getTableColumns(type, isUpdating, setIsUpdating, rowIndex, setRowIndex);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div id="user-specific-table">
      <CommonTable
        column={columns}
        data={[]}
        path={ApiPath}
        pager={false}
        hidePage={true}
        seq={seq}
        filter={{ vals: filter, setter: setFilter, def: filterDef }}
        cbSelect={cbSelect}
        cbExchangeData={exchangeData}
        resetSelections={true}
        footer={footer(type, createdNameMorning, createdNameNoon, createdNameNight)}
        className="mt-0 rounded-none"
      />
    </div>
  )
}

export default UserSpecificTable