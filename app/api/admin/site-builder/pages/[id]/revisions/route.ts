import { prisma } from '@/lib/db';
import { badRequest, forbidden, notFound, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { rollbackSiteBuilderPageSchema } from '@/lib/validation/site-builder';

type RouteContext = { params: Promise<{ id: string }> };

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return forbidden();
  const id = parseId((await context.params).id);
  if (!id) return badRequest('Hibás oldal azonosító.');
  const page = await prisma.siteBuilderPage.findUnique({ where: { id } });
  if (!page) return notFound('Az oldal nem található.');
  const rows = (await prisma.$queryRawUnsafe(
    'SELECT "id","action","titleHu","titleEn","status","actorId","createdAt" FROM "SiteBuilderPageRevision" WHERE "pageId" = ? ORDER BY "createdAt" DESC LIMIT 80',
    id,
  )) as Array<{ id: number; action: string; titleHu: string; titleEn: string; status: string; actorId: string | null; createdAt: Date | string }>;
  return ok({
    items: rows.map((r) => ({
      id: r.id,
      action: r.action,
      titleHu: r.titleHu,
      titleEn: r.titleEn,
      status: r.status,
      actorId: r.actorId,
      createdAt: new Date(r.createdAt).toISOString(),
    })),
  });
}

export async function POST(request: Request, context: RouteContext) {
  const log = apiRequestLog(request, 'api.admin.site_builder.pages.revisions.rollback');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return log.wrap(forbidden());
  const id = parseId((await context.params).id);
  if (!id) return log.wrap(badRequest('Hibás oldal azonosító.'));
  const body = await request.json().catch(() => null);
  const parsed = rollbackSiteBuilderPageSchema.safeParse(body);
  if (!parsed.success) return log.wrap(badRequest('Hibás rollback kérés.', parsed.error.flatten()));
  const revisionRows = (await prisma.$queryRawUnsafe(
    'SELECT "id","titleHu","titleEn","bodyJson","status" FROM "SiteBuilderPageRevision" WHERE "id" = ? AND "pageId" = ? LIMIT 1',
    parsed.data.revisionId,
    id,
  )) as Array<{ id: number; titleHu: string; titleEn: string; bodyJson: unknown; status: string }>;
  const revision = revisionRows[0];
  if (!revision) return log.wrap(notFound('A revízió nem található.'));
  const page = await prisma.siteBuilderPage.findUnique({ where: { id } });
  if (!page) return log.wrap(notFound('Az oldal nem található.'));

  const updated = await prisma.$transaction(async (tx) => {
    const row = await tx.siteBuilderPage.update({
      where: { id },
      data: {
        titleHu: revision.titleHu,
        titleEn: revision.titleEn,
        bodyJson: revision.bodyJson as object,
        status: 'draft',
      },
    });
    await tx.$executeRawUnsafe(
      'INSERT INTO "SiteBuilderPageRevision" ("pageId","action","titleHu","titleEn","bodyJson","status","actorId","createdAt") VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)',
      id,
      'rollback',
      row.titleHu,
      row.titleEn,
      JSON.stringify(row.bodyJson),
      row.status,
      user.id,
    );
    return row;
  });

  log.info('admin_site_builder_page_rollback', { actorId: user.id, pageId: id, revisionId: revision.id });
  return log.wrap(
    ok({
      item: {
        id: updated.id,
        slug: updated.slug,
        titleHu: updated.titleHu,
        titleEn: updated.titleEn,
        status: updated.status,
        updatedAt: updated.updatedAt.toISOString(),
      },
    }),
  );
}
