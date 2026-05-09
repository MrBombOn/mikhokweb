/**
 * @file Integrációs állapot (env jelenlét, webhook, SMTP, read API) — OFFICE+ADMIN GET.
 */
import { forbidden, ok } from '@/lib/api/response';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { getConfiguredPublicReadApiKey } from '@/lib/integrations/public-read-api-key';
import { isSmtpConfigured } from '@/lib/notifications/mailer';
import { apiRequestLog } from '@/lib/observability/api-request-log';

function webhookSet(envName: string): boolean {
  return Boolean(process.env[envName]?.trim());
}

export async function GET(request: Request) {
  const log = apiRequestLog(request, 'api.admin.integrations-health.get');
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) return log.wrap(forbidden());

  const payload = {
    smtp: { configured: isSmtpConfigured() },
    webhooks: {
      staffNotify: webhookSet('STAFF_NOTIFY_WEBHOOK_URL'),
      bookingNotify: webhookSet('BOOKING_NOTIFY_WEBHOOK_URL'),
      feedbackNotify: webhookSet('FEEDBACK_NOTIFY_WEBHOOK_URL'),
      uploadScan: webhookSet('UPLOAD_SCAN_WEBHOOK_URL'),
    },
    publicReadApi: {
      enabled: Boolean(getConfiguredPublicReadApiKey()),
    },
  };

  return log.wrap(ok({ item: payload }));
}
