/**
 * @file REST: egy hír GET / PATCH / DELETE (soft delete, OFFICE/ADMIN íráshoz).
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { newsRowToItem } from '@/lib/mappers/news';
import { patchNewsSchema } from '@/lib/validation/news';

type RouteContext = { params: Promise<{ id: string }> };

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id: raw } = await context.params;
  const id = parseId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const user = await getCurrentUser();
  const row = await prisma.news.findUnique({ where: { id } });
  if (!row || row.status === 'deleted') {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  const isGuest = !user || !canManageNews(user.role);
  if (isGuest && row.status !== 'published') {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  return NextResponse.json({ item: newsRowToItem(row) });
}

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }

  const parsed = patchNewsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  const p = parsed.data;
  const row = await prisma.news.update({
    where: { id },
    data: {
      ...(p.source !== undefined && { source: p.source }),
      ...(p.category !== undefined && { category: p.category }),
      ...(p.status !== undefined && { status: p.status }),
      ...(p.pinned !== undefined && { pinned: p.pinned }),
      ...(p.listDate !== undefined && { listDate: p.listDate }),
      ...(p.titleHu !== undefined && { titleHu: p.titleHu }),
      ...(p.titleEn !== undefined && { titleEn: p.titleEn }),
      ...(p.textHu !== undefined && { textHu: p.textHu }),
      ...(p.textEn !== undefined && { textEn: p.textEn }),
      ...(p.author !== undefined && { author: p.author }),
      ...(p.cover !== undefined && { cover: p.cover }),
      ...(p.hasCover !== undefined && { hasCover: p.hasCover }),
      ...(p.scheduledFor !== undefined && { scheduledFor: p.scheduledFor }),
      ...(p.externalUrl !== undefined && { externalUrl: p.externalUrl }),
    },
  });

  return NextResponse.json({ item: newsRowToItem(row) });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  await prisma.news.update({
    where: { id },
    data: { status: 'deleted' },
  });

  return NextResponse.json({ ok: true });
}
