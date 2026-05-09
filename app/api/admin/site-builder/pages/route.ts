import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { badRequest, conflict, created, forbidden, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { createSiteBuilderPageSchema } from '@/lib/validation/site-builder';
import { normalizeBodyJson } from '@/lib/site-builder/studio';

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

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return forbidden();

  const rows = await prisma.siteBuilderPage.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    take: 200,
  });
  return ok({ items: rows.map(toPageDto) });
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.admin.site_builder.pages.post');
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

  const parsed = createSiteBuilderPageSchema.safeParse(body);
  if (!parsed.success) return log.wrap(badRequest('Hibás adat.', parsed.error.flatten()));

  const payload = parsed.data;
  const exists = await prisma.siteBuilderPage.findUnique({ where: { slug: payload.slug } });
  if (exists) return log.wrap(conflict('Ez a slug már létezik.'));
  const normalizedBody = normalizeBodyJson(payload.bodyJson);

  const row = await prisma.$transaction(async (tx) => {
    const createdRow = await tx.siteBuilderPage.create({
      data: {
        slug: payload.slug,
        titleHu: payload.titleHu,
        titleEn: payload.titleEn,
        bodyJson: normalizedBody as Prisma.InputJsonValue,
        status: payload.status,
      },
    });
    await tx.$executeRawUnsafe(
      'INSERT INTO "SiteBuilderPageRevision" ("pageId","action","titleHu","titleEn","bodyJson","status","actorId","createdAt") VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP)',
      createdRow.id,
      'create',
      createdRow.titleHu,
      createdRow.titleEn,
      JSON.stringify(createdRow.bodyJson),
      createdRow.status,
      user.id,
    );
    return createdRow;
  });
  log.info('admin_site_builder_page_created', { actorId: user.id, pageId: row.id, slug: row.slug });
  return log.wrap(created({ item: toPageDto(row) }));
}
