/**
 * @file Publikus modul oldalak — OFFICE/ADMIN szerkesztői sáv
 *
 * A szerkesztői gombok vizuálisan elkülönülnek a vendég UI-tól (dashed keret, szerepkör jelölés).
 */
'use client';

import type { ReactNode } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export function ModuleAdminToolbar({
  title,
  ariaLabel,
  children,
}: {
  title: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  const { lang, sessionUser } = useApp();
  const dict = t(lang);
  const badge =
    sessionUser?.role === 'ADMIN'
      ? dict.common.moduleAdminToolbarBadgeAdmin
      : dict.common.moduleAdminToolbarBadgeOffice;

  return (
    <div className="module-admin-toolbar" role="region" aria-label={ariaLabel}>
      <span className="module-admin-toolbar-badge">{badge}</span>
      <span className="module-admin-toolbar-title">{title}</span>
      <div className="module-admin-toolbar-actions">{children}</div>
    </div>
  );
}
