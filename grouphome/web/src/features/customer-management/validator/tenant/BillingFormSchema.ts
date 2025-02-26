import { z } from 'zod';

export const formSchema = z.object({
  id: z
    .number()
    .min(1, "idは1以上である必要があります")
    .nullable()
    .optional(),
  customerId: z
    .number()
    .min(1, "customerIdは1以上である必要があります")
    .nullable()
    .optional(),
    movein1stAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "本入居分（初回）はyyyy-MM-dd形式でなければなりません")
    .nullable()
    .optional(),
  originalRequestAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "口座振替依頼書原本発送はyyyy-MM-dd形式でなければなりません")
    .nullable()
    .optional(),
  rpInputAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "口座振替RP入力はyyyy-MM-dd形式でなければなりません")
    .nullable()
    .optional(),
  transfer1stAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "初回口座振替日はyyyy-MM-dd形式でなければなりません")
    .nullable()
    .optional(),
  remark: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

