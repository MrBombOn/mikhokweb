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
import {
  blockedRemainingSeconds,
  clearFailures,
  getClientKey,
  getIpOnlyLoginKey,
  getNetworkKey,
  isBlocked,
  registerFailure,
} from '@/lib/security/login-rate-limit';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { serverLogger } from '@/lib/observability/server-logger';
import { getRequestId, withRequestId } from '@/lib/observability/request-context';

const LEGACY_GATE = 'hok_admin_gate';

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  const csrf = enforceSameOrigin(request);
  if (csrf) return withRequestId(csrf, requestId);

  const json = await request.json().catch(() => null);
  const parsed = loginFormSchema.safeParse(json);
  if (!parsed.success) {
    serverLogger.warn('auth_login_invalid_body', { scope: 'api.auth.login', requestId });
    return withRequestId(badRequest('invalid_body', parsed.error.flatten()), requestId);
  }
  const { username, password } = parsed.data;
  const userKey = getClientKey(request, username);
  const networkKey = getNetworkKey(request);
  const ipKey = getIpOnlyLoginKey(request);
  if (isBlocked(userKey) || isBlocked(networkKey) || isBlocked(ipKey)) {
    const retryAfterSec = Math.max(
      blockedRemainingSeconds(userKey),
      blockedRemainingSeconds(networkKey),
      blockedRemainingSeconds(ipKey),
    );
    serverLogger.warn('auth_login_rate_limited', {
      scope: 'api.auth.login',
      username,
      requestId,
    });
    return withRequestId(
      tooManyRequests(
      'Túl sok sikertelen belépés. Várj 15 percet.',
      retryAfterSec > 0 ? retryAfterSec : 60,
      ),
      requestId,
    );
  }

  const user = await prisma.user.findUnique({ where: { username: username.trim() } });
  if (!user) {
    registerFailure(userKey);
    registerFailure(networkKey);
    serverLogger.warn('auth_login_invalid_credentials', {
      scope: 'api.auth.login',
      username,
      reason: 'missing_user',
      requestId,
    });
    return withRequestId(unauthorized('invalid_credentials'), requestId);
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    registerFailure(userKey);
    registerFailure(networkKey);
    registerFailure(ipKey);
    serverLogger.warn('auth_login_invalid_credentials', {
      scope: 'api.auth.login',
      username,
      reason: 'wrong_password',
      requestId,
    });
    return withRequestId(unauthorized('invalid_credentials'), requestId);
  }

  clearFailures(userKey);
  clearFailures(networkKey);
  clearFailures(ipKey);
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
    requestId,
  });
  return withRequestId(res, requestId);
}
