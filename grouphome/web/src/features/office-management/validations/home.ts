import { z } from '@/config/zod';
import { PostalAddress } from './address';
import { tryParseToNumber, tryCastEmptyToNull } from '@/utils/general';


const HomeCreateOrEdit = z
    .object({
        id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
        homeName: z.string().max(255, '255文字以内で入力してください').transform(value => (value && value.trim() !== '' ? value : null)).refine(value => value !== null, 'ホーム名を入力してください'),
        branchId: z.preprocess(tryParseToNumber, z.number().nullable().refine(value => value !== null, '事業所名を選んてください')),
        branchName: z.string().max(255, '255文字以内で入力してください').nullable().default(null),
        tel: z.preprocess(tryCastEmptyToNull, z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').nullable().default(null)),
        addrId: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
        units: z.string().nullable().default(null),
        updatedAtAddr: z.string().nullable().default(null),
        updatedAtHome: z.string().nullable().default(null)
    })
    .and(PostalAddress);

export { HomeCreateOrEdit };
