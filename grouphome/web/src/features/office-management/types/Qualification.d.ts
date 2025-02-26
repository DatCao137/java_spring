type Limit = {
    period: boolean;
    rangeYear: number | null;
}

type Qualification = {
    id: number;
    type: string;
    name: string;
    limit: Limit
}