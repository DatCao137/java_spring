import React, { useEffect, useState } from 'react';
import { CommonInput } from '../common/CommonInput';

interface TableFilterYearMonthRangeProps {
  value: string; // Value as a single string, separated by ','
  handle: (e: { target: { value: string | null } }) => void; // Mimics a native event to work with handleInput
}

export const TableFilterYearMonthRange: React.FC<TableFilterYearMonthRangeProps> = ({
  value,
  handle,
}) => {
  // Helper function to convert total months to years and months
  const convertToYearMonth = (totalMonths: number | null): { year: string | null; month: string | null } => {
    if (totalMonths === null) {
      return { year: null, month: null };
    }
    const year = Math.floor(totalMonths / 12);
    const month = totalMonths % 12;
    return {
      year: year > 0 ? year.toString() : null,
      month: month > 0 ? month.toString() : null,
    };
  };

  // Parse the initial value into total months
  const [fromMonths, toMonths] = (value ? value.split(',') : ['', '']).map((v) => (v ? parseInt(v) : null));
  const fromYearMonth = convertToYearMonth(fromMonths);
  const toYearMonth = convertToYearMonth(toMonths);

  const [fromYear, setFromYear] = useState<string | null>(fromYearMonth.year); // Extract "from year"
  const [fromMonth, setFromMonth] = useState<string | null>(fromYearMonth.month); // Extract "from month"
  const [toYear, setToYear] = useState<string | null>(toYearMonth.year); // Extract "to year"
  const [toMonth, setToMonth] = useState<string | null>(toYearMonth.month); // Extract "to month"

  const handleFromYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFromYear(value && !isNaN(Number(value)) && Number(value) > 0 ? value : null);
  };

  const handleFromMonthChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFromMonth(value && !isNaN(Number(value)) && Number(value) > 0 ? value : null);
  };

  const handleToYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setToYear(value && !isNaN(Number(value)) && Number(value) > 0 ? value : null);
  };

  const handleToMonthChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setToMonth(value && !isNaN(Number(value)) && Number(value) > 0 ? value : null);
  };

  useEffect(() => {
    // Helper function to convert year and month to total months
    const convertToMonths = (year: string | null, month: string | null): number | null => {
      const yearInMonths = year ? parseInt(year) * 12 : 0;
      const monthValue = month ? parseInt(month) : 0;
      return year || month ? yearInMonths + monthValue : null;
    };

    const fromTotalMonths = convertToMonths(fromYear, fromMonth);
    const toTotalMonths = convertToMonths(toYear, toMonth);

    // Combine the total months into a single string
    console.log(fromTotalMonths, toTotalMonths);
    let combinedValue = (fromTotalMonths && toTotalMonths) === 0 ? null : `${fromTotalMonths ?? ''},${toTotalMonths ?? ''}`;
    if (combinedValue === ',') {
      combinedValue = null;
    }
    handle({ target: { value: combinedValue } }); // Pass as { target: { value } } to work with handleInput
  }, [fromYear, fromMonth, toYear, toMonth]);

  return (
    <div className="grid grid-cols-7 gap-4 items-center">
      <div className="col-span-3 grid grid-cols-1 gap-2">
        <CommonInput
          className="table-filter-year w-full"
          type="number"
          value={fromYear}
          placeholder="年"
          onChange={handleFromYearChange}
        />
        <CommonInput
          className="table-filter-month w-full"
          type="number"
          value={fromMonth}
          placeholder="ヶ月"
          onChange={handleFromMonthChange}
        />
      </div>
      <div className="text-center text-gray-500">～</div>
      <div className="col-span-3 grid grid-cols-1 gap-2">
        <CommonInput
          className="table-filter-year w-full"
          type="number"
          value={toYear}
          placeholder="年"
          onChange={handleToYearChange}
        />
        <CommonInput
          className="table-filter-month w-full"
          type="number"
          value={toMonth}
          placeholder="ヶ月"
          onChange={handleToMonthChange}
        />
      </div>
    </div>
  );
};