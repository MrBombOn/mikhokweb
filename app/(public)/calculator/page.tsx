import type { Metadata } from 'next';
import { PublicRouteJsonLd } from '@/components/seo/PublicRouteJsonLd';
import { CalculatorPageClient } from './CalculatorPageClient';
import { buildPageMetadataFromMessages } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadataFromMessages('calculator', '/calculator');

export default function CalculatorPage() {
  return (
    <>
      <PublicRouteJsonLd routeKey="calculator" path="/calculator" layout="webpage" />
      <CalculatorPageClient />
    </>
  );
}
