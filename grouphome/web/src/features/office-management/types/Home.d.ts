export type FormData = {
    id: number | null;
    homeName: string;
    branchId: number;
    branchName: string | null;
    prefId: string | null;
    addrId: number | null;
    city: string;
    town: string;
    postNo: string;
    tel: string;
    units: string;
    updatedAtAddr: string;
    updatedAtHome: string;
    postNo1st?: string;
    postNo2nd?: string;
    postNoCombined?: string;
}

export type HomeInfoSaveDto = {
    homeId: number | null;
    name: string;
    branchId: number;
    sameBranch: boolean | null;
    addrId: number | null;
    postNo: string | null;
    prefId: string | null;
    city: string | null;
    town: string | null;
    tel: string | null;
    fax: string | null;
    contents: string;
    updatedAtAddr: string;
    updatedAtHome: string;
}
