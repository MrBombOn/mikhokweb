import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().trim().min(3).max(80),
  password: z.string().min(8).max(200),
  role: z.enum(['OFFICE', 'ADMIN']).default('OFFICE'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const bulkImportUsersSchema = z.object({
  items: z.array(createUserSchema).min(1).max(50),
});

export type BulkImportUsersInput = z.infer<typeof bulkImportUsersSchema>;
