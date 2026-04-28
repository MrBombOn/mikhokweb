import { Card, SectionHeader } from '@/components/ui/Core';
export default function AdminContentPage() {
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Tartalomkezelés" text="Központi tartalomáttekintés és moderálás." />
      <Card><p style={{ color: 'var(--muted)' }}>Hírek, események, galéria és útmutatók összekapcsolása.</p></Card>
    </div>
  );
}
