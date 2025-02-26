
export type FormDataType = {
    id: number | null,
    unitId: number | null,
    name: string,
    contents: Contents,
    fee: number | null,
    remark: string,
    updatedAt: string | null,
}

export type Contents = {
    basic: Basic,
    remark: string
}

export type Basic = {
    fee: number | null
}

