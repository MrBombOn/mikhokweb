/**
 * @file Belső irodai munkafelület – `/admin/office`
 *
 * @description
 * A master spec `(internal)/office` és `(public)/office` egyaránt `/office` lenne route group
 * nélkül – ezért a belső felület ide került. A nyilvános iroda: `/office`.
 */
import { Card, SectionHeader } from '@/components/ui/Core';
export default function InternalOfficePage() {
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Office (belső)" title="Irodai munkafelület" text="Office szerepkörű szerkesztés és ütemezés." />
      <Card><p style={{ color: 'var(--muted)' }}>A nyilvános tájékoztató továbbra is a `/office` oldalon érhető el.</p></Card>
    </div>
  );
}
