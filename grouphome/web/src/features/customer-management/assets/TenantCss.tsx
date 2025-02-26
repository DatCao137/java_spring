import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function TenantCss() {
    return (
<>
<CommonCss />
{`
#tenant-management .bl_tableWrapper {
  overflow-x: auto;
  min-width: 500px !important;
}

#tenant-management table {
  min-width: 100% !important;
  width: auto !important;
}

#tenant-management table th {
  border: 1px solid #cccccc !important;
}

#tenant-management table td {
  border: 1px solid #d7d7d7 !important;
  border-collapse: collapse !important;
}

.custom-datepicker {
  width: 100% !important;    
}
.custom-datepicker div {
  height: 32px;
  width: 100%;
}
`}
</>
        )
}

export { TenantCss }