import { z } from "zod";

export const formSchema = z.object({
  id: z.number().optional(),
  customerId: z.number().optional(),
  insuranceTypeId: z.number({ message: "保険証種別を入力してください" }),
  number: z.string({ message: "記号-番号-枝番（半角）を入力してください" })
    .min(1, { message: "記号-番号-枝番（半角）を入力してください" })
    .max(15, { message: "記号-番号-枝番（半角）は15文字以内である必要があります" }),
  updatedAt: z.string().optional(),
});

export type SaveCustomerMedicalRequestDto = z.infer<typeof formSchema>;
