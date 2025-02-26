import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function OfficeCss() {
    return (
        <>
            <CommonCss />
            {`
#officeDetail:has(.officeDtail_subtitle) {
    padding: 20px;
    background-color: #fff;
}

.officeDtail_subtitle {
    padding-bottom: 1em;
    font-size: 1.125em;
}

.calc-line {
}

.box .flex-field .item-line:nth-of-type(2) {
    grid-template-columns: 60px 1fr;
}

.memo-field {
    width: 95%;
    height: 95%;
}

.person-line {
    display: grid;
    grid-template-columns: 180px auto;
}

.person-line p {
    text-align: left;
    margin: 0;
}

.service-line {
    display: grid;
    grid-template-columns: 30% 15% 15% 10% 15%;
}

.custom-label-input {
    color: rgb(103 103 103);
}

.office-label {
    color: rgb(103 103 103);
    margin-right: 10px;
}

.office-label1 {
    color: rgb(103 103 103);
    font-size: 12px;
}

.office-text-aria {
    border: 0.5px solid #aeaeae;
    border-radius: 5px;
    height: 70px;
    padding: 10px;
    font-size: 14px;
    color: rgb(46 46 46);
    width: 100%;

    &:hover {
        border: 0.5px solid #409eff;
    }

    &:focus {
    border: 0.5px solid #409eff;
    }
}

.office-code-box{
    padding: 0px 20% 5px;
    background-color: #848484;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
    height: 35px;
    padding-top: 3px;
    text-align: center;
}

.dv-underline{
    height: 4px;
    width: 100%;
    background-color: #EE887A;
}

.dv-container-add-button-calc {
    display: flex;           
    justify-content: center; 
    align-items: center;   
}

.add-button-calc {
    display: flex;          
    align-items: center;    
    justify-content: center; 
    background-color: rgb(15, 23, 42);
    width: 80px;
    height: 25px;
    border-radius: 5px;
    color: #ffffff;
    &:hover {
        background-color: rgb(238, 136, 122);
    }
}

.width-col-del-calc {
    width: 40px;
}

.unit-action-button {
    margin-top: 5px;
    float: right;
}
#officeDetailInfo {
    margin-top: 30px;
}


`}
        </>
    )
}

export { OfficeCss }
