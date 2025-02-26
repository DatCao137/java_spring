import { CommonCss } from "@/features/blc-common/assets/CommonCss"

function DocManageCss() {
    return (
<>
<CommonCss />
{`
#docCond {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;
}

.bl_searchTitle {
    padding-bottom: 0.5em;
    font-size: 1.125em;
}

#docView:has(.box) {
    padding: 20px;
    background-color: #fff;
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

.bl_tableWrapper {
    border: 1px solid #E6E6E6;
    border-radius: 6px;
}

.button-area {
    text-align:right;
}
.w-100{
    width: 100px;
}
.w-150{
    width: 150px;
}

.hidden {
    display: none;
}

.history-list {
    margin-top: 10px;
    background-color: #f9f9f9;
}

.history-item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
}

.history-item:last-child {
    border-bottom: none;
}

.history-header{
    font-weight: 500;
}

.history-date {
    padding-left: 20px;
}

.history-comment {
    margin-top: 5px;
    padding-left: 20px;
}

.box-history{
    margin-left: 3px !important;
    margin-top: 0 !important;
    border: solid 3px hsl(var(--primary)) !important;
}

.history-item {
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.history-item:hover {
    background-color: hsl(10.29deg 100% 93.14%);
}

.box-doc-manage {
    padding: 0.5em 0.5em !important;
    border: none !important;
}

.doc-file-comment {
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

.header-history {
    background: #EFEFEF;
}

#docTableHistory {
    background: while;
}

.table-container {
    width: 100%;
    // overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead th {
    position: sticky;
    top: 0;
    z-index: 2;
  }
  
  tbody {
    display: block;
    max-height: 445px;
    overflow-y: auto;
  }
  
  tbody tr {
    display: table;
    table-layout: fixed;
  }
  
  thead, tbody tr {
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  .history-list {
    max-height: 500px;
    overflow-y: auto;
  }

`}
</>
        )
}

export { DocManageCss }
