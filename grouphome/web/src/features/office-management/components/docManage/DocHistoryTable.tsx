
import {
    formatDateUTCToJST
  } from '@/utils/DateUtils';

import { useState } from 'react';

type props = {
    onHistorySelect?: any;
    data: { id: number; createdAt: string; comment: string }[];
  };

export const DocHistoryTable = ({onHistorySelect, data}: props) => {

    const [selectRowId, setSelectRowId] = useState(0);

    const cbClickRow = (id:Number, row: any, index: Number) => {
        setSelectRowId(row.id);
        onHistorySelect(id, row, index)
    };

    return (
<>
        <div className="history-list">
            {data.map((item, index) => (
                <div key={index} className={selectRowId == item.id ? 'history-item select-line' : 'history-item'}
                    onClick={() => cbClickRow(item.id, item, (index + 1))} >
                    <div className="history-header">
                        <span className="history-id">#{index + 1}</span>
                        <span className="history-date">{ formatDateUTCToJST(item.createdAt) }</span>
                    </div>
                    <div className="">
                        <span className="history-id"></span>
                        <span className="history-comment">{item.comment}</span>
                    </div>
                </div>
            ))}
        </div>
</>
    )
}
