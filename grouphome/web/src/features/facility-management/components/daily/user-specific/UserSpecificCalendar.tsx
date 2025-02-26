import DatePicker from '@/components/elements/CalendarPicker';
import { Button } from '@/components/ui/button'
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import '../../../assets/daily/UserSpecificCalendar.css';

type props = {
  yyyymmdd: string;
  setYyyymmdd: Dispatch<SetStateAction<string>>;
}

const UserSpecificCalendar = ({ yyyymmdd, setYyyymmdd }: props) => {
  const next = () => {
    const newMonth = dayjs(yyyymmdd).add(1, 'month').format('YYYYMMDD');
    setYyyymmdd(newMonth);
  }

  const prev = () => {
    const newMonth = dayjs(yyyymmdd).subtract(1, 'month').format('YYYYMMDD');
    setYyyymmdd(newMonth);
  }
  return (
    <>
      {/* Calendar */}
      <div id='user-specific-calendar' className="flex items-center justify-center gap-4 mb-6">
        <Button onClick={prev} className="bg-white text-black hover:bg-white px-0 h-10 w-10">
          <ChevronLeft className="h-10 w-10 text-black" />
        </Button>


        <div className="flex items-center gap-2 shadow-md rounded-md px-4 bg-white cursor-pointer hover:bg-gray-50 h-10">
          <DatePicker
            name="datepicker"
            value={yyyymmdd}
            mode="single"
            format="YYYY年MM月"
            inputClassName="border-none"
            viewMode='month'
            onChange={(event) => {
              const newMonth = typeof event.target.value === 'string'? event.target.value : '';
              setYyyymmdd(dayjs(newMonth).format('YYYYMMDD'));
            }}
          />
        </div>
        <Button onClick={next} disabled={!dayjs(yyyymmdd).isBefore(new Date(), 'month')} className="h-10 w-10 bg-white text-black hover:bg-white px-0">
          <ChevronRight className="h-10 w-10" />
        </Button>
      </div>

    </>
  )
}

export default UserSpecificCalendar