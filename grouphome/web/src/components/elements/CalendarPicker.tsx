import dayjs from "dayjs";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { CalendarPickerCss } from "../../assets/CalendarPickerCss";
import { JSX } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
import 'dayjs/locale/ja';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('ja');

interface DatePickerChangeEvent {
  target: {
    name: string;
    value: { start: string | null; end: string | null } | string | string[] | null;
    type: 'datepicker';
  };
  currentTarget: {
    name: string;
    value: { start: string | null; end: string | null } | string | string[] | null;
    type: 'datepicker';
  };
}

interface DatePickerProps {
  value?: { start: string | null; end: string | null } | string | string[] | null;
  onChange?: (event: DatePickerChangeEvent) => void;
  mode?: "single" | "range" | "multiple";
  viewMode?: "month" | "date";
  type?: "W" | "J"  // Western | Japanese
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  format?: string;
  name: string;
  disabled?: boolean
}

interface EraRange {
  [key: string]: { start: number; end: number, name: string, base: number };
}

const eras: EraRange = {
  western: { start: 1868, end: new Date().getFullYear() + 20, name: "西暦", base: 0 },
  Reiwa: { start: 1, end: new Date().getFullYear() - 2018 + 20, name: "令和", base: 2018 },
  Heisei: { start: 1, end: 31, name: "平成", base: 1988 },
  Showa: { start: 1, end: 64, name: "昭和", base: 1925 },
  Taisho: { start: 1, end: 15, name: "大正", base: 1911 },
  Meiji: { start: 1, end: 45, name: "明治", base: 1867 },
};

const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * A date picker component that supports single, multiple, and range selection modes.
 * It also supports different calendar eras and fetching holidays for the selected year.
 *
 * @param {DatePickerProps} props - The props for the DatePicker component.
 * @param {string | { start: string | null; end: string | null } | string[] | null} [props.value=null] - The initial value of the date picker.
 * @param {function} [props.onChange=() => {}] - The callback function to handle date changes.
 * @param {string} [props.mode="single"] - The selection mode of the date picker. Can be "single", "multiple", or "range".
 * @param {string} [props.viewMode="date"] - The view mode of the date picker. Can be "date" or "month".
 * @param {string} [props.type="J"] - The type of calendar era. Can be "J" for Japanese or "W" for Western.
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 * @param {string} [props.className] - Additional class names for the date picker container.
 * @param {string} [props.inputClassName] - Additional class names for the input field.
 * @param {string} [props.format="YYYY/MM/DD"] - The format of the displayed date.
 * @param {string} [props.name] - The name attribute for the input field.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to the date picker container.
 *
 * @returns {JSX.Element} The rendered DatePicker component.
 */
