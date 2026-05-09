import { z } from 'zod';

const writableGalleryStatus = z.enum(['draft', 'scheduled', 'published', 'archived']);

export const createGalleryItemSchema = z.object({
  folderId: z.number().int().positive(),
  titleHu: z.string().min(1).max(300),
  titleEn: z.string().min(1).max(300),
  listDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  imageUrl: z
    .string()
    .max(2000)
    .optional()
    .transform((s) => (s == null || s.trim() === '' ? '' : s.trim()))
    .refine((s) => s === '' || /^https?:\/\//i.test(s) || s.startsWith('/'), 'Csak http(s) vagy / kezdetű relatív URL lehet.'),
  status: writableGalleryStatus.default('published'),
  sortOrder: z.number().int().min(0).max(9999).optional().default(0),
});

export const patchGalleryItemSchema = createGalleryItemSchema.partial();

export type CreateGalleryItemInput = z.infer<typeof createGalleryItemSchema>;
