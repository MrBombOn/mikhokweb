/**
 * @file Galéria – `/gallery`
 */
import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { GalleryModule } from '@/components/gallery/GalleryModule';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('gallery', '/gallery');

export default function GalleryPage() {
  return (
    <PublicPageShell>
      <PublicRouteJsonLd routeKey="gallery" path="/gallery" layout="collection" />
      <div className="module-page-frame">
        <MotionReveal className="module-page-motion">
          <GalleryModule />
        </MotionReveal>
      </div>
    </PublicPageShell>
  );
}
