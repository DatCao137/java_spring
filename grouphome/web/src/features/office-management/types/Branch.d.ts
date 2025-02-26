export type FormData = {
    id: number | null;
    addrId: number | null;
    no: number;
    branchName: string;
    homeId: number | null;
    homeName: string;
    groupHomeTypeId: number;
    classDivisionId: number;
    fee: number | null;
    postNo1st?: string;
    postNo2nd?: string;
    postNoCombined?: string;
    prefId: string;
    city: string;
    town: string;
    postNo: string | null;
    tel: string | null;
    fax: string | null;
    officeNoGH: string | null;
    officeNoSS: string | null;
    officeNoA: string | null;
    officeNoB: string | null;
    memo: string;
    updatedAtBranch: string;
    updatedAtAddr: string;
    contents: string
}

export type BranchInfoSaveDto = {
    branchId: number | null;
    no: number;
    name: string;
    addrId: number | null;
    postNo: string | null;
    prefId: string;
    city: string;
    town: string;
    tel: string | null;
    fax: string | null;
    contents: TypeContents | null;
    updatedAtAddr: string;
    updatedAtBranch: string;
    memo: string;
}

export type TypeBasic = {
    groupHomeTypeId: number,
    classDivisionId: number,
    fee: number|null
}
export type TypeOfficeNo = {
    GH: string|null,
    SS: string|null,
    typeA: string|null,
    typeB: string|null
}

export type TypeContents = {
    basic: TypeBasic,
    officeNumber: TypeOfficeNo
}

export type TypeFeatures = {
    system : boolean,
    barrierFree: boolean,
    menOnly: boolean,
    womenOnly: boolean    
}
export type TypeServices = {
    GH: boolean,
    SS: boolean
}
