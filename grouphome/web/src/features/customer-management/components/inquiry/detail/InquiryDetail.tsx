import { InquiryDetailInfo } from "./InquiryDetailInfo";
import { InquiryDetailTab } from "./InquiryDetailTabs";

type ArgsData = {
    tgtId: string|null
}

function InquiryDetail({tgtId}: ArgsData) {
    if(tgtId == null) {
        return (<></>);
    }
    return (
        <>
            <p className="inquiryDtail_subtitle">詳細詳細</p>
            <div id="inquiryDetailInfo"><InquiryDetailInfo tgtId={tgtId} /></div>
            <div id="inquiryDetailTab"><InquiryDetailTab tgtId={tgtId} /></div>
        </>
    )
}

export { InquiryDetail }
