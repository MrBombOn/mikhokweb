/**
 * @file Globális publikus keresés (§12 Fázis 14) – `SearchDocument` + opcionális facets.
 */
import { NextResponse } from 'next/server';
import { executePublicSearch, listSearchFacetCategories } from '@/lib/search/execute-search';
import { recordSearchQueryStat } from '@/lib/search/record-stat';
import { normalizeQueryForStat } from '@/lib/search/normalize-query-stat';
import { isSearchRateLimited, registerSearchRequest } from '@/lib/security/search-rate-limit';

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (url.searchParams.get('facets') === '1') {
    try {
      const categories = await listSearchFacetCategories();
      return NextResponse.json({ categories });
    } catch {
      return NextResponse.json({ error: 'facets_unavailable', categories: [] }, { status: 500 });
    }
  }

  const q = (url.searchParams.get('q') ?? '').slice(0, 200);
  const categories = (url.searchParams.get('categories') ?? '').slice(0, 800);
  const modules = (url.searchParams.get('modules') ?? '').slice(0, 80);

  const hasQuery = q.trim().length > 0;
  const hasCategories = categories.split(',').some((c) => c.trim().length > 0);

  if (!hasQuery && !hasCategories) {
    return NextResponse.json({ items: [] });
  }

  if (hasQuery && isSearchRateLimited(request)) {
    return NextResponse.json({ error: 'rate_limited', items: [] }, { status: 429 });
  }

  if (hasQuery) {
    registerSearchRequest(request);
  }

  try {
    const items = await executePublicSearch({
      query: q,
      categories: hasCategories ? categories : null,
      modules: modules.trim() ? modules : null,
      limit: 40,
    });

    const shouldStat = Boolean(normalizeQueryForStat(q));
    if (shouldStat && hasQuery) {
      void recordSearchQueryStat(q, items.length === 0).catch(() => {});
    }

    return NextResponse.json({
      items: items.map((row) => ({
        id: `${row.module}-${row.entityId}`,
        module: row.module,
        category: row.category || undefined,
        titleHu: row.titleHu,
        titleEn: row.titleEn,
        textHu: row.snippetHu,
        textEn: row.snippetEn,
        href: row.hrefPath,
      })),
    });
  } catch {
    return NextResponse.json({ error: 'search_failed', items: [] }, { status: 500 });
  }
}
