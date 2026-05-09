import { forbidden, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { isFeatureEnabledForIdentity } from '@/lib/feature-flags/registry';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return forbidden();
  const allowed = isFeatureEnabledForIdentity('siteBuilderV2Canary', user.id);
  return ok({ allowed });
}
