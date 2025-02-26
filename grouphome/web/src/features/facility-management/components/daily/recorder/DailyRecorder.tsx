import { DailyRecorderTableHeader } from "./DailyRecorderTableHeader";
import { DailyRecorderTableTabs } from "./DailyRecorderTableTabs";
import { DailyRecorderCss } from "../../../assets/daily/DailyRecorderCss";
import { useState } from "react";

type ArgsData = {
    homeId: number;
    date: string;
    seq: number;
    className?: string;
};

export const DailyRecorder = ({ homeId, date, seq, className }: ArgsData) => {
    const [yyyymmdd, setYyyymmdd] = useState<string>(date);
    return (
        <>
            <style>
                <DailyRecorderCss />
            </style>
            <div className={`${className}`} >
                <DailyRecorderTableHeader homeId={homeId} date={yyyymmdd} seq={1} setYyyymmdd={setYyyymmdd} />
                <DailyRecorderTableTabs cbSelect={() => { }} seq={1} className="mt-5 daily-table" homeId={homeId} yyyymmdd={yyyymmdd} />
            </div>
        </>
    );
}
