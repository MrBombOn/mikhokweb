/**
 * @file Hírek – `/news` (közzétett hírek listája, GET /api/news)
 */
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/Core';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { NewsPageClient } from './NewsPageClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Hírek',
  description: 'Hivatalos kari és hallgatói hírek, közlemények és információk a PTE MIK HÖK felületén.',
  path: '/news',
});

export default function NewsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PTE MIK HÖK hírek',
    description: 'Hivatalos hírek és közlemények gyűjteménye',
    inLanguage: ['hu-HU', 'en-US'],
  };
  return (
    <PublicPageShell>
      <section className="section">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <SectionHeader
          eyebrow="Hírek"
          title="Hírek"
          text="A közzétett hírek a Prisma + REST API-ból töltődnek. Szerkesztés és státuszkezelés a főoldalon, bejelentkezés után (OFFICE / ADMIN)."
        />
        <NewsPageClient />
      </section>
    </PublicPageShell>
  );
}
