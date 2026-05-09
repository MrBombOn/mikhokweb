import { z } from 'zod';

export const createCategorySchema = z.object({
  scope: z.enum(['news', 'events', 'gallery', 'guides', 'office']),
  nameHu: z.string().trim().min(1).max(120),
  nameEn: z.string().trim().min(1).max(120),
  sortOrder: z.number().int().default(0),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']).default('published'),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const bulkImportCategoriesSchema = z.object({
  items: z.array(createCategorySchema).min(1).max(100),
});

export type BulkImportCategoriesInput = z.infer<typeof bulkImportCategoriesSchema>;
