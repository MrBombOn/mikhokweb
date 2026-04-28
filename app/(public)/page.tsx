import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Főoldal',
  description: 'PTE MIK HÖK főoldal: kiemelt hírek, közlemények és gyors átjárás a hallgatói modulokhoz.',
  path: '/',
});

export default function HomePage() {
  return <HomePageClient />;
}
