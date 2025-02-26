import DatePicker from "@/components/elements/CalendarPicker";
import { Button } from "@/components/ui/ButtonCus";
import { FacilityDailyRecorderBasicInfo } from "@/features/blc-common/assets/ApiPath";
import { Get } from "@/features/blc-common/utils/ServerRequest";
import React, { useEffect } from "react";
import { DailyRecorderBasicInfoResponseDto } from "../../../types/DailyRecorder";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ArgsData = {
  homeId: number,
  date: string,
  seq: number;
  setYyyymmdd: React.Dispatch<React.SetStateAction<string>>;
};

export const DailyRecorderTableHeader = ({ homeId, date, seq, setYyyymmdd }: ArgsData) => {
  const [theDate, setTheDate] = React.useState<string>(date)
  const [basicInfo, setBasicInfo] = React.useState<DailyRecorderBasicInfoResponseDto>();

  const fetchData = async (date: string) => {
    Get({
      apiPath: `${FacilityDailyRecorderBasicInfo}`,
      params: {
        params: {
          homeId: homeId,
          date,
        },
      },
      onSuccess: (res) => {
        setBasicInfo(res.data.data as DailyRecorderBasicInfoResponseDto);
      },
      onError: (res) => {
        setBasicInfo(undefined);
      },
    });
  };

  const previousDate = () => {
    const newDate = dayjs(theDate).subtract(1, "day").format("YYYYMMDD");
    setTheDate(newDate);
    setYyyymmdd(newDate);
    fetchData(newDate);
  };

  const nextDate = () => {
    const newDate = dayjs(theDate).add(1, "day").format('YYYYMMDD');
    setTheDate(newDate);
    setYyyymmdd(dayjs(newDate).format("YYYYMMDD"));
    fetchData(newDate);
  };

  return (
    <>
      <div>
        {/* Date Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button onClick={previousDate} className="bg-white text-black hover:bg-white px-0 h-10 w-10">
            <ChevronLeft className="h-10 w-10 text-black" />
          </Button>
          <div id="daily-recorder-calendar" className="flex items-center gap-2 shadow-md rounded-md px-4 bg-white cursor-pointer hover:bg-gray-50 h-10">
            <DatePicker
              name="datepicker"
              value={theDate}
              mode="single"
              format="YYYY年MM月DD日(ddd)"
              inputClassName="border-none"
              onChange={(event) => {
                const v = typeof event.target.value == 'string' ? event.target.value : '';
                const newDate = dayjs(v).format('YYYYMMDD');
                setTheDate(newDate);
                setYyyymmdd(newDate);
              }}
            />
          </div>
          <Button onClick={nextDate} disabled={!dayjs(theDate?.toString()).isBefore(new Date(), 'day')} className="h-10 w-10 bg-white text-black hover:bg-white px-0">
            <ChevronRight className="h-10 w-10" />
          </Button>
        </div>

        <div className="grid grid-cols-6 grid-rows-12 gap-0 text-sm border border-sliver-400">
          <div className="col-span-4 row-span-6 grid grid-rows-6 bg-gray-200">
            <div className="row-span-1 grid grid-cols-12 border-b border-sliver-400">
              <div className="col-span-12 h-full flex items-center justify-center font-bold p-0 bg-white">献立</div>
            </div>

            <div className="row-span-1 grid grid-cols-12 border-b border-sliver-400">
              <div className="col-span-4 h-full flex items-center justify-center font-bold p-0 bg-white border-r border-sliver-400">朝</div>
              <div className="col-span-4 h-full flex items-center justify-center font-bold p-0 bg-white border-r border-sliver-400">昼</div>
              <div className="col-span-4 h-full flex items-center justify-center font-bold p-0 bg-white">夕</div>
            </div>

            <div className="row-span-4 grid grid-cols-12">
              <div className="p-2 col-span-4 p-0 bg-white border-r border-sliver-400">
                <div>{basicInfo?.menuBreakfast}</div>
              </div>
              <div className="p-2 col-span-4 p-0 bg-white border-r border-sliver-400">
                <div>{basicInfo?.menuLunch}</div>
              </div>
              <div className="p-2 col-span-4 p-0 bg-white">
                <div>{basicInfo?.menuDinner}</div>
              </div>
            </div>
          </div>
          <div className="col-span-2 row-span-6 grid grid-rows-6 border-l border-sliver-400 bg-gray-200">
            <div className="row-span-2 grid grid-cols-6 border-b border-sliver-400">
              <div className="col-span-2 h-full flex items-center justify-center p-0 bg-white border-r border-sliver-400">{basicInfo?.nightPatrols[0]?.time}巡回</div>
              <div className="col-span-4 h-full flex items-center justify-left pl-5 bg-white text-center">{basicInfo?.nightPatrols[0].report}</div>
            </div>
            <div className="row-span-2 grid grid-cols-6 border-b border-sliver-400">
              <div className="col-span-2 h-full flex items-center justify-center p-0 bg-white border-r border-sliver-400">{basicInfo?.nightPatrols[1]?.time}巡回</div>
              <div className="col-span-4 h-full flex items-center justify-left pl-5 bg-white text-center">{basicInfo?.nightPatrols[1]?.report}</div>
            </div>
            <div className="row-span-2 grid grid-cols-6">
              <div className="col-span-2 h-full flex items-center justify-center p-0 bg-white border-r border-sliver-400">{basicInfo?.nightPatrols[2]?.time}巡回</div>
              <div className="col-span-4 h-full flex items-center justify-left pl-5 bg-white text-center">{basicInfo?.nightPatrols[2]?.report}</div>
            </div>
          </div>
          <div className="col-span-4 row-span-4 grid grid-rows-5 border-t border-sliver-400 bg-gray-200">
            <div className="row-span-1 grid grid-cols-6 border-b border-sliver-400">
              <div className="h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white font-bold">朝番</div>
              <div className="h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white font-bold">昼番</div>
              <div className="h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white font-bold">夜番</div>
              <div className="h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white font-bold">夜勤</div>
              <div className="h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white font-bold">夜間巡回</div>
              <div className="h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white font-bold">社員・サビ管</div>
            </div>
            <div className="row-span-4 grid grid-cols-6">
              <div className="p-0 border-r border-sliver-400 bg-white pl-2 pt-1 text-left">
                <div>{basicInfo?.shiftMorning.nameSei}{basicInfo?.shiftMorning.nameMei}</div>
              </div>
              <div className="p-0 border-r border-sliver-400 bg-white pl-2 pt-1 text-left">
                <div>{basicInfo?.shiftAfternoon.nameSei}{basicInfo?.shiftAfternoon.nameMei}</div>
              </div>
              <div className="p-0 border-r border-sliver-400 bg-white pl-2 pt-1 text-left">{basicInfo?.shiftEvening.nameSei}{basicInfo?.shiftEvening.nameMei}</div>
              <div className="p-0 border-r border-sliver-400 bg-white pl-2 pt-1 text-left">{basicInfo?.shiftNight.nameSei}{basicInfo?.shiftNight.nameMei}</div>
              <div className="p-0 border-r border-sliver-400 bg-white pl-2 pt-1 text-left">{basicInfo?.shiftPatrol.nameSei}{basicInfo?.shiftPatrol.nameMei}</div>
              <div className="p-0 border-r border-sliver-400 bg-white pl-2 pt-1 text-left">
                <div>{basicInfo?.shiftStaff.nameSei}{basicInfo?.shiftStaff.nameMei}</div>
              </div>
            </div>
          </div>
          <div className="col-span-2 row-span-4 grid grid-rows-5 border-t border-sliver-400 bg-gray-200">
            <div className="row-span-1 grid grid-cols-1 border-b border-sliver-400">
              <div className="h-full flex items-center justify-center p-0 bg-white font-bold">備考欄</div>
            </div>
            <div className="row-span-4 grid grid-cols-1">
              <div className="p-0 bg-white pl-2 pt-1 text-left">{basicInfo?.remark}</div>
            </div>
          </div>
          <div className="col-span-6 row-span-2 grid grid-rows-1 border-t border-sliver-400 bg-gray-200">
            <div className="flex">
              <div className="flex-[2] h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white">確認欄</div>
              <div className="flex-[2] h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white text-center">
                予定表<br />(ホワイトボード)
              </div>
              <div className="flex-[1] h-full flex items-center justify-left p-0 border-r border-sliver-400 bg-white pl-2 text-left">{basicInfo?.confirmCalendar.nameSei}{basicInfo?.confirmCalendar.nameMei}</div>
              <div className="flex-[2] h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white text-center">備品発注依頼書</div>
              <div className="flex-[1] h-full flex items-center justify-left p-0 border-r border-sliver-400 bg-white pl-2 text-left">{basicInfo?.confirmOrder.nameSei}{basicInfo?.confirmOrder.nameMei}</div>
              <div className="flex-[2] h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white text-center">
                体験利用者<br />ファイル
              </div>
              <div className="flex-[1] h-full flex items-center justify-left p-0 border-r border-sliver-400 bg-white pl-2 text-left">{basicInfo?.confirmTrial.nameSei}{basicInfo?.confirmTrial.nameMei}</div>
              <div className="flex-[2] h-full flex items-center justify-center p-0 border-r border-sliver-400 bg-white text-center">
                前日分<br />支援記録・日誌
              </div>
              <div className="flex-[1] h-full flex items-center justify-left p-0 border-r border-sliver-400 bg-white pl-2 text-left">{basicInfo?.confirmPreviousDiary.nameSei}{basicInfo?.confirmPreviousDiary.nameMei}</div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
