import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { createGalleryFolderSchema } from '@/lib/validation/gallery-folders';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

export async function GET() {
  const folders = await prisma.galleryFolder.findMany({
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  });
  return NextResponse.json({
    items: folders.map((x) => ({ id: x.id, name: x.name, sortOrder: x.sortOrder })),
  });
}

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }

  const parsed = createGalleryFolderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const allNames = await prisma.galleryFolder.findMany({
    select: { id: true, name: true },
  });
  const incomingName = payload.name.trim().toLocaleLowerCase('hu-HU');
  const dupe = allNames.find((x) => x.name.trim().toLocaleLowerCase('hu-HU') === incomingName);
  if (dupe) {
    return NextResponse.json({ error: 'Már létezik ilyen mappanév.' }, { status: 409 });
  }

  const folder = await prisma.galleryFolder.create({
    data: {
      name: payload.name,
      sortOrder: payload.sortOrder ?? 0,
    },
  });

  await writeAudit({
    actor: user,
    action: 'create_gallery_folder',
    entityType: 'gallery_folder',
    entityId: String(folder.id),
    details: folder.name,
  });

  return NextResponse.json({ item: { id: folder.id, name: folder.name, sortOrder: folder.sortOrder } }, { status: 201 });
}

