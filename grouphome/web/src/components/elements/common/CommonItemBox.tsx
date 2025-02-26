import { ItemArgsData } from '../Common';
import { CommonItem } from './CommonItem'
import md5 from 'md5';

type ArrayData = {
    arrayData: ItemArgsData[],
    bSub?: boolean
}
function CommonItemBox({arrayData, bSub=false}: ArrayData) {
    var type = bSub ? "sub-line" : "item-line";

    return (
        <>
<div className={type}>
    {
        arrayData.map((arg, index) => {
            const uniqueKey = md5(JSON.stringify(arg));
            return (
                <CommonItem key={uniqueKey} title={arg.title} val={arg.val} type={arg.type} />
            )
        })
    }
</div>
        </>
    )
}

export { CommonItemBox }
