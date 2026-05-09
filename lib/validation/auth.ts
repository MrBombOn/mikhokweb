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

function noDangerousMarkup(fieldLabel: string) {
  return z.string().superRefine((value, ctx) => {
    const v = value.toLowerCase();
    if (v.includes('<script') || v.includes('javascript:') || /on\w+\s*=/.test(v)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${fieldLabel}: veszelyes tartalom nem engedelyezett`,
      });
    }
  });
}

/** Admin / belépési űrlap mezői – trim, hosszhatár spam + XSS-ish payload tiltás (P2). */
export const loginFormSchema = z.object({
  username: noDangerousMarkup('username').trim().min(1, 'username_required').max(120),
  password: noDangerousMarkup('password').min(1, 'password_required').max(500),
});

/** Inferált típus – űrlap state típusosításához. */
export type LoginFormInput = z.infer<typeof loginFormSchema>;
