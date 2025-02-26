import { z } from "zod";

const TrainingSchema = z.object({
    type: z.enum(["","basic", "update"]).default("basic").optional(),
    implementation: z.string().date("日付を入力してください").nullable().optional(),
    limit: z.string().date("日付を入力してください").nullable().optional()
})

const ServiceSchema = z.object({
    name: z.string().nullable().optional(),
    training: TrainingSchema,
});

const MemberSchema = z.object({
    name: z.array(z.number()).optional()
})
const ContractSchema = z.object({
    capacity: z.number().optional().optional(),
})

export const StructureFormSchema = z.object({
    id: z.number().nullable().optional().default(null),
    branchId: z.number().nullable().optional().default(null),
    managerName: z.string().optional(),
    service1: ServiceSchema.optional(),
    service2: ServiceSchema.optional(),
    lifeSupporter: MemberSchema.optional(),
    welfareWorker: MemberSchema.optional(),
    nurse: MemberSchema.optional(),
    visitingContract: ContractSchema.optional(),
    updatedAt: z.string().nullable().optional(),
});

export const defaultValues = {
    id: null,
    branchId: null,
    managerName: '',
    service1: {
        training: {
            type: undefined,
            implementation: '',
            limit: ''
        }
    },
    service2: {
        training: {
            type: undefined,
            implementation: '',
            limit: ''
        }
    },
    lifeSupporter: { name:[]},
    welfareWorker: { name:[]},
    nurse: { name: [] },
    visitingContract: { capacity: 0 },
};

export type SaveStructureRequestDto = z.infer<typeof StructureFormSchema>;