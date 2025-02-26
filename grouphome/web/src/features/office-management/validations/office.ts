import { z } from '@/config/zod';
import { PostalAddress } from './address';
import { tryParseToNumber, tryCastEmptyToNull, tryParseCurrencyToNumber } from '@/utils/general';

const OfficeCreateOrEdit = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    addrId: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    no: z.preprocess(tryParseToNumber, z.number().min(0)),
    branchName: z.string().min(1, '事業所名を入力してください').max(255, '255文字以内で入力してください'),
    homeId: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    homeName: z.string().nullable().default(null),
    groupHomeTypeId: z.preprocess(tryParseToNumber, z.number().nullable().optional().refine(val => val === undefined || val === null || val >= 0, '0以上でなければなりません')),
    classDivisionId: z.preprocess(tryParseToNumber, z.number().nullable().optional().refine(val => val === undefined || val === null || val >= 0, '0以上でなければなりません')),
    fee: z.preprocess(tryParseToNumber, z.union([z.number().min(1, '1～999,999の整数を入力してください').max(999999, '6桁以内の金額を入力してください'), z.null()])).optional(),
    tel: z.preprocess(tryCastEmptyToNull, z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').nullable().default(null)),
    fax: z.preprocess(tryCastEmptyToNull, z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').nullable().default(null)),
    officeNoGH: z.preprocess(tryParseToNumber, z.number().max(9999999999, '10桁の数字を入力してください').nullable().default(null)),
    officeNoSS: z.preprocess(tryParseToNumber, z.number().max(9999999999, '10桁の数字を入力してください').nullable().default(null)),
    officeNoA: z.preprocess(tryParseToNumber, z.number().max(9999999999, '10桁の数字を入力してください').nullable().default(null)),
    officeNoB: z.preprocess(tryParseToNumber, z.number().max(9999999999, '10桁の数字を入力してください').nullable().default(null)),
    memo: z.string().max(255, '255文字以内で入力してください').nullable().default(null),
}).and(PostalAddress);

const OfficePersonStructureCreateOrEdit = z.object({
    id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    adminName: z.string().max(128, '128文字以内で入力してください').nullable().default(null),
    visitingAmount: z.preprocess(tryParseToNumber, z.number().min(1, '1～999の整数を入力してください').max(999, '1～999の整数を入力してください').nullable().default(null)),
    serviceMngName1: z.string().nullable().default(null),
    trainingType1: z.string().nullable().default(null),
    trainingDate1: z.string().nullable(),
    trainingLimit1: z.string().nullable(),
    serviceMngName2: z.string().nullable().default(null),
    trainingType2: z.string().nullable().default(null),
    trainingDate2: z.string().nullable(),
    trainingLimit2: z.string().nullable(),
    supporter: z.array(z.any()).nullable().default(null),
    welfare: z.array(z.any()).nullable().default(null),
    nurseNames: z.array(z.any()).nullable().default(null),
});

const OfficeUnitInfoCreateOrEdit = z.object({
    unitId: z.preprocess(tryParseToNumber, z.number().nullable()),
    name: z.string().max(128, '128文字以内で入力してください').min(1, '1文字以上で入力してください'),
    startDate: z.string().nullable().default(null),
    mail: z.preprocess(tryCastEmptyToNull, z.string().email('正しいメールアドレス形式で入力してください').max(255, '255文字以内で入力してください').nullable().default(null)),
    capacity: z.preprocess(tryParseToNumber, z.number().int().min(1, '1～999の整数を入力してください').max(999, '1～999の整数を入力してください').nullable().default(null)),
    tel: z.preprocess(tryCastEmptyToNull, z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').nullable().default(null)),
    fax: z.preprocess(tryCastEmptyToNull, z.string().regex(/^[0-9-]{0,13}$/, '半角ハイフンを含めて13桁以内で入力してください').nullable().default(null)),
    featuresSystem: z.boolean().default(false),
    featuresBarrierFree: z.boolean().default(false),
    featuresMenOnly: z.boolean().default(false),
    featuresWomenOnly: z.boolean().default(false),
    concept: z.string().max(255, '255文字以内で入力してください').nullable().default(null),
    homeId: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    addrId: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
    serviceGH: z.boolean().default(false),
    serviceSS: z.boolean().default(false),
    updatedAtAddr: z.string().nullable().default(null),
    updatedAtUnit: z.string().nullable().default(null),
}).and(PostalAddress);

const OfficeRoomCreateOrEdit = z.object({
    name: z.string().max(128, '128文字以内で入力してください').min(1, '1文字以上で入力してください'),
    fee: z.preprocess(tryParseCurrencyToNumber, z.union([z.number().min(1, '1～999,999の整数を入力してください').max(999999, '6桁以内の金額を入力してください'), z.null()])).optional(),
});

export { OfficeCreateOrEdit, OfficePersonStructureCreateOrEdit, OfficeUnitInfoCreateOrEdit, OfficeRoomCreateOrEdit };
