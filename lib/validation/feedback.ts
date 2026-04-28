import { z } from 'zod';

export const feedbackSchema = z.object({
  module: z.string().min(1).max(80),
  message: z.string().min(8).max(2000),
  email: z
    .string()
    .trim()
    .max(320)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Érvénytelen e-mail cím'),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

