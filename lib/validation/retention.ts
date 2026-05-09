import { z } from 'zod';

export const patchRetentionConfigSchema = z
  .object({
    auditLogDays: z.number().int().min(7).max(3650).optional(),
    feedbackDays: z.number().int().min(7).max(3650).optional(),
    requestLogDays: z.number().int().min(1).max(3650).optional(),
  })
  .refine(
    (v) => v.auditLogDays !== undefined || v.feedbackDays !== undefined || v.requestLogDays !== undefined,
    { message: 'Nincs frissítendő mező.' },
  );
