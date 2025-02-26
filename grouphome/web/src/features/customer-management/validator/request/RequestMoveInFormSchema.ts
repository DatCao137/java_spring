import { PostalAddress } from '@/features/office-management/validations/address';
import { formatJPDate } from '@/utils/DateUtils';
import { z } from 'zod';

const positiveNumberOrEmptyRegex = /^(|[1-9]\d*)$/;

const MoveInTelSchema = z.object({
  type: z.string().optional(),
  no: z
    .string()
    .regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください')
    .optional(),
  inner: z
    .string()
    .regex(/^[0-9]{0,5}$/, '半角数字5桁以内で入力してください')
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
});

const MoveInAddressSchema = z.object({
  address: PostalAddress,
  tel: MoveInTelSchema,
});

const MoveInBookItemSchema = z.object({
  has: z.boolean().default(false),
  degree: z
    .string()
    .max(255, { message: '度合いは255文字以下でなければなりません' })
    .optional(),
});

const MoveInBookSchema = z.object({
  has: z.boolean().nullable().optional(),
  physical: MoveInBookItemSchema,
  treatment: MoveInBookItemSchema,
  mental: MoveInBookItemSchema,
});

const MoveInHistoryItemSchema = z.object({
  name: z
    .string()
    .max(255, { message: '名前は255文字以下でなければなりません' })
    .optional(),
  medical: z
    .string()
    .max(255, { message: '医療情報は255文字以下でなければなりません' })
    .optional(),
});

const MoveInPhysicalInfoSchema = z.object({
  height: z
    .number()
    .min(0, { message: '身長は0から3桁以内の数字で入力してください。'})
    .max(999, { message: '身長は0から3桁以内の数字で入力してください。'})
    .nullable()
    .optional(),

  weight: z
    .number()
    .min(0, { message: '体重は0から4桁以内の数字で入力してください。'})
    .max(9999, { message: '体重は0から4桁以内の数字で入力してください。'})
    .nullable()
    .optional(),
  lifestyle: z.object({
    has: z.boolean().nullable().optional(),
    contents: z
      .string()
      .max(500, { message: '内容は500文字以下でなければなりません' })
      .nullable()
      .optional(),
  }),
  wakeUpTime: z.string().optional(),
  sleepingTime: z.string().optional(),
  alcohol: z.object({
    has: z.boolean().nullable().optional(),
  }),
  tobacco: z.object({
    has: z.boolean().nullable().optional(),
  }),
});

const FamilyItemSchema = z.object({
  name: z
    .string()
    .max(255, { message: '名前は255文字以下でなければなりません' })
    .optional(),
  gana: z
    .string()
    .max(255, { message: 'カナは255文字以下でなければなりません' })
    .regex(/^[ぁ-ん]*$/, { message: 'ひらがなで入力してください' }),
  relationship: z
    .string()
    .max(255, { message: '関係は255文字以下でなければなりません' })
    .optional(),
  together: z.object({
    has: z.boolean().nullable().optional(),
    address: PostalAddress,
  }),
});

const MoveInInsuranceSchema = z.object({
  type: z.object({
    type: z
      .string()
      .max(25, { message: 'タイプは25文字以下でなければなりません' })
      .optional(), // Optional
    contents: z
      .string()
      .max(65535, { message: '内容は65535文字以下でなければなりません' })
      .optional(),
  }),
  care: z.object({
    has: z.boolean().nullable().optional(),
  }),
  limit: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "無効な日付です。")
    .nullable()
    .optional(),
  expenses: z.object({
    type: z.string().optional(),
    limit: z.number().nullable().optional(),
  }),
});

const MoveInSituationSchema = z.object({
  place: z.object({
    has: z.boolean().nullable().optional(),
    contents: z
      .string()
      .max(500, { message: '内容は500文字以下でなければなりません' })
      .optional(),
  }),
  etcService: z
    .string()
    .max(500, { message: 'その他のサービスは500文字以下でなければなりません' })
    .optional(),
  activity: z.object({
    weeks: z.array(z.string()).optional().default([]),
    startHour: z
      .string()
      .max(8, { message: '開始時間は8文字以下でなければなりません' })
      .optional(),
    endHour: z
      .string()
      .max(8, { message: '終了時間は8文字以下でなければなりません' })
      .optional(),
    notes: z
      .string()
      .max(255, { message: 'ノートは255文字以下でなければなりません' })
      .optional(),
  }),
  transfer: z.object({
    transferType: z
      .string()
      .max(4, { message: '転送タイプは4文字以内でなければなりません' })
      .optional(),
    transportationType: z
      .string()
      .max(4, { message: '輸送タイプは4文字以内でなければなりません' })
      .optional(),
    contents: z
      .string()
      .max(500, { message: '内容は500文字以内でなければなりません' })
      .nullable()
      .optional(),
  }),
  needSupport: z.object({
    has: z.boolean().nullable().optional(),
    contents: z
      .string()
      .max(500, { message: '内容は500文字以内でなければなりません' })
      .nullable()
      .optional(),
  }),
  howToSpend: z
    .string()
    .max(500, { message: '支出方法は500文字以内でなければなりません' })
    .optional(),
  medication: z.object({
    has: z.boolean().nullable().optional(),
    contents: z
      .string()
      .max(500, { message: '薬の内容は500文字以内でなければなりません' })
      .nullable()
      .optional(),
  }),
  care: z.object({
    has: z.boolean().nullable().optional(),
    contents: z
      .string()
      .max(500, { message: 'ケアの内容は500文字以内でなければなりません' })
      .nullable()
      .optional(),
  }),
  money: z
    .string()
    .max(4, { message: '金額は4文字以内でなければなりません' })
    .optional(),
});

