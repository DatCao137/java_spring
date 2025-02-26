import { z } from 'zod';

export const formSchema = z.object({
  id: z
    .number()
    .min(1, "idは1以上である必要があります")
    .nullable()
    .optional(),
  billingId: z
    .number()
    .min(1, "customerIdは1以上である必要があります")
    .nullable()
    .optional(),
  yyyymm: z.string({ required_error: "提供月は必須項目です。"}),
  nationalAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "国保連(※)はyyyy-MM-dd形式でなければなりません")
    .nullable()
    .optional(),
  selfGoverningAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "自治単独加算等(※)はyyyy-MM-dd形式でなければなりません")
    .nullable()
    .optional(),
  otherAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "その他助成金等(※)はyyyy-MM-dd形式でなければなりません")
    .nullable()
    .optional(),
  issueAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "利用料請求(発行日付)はyyyy-MM-dd形式でなければなりません")
    .nullable()
    .optional(),
  memo: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
});

