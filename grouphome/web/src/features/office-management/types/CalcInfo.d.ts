
export type TypeCalcMaster = {
    id: number;
    groupHomeTypeId: number;
    name: string;
    choices: string;
    depends: string;
    type: string;
}

export type TypeCalcData = {
    id?: number;
    calcId?: number;
    startDate: string;
    notificationDate: string;
    validStartDate: string;
    validEndDate: string;
    calcItemId: number;
    value: string;
    remark: string;
    updatedAt?: string;
}

interface Choices {
    items: string[];
    type: 'radio'|'check';
    selected: string|undefined;
    readonly: boolean;
}
interface Targets {
    parent: string|undefined;
    items: string[]|undefined;
}
interface Unvisible {
    selected: boolean;
    items: string[]|'this';
    value: string|boolean;
}
interface Available {
    selected: boolean;
    items: string[];
    value: string;
}
interface Required {
    notification: boolean;
}
interface Action {
    unvisible: Unvisible;
    available: Available;
    required: Required;
}
interface Depend {
    targets: Targets[];
    action: Action;
}
