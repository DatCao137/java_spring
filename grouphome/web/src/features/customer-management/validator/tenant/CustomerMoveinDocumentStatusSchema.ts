import { z } from "zod";

// UsageDto
const UsageDtoSchema = z.object({
  store: z.boolean().optional(),
  createdAt: z.string().nullable().optional(),
  fileId: z.number().min(1, { message: "ファイルIDは1以上の値を指定してください。" }).optional(),
});

// FaceSheetDto
const FaceSheetDtoSchema = z.object({
  store: z.boolean().optional(),
  createdAt: z.string().nullable().optional(),
  fileId: z.number().min(1, { message: "ファイルIDは1以上の値を指定してください。" }).optional(),
});

// ImportantDocumentDto
const ImportantDocumentDtoSchema = z.object({
  store: z.boolean().optional(),
  sign: z.boolean().optional(),
  createdAt: z.string().nullable().optional(),
  fileId: z.number().min(1, { message: "ファイルIDは1以上の値を指定してください。" }).optional(),
});

// UsageContractDto
const UsageContractDtoSchema = z.object({
  store: z.boolean().optional(),
  sign: z.boolean().optional(),
  createdAt: z.string().nullable().optional(),
  fileId: z.number().min(1, { message: "ファイルIDは1以上の値を指定してください。" }).optional(),
});

// BasicDocumentDto
const BasicDocumentDtoSchema = z.object({
  judge: z.string().max(255, { message: "判定は255文字以内で入力してください。" }).optional(),
  usage: UsageDtoSchema.optional(),
  faceSheet: FaceSheetDtoSchema.optional(),
  important: ImportantDocumentDtoSchema.optional(),
  usageContract: UsageContractDtoSchema.optional(),
});

// DraftDto
const DraftDtoSchema = z.object({
  store: z.boolean().optional(),
  sign: z.boolean().optional(),
  staff: z.number().optional(),
  createdAt: z.string().nullable().optional(),
  fileId: z.number().min(1, { message: "ファイルIDは1以上の値を指定してください。" }).optional(),
});

// MeetingDto
const MeetingDtoSchema = z.object({
  store: z.boolean().optional(),
  writeCheck: z.boolean().optional(),
  createdAt: z.string().nullable().optional(),
  fileId: z.number().min(1, { message: "ファイルIDは1以上の値を指定してください。" }).optional(),
});

// MainDto
const MainDtoSchema = z.object({
  store: z.boolean().optional(),
  sign: z.boolean().optional(),
  staff: z.number().optional(),
  createdAt: z.string().nullable().optional(),
  fileId: z.number().min(1, { message: "ファイルIDは1以上の値を指定してください。" }).optional(),
});

// Plan1stDocumentDto
const Plan1stDocumentDtoSchema = z.object({
  judge: z.string().max(255, { message: "判定は255文字以内で入力してください。" }).optional(),
  lastUpdatedAt: z.string().nullable().optional(),
  draft: DraftDtoSchema.optional(),
  meeting: MeetingDtoSchema.optional(),
  main: MainDtoSchema.optional(),
});

// SaveCustomerMoveinDocumentStatusRequestDto
export const formSchema = z.object({
  id: z.number().optional(),
  customerId: z.number({ required_error: "顧客IDは必須項目です。" }),
  basic: BasicDocumentDtoSchema.optional(),
  plan1st: Plan1stDocumentDtoSchema.optional(),
  memo: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type SaveCustomerMoveinDocumentStatusRequestDto = z.infer<
  typeof formSchema
>;