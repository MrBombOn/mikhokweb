/**
 * @file Hírek – `/news` (közzétett hírek listája, GET /api/news)
 */
import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { NewsPageClient } from './NewsPageClient';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('news', '/news');

export default function NewsPage() {
  return (
    <PublicPageShell>
      <section className="section module-page-frame">
        <PublicRouteJsonLd routeKey="news" path="/news" layout="collection" />
        <NewsPageClient />
      </section>
    </PublicPageShell>
  );
}
