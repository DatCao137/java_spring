import * as React from 'react'

function TableCss() {
    return (
        <>
            {`
.bl_tableWrapper {
    border: 1px solid #E6E6E6;
    border-radius: 6px;
}

table {
    width: 100%;
    table-layout: fixed;
    border-spacing: 0;
    background-color: #fff;
    border-collapse: separate;
}

thead {
    position: sticky;
    top: 0;
    z-index: 10;
    text-align: center;
    white-space: nowrap;

    position: sticky;
    z-index: 30;
    top: 0;
}

th,
td {
    padding: 10px;
    border-bottom: 1px solid #E6E6E6;
    line-height: 1.25;
    &:last-child {
        border-right: none;
    }
}

th {
    border: 1px solid #E6E6E6;
    background-color: #EFEFEF;
    white-space: normal;
    word-wrap: break-word;        
}

table tbody tr:last-child td {
    border-bottom: none;
}

.alignCenter {
    text-align: center;
}

.select-line {
    background-color: #FFE2DC;
}

.custom-select-react {
    min-height: 25px;
    max-height: 25px;
    height: 25px;
    .css-13cymwt-control {
        border: 0.5px solid #aeaeae;
        border-radius: 5px;
        font-size: 14px;
        color: rgb(46, 46, 46); 
        background-color: white; 
        min-height: 25px;
        max-height: 25px;
        height: 25px;

        .css-hlgwow {
            padding: 0px 5px;
            min-height: 25px;
            max-height: 25px;
            height: 25px;
            display: block;
        }

        .css-1wy0on6 {
            min-height: 25px;
            max-height: 25px;
            height: 25px;
            .css-1xc3v61-indicatorContainer {
                padding: 4px;
            }
        }

        .css-1dyz3mf {
            padding: 0px 8px;
            min-height: 25px;
            max-height: 25px;
            height: 25px;

            .css-1p3m7a8-multiValue {
                height: 20px;
                margin-bottom: 7px;
                .css-9jq23d {
                    padding: 1px 3px 3px 6px;
                }
            }
        }

        &:hover,
        &:focus {
            border-color: #409eff;
            outline: none; 
        }
    }

    .css-t3ipsp-control {
        min-height: 25px;
        max-height: 25px;
        height: 25px;

        .css-hlgwow {
            padding: 0px 8px;
            min-height: 25px;
            max-height: 25px;
            height: 25px;

            &:hover,
            &:focus {
                border-color: #409eff;
                outline: none; 
            }
        }

        .css-1dyz3mf {
            padding: 0px 8px;
            min-height: 25px;
            max-height: 25px;
            height: 25px;

            .css-1p3m7a8-multiValue {
                height: 20px;
                margin-bottom: 7px;
                .css-9jq23d {
                    padding: 1px 3px 3px 6px;
                }
            }
        }

        .css-1wy0on6 {
            min-height: 25px;
            max-height: 25px;
            height: 25px;
            .css-1xc3v61-indicatorContainer {
                padding: 4px;
            }

            &:hover,
            &:focus {
                border-color: #409eff;
                outline: none; 
            }
        }

        &:hover,
        &:focus {
            border-color: #409eff;
            outline: none; 
        }
    }

    &:hover,
    &:focus {
        border-color: #409eff;
        outline: none; 
    }

    .css-1nmdiq5-menu {
        background-color: #e3e3e2;
        padding: 5px;
        position: absolute;
        z-index: 1000;

        .css-qr46ko {
            .css-d7l1ni-option {
                border-radius: 3px;
                background-color: #59a1ff;
                height: 22px;
                padding: 0px 0px 0px 15px !important;
                font-size: 14px;
                color: #f9f6f6;
                font-weight: 500;
            } 
            
            .css-10wo9uf-option {
                height: 22px;
                padding: 0px 0px 0px 15px !important;
                font-size: 14px;
                rgb(0 0 0);
                font-weight: 500;
            }
        }
    }
}
.enableRet {
    white-space:pre-line;
}
.pagination-info {
    display: flex;
}
.pagination-total-record {
    text-align: left;
    width: 50%;
    padding: 5px 0px 0px 20px;
}
.pagination-page-size-sl {
    display: flex;
    width: 50%;
    justify-content: flex-end;
    padding: 5px 20px 0px 0px;
}
.pagination-controls {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pagination-page {  
    min-width: 22px;
    margin: 2px 5px;
    padding: 0 5px;
    border-radius: 4px;
}
.pagination-page-active {
    min-width: 22px;
    margin: 2px 5px;
    padding: 0 5px;
    border: 1px solid gray;
    background-color: white;
    border-radius: 4px;
}
.pagination-step-button {
    margin: 0px 10px;
}
.pagination-text-total {
    margin-right: 20px;
}
.pagination-spam-3dot {
    margin: 2px;
}

.filter-dialog {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 10px;
    z-index: 1000;
    width: 280px; /* Custom width */
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0; /* Start as hidden */
    transform: translateY(-10px); /* Start slightly above */
}

.filter-dialog.show {
    opacity: 1; /* Show fully */
    transform: translateY(0); /* Reset position */
}

.filter-dialog::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    z-index: 1001; /* Ensure arrow is on top */
}

.filter-dialog[data-position="bottom"]::before {
    top: -10px; /* Move arrow up */
    left: 20px; /* Align horizontally */
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #ccc transparent;
}

.filter-dialog[data-position="bottom-left"]::before {
    top: -10px; /* Move arrow up */
    right: 20px; /* Align horizontally */
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #ccc transparent;
}

.filter-dialog[data-position="top"]::before {
    bottom: -10px;
    left: 20px;
    border-width: 10px 10px 0 10px;
    border-color: #fff transparent transparent transparent;
}

.filter-dialog[data-position="right"]::before {
    top: 20px;
    left: -10px;
    border-width: 10px 10px 10px 0;
    border-color: transparent #fff transparent transparent;
}

.filter-dialog[data-position="left"]::before {
    top: 20px;
    right: -10px;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent #fff;
}

.sort-icon, .sort-icon-sel {
    display: inline-block;
    transition: transform 0.3s ease, color 0.3s ease;
}

.sort-icon {
    transform: rotate(0deg);
    color: #ccc;
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 14px;
    pointer-events: none;
}

.sort-icon-sel {
    transform: rotate(180deg);
    position: absolute;
    color: #EE887A;
    bottom: 5px;
    right: 5px;
    font-size: 14px;
    pointer-events: none;
}

.hidden-arrow .arrow-icon {
  display: none;
}

thead, tbody tr td {
    word-wrap: break-word
}

.tableSection {
    max-height: 500px;
    overflow-y: auto;
}


`}
        </>
    )
}

export { TableCss }
