import { useEffect, useState } from "react";
import { roomManageMaps as ApiPathMaps } from '@/features/blc-common/assets/ApiPath';
import { Popup } from '@/components/elements/Popup';
import { PopupConfirm } from '@/components/elements/PopupConfirm';
import { PopupConfirmParams } from '@/components/elements/Common';
import { Post } from "@/features/blc-common/utils/ServerRequest";
import { RoomCreateOrEdit, RoomForm } from "./RoomCreateOrEdit";

interface RoomMapProps {
    branchId: number;
    homeId: number;
    customerId: number;
    category: number|undefined;
    targetMonth: string;
}
interface Period {
    start: Date;
    end: Date;
    id?: number;
}
interface DataForm {
    roomId: number;
    roomName: string;
    unitId: number;
    unitName: string;
    period: string;
}

export const RoomMap = ({
    branchId, homeId, targetMonth, customerId, category
}: RoomMapProps) => {
    const [ period, setPeriod ] = useState<Period>();
    const [ mapData, setMapData ] = useState<DataForm[]>([]);
    const [ inputForm, setInputForm ] = useState<JSX.Element>(<></>);
    const [ isPopupOpen, setIsPopupOpen ] = useState<boolean>(false);
    const [ seq, setSeq ] = useState<number>(0);
    const [ confirmParam, setConfirmParam ] = useState<PopupConfirmParams>({
        isOpen: false,
        textConfirm: 'OK',
        message: '',
        isShowCancel: true,
        confirmAction: () => { },
        onClose: () => handleCloseConfirm()
      });

    const handleCloseConfirm = () => {
        setConfirmParam((prev: any) => ({
          ...prev,
          isOpen: false
        }));
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSeq(seq + 1);
    }
    
    const getDays = (start:Date, end:Date) => {
        return (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);
    }
    const addClick = (ele:any, roomId:number, unitId:number, targetDate:Date, tgtPeriod?:Period) => {
        let form:RoomForm = {
            id: tgtPeriod?.id,
            customerId: customerId,
            roomId: roomId,
            unitId: unitId,
            moveinAt: targetDate.toLocaleDateString('sv'),
            categoryId: category ?? 9
        };
        setInputForm(<RoomCreateOrEdit onClose={handleClosePopup} roomForm={form}/>);
        setIsPopupOpen(true);
    }

    const makePeriod = (period:Period):Date[] => {
        if(period.start == null)
            return [];
        let range = [];
        let days = getDays(period.start, period.end);
        let tgt = new Date(period.start);
        for(let i = 0; i <= days; i++) {
            range.push(new Date(tgt))
            tgt.setDate(tgt.getDate() + 1);
        }
        return range;
    }
    const makeHeader = (range:Date[]) => {
        return <>
            <div className="mapLine">
                <div className="mapItem">共同生活住居地名</div>
                <div className="mapItem">居室名</div>
                {range.map((day) => {
                    return (<div className="mapItem">{day.getDate()}</div>);
                })}
            </div>
            </>
    }
    const resolvData = (data: string, period: Period) => {
        if(!data)
            return [];
        let vals = data.split(',');
        return vals.filter((item) => {
            let range = item.split('/');
            return range[0] != '';
        }).map((item) => {
            let range = item.split('/');
            let startDate = period.start.toLocaleDateString('sv');
            let endDate = period.end.toLocaleDateString('sv');
            return { start: (range[0] < startDate ? new Date(startDate) : new Date(range[0]))
                 ,   end: (range[1] == '' || range[1] > endDate ? new Date(endDate) : new Date(range[1]))
                 ,   id: (!range[2]) ? null : Number(range[2]) } as Period;
        })
    }
    const createRow = (roomId:number, unitId:number, plan:Period[], range:Date[]) => {
        var ret = [];
        for(let i=0; i<range.length; i++) {
            let cls = "mapItem";
            let tgt:Period;
            for(let j=0; j<plan.length; j++) {
                if((range[i] >= plan[j].start)
                && (range[i] <= plan[j].end)) {
                    cls = "mapItem mapStay";
                    tgt = plan[j];
                }
            }
            ret.push((<div className={cls} onClick={(e) => addClick(e, roomId, unitId, range[i], tgt)} ></div>));
        }
        return ret;
    }

    const makeRow = (data:DataForm, period:Period, range:Date[]) => {
        const plan:Period[] = resolvData(data.period, period);
        return <>
            <div className="mapLine">
                <div className="mapItem">{data.unitName}</div>
                <div className="mapItem">{data.roomName}</div>
                {createRow(data.roomId, data.unitId, plan, range)}
            </div>
        </>
    }
    const createRows = (range:Date[], period:Period) => {
        return <>
            {mapData.map((row) => {
                return makeRow(row, period, range);
            })}
        </>
    }
    const createMap = () => {
        if(!period)
            return;
        let range = makePeriod(period);
        return (<>
            <div className="mapGrid">
                {makeHeader(range)}
                {createRows(range, period)}
                <div className="mapBottom"></div>
            </div>
            </>)
    }
    const getMapData = async () => {
        if(!homeId)
            return;
        Post({
            apiPath: ApiPathMaps,
            params: { homeId: homeId, baseDate: targetMonth},
            onSuccess: (res) => {
                let startDate = new Date(targetMonth);
                startDate.setDate(1);
                let endDate = new Date(targetMonth);
                endDate.setMonth(startDate.getMonth() + 1, 0);
                setPeriod({ start: startDate, end: endDate} )
                setMapData(res.data.data);
            }
        })
    }
    useEffect(() => {
        getMapData();
    }, [ homeId, targetMonth, seq ]);

    return (
        <>
        {(!branchId || !homeId) && (<div>事業所とホームを選択してください。</div>)}
        {!(!branchId || !homeId) && createMap() }
        <Popup
                  title="居室情報"
                  doText={""}
                  isOpen={isPopupOpen}
                  contents={inputForm}
                  hideFooter={true}
                  onClose={handleClosePopup}
                />
        
        <PopupConfirm param={confirmParam} />
        </>
    );
}