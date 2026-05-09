import { badRequest, forbidden, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { listFeatureFlags, setFeatureFlagOverride, setFeatureFlagRolloutPercent } from '@/lib/feature-flags/registry';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { dispatchStaffNotification } from '@/lib/notifications/staff-dispatch';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return forbidden();
  return ok({ items: listFeatureFlags() });
}

export async function PATCH(request: Request) {
  const log = apiRequestLog(request, 'api.admin.feature_flags.patch');
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

  const payload = body as { key?: string; enabled?: unknown; rolloutPercent?: unknown };
  if (typeof payload.key !== 'string' || payload.key.length === 0) {
    return log.wrap(badRequest('Hiányzó vagy érvénytelen feature flag kulcs.'));
  }
  if (typeof payload.enabled !== 'boolean' && typeof payload.rolloutPercent !== 'number') {
    return log.wrap(badRequest('Legalább egy módosítandó mezőt adj meg (enabled vagy rolloutPercent).'));
  }

  const flags = listFeatureFlags();
  const known = flags.find((it: (typeof flags)[number]) => it.key === payload.key);
  if (!known) return log.wrap(badRequest('Ismeretlen feature flag kulcs.'));

  if (typeof payload.enabled === 'boolean') {
    setFeatureFlagOverride(known.key, payload.enabled);
  }
  if (typeof payload.rolloutPercent === 'number') {
    if (!Number.isFinite(payload.rolloutPercent) || payload.rolloutPercent < 0 || payload.rolloutPercent > 100) {
      return log.wrap(badRequest('A rolloutPercent mező 0 és 100 közötti szám lehet.'));
    }
    setFeatureFlagRolloutPercent(known.key, payload.rolloutPercent);
  }
  log.info('admin_feature_flag_patched', {
    actorId: user.id,
    flagKey: known.key,
    enabled: payload.enabled,
    rolloutPercent: payload.rolloutPercent,
  });

  dispatchStaffNotification({
    eventKey: 'feature_flag_changed',
    severity: 'critical',
    titleHu: 'Feature flag módosult',
    titleEn: 'Feature flag changed',
    bodyHu: `${user.username}: ${known.key} módosítva (${typeof payload.enabled === 'boolean' ? `enabled=${payload.enabled}` : 'enabled=unchanged'}, ${typeof payload.rolloutPercent === 'number' ? `rollout=${payload.rolloutPercent}%` : 'rollout=unchanged'}).`,
    bodyEn: `${user.username}: ${known.key} updated (${typeof payload.enabled === 'boolean' ? `enabled=${payload.enabled}` : 'enabled=unchanged'}, ${typeof payload.rolloutPercent === 'number' ? `rollout=${payload.rolloutPercent}%` : 'rollout=unchanged'}).`,
    meta: { flagKey: known.key, enabled: payload.enabled, rolloutPercent: payload.rolloutPercent, actorId: user.id },
  });

  return log.wrap(ok({ item: listFeatureFlags().find((it: (typeof flags)[number]) => it.key === known.key) }));
}
