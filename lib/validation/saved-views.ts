import { z } from 'zod';

export const savedViewModuleSchema = z.enum(['audit', 'users', 'categories']);

export const createSavedViewSchema = z.object({
  module: savedViewModuleSchema,
  name: z.string().trim().min(1).max(80),
  payload: z.record(z.string(), z.unknown()),
});

export type CreateSavedViewInput = z.infer<typeof createSavedViewSchema>;
