import { prisma } from '@/lib/db';
import { badRequest, forbidden, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { patchRetentionConfigSchema } from '@/lib/validation/retention';

async function ensureRetentionConfig() {
  const found = await prisma.retentionConfig.findUnique({ where: { id: 1 } });
  if (found) return found;
  return prisma.retentionConfig.create({ data: { id: 1 } });
}

export async function GET(request: Request) {
  const log = apiRequestLog(request, 'api.admin.retention.get');
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return log.wrap(forbidden());
  const item = await ensureRetentionConfig();
  return log.wrap(ok({ item }));
}

export async function PATCH(request: Request) {
  const log = apiRequestLog(request, 'api.admin.retention.patch');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return log.wrap(forbidden());

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return log.wrap(badRequest('Érvénytelen JSON.'));
  }
  const parsed = patchRetentionConfigSchema.safeParse(body);
  if (!parsed.success) return log.wrap(badRequest('Hibás adat.', parsed.error.flatten()));

  await ensureRetentionConfig();
  const item = await prisma.retentionConfig.update({
    where: { id: 1 },
    data: parsed.data,
  });
  log.info('admin_retention_config_patched', {
    actorId: user.id,
    auditLogDays: item.auditLogDays,
    feedbackDays: item.feedbackDays,
    requestLogDays: item.requestLogDays,
  });
  return log.wrap(ok({ item }));
}
