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

export const createNewsSchema = z.object({
  source: newsSource.default('internal'),
  category: z.string().min(1).max(200),
  status: writableStatus.default('draft'),
  pinned: z.boolean().optional().default(false),
  listDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .transform((d) => d ?? new Date().toISOString().slice(0, 10)),
  titleHu: z.string().min(1).max(500),
  titleEn: z.string().min(1).max(500),
  textHu: z.string().min(1).max(10000),
  textEn: z.string().min(1).max(10000),
  author: z.string().min(1).max(200),
  cover: coverTone.default('blue'),
  hasCover: z.boolean().optional().default(true),
  scheduledFor: z.string().max(200).optional().nullable().transform((s) => s?.trim() || undefined),
  externalUrl: optionalHttpUrl(),
});

export const patchNewsSchema = createNewsSchema.partial();

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type PatchNewsInput = z.infer<typeof patchNewsSchema>;

