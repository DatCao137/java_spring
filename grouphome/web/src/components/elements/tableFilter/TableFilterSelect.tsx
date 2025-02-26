import React, { useEffect, useState } from 'react';
import { Select as ApiPath } from '@/features/blc-common/assets/ApiPath';
import { SelectItem } from '../Common';
import { Post } from '@/features/blc-common/utils/ServerRequest';

interface TableFilterSelectProps {
    options: string;
    value: string;
    handle: (e: any) => void;
}

export const TableFilterSelect: React.FC<TableFilterSelectProps> = ({ options, value, handle }) => {
    const [selOptions, setSelOptions] = useState<SelectItem[]>([]);
    const [selected, setSelected] = useState<SelectItem[]>([]);

    const postSuccess = (res:any) => {
        const sel: SelectItem[] = res.data[options];
        const items: SelectItem[] = sel.filter((item) => item.name != "");
        setSelOptions(items);
        if (value == "") {
            setSelected(items.map(option => option));
        } else {
            let vals = value.split(',');
            setSelected(items.filter((option) => vals.includes(String(option.value))));
        }
    }
    const getSelectData = async () => {
        Post({
            apiPath: ApiPath,
            params: { type: [options] },
            onSuccess: postSuccess,
            errMessage: "絞り込み項目の取得に失敗しました。",
        });
    };
    useEffect(() => {
        getSelectData();
    }, []);

    const handleCheckboxChange = (value: SelectItem) => {
        setSelected(prevSelected =>
            prevSelected.includes(value)
                ? prevSelected.filter(item => item !== value)
                : [...prevSelected, value]
        );
    };
    useEffect(() => {
        let vals = selected.map((item) => { return String(item.value); });
        handle({ target: { value: vals.join(',') } });
    }, [selected]);

    return (
        <>
            {selOptions.map(option => (
                <label key={String(option.value)} style={{ display: 'block', marginTop: '5px' }}>
                    <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                    {option.name}
                </label>
            ))}
        </>
    );
}