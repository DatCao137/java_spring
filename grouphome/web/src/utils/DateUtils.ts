import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import localeData from 'dayjs/plugin/localeData';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import weekday from 'dayjs/plugin/weekday'; 
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

export const jpFormatTemplate01 = 'YYYY年MM月DD日(dd曜日)';
export const jpFormatTemplate02 = 'YYYY年MM月DD日';
export const jpFormatTemplate03 = 'YYYY/MM/DD(dd)';
export const reiwaFormatTemplate01 = '年MM月DD日';

export const REIWA_START_YEAR = 2019;
export const ERA_REIWA = '令和';

export function formatJPDate(
  date: string | null | undefined,
  format: string = 'YYYY/MM/DD',
  isShowDay: boolean = false
): string {
  if (!date) return '';
  try {
    const jpDate = dayjs(date);
    const formattedDate = jpDate.format(format);
    if(isShowDay) {
      const dayOfWeek = jpDate.format('dd');
      return `${formattedDate || '' }(${dayOfWeek || ''})`;
    } else {
      return formattedDate
    }
  } catch (error) {
    console.log(error);
    return '';
  }
}

export function reiwaFormatDate(
  date: string | null,
  format: string = 'MM/DD',
): string {
  if (!date) return '';
  try {
    const year = dayjs(date).year();
    let reiwaYear: number | string = year - REIWA_START_YEAR + 1;
    if (reiwaYear == 1) reiwaYear = '元';

    const MD: string = dayjs(date).format(format);
    return `${ERA_REIWA}${reiwaYear}${MD}`;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export const getAge = (date: string | null) => {
  if (!date) return null;
  try {
    return dayjs().diff(dayjs(date), 'year');
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getJPDateWithTimezone = (
  date: Date | string | null,
  timezone: string = 'Asia/Tokyo',
) => {
  if (!date) return '';
  try {
    return dayjs(date).tz(timezone).format('YYYY-MM-DDTHH:mm:ss');
  } catch (error) {
    return '';
  }
};

export const convertToJapaneseEra = (input: Date | string | null | undefined): string => {
  if (!input) return '';
  const date = typeof input === 'string' ? new Date(input) : input;

  const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  try {
    return formatter.format(date);
  } catch (error: any) {
    console.log(error);
    return '';
  }
}
export const toJPDate = (date: any) => {
  return dayjs(date).format('YYYY年M月D日')
};

export const formatDateUTCToJST = (date: any) => {
  return dayjs.utc(date).tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm:ss");
};

export const countDiffDay = (date1: any, date2: any) => {
  let count = 0
  if (!date1 || date1 == null || !date2 || date2 == null) {
    return null;
  }
  count = dayjs(date1).diff(dayjs(date2), 'days')
  return count >= 0 ? count : null;
};

export const getDateNow = (format: string = 'YYYY-MM-DD') => {
  const date = dayjs();
  return date.format(format);
};
