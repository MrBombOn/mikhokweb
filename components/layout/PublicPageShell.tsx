import type { ReactNode } from 'react';
import { PageShell } from '@/components/ui/Core';

export function PublicPageShell({ children }: { children: ReactNode }) {
  return <PageShell><div className="public-page-shell">{children}</div></PageShell>;
}
