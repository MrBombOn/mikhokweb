'use client';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { aboutPeople } from '@/lib/content';
export function AboutModule() {
  const { lang, isAdmin } = useApp();
  return <section className="section"><SectionHeader eyebrow="About Us" title={lang === 'hu' ? 'Jobban csiszolt szervezeti blokk' : 'A more polished organizational block'} text={lang === 'hu' ? 'Az About Us oldalon a szerkesztési gombok csak a tagkártyáknál jelennek meg admin módban.' : 'On the About Us page editing buttons appear only on member cards in admin mode.'} /><div className="grid-3">{aboutPeople.map((person) => <Card key={person.id} strong><div style={{ width: 62, height: 62, borderRadius: 999, background: 'var(--accent)', marginBottom: 14 }} /><h3>{person.name}</h3><p style={{ color: 'var(--muted)' }}>{lang === 'hu' ? person.roleHu : person.roleEn}</p>{isAdmin ? <button className="btn btn-ghost">Profil szerkesztése</button> : null}</Card>)}</div></section>;
}