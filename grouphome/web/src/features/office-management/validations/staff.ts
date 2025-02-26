import { z } from '@/config/zod';

const StaffSave = z.object({
    id: z.number().min(1, { message: 'IDが不正です' }),
})

const StaffSaveQualification = z.object({
    id: z.number().min(1, { message: 'IDが不正です' }),
})

export { StaffSave, StaffSaveQualification };
