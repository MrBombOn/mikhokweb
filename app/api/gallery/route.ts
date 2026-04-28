/**
 * @file REST: galéria – mappák + elemek lista (GET), új elem (POST, OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { createGalleryItem, listGalleryForRole } from '@/features/gallery/server';
import { createGalleryItemSchema } from '@/lib/validation/gallery';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

export async function GET() {
  const user = await getCurrentUser();
  const payload = await listGalleryForRole(user?.role);
  return NextResponse.json(payload);
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

  const parsed = createGalleryItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const result = await createGalleryItem(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  await writeAudit({
    actor: user,
    action: 'create_gallery_item',
    entityType: 'gallery_item',
    entityId: String(result.item.id),
    details: `folder=${result.item.folderId}`,
  });

  return NextResponse.json({ item: result.item }, { status: 201 });
}
