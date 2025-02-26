import { PostalAddress } from "@/features/office-management/validations/address";
import { z } from "zod";

export type DesiredDate = {
  first: {
    date: string;
    time: string;
  } | null;
  second: {
    date: string;
    time: string;
  } | null;
  desired: string | null;
};
export type RepresentativeInfo = {
  name: string;
  tel: string;
};

export type MItem = {
  name: string;
  value: string;
  checked: boolean;
};

export type ContentVisit = {
  base: VisitBase;
  attendant: VisitAttendant;
  desired: VisitDesired;
  etc: string;
};

export type VisitBase = {
  hopeItems: string[];
  hopeOther: string | null;
  name: string;
  gana: string;
  sex: string;
  age: number;
  address: z.infer<typeof PostalAddress>;
  contact: VisitContact;
  disability: {
    name: string;
    type: string;
    pocketbook: {
      has: boolean | null;
      contents: string;
    };
  };
  recipient: {
    has: boolean | null;
  };
  visiting: {
    has: boolean | null;
    contents: string;
  };
  attached: {
    has: boolean | null;
    contents: string;
    isBring: boolean;
  };
};

export type VisitAttendant = {
  name: string;
  contact: VisitContact;
};

export type VisitContact = {
  tel: string;
  fax: string;
  mail: string;
};

export type VisitDesired = {
  count: number | null;
  attribute: string[];
  contactInfo: string;
};

export type ContentMoveIn = {
  name: string;
  gana: string;
  representative: string;
  sex: string;
  birth: {
    era: string;
    date: string;
    age: number | null;
  };
  currentAddress: MoveInAddress;
  emergency: {
    name: string;
    relationship: string;
    address: MoveInAddress;
  };
  underwriter: {
    has: boolean | null;
    name: string;
  };
  successor: {
    has: boolean | null;
    name: string;
  };
  motive: string;
  disabilityName: string;
  disabilityClass: string;
  book: MoveInBook;
  failureSituation: string;
  history: MoveInHistoryItem[];
  allergy: string;
  physicalInfo: MoveInPhysicalInfo;
  family: FamilyItem[];
  insurance: MoveInInsurance;
  related: {
    doctor: {
      hospital: string;
      medicine: string;
      name: string;
      address: z.infer<typeof PostalAddress> ;
      contact: {
        tel: string;
        mobile: string;
        fax: string;
      };
    };
    caseWorker: {
      institutionName: string;
      name: string;
      contact: {
        tel: string;
        mobile: string;
        fax: string;
      };
    };
  };
  situation: MoveInSituation;
  requirements: {
    items: string[];
    contents: string;
  };
  mental: string;
  goals: string;
  requests: string;
  income: {
    pension: {
      available: boolean;
      amount: string;
    },
    welfare: {
      available: boolean;
      amount: string;
    },
    pensionOther: {
      available: boolean;
      amount: string;
    },
    working: {
      available: boolean;
      amount: string;
    },
    familyAssist: {
      available: boolean;
      amount: string;
    },
    others: {
      available: boolean;
      name: string;
      amount: string;
    },
  }
};

export type MoveInAddress = {
  address: {
    postNo1st: string | null;
    postNo2nd: string | null;
    prefId: number | null;
    city: string | null;
    town: string | null;
  };
  tel: MoveInTel;
};

export type MoveInTel = {
  type: string;
  no: string;
  inner: string;
  mail: string;
};

export type MoveInBook = {
  has: boolean | null;
  physical: MoveInBookItem;
  treatment: MoveInBookItem;
  mental: MoveInBookItem;
};

export type MoveInBookItem = {
  has: boolean;
  degree: string;
};

export type MoveInHistoryItem = {
  name: string;
  medical: string;
};

export type MoveInPhysicalInfo = {
  height: string;
  weight: string;
  lifestyle: {
    has: boolean | null;
    contents: string;
  };
  wakeUpTime: string;
  sleepingTime: string;
  alcohol: {
    has: boolean | null;
  };
  tobacco: {
    has: boolean | null;
  };
};

export type FamilyItem = {
  name: string;
  gana: string;
  relationship: string;
  together: {
    has: boolean | null;
    address: {
      postNo1st: string | null;
      postNo2nd: string | null;
      prefId: number | null;
      city: string | null;
      town: string | null;
    };
  };
};

export type RequestType = 'visit' | 'movein';

export type MoveInInsurance = {
  type: {
    type: string;
    contents: string;
  };
  care: {
    has: boolean | null;
  };
  limit: string | null;
  expenses: {
    type: '自己負担' | '自立支援医療' | '';
    limit: number | null;
  };
};

export type MoveInSituation = {
  place: {
    has: boolean | null;
    contents: string;
  };
  etcService: string;
  activity: {
    weeks: string[];
    startHour: string;
    endHour: string;
    notes: string;
  };
  transfer: {
    transferType: string;
    transportationType: string;
    contents: string;
  };
  needSupport: {
    has: boolean | null;
    contents: string;
  };
  howToSpend: string;
  medication: {
    has: boolean | null;
    contents: string;
  };
  care: {
    has: boolean | null;
    contents: string;
  };
  money: string;
};
export type SalesInfo = {
  inquiryDate: string;
  inquiryMethod: string;
  tel: string;
  fax: string;
  mail: string;
  decisionMaker: string;
  decisionName: string;
  decisionAddress: string;
  contactableHours: string;
};

export type SalesFollowInfo = {
  step: string;
  stepName: string;
  followDate: string;
  staffName: string;
  contents: string;
};

export type ProfileInfo = {
  introducerName: string;
  introducerType: string;
  introducerAddr: string;

  disabledType: string;
  disabledClass: string;

  pocketBook: string;
  pocketBookGrade: string;
  pocketBookWheelchair: string;

  serviceDays: string;
  serviceActivityName: string;
  serviceActivityAddress: string;
  serviceVisit: string;
  serviceEtc: string;
  serviceRecipient: string;

  residenceType: string;
  residenceRemark: string;
};

export type HearingInfo = {
  result: string;
  prospect: string;
  remark: string;
};

export type HearingListInfo = {
  step: string;
  memo: string;
  lastUpdate: string;
};
