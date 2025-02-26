import { PostalAddress } from '@/features/office-management/validations/address';
import { formatJPDate } from '@/utils/DateUtils';
import { z } from 'zod';

const formSchema = z.object({
  requestInfoId: z.number().nullable().default(null),
  requestInfoDetailId: z.number().nullable().default(null),
  requestType: z.enum(['VISIT', 'MOVEIN']).default('VISIT'),
  requestDate: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "無効な日付です。")
    .nullable()
    .optional(),
  requestItem: z.string({ message: 'Đây là trườNg bắt buộc' }),
  homeId: z
    .string()
    .optional(),
  remark: z
    .string()
    .max(65535, { message: '備考は65535文字以内で入力してください。' })
    .optional(),
  base: z.object({
    hopeItems: z.array(z.string()).optional().default([]),
    hopeOther: z
      .string()
      .max(255, 'その他の希望は255文字以下でなければなりません')
      .nullable()
      .optional(),

    name: z
      .string({ message: '名前が必要です' })
      .max(255, '名前は255文字以下でなければなりません'),

    gana: z
      .string({ message: 'カナが必要です' })
      .regex(/^[ぁ-ん]*$/, { message: 'ひらがなで入力してください' })
      .max(255, 'カナは255文字以下でなければなりません')
      .optional(),

    sex: z.string().optional(),

    age: z
      .number()
      .min(0, { message: '年齢は0以上でなければなりません' })
      .max(120, { message: '年齢は120未満でなければなりません' })
      .nullable()
      .optional(),
    address: PostalAddress,
    contact: z.object({
      tel: z
        .string()
        .regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください')
        .optional(),

      fax: z
        .string()
        .regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください')
        .optional(),

      mail: z
      .string()
      .max(255, {
        message: 'メールアドレスは255文字以下でなければなりません',
      })
      .nullable() 
      .optional() 
      .refine((val) => {
        if (!val){
          return true; 
        } else 
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val); 
      }, {
        message: '正しいメールアドレス形式で入力してください',
      })
    }),
    disability: z.object({
      name: z
        .string()
        .max(255, { message: '障害名は255文字以下でなければなりません' })
        .optional(),

      type: z
        .string()
        .max(255, { message: '障害の種類は255文字以下でなければなりません' })
        .regex(/^\d*$/, {
          message: 'disabilityTypeは数字のみを含むことができます',
        })
        .optional(),
      pocketbook: z.object({
        has: z.boolean().nullable().optional(),
        contents: z
          .string()
          .max(255, {
            message: 'ポケットブックの内容は255文字以下でなければなりません',
          })
          .nullable()
          .optional(),
      }),
    }),
    recipient: z.object({
      has: z.boolean().nullable().optional(),
    }),
    visiting: z.object({
      has: z.boolean().nullable().optional(),
      contents: z
        .string()
        .max(255, {
          message: '訪問内容は255文字以下でなければなりません',
        })
        .nullable()
        .optional(),
    }),
    attached: z.object({
      has: z.boolean().nullable().optional(),
      contents: z
        .string()
        .max(255, {
          message: '添付内容は255文字以下でなければなりません', // Thông báo lỗi khi độ dài vượt quá 255 ký tự
        })
        .nullable()
        .optional(),
      isBring: z.boolean().default(false),
    }),
  }),
  attendant: z.object({
    name: z
      .string({ message: '付添人の名前が必要です' })
      .max(255, { message: '付添人の名前は255文字以下でなければなりません' }),
    contact: z.object({
      tel: z
        .string()
        .regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください')
        .optional(),
      fax: z
        .string()
        .regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください')
        .optional(),
      mail: z
        .string()
        .max(255, {
          message: 'メールアドレスは255文字以下でなければなりません',
        })
        .nullable() 
        .optional() 
        .refine((val) => {
          if (!val){
            return true; 
          } else 
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val); 
        }, {
          message: '正しいメールアドレス形式で入力してください',
        })
    }),
  }),
  desired: z.object({
    count: z.number().min(0, { message: "希望人数は0以上でなければなりません。" }).nullable().optional(),
    attribute: z.array(z.string()).optional().default([]),
    contactInfo: z
      .string()
      .max(255, { message: '連絡先は255文字以下でなければなりません' })
      .optional(),
  }),
  desiredDate: z.object({
    first: z.object({
      date: z.string().nullable().optional(), 
      time: z.string().optional(),
    }),
    second: z.object({
      date: z.string().nullable().optional(),
      time: z.string().optional(),
    }),
  }),
  etc: z.string().optional(),
});

export const defaultValues = {
  requestDate: formatJPDate(String(new Date()), "YYYY-MM-DD"),
  requestItem: 'VISIT',
  homeId: '',
  base: {
    hopeItems: [],
    hopeOther: '',
    name: '',
    gana: '',
    sex: '',
    age: undefined,
    address: {
      postNo1st: '',
      postNo2nd: '',
      prefId: null,
      city: '',
      town: '',
    },
    contact: {
      tel: '',
      fax: '',
      mail: undefined,
    },
    disability: {
      name: '',
      type: undefined,
      pocketbook: {
        has: null,
        contents: '',
      },
    },
    recipient: {
      has: null,
    },
    visiting: {
      has: null,
      contents: '',
    },
    attached: {
      has: null,
      contents: '',
      isBring: false,
    },
  },
  attendant: {
    name: '',
    contact: {
      tel: '',
      fax: '',
      mail: undefined,
    },
  },
  desired: {
    count: undefined,
    attribute: [],
    contactInfo: '',
  },
  etc: '',
  desiredDate: {
    first: {
      date: null,
      time: '',
    },
    second: {
      date: null,
      time: '',
    },
    desired: '',
  },
  remark: '',
};

export default formSchema;
