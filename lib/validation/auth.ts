import { z } from 'zod';

/** Admin / office bejelentkezési űrlap – szerver validációhoz (Fázis 3). */
export const loginFormSchema = z.object({
  username: z.string().trim().min(1, 'username_required').max(120),
  password: z.string().min(1, 'password_required').max(500),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;
