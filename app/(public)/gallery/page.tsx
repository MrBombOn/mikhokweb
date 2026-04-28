/**
 * @file Galéria – `/gallery`
 */
import type { Metadata } from 'next';
import { AllModulesStack } from '@/components/landing/AllModulesStack';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Galéria',
  description: 'Kari és hallgatói programok képgalériája, mappa- és idővonal nézetekkel.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <PublicPageShell>
      <AllModulesStack primary="gallery" />
    </PublicPageShell>
  );
}
