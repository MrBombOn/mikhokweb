/** @file Admin – felhasználók `/admin/users` */
import { Card, SectionHeader } from '@/components/ui/Core';
export default function AdminUsersPage() {
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Felhasználók" text="Felhasználókezelés és szerepkörök (RBAC)." />
      <Card><p style={{ color: 'var(--muted)' }}>A lista és műveletek az auth réteg bekötése után töltődik.</p></Card>
    </div>
  );
}
