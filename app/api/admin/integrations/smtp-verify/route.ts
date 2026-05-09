/**
 * @file SMTP `verify()` — csak ADMIN + CSRF (Fázis 19).
 */
import { badRequest, forbidden, ok, serverError } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { verifySmtpConnection } from '@/lib/notifications/mailer';

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.admin.integrations.smtp-verify.post');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return log.wrap(forbidden());

  const result = await verifySmtpConnection();
  if (!result.ok) {
    if (result.message === 'smtp_not_configured') {
      return log.wrap(badRequest('smtp_not_configured'));
    }
    return log.wrap(serverError(result.message));
  }
  return log.wrap(ok({ ok: true }));
}
