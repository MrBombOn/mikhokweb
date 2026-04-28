/**
 * @file Bejelentkezési űrlap Zod sémája
 *
 * @description
 * A `loginFormSchema` a **szerver** és a **kliens** között megosztott szerződés:
 * ugyanazt a validációt futtatja az `AppProvider` submit előtt (`safeParse`) és
 * az `admin-gate` POST handler (JSON body).
 *
 * @megjegyzés
 * A `.min(1)` hibaüzenet kulcsok (`username_required`) később i18n-re cserélhetők;
 * jelenleg a UI saját szöveget ír hiba esetén.
 */
import { z } from 'zod';

/** Admin / belépési űrlap mezői – trim és hosszhatár spam ellen. */
export const loginFormSchema = z.object({
  username: z.string().trim().min(1, 'username_required').max(120),
  password: z.string().min(1, 'password_required').max(500),
});

/** Inferált típus – űrlap state típusosításához. */
export type LoginFormInput = z.infer<typeof loginFormSchema>;
