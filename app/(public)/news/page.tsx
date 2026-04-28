import { Card, SectionHeader } from '@/components/ui/Core';
export default function NewsPage() {
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Hírek" title="Hírek modul" text="A hírlista, részletes nézet, kategóriák és Office CRUD a PROJECT_MASTER_SPEC szerint erre a modulra épül." />
      <div className="content-grid-rich">
        <Card strong>
          <h3>Előkészített útvonal</h3>
          <p style={{ color: 'var(--muted)' }}>A tartalom és API-k bekötése a fejlesztési sorrend szerint készül el.</p>
        </Card>
      </div>
    </div>
  );
}