const RequestMoveInFormSchema = z.object({
  requestDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "有効な日付を入力してください"),
  requestType: z.string().default('MOVEIN'),
  requestItem: z.string({ message: 'リクエスト項目は必須です' }),
  homeId: z.string().optional(),
  desiredDate: z
    .string()
    .nullable()
    .optional(),
  remark: z
    .string()
    .max(6555, { message: '備考は6555文字以下でなければなりません' })
    .optional(),
  contents: z.object({
    name: z
      .string({ message: '名前が必要です' })
      .max(255, { message: '名前は255文字以下でなければなりません' }),

    gana: z
      .string({ message: 'カナが必要です' })
      .max(255, { message: 'カナは255文字以下でなければなりません' })
      .regex(/^[ぁ-ん]*$/, { message: 'ひらがなで入力してください' }),

    representative: z
      .string()
      .max(255, { message: '代筆者名は255文字以下でなければなりません' })
      .optional(),
    sex: z
      .string({ message: '性別は必須です' })
      .max(1, { message: '性別は1桁の数字でなければなりません' })
      .regex(/^[0-9]*$/, { message: '性別は数字のみを含めることができます' }),
    birth: z.object({
      era: z.string().optional(),
      date: z.string().nullable().optional(),
      age: z.string().nullable().optional(),
    }),
    currentAddress: MoveInAddressSchema,
    emergency: z.object({
      name: z
        .string()
        .max(255, {
          message: '緊急連絡先の名前は255文字以下でなければなりません',
        })
        .optional(),
      relationship: z
        .string()
        .max(100, { message: '関係は100文字以下でなければなりません' })
        .optional(),
      address: MoveInAddressSchema,
    }),
    underwriter: z.object({
      has: z.boolean().nullable().optional(),
      name: z
        .string()
        .max(255, { message: '引受人の名前は255文字以下でなければなりません' })
        .nullable()
        .optional(),
    }),
    successor: z.object({
      has: z.boolean().nullable().optional(),
      name: z
        .string()
        .max(255, { message: '後継者の名前は255文字以下でなければなりません' })
        .nullable()
        .optional(),
    }),
    motive: z
      .string()
      .max(500, { message: '動機は500文字以下でなければなりません' })
      .optional(),
    disabilityName: z
      .string()
      .max(255, { message: '障害名は255文字以下でなければなりません' })
      .optional(),
    disabilityClass: z
      .string()
      .max(255, { message: '障害等級は255文字以下でなければなりません' })
      .optional(),
    book: MoveInBookSchema,
    failureSituation: z
      .string()
      .max(255, { message: '失敗状況は255文字以下でなければなりません' })
      .optional(),
    history: z.array(MoveInHistoryItemSchema),
    allergy: z.string().max(255, 'アレルギーは最大255文字です').optional(),
    physicalInfo: MoveInPhysicalInfoSchema,
    family: z.array(FamilyItemSchema),
    insurance: MoveInInsuranceSchema,
    related: z.object({
      doctor: z.object({
        hospital: z.string().max(100, '病院名は最大100文字です').optional(),
        medicine: z.string().max(255, '薬名は最大255文字です').optional(),
        name: z.string().max(100, '名前は最大100文字です').optional(),
        address: PostalAddress,
        contact: z.object({
          tel: z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').optional(),
          mobile: z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').optional(),
          fax: z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').optional(),
        }),
      }),
      caseWorker: z.object({
        institutionName: z
          .string()
          .max(100, '機関名は最大100文字です')
          .optional(),
        name: z.string().max(100, '名前は最大100文字です').optional(),
        contact: z.object({
          tel: z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').optional(),
          mobile: z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').optional(),
          fax: z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').optional(),
        }),
      }),
    }),
    situation: MoveInSituationSchema,
    requirements: z.object({
      items: z.array(z.string()).optional().default([]),
      contents: z.string().max(500, '内容は最大500文字です').nullable().optional(),
    }),
    mental: z.string().max(500, 'メンタルは最大500文字です').optional(),
    goals: z.string().max(500, '目標は最大500文字です').optional(),
    requests: z.string().max(500, 'リクエストは最大500文字です').optional(),
    income: z.object({
      pension: z.object({
        available: z.boolean({ message: '有効な値を入力してください。' }).optional(),
        amount: z
          .string()
          .regex(positiveNumberOrEmptyRegex, { message: '正の数のみ入力してください。' })
          .optional(),
      }),
      welfare: z.object({
        available: z.boolean({ message: '有効な値を入力してください。' }).optional(),
        amount: z
          .string()
          .regex(positiveNumberOrEmptyRegex, { message: '正の数のみ入力してください。' })
          .optional(),
      }),
      pensionOther: z.object({
        available: z.boolean({ message: '有効な値を入力してください。' }).optional(),
        amount: z
          .string()
          .regex(positiveNumberOrEmptyRegex, { message: '正の数のみ入力してください。' })
          .optional(),
      }),
      working: z.object({
        available: z.boolean({ message: '有効な値を入力してください。' }).optional(),
        amount: z
          .string()
          .regex(positiveNumberOrEmptyRegex, { message: '正の数のみ入力してください。' })
          .optional(),
      }),
      familyAssist: z.object({
        available: z.boolean({ message: '有効な値を入力してください。' }).optional(),
        amount: z
          .string()
          .regex(positiveNumberOrEmptyRegex, { message: '正の数のみ入力してください。' })
          .optional(),
      }),
      others: z.object({
        available: z.boolean({ message: '有効な値を入力してください。' }).optional(),
        name: z.string().optional(),
        amount: z
          .string()
          .regex(positiveNumberOrEmptyRegex, { message: '正の数のみ入力してください。' })
          .optional(),
      }),
    }),
  }),
});

export const defaultValues = {
  requestDate: formatJPDate(String(new Date()), "YYYY-MM-DD"),
  remark: '',
  requestItem: 'EXP_FREE',
  desiredDate: null,
  contents: {
    name: '',
    gana: '',
    representative: '',
    sex: '',
    birth: {
      era: '',
      date: null,
      age: undefined,
    },
    currentAddress: {
      address: {
        postNo1st: '',
        postNo2nd: '',
        prefId: null,
        city: '',
        town: '',
      },
      tel: {
        type: '',
        no: '',
        inner: '',
        mail: undefined,
      },
    },
    emergency: {
      name: '',
      relationship: '',
      address: {
        address: {
          postNo1st: '',
          postNo2nd: '',
          prefId: null,
          city: '',
          town: '',
        },
        tel: {
          type: '',
          no: '',
          inner: '',
          mail: undefined,
        },
      },
    },
    underwriter: {
      has: null,
      name: '',
    },
    successor: {
      has: null,
      name: '',
    },
    motive: '',
    disabilityName: '',
    disabilityClass: '',
    book: {
      has: null,
      physical: {
        has: false,
        degree: '',
      },
      treatment: {
        has: false,
        degree: '',
      },
      mental: {
        has: false,
        degree: '',
      },
    },
    failureSituation: '',
    history: [
      {
        name: '',
        medical: '',
      },
    ],
    allergy: '',
    physicalInfo: {
      height: null,
      weight: null,
      lifestyle: {
        has: null,
        contents: '',
      },
      wakeUpTime: '',
      sleepingTime: '',
      alcohol: {
        has: null,
      },
      tobacco: {
        has: null,
      },
    },
    family: [
      {
        name: '',
        gana: '',
        relationship: '',
        together: {
          has: null,
          address: {
            postNo1st: '',
            postNo2nd: '',
            prefId: null,
            city: '',
            town: '',
          },
        },
      },
    ],
    insurance: {
      type: {
        type: '',
        contents: '',
      },
      care: {
        has: null,
      },
      limit: null,
      expenses: {
        type: '',
        limit: null,
      },
    },
    related: {
      doctor: {
        hospital: '',
        medicine: '',
        name: '',
        address: {
          postNo1st: '',
          postNo2nd: '',
          prefId: null,
          city: '',
          town: '',
        },
        contact: {
          tel: '',
          mobile: '',
          fax: '',
        },
      },
      caseWorker: {
        institutionName: '',
        name: '',
        contact: {
          tel: '',
          mobile: '',
          fax: '',
        },
      },
    },
    situation: {
      place: {
        has: null,
        contents: '',
      },
      etcService: '',
      activity: {
        weeks: [],
        startHour: '',
        endHour: '',
        notes: '',
      },
      transfer: {
        transferType: '',
        transportationType: '',
        contents: '',
      },
      needSupport: {
        has: null,
        contents: '',
      },
      howToSpend: '',
      medication: {
        has: null,
        contents: '',
      },
      care: {
        has: null,
        contents: '',
      },
      money: '',
    },
    requirements: {
      items: [],
      contents: '',
    },
    mental: '',
    goals: '',
    requests: '',
    income: {
      pension: {
        available: false,
        amount: '',
      },
      welfare: {
        available: false,
        amount: '',
      },
      pensionOther: {
        available: false,
        amount: '',
      },
      working: {
        available: false,
        amount: '',
      },
      familyAssist: {
        available: false,
        amount: '',
      },
      others: {
        available: false,
        name: '',
        amount: '',
      },
    }
  },
};

export default RequestMoveInFormSchema;
