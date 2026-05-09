/**
 * @file Belső (admin) route group layout – fejléc + visszalépés a publikus oldalra
 *
 * @description
 * Minden `/admin/...` útvonal ebbe a layout-ba kerül. A fejléc szövegei: `messages.internal` (HU/EN).
 */
import { AdminWorkspaceChrome } from '@/components/admin/AdminWorkspaceChrome';
import { InternalLayoutHeader } from '@/components/layout/InternalLayoutHeader';

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="section internal-layout-root">
      <InternalLayoutHeader />
      {children}
      <AdminWorkspaceChrome />
    </div>
  );
}
