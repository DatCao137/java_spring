import { z } from '@/config/zod';
import { tryParseToNumber } from '@/utils/general';

const PostalAddress = z
  .object({
    postNo1st: z.string().nullable().transform((value) => (value === '' ? null : value)).refine((value) => value === null || /^\d{3}$/.test(value), { message: '3桁の数字でなければなりません' }),
    postNo2nd: z.string().nullable().transform((value) => (value === '' ? null : value)).refine((value) => value === null || /^\d{4}$/.test(value), { message: '4桁の数字でなければなりません' }),
    prefId: z.preprocess(tryParseToNumber, z.number().nullable().optional()).refine((value) => value === null || typeof value === 'number', { message: '数字でなければなりません' }),
    city: z.string().nullable(),
    town: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if ((data.postNo1st && !data.postNo2nd) || (!data.postNo1st && data.postNo2nd)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '郵便番号のフィールドは両方とも入力するか、両方とも空にする必要があります',
        path: ['postNoCombined'],
      });
    }
  });

export { PostalAddress };
