import { z } from 'zod';

export const PersonalSchema = z.object({
  nickname: z
    .string()
    .max(255, "ニックネームは255文字以内である必要があります")
    .optional(),
  birthDay: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "生年月日はyyyy/MM/dd形式でなければなりません")
    .nullable()
    .optional(),
  sex: z
    .string()
    .regex(/^([0-2])?$/, "性別は0（女性）、1（男性）、または2（その他）でなければなりません")
    .optional(),
});

export const DetailsSchema = z.object({
  disabilityType: z.string().max(255, "障害種別と特性（症状名等）は255文字以内である必要があります").optional(),
  mentallyDisabled: z.boolean().optional(),
  severelyDisabled: z.boolean().optional(),
  behavioralDisorder: z.boolean().optional(),
  homeCare: z.boolean().optional(),
  usedOffice: z.string().max(255, "利用事業所名は255文字以内である必要があります").optional(),
  usedPace: z
    .number()
    .optional(),
  beforePlace: z.string().max(255, "入居前の生活場所は255文字以内である必要があります").optional(),
  beforeOffice: z.string().max(255, "入居前の居住系利用サービス事業所名①は255文字以内である必要があります").optional(),
  beforeService2: z.string().max(255, "入居前の利用福祉サービス②は255文字以内である必要があります").optional(),
  beforeServiceOffice2: z.string().max(255, "入居前の利用サービス事業所名は255文字以内である必要があります").optional(),
  beforeService3: z.string().max(255, "入居前の利用福祉サービス③は255文字以内である必要があります").optional(),
  beforeServiceOffice3: z
    .string()
    .max(255, "入居前の利用サービス事業所名は255文字以内である必要があります")
    .optional(),
  memo: z.string().optional(),
});

export const formSchema = z.object({
  id: z
    .number()
    .optional(),
  name: z.string().max(128, "氏名は128文字以内である必要があります").optional(),
  nameGana: z
    .string()
    .max(128, "氏名(ふりがな)は128文字以内である必要があります")
    .regex(/^[\u30A0-\u30FF\uFF65-\uFF9F\u3040-\u309F]*$/, "氏名(ふりがな)はカナ文字でなければなりません")
    .optional(),
  personal: PersonalSchema.optional(),
  details: DetailsSchema.optional(),
  category: z
    .number()
    .optional(),
  baseCustomerId: z.number().optional(),
  updatedAt: z.string().optional(),
});
