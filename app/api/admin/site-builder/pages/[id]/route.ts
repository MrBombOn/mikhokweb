import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { badRequest, conflict, forbidden, notFound, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { patchSiteBuilderPageSchema } from '@/lib/validation/site-builder';
import { normalizeBodyJson } from '@/lib/site-builder/studio';

type RouteContext = { params: Promise<{ id: string }> };
function parseId(raw: string): number | null {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

function toPageDto(row: {
  id: number;
  slug: string;
  titleHu: string;
  titleEn: string;
  bodyJson: unknown;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: row.id,
    slug: row.slug,
    titleHu: row.titleHu,
    titleEn: row.titleEn,
    bodyJson: row.bodyJson,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function PATCH(request: Request, context: RouteContext) {
  const log = apiRequestLog(request, 'api.admin.site_builder.pages.patch');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return log.wrap(forbidden());

  const id = parseId((await context.params).id);
  if (!id) return log.wrap(badRequest('Hibás oldal azonosító.'));

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return log.wrap(badRequest('Érvénytelen JSON.'));
  }
  const parsed = patchSiteBuilderPageSchema.safeParse(body);
  if (!parsed.success) return log.wrap(badRequest('Hibás adat.', parsed.error.flatten()));

  const existing = await prisma.siteBuilderPage.findUnique({ where: { id } });
  if (!existing) return log.wrap(notFound('Az oldal nem található.'));

  if (parsed.data.slug && parsed.data.slug !== existing.slug) {
    const clash = await prisma.siteBuilderPage.findUnique({ where: { slug: parsed.data.slug } });
    if (clash && clash.id !== id) return log.wrap(conflict('Ez a slug már létezik.'));
  }

  const patch = parsed.data;
  const data = {
    ...patch,
    ...(patch.bodyJson !== undefined ? { bodyJson: normalizeBodyJson(patch.bodyJson) as Prisma.InputJsonValue } : {}),
  } as Prisma.SiteBuilderPageUpdateInput;

  const row = await prisma.$transaction(async (tx) => {
    const updated = await tx.siteBuilderPage.update({
      where: { id },
      data,
    });
    await tx.$executeRawUnsafe(
      'INSERT INTO "SiteBuilderPageRevision" ("pageId","action","titleHu","titleEn","bodyJson","status","actorId","createdAt") VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)',
      updated.id,
      'patch',
      updated.titleHu,
      updated.titleEn,
      JSON.stringify(updated.bodyJson),
      updated.status,
      user.id,
    );
    if (patch.status === 'published') {
      await tx.$executeRawUnsafe(
        'INSERT INTO "SiteBuilderPublishQueue" ("pageId","targetStatus","scheduledFor","status","processedAt","createdAt","createdById") VALUES (?,?,NULL,?,?,CURRENT_TIMESTAMP,?)',
        updated.id,
        'published',
        'done',
        new Date().toISOString(),
        user.id,
      );
    }
    return updated;
  });
  log.info('admin_site_builder_page_patched', { actorId: user.id, pageId: id });
  return log.wrap(ok({ item: toPageDto(row) }));
}

export async function DELETE(request: Request, context: RouteContext) {
  const log = apiRequestLog(request, 'api.admin.site_builder.pages.delete');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return log.wrap(forbidden());

  const id = parseId((await context.params).id);
  if (!id) return log.wrap(badRequest('Hibás oldal azonosító.'));

  const existing = await prisma.siteBuilderPage.findUnique({ where: { id } });
  if (!existing) return log.wrap(notFound('Az oldal nem található.'));

  await prisma.siteBuilderPage.delete({ where: { id } });
  log.info('admin_site_builder_page_deleted', { actorId: user.id, pageId: id });
  return log.wrap(ok({ success: true }));
}
