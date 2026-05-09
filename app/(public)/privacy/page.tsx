import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { PrivacyPageClient } from './PrivacyPageClient';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('privacy', '/privacy');

export default function PrivacyPage() {
  return (
    <>
      <PublicRouteJsonLd routeKey="privacy" path="/privacy" layout="webpage" />
      <PrivacyPageClient />
    </>
  );
}
