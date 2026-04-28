/** @file Admin – audit `/admin/audit` */
import { Card, SectionHeader } from '@/components/ui/Core';
export default function AdminAuditPage() {
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Audit napló" text="Érzékeny műveletek és változások vissakereshetősége." />
      <Card><p style={{ color: 'var(--muted)' }}>Az audit stream bekötése után jelenik meg.</p></Card>
    </div>
  );
}
