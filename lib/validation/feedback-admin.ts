import { z } from 'zod';

export const feedbackStatusSchema = z.enum(['new', 'in_progress', 'closed']);

export const patchFeedbackAdminSchema = z
  .object({
    status: feedbackStatusSchema.optional(),
    assigneeId: z.string().trim().min(1).max(64).optional().nullable(),
    internalNote: z.string().max(2000).optional(),
  })
  .refine((v) => v.status !== undefined || v.assigneeId !== undefined || v.internalNote !== undefined, {
    message: 'Adj meg legalabb egy modositando mezot.',
  });

export type PatchFeedbackAdminInput = z.infer<typeof patchFeedbackAdminSchema>;
