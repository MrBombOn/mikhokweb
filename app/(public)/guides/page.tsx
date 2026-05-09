import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { GuidesPageClient } from './GuidesPageClient';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('guides', '/guides');

export default function GuidesPage() {
  return (
    <>
      <PublicRouteJsonLd routeKey="guides" path="/guides" layout="collection" />
      <GuidesPageClient />
    </>
  );
}
