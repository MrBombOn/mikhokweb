/**
 * @file Belső (admin) zóna fejléc – i18n SSOT (`messages.internal`)
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/components/layout/AppProvider';
import { AdminNotificationBell } from '@/components/admin/AdminNotificationBell';
import { BrandMark } from '@/components/brand/BrandMark';
import { SettingsIcon } from '@/components/ui/Icons';
import { t } from '@/lib/content';

export function InternalLayoutHeader() {
  const pathname = usePathname();
  const { lang, isAdminRole } = useApp();
  const m = t(lang).internal;
  const subLinks = [
    { href: '/admin', label: m.layoutNavDashboard },
    { href: '/admin/categories', label: m.linkCategories },
    { href: '/admin/content', label: m.linkContent },
    { href: '/admin/feedback', label: m.linkFeedback },
    { href: '/admin/office', label: m.linkOfficeInternal },
  ];
  const adminOnlyLinks = isAdminRole
    ? [
        { href: '/admin/users', label: m.linkUsers },
        { href: '/admin/audit', label: m.linkAudit },
        { href: '/admin/feature-flags', label: m.linkFeatureFlags },
        { href: '/admin/retention', label: lang === 'hu' ? 'Retention' : 'Retention' },
        { href: '/admin/site-builder', label: lang === 'hu' ? 'Builder Studio' : 'Builder Studio' },
      ]
    : [];

  return (
    <header className="card internal-layout-header">
      <div className="internal-layout-header-row">
        <div className="internal-layout-header-brand">
          <BrandMark variant="internal" />
          <div>
            <div className="internal-layout-eyebrow">{m.layoutZoneEyebrow}</div>
            <div className="internal-layout-title internal-layout-title--with-icon">
              <SettingsIcon className="icon--sm internal-layout-title-icon" aria-hidden />
              {m.layoutZoneTitle}
            </div>
          </div>
        </div>
        <div className="internal-layout-header-actions">
          <span className="internal-layout-kbd-hint">{m.savedViewsKbdHint}</span>
          <AdminNotificationBell />
          <Link href="/" className="btn btn-secondary">
            {m.layoutBackToPublic}
          </Link>
        </div>
      </div>
      <nav className="internal-layout-subnav" aria-label={m.layoutSubnavAria}>
        {[...subLinks, ...adminOnlyLinks].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`internal-layout-subnav-link${pathname === item.href ? ' active' : ''}`}
            prefetch={false}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
