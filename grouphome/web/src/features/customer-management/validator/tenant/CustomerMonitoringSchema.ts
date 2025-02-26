import { z } from "zod";

export const formSchema = z.object({
  id: z.number().int({ message: "IDは整数である必要があります。" }).optional(),

  customerId: z.number({ required_error: "顧客IDは必須項目です。" }).int({ message: "顧客IDは整数である必要があります。" }),

  yyyymm: z
    .string({ required_error: "提供月は必須項目です。"}),
  info: z.object({
    lastUpdatedAt: z.string().nullable().optional(),
    plan: z
      .object({
        start: z.string().nullable().optional(),
        end: z.string().nullable().optional(),
        season: z.string().optional(),
      })
      .optional(),

    monitoring: z
      .object({
        store: z.boolean().optional(),
        sign: z.boolean().optional(),
        continueValue: z
          .number()
          .int({ message: "継続値は整数である必要があります。" })
          .min(0, { message: "継続値は0以上である必要があります。" })
          .optional(),
        createdAt: z.string().nullable().optional(),
        fileId: z
          .number()
          .int({ message: "ファイルIDは整数である必要があります。" })
          .min(1, { message: "ファイルIDは1以上である必要があります。" })
          .optional(),
      })
      .optional(),

    draft: z
      .object({
        store: z.boolean().optional(),
        sign: z.boolean().optional(),
        staff: z
          .number()
          .int({ message: "担当者IDは整数である必要があります。" })
          .min(1, { message: "担当者IDは1以上である必要があります。" })
          .optional(),
        createdAt: z.string().nullable().optional(),
        fileId: z
          .number()
          .int({ message: "ファイルIDは整数である必要があります。" })
          .min(1, { message: "ファイルIDは1以上である必要があります。" })
          .optional(),
      })
      .optional(),

    meeting: z
      .object({
        store: z.boolean().optional(),
        writeCheck: z.boolean().optional(),
        createdAt: z.string().nullable().optional(),
        fileId: z
          .number()
          .int({ message: "ファイルIDは整数である必要があります。" })
          .min(1, { message: "ファイルIDは1以上である必要があります。" })
          .optional(),
      })
      .optional(),

    main: z
      .object({
        store: z.boolean().optional(),
        sign: z.boolean().optional(),
        staff: z
          .number()
          .int({ message: "担当者IDは整数である必要があります。" })
          .min(1, { message: "担当者IDは1以上である必要があります。" })
          .optional(),
        createdAt: z.string().nullable().optional(),
        fileId: z
          .number()
          .int({ message: "ファイルIDは整数である必要があります。" })
          .min(1, { message: "ファイルIDは1以上である必要があります。" })
          .optional(),
      })
      .optional(),
  }),

  updatedAt: z.string().optional(),
});

export type SaveCustomerMonitoringRequestDto = z.infer<typeof formSchema>;
