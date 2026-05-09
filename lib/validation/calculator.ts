import { z } from 'zod';

const semesterSubjectSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(200),
  credits: z.number().int().min(0).max(60),
  grade: z.number().min(1).max(5),
  ghost: z.boolean().default(false),
});

const semesterSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(200),
  ghost: z.boolean(),
  subjects: z.array(semesterSubjectSchema),
});

/** API + localStorage mentés validálása. */
export const calculatorStateSchema = z.object({
  semesters: z.array(semesterSchema).max(50),
});

export type CalculatorStatePayload = z.infer<typeof calculatorStateSchema>;
