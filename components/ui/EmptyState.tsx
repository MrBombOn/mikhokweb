/**
 * @file Üres lista / nincs találat (D3)
 */
import type { ReactNode } from 'react';

export function EmptyState({
  title,
  description,
  children,
  id,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  /** `aria-labelledby` célja */
  id?: string;
}) {
  const headingId = id ?? 'empty-state-title';
  return (
    <section className="card empty-state" aria-labelledby={headingId}>
      <h2 className="empty-state-title" id={headingId}>
        {title}
      </h2>
      {description ? <p className="empty-state-desc">{description}</p> : null}
      {children ? <div className="empty-state-actions">{children}</div> : null}
    </section>
  );
}
