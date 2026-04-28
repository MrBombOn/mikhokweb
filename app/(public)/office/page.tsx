/**
 * @file Office – `/office` (§16)
 */
import type { Metadata } from 'next';
import { AllModulesStack } from '@/components/landing/AllModulesStack';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Office',
  description: 'Irodai nyitvatartás, ügyintézési státusz és aktuális hallgatói információk.',
  path: '/office',
});

export default function OfficePage() {
  return (
    <PublicPageShell>
      <AllModulesStack primary="office" />
    </PublicPageShell>
  );
}
