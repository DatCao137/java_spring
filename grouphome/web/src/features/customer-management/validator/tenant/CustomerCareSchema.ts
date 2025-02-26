import { z } from "zod";

export const careSchema = z.object({
  id: z.number().min(1, { message: "idは1以上である必要があります" }).optional(),
  customerId: z.number({ message: 'customerIdはnullではいけません' }),
  careNo: z.string({ message: '介護保険被保険者証(番号)は必須項目です。' })
    .min(1, { message: "介護保険被保険者証(番号)は空ではいけません。" })
    .max(10, "介護保険被保険者証(番号)は最大10文字までです。"),
  careTypeId: z.number().int().min(0, "要介護区分は0以上でなければなりません。").max(255, "要介護区分は255以下でなければなりません。"),
  limit: z.number().min(0, "支給限度額は0以上でなければなりません。").max(4294967295, { message: '支給限度額は許可された上限を超えています。' }).optional(),
  updatedAt: z.string().optional(),
});

export type SaveCustomerCareRequestDto = z.infer<typeof careSchema>;
