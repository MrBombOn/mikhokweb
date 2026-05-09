/** @file Belső admin globális UX: onboarding + parancspaletta (P8). */
'use client';

import { AdminCommandPalette } from '@/components/admin/AdminCommandPalette';
import { AdminOnboardingWizard } from '@/components/admin/AdminOnboardingWizard';

export function AdminWorkspaceChrome() {
  return (
    <>
      <AdminOnboardingWizard />
      <AdminCommandPalette />
    </>
  );
}
