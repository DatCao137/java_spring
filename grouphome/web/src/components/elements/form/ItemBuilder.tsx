import React from 'react';

type Sub = {
    child: Array<Contents>;
    span?: number;
    cols?: number;
    className?: string;
    isItem?: boolean;
    isBorder?: boolean;
}

type Contents = {
    label?: string;
    labelClass?: string;
    isNoBorder?: boolean;
    span?: number;
    child?: Array<Contents>;
    sub?: Sub;
    ele?: JSX.Element;
}
interface Props {
    layout: Array<Contents>;
    className?: string;
}


export const ItemBuilder = React.forwardRef<HTMLElement, Props>(({
    layout, className
}, ref
) => {

    return (<>
        {layout.map((item, index) => {
            const labelSpan = item.span ? "col-span-" + item.span : "col-span-1";
            const labelBorder = item.isNoBorder ? "" : "border";
            const labelClass = item.labelClass || "";
            const span = item.sub?.span ? "col-span-" + item.sub.span : "";
            const cols = item.sub?.cols ? "grid-cols-" + item.sub.cols : "grid-cols-subgrid";
            const cust = item.sub?.className ? span + " " + item.sub.className
                                             : item.sub?.isItem
                                              ? span + " border-collapse border px-2"
                                              : span + " grid border-collapse " + (item.sub?.isBorder ? "border " : "") + cols;
            return (item.label == "root")
                ? (
                    <div className={className}>
                        {item.child && (<ItemBuilder layout={item.child} />)}
                    </div>)
                : (
                    <>
                        {item.label && (<div className={`${labelSpan} border-collapse content-center text-wrap ${labelBorder} text-center ${labelClass}`}>{item.label}</div>)}
                        {item.child && (<ItemBuilder layout={item.child} />)}
                        {item.sub && (<div className={cust}><ItemBuilder layout={item.sub.child} /></div>)}
                        {item.ele ? item.ele : (<></>)}
                    </>
                );
        })}
    </>);
}
)