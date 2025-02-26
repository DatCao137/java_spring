import { FilterItem } from "./tableFilter/TableFilter"

type CallBackSelect = {
    (row:Row<any>):void
}
type CallBackClick = {
    (type:string, row?:Row<any>):void,
}
type CallBackExchange = {
    (row:[]):any
}
interface rowInterface {
    id: string;
}
type ItemArg = {
    label: string,
    class?: string
}
type ItemArgVal = {
    val: string|number[]|undefined|JSX.Element,
    class?: string
}

type ItemArgsData = {
    title: ItemArg,
    val: ItemArgVal,
    type?: ItemArg
}

interface SelectItem {
    name: string;
    value: string | number;
}

interface PopupConfirmParams {
    isOpen: boolean;
    textConfirm: string;
    message: string;
    isShowCancel: boolean;
    confirmAction: () => void;
    onClose: () => void;
}