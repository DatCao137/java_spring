export type FormData = {
    id: number | null;
    name: string;
    birthDay: string | null;
    address: string | null;
    message: string | null;
    unitId: number | null;
    updatedAt: string;
    postNo: string;                                        
    postNo1st?: string;
    postNo2nd?: string;
    postNoCombined?: string;
}

export type EmployeeInfoSaveDto = {
    id: number | null;
    name: string;
    birthDay: string | null;
    address: string | null;
    message: string | null;
    unitId: number | null;
    updatedAt: string;
}
