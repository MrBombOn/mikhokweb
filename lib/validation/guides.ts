import { z } from 'zod';

const writableGuideStatus = z.enum(['draft', 'scheduled', 'published', 'archived']);

export const createGuideSchema = z.object({
  titleHu: z.string().min(1).max(400),
  titleEn: z.string().min(1).max(400),
  excerptHu: z.string().max(2000).default(''),
  excerptEn: z.string().max(2000).default(''),
  bodyHu: z.string().max(50000).default(''),
  bodyEn: z.string().max(50000).default(''),
  category: z.string().min(1).max(120).default('Általános'),
  topic: z.string().max(200).default(''),
  keywords: z.string().max(500).default(''),
  documentUrl: z.string().max(2000).nullable().optional(),
  documentType: z.string().max(80).nullable().optional(),
  listDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  status: writableGuideStatus.default('published'),
});

export const patchGuideSchema = createGuideSchema.partial();

export type CreateGuideInput = z.infer<typeof createGuideSchema>;

/** Üres / null → undefined; egyébként trim; http(s) kell, különben null vissza = hiba jel. */
export function parseOptionalHttpUrl(raw: string | null | undefined): string | null | undefined | 'invalid' {
  if (raw === null) return null;
  if (raw === undefined) return undefined;
  const t = raw.trim();
  if (t === '') return undefined;
  if (!/^https?:\/\//i.test(t)) return 'invalid';
  return t;
}
