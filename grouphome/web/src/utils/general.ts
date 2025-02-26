const tryParseToNumber = (value: unknown) => {
    if (value === '' || value === null || value === undefined) return null;

    if (typeof value === 'string' && /^[0-9]+$/.test(value)) {
        return parseInt(value, 10);
    }
    return value;
};

const tryCastEmptyToNull = (value: unknown) => {
    if (typeof value !== 'string') {
        return value;
    }
    return value === '' ? null : value;
};

const tryParseCurrencyToNumber = (value: unknown) => {
    if (value === '' || value === null || value === undefined) return null;

    value = value.toString().replace(/[￥,]/g, '');

    if (typeof value === 'string' && /^[0-9]+$/.test(value)) {
        return parseInt(value, 10);
    }
    return value;
};

const filterNumber = (s: string | null | undefined, reg: RegExp = /\D/g): string => {
    if (!s) return '';
    return s?.replace(reg, '');
}

const getUniqueValues = <T extends Record<string, any>>(array: T[], key: keyof T): Array<T[keyof T]> => {
    if (!Array.isArray(array) || !key) return [];
    return [...new Set(array.map(item => item[key]))];
};

export { tryParseToNumber, tryCastEmptyToNull, tryParseCurrencyToNumber, filterNumber, getUniqueValues };
