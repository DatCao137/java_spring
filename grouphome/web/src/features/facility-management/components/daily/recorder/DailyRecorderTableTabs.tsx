import { CallBackSelect } from "@/components/elements/Common";
import { CommonTabs, TabItem } from "@/components/elements/CommonTabs";
import UserSpecificTable from "../common/UserSpecificTable";
import { Post } from "@/features/blc-common/utils/ServerRequest";
import { DailyUnitList } from "@/features/blc-common/assets/ApiPath";
import { useEffect, useState } from "react";
import { DailyDetailUnitResponseDto } from "@/features/facility-management/types/Daily";

type ArgsData = {
    cbSelect: CallBackSelect;
    seq: number;
    homeId: number;
    className?: string;
    yyyymmdd: string;
};

export const DailyRecorderTableTabs = ({ cbSelect, seq, className, homeId, yyyymmdd }: ArgsData) => {
    const [tabUnitLists, setTabUnitLists] = useState<DailyDetailUnitResponseDto[]>([]);
    const [tabs, setTabs] = useState<TabItem[]>([]);
    const [defaultTab, setDefaultTab] = useState<string>('');

    useEffect(() => {
        const getListUnits = async () => {
            await Post({
                apiPath: DailyUnitList,
                params: { homeId: homeId, homeDate: yyyymmdd },
                onSuccess: (res) => {
                    const dataUnits = res.data.data.listUnits;
                    const listUnits: DailyDetailUnitResponseDto[] = dataUnits.map((item: any, index: number) => {
                        return {
                            id: index + 1,
                            unitId: item[0],
                            unitName: item[1],
                        }
                    });
                    listUnits.length && setDefaultTab(listUnits[0]?.unitId?.toString() || '');
                    setTabUnitLists(listUnits);
                }
            });
        }
        if (homeId && yyyymmdd)
            getListUnits();
    }, [homeId, yyyymmdd])

    useEffect(() => {
        const tabsValue: TabItem[] = tabUnitLists?.map((item) => {
            return {
                label: <b>{item.unitName}</b>,
                value: item.unitId?.toString() ?? '',
                content: <UserSpecificTable cbSelect={cbSelect} seq={seq} type={1} unit={item.unitId} date={yyyymmdd} />,
            }
        });
        setTabs(tabsValue);
    }, [tabUnitLists]);

    return (
        <>
            <CommonTabs tabs={tabs} defaultValue={defaultTab} className={`${className}`} headerClassName="pl-20 pr-20 shadow-lg text-white bg-[#8db909] shadow-gray-400" />
        </>
    );
}
