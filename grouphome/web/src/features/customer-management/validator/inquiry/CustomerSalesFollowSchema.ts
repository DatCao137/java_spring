import { z } from '@/config/zod';
import { tryCastEmptyToNull, tryParseToNumber } from '@/utils/general';

const CustomerSalesFollowSave = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    salesInfoId: z.number().min(1, { message: 'salesInfoIdが不正です' }),
    step: z.preprocess(tryParseToNumber, z.number().min(1, '1～999の整数を入力してください').max(999, '1～999の整数を入力してください')),
    staffId: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    followDate: z.string().nullable().optional(),
})

export { CustomerSalesFollowSave };
