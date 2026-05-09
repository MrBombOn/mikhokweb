import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { HomePageClient } from './HomePageClient';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('home', '/');

export default function HomePage() {
  return (
    <>
      <PublicRouteJsonLd routeKey="home" path="/" layout="webpage" />
      <HomePageClient />
    </>
  );
}
