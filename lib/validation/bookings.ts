import { z } from 'zod';

export const createBookingSchema = z.object({
  title: z.string().max(200).optional().transform((s) => s?.trim() || undefined),
  applicantName: z.string().min(1).max(200),
  email: z.string().email().max(320),
  organization: z.string().max(200).optional().nullable().transform((s) => s?.trim() || undefined),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  purpose: z.string().min(1).max(2000),
});

export const patchBookingStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
