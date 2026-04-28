/**
 * @file Belső (admin) route group layout – fejléc + visszalépés a publikus oldalra
 *
 * @description
 * Minden `/admin/...` útvonal ebbe a layout-ba kerül. Vizuálisan jelzi, hogy „Belső zóna”
 * módban vagyunk, és egy gombbal vissza lehet menni a főoldalra.
 */
import Link from 'next/link';

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="section" style={{ paddingTop: 12 }}>
      <header
        className="card"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '14px 18px',
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary)' }}>
            Belső zóna
          </div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Admin</div>
        </div>
        <Link href="/" className="btn btn-secondary">
          Vissza a publikus oldalra
        </Link>
      </header>
      {children}
    </div>
  );
}
