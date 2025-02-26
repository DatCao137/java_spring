export type DocManageSaveDto = {
    id: number;
    oldId: number;
    docId: number;
    pathId: number;
    docName: string;
    fileName: string;
    dataFile: File | null;
    comment: string;
    created_at: string;
    updated_at: string;
}
