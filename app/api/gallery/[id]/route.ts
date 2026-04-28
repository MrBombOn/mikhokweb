/**
 * @file REST: egy galéria elem GET / PATCH / DELETE (soft delete, OFFICE/ADMIN íráshoz).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { getGalleryItemDto, parseGalleryItemId, patchGalleryItem, softDeleteGalleryItem } from '@/features/gallery/server';
import { patchGalleryItemSchema } from '@/lib/validation/gallery';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id: raw } = await context.params;
  const id = parseGalleryItemId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const user = await getCurrentUser();
  const result = await getGalleryItemDto(id, user?.role);
  if (!result.ok) {
    return NextResponse.json({ error: 'Nem található.' }, { status: result.status });
  }

  return NextResponse.json({ item: result.item });
}

export async function PATCH(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseGalleryItemId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }

  const parsed = patchGalleryItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const result = await patchGalleryItem(id, parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? 'Hiba.' }, { status: result.status });
  }
  await writeAudit({
    actor: user,
    action: 'patch_gallery_item',
    entityType: 'gallery_item',
    entityId: String(id),
    details: `fields=${Object.keys(parsed.data).join(',')}`,
  });

  return NextResponse.json({ item: result.item });
}

export async function DELETE(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseGalleryItemId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const result = await softDeleteGalleryItem(id);
  if (!result.ok) {
    return NextResponse.json({ error: 'Nem található.' }, { status: result.status });
  }
  await writeAudit({
    actor: user,
    action: 'delete_gallery_item',
    entityType: 'gallery_item',
    entityId: String(id),
  });

  return NextResponse.json({ ok: true });
}
