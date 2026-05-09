import { z } from 'zod';

function noDangerousMarkup(fieldLabel: string) {
  return z.string().superRefine((value, ctx) => {
    const v = value.toLowerCase();
    if (v.includes('<script') || v.includes('javascript:') || /on\w+\s*=/.test(v)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${fieldLabel}: veszelyes tartalom nem engedelyezett`,
      });
    }
  });
}

export const feedbackSchema = z.object({
  module: noDangerousMarkup('module').min(1).max(80),
  message: noDangerousMarkup('message').min(8).max(2000),
  email: z
    .string()
    .trim()
    .max(320)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Érvénytelen e-mail cím'),
  /** Cloudflare Turnstile token – kötelező, ha `FEEDBACK_TURNSTILE_SECRET_KEY` be van állítva. */
  turnstileToken: z
    .string()
    .max(4096)
    .optional()
    .transform((s) => (s == null || s.trim() === '' ? undefined : s.trim())),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
