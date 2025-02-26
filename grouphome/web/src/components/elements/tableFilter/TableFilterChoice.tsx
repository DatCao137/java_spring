import React, { useEffect, useState } from 'react';
import { SelectItem } from '../Common';
import { jsonParse } from '@/utils/JsonUtils';
import { BaseVals } from '../common/CommonTable';
import { Right } from './TableFilterCss';

interface TableFilterChoiceProps {
    choices: SelectItem[];
    value: string;
    handle: (e: any) => void;
}

export const TableFilterChoice: React.FC<TableFilterChoiceProps> = ({ choices, value, handle }) => {
    const [selected, setSelected] = useState<BaseVals>();

    useEffect(() => {
        let vals: BaseVals = {};
        if (value == "") {
            choices.map((item) => { vals[item.name] = "0" });
        } else {
            vals = jsonParse<{ [key: string]: string }>('TableFilterChoice', value, {});
        }
        setSelected(vals);
    }, []);

    const handleRadioChange = (name: string, value: string) => {
        setSelected({ ...selected, [name]: value });
    };
    useEffect(() => {
        handle({ target: { value: JSON.stringify(selected) } });
    }, [selected]);

    return (
        <>
            {choices.map(item => (
                <div key={item.value} className="grid grid-cols-5 items-center mb-1">
                    <span className="text-sm font-medium flex col-span-2">{item.value}</span>
                    <div className='col-span-3 flex text-sm'>
                        <div className="items-center">
                            <input
                                id={item.name + "Both"}
                                type="radio"
                                name={item.name}
                                className="radio-input"
                                checked={selected && selected[item.name] == "0"}
                                onChange={() => handleRadioChange(item.name, "0")}
                            />
                            <label htmlFor={item.name + "Both"}>両方</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id={item.name + "On"}
                                type="radio"
                                name={item.name}
                                className="radio-input"
                                checked={selected && selected[item.name] == "1"}
                                onChange={() => handleRadioChange(item.name, "1")}
                            />
                            <label htmlFor={item.name + "On"}>有</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id={item.name + "Off"}
                                type="radio"
                                name={item.name}
                                className="radio-input"
                                checked={selected && selected[item.name] == "2"}
                                onChange={() => handleRadioChange(item.name, "2")}
                            />
                            <label htmlFor={item.name + "Off"}>無</label>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}