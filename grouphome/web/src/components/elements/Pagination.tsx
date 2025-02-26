import React from 'react';
import { SkipBack, SkipForward } from 'lucide-react';

export type PageInfo = {
    now: number;
    max: number;
    size: number;
    total: number;
    hidePage?: boolean;
};

type PaginationProps = {
    pageInfo: PageInfo;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    pageInfo,
    onPageChange,
    onPageSizeChange
}) => {
    if(pageInfo.hidePage) {
        return (<></>);
    }

    const pageRange = 6; // Number of visible pages (including ellipses)
    const pages: (number | string)[] = [];

    if (pageInfo.max <= pageRange) {
        for (let i = 1; i <= pageInfo.max; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1, 2);

        if (pageInfo.now <= 3 || pageInfo.now >= pageInfo.max - 1) {
            pages.push(3);
            pages.push('...');
            pages.push(pageInfo.max - 1, pageInfo.max);
        } else if (pageInfo.now > 3 && pageInfo.now < pageInfo.max - 1) {
            pages.push('...');
            pages.push(pageInfo.now);
            pages.push('...');
            pages.push(pageInfo.max);
        } else if (pageInfo.now >= pageInfo.max - 1) {
            pages.push('...');
            pages.push(pageInfo.max - 1, pageInfo.max);
        }
    }

    return (
        <div className="pagination-footer">
            <div className="pagination-info">
                <div className="pagination-total-record"><span className="pagination-text-total">総件数</span>  <span>{pageInfo.total} {" "} 件 </span> </div>
                <div className="pagination-controls">
                    <button className="pagination-step-button" onClick={() => onPageChange(pageInfo.now - 1)} disabled={pageInfo.now === 1} aria-label="Previous">
                        <SkipBack size={18} />
                    </button>
                    {pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="pagination-spam-3dot">...</span>
                            ) : (
                                <button
                                    className={page === pageInfo.now ? 'pagination-page-active' : 'pagination-page'}
                                    onClick={() => typeof page === 'number' && onPageChange(page)}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                    <button className="pagination-step-button" onClick={() => onPageChange(pageInfo.now + 1)} disabled={pageInfo.now === pageInfo.max}>
                        <SkipForward size={18} />
                    </button>
                </div>
                <div className="pagination-page-size-sl">
                    <div>
                        <span>表示件数 {" "}
                            <select value={pageInfo.size} onChange={(e) => onPageSizeChange(parseInt(e.target.value))}>
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Pagination };