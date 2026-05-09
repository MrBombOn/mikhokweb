import { forbidden, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { SITE_BUILDER_TEMPLATES } from '@/lib/site-builder/studio';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return forbidden();
  return ok({ items: SITE_BUILDER_TEMPLATES });
}
