import { Dispatch, SetStateAction, useEffect } from 'react';
export const setValueNested = (sourceFormData: any, key: string, value: any) => {
    let current = sourceFormData;
    const keys = key.split('.');
    if( keys.length > 1 ) {
        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in current)) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return sourceFormData;
    } else {
        return { ...sourceFormData, [key]: value };
    }
}
export function setValue<T>(e: any, setFormData: Dispatch<SetStateAction<T>>): void {
    if (e && e.target) {
        let { id, value, type, name } = e.target;
        const key = id ? id : name as keyof T;
        if (type === 'checkbox') {
            setFormData(prevFormData => setValueNested(prevFormData, key, e.target.checked));
        } else if (type === 'radio') {
            setFormData(prevFormData => setValueNested(prevFormData, key, e.target.defaultValue));
        } else if (type === 'number') {
            setFormData(prevFormData => setValueNested(prevFormData, key, value ? Number(value) : null));
        } else {
            setFormData(prevFormData => setValueNested(prevFormData, key, value));
        }
    } else if (e && typeof e === 'object') {
        setFormData(prevFormData => ({
            ...prevFormData,
            ...e
        }));
    }
}

export function checkDataDifferent(oldFormData: any, newFormData: any) {
    if (Array.isArray(oldFormData) && Array.isArray(newFormData)) {
        if (oldFormData.length !== newFormData.length) {
            return true;
        }
        for (let i = 0; i < oldFormData.length; i++) {
            if (areObjectsEqual(oldFormData[i], newFormData[i])) {
                return true;
            }
        }
        return false;
    } else {
        return areObjectsEqual(oldFormData, newFormData);
    }
}

function areObjectsEqual(oldItem: any, newItem: any) {
    return JSON.stringify(oldItem) !== JSON.stringify(newItem);
}

export function compareDataDifferent(oldData: any, newData: any) {
    if (typeof oldData !== 'object' || typeof newData !== 'object' || oldData == null || newData == null) {
        if (oldData === '' || oldData == undefined) {
            oldData = null
        }
        if (newData === '' || newData == undefined) {
            newData = null
        }
        return oldData == newData;
    }

    const keys1 = Object.keys(oldData);
    const keys2 = Object.keys(newData);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !compareDataDifferent(oldData[key], newData[key])) {
            return false;
        }
    }

    return true;
}

export function closeX() {
    const useCustomHook = (callback: any) => {
        useEffect(() => {
            const el = document.querySelector("#btnCloseX");
            el?.addEventListener("click", callback);
            return () => {
                el?.removeEventListener("click", callback);
            };
        }, [callback]);
    };
    return useCustomHook;
}

export function handleFocusTab(direction: 'next' | 'prev') {
    // Get the list of all inputs in the form
    const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
    // Determine the currently focused field
    const currentIndex = Array.from(inputs).indexOf(document.activeElement as HTMLInputElement);

    if (currentIndex !== -1) {
        // Calculate the next or previous field
        const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        // Focus on the target field if it exists
        if (inputs[targetIndex]) {
            inputs[targetIndex].focus();
        }
    }
};