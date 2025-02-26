import { z } from "zod";

export const RecipientSchema = z.object({
  no: z
    .string()
    .max(255, "受給者番号は最大255文字までです。")
    .optional(),
  certificateGH: z.boolean().optional(),
  limit: z
    .string()
    .max(255, "支給決定期限は最大255文字までです。")
    .nullable()
    .optional(),
});

export const DisabledSchema = z.object({
  category: z
    .number()
    .min(0, "障害者支援区分は0以上でなければなりません。")
    .max(255, "障害者支援区分は255以下でなければなりません。")
    .optional(),
  limit: z
    .string()
    .max(255, "認定期限は最大255文字までです。")
    .nullable()
    .optional(),
});

export const LimitSchema = z.object({
  amount: z
    .number()
    .min(0, "上限額管理は0以上でなければなりません。")
    .optional(),
  limit: z
    .string()
    .max(255, "上限額管理期限は最大255文字までです。")
    .nullable()
    .optional(),
});

export const formSchema = z.object({
  id: z.number().optional(),
  customerId: z
    .number({
      message: "顧客IDは必須項目です。",
    }),
  recipient: RecipientSchema.optional(),
  disabled: DisabledSchema.optional(),
  limit: LimitSchema.optional(),
  visitingPlace: z
    .string()
    .max(128, "通所先は最大128文字までです。")
    .optional(),
  service: z
    .string()
    .max(128, "サービスは最大128文字までです。")
    .optional(),
  handbookType: z
    .string()
    .max(10, "障がい者手帳種類は最大10文字までです。")
    .optional(),
  updatedAt: z.string().optional(),
});

export type RecipientData = z.infer<typeof RecipientSchema>;
export type DisabledData = z.infer<typeof DisabledSchema>;
export type LimitData = z.infer<typeof LimitSchema>;
export type SaveCustomerHandbookStatusRequestDto = z.infer<typeof formSchema>;
