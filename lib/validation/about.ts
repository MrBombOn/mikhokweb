import { z } from 'zod';

const writableAboutStatus = z.enum(['draft', 'scheduled', 'published', 'archived']);

export const createAboutMemberSchema = z.object({
  name: z.string().min(1).max(200),
  roleHu: z.string().min(1).max(400),
  roleEn: z.string().min(1).max(400),
  bioHu: z.string().max(4000).default(''),
  bioEn: z.string().max(4000).default(''),
  groupHu: z.string().max(200).default(''),
  groupEn: z.string().max(200).default(''),
  imageUrl: z.string().max(2000).default(''),
  publishedAt: z
    .union([z.string().max(10), z.null()])
    .optional()
    .transform((v) => {
      if (v === undefined || v === null) return null;
      const t = v.trim();
      return t === '' ? null : t;
    })
    .refine((s) => s === null || /^\d{4}-\d{2}-\d{2}$/.test(s), { message: 'A dátum formátuma: YYYY-MM-DD vagy üres.' }),
  isAlumni: z.boolean().optional().default(false),
  sortOrder: z.number().int().default(0),
  status: writableAboutStatus.default('published'),
});

/** PATCH: `publishedAt` elhagyása = nincs változás; `null` = törlés. */
export const patchAboutMemberSchema = createAboutMemberSchema
  .partial()
  .extend({
    publishedAt: z
      .union([z.string().max(10), z.null()])
      .optional()
      .transform((v) => {
        if (v === undefined) return undefined;
        if (v === null) return null;
        const t = v.trim();
        return t === '' ? null : t;
      })
      .refine((v) => v === undefined || v === null || /^\d{4}-\d{2}-\d{2}$/.test(v), {
        message: 'A dátum formátuma: YYYY-MM-DD vagy üres.',
      }),
  });

export const patchAboutNarrativeSchema = z.object({
  titleHu: z.string().min(1).max(400).optional(),
  titleEn: z.string().min(1).max(400).optional(),
  bodyHu: z.string().max(20000).optional(),
  bodyEn: z.string().max(20000).optional(),
  sortOrder: z.number().int().optional(),
  status: writableAboutStatus.optional(),
});

export const patchOfficeSnapshotSchema = z.object({
  openingHoursHu: z.string().min(1).max(2000).optional(),
  openingHoursEn: z.string().min(1).max(2000).optional(),
  weeklyScheduleHu: z.string().max(8000).optional(),
  weeklyScheduleEn: z.string().max(8000).optional(),
  presentNowHu: z.string().max(2000).optional(),
  presentNowEn: z.string().max(2000).optional(),
  serviceStatusHu: z.string().min(1).max(2000).optional(),
  serviceStatusEn: z.string().min(1).max(2000).optional(),
  servicesInfoHu: z.string().max(4000).optional(),
  servicesInfoEn: z.string().max(4000).optional(),
  nfcInfoHu: z.string().max(4000).optional(),
  nfcInfoEn: z.string().max(4000).optional(),
  quickInfoHu: z.string().max(4000).optional(),
  quickInfoEn: z.string().max(4000).optional(),
  internalNoteHu: z.string().max(4000).optional(),
  internalNoteEn: z.string().max(4000).optional(),
  status: writableAboutStatus.optional(),
});
