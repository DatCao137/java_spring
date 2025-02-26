import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function InquiryCss() {
    return (
<>
<CommonCss />
{`
.box-cond {
	display: grid;
	grid-template-columns: auto 100px;
}
.detail-info-line {
    display: grid;
    grid-template-columns: 1fr 300px;
}

#inquiryDetail:has(.inquiryDtail_subtitle) {
    padding: 20px;
    background-color: #fff;
}

.inquiryDtail_subtitle {
    padding-bottom: 1em;
    font-size: 1.125em;
}

#inquiryTable table thead th:has(.no-header){
    width: 60px;
}


#inquiryTable table thead th:has(.sex-header) {
    width: 60px;
}

#inquiryTable table tbody tr td:nth-child(4) {
     width: 60px;
}

#inquiryTable table thead th:has(.age-header) {
    width: 60px;
}

#inquiryTable table thead th:has(.gana-header) {
    width: 12%;
}

#inquiryTable table thead th:has(.nextAction-header) {
    width: 18%;
}

#inquiryTable table thead th:has(.status-header) {
    
}

#inquiryTable table thead th:has(.inquirySrcLink-header) {
    
}

#inquiryDetailTable table thead th:has(.status-detail-header) {
    width: 22%;
}

#inquiryDetailTable table thead th:has(.home-detail-header) {
    width: 15%;
}

#inquiryDetailTable table thead th:has(.ghData-detail-header) {
    width: 13%;
}

#inquiryDetailTable table thead th:has(.date-detail-header) {
    width: 10%;
}

.panel-left{
    min-width: 30%;
}

.panel-right{
    max-width: 70%;
}

.introduce-type{
    text-align: right;
}

.box-style{
    margin-bottom: 1em;
}

.item-line:has(.inquiry-item3-info) {
     display: grid;
    grid-template-columns: 140px 1fr;
}

.item-line:has(.inquiry-item2-info) {
     display: grid;
    grid-template-columns: 70px 1fr;
}

.style-result{
    height: 135px;
}

.style-card{
    max-width: 450px;
    min-width: 450px;
}

.hearing-item-content{
    height: 30px;
}

.hearing-item-body{
    min-height: 130px; 
    max-height: 130px; 
    overflow-y: auto;
}

.box-doc-hearing{
    min-height: 125px;
}

.inquiryCustomerSalesInfo .tabGroup1 .item-line {
    grid-template-columns: 140px auto;
}

.salesFollowItem {
    width: 450px;
    flex-shrink: 0;
    height: 250px;
}

.salesFollowItem .footer .div-btn-right {
    margin-top: 5px;
}

.inquiry-radio {
    height: 48px;
}

.inquiry-detail-item {
    height: 385px;
}

.customerSalesFollowCreateOrEdit textarea {
    min-height: 120px;
}

button span {
    justify-content: center;
}

.inquiryCustomerSalesInfo .displayContents {
    white-space: pre-line;
    height: 120px;
    overflow-y: scroll;
}

.inquiryCustomerSalesInfo .box-style {
    margin-bottom: 3px;
}

.inquiry-cancel-button {
    width: 120px;
    background-color: #9e9c9c;
    font-size: 1em;
    margin-right: 5px;
}

.inquiry-save-button {
    width: 120px;
    background-color: #ee887a;
    font-size: 1em;
}

.box-style-sub {
    min-height: 55px;
}

.text-aria-hearing-contents{
    min-height: 120px;
    max-height: 120px; 
    overflow-y: auto;   
}

.box-hearing-result {
    min-height: 195px; 
    max-height: 195px; 
    overflow-y: auto;
}

.box-hearing-prospect, .box-hearing-remark {
    min-height: 75px; 
    max-height: 75px; 
    overflow-y: auto;
}

.text-aria-hearing-result {
    min-height: 120px; 
    max-height: 120px; 
    overflow-y: auto;
}

.text-aria-hearing-prospect, .text-aria-hearing-remark {
    min-height: 80px; 
    max-height: 80px; 
    overflow-y: auto;
}

.custom-datepicker {
    width: 100% !important;   
}

.custom-datepicker div {
    height: 25px;
    width: 100%;
}


`}
</>
        )
}

export { InquiryCss }