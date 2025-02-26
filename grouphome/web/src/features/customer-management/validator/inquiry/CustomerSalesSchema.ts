import { z } from '@/config/zod';
import { tryCastEmptyToNull, tryParseToNumber } from '@/utils/general';

const CustomerSalesSave = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    inquiryInfoId: z.number().min(1, { message: 'inquiryInfoIdが不正です' }),
    firstInquiryDate: z.string().nullable().default(null),
    mail: z.preprocess(tryCastEmptyToNull, z.string().email('正しいメールアドレス形式で入力してください').max(255, '255文字以内で入力してください').nullable().default(null)),
    tel: z.preprocess(tryCastEmptyToNull, z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').nullable().default(null)),
    fax: z.preprocess(tryCastEmptyToNull, z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').nullable().default(null)),
})

export { CustomerSalesSave };
