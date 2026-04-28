/**
 * @file Felhasználónév + jelszó alapú bejelentkezés
 *
 * @description
 * 1. JSON body Zod validáció (`loginFormSchema`).
 * 2. `prisma.user.findUnique` felhasználónév alapján.
 * 3. `verifyPassword` bcrypt összehasonlítás.
 * 4. Siker: `signSessionToken` + `Set-Cookie` (`SESSION_COOKIE`), régi gate süti törlése.
 *
 * @hibakódok
 * - 400: `invalid_body` – sémahiba
 * - 401: `invalid_credentials` – nincs user vagy rossz jelszó
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { loginFormSchema } from '@/lib/validation/auth';
import { verifyPassword } from '@/lib/auth/password';
import { signSessionToken, SESSION_COOKIE, sessionCookieBase } from '@/lib/auth/session';
import { badRequest, tooManyRequests, unauthorized } from '@/lib/api/response';
import { clearFailures, getClientKey, isBlocked, registerFailure } from '@/lib/security/login-rate-limit';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { serverLogger } from '@/lib/observability/server-logger';

const LEGACY_GATE = 'hok_admin_gate';

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const json = await request.json().catch(() => null);
  const parsed = loginFormSchema.safeParse(json);
  if (!parsed.success) {
    serverLogger.warn('auth_login_invalid_body', { scope: 'api.auth.login' });
    return badRequest('invalid_body', parsed.error.flatten());
  }
  const { username, password } = parsed.data;
  const key = getClientKey(request, username);
  if (isBlocked(key)) {
    serverLogger.warn('auth_login_rate_limited', {
      scope: 'api.auth.login',
      username,
    });
    return tooManyRequests('Túl sok sikertelen belépés. Várj 15 percet.');
  }

  const user = await prisma.user.findUnique({ where: { username: username.trim() } });
  if (!user) {
    registerFailure(key);
    serverLogger.warn('auth_login_invalid_credentials', {
      scope: 'api.auth.login',
      username,
      reason: 'missing_user',
    });
    return unauthorized('invalid_credentials');
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    registerFailure(key);
    serverLogger.warn('auth_login_invalid_credentials', {
      scope: 'api.auth.login',
      username,
      reason: 'wrong_password',
    });
    return unauthorized('invalid_credentials');
  }

  clearFailures(key);
  const token = await signSessionToken(user.id, user.role);
  const res = NextResponse.json({
    user: { id: user.id, username: user.username, role: user.role },
  });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieBase);
  res.cookies.delete(LEGACY_GATE);
  serverLogger.info('auth_login_success', {
    scope: 'api.auth.login',
    userId: user.id,
    username: user.username,
    role: user.role,
  });
  return res;
}
