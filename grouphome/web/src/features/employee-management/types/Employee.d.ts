export type EmployeeFormData = {
    id: number | null;
    name: string;
    birthDay: string | null;
    address: string | null;
    message: string | null;
    unitId: number | null;
    updatedAt: string;
    imageEmployee: File | null;
}

export type EmployeeInfoSaveDto = {
    id: number | null;
    name: string;
    birthDay: string | null;
    address: string | null;
    message: string | null;
    unitId: number | null;
    updatedAt: string;
    imageEmployee: File | null;
}
