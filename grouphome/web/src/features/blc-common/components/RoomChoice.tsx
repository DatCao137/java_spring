import { useEffect, useState } from "react";
import { RoomChoiceCss } from "../assets/RoomChoiceCss";
import { CommonSelect } from "@/components/elements/common/CommonSelect";
import { setValue } from "@/components/elements/common/CommonUtils";
import { Post } from "../utils/ServerRequest";
import { Select as ApiPathSelect} from '@/features/blc-common/assets/ApiPath';
import { RoomMap } from "./RoomMap";

interface RoomChoiceProps {
    customerId: number;
    category: number|undefined;
}

type ChoiceData = {
    branch: number;
    home: number;
    targetMonth: string;
}
export const RoomChoice = ({
    customerId, category
}: RoomChoiceProps) => {
    const [ selBranch, setSelBranch ] = useState([]);
    const [ selHome, setSelHome ] = useState([]);
    const [ selData, setSelData ] = useState<ChoiceData>({ branch: 0, home: 0, targetMonth: '2024-12-11'});

    const handleInputChange = (e: any) => {
        setValue<ChoiceData>(e, setSelData);
    };

    const getSelectData = async () => {
        Post({
            apiPath: ApiPathSelect,
            params: { type: ['cust__branch', 'cust__home'] },
            onSuccess: (res) => {
                setSelBranch(res.data.cust__branch);
                setSelHome(res.data.cust__home);
            }
        });
    };
    const getHomeList = async() => {
        Post({
            apiPath: ApiPathSelect,
            params: { type: ['cust__home'], param: [{ key: 'cust__home', params: [{ name: 'branch_id', value: selData.branch }]}]},
            onSuccess: (res) => {
                setSelHome(res.data.cust__home);
            }
        })
    }

    useEffect(() => {
        getSelectData();
    }, []);
    useEffect(() => {
        getHomeList();
    }, [selData.branch])

    return (
        <>
            <style><RoomChoiceCss /></style>
            <form>
                <div className="box-container-form box-container-parent">
                    <span className="box-title font-bold">対象選択</span>
                    <CommonSelect id="branch" title="事業所" options={selBranch} value={selData.branch} onChange={handleInputChange} />
                    <CommonSelect id="home" title="ホーム" options={selHome} value={selData.home} onChange={handleInputChange} />
                </div>
                <div className="box-container-form box-container-parent">
                    <span className="box-title font-bold">居室情報</span>
                    <RoomMap branchId={selData.branch} homeId={selData.home} customerId={customerId} category={category} targetMonth={selData.targetMonth}/>
                </div>
            </form>
        </>
    );
}