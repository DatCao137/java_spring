import { z } from 'zod';

const formSchemaMeeting = z.object({
  username: z
    .string()
    .optional(),
  writtenBy: z
    .string()
    .optional(),
  date: z.date().nullable().optional(),
  timeStart: z.string().nullable().optional(),
  timeEnd: z.string().nullable().optional(),
  venue: z
    .string()
    .optional(),
  meetingAttendees: z.object({
    profession1: z.string().optional(),
    name1: z.string().optional(),
    profession2: z.string().optional(),
    name2: z.string().optional(),
    profession3: z.string().optional(),
    name3: z.string().optional(),
    profession4: z.string().optional(),
    name4: z.string().optional(),
    profession5: z.string().optional(),
    name5: z.string().optional(),
    profession6: z.string().optional(),
    name6: z.string().optional(),
    profession7: z.string().optional(),
    name7: z.string().optional(),
    profession8: z.string().optional(),
    name8: z.string().optional(),
  }),
  itemsConsidered: z
    .string()
    .max(65535, { message: '備考は65535文字以内で入力してください。' })
    .optional(),
  resultsConsideration1: z
    .string()
    .max(65535, { message: '備考は65535文字以内で入力してください。' })
    .optional(),
  resultsConsideration2: z
    .string()
    .max(65535, { message: '備考は65535文字以内で入力してください。' })
    .optional(),
});

export const defaultValuesMeeting = {
  username: '',
  writtenBy: '',
  date: new Date(),
  dateStart: new Date(),
  dateEnd: new Date(),
  venue: '',
  meetingAttendees: {
    profession1: '', name1: '',
    profession2: '', name2: '',
    profession3: '', name3: '',
    profession4: '', name4: '',
    profession5: '', name5: '',
    profession6: '', name6: '',
    profession7: '', name7: '',
    profession8: '', name8: '',
  },
  itemsConsidered: '',
  resultsConsideration1: '',
  resultsConsideration2: '',
};

export default formSchemaMeeting;
