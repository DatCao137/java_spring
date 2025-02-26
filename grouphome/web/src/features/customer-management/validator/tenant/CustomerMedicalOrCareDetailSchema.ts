import { z } from 'zod';

export const formSchema = z.object({
  id: z.number().optional(),
  medicalId: z.number(),
  careId: z.number(),
  customerId: z.number(),
  sub: z
    .number()
    .optional(),

  useCompany: z
    .string({ message: "利用事業者を入力してください" })
    .min(1, { message: "利用事業者を入力してください" })
    .max(128, { message: "利用事業者は128文字以内で入力してください。" }),

  serviceName: z
    .string({ message: "利用サービス名を入力してください" })
    .min(1, { message: "利用サービス名を入力してください" })
    .max(128, { message: "利用サービス名は128文字以内で入力してください。" }),

  institution: z
    .string({ message: "利用機関名を入力してください" })
    .min(1, { message: "利用機関名を入力してください" })
    .max(128, { message: "利用機関名は128文字以内で入力してください。" }),

  status: z
    .number()
    .min(1, { message: "ステータスを入力してください" }),

  pace: z
    .number()
    .min(1, { message: "利用頻度を入力してください" }),

  updatedAt: z.string().optional(),
});

export type SaveCustomerMedicalOrCareDetailRequest = z.infer<typeof formSchema>;
