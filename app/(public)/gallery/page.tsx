/**
 * @file Galéria marketing váz – `/gallery` (statikus; modul: `GalleryModule` más útvonalon is használható)
 */
import { Card, SectionHeader } from '@/components/ui/Core';
export default function GalleryPage() {
  return <div className="app-shell section"><SectionHeader eyebrow="Galéria" title="Részletesebb és hangsúlyosabb galéria felület" text="A galéria oldal nagyobb vizuális blokkokkal, kiemelt albumokkal és oldalsó információs résszel lett részletesebb." /><div className="content-grid-rich"><div className="grid-2">{['Gólyatábor', 'Sportnap', 'Kari est', 'Szakmai programok'].map((item, index) => <Card key={item} strong><div style={{ height: 220, borderRadius: 20, background: `linear-gradient(135deg, rgba(${40 + index * 30},92,255,0.28), rgba(255,255,255,0.65))`, marginBottom: 14 }} /><h3>{item}</h3><p style={{ color: 'var(--muted)' }}>Részletesebb vizuális albumkártya, leírással és hangsúlyosabb felületi kezeléssel.</p></Card>)}</div><div className="feature-list"><div className="feature-item"><strong>Kiemelt albumok</strong><p style={{ color: 'var(--muted)' }}>Nagyobb kártyák, részletesebb metaadatok és jobban elkülönülő tartalmi blokkok.</p></div><div className="feature-item"><strong>Szűrés és nézetek</strong><p style={{ color: 'var(--muted)' }}>A vizuális részletezés későbbi keresőkkel és admin feltöltési állapotokkal is jól bővíthető.</p></div></div></div></div>;
}
