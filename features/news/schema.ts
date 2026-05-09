import { z } from 'zod';

const newsSource = z.enum(['internal', 'facebook', 'instagram']);
const writableStatus = z.enum(['draft', 'scheduled', 'published', 'archived']);
const coverTone = z.enum(['blue', 'pink', 'teal', 'gold']);

function optionalHttpUrl() {
  return z
    .string()
    .max(2000)
    .optional()
    .transform((s) => (s == null || s.trim() === '' ? undefined : s.trim()))
    .refine((s) => {
      if (s === undefined) return true;
      try {
        new URL(s);
        return true;
      } catch {
        return false;
      }
    }, 'Érvénytelen URL');
}

function noActiveScriptPayload(fieldLabel: string) {
  return z.string().superRefine((value, ctx) => {
    const v = value.toLowerCase();
    if (v.includes('<script') || v.includes('javascript:') || /on\w+\s*=/.test(v)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${fieldLabel}: veszelyes script-tartalom nem engedelyezett`,
      });
    }
  });
}

const newsCreateFields = z.object({
  source: newsSource.default('internal'),
  category: noActiveScriptPayload('category').min(1).max(200),
  status: writableStatus.default('draft'),
  pinned: z.boolean().optional().default(false),
  listDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .transform((d) => d ?? new Date().toISOString().slice(0, 10)),
  titleHu: noActiveScriptPayload('titleHu').min(1).max(500),
  titleEn: noActiveScriptPayload('titleEn').min(1).max(500),
  textHu: noActiveScriptPayload('textHu').min(1).max(10000),
  textEn: noActiveScriptPayload('textEn').min(1).max(10000),
  author: noActiveScriptPayload('author').min(1).max(200),
  cover: coverTone.default('blue'),
  hasCover: z.boolean().optional().default(true),
  /** Üres = automatikus slug a címből. */
  slug: z
    .string()
    .max(200)
    .optional()
    .transform((s) => (s == null ? undefined : s.trim() || undefined)),
  coverAltHu: noActiveScriptPayload('coverAltHu').max(500).optional().default(''),
  coverAltEn: noActiveScriptPayload('coverAltEn').max(500).optional().default(''),
  scheduledFor: z.string().max(200).optional().nullable().transform((s) => s?.trim() || undefined),
  externalUrl: optionalHttpUrl(),
  /** FB/IG ingest dedupe – külső poszt azonosító (opcionális). */
  sourcePostId: z
    .string()
    .max(200)
    .optional()
    .transform((s) => (s == null ? undefined : s.trim() || undefined)),
});

export const createNewsSchema = newsCreateFields.superRefine((data, ctx) => {
  if (data.status === 'published') {
    if (!data.coverAltHu.trim() || !data.coverAltEn.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Publikáláshoz kötelező a borító alt szöveg HU és EN nyelven.',
        path: ['coverAltHu'],
      });
    }
  }
});

/** PATCH: részmezők; közzétételi alt ellenőrzés a szerveren összeolvasztott állapotra. */
export const patchNewsSchema = newsCreateFields.partial();

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type PatchNewsInput = z.infer<typeof patchNewsSchema>;

