import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us',
  description: 'A PTE MIK HÖK bemutatkozása, szervezeti blokkok és elérhető tisztségviselők.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutPageClient />;
}
