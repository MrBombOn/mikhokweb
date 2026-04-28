/**
 * @file REST: Office oldal snapshot – GET / PATCH (OFFICE/ADMIN íráshoz).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { getOfficeSnapshotForRole, patchOfficeSnapshot } from '@/features/office/server';
import { patchOfficeSnapshotSchema } from '@/lib/validation/about';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

export async function GET() {
  const user = await getCurrentUser();
  const result = await getOfficeSnapshotForRole(user?.role);
  if (!result.ok) {
    return NextResponse.json({ error: 'Nem található.' }, { status: result.status });
  }
  return NextResponse.json({ item: result.item });
}

export async function PATCH(request: Request) {
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

  const parsed = patchOfficeSnapshotSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const result = await patchOfficeSnapshot(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? 'Hiba.' }, { status: result.status });
  }
  await writeAudit({
    actor: user,
    action: 'patch_office_snapshot',
    entityType: 'office_snapshot',
    entityId: String(result.item.id),
    details: `fields=${Object.keys(parsed.data).join(',')}`,
  });

  return NextResponse.json({ item: result.item });
}
