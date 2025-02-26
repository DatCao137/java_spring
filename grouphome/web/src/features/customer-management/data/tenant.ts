import { FormData } from "../types/Tenant"
import { SaveCustomerCareRequestDto } from "../validator/tenant/CustomerCareSchema";
import { SaveCustomerMedicalOrCareDetailRequest } from "../validator/tenant/CustomerMedicalOrCareDetailSchema";
import { SaveCustomerMedicalRequestDto } from "../validator/tenant/CustomerMedicalSchema";

export const defaultFormData: FormData = {
  id: undefined,
  name: '',
  nameGana: '',
  personal: {
    nickname: '',
    birthDay: null,
    sex: undefined,
  },
  details: {
    disabilityType: '',
    mentallyDisabled: undefined,
    severelyDisabled: undefined,
    behavioralDisorder: undefined,
    homeCare: undefined,
    usedOffice: '',
    usedPace: undefined,
    beforePlace: '',
    beforeOffice: '',
    beforeService2: '',
    beforeServiceOffice2: '',
    beforeService3: '',
    beforeServiceOffice3: '',
    memo: '',
  },
  category: undefined,
  baseCustomerId: undefined,
  updatedAt: undefined,
};

export const defaultTab1Form1Data: SaveCustomerMedicalRequestDto = {
  id: undefined,
  customerId: 0,
  insuranceTypeId: 0,
  number: '',
  updatedAt: undefined,
}

export const defaultTab1Form2Data: SaveCustomerMedicalOrCareDetailRequest = {
  id: undefined,
  medicalId: -1,
  careId: -1,
  customerId: -1,
  sub: undefined,
  serviceName: '',
  institution: '',
  useCompany: '',
  status: -1,
  pace: -1,
  updatedAt: undefined,
}

export const defaultTab2Form1Data: SaveCustomerCareRequestDto = {
  customerId: -1,
  careNo: '',
  careTypeId: -1,
  id: undefined,
  limit: undefined,
  updatedAt: undefined,
}
