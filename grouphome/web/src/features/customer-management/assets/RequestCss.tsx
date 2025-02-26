import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function RequestCss() {
    return (
<>
<CommonCss />
{`
.box-cond {
	display: grid;
	grid-template-columns: auto 100px;
}

.representative-call-header-col {
    
}

.desiredDate-container {
    justify-items: center;
    display: contents;
}

.desiredDate-datepicker input{
    width: 0px !important;
}
`}
</>
        )
}

export { RequestCss }