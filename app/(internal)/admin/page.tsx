/**
 * @file Admin irányítópult – `/admin`
 */
import { Card, SectionHeader } from '@/components/ui/Core';
export default function AdminDashboardPage() {
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Admin irányítópult" text="Felhasználók, kategóriák, tartalom és audit kezelése a specifikáció szerint." />
      <div className="grid-2">
        <Card><h3>Áttekintés</h3><p style={{ color: 'var(--muted)' }}>Rendszerállapot és napi operatív teendők helye.</p></Card>
        <Card><h3>Gyorsműveletek</h3><p style={{ color: 'var(--muted)' }}>Hivatkozások a felhasználó- és tartalomkezelő nézetekre.</p></Card>
      </div>
    </div>
  );
}
