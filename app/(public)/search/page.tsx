import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { buildPageMetadataFromMessages } from '@/lib/seo';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { SearchPageClient } from './SearchPageClient';

export const metadata: Metadata = buildPageMetadataFromMessages('search', '/search');

type PageProps = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const initialQuery = typeof sp.q === 'string' ? sp.q.trim() : '';

  return (
    <PublicPageShell>
      <PublicRouteJsonLd routeKey="search" path="/search" layout="webpage" />
      <SearchPageClient initialQuery={initialQuery} />
    </PublicPageShell>
  );
}

