import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function SupportPlanCss() {
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

.container-common input{
    border: 0;
}

.year-input input{
   text-align: right;
}

.year-input span span{
    width: 50%;
}

.container-common .calender-btn-custom{
    border: 0;
    width: 100%;
}

.user-request textarea,
.parent-request textarea,
.container-textarea textarea{
    max-height: 110px;
    min-height: 110px;
}

.desired-life textarea {
    max-height: 248px;
    min-height: 248px;
}

.sub-header span{
    font-size: 14px;
}

.sub-header {
    height: 42px;
}

.containner-form {
    // border: solid 1px #EE887A;
    overflow-x: auto;
    width: 100%;
    max-width: 100%; 
}

.form-custom {
    width: 100%; 
    min-width: 1270px; 
}

.support-plan-detail-tab-container {
    background-color: #fff;
}

.formMeeting .inputCalendar button {
    border: none;
}

`}
</>
        )
}

export { SupportPlanCss }