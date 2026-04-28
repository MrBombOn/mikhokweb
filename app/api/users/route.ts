/**
 * @file REST: felhasználók admin – lista (GET), létrehozás (POST).
 */
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { hashPassword } from '@/lib/auth/password';
import { badRequest, conflict, created, forbidden, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

const createUserSchema = z.object({
  username: z.string().min(3).max(80),
  password: z.string().min(8).max(200),
  role: z.enum(['OFFICE', 'ADMIN']).default('OFFICE'),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) {
    return forbidden();
  }

  const rows = await prisma.user.findMany({
    orderBy: [{ createdAt: 'desc' }],
    select: { id: true, username: true, role: true, createdAt: true, updatedAt: true },
  });

  return ok({
    items: rows.map((r) => ({
      id: r.id,
      username: r.username,
      role: r.role,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
  });
}

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) {
    return forbidden();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Érvénytelen JSON.');
  }

  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest('Validációs hiba', parsed.error.flatten());
  }

  const d = parsed.data;
  const exists = await prisma.user.findUnique({ where: { username: d.username.trim() } });
  if (exists) {
    return conflict('A felhasználónév már foglalt.');
  }

  const passwordHash = await hashPassword(d.password);
  const row = await prisma.user.create({
    data: { username: d.username.trim(), passwordHash, role: d.role },
    select: { id: true, username: true, role: true, createdAt: true, updatedAt: true },
  });

  await writeAudit({
    actor: user,
    action: 'create_user',
    entityType: 'user',
    entityId: row.id,
    details: `role=${row.role}`,
  });

  return created(
    {
      item: {
        id: row.id,
        username: row.username,
        role: row.role,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      },
    },
  );
}
