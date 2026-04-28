/**
 * @file Szűrő / mentett keresés chip – gombként, `aria-pressed` (D3)
 */
'use client';

import type { ReactNode } from 'react';

export function FilterChip({
  children,
  selected = false,
  onClick,
  className = '',
  'aria-label': ariaLabel,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}) {
  return (
    <button
      type="button"
      className={`filter-chip ${selected ? 'filter-chip--selected' : ''} ${className}`.trim()}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
