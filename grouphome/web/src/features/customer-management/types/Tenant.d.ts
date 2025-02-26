export type TenantListResponseDto = {
  id: number;
  customerUnitId: number;
  brunchId: number;
  brunchName: string;
  unitId: number;
  unitName: string;
  roomNo: string;
  name: string;
  nameGana: string;
  status: number;
  moveInAt: string;
  leavingAt: string;
  category: number;
  personal: PersonalInfo | null;
};

export type TenantDetailResponseDto = {
  id: number | undefined;
  category: number | undefined;
  name: string | undefined;
  nameGana: string | undefined;
  moveInAt: string | undefined;
  personal: PersonalInfo | null;
  details: DetailsInfo | null;
  branchId: number | undefined;
  infoUpdatedAt: string | undefined;
  customerUnitId: number | undefined;
  unitUpdatedAt: string | undefined;
};

export type FormData = {
  id: number | undefined; // Primary Key, Auto Increment
  name: string | undefined; // 氏名
  nameGana: string | undefined; // 氏名(ふりがな)
  personal: PersonalInfo | undefined; // 個人情報
  details: DetailsInfo | undefined; // 詳細情報
  category: number | undefined; // 障がい支援区分
  baseCustomerId: number | undefined; // Reference to d_customer_info.id
  updatedAt: string | undefined; // 更新日 (DATETIME in ISO format)
};

type PersonalInfo = {
  nickname: string | undefined; // Nickname
  birthDay: string | null; // Birthday in ISO format
  sex: string | undefined; // Gender (1: Male, 2: Female, etc.)
};

type DetailsInfo = {
  disabilityType: string | undefined; // 障害種別と特性
  mentallyDisabled: boolean | undefined; // 精神障害者地域移行特別加算対象の有無
  severelyDisabled: boolean | undefined; // 重度障害者支援加算の対象有無
  behavioralDisorder: boolean | undefined; // 強度行動障害支援者対象の有無
  homeCare: boolean | undefined; // 居宅介護の利用有無
  usedOffice: string | undefined; // 利用事業所名
  usedPace: number | undefined; // 利用頻度 (number of times per week)
  beforePlace: string | undefined; // 入居前の生活場所
  beforeOffice: string | undefined; // 入居前の居住系利用サービス事業所名①
  beforeService2: string | undefined; // 入居前の利用福祉サービス②
  beforeServiceOffice2: string | undefined; // 入居前の利用サービス事業所名②
  beforeService3: string | undefined; // 入居前の利用福祉サービス③
  beforeServiceOffice3: string | undefined; // 入居前の利用サービス事業所名③
  memo: string | undefined; // メモ
};

export type CustomerMedicalDto = {
  id?: number | undefined;
  customerId: number | undefined;
  insuranceTypeId: number | undefined;
  number: string | undefined;
  details?: CustomerMedicalDetailDto[];
  updatedAt?: string;
}

export type CustomerMedicalDetailDto = {
  id?: number;
  medicalId?: number
  sub: number | undefined;
  serviceName: string | undefined;
  institution: string | undefined;
  status: number | undefined;
  pace: number | undefined;
  updatedAt?: string;
}

export type CustomerCareDto = {
  id?: number;
  customerId?: number;
  careNo: string;
  careTypeId: number;
  limit?: number;
  details?: CustomerCareDetailDto[];
  updatedAt?: string;
};

export type CustomerCareDetailDto = {
  id?: number;
  careId?: number;
  sub: number;
  serviceName: string;
  useCompany: string;
  status: number;
  pace: number;
  updatedAt?: string;
};

export type BillingResponseDto = {
  id?: number;
  customerId?: number;
  movein1stAt: string;
  originalRequestAt: string;
  rpInputAt: string;
  transfer1stAt: string;
  remark: string;
  updatedAt?: string;
  tenantBillingDetails: List<BillingDetailResponseDto>
};

type BillingDetailResponseDto = {
  id?: number;
  billingId?: number;
  yyyymm: string;
  nationalAt: string;
  selfGoverningAt: string;
  otherAt: string;
  issueAt: string;
  memo: string;
  updatedAt?: string;
};

export type SaveBillingDto = {
  id?: number;
  customerId?: number;
  movein1stAt: string | null;
  originalRequestAt: string | null;
  rpInputAt: string | null;
  transfer1stAt: string | null;
  remark: string;
  updatedAt?: string;
};

export type SaveBillingDetailDto = {
  id?: number;
  billingId?: number;
  yyyymm: string;
  nationalAt: string | null;
  selfGoverningAt: string | null;
  otherAt: string | null;
  issueAt: string | null;
  memo: string;
  updatedAt?: string;
};

export type SaveApplicationStatusDto = {
  id?: number;
  customerId?: number;
  government: string | undefined;
  nationalRentSubsidy: NationalRentSubsidy | undefined;
  municipalRentSubsidy: MunicipalRentSubsidy | undefined; 
  individualMunicipality: IndividualMunicipality;
  lifeInsurancePension: LifeInsurancePension | undefined;
  personalLiability: PersonalLiability | undefined;
  updatedAt?: string;
};

export type ApplicationStatusResponseDto = {
  id?: number;
  customerId?: number;
  government: string | undefined;
  nationalRentSubsidy: NationalRentSubsidy | undefined;
  municipalRentSubsidy: MunicipalRentSubsidy | undefined; 
  individualMunicipality: IndividualMunicipality;
  lifeInsurancePension: LifeInsurancePension | undefined;
  personalLiability: PersonalLiability | undefined;
  updatedAt?: string;
};

type NationalRentSubsidy = {
  specialBenefit: boolean | null;
  limit: string | null;
}

type MunicipalRentSubsidy = {
  subject: boolean | null;
  requestAt: string | null;
  amount: number | null;
  memo: string;
}

type IndividualMunicipality = {
  requestAt: string | null;
  addition: string[];
  memo: string;
}

type LifeInsurancePension = {
  basic: boolean | null;
  special: boolean | null;
  disabled: boolean | null;
}

type PersonalLiability = {
  status: string;
  insuranceType: number | null;
  insuranceName: string;
  agency: string;
  staff: string;
  contact: string;
}

export type ContentMeetingPersonInChargeSave = {
  username: string,
  writtenBy: string,
  date: Date | undefined,
  dateStart: Date | undefined,
  dateEnd: Date | undefined,
  venue: string,
  meetingAttendees: meetingAttendees,
  itemsConsidered: string,
  resultsConsideration1: string,
  resultsConsideration2: string,
};

type meetingAttendees = {
  profession1: string, name1: string,
  profession2: string, name2: string,
  profession3: string, name3: string,
  profession4: string, name4: string,
  profession5: string, name5: string,
  profession6: string, name6: string,
  profession7: string, name7: string,
  profession8: string, name8: string,
}
