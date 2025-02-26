import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function DailyDetailCss() {
    return (
        <>
            <CommonCss />
            {`
                .style-panel-table {
                    padding-left: 10px;
                    padding-right: 10px;
                    padding-bottom: 10px;
                }
            `}
        </>
    )
}

export { DailyDetailCss }