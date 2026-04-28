import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { SearchPageClient } from './SearchPageClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'Keresés',
  description: 'Globális kereső hírekhez, eseményekhez és útmutatókhoz, mentett keresésekkel.',
  path: '/search',
});

export default function SearchPage() {
  return (
    <PublicPageShell>
      <SearchPageClient />
    </PublicPageShell>
  );
}

