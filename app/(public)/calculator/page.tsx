import type { Metadata } from 'next';
import { CalculatorPageClient } from './CalculatorPageClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'KKI kalkulátor',
  description: 'Kreditindex (KI) és korrigált kreditindex (KKI) számítás hallgatói félévek alapján.',
  path: '/calculator',
});

export default function CalculatorPage() {
  return <CalculatorPageClient />;
}
