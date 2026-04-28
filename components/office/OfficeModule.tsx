/**
 * @file Office / iroda modul – nyitvatartás és kapcsolódó blokkok
 */
'use client';

import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { officeInfo } from '@/lib/content';
export function OfficeModule() {
  const { lang, openModal, isAdmin } = useApp();
  return <section className="section"><SectionHeader eyebrow="Office" title={lang === 'hu' ? 'Jobban csiszolt office oldal' : 'A more polished office page'} text={lang === 'hu' ? 'Az office oldalon csak a tényleg szerkeszthető adatoknál maradnak admin műveletek, például nyitvatartás vagy jelenléti blokk esetén.' : 'On the office page admin actions remain only around truly editable data such as opening hours and attendance blocks.'} /><div className="grid-2"><Card strong><h3>{lang === 'hu' ? 'Nyitvatartás' : 'Opening hours'}</h3><p style={{ color: 'var(--muted)' }}>{officeInfo[lang]}</p>{isAdmin ? <button className="btn btn-ghost">Nyitvatartás szerkesztése</button> : null}</Card><Card><h3>{lang === 'hu' ? 'Kapcsolódó információk' : 'Related information'}</h3><div className="stack" style={{ marginTop: 14 }}><div className="badge">NFC előkészítés</div><div className="badge">Jelenléti blokk</div><div className="badge">Ügyintézési gyorsgombok</div></div><div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}><button className="btn btn-primary" onClick={() => openModal(lang === 'hu' ? 'Office részletek' : 'Office details', officeInfo[lang])}>{lang === 'hu' ? 'Részletek' : 'Details'}</button>{isAdmin ? <button className="btn btn-ghost">Blokk szerkesztése</button> : null}</div></Card></div></section>;
}