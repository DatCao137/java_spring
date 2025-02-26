import { z } from "zod";
import { tryParseToNumber, tryCastEmptyToNull } from '@/utils/general';

export const NationalRentSubsidy = z.object({
  specialBenefit: z.boolean().nullable().optional(),
  limit: z.string()
  .regex(/^(\d{4}-\d{2}-\d{2})?$/, "補足給付期限はyyyy-MM-dd形式でなければなりません")
  .nullable()
  .optional(),
});

export const MunicipalRentSubsidy = z.object({
  subject: z.boolean().nullable().optional(),
  requestAt: z.string()
  .regex(/^(\d{4}-\d{2}-\d{2})?$/, "申請日はyyyy-MM-dd形式でなければなりません")
  .nullable()
  .optional(),
  amount: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
  memo: z.string().nullable().optional(),
});

export const IndividualMunicipality = z.object({
  requestAt: z.string()
  .regex(/^(\d{4}-\d{2}-\d{2})?$/, "申請日はyyyy-MM-dd形式でなければなりません")
  .nullable()
  .optional(),
  addition: z.array(z.string().nullable().optional()),
  memo: z.string().nullable().optional(),
});

export const LifeInsurance_pension = z.object({
  basic: z.boolean().nullable().optional(),
  special: z.boolean().nullable().optional(),
  disabled: z.boolean().nullable().optional(),
});

export const PersonalLiability = z.object({
  status: z.string().nullable().optional(),
  insuranceType: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
  insuranceName: z.string().nullable().optional(),
  agency: z.string().nullable().optional(),
  staff: z.string().nullable().optional(),
  contact: z.string().nullable().optional(),
});

export const schema = z.object({
  id: z.number().min(1, { message: "idは1以上である必要があります" }).nullable().optional(),
  customerId: z.number({ message: 'customerIdはnullではいけません' }).min(1, { message: 'customerIdは1以上である必要があります' }).nullable().optional(),
  government: z.string().max(32, "介護保険被保険者証(番号)は最大32文字までです。").nullable().optional(),
  nationalRentSubsidy: NationalRentSubsidy.nullable().optional(),
  municipalRentSubsidy: MunicipalRentSubsidy.nullable().optional(),
  individualMunicipality: IndividualMunicipality,
  lifeInsurancePension: LifeInsurance_pension.nullable().optional(),
  personalLiability: PersonalLiability.nullable().optional(),
  updatedAt: z.string().optional(),
});

export type SaveApplicationStatusRequestDto = z.infer<typeof schema>;
