import { ja } from 'date-fns/locale';
import { Calendar } from "@/components/ui/Calendar";
import { default as defaultStyles } from "react-day-picker/dist/style.module.css";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/ButtonCus";
import { useState, useEffect } from 'react';
import { formatJPDate } from '@/utils/DateUtils';
import dayjs from 'dayjs';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { CommonTable } from '@/components/elements/common/CommonTable';

import { Post } from '@/features/blc-common/utils/ServerRequest';
import { DailyUnitList as ApiDailyUnitList } from '@/features/blc-common/assets/ApiPath';

import { DailyDetailUnitResponseDto } from '../../types/Daily';
import { getTableColumns } from "./detail/DailyDetailTableDef";

import { DailyDetailCss } from '../../assets/daily/DailyDetailCss';
import { useLocation, useNavigate } from 'react-router-dom';

type ArgsData = {
  homeId: string | null
}

export const DailyDetail = ({ homeId }: ArgsData) => {
  const columns = getTableColumns();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tabUnitLists, setTabUnitLists] = useState<any[]>([]);
  const [dataUnits, setDataUnits] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [homeName, setHomeName] = useState<string>('');
  const [branchName, setBranchName] = useState<string>('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setHomeName(query.get('homeName') || '');
    setBranchName(query.get('branchName') || '');
  }, [location.search]);

  const exchangeData = (row: DailyDetailUnitResponseDto[]): DailyDetailUnitResponseDto[] => {
    const results: DailyDetailUnitResponseDto[] = [];
    return results;
  }

  const callDataUnitRoom = (unitId: Number) => {
    
    const results: DailyDetailUnitResponseDto[] = dataUnits
                .filter((itemRoom) => itemRoom[0] === unitId)
                .map((itemRoom) => ({
                  id: itemRoom[1],
                  unitId: itemRoom[2],
                  unitName: itemRoom[3],
                }));
    return results;
  }

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    navigate(`/app/facility/daily-recorder?homeId=${homeId}&date=${dayjs(day).format('YYYYMMDD')}`);
  }

  const addOneMonth = () => {
    const newMonth = dayjs(currentMonth).add(1, 'month').toDate();
    setCurrentMonth(newMonth);
  }

  const subtractOneMonth = () => {
    const newMonth = dayjs(currentMonth).subtract(1, 'month').toDate();
    setCurrentMonth(newMonth);
  }

  const getListUnits = async() => {
    Post({
        apiPath: ApiDailyUnitList,
        params: { homeId: homeId, homeDate: dayjs(selectedDate).format('YYYYMMDD') },
        onSuccess: (res) => {
          setTabUnitLists(res.data.data.listUnits);
          setDataUnits(res.data.data.listDetailUnits);
    }});
  }

  useEffect(() => {
      getListUnits();
  }, [homeId, selectedDate])

  return (
    <>
      <style>
        <DailyDetailCss />
      </style>
      <div>
        <div className="flex-none xl:flex xl:justify-between gap-y-5 xl:gap-x-10 w-full">
          {/* left side */}
          <div className="w-full xl:w-1/2 space-y-5">
            <div className='text-lg font-bold'>日付から選択</div>
            <div className='bg-white rounded-md shadow-md flex justify-center'>
              <div className="flex flex-row items-center">
                {/* prev month */}
                <Button onClick={() => subtractOneMonth()} className="bg-white text-black hover:bg-white">
                  <ChevronLeft className="h-10 w-10" />
                </Button>
                {/* calendar */}
                <div>
                  <div className='relative top-5 left-7'>
                    <span className='font-bold'>{formatJPDate(currentMonth.toString(), 'YYYY年MM月')}</span>
                  </div>
                  <Calendar
                    selected={selectedDate}
                    onDayClick={handleDayClick}
                    month={currentMonth}
                    locale={ja}
                    weekStartsOn={1}
                    style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
                    classNames={defaultStyles}
                    showOutsideDays={false}
                    styles={{
                      head: {
                        backgroundColor: '#efefef',
                      },
                      head_cell: {
                        border: '1px solid #dfdfdf',
                        fontSize: '1rem',
                      },
                      cell: {
                        textDecoration: 'underline',
                      },
                      nav_button_next: {
                        display: 'none',
                      },
                      nav_button_previous: {
                        display: 'none',
                      },
                      caption_label: {
                        display: 'none',
                      },
                    }}
                  />
                </div>
                {/* next month */}
                <Button onClick={() => addOneMonth()} className="bg-white text-black hover:bg-white">
                  <ChevronRight className="h-10 w-10" />
                </Button>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="w-full xl:w-1/2 space-y-5">
            <div className='text-lg font-bold'>利用者名から選択</div>
            <div className="bg-while">
              <div>
                <Tabs className='bg-white shadow-md rounded-md'>
                  <TabList>
                    {tabUnitLists.map((item, index) => (
                      <Tab key={item[0] || index}><span className='px-2'>{ item[1] }</span></Tab>
                    ))}
                  </TabList>
                  {tabUnitLists.map((item, index) => (
                    <TabPanel key={ item[0] || index }>
                      <CommonTable
                        column={columns}
                        data={callDataUnitRoom(item[0])}
                        path=""
                        hidePage={true}
                        seq={null}
                        cbExchangeData={exchangeData}
                      />
                    </TabPanel>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}