export function CommonCss() {
    return (
<>
{`
.redBold {
    color:$FF0000;fontweight:bold;
}
.itemTitleLabel {
  color: rgb(103, 103, 103);
  margin-right: 5px;
  font-size: 12px;
}
.box {
    position: relative;
    margin-bottom: 0.5em;
    padding: 0.5em 1em;
    border: solid 3px #EE887A;
    border-radius: 8px;
    &:has(.box-title) {
        padding-top: 1em;
    }
}

.box .box-title {
    position: absolute;
    display: inline-block;
    top: -10px;
    left: 10px;
    padding: 0 9px;
    line-height: 1;
    font-size: 19px;
    background: #FFF;
    color: #EE887A;
    font-weight: bold;
}

.box p {
    margin: 0; 
    padding: 0;
}

.box .flex-field {
    align-items: flex-start;
    gap: 20px 60px;
}

.box-container-parent {
    &:has(.box-title) {
        padding-top: 1em;
    }
}

.box-container-form {
    position: relative;
    margin-bottom: 0.5em;
    margin-top: 1em;
    padding: 0.5em 1em;
    border: solid 1px #EE887A;
    border-radius: 5px;
}

.box-container-form .box-title {
    position: absolute;
    display: inline-block;
    top: -10px;
    left: 10px;
    padding: 0 9px;
    line-height: 1;
    font-size: 15px;
    background: #FFF;
    color: #EE887A;
}

.card-title {
    border:solid 1px #FFFFFF;
}

.card-title div {
    width: 120px;
    height: 24px;
    padding: 0px;
}

.cards {
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    width: 100%;
    height: 100%;
}

.card {
    padding: 0 10px;
    border-left: solid 1px #E9E9E9;
}

.card div {
    width: 250px;
    height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
}

.div-btn-right {
  text-align: right;
}

.btn-style {
    margin-bottom: 5px;
    margin-right: 5px;
}
.btn-style span {
    display: inline-flex;
}

.radio-button-group {
    gap: 10px;
}
.radio-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 3px 10px 5px;
    border-radius: 5px;
    background-color: #d2d2d2;
    color: #ffffff;
    transition: background-color 0.3s, color 0.3s;
}
.radio-button input {
    display: none;
    text-align: center
}
.radio-button-active {
    background-color: #EE887A;
    color: white;
}

.flex-field {
    display: flex;
}

.info-line {
    display: grid;
    grid-template-columns: 1fr 315px;
}
.info-row {
    display: grid;
    grid-template-rows: auto 1fr;
}

.item-line {
    display: grid;
    grid-template-columns: 125px 1fr;
}
.item-line p {
    text-align: left;
}

.sub-line {
    display: grid;
    grid-template-columns: 100px 32px 1fr;
}

.sub-line p {
    text-align: left;
}

.error-background {
    background-color: #ffafc9;
}

.error-message {
    color: #ff0000;
    font-size: 12px;
}

.unit-action-button-container {
    min-height: 50px;
}

.label-input-custom {
    color: rgb(103 103 103);
    font-size: 12px;
}

.text-aria-custom {
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

.check-box-label {
    color: rgb(103 103 103);
    margin-right: 10px;
}

.postNo1st {
    width: 3em;
}
.postNo2nd {
    width: 4em;
}
.pref {
    width: 6em;
}
.city {
    width: 11em;
}

.common-save-button {
    width: 120px;
    background-color: #ee887a;
    font-size: 1em;
}

.common-cancel-button {
    width: 120px;
    background-color: #9e9c9c;
    font-size: 1em;
    margin-right: 5px;
}

.filter-custom-datepicker {
  width: 100% !important;    
}

.filter-custom-datepicker div {
  height: 25px;
  width: 100%;
}
  
`}
</>);
}