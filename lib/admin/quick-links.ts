/**
 * @file Admin gyors navigáció – command palette és onboarding (P8).
 */
export type AdminQuickLink = {
  href: string;
  labelHu: string;
  labelEn: string;
  /** Csak ADMIN szerepkörnek jelenik meg. */
  adminOnly?: boolean;
};

export const ADMIN_QUICK_LINKS: AdminQuickLink[] = [
  { href: '/admin', labelHu: 'Irányítópult', labelEn: 'Dashboard' },
  { href: '/admin/categories', labelHu: 'Kategóriák', labelEn: 'Categories' },
  { href: '/admin/content', labelHu: 'Tartalom', labelEn: 'Content' },
  { href: '/admin/office', labelHu: 'Office (belső)', labelEn: 'Office (internal)' },
  { href: '/admin/feedback', labelHu: 'Visszajelzések', labelEn: 'Feedback' },
  { href: '/admin/users', labelHu: 'Felhasználók', labelEn: 'Users', adminOnly: true },
  { href: '/admin/audit', labelHu: 'Audit napló', labelEn: 'Audit log', adminOnly: true },
  { href: '/admin/feature-flags', labelHu: 'Feature flag-ek', labelEn: 'Feature flags', adminOnly: true },
  { href: '/admin/dependency-risk', labelHu: 'Függőség kockázat', labelEn: 'Dependency risk', adminOnly: true },
  { href: '/admin/integrations', labelHu: 'Integrációk', labelEn: 'Integrations' },
  { href: '/admin/retention', labelHu: 'Retention', labelEn: 'Retention', adminOnly: true },
  { href: '/admin/search-analytics', labelHu: 'Keresési analytics', labelEn: 'Search analytics' },
  { href: '/admin/site-builder', labelHu: 'Builder Studio', labelEn: 'Builder Studio', adminOnly: true },
];
