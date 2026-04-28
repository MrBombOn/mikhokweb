import type { ReactNode } from 'react';
export function PageShell({ children }: { children: ReactNode }) { return <div className="app-shell">{children}</div>; }
export function Card({ children, strong = false }: { children: ReactNode; strong?: boolean }) { return <div className={`card ${strong ? 'card-strong' : ''}`} style={{ padding: 20 }}>{children}</div>; }
export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <div className="section-head" style={{ marginBottom: 18 }}><small>{eyebrow}</small><h2>{title}</h2><p>{text}</p></div>; }