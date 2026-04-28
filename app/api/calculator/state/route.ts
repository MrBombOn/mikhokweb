/**
 * @file KKI kalkulátor mentett állapot – GET/PUT (OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { calculatorStateSchema } from '@/lib/validation/calculator';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const row = await prisma.calculatorState.findUnique({
    where: { userId: user.id },
  });

  if (!row) {
    return NextResponse.json({ semesters: null, updatedAt: null });
  }

  return NextResponse.json({
    semesters: row.semesters,
    updatedAt: row.updatedAt.toISOString(),
  });
}

export async function PUT(request: Request) {
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

  const parsed = calculatorStateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const row = await prisma.calculatorState.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      semesters: parsed.data.semesters,
    },
    update: {
      semesters: parsed.data.semesters,
    },
  });
  await writeAudit({
    actor: user,
    action: 'put_calculator_state',
    entityType: 'calculator_state',
    entityId: user.id,
    details: `semesters=${parsed.data.semesters.length}`,
  });

  return NextResponse.json({
    ok: true,
    updatedAt: row.updatedAt.toISOString(),
  });
}
