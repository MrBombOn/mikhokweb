import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { AboutPageClient } from './AboutPageClient';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('about', '/about');

export default function AboutPage() {
  return (
    <>
      <PublicRouteJsonLd routeKey="about" path="/about" layout="webpage" />
      <AboutPageClient />
    </>
  );
}
