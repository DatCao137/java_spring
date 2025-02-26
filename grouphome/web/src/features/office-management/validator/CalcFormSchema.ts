import { z } from 'zod';

const ItemSchema = z.object({
    requiredNotificationDate: z.boolean(),
    id: z.number().nullable().optional(),
    branchId: z.number(),
    startDate: z.string().date("日付を入力してください").nullable().optional(),
    notificationDate: z.string().nullable().optional(),
    validStartDate: z.string().date("日付を入力してください").nullable().optional(),
    validEndDate: z.string().date("日付を入力してください").nullable().optional(),
    calcItemsId: z.number(),
    value: z.string().array().nullable().optional()
       .or(z.string().nullable().optional()),
    remark: z.string().max(255, { message: '補足は255文字以下でなければなりません' }).nullable().optional(),
    updatedAt: z.string().nullable().optional(),
}).refine(({ notificationDate, requiredNotificationDate }) =>
    !((notificationDate == null || notificationDate == "") && requiredNotificationDate),
    {
            path:["notificationDate"],
            message: "入力必須です"
    }
)
export const CalcItemSchema = z.object({
    item: z.array(ItemSchema)
})

export const defaultValues = {
    item: []
}

export type SaveCalcRequestDto = z.infer<typeof CalcItemSchema>;
