import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
} from '@tanstack/react-table';
import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

import { PageInfo, Pagination } from '../Pagination';
import { FilterItem, TableFilter } from '../tableFilter/TableFilter';
import { TableCss } from '../TableCss';
import { CallBackExchange, CallBackSelect } from '../Common';
import { Post } from '@/features/blc-common/utils/ServerRequest';
import debounce from 'debounce';
import { HTTP_STATUS_CODE } from '@/features/blc-common/HttpStatus';
import ErrorManager from '@/features/blc-common/utils/ErrorManager';

type Filter<T> = {
  vals: T;
  setter: Dispatch<SetStateAction<T>>;
  def: { [key: string]: FilterItem };
}
export type BaseVals = {
  [key: string]: string | null;
}

type ArgsData<T> = {
  column: ColumnDef<any, any>[];
  data: any[];
  path: string;
  seq: number | null;
  pager?: boolean;
  hidePage?: boolean;
  filter?: Filter<T> | null;
  body?: {};
  cbSelect?: CallBackSelect | null;
  cbExchangeData: CallBackExchange;
  resetSelections?: boolean;
  onRowDbClick?: CallBackSelect | null;
};

function CommonTable<T>({ column,
  data,
  path,
  seq,
  pager = false,
  hidePage = false,
  filter = null,
  body = {},
  cbSelect = null,
  cbExchangeData,
  resetSelections = true,
  onRowDbClick }: ArgsData<T>) {
  const [postData, setPostData] = useState(() => [...data]);
  const [selectRowId, setSelectRowId] = useState<any | null>(null);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ now: 1, max: 1, size: (pager ? 10 : 100), total: 0, hidePage: hidePage })
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectPosition, setSelectPosition] = useState<{ top: number, left: number } | null>(null);
  const [filterItem, setFilterItem] = useState<FilterItem | null>(null);
  const lastClickedEventRef = useRef<React.MouseEvent | null>(null);

  const table = useReactTable({
    data: postData,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  const postSuccess = (res: any) => {
    setPostData(cbExchangeData(res.data.data));
    if (resetSelections) {
      setSelectRowId(null);
    } else {
      if (cbSelect != null) {
        cbSelect(cbExchangeData(res.data.data)[selectRowId]);
      }
    }
    setPageInfo({ ...pageInfo, max: res.data.totalPage, total: res.data.totalRecord });
  };

  const getList = debounce(async (info: PageInfo) => {
    var params = filter
      ? { pageNumber: info.now, pageSize: info.size, filter: filter.vals }
      : { pageNumber: info.now, pageSize: info.size };
    Object.assign(params, body);

    Post({
      apiPath: path,
      params: params,
      onSuccess: postSuccess,
      errMessage: "一覧の取得に失敗しました。",
    });
  }, 300);

  const cbClickRow = (row: Row<any>) => {
    if (cbSelect != null) {
      cbSelect(selectRowId === row.id ? null : row.original);
    }
    setSelectRowId((prev: any) => row.id === prev ? null : row.id);
  };

  const cbDoubleRow = (row: Row<any>) => {
    if (onRowDbClick != null) {
      onRowDbClick(row.original);
    }
  }

  const handlePageChange = (newPage: number) => {
    setPageInfo({ ...pageInfo, now: newPage });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageInfo({ ...pageInfo, size: newPageSize, now: 1 });
  };

  const handleHeaderClick = (event: React.MouseEvent, header: any) => {
    const id = header.column.id;
    const headerOption = filter?.def[id];

    if (headerOption) {
      // If the popup is open and it's a different column, close the popup before opening the new column
      if (isSelectOpen && filterItem?.name !== headerOption.name) {
        setIsSelectOpen(false);
        setTimeout(() => {
          openPopup(headerOption, event);
        }, 0); // Ensure React renders before opening the new popup
      } else {
        // Normally, open the popup for the current column
        openPopup(headerOption, event);
      }
    } else {
      // Close the popup if there is no `headerOption`
      closePopup();
    }
  };

  const updatePopupPosition = (event: React.MouseEvent | HTMLElement) => {
    const thElement = event instanceof HTMLElement ? event : (event.target as HTMLElement).closest("th");
    if (!thElement) {
      console.error("Header element not found");
      return;
    }

    const rect = thElement.getBoundingClientRect();
    const popUpElement = document.querySelector(".filter-dialog");

    if (popUpElement) {
      const popUpRect = popUpElement.getBoundingClientRect();

      let adjustedTop = rect.bottom + window.scrollY + 10; // Position below header
      let adjustedLeft = rect.left + window.scrollX; // Position aligned with header
      let position = "bottom";

      // Check for screen overflow and adjust
      if (rect.left + popUpRect.width > window.innerWidth) {
        adjustedLeft = Math.max(rect.right + window.scrollX - popUpRect.width, 10);
        position = "bottom-left";
      }

      if (rect.bottom + popUpRect.height > window.innerHeight) {
        adjustedTop = rect.top + window.scrollY - popUpRect.height - 10;
        position = "top";
      }

      // Update popup position
      setSelectPosition({ top: adjustedTop, left: adjustedLeft });
      popUpElement.setAttribute("data-position", position);
    }
  };

  const openPopup = (headerOption: any, event: React.MouseEvent) => {
    lastClickedEventRef.current = event; // Store the last click event

    setFilterItem(null); // Reset previous state
    setIsSelectOpen(true); // Open popup

    const vals = filter?.vals as BaseVals;
    headerOption.val = vals[headerOption.name] || null; // Set default value if not already set
    setFilterItem(headerOption); // Update filterItem with new value

    // Get the position of the entire `th`
    const thElement = (event.target as HTMLElement).closest("th");

    if (!thElement) {
      console.error("Header element not found");
      return;
    }

    const rect = thElement.getBoundingClientRect();
    const temporaryTop = -1000; // Temporary position
    const temporaryLeft = -1000; // Temporary position

    setSelectPosition({ top: temporaryTop, left: temporaryLeft }); // Display immediately at temporary position

    // Wait for React to render the popup
    setTimeout(() => {
      const popUpElement = document.querySelector(".filter-dialog");

      if (popUpElement) {
        const popUpRect = popUpElement.getBoundingClientRect();

        let adjustedTop = rect.bottom + window.scrollY + 10; // Exact position (below th)
        let adjustedLeft = rect.left + window.scrollX;
        let position = "bottom";

        // Check for screen overflow
        if (rect.left + popUpRect.width > window.innerWidth) {
          adjustedLeft = Math.max(rect.right + window.scrollX - popUpRect.width, 10);
          position = "bottom-left";
        }

        if (rect.bottom + popUpRect.height > window.innerHeight) {
          adjustedTop = rect.top + window.scrollY - popUpRect.height - 10;
          position = "top";
        }

        // Update to exact position
        setSelectPosition({ top: adjustedTop, left: adjustedLeft });
        popUpElement.setAttribute("data-position", position);
        popUpElement.classList.add("show");
      }
    }, 0); // Ensure the popup has rendered
  };

  const closePopup = () => {
    setFilterItem(null);
    setIsSelectOpen(false);
    setSelectPosition(null);
  };

  const handleHeaderClose = () => {
    setIsSelectOpen(false);
  }
  const handleFilterChange = (key: string, val: string | null) => {
    filter?.setter(prev => ({ ...prev, [key]: val }));
    setPageInfo((prev) => ({ ...prev, now: 1 }));
  }

  useEffect(() => {
    if(path != ''){
      getList(pageInfo);
    }
    if (resetSelections) {
      setSelectRowId(null);
    }
  }, [seq, pageInfo.now, pageInfo.size, filter?.vals]);


  useEffect(() => {
    const handleResize = () => {
      if (isSelectOpen && lastClickedEventRef.current && filterItem) {
        openPopup(filterItem, lastClickedEventRef.current); // Reopen the popup
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSelectOpen, filterItem]);

  return (
    <>
      <style>
        <TableCss />
      </style>
      <div className="bl_tableWrapper">
        <div className="tableSection">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (header.depth - header.column.depth > 1) {
                      return null;
                    }
                    let rowSpan = 1;
                    if (header.isPlaceholder) {
                      const leafs = header.getLeafHeaders();
                      rowSpan = leafs[leafs.length - 1].depth - header.depth;
                    }
                    const headerOption = filter?.def[header.column.id];
                    const vals = filter?.vals as BaseVals;

                    return (
                      <th
                        onClick={(event) => handleHeaderClick(event, header)}
                        key={header.id}
                        colSpan={header.colSpan}
                        rowSpan={rowSpan}
                        style={{ position: 'relative' }}
                        className={header.column.columnDef.meta?.className || ''} // Apply class from meta
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {headerOption && (
                          <span className={vals[headerOption.name] != null ? "sort-icon-sel arrow-icon" : "sort-icon arrow-icon"}>
                            ▼
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={(e) => {
                    e.preventDefault();
                    cbClickRow(row);
                  }}
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    cbDoubleRow(row);
                  }}
                  className={selectRowId == row.id ? 'select-line' : ''}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {isSelectOpen && (
            <div
              className="filter-dialog"
              style={{
                top: selectPosition?.top,
                left: selectPosition?.left,
              }}
              data-position="bottom"
            >
              <TableFilter tgt={filterItem} onChange={handleFilterChange} onClose={handleHeaderClose} />
            </div>
          )}
        </div>
        <Pagination
          pageInfo={pageInfo}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

    </>
  );
}

export { CommonTable };

