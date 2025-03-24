import { z } from '@/config/zod';
//import { PostalAddress } from '@/features/office-management/validations/address';
//import { PostalAddress } from './address';
import { tryParseToNumber, tryCastEmptyToNull } from '@/utils/general';


const EmployeeCreateOrEdit = z
    .object({
        id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
        name: z.string().max(255, '255文字以内で入力してください').transform(value => (value && value.trim() !== '' ? value : null)).refine(value => value !== null, 'ホーム名を入力してください'),
        //branchId: z.preprocess(tryParseToNumber, z.number().nullable().refine(value => value !== null, '事業所名を選んてください')),
        address: z.string().max(255, '255文字以内で入力してください').nullable().default(null),
        message: z.string().max(255, '255文字以内で入力してください').nullable().default(null),
        //tel: z.preprocess(tryCastEmptyToNull, z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').nullable().default(null)),
        birthDay: z.string().nullable().default(null),
        unitIdId: z.string().nullable().default(null),
        updatedAt: z.string().nullable().default(null)
    });

export { EmployeeCreateOrEdit };
