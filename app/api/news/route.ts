/**
 * @file REST: hírek lista (GET) + létrehozás (POST, OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { createNewsSchema } from '@/features/news/schema';
import { createNewsItem, listNewsForRole } from '@/features/news/server';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

export async function GET() {
  const user = await getCurrentUser();
  const items = await listNewsForRole(user?.role);
  return NextResponse.json({ items });
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

  const parsed = createNewsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const item = await createNewsItem(data);
  await writeAudit({
    actor: user,
    action: 'create_news',
    entityType: 'news',
    entityId: String(item.id),
    details: `${item.status}:${item.category}`,
  });

  return NextResponse.json({ item }, { status: 201 });
}
