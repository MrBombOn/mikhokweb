/**
 * @file Belső (admin) route group layout – fejléc + visszalépés a publikus oldalra
 *
 * @description
 * Minden `/admin/...` útvonal ebbe a layout-ba kerül. Vizuálisan jelzi, hogy „Belső zóna”
 * módban vagyunk, és egy gombbal vissza lehet menni a főoldalra.
 */
import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="section internal-layout-root">
      <header className="card internal-layout-header">
        <div className="internal-layout-header-brand">
          <BrandMark variant="internal" />
          <div>
            <div className="internal-layout-eyebrow">Belső zóna</div>
            <div className="internal-layout-title">Admin</div>
          </div>
        </div>
        <Link href="/" className="btn btn-secondary">
          Vissza a publikus oldalra
        </Link>
      </header>
      {children}
    </div>
  );
}
