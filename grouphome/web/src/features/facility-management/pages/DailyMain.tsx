import { useState } from 'react';
import { DailyTable } from '../components/daily/DailyTable';
import { DailyListResponseDto } from '../types/Daily';

export const DailyMain = () => {
  const pageTitle = '支援記録';
  const [tgtData, setTgtData] = useState<string | null>(null)
  const [seq, setSeq] = useState(0);

  const chgTgtData = async (row: DailyListResponseDto) => {
    console.log(row);

    if (row) {
      setTgtData(row.branchId?.toString() || '0');
    }
  }

  return (
    <>
      <div id="facility_daily">
        <div id="dailyList"><DailyTable cbSelect={chgTgtData} seq={seq} /></div>
      </div>
    </>
  );
};
