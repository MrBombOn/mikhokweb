'use client';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { guideItems } from '@/lib/content';
export function GuidesModule() {
  const { lang, openModal, isAdmin } = useApp();
  return <section className="section"><SectionHeader eyebrow={lang === 'hu' ? 'Útmutatók' : 'Guides'} title={lang === 'hu' ? 'Útmutatók célzott admin műveletekkel' : 'Guides with targeted admin actions'} text={lang === 'hu' ? 'Az útmutatók oldalon csak a tartalmi blokkoknál jelennek meg a szerkesztési lehetőségek, ahol ez valóban indokolt.' : 'On the guides page editing appears only around content blocks where it is truly needed.'} /><div className="grid-2">{guideItems.map((item) => <Card key={item.id} strong><h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p style={{ color: 'var(--muted)' }}>{lang === 'hu' ? item.textHu : item.textEn}</p><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}><button className="btn btn-primary" onClick={() => openModal(lang === 'hu' ? item.titleHu : item.titleEn, lang === 'hu' ? item.textHu : item.textEn)}>{lang === 'hu' ? 'Megnyitás' : 'Open'}</button>{isAdmin ? <button className="btn btn-ghost">Szerkesztés</button> : null}</div></Card>)}</div></section>;
}