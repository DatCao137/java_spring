import { TypeFeatures, TypeServices, TypeUnits } from "./Branch";

export type TypeFormData = {
    unitId: number | null;
    homeId: number | null;
    name: string;
    addrId: number | null;
    postNo1st?: string;
    postNo2nd?: string;
    postNoCombined?: string;
    postNo: string | null;
    prefId: string | null;
    city: string;
    town: string;
    tel: string | null;
    fax: string | null;
    mail: string;
    startDate: string | null;
    capacity: number | null;
    concept: string;
    featuresSystem: boolean;
    featuresBarrierFree: boolean;
    featuresMenOnly: boolean;
    featuresWomenOnly: boolean;
    serviceGH: boolean;
    serviceSS: boolean;
    updatedAtAddr: string;
    updatedAtUnit: string;
}

export type TypeUnitInfoSaveDto = {
    unitId: number | null;
    homeId: number | null;
    name: string;
    addrId: number | null;
    postNo: string | null;
    prefId: string | null;
    city: string;
    town: string;
    tel: string | null;
    fax: string | null;
    mail: string,
    contents: TypeContents | null;
    updatedAtAddr: string;
    updatedAtUnit: string;
}

export type TypeUnitInfo = {
    unitId: number,
    homeId: number,
    unitName: string,
    addrId: number,
    postNo: string,
    prefId: string,
    prefName: string
    city: string,
    town: string,
    tel: string,
    fax: string,
    mail: string,
    contents: string,
    updatedAtUnit: string,
    updatedAtAddr: string,
    address: string,
}

export type TypeBasic = {
    startDate: string | null,
    capacity: number | null,
    concept: string
}

export type TypeContents = {
    basic: TypeBasic,
    features: TypeFeatures,
    services: TypeServices,
}

