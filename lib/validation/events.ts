import { z } from 'zod';

const writableEventStatus = z.enum(['draft', 'scheduled', 'published', 'archived']);

export const createEventSchema = z.object({
  titleHu: z.string().min(1).max(500),
  titleEn: z.string().min(1).max(500),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().min(1).max(50),
  location: z.string().min(1).max(200),
  category: z.string().min(1).max(100),
  dayLabel: z.string().max(50).optional().nullable().transform((s) => s?.trim() || undefined),
  note: z.string().max(2000).optional().nullable().transform((s) => s?.trim() || undefined),
  status: writableEventStatus.default('published'),
});

export const patchEventSchema = createEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type PatchEventInput = z.infer<typeof patchEventSchema>;
