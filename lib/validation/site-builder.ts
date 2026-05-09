import { z } from 'zod';
import { siteBuilderBodySchema } from '@/lib/site-builder/studio';

const writableStatus = z.enum(['draft', 'scheduled', 'published', 'archived']);

export const createSiteBuilderPageSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'A slug csak kisbetű, szám és kötőjel lehet.'),
  titleHu: z.string().trim().min(1).max(200),
  titleEn: z.string().trim().min(1).max(200),
  bodyJson: siteBuilderBodySchema,
  status: writableStatus.default('draft'),
});

export const patchSiteBuilderPageSchema = createSiteBuilderPageSchema.partial().refine(
  (v) => v.slug !== undefined || v.titleHu !== undefined || v.titleEn !== undefined || v.bodyJson !== undefined || v.status !== undefined,
  { message: 'Nincs frissítendő mező.' },
);

export const enqueueSiteBuilderPublishSchema = z.object({
  pageId: z.number().int().positive(),
  scheduledFor: z.string().datetime().optional(),
});

export const rollbackSiteBuilderPageSchema = z.object({
  revisionId: z.number().int().positive(),
});

export const patchSiteDesignConfigSchema = z
  .object({
    primaryColor: z.string().trim().regex(/^#([0-9a-fA-F]{6})$/, 'Hex szín formátum: #RRGGBB').optional(),
    accentColor: z.string().trim().regex(/^#([0-9a-fA-F]{6})$/, 'Hex szín formátum: #RRGGBB').optional(),
    surfaceRadius: z.number().int().min(0).max(48).optional(),
    contentMaxWidth: z.number().int().min(640).max(1920).optional(),
    fontFamily: z.string().trim().min(3).max(140).optional(),
    customCss: z.string().max(20000).optional(),
  })
  .refine(
    (v) =>
      v.primaryColor !== undefined ||
      v.accentColor !== undefined ||
      v.surfaceRadius !== undefined ||
      v.contentMaxWidth !== undefined ||
      v.fontFamily !== undefined ||
      v.customCss !== undefined,
    { message: 'Nincs frissítendő mező.' },
  );
