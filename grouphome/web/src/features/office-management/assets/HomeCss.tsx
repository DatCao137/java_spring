import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function HomeCss() {
    return (
<>
<CommonCss />
{`
.box .flex-field .item-line:nth-of-type(2) {
    grid-template-columns: 60px 1fr;
}

.custom-label-input {
    color: rgb(103 103 103);
}

.unit-info-container {
    padding: 20px;
    background-color: #fff;
}

.unit-action-button {
    margin-top: 5px;
    float: right;
}
`}
</>
        )
}

export { HomeCss }
