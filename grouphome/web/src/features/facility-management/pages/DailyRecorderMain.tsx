import { useEffect, useState } from 'react';
import { DailyRecorder } from '../components/daily/recorder/DailyRecorder';

interface DailyRecorderMainProps {
    homeId: number;
    date: string;
}

export const DailyRecorderMain: React.FC<DailyRecorderMainProps> = ({ homeId, date }) => {
    const [theDate, setTheDate] = useState<string>(date);

    useEffect(() => {
        setTheDate(date);
    }, [date]);

    return (
        <>
            <div id="facility_daily_recorder">
                <DailyRecorder homeId={homeId} date={theDate} seq={1} className='w-full max-w-6xl m-0' />
            </div>
        </>
    );
};
