import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';

export type SearchDocumentRow = {
  id: string;
  module: string;
  entityId: number;
  titleHu: string;
  titleEn: string;
  snippetHu: string;
  snippetEn: string;
  category: string;
  hrefPath: string;
  listDate: string;
};

const MODULE_SET = new Set(['news', 'events', 'guides']);

function parseList(param: string | null): string[] {
  if (!param?.trim()) return [];
  return param
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseModules(param: string | null): string[] {
  const raw = parseList(param);
  return raw.filter((m) => MODULE_SET.has(m));
}

/**
 * Publikus keresés a `SearchDocument` táblán (searchBlob kisbetűs egyesített mező).
 */
export async function executePublicSearch(params: {
  query: string;
  categories?: string | null;
  modules?: string | null;
  limit?: number;
}): Promise<SearchDocumentRow[]> {
  const limit = Math.min(Math.max(params.limit ?? 40, 1), 60);
  const q = params.query.trim().toLowerCase();
  const categories = parseList(params.categories ?? null);
  const modules = parseModules(params.modules ?? null);

  const filters: Prisma.SearchDocumentWhereInput[] = [];
  if (q.length > 0) {
    filters.push({ searchBlob: { contains: q } });
  }
  if (categories.length > 0) {
    filters.push({ category: { in: categories } });
  }
  if (modules.length > 0) {
    filters.push({ module: { in: modules } });
  }
  if (filters.length === 0) {
    return [];
  }

  const rows = await prisma.searchDocument.findMany({
    where: { AND: filters },
    take: limit,
    orderBy: [{ listDate: 'desc' }, { entityId: 'desc' }],
    select: {
      id: true,
      module: true,
      entityId: true,
      titleHu: true,
      titleEn: true,
      snippetHu: true,
      snippetEn: true,
      category: true,
      hrefPath: true,
      listDate: true,
    },
  });

  return rows;
}

export async function listSearchFacetCategories(): Promise<string[]> {
  const rows = await prisma.searchDocument.findMany({
    distinct: ['category'],
    select: { category: true },
    where: { category: { not: '' } },
  });
  return rows.map((r) => r.category).sort((a, b) => a.localeCompare(b, 'hu'));
}
