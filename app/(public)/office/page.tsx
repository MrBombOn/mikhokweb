/**
 * @file Office – `/office` (§16)
 */
import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { OfficeModule } from '@/components/office/OfficeModule';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('office', '/office');

export default function OfficePage() {
  return (
    <PublicPageShell>
      <PublicRouteJsonLd routeKey="office" path="/office" layout="webpage" />
      <div className="module-page-frame">
        <MotionReveal className="module-page-motion">
          <OfficeModule />
        </MotionReveal>
      </div>
    </PublicPageShell>
  );
}
