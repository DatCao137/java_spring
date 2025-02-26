import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function StaffCss() {
    return (
<>
<CommonCss />
{`
#staffCond {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;
}

.bl_searchTitle {
    padding-bottom: 0.5em;
    font-size: 1.125em;
}

#staffDetail:has(.box) {
    padding: 20px;
    background-color: #fff;
}

.box_basicInfo {
    padding: 0.25em 0 0.5em;
    font-weight: bold;
}

.flex-fieldSearch {
    gap: 20px;
    & select {
        margin-right: 20px;
    }
}

.bl_searchBtn {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    & button {
        width: 120px;
        background-color: #EE887A;
        font-size: 1em;
    }
}

.box-cond {
    display: grid;
    grid-template-columns: auto 100px;
}

.info-line {
    display: grid;
    grid-template-columns: 260px 1fr;
}

.card-title div {
    width: 180px;
}

.card div {
    width: 100px;
}

.training-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.staff-manage-cond {
    display: flex;
    align-items: center;
}

.input-group {
    display: flex;
    gap: 20px;
    align-items: center;
    flex: 1;
}

.input-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.input-item label {
    font-size: 15px;
    color: rgb(103 103 103)
}

.input {
    border: 1px solid #ccc;
    border-radius: 5px;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
}

.button-group button {
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 3px;
    background-color: #333;
    color: white;
    cursor: pointer;
}

.button-group button:hover {
    background-color: #555;
}


/* Detail screen */

.staff-detail-container {

}

.staff-detail-section {
    margin-top: 5px !important;
}

.label {
    font-weight: bold;
    text-align: left;
    align-self: start;
}

.content {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

pre {
    white-space: pre-wrap;
}

/* Create or Edit Popup */

.label-item{
  color: rgb(103 103 103);
  margin-right: 5px;
  font-size: 12px;
}

.box-title {
    white-space: nowrap;
}

.text-aria {
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

`}
</>
        )
}

export { StaffCss }
