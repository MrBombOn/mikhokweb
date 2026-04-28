import type { Metadata } from 'next';
import { CalendarPageClient } from './CalendarPageClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Naptár',
  description: 'Hallgatói események és tornaterem foglalási információk egy naptárfelületen.',
  path: '/calendar',
});

export default function CalendarPage() {
  return <CalendarPageClient />;
}
