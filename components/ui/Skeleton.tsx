/**
 * @file Betöltéshez illő „váz” blokkok (D3) – layout-hű variantok
 */
import type { ReactNode } from 'react';

export type SkeletonVariant = 'newsList' | 'searchResults' | 'galleryGrid';

function Bar({ className = '' }: { className?: string }) {
  return <span className={`skeleton-block ${className}`.trim()} aria-hidden />;
}

export function Skeleton({ variant }: { variant: SkeletonVariant }): ReactNode {
  if (variant === 'newsList') {
    return (
      <ul className="stack skeleton-list" aria-hidden>
        {[0, 1, 2].map((i) => (
          <li key={i} className="card skeleton-news-card">
            <Bar className="skeleton-line skeleton-line--short" />
            <Bar className="skeleton-line skeleton-line--title" />
            <Bar className="skeleton-line" />
            <Bar className="skeleton-line" />
            <Bar className="skeleton-line skeleton-line--narrow" />
          </li>
        ))}
      </ul>
    );
  }

  if (variant === 'searchResults') {
    return (
      <div className="stack skeleton-list" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="card skeleton-search-card">
            <Bar className="skeleton-line skeleton-line--badge" />
            <Bar className="skeleton-line skeleton-line--title" />
            <Bar className="skeleton-line" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid-3 skeleton-list" aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="card skeleton-gallery-card">
          <Bar className="skeleton-aspect" />
          <Bar className="skeleton-line skeleton-line--title" />
          <Bar className="skeleton-line skeleton-line--narrow" />
        </div>
      ))}
    </div>
  );
}
