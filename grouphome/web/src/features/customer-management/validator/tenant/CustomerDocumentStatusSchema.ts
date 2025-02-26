import { z } from "zod";

export const DocumentStatusItemSchema = z.object({
  apply: z.boolean().optional(),
  fileId: z.number().int().optional(),
});

export const MonitoringSchema = z.object({
  id: z
    .number({ message: "IDは必須項目です。" })
    .int()
    .min(0, { message: "IDは0以上の値でなければなりません。" })
    .optional(),
  apply: z.boolean().optional(),
  fileId: z.number().int().optional(),
});

export const formSchema = z.object({
  id: z.number().int().optional(),
  customerId: z.number({ message: "顧客IDは必須項目です。" }),
  tour: DocumentStatusItemSchema.optional(),
  assessment: DocumentStatusItemSchema.optional(),
  trial: DocumentStatusItemSchema.optional(),
  trialImportantExperience: DocumentStatusItemSchema.optional(),
  usageContract: DocumentStatusItemSchema.optional(),
  importantExperience: DocumentStatusItemSchema.optional(),
  plan: DocumentStatusItemSchema.optional(),
  monitoring: z.array(MonitoringSchema).optional(),
  updatedAt: z.string().optional(),
});

export type MonitoringDto = z.infer<typeof MonitoringSchema>;
export type SaveCustomerDocumentStatusRequestDto = z.infer<typeof formSchema>;
