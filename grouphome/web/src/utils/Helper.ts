import { SelectListResponseDto } from '@/features/customer-management/contexts/SelectListContext';
import { PostalAddress } from '@/features/office-management/validations/address';
import DOMPurify from 'dompurify';
import { z } from 'zod';

export const deepMerge = <T extends object>(
  defaultObj: T,
  overrideObj: Partial<T>,
): T => {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  return Object.keys(defaultObj).reduce((acc: any, key) => {
    const defaultValue = (defaultObj as any)[key];
    const overrideValue = (overrideObj as any)[key];

    if (Array.isArray(overrideValue) && Array.isArray(defaultValue)) {
      acc[key] = [...defaultValue, ...overrideValue];
    } else if (Array.isArray(overrideValue)) {
      acc[key] = overrideValue;
    } else if (isObject(defaultValue) && isObject(overrideValue)) {
      acc[key] = deepMerge(defaultValue, overrideValue);
    } else {
      acc[key] = overrideValue;
    }

    return acc;
  }, {} as T);
};

export const sanitizeHtml = (html: string, allowTags: string[] = [], allowAttributes: string[] = [], ...args: any) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowTags,
    ALLOWED_ATTR: allowAttributes,
    ...args
  });
};

export const convertNewLine2Br = (txt: string) => {
  if (!txt) return '';
  return txt.replace(/\n/g, '<br />');
}

type PrefType = {
  name: string;
  value: string;
}
export const getPrefByID = (prefectures: PrefType[], id: string): PrefType | undefined => {
  return prefectures.find((pref) => pref.value == id);
}

export const getAddress = (prefectures: PrefType[], address: z.infer<typeof PostalAddress>) => {
  const prefName = getPrefByID(prefectures, address?.prefId?.toString() || '')?.name || '';
  return `${prefName}${address?.city || ''}${address?.town || ''}`;
}

export const findNameByValue = (options: SelectListResponseDto[], value: string | null | undefined) => {
  if (!value) return '';
  return options.find((e) => e.value === value)?.name || '';
}

export const getUserAgent = (userAgent: string): string => {
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR") && !userAgent.includes("Brave")) {
    return 'chrome';
  }

  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return 'safari';
  }

  if (userAgent.includes("Firefox")) {
    return 'firefox';
  }

  if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
    return 'opera';
  }

  if (userAgent.includes("Edg")) {
    return 'edge';
  }

  if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
    return 'ie';
  }

  if (userAgent.includes("Brave")) {
    return 'brave';
  }

  if (userAgent.includes("UCBrowser")) {
    return 'ucbrowser';
  }

  return 'unknown-browser';
}

export const formatCurrency = (
  amount: number | null | undefined,
  currency: "JPY" | "VND" | "USD" = "JPY"
): string => {
  if (!amount) return '';

  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  };

  const formatter = new Intl.NumberFormat("ja-JP", options);
  
  try {
    return formatter.format(amount);
  } catch (error) {
    return '';
  }
}

export const convertBoolean2Value = (value: boolean | undefined | null, textTrue: string = '〇', textFalse: string = '✕') => {
  return value === true ? textTrue : (value === false ? textFalse : '');
}


export const formatCurrencyNumberWithDecimal = (
  value: string | null | undefined
): string => {
  if(value){
    const cleanedValue = value.replace(/,/g, '');
    const parts = cleanedValue.split('.');
    const integerPart = parts[0].replace(/\D/g, ''); 
    const decimalPart = parts[1] ? parts[1].replace(/\D/g, '').slice(0, 4) : '';

    let formattedValue = '';

    if (integerPart) {
      formattedValue = parseFloat(integerPart).toLocaleString('ja-JP');
    }

    if (decimalPart) {
      formattedValue += `.${decimalPart}`;
    }

    return '￥' + formattedValue;
  }

  return '';
}

export const changeTableStyle = (tableParentSelector: string) => {
  const main = document.querySelector('main') as HTMLElement;
  const mainContent = document.querySelector('main #main-contents') as HTMLElement;
  const table = document.querySelector(tableParentSelector) as HTMLElement;

  if (main && mainContent && table) {
    const style = getComputedStyle(main);
    const mainStyle = getComputedStyle(mainContent);

    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;

    const paddingLeftMain = parseFloat(mainStyle.paddingLeft) || 0;
    const paddingRightMain = parseFloat(mainStyle.paddingRight) || 0;

    mainContent.style.width = (main.clientWidth - paddingLeftMain - paddingRightMain) + 'px';
    const w = (+mainContent.style.width - paddingLeft - paddingRight) + 'px';
    table.style.width = w;
  }
}

export const addEventForLogoClickAndWindowResize = (tableParentSelector: string) => {
  const handleEvent = () => {
    setTimeout(() => {
      changeTableStyle(tableParentSelector);
    }, 100);
  };

  const asideLogo = document.querySelector('.bl_asideLogo');
  asideLogo?.addEventListener('click', handleEvent);
  window.addEventListener('resize', handleEvent);

  return () => {
    asideLogo?.removeEventListener('click', handleEvent);
    window.removeEventListener('resize', handleEvent);
  };
}