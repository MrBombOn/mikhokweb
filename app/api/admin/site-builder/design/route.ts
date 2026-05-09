import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';
import { badRequest, forbidden, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { patchSiteDesignConfigSchema } from '@/lib/validation/site-builder';
import { validateDesignGuardrails } from '@/lib/site-builder/studio';
import { SITE_DESIGN_CACHE_TAG } from '@/lib/site-design/layout-css';

async function ensureDesignConfig() {
  const found = await prisma.siteDesignConfig.findUnique({ where: { id: 1 } });
  if (found) return found;
  return prisma.siteDesignConfig.create({ data: { id: 1 } });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return forbidden();
  const item = await ensureDesignConfig();
  return ok({ item });
}

export async function PATCH(request: Request) {
  const log = apiRequestLog(request, 'api.admin.site_builder.design.patch');
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
  const parsed = patchSiteDesignConfigSchema.safeParse(body);
  if (!parsed.success) return log.wrap(badRequest('Hibás adat.', parsed.error.flatten()));
  const guardrailError = validateDesignGuardrails(parsed.data);
  if (guardrailError) return log.wrap(badRequest(guardrailError));

  await ensureDesignConfig();
  const item = await prisma.siteDesignConfig.update({
    where: { id: 1 },
    data: parsed.data,
  });
  revalidateTag(SITE_DESIGN_CACHE_TAG);
  log.info('admin_site_design_config_patched', { actorId: user.id });
  return log.wrap(ok({ item }));
}
