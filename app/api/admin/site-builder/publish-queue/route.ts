import { prisma } from '@/lib/db';
import { badRequest, forbidden, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { enqueueSiteBuilderPublishSchema } from '@/lib/validation/site-builder';

function parseDate(value?: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.valueOf()) ? null : d;
}

async function processDueQueue(now = new Date()) {
  const due = (await prisma.$queryRawUnsafe(
    'SELECT "id","pageId","createdById" FROM "SiteBuilderPublishQueue" WHERE "status" = ? AND ("scheduledFor" IS NULL OR "scheduledFor" <= ?) ORDER BY "createdAt" ASC LIMIT 50',
    'queued',
    now.toISOString(),
  )) as Array<{ id: number; pageId: number; createdById: string | null }>;
  for (const job of due) {
    await prisma.$transaction(async (tx) => {
      await tx.siteBuilderPage.update({
        where: { id: job.pageId },
        data: { status: 'published' },
      });
      await tx.$executeRawUnsafe(
        'UPDATE "SiteBuilderPublishQueue" SET "status" = ?, "processedAt" = ? WHERE "id" = ?',
        'done',
        now.toISOString(),
        job.id,
      );
      const page = await tx.siteBuilderPage.findUnique({ where: { id: job.pageId } });
      if (page) {
        await tx.$executeRawUnsafe(
          'INSERT INTO "SiteBuilderPageRevision" ("pageId","action","titleHu","titleEn","bodyJson","status","actorId","createdAt") VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)',
          page.id,
          'publish_queue_done',
          page.titleHu,
          page.titleEn,
          JSON.stringify(page.bodyJson),
          page.status,
          job.createdById,
        );
      }
    });
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return forbidden();
  await processDueQueue();
  const rows = (await prisma.$queryRawUnsafe(
    'SELECT q."id",q."pageId",q."targetStatus",q."status",q."scheduledFor",q."processedAt",q."createdAt",q."createdById",p."slug",p."titleHu",p."titleEn" FROM "SiteBuilderPublishQueue" q JOIN "SiteBuilderPage" p ON p."id" = q."pageId" ORDER BY q."createdAt" DESC LIMIT 100',
  )) as Array<{
    id: number;
    pageId: number;
    targetStatus: string;
    status: string;
    scheduledFor: string | Date | null;
    processedAt: string | Date | null;
    createdAt: string | Date;
    createdById: string | null;
    slug: string;
    titleHu: string;
    titleEn: string;
  }>;
  return ok({
    items: rows.map((r) => ({
      id: r.id,
      pageId: r.pageId,
      pageSlug: r.slug,
      pageTitleHu: r.titleHu,
      pageTitleEn: r.titleEn,
      targetStatus: r.targetStatus,
      status: r.status,
      scheduledFor: r.scheduledFor ? new Date(r.scheduledFor).toISOString() : null,
      processedAt: r.processedAt ? new Date(r.processedAt).toISOString() : null,
      createdAt: new Date(r.createdAt).toISOString(),
      createdById: r.createdById,
    })),
  });
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.admin.site_builder.publish_queue.post');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return log.wrap(forbidden());

  const body = await request.json().catch(() => null);
  const parsed = enqueueSiteBuilderPublishSchema.safeParse(body);
  if (!parsed.success) return log.wrap(badRequest('Hibás queue kérés.', parsed.error.flatten()));
  const page = await prisma.siteBuilderPage.findUnique({ where: { id: parsed.data.pageId } });
  if (!page) return log.wrap(badRequest('A megadott oldal nem létezik.'));
  const scheduledFor = parseDate(parsed.data.scheduledFor);
  if (parsed.data.scheduledFor && !scheduledFor) return log.wrap(badRequest('Hibás scheduledFor dátum.'));

  await prisma.$executeRawUnsafe(
    'INSERT INTO "SiteBuilderPublishQueue" ("pageId","targetStatus","scheduledFor","status","createdAt","createdById") VALUES (?,?,?,?,CURRENT_TIMESTAMP,?)',
    page.id,
    'published',
    scheduledFor ? scheduledFor.toISOString() : null,
    'queued',
    user.id,
  );

  await processDueQueue();
  log.info('admin_site_builder_publish_queue_created', { actorId: user.id, pageId: page.id });
  return log.wrap(ok({ item: { success: true } }));
}
