import type { PrismaClient } from '@prisma/client';

/** Latin extended → ASCII-like slug (HU címekhez). */
export function slugifyNewsTitle(title: string): string {
  const base = title
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
  return base || 'hir';
}

/** Egyedi slug allokálás ütközés esetén `-2`, `-3`, … (`excludeNewsId`: saját rekord frissítésekor). */
export async function allocateUniqueNewsSlug(
  prisma: PrismaClient,
  baseSlug: string,
  excludeNewsId?: number,
): Promise<string> {
  let candidate = baseSlug;
  let n = 0;
  for (;;) {
    const clash = await prisma.news.findUnique({ where: { slug: candidate } });
    if (!clash || clash.id === excludeNewsId) return candidate;
    n += 1;
    candidate = `${baseSlug}-${n}`;
  }
}
