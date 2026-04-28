import { Card, SectionHeader } from '@/components/ui/Core';
/** Belső irodai munkafelület: a spec `(internal)/office/page.tsx` útvonala ütközne a nyilvános `/office`-szal, ezért `/admin/office`. */
export default function InternalOfficePage() {
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Office (belső)" title="Irodai munkafelület" text="Office szerepkörű szerkesztés és ütemezés." />
      <Card><p style={{ color: 'var(--muted)' }}>A nyilvános tájékoztató továbbra is a `/office` oldalon érhető el.</p></Card>
    </div>
  );
}
