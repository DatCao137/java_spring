import { SupportPlanDetailTabs } from "./SupportPlanDetailTabs";

type ArgsData = {
    tgtId: string|null
}

function SupportPlanDetail({tgtId}: ArgsData) {
    if(tgtId == null) {
        return (<></>);
    }
    return (
        <>
            <div id="supportPlanDetailTab" className="p-4 support-plan-detail-tab-container"><SupportPlanDetailTabs tgtId={tgtId} /></div>
        </>
    )
}

export { SupportPlanDetail }
