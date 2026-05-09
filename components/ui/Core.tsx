/**
 * @file Közös UI primitívek – oldalburkoló, kártya, szekció fejléc
 *
 * @description
 * Egyszerű, többnyire **szerverkomponensként** is használható elemek (nincs hook).
 * A `PageShell` vízszintes max szélességet és oldalsó margót ad (`app-shell` osztály).
 */
import type { ReactNode } from 'react';

/** Fő tartalom konténer – a legtöbb oldal ezzel kezdődik. */
export function PageShell({ children }: { children: ReactNode }) {
  return <div className="app-shell">{children}</div>;
}

/**
 * Kártya konténer – opcionálisan erősebb háttér (`card-strong`).
 * @param strong – vizuális hangsúly (landing / rich layout)
 */
export function Card({
  children,
  strong = false,
  className,
  dataExpandable = false,
}: {
  children: ReactNode;
  strong?: boolean;
  className?: string;
  dataExpandable?: boolean;
}) {
  const classes = ['card', 'card-pad', strong ? 'card-strong' : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes} data-expandable={dataExpandable ? 'true' : undefined} role={dataExpandable ? 'button' : undefined} tabIndex={dataExpandable ? 0 : undefined} aria-expanded={dataExpandable ? 'false' : undefined}>
      {children}
    </div>
  );
}

/**
 * Szekció fejléc három sorral: eyebrow (kis címke), cím, bevezető szöveg.
 * Statikus marketing / modul oldalakon használt minta.
 */
export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-head section-head-spaced">
      <small>{eyebrow}</small>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
