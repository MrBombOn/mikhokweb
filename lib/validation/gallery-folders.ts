import { z } from 'zod';

export const createGalleryFolderSchema = z.object({
  name: z.string().trim().min(1).max(120),
  sortOrder: z.number().int().min(0).max(9999).optional(),
});

export const patchGalleryFolderSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    sortOrder: z.number().int().min(0).max(9999).optional(),
  })
  .refine((x) => x.name !== undefined || x.sortOrder !== undefined, {
    message: 'Nincs frissítendő mező.',
  });

