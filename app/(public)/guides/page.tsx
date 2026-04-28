import type { Metadata } from 'next';
import { GuidesPageClient } from './GuidesPageClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Útmutatók',
  description: 'Ügyintézési és hallgatói útmutatók kereshető, kategorizált gyűjteménye.',
  path: '/guides',
});

export default function GuidesPage() {
  return <GuidesPageClient />;
}
