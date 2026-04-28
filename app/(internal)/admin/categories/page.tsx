import { Card, SectionHeader } from '@/components/ui/Core';
export default function AdminCategoriesPage() {
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Kategóriák" text="Kategóriatípusok modulonként." />
      <Card><p style={{ color: 'var(--muted)' }}>Szerkesztés jogosultsághoz kötött admin művelet.</p></Card>
    </div>
  );
}
