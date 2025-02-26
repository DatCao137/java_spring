import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function DailyRecorderCss() {
    return (
        <>
            <CommonCss />
            {`
            
            .daily-table table,
            .daily-table th,
            .daily-table td {
                border: 1px solid #E6E6E6;
                border-top: none;
                border-collapse: separate;
            }

            .daily-table td {
                padding: 0px;
            }


            .daily-table td div{
                margin: 0px;
            }
            
            .daily-table .select-line {
                background: none !important;
                background-color: transparent !important;
            }

            #daily-recorder-calendar input {
                text-align: center;
                font-size: 120%;
                font-weight: bold;
            }

            #daily-recorder-calendar svg {
                font-size: 120%;
            }
            `}
        </>
    )
}

export { DailyRecorderCss }