import { useEffect, useState } from "react";
import { addEventForLogoClickAndWindowResize, changeTableStyle } from "@/utils/Helper";
import UserSpecificCalendar from "./UserSpecificCalendar";
import { DailyRecorderCss } from "@/features/facility-management/assets/daily/DailyRecorderCss";
import UserSpecificTable from "../common/UserSpecificTable";
import dayjs from "dayjs";

type props = {
  date: string;
}

const UserSpecific = ({ date }: props) => {
  const [yyyymmdd, setYyyymmdd] = useState<string>(date);
  useEffect(() => {
    changeTableStyle('#user-specific-table');
    addEventForLogoClickAndWindowResize('#user-specific-table');

  }, []);

  useEffect(() => {
    setYyyymmdd(date);
  }, [date]);

  return (
    <div className="daily-table">
      <style>
        <DailyRecorderCss />
      </style>
      <UserSpecificCalendar yyyymmdd={yyyymmdd} setYyyymmdd={setYyyymmdd} />
      <UserSpecificTable type={2} date={yyyymmdd} cbSelect={() => { }} seq={0} key={'user-specific-table'} unit={0} />
    </div>
  )
}

export default UserSpecific;
