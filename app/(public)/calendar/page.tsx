import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { CalendarPageClient } from './CalendarPageClient';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('calendar', '/calendar');

export default function CalendarPage() {
  return (
    <>
      <PublicRouteJsonLd routeKey="calendar" path="/calendar" layout="collection" />
      <CalendarPageClient />
    </>
  );
}
