import { ItemArgsData } from "../Common";

function CommonItem(para: ItemArgsData) {

    const classTitle = para.title.class ?? "";
    const classVal = para.val.class ?? "";
    const classType = para.type == undefined ? "" : para.type.class ?? "";
    const Type = () => (para.type == undefined) ? ("") : (<><p className={classType}>{para.type.label}</p></>);

    return (
<>
    <span className={classTitle}>{para.title.label}</span>
    <Type />
    <span className={classVal}>{para.val.val}</span>
</>
    )
}

export { CommonItem }