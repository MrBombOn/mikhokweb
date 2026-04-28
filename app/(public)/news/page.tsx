/**
 * @file Hírek – `/news` (közzétett hírek listája, GET /api/news)
 */
import { SectionHeader } from '@/components/ui/Core';
import { NewsPageClient } from './NewsPageClient';

export default function NewsPage() {
  return (
    <div className="app-shell section">
      <SectionHeader
        eyebrow="Hírek"
        title="Hírek"
        text="A közzétett hírek a Prisma + REST API-ból töltődnek. Szerkesztés és státuszkezelés a főoldalon, bejelentkezés után (OFFICE / ADMIN)."
      />
      <NewsPageClient />
    </div>
  );
}
