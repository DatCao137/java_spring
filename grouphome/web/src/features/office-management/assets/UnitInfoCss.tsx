import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function UnitInfoCss() {
    return (
    <>
        <CommonCss />
        {`
            #unitInfo .alignRight {
                text-align: right;
            }
            #unitInfo .unitList tbody,
            #unitInfo .roomList tbody {
                height: 120px;
                table-layout: fixed;
                display: block;
                overflow-y: auto;
                overflow-x: hidden;
            }

            #unitInfo .unitList thead,
            #unitInfo .unitList tbody tr,
            #unitInfo .roomList thead,
            #unitInfo .roomList tbody tr {
                display: table;
                width: 100%;
                table-layout: fixed;
            }

            #unitInfo .unitDetail {
                display: flex;
            }
            #unitInfo .unitDetail .person-line {
                display: grid;
                grid-template-columns: 180px 320px;
            }
            #unitInfo .structureInfo .person-line {
                display: grid;
                grid-template-columns: 200px auto;
            }
            #unitInfo .unitList .pagination-footer,
            #unitInfo .roomList .pagination-footer {
                display: none;
            }

            #calcTableTable table thead th:has(.type-calc-header) {
                width: 10%;
            }

            #calcTableTable table thead th:has(.name-calc-header) {
                width: 25%;
            }

            #calcTableTable table thead th:has(.startDate-calc-header) {
                width: 15%;
            }
                
            #calcTableTable table thead th:has(.notice-date-calc-header) {
                width: 15%;
            }

            #calcTableTable table thead th:has(.period-calc-header) {
                width: 15%;
            }

            #calcTableTable table thead th:has(.comment-calc-header) {
                width: 25%;
            }

            .calc-radio label {
                width: 30%;
            }

            .calc-container{
                overflow-y: auto;
                height: 60vh; 
            }

            .calc-container {
                overflow-x: auto;
                width: 100%;
                max-width: 100%; 
            }

            .calc-container table {
                width: 100%; 
                min-width: 1300px; 
            }

            .calc-range-date {
                width: 47%;
            }
                
            .calc-range-key {
                width: 5%;
                text-align: center;
                font-size: 20px;
            }

            .calc-container-date {
                word-break: break-all;
            }

            .calc-container-date input {
                padding-left: 5px !important;
            }

            .calc-table-type {
                width: 5%;
            }

            .calc-table-name {
                width: 250px;          
            }

            .calc-table-select {
                width: 10%;
            }

            .calc-table-date {
                width: 11%;
            }

            .calc-table-period {
               width: 23%;
            }

            .calc-table-remark {
                width: auto;
            }

            .option-column label {
                font-size: 16px;
                color: #020817;
            }

            .calc-container table {
                width: 100%; 
                min-width: 1300px; 
                min-width: 1430px; 
            }

            .custom-datepicker {
                width: 100% !important;    
            }

            .custom-datepicker div {
                height: 25px;
                width: 100%;
            }

            .custom-datepicker-calc div {
                padding-left: 0rem;
                padding-right: 0rem;
            }
        `}
    </>
    )
}

export { UnitInfoCss }
