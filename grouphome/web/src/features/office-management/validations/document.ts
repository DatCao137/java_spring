import { z } from '@/config/zod';
import { tryParseToNumber, tryCastEmptyToNull } from '@/utils/general';


const DocManageValidation = z
    .object({
        id: z.preprocess(tryParseToNumber, z.number().nullable().default(null)),
        docName: z.string().min(1, '文書名を入力してください').max(255, '255文字以内で入力してください'),
        fileName: z.string().min(1, 'ファイルを入力してください').max(255, '255文字以内で入力してください'),
        comment: z.string().nullable().default(null),
    })
export { DocManageValidation };
