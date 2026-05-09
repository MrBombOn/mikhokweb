import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { patchGalleryFolderSchema } from '@/lib/validation/gallery-folders';
import { writeAudit } from '@/lib/audit/write-audit';

type RouteContext = { params: Promise<{ id: string }> };

function parseFolderId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function PATCH(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseFolderId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }
  const parsed = patchGalleryFolderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.galleryFolder.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'A mappa nem található.' }, { status: 404 });
  }

  if (parsed.data.name !== undefined) {
    const allNames = await prisma.galleryFolder.findMany({
      where: { id: { not: id } },
      select: { id: true, name: true },
    });
    const incomingName = parsed.data.name.trim().toLocaleLowerCase('hu-HU');
    const dupe = allNames.find((x) => x.name.trim().toLocaleLowerCase('hu-HU') === incomingName);
    if (dupe) {
      return NextResponse.json({ error: 'Már létezik ilyen mappanév.' }, { status: 409 });
    }
  }

  const folder = await prisma.galleryFolder.update({
    where: { id },
    data: {
      name: parsed.data.name,
      sortOrder: parsed.data.sortOrder,
    },
  });

  await writeAudit({
    actor: user,
    action: 'patch_gallery_folder',
    entityType: 'gallery_folder',
    entityId: String(folder.id),
    details: `fields=${Object.keys(parsed.data).join(',')}`,
  });

  return NextResponse.json({ item: { id: folder.id, name: folder.name, sortOrder: folder.sortOrder } });
}

export async function DELETE(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseFolderId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const existing = await prisma.galleryFolder.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'A mappa nem található.' }, { status: 404 });
  }

  const linkedItems = await prisma.galleryItem.count({
    where: { folderId: id, status: { not: 'deleted' } },
  });
  if (linkedItems > 0) {
    return NextResponse.json(
      { error: 'A mappa nem törölhető, amíg aktív galéria elemek tartoznak hozzá.', itemCount: linkedItems },
      { status: 409 },
    );
  }

  await prisma.galleryFolder.delete({ where: { id } });

  await writeAudit({
    actor: user,
    action: 'delete_gallery_folder',
    entityType: 'gallery_folder',
    entityId: String(id),
    details: existing.name,
  });

  return NextResponse.json({ ok: true });
}

