import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TableFilterSelect } from './TableFilterSelect';
import { TableFilterRange } from './TableFilterRange';
import { TableFilterInput } from './TableFilterInput';
import { TableFilterChoice } from './TableFilterChoice';
import { TableFilterDatepicker } from './TableFilterDatepicker';
import { TableFilterDateTimepicker } from './TableFilterDateTimepicker';
import { SelectItem } from '../Common';
import { CancelButton, ClearButton, Footer, Left, Right, OKButton, TableFilterCss } from './TableFilterCss';
import { TableFilterOptions } from './TableFilterOptions';
import { TableFilterYearMonthRange } from './TableFilterYearMonthRange';
import {TableFilterInputNumber} from "@/components/elements/tableFilter/TableFilterInputNumber";
import {TableFilterDateRange} from "@/components/elements/tableFilter/TableFilterDateRange";
import { formatJPDate } from '@/utils/DateUtils';
import { TableFilterCalendar } from './TableFilterCalendar';
import { TableFilterCalendarRange } from './TableFilterCalendarRange';
export interface FilterItem {
    name: string;
    type: 'text' | 'range' | 'select' | 'choice' | 'option' | 'date' | 'datetime' | 'month-range'| 'date-range'| 'number' | 'calendar' | 'calendar-range';
    val?: string | null;
    select?: string;
    choices?: SelectItem[];
    options?: SelectItem[];
    optionMultiple?: boolean;
    date?: string;
    datetime?: string;
    min?: number;
    format?: string;
    typeDate?: "W" | "J";
}
interface TableFilterProps {
    tgt: FilterItem | null;
    onChange: (key: string, val: string | null) => void;
    onClose: Dispatch<SetStateAction<void>>;
}

const TableFilter: React.FC<TableFilterProps> = ({ tgt, onChange, onClose }) => {
    if (tgt == null) {
        return (<></>);
    }

    const [val, setVal] = useState(tgt.val ?? ""); // Initialize state from tgt.val

    // Synchronize val when tgt.val changes
    useEffect(() => {
        setVal(tgt.val ?? ""); // Update value from props tgt.val
    }, [tgt.val]);

    const handleInput = (e: any) => {
        const { value, name } = e.target;
        setVal(value); // Update state val
    };

    let contents = (<></>);
    switch (tgt.type) {
        case 'text':
            contents = (<TableFilterInput value={val} handle={handleInput} />);
            break;
        case 'range':
            contents = (<TableFilterRange value={val} handle={handleInput} minRange={tgt.min} />);
            break;
        case 'select':
            if (tgt.select != null)
                contents = (<TableFilterSelect value={val} handle={handleInput} options={tgt.select} />);
            break;
        case 'choice':
            if (tgt.choices != null)
                contents = (<TableFilterChoice value={val} handle={handleInput} choices={tgt.choices} />);
            break;
        case 'option':
            if (tgt.options != null)
                contents = (<TableFilterOptions value={val} handle={handleInput} options={tgt.options} multiple={tgt.optionMultiple} />);
            break;
        case 'date':
            contents = (<TableFilterDatepicker value={val} handle={handleInput} />);
            break;
        case 'datetime':
            contents = (<TableFilterDateTimepicker value={val} handle={handleInput} />);
            break;
        case 'month-range':
            contents = (<TableFilterYearMonthRange value={val} handle={handleInput} />);
            break;
        case 'date-range':
            contents = (<TableFilterDateRange value={val} handle={handleInput} />);
            break;
        case 'number':
            contents = (<TableFilterInputNumber value={val} handle={handleInput} minNumber={tgt.min}/>);
            break;
        case 'calendar':
            contents = (<TableFilterCalendar value={val} handle={handleInput} format={tgt.format} typeDate={tgt.typeDate} />);
            break;
        case 'calendar-range':
            contents = (<TableFilterCalendarRange value={val} handle={handleInput} format={tgt.format} typeDate={tgt.typeDate} />);
            break;
    }

    const handleOK = (e: any) => {
        onChange(tgt.name, val); // Send new value to parent
        onClose(); // Close popup
    };

    const handleClose = (e: any) => {
        onClose(); // Close popup without changing value
    };

    const handleRelease = (e: any) => {
        onChange(tgt.name, null); // Set null value to parent
        onClose(); // Close popup
    };

    return (
        <>
            <style><TableFilterCss /></style>
            <div className="table-fillter-container">
                <div className="table-fillter-area">
                    {contents}
                    <Footer>
                        <Left>
                            <ClearButton onClick={handleRelease} children="解除" />
                        </Left>
                        <Right>
                            <CancelButton onClick={handleClose} children="キャンセル" />
                            <OKButton onClick={handleOK} children="OK" />
                        </Right>
                    </Footer>
                </div>
            </div>
        </>
    );
};

export { TableFilter };