const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(({
  value = null,
  onChange = () => { },
  mode = "single",
  viewMode = "date",
  type = "J",
  placeholder,
  className,
  inputClassName,
  format = "YYYY/MM/DD",
  name,
  disabled = false
}, ref) => {

  const parseDate = (date: string | { start: string | null; end: string | null } | string[] | null): { start: string | null; end: string | null } | string | string[] | null => {
    if (date === null) return null;

    if (typeof date === 'string') {
      const parsedDate = dayjs(date);
      if (!parsedDate.isValid()) {
        console.error("Invalid date string provided.");
        return null;
      }
      return date;
    }

    if (typeof date === 'object' && 'start' in date && 'end' in date) {
      const start = date.start;
      const end = date.end;

      if (start && !dayjs(start).isValid()) {
        console.error("Invalid start date string provided.");
        return null;
      }
      if (end && !dayjs(end).isValid()) {
        console.error("Invalid end date string provided.");
        return null;
      }

      return { start, end };
    }

    if (Array.isArray(date)) {
      return date.filter(d => dayjs(d).isValid());
    }

    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    const parsed = parseDate(value);
    if (typeof parsed === 'string') return dayjs(parsed).toDate();
    if (Array.isArray(parsed) && parsed.length > 0) return dayjs(parsed[0]).toDate();
    if (parsed && 'start' in parsed && parsed.start) return dayjs(parsed.start).toDate();
    return new Date();
  });
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDates, setSelectedDates] = useState(() => parseDate(value));
  const [era, setEra] = useState("western");
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  const popupRef = useRef<HTMLDivElement>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const createChangeEvent = (newValue: typeof value): DatePickerChangeEvent => {
    return {
      target: {
        name,
        value: newValue,
        type: 'datepicker'
      },
      currentTarget: {
        name,
        value: newValue,
        type: 'datepicker'
      }
    };
  };

  const calculatePopupPosition = () => {
    setTimeout(() => {
      if (!inputRef.current || !popupRef.current) return;

      const inputRect = inputRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate space available below and above the input
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      // Center horizontally
      let left = inputRect.left + window.scrollX + (inputRect.width / 2) - (popupRect.width / 2);

      // Adjust horizontal position to stay within viewport
      if (left + popupRect.width > window.innerWidth) {
        left = Math.max(window.innerWidth - popupRect.width - 10, 10);
      } else if (left < 0) {
        left = 10;
      }

      // Default to showing below the input
      let top = inputRect.bottom + 10;

      // If there's not enough space below but there's more space above, show above
      if (spaceBelow < popupRect.height && spaceAbove > spaceBelow) {
        // Only show above if there's actually enough space above
        if (spaceAbove > popupRect.height) {
          top = inputRect.top - popupRect.height - 10;
        }
        // If there's not enough space above either, keep it below but allow scrolling
      }

      setPopupPosition({ top, left });
    }, 0);
  };

  useEffect(() => {
    if (isOpen) {
      // Ensure position is calculated after the popup is rendered
      setTimeout(calculatePopupPosition, 0);

      window.addEventListener("scroll", calculatePopupPosition, true); // Use `true` to capture scroll events from all ancestors
      window.addEventListener("resize", calculatePopupPosition);

      return () => {
        window.removeEventListener("scroll", calculatePopupPosition, true);
        window.removeEventListener("resize", calculatePopupPosition);
      };
    }
  }, [isOpen]);

  const formatDate = (date: Date | null): string =>
    date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";

  const handleMouseOver = (date: Date): void => {
    if (mode === "range" && selectedDates && isDateRange(selectedDates) && selectedDates.start && !selectedDates.end) {
      setHoverDate(date);
    }
  };

  const handleMouseLeave = (): void => {
    setHoverDate(null);
  };

  const fetchHolidays = async (year: number) => {
    if (year < 1975) {
      console.warn("Holidays data is only supported from the year 1975 onwards.");
      return;
    }
    try {
      const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/JP`);
      const data = await response.json();
      const holidayMap: Record<string, string> = {};
      data.forEach((holiday: { date: string; localName: string }) => {
        holidayMap[holiday.date] = holiday.localName;
      });
      setHolidays(holidayMap);
    } catch (error) {
      console.error("Failed to fetch holidays:", error);
    }
  };

  useEffect(() => {
    if (mode === "single" && value && typeof value !== 'string') {
      console.error("Invalid value prop for single mode. Expected string.");
    } else if (mode === "multiple" && value && !Array.isArray(value)) {
      console.error("Invalid value prop for multiple mode. Expected string[].");
    } else if (mode === "range" && value && (typeof value !== "object" || !("start" in value) || !("end" in value))) {
      console.error("Invalid value prop for range mode. Expected { start: string | null; end: string | null }.");
    }
  }, [mode, value]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    if (year !== currentYear) {
      setCurrentYear(year);
      fetchHolidays(year);
    }
  }, [currentDate, currentYear]);

  useEffect(() => {
    const parsed = parseDate(value);
    setSelectedDates(parsed);

    if (typeof parsed === 'string') {
      setCurrentDate(dayjs(parsed).toDate());
    } else if (Array.isArray(parsed) && parsed.length > 0) {
      setCurrentDate(dayjs(parsed[0]).toDate());
    } else if (parsed && 'start' in parsed && parsed.start) {
      setCurrentDate(dayjs(parsed.start).toDate());
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedDates(value); // Reset to initial value when clicking outside
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value]);

  useEffect(() => {
    if (isOpen && selectedDates) {
      if (typeof selectedDates === 'string') {
        setCurrentDate(dayjs(selectedDates).toDate());
      } else if (Array.isArray(selectedDates) && selectedDates.length > 0) {
        setCurrentDate(dayjs(selectedDates[0]).toDate());
      } else if (isDateRange(selectedDates) && selectedDates.start) {
        setCurrentDate(dayjs(selectedDates.start).toDate());
      }
    }
  }, [isOpen, selectedDates]);

  const getWesternYear = (era: string, year: number) => {
    var tgt = eras[era];
    if (tgt == undefined) return year;

    // Check if the year is within the allowed range
    if (year < tgt.start) {
      year = tgt.start;  // If less than start, use start
    } else if (year > tgt.end) {
      year = tgt.end;    // If greater than end, use end
    }

    return year + tgt.base;
  };

  const getEraYear = (era: string, year: number) => {
    var tgt = eras[era];
    if (tgt == undefined) return year;

    const eraYear = year - tgt.base;

    // Check if the eraYear is within the allowed range
    if (eraYear < tgt.start) {
      return tgt.start;  // If less than start, use start 
    } else if (eraYear > tgt.end) {
      return tgt.end;    // If greater than end, use end
    }

    return eraYear;
  };

  const handleDateClick = (date: Date): void => {
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dateString = dayjs(localDate).format('YYYY-MM-DD');

    if (mode === "single") {
      setSelectedDates((prevDate) =>
        typeof prevDate === 'string' && dateString === prevDate ? null : dateString
      );
    } else if (mode === "multiple") {
      setSelectedDates((prevDates) =>
        Array.isArray(prevDates)
          ? prevDates.includes(dateString)
            ? prevDates.filter((d) => d !== dateString)
            : [...prevDates, dateString]
          : [dateString]
      );
    } else if (mode === "range") {
      setSelectedDates((prevRange) => {
        if (isDateRange(prevRange)) {
          if (!prevRange.start) {
            return { start: dateString, end: null };
          } else if (!prevRange.end) {
            return dayjs(localDate).isBefore(dayjs(prevRange.start))
              ? { start: dateString, end: prevRange.start }
              : { ...prevRange, end: dateString };
          } else {
            return { start: dateString, end: null };
          }
        }
        return { start: dateString, end: null };
      });
    }
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const event = createChangeEvent(selectedDates);
    onChange(event);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setSelectedDates(null);
    const event = createChangeEvent(null);
    onChange(event);
    setIsOpen(false);
  };

  /**
   * Handles the cancel action for the calendar picker.
   * Resets the selected dates to their initial value and closes the picker.
   */
  const handleCancel = (): void => {
    setSelectedDates(value);
    setIsOpen(false);
  };

  const formatInputValue = (): string => {
    if (mode === "single") {
      const dateStr = selectedDates as string | null;
      return dateStr && dayjs(dateStr).isValid() ? dayjs(dateStr).format(format) : '';
    } else if (mode === "multiple") {
      const dates = (selectedDates as string[] | null) || [];
      return dates.map(d => dayjs(d).format(format)).join(", ");
    } else if (mode === "range") {
      if (selectedDates && typeof selectedDates === "object" && "start" in selectedDates && "end" in selectedDates) {
        const { start, end } = selectedDates;
        if (start && end) {
          return `${dayjs(start).format(format)} - ${dayjs(end).format(format)}`;
        } else if (start) {
          return dayjs(start).format(format);
        }
      }
    }
    return "";
  };

  const getPlaceholder = (): string => {

    if (typeof placeholder === "string") {
      return placeholder;
    }

    return "";
  };

  const isDateRange = (dates: any): dates is { start: string | null; end: string | null } => {
    return dates && typeof dates === "object" && "start" in dates && "end" in dates;
  };


  /**
   * Renders the calendar days for the current month, including days from the previous and next months.
   *
   * @returns {JSX.Element[]} An array of JSX elements representing the days of the calendar.
   *
   * The calendar includes:
   * - Days from the previous month, displayed as disabled.
   * - Days from the current month, with various states such as today, selected, range start/end, in range, hover range, and weekend.
   * - Days from the next month, displayed as disabled.
   *
   * Each day element includes:
   * - A click handler to select the date.
   * - Mouse over and leave handlers for hover effects.
   * - A tooltip for holidays.
   */
  const renderCalendar = (): JSX.Element[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: JSX.Element[] = [];



    // If YM mode, only show month selector
    if (viewMode === "month") {
      const months: JSX.Element[] = [];
      for (let month = 0; month < 12; month++) {
        const date = new Date(currentDate.getFullYear(), month, 1);
        const isToday = date.getMonth() === new Date().getMonth();

        const isSelected = mode === "single"
          ? selectedDates === dayjs(date).format('YYYY-MM-DD')
          : Array.isArray(selectedDates) && selectedDates.includes(dayjs(date).format('YYYY-MM-DD'));

        const rangeStart = mode === "range" &&
          isDateRange(selectedDates) &&
          selectedDates.start &&
          dayjs(date).isSame(dayjs(selectedDates.start), 'month');

        const rangeEnd = mode === "range" &&
          isDateRange(selectedDates) &&
          selectedDates.end &&
          dayjs(date).isSame(dayjs(selectedDates.end), 'month');

        const inRange = mode === "range" &&
          isDateRange(selectedDates) &&
          selectedDates.start &&
          selectedDates.end &&
          dayjs(date).isSameOrAfter(dayjs(selectedDates.start).startOf('month')) &&
          dayjs(date).isSameOrBefore(dayjs(selectedDates.end).startOf('month'));

        const inHoverRange = mode === "range" &&
          hoverDate &&
          selectedDates &&
          isDateRange(selectedDates) &&
          selectedDates.start &&
          ((dayjs(date).isSameOrAfter(dayjs(selectedDates.start).startOf('month')) &&
            dayjs(date).isSameOrBefore(dayjs(hoverDate).startOf('month'))) ||
            (dayjs(date).isSameOrBefore(dayjs(selectedDates.start).startOf('month')) &&
              dayjs(date).isSameOrAfter(dayjs(hoverDate).startOf('month'))));

        const className = ("jpcalendar-month "
          + (isToday ? "today " : "")
          + (isSelected ? "selected " : "")
          + (rangeStart ? "range-start " : "")
          + (rangeEnd ? "range-end " : "")
          + (inRange ? "in-range " : "")
          + (inHoverRange ? "range-hover " : "")).trim();

        months.push(
          <div
            key={month}
            className={className}
            onClick={() => handleDateClick(date)}
            onMouseOver={() => handleMouseOver(date)}
            onMouseLeave={handleMouseLeave}
          >
            {`${month + 1}月`}
          </div>
        );
      }
      return months;
    }


    // Display days from the previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(year, month - 1, day);
      const isWeekend = [0, 6].includes(date.getDay());

      days.push(
        <div
          key={`prev-${day}`}
          className={`jpcalendar-day disabled ${isWeekend ? "weekend" : ""}`}
        >
          <div>{day}</div>
        </div>
      );
    }

    // Display days from the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = formatDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = mode === "single"
        ? selectedDates === dateString
        : Array.isArray(selectedDates) && selectedDates.includes(dateString);

      const holidayName = holidays[dateString];

      const rangeStart = mode === "range" &&
        isDateRange(selectedDates) &&
        selectedDates.start &&
        dateString === selectedDates.start;

      const rangeEnd = mode === "range" &&
        isDateRange(selectedDates) &&
        selectedDates.end &&
        dateString === selectedDates.end;

      const inRange = mode === "range" &&
        isDateRange(selectedDates) &&
        selectedDates.start &&
        selectedDates.end &&
        dayjs(dateString).isSameOrAfter(dayjs(selectedDates.start)) &&
        dayjs(dateString).isSameOrBefore(dayjs(selectedDates.end));

      const inHoverRange = mode === "range" &&
        hoverDate &&
        selectedDates &&
        isDateRange(selectedDates) &&
        selectedDates.start &&
        ((dayjs(dateString).isSameOrAfter(dayjs(selectedDates.start)) &&
          dayjs(dateString).isSameOrBefore(dayjs(hoverDate))) ||
          (dayjs(dateString).isSameOrBefore(dayjs(selectedDates.start)) &&
            dayjs(dateString).isSameOrAfter(dayjs(hoverDate))));

      const isWeekend = [0, 6].includes(date.getDay());

      const className = ("jpcalendar-day"
        + (isToday ? " today" : "")
        + (isSelected ? " selected" : "")
        + (rangeStart ? " range-start" : "")
        + (rangeEnd ? " range-end" : "")
        + (inRange ? " in-range" : "")
        + (inHoverRange ? " range-hover" : "")
        + (isWeekend ? " weekend" : "")).trim();

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => handleDateClick(date)}
          onMouseOver={() => handleMouseOver(date)}
          onMouseLeave={handleMouseLeave}
        >
          <div>{day}</div>
          {holidayName && (
            <div className="jpcalendar-tooltip">
              <span className="jpcalendar-dot"></span>
              <div className="jpcalendar-tooltiptext">{holidayName}</div>
            </div>
          )}
        </div>
      );
    }

    // Display days from the next month
    const remainingDays = 42 - (firstDayOfMonth + daysInMonth);
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      const isWeekend = [0, 6].includes(date.getDay());

      days.push(
        <div
          key={`next-${i}`}
          className={`jpcalendar-day disabled ${isWeekend ? "weekend" : ""}`}
        >
          <div>{i}</div>
        </div>
      );
    }

    return days;
  };

  const buttonStyle = "px-5 !p-0 h-8 py-2.5 !px-[5px] font-medium bg-gray-50 hover:bg-white hover:shadow-sm text-gray-600 rounded-lg text-sm border border-gray-200";
  const selectStyle = "px-4 !p-0 h-8 py-2 !px-[10px] bg-gray-50 hover:bg-white hover:shadow-sm text-gray-600 rounded-lg text-sm border border-gray-200";
  const monthButtonStyle = "w-5 !p-0 h-8 flex justify-center items-center font-medium bg-gray-50 hover:bg-white hover:shadow-sm text-gray-600 rounded-lg text-sm !border-gray-200 !border";
  const renderHeader = (): JSX.Element => {
    return (
      <div className="jpcalendar-header">
        <h2>{`${currentDate.getFullYear()}年${(currentDate.getMonth() + 1).toString().padStart(2, '0')}月`}</h2>
        <div className="flex items-center flex-nowrap">
          <button
            id="today-btn"
            type="button"
            className={buttonStyle}
            onClick={() => setCurrentDate(new Date())}
          >
            今日
          </button>
          <select
            hidden={type === "W"}
            className={selectStyle}
            value={era}
            onChange={(e) => {
              const newEra = e.target.value;
              setEra(newEra);
              const currentWesternYear = currentDate.getFullYear();
              const newEraYear = getEraYear(newEra, currentWesternYear);
              const newWesternYear = getWesternYear(newEra, newEraYear);
              setCurrentDate(new Date(currentDate.setFullYear(newWesternYear)));
            }}
          >
            {Object.keys(eras).map((e) => (
              <option key={e} value={e}>{eras[e].name}</option>
            ))}
          </select>
          <select
            className={selectStyle}
            value={getEraYear(era, currentDate.getFullYear())}
            onChange={(e) => {
              const selectedYear = Number(e.target.value);
              if (era === "western") {
                setCurrentDate(new Date(currentDate.setFullYear(selectedYear)));
              } else {
                const westernYear = getWesternYear(era, selectedYear);
                setCurrentDate(new Date(currentDate.setFullYear(westernYear)));
              }
            }}
          >
            {Array.from({ length: eras[era].end - eras[era].start + 1 }, (_, i) => eras[era].start + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <div className="flex items-center">
            <button
              type="button"
              style={{ display: viewMode === "month" ? "none" : "flex" }}
              className={monthButtonStyle}
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <select
              hidden={viewMode === "month"}
              className={selectStyle}
              value={currentDate.getMonth()}
              onChange={(e) => {
                const selectedMonth = Number(e.target.value);
                setCurrentDate(new Date(currentDate.setMonth(selectedMonth)));
              }}
            >
              {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                <option key={month} value={month}>
                  {month + 1}月
                </option>
              ))}
            </select>
            <button
              style={{ display: viewMode === "month" ? "none" : "flex" }}
              type="button"
              className={monthButtonStyle}
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>
        <CalendarPickerCss />
      </style>
      <div ref={ref} className={`jpcalendar ${className || ""}`}>
        <div ref={inputRef}
          className={`flex border rounded items-center gap-2 px-4 cursor-pointer hover:bg-gray-50 h-10 ${inputClassName || ""} ${disabled ? 'pointer-events-none opacity-50' : 'pointer-events-auto'}`}
          onClick={() => {
            if (!disabled) {
                setIsOpen(true);
            }
          }}
        >
          <input
            name={name}
            type="text"
            value={formatInputValue()}
            readOnly
            className={`flex-1 border-0 focus:ring-0 outline-none cursor-pointer`}
            placeholder={getPlaceholder()}
          />
          <svg
            className="w-5 h-5 cursor-pointer"
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 5h18v5H3z" fill="#000000" />
            <path
              d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && ReactDOM.createPortal(
          <div className="jpcalendar-popup" ref={popupRef} style={{
            position: "fixed",
            pointerEvents: "auto",
            top: `${popupPosition?.top}px`,
            left: `${popupPosition?.left}px`,
          }}>
            {renderHeader()}
            <div className="jpcalendar-body day-names">
              {dayNames.map((dayName) => (
                <div hidden={viewMode === "month"} key={dayName}>{dayName}</div>
              ))}
            </div>
            <div className={`jpcalendar-body ${viewMode === "month" ? "months" : "days"}`}>
              {renderCalendar()}
            </div>
            <div className="jpcalendar-footer">
              <button className="clear-btn" onClick={(e) => handleClear(e)}>クリア</button>
              <button className="cancel-btn" onClick={(e) => handleCancel()}>キャンセル</button>
              <button className="submit-btn" onClick={(e) => handleSubmit(e)}>OK</button>
            </div>
          </div>,
          document.getElementById('root') || document.body
        )}
      </div>
    </>
  );
});

export default DatePicker;