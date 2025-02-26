import { z } from '@/config/zod';
import { tryParseToNumber, tryCastEmptyToNull, tryParseCurrencyToNumber } from '@/utils/general';

const InquiryCreateOrEdit = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    name: z.string().min(1, '事業所名を入力してください').max(128, '128文字以内で入力してください'),
    gana: z
    .string()
    .max(128, "128文字以内で入力してください")
    .regex(/^[\u30A0-\u30FF\uFF65-\uFF9F\u3040-\u309F]*$/, "ふりがなはカナ文字でなければなりません")
    .nullable().default(null),
    sex: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    age: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    status: z.preprocess(tryParseToNumber, z.number().nullable().refine(value => value !== null, 'この壁は空にしてはいけません。')),
    nextAction: z.string().max(256, '256文字以内で入力してください').nullable().default(null),
    updatedAt: z.string().nullable().default(null),
    inquirySrcName: z.string().nullable().default(null),
    inquirySrcStaff: z.string().nullable().default(null),
    inquirySrcRoute: z.string().nullable().default(null),
    inquirySrcPhone: z.string().nullable().default(null),
    inquirySrcLink: z.string().nullable().default(null)
});

const InquiryDetailCreateOrEdit = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    inquiryInfoId: z.preprocess(tryParseToNumber, z.number().nullable().refine(value => value !== null, 'この壁は空にしてはいけません。')),
    status: z.preprocess(tryParseToNumber, z.number().nullable().refine(value => value !== null, 'この壁は空にしてはいけません。')),
    homeId: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    ghData: z.string().max(32, '32文字以内で入力してください').nullable().default(null),
    date: z.string().nullable().default(null),

    breakdownSelf: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    breakdownFamily: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    breakdownCounselor: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    breakdownSupport: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    breakdownThirdParty: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),

    recordTime: z.string().nullable().default(null),
    recordVisitTime: z.string().nullable().default(null),
    recordFreeTrial: z.string().nullable().default(null),
    recordPaidTrial: z.string().nullable().default(null),
    recordSsCompletion: z.string().nullable().default(null),
    recordContractDate: z.string().nullable().default(null),
    recordPlanStatus: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    
    updatedAt: z.string().nullable().default(null),
});

const ProfileCreateOrEdit = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    introducerName: z.string().nullable().default(null),
    introducerType: z.string().nullable().default(null),
    introducerAddr: z.string().nullable().default(null),
    disabledType: z.string().nullable().default(null),
    disabledClass: z.string().nullable().default(null),
    pocketBookType: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    pocketBookGrade: z.string().nullable().default(null),
    pocketBookWheelChair: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    serviceDays: z.string().nullable().default(null),
    serviceName: z.string().nullable().default(null),
    serviceAddr: z.string().nullable().default(null),
    serviceVisit: z.string().nullable().default(null),
    serviceEtc: z.string().nullable().default(null),
    serviceRecipient: z.string().nullable().default(null),
    residenceType: z.string().nullable().default(null),
    updatedAt: z.string().nullable().default(null),
    
});

const InquiryHearingValForm = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    inquiryInfoId: z.preprocess(tryParseToNumber, z.number().nullable().refine(value => value !== null, 'この壁は空にしてはいけません。')),
    result: z.string().max(512, '512文字以内で入力してください').nullable().default(null),
    prospect: z.string().max(512, '512文字以内で入力してください').nullable().default(null),
    remark: z.string().max(512, '512文字以内で入力してください').nullable().default(null),
    updatedAt: z.string().nullable().default(null),
});

const InquiryHearingDetailValForm = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    hearingInfoId: z.preprocess(tryParseToNumber, z.number().nullable().refine(value => value !== null, 'この壁は空にしてはいけません。')),
    step: z.preprocess(
        tryParseToNumber,
        z.number()
          .nullable()
          .refine(value => value !== null, 'この壁は空にしてはいけません。')
          .refine(value => value > 0, '値は0より大きくなければなりません。')
    ),
    contents: z.string().max(512, '512文字以内で入力してください').nullable().default(null),
    updatedAt: z.string().nullable().default(null),
});

export { InquiryCreateOrEdit, InquiryDetailCreateOrEdit, ProfileCreateOrEdit, InquiryHearingValForm, InquiryHearingDetailValForm};
