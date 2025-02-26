
export type CustomerSalesInfo = {
    id: number | null;
    inquiryInfoId: number;
    firstInquiryDate: string | null;
    firstInquiryHow: number;
    tel: string;
    fax: string;
    mail: string;
    name: string;
    maker: string;
    address: string;
    contactableHour: string;
    contact: Contact;
    decision: Decision;
    updatedAt: string;
};

export type CustomerSalesSave = {
    id: number | null;
    inquiryInfoId: number;
    firstInquiryDate: string | null;
    firstInquiryHow: number;
    contact: Contact;
    decision: Decision;
    updatedAt: string;
};

export type Contact = {
    tel: string,
    fax: string,
    mail: string
}

export type Decision = {
    name: string,
    maker: string,
    address: string,
    contactableHour: string
}

export type SalesFollowInfo = {
    id: number | null;
    step: string;
    stepName: string;
    followDate: string;
    staffName: string;
    contents: string;
};

export type CustomerSalesFollowInfo = {
    id: number | null;
    salesInfoId: number | null;
    step: number;
    followDate: string | null;
    staffId: number | null;
    staffName: string;
    contents: string;
    updatedAt: string;
};

type InquiryFormData = {
    id: number | null;
    name: string;
    gana: string;
    sex: string;
    age: string;
    inquirySrcName: string;
    inquirySrcStaff: string;
    inquirySrcRoute: string | null;
    inquirySrcPhone: string;
    inquirySrcLink: string | null;
    status: string;
    nextAction: string;
    updatedAt: string;
};

type InquirySaveFormData = {
    id: number | null;
    name: string;
    gana: string;
    sex: string;
    age: string;
    status: string;
    nextAction: string;
    updatedAt: string;
    inquirySrc: InquirySrc;
}

type InquirySrc = {
    link: string | null;
    name: string;
    phone: string;
    route: string | null;
    staff: string;
}
type InquiryItemFormData = {
    id: number | null;
    inquiryInfoId: string;
    status: number | null;
    homeId: number | null;
    ghData: string;
    date: string | null;

    breakdownSelf: number | null;
    breakdownFamily: number | null;
    breakdownCounselor: number | null;
    breakdownSupport: number | null;
    breakdownThirdParty: number | null;
    breakdownSum: number;

    recordTime: string;
    recordVisitTime: string;
    recordFreeTrial: string | null;
    recordPaidTrial: string | null;
    recordSsCompletion: string | null;
    recordContractDate: string;
    recordPlanStatus: number | null;

    updatedAt: string;
}

type InquiryItemSaveFormData = {
    id: number | null;
    inquiryInfoId: string;
    status: number | null;
    homeId: number | null;
    ghData: string;
    date: string | null;
    breakdown: Breakdown;
    record: RecordType;
    updatedAt: string;
}

type Breakdown = {
    self: number | null;
    family: number | null;
    counselor: number | null;
    support: number | null;
    thirdParty: number | null;
}

type RecordType = {
    time: string;
    visitTime: string;
    freeTrial: string | null;
    paidTrial: string | null;
    ssCompletion: string | null;
    contractDate: string;
    planStatus: number | null;
}

type ProfileFormData = {
    id: number | null;
    inquiryInfoId: number | null;
    introducerName: string;
    introducerType: string;
    introducerAddr: string;
    disabledType: string;
    disabledClass: string;
    pocketBookType: number;
    pocketBookTypeName: string;
    pocketBookGrade: string;
    pocketBookWheelChair: number;
    pocketBookWheelChairName: string;
    serviceDays: string;
    serviceName: string;
    serviceAddr: string;
    serviceVisit: string;
    serviceEtc: string;
    serviceRecipient: string;
    residenceType: string;
    residenceRemark: string;
    updatedAt: string;
};

type InquiryProfileSaveDto = {
    id: number | null;
    inquiryInfoId: number | null;
    introducer: Introducer;
    disabled: Disabled;
    pocketBook: PocketBook;
    service: Service;
    residence: Residence;
    // updatedAt: string;
}

type Introducer = {
    name: string;
    type: string;
    addr: string;
}

type Disabled = {
    type: string;
    class: string;
}

type PocketBook = {
    type: number | null;
    grade: string;
    wheelchair: number | null;
}

type Service = {
    days: string;
    name: string;
    addr: string;
    visit: string;
    etc: string;
    recipient: string;
}

type Residence = {
    type: string;
    remark: string;
}

type InquiryHearingFormData = {
    id: number | null;
    inquiryInfoId: string;
    result: string;
    prospect: string;
    remark: string;
    updatedAt: string;
}

type InquiryHearingDetailFormData = {
    id: number | null;
    hearingInfoId: string;
    step: number | null;
    contents: string;
    updatedAt: string;
}


export type HearingResponseDto = {
    id: number;
    inquiryInfoId: string;
    result: string;
    prospect: string;
    remark: string;
    updatedAt: string;
    inquiryHearingDetails: List<HearingDetailResponseDto>
  };
  
  type HearingDetailResponseDto = {
    id: number | null;
    hearingInfoId: string;
    step: number | null;
    contents: string;
    updatedAt: string;
  };


export { InquiryFormData, InquirySaveFormData, InquirySrc, InquiryItemFormData, InquiryItemSaveFormData, ProfileFormData, InquiryProfileSaveDto, InquiryHearingFormData, InquiryHearingDetailFormData, HearingDetailResponseDto }
