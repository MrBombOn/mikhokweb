# WEBLAP PROJECT SNAPSHOT

PROJECT_NAME: pte-mik-hok-web
PROJECT_VERSION: 27.3
PROJECT_TAG: snapshot
ROOT: F:\WEB\source\pte-mik-hok-web
GENERATED_UTC: 2026-04-27T23:35:12.6108861Z
FILE_COUNT: 69
BINARY_BASE64_ENABLED: True
MAX_BASE64_BYTES: 5242880

## FOLDER_STRUCTURE
```text
.
.\app
.\app\about
.\app\calculator
.\app\calendar
.\app\gallery
.\app\guides
.\app\office
.\components
.\components\about
.\components\calculator
.\components\calendar
.\components\gallery
.\components\guides
.\components\landing
.\components\layout
.\components\office
.\components\ui
.\docs
.\lib
.\types
.\app\about\page.tsx
.\app\calculator\page.tsx
.\app\calendar\page.tsx
.\app\gallery\page.tsx
.\app\globals.css
.\app\guides\page.tsx
.\app\layout.tsx
.\app\office\page.tsx
.\app\page.tsx
.\components\about\AboutModule.tsx
.\components\calculator\CalculatorModule.tsx
.\components\calendar\CalendarModule.tsx
.\components\gallery\GalleryModule.tsx
.\components\guides\GuidesModule.tsx
.\components\landing\LandingHero.tsx
.\components\landing\LandingNews.tsx
.\components\layout\AdminLoginModal.tsx
.\components\layout\AppProvider.tsx
.\components\layout\Footer.tsx
.\components\layout\ModalHost.tsx
.\components\layout\Navbar.tsx
.\components\layout\ScrollTopButton.tsx
.\components\layout\ToastViewport.tsx
.\components\office\OfficeModule.tsx
.\components\ui\AdminModal.tsx
.\components\ui\Core.tsx
.\components\ui\Icons.tsx
.\docs\V19-homepage-plan.md
.\docs\V24-news-module-notes.md
.\docs\V25_10-fix-summary.md
.\docs\V25_11-fix-summary.md
.\docs\V25_12-fix-summary.md
.\docs\V25_13-audit-summary.md
.\docs\V25_14-function-audit.md
.\docs\V25_17-implementation-audit.md
.\docs\V25_1-fixes.md
.\docs\V25_2-news-admin-documentation.md
.\docs\V25_3-news-focus-documentation.md
.\docs\V25_4-fix-summary.md
.\docs\V25_5-fix-summary.md
.\docs\V25_6-fix-summary.md
.\docs\V25_7-fix-summary.md
.\docs\V25_8-fix-summary.md
.\docs\V25_9-fix-summary.md
.\docs\V26_1-navbar-refine.md
.\docs\V26_2-navbar-cleanup.md
.\docs\V26_3-navbar-modal-unify.md
.\docs\V26_4-navbar-stability.md
.\docs\V26_5-hero-navbar-transition.md
.\docs\V26_6-navbar-flicker-fix.md
.\docs\V26_7-mobile-navbar.md
.\docs\V26_8-nav-width-scroll.md
.\docs\V26-navbar-audit.md
.\docs\V27_1-calendar-fix.md
.\docs\V27_2-calendar-unification.md
.\docs\V27_3-calendar-refine.md
.\docs\V27_4-timeline-and-modal.md
.\docs\V27-calendar-module.md
.\lib\content.ts
.\lib\landingDictionary.ts
.\make_weblap_snapshot_max_precision.ps1
.\next.config.ts
.\next-env.d.ts
.\package.json
.\package-lock.json
.\README.md
.\run_weblap_snapshot.bat
.\tsconfig.json
.\types\index.ts
```

## FILE_RECORDS

===== BEGIN FILE RECORD =====
PATH: \app\about\page.tsx
NAME: page.tsx
SIZE: 1360
SHA256: 640ad5354db281ed585eac1b0f1faec8dfc72892ec81b5b4224616ae13906878
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9610426Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7610745Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import { Card, SectionHeader } from '@/components/ui/Core';
export default function AboutPage() {
  return <div className="app-shell section"><SectionHeader eyebrow="About Us" title="Részletesebb HÖK bemutatkozó oldal" text="Az About Us oldal hangsúlyosabb blokkokkal, szervezeti kártyákkal és áttekinthetőbb bemutatkozó szerkezettel lett vizuálisan gazdagabb." /><div className="content-grid-rich"><div className="stack"><Card strong><h3>Szervezeti felépítés</h3><p style={{ color: 'var(--muted)' }}>A vezetői és képviselői struktúra külön blokkban, könnyebben átlátható felépítésben jelenik meg.</p></Card><div className="grid-2">{['Elnök', 'Alelnök', 'Képviselők', 'Korábbi tagok'].map((item) => <Card key={item}><h4>{item}</h4><p style={{ color: 'var(--muted)' }}>Részletesebb leíró kártya az adott szerepkör vagy csoport bemutatására.</p></Card>)}</div></div><div className="feature-list"><div className="feature-item"><strong>Kapcsolódási pontok</strong><p style={{ color: 'var(--muted)' }}>A hallgatók gyorsabban megtalálhatják, kihez érdemes fordulni különböző ügyekben.</p></div><div className="feature-item"><strong>Történeti blokk</strong><p style={{ color: 'var(--muted)' }}>A korábbi évek és tagság bemutatása jobban tagolt vizuális egységekben történik.</p></div></div></div></div>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \app\calculator\page.tsx
NAME: page.tsx
SIZE: 237
SHA256: c542e148c04cb036e3733f3948552d1fb84534e24cc174dcba1117ff7cba03e5
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9423231Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7646879Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { CalculatorModule } from '@/components/calculator/CalculatorModule';
import { PageShell } from '@/components/ui/Core';
export default function CalculatorPage() { return <PageShell><CalculatorModule /></PageShell>; }
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \app\calendar\page.tsx
NAME: page.tsx
SIZE: 227
SHA256: 8feef6f364f68fe9e6ba29af350796bca62b6843f7fc64ea04163c8b80fb5e24
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9367787Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7666900Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { CalendarModule } from '@/components/calendar/CalendarModule';
import { PageShell } from '@/components/ui/Core';
export default function CalendarPage() { return <PageShell><CalendarModule /></PageShell>; }
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \app\gallery\page.tsx
NAME: page.tsx
SIZE: 1333
SHA256: becb8c1292bcdf5d953fb11c3b491caf34b22d2dafde8dbedfe04a0d7a792fe3
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9485951Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7676900Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import { Card, SectionHeader } from '@/components/ui/Core';
export default function GalleryPage() {
  return <div className="app-shell section"><SectionHeader eyebrow="Galéria" title="Részletesebb és hangsúlyosabb galéria felület" text="A galéria oldal nagyobb vizuális blokkokkal, kiemelt albumokkal és oldalsó információs résszel lett részletesebb." /><div className="content-grid-rich"><div className="grid-2">{['Gólyatábor', 'Sportnap', 'Kari est', 'Szakmai programok'].map((item, index) => <Card key={item} strong><div style={{ height: 220, borderRadius: 20, background: `linear-gradient(135deg, rgba(${40 + index * 30},92,255,0.28), rgba(255,255,255,0.65))`, marginBottom: 14 }} /><h3>{item}</h3><p style={{ color: 'var(--muted)' }}>Részletesebb vizuális albumkártya, leírással és hangsúlyosabb felületi kezeléssel.</p></Card>)}</div><div className="feature-list"><div className="feature-item"><strong>Kiemelt albumok</strong><p style={{ color: 'var(--muted)' }}>Nagyobb kártyák, részletesebb metaadatok és jobban elkülönülő tartalmi blokkok.</p></div><div className="feature-item"><strong>Szűrés és nézetek</strong><p style={{ color: 'var(--muted)' }}>A vizuális részletezés későbbi keresőkkel és admin feltöltési állapotokkal is jól bővíthető.</p></div></div></div></div>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \app\globals.css
NAME: globals.css
SIZE: 38251
SHA256: d12fc9e50ea2639a12e7b456361bc1102d5b8f429d9234516de2ab8e1e3aa928
BINARY: False
LANG: css
CREATED_UTC: 2026-04-27T21:37:11.9730542Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7703398Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
:root {
  --bg: #eef4ff;
  --bg-soft: #f7faff;
  --surface: rgba(255,255,255,0.86);
  --surface-strong: rgba(255,255,255,0.96);
  --text: #13233f;
  --muted: #607493;
  --line: rgba(97,124,169,0.20);
  --primary: #215cff;
  --primary-strong: #143faa;
  --accent: rgba(33,92,255,0.10);
  --success: #56c088;
  --warning: #f1b24b;
  --danger: #ff7680;
  --pink: #ff7dbc;
  --purple: #9e8dff;
  --teal: #3ec8c8;
  --radius-sm: 14px;
  --radius-md: 20px;
  --radius-lg: 30px;
  --shadow-sm: 0 10px 26px rgba(26,71,168,0.08);
  --shadow-md: 0 18px 44px rgba(26,71,168,0.12);
  --shadow-lg: 0 28px 70px rgba(26,71,168,0.14);
  --transition: 180ms ease;
}
html[data-theme='dark'] {
  --bg: #091120;
  --bg-soft: #101a30;
  --surface: rgba(17,26,45,0.82);
  --surface-strong: rgba(13,21,36,0.96);
  --text: #edf4ff;
  --muted: #aac0e3;
  --line: rgba(148,163,184,0.18);
  --primary: #7ea7ff;
  --primary-strong: #5b88f0;
  --accent: rgba(126,167,255,0.13);
  --shadow-sm: 0 10px 26px rgba(0,0,0,0.22);
  --shadow-md: 0 18px 44px rgba(0,0,0,0.28);
  --shadow-lg: 0 28px 70px rgba(0,0,0,0.34);
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; min-height: 100%; scroll-behavior: smooth; }
body {
  font-family: Arial, Helvetica, sans-serif;
  background:
    radial-gradient(circle at 0% 0%, rgba(33,92,255,0.15), transparent 24%),
    radial-gradient(circle at 100% 0%, rgba(33,92,255,0.10), transparent 24%),
    linear-gradient(180deg, var(--bg-soft), var(--bg));
  color: var(--text);
}
a { color: inherit; text-decoration: none; }
button, input, textarea, select { font: inherit; }
main { padding-bottom: 100px; }
.app-shell { width: min(1280px, calc(100% - 24px)); margin: 0 auto; }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); backdrop-filter: blur(16px); }
.card-strong { background: var(--surface-strong); box-shadow: var(--shadow-md); }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 11px 16px; border-radius: 14px; border: 1px solid transparent; cursor: pointer; transition: var(--transition); }
.btn:hover { transform: translateY(-1px); }
.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { background: var(--primary-strong); }
.btn-secondary { background: var(--accent); color: var(--text); border-color: var(--line); }
.btn-ghost { background: transparent; color: var(--text); border-color: var(--line); }
.input, .select { width: 100%; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); background: rgba(255,255,255,0.96); color: #0f172a; }
html[data-theme='dark'] .input, html[data-theme='dark'] .select { background: rgba(248,250,252,0.96); }
.badge { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 700; background: var(--accent); color: var(--primary); }
.section { padding-top: 30px; }
.stack { display: grid; gap: 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.section-head small { display: block; color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
.section-head h1, .section-head h2 { margin: 0; font-size: clamp(28px, 4vw, 46px); }
.section-head p { color: var(--muted); line-height: 1.72; max-width: 760px; }
.topbar { position: sticky; top: 0; z-index: 30; backdrop-filter: blur(18px); background: rgba(245,249,255,0.78); border-bottom: 1px solid var(--line); transition: var(--transition); }
html[data-theme='dark'] .topbar { background: rgba(9,17,32,0.82); }
.topbar.hidden-nav { background: transparent; border-bottom-color: transparent; backdrop-filter: none; }
.navbar { display: grid; grid-template-columns: auto 1fr auto; gap: 18px; align-items: center; padding: 14px 0; }
.brand { display: inline-flex; align-items: center; gap: 12px; }
.brand-logo { width: 42px; height: 42px; border-radius: 16px; background: linear-gradient(135deg, var(--primary), rgba(255,255,255,0.92)); box-shadow: var(--shadow-sm); }
.nav-links { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.nav-link { padding: 10px 14px; border-radius: 999px; font-weight: 700; color: var(--muted); transition: var(--transition); }
.nav-link:hover, .nav-link.active { background: var(--accent); color: var(--primary); }
.nav-actions { display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; }
.role-switch { display: inline-flex; gap: 8px; padding: 6px; border-radius: 999px; border: 1px solid var(--line); background: var(--surface); }
.landing-layout { min-height: calc(100vh - 90px); display: grid; grid-template-columns: 0.86fr 1.44fr; gap: 28px; align-items: center; }
.landing-side { padding: 6px 2px; }
.hok-logo-hero { width: min(340px, 100%); aspect-ratio: 1.08 / 1; border-radius: 0; background: linear-gradient(135deg, rgba(33,92,255,0.16), rgba(255,255,255,0.05)); box-shadow: none; border: none; }
.card-grid-2x3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.module-card { min-height: 250px; padding: 30px; border-radius: 28px; color: white; position: relative; overflow: hidden; box-shadow: var(--shadow-md); transition: var(--transition); }
.module-card:hover { transform: translateY(-4px) scale(1.01); }
.module-card::after { content: ''; position: absolute; inset: auto -10% -18% auto; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.14); }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
.news-toggle-mobile { display: none; }
.news-toggle-desktop { display: inline-flex; }
.news-toolbar { display: grid; grid-template-columns: 1.2fr .9fr .9fr .9fr auto auto; gap: 12px; align-items: center; }
.source-tabs { display: flex; gap: 10px; flex-wrap: wrap; }
.news-list-card { padding: 22px; border-radius: 24px; background: linear-gradient(180deg, var(--surface-strong), var(--surface)); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
.feed-pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; background: var(--accent); color: var(--text); font-weight: 700; }
.soft-divider { height: 1px; background: var(--line); margin: 16px 0; }
.footer { margin-top: 56px; border-top: 1px solid var(--line); background: rgba(255,255,255,0.42); backdrop-filter: blur(12px); }
html[data-theme='dark'] .footer { background: rgba(9,17,32,0.42); }
.footer-inner { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 20px; padding: 28px 0; }
@media (max-width: 1080px) {
  .landing-layout { grid-template-columns: 1fr; }
  .card-grid-2x3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .news-toolbar { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 900px) {
  .navbar { grid-template-columns: 1fr; }
  .nav-links, .nav-actions { justify-content: flex-start; }
  .grid-2, .grid-3, .card-grid-2x3, .footer-inner, .news-toolbar { grid-template-columns: 1fr; }
  .news-toggle-mobile { display: inline-flex; }
  .news-toggle-desktop { display: none; }
}

.{display:inline-flex;align-items:center;justify-content:center;width:58px;height:58px;border-radius:999px;border:1px solid var(--line);background:var(--surface);box-shadow:var(--shadow-sm);cursor:pointer;transition:var(--transition);}
.:hover{transform:translateY(2px);background:var(--surface-strong);}
. svg{width:24px;height:24px;}
.back-to-top{position:fixed;right:18px;bottom:18px;z-index:35;opacity:0;pointer-events:none;transform:translateY(10px);transition:var(--transition);}
.back-to-top.nav-actions .empty-slot{display:none;}
.news-toggle-wrap{display:flex;justify-content:flex-start;margin-top:14px;}

.back-to-top{position:fixed;right:20px;bottom:20px;z-index:90;opacity:0;pointer-events:none;transform:translateY(10px);transition:var(--transition);}
.back-to-top.back-to-top .{width:56px;height:56px;background:var(--surface-strong);}
.news-toggle-wrap{display:flex;justify-content:flex-start;margin-top:16px;}
@media (max-width:900px){.news-list-card > div{grid-template-columns:1fr !important;}}

#landing-news{scroll-margin-top:110px;}
.news-toggle-wrap{display:flex;justify-content:center;align-items:center;margin-top:18px;}
.footer{margin-top:28px !important;}
.back-to-top{position:fixed !important;right:22px !important;bottom:22px !important;left:auto !important;top:auto !important;z-index:9999 !important;}
.back-to-top .{box-shadow:var(--shadow-lg);}
.news-module-grid{display:grid;grid-template-columns:1.3fr .9fr;gap:18px;align-items:start;}
.news-side-panel{padding:24px;border-radius:24px;background:linear-gradient(180deg,var(--surface-strong),var(--surface));border:1px solid var(--line);box-shadow:var(--shadow-sm);}
.news-mini-list{display:grid;gap:12px;}
.news-mini-item{padding:14px 16px;border-radius:18px;border:1px solid var(--line);background:var(--surface);}
@media (max-width:900px){.news-module-grid{grid-template-columns:1fr;}}

html, body { overflow-x: clip; }
.news-list-card.clickable { cursor:pointer; }
.news-list-card.clickable:hover { transform: translateY(-2px); }
.news-cover { border-radius: 18px; min-height: 150px; background-size: cover; background-position: center; border: 1px solid var(--line); }
.news-cover.blue { background-image: linear-gradient(135deg, rgba(33,92,255,0.92), rgba(95,134,255,0.78)); }
.news-cover.pink { background-image: linear-gradient(135deg, rgba(253,29,29,0.82), rgba(193,53,132,0.78), rgba(131,58,180,0.74)); }
.news-cover.teal { background-image: linear-gradient(135deg, rgba(31,180,170,0.88), rgba(74,222,128,0.68)); }
.news-cover.gold { background-image: linear-gradient(135deg, rgba(245,158,11,0.88), rgba(250,204,21,0.72)); }
.footer { margin-top: 24px !important; }

html, body { min-height: 100%; }
body { display:flex; flex-direction:column; min-height:100vh; }
main { flex:1 0 auto; }
.footer { flex-shrink:0; margin-top:24px !important; }
.modal-overlay{position:fixed;inset:0;z-index:12000;background:rgba(5,10,20,0.52);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:24px;}
.modal-panel{width:min(920px,100%);max-height:min(88vh,900px);overflow:auto;border-radius:28px;background:var(--surface-strong);border:1px solid var(--line);box-shadow:var(--shadow-lg);padding:24px;}
.modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media (max-width:900px){.modal-grid{grid-template-columns:1fr;}}
.admin-chip-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;}
.admin-toolbar{display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:18px;}
.search-admin-row{display:grid;grid-template-columns:1fr auto auto;gap:12px;align-items:center;}
@media (max-width:900px){.search-admin-row{grid-template-columns:1fr;}}


.landing-news-arrow-wrap{display:flex;justify-content:center;margin-top:22px;}
.landing-news-arrow{width:56px;height:56px;border-radius:999px;border:1px solid var(--border);background:var(--surface);color:var(--text);display:inline-flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);transition:var(--transition);}
.landing-news-arrow:hover{transform:translateY(2px);background:var(--surface-strong);}
.landing-news-arrow svg{width:22px;height:22px;}
.modal-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}
.news-form-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px;}
@media (max-width: 820px){.modal-grid{grid-template-columns:1fr;}}

.hero-card-grid + .landing-news-arrow-wrap,.landing-card-grid + .landing-news-arrow-wrap,
.collapsible-shell{border:1px solid var(--border);border-radius:20px;background:var(--surface);overflow:hidden;}
.collapsible-trigger{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;background:transparent;border:none;color:var(--text);font-weight:700;text-align:left;}
.collapsible-panel{padding:0 18px 18px;}
.collapsible-chevron{transition:var(--transition);display:inline-flex;width:18px;height:18px;}
.collapsible-chevron.open{transform:rotate(180deg);}
footer [class*='scroll'], footer [id*='scroll'], footer button[aria-label*='top' i], footer button[title*='top' i]{display:none !important;}
body > button[aria-label*='top' i], body > a[aria-label*='top' i], body > div[class*='scrolltop'], body > div[id*='scrolltop']{display:none !important;}

.landing-news-arrow-wrap{display:flex;justify-content:center;margin-top:18px;width:100%;}

.admin-module-panel{display:grid;gap:12px;margin:18px 0 22px;}
.admin-module-actions{display:flex;flex-wrap:wrap;gap:10px;}
.admin-module-stage{border:1px solid var(--border);border-radius:22px;background:var(--surface);padding:18px;}
html body [aria-label*='lap tetej' i],
html body [title*='lap tetej' i],
html body [aria-label*='back to top' i],
html body [title*='back to top' i],
html body [class*='scrolltop'],
html body [class*='backtotop'],
html body [id*='scrolltop'],
html body [id*='backtotop']{display:none !important;visibility:hidden !important;opacity:0 !important;pointer-events:none !important;}
footer *[class*='scroll'], footer *[id*='scroll'], footer button, footer a{scroll-margin-bottom:0;}


.landing-news-arrow-bottom{margin-top:20px;padding-bottom:4px;justify-content:center;align-items:center;}
.landing-news-arrow-bottom .landing-news-arrow{margin-inline:auto;}


.landing-news-arrow-bottom{margin-top:8px;padding-bottom:0;transform:translateY(-10px);}
.landing-news-arrow-label{font-size:14px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin-right:10px;}
.landing-news-arrow-bottom{display:flex;justify-content:center;align-items:center;gap:10px;}


.landing-news-inline-cta{display:flex;justify-content:center;align-items:center;width:100%;margin-top:-2px;padding-top:10px;padding-bottom:2px;position:relative;z-index:3;}
.landing-news-arrow-inline{display:inline-flex;align-items:center;gap:10px;border:0;background:transparent;color:var(--text);cursor:pointer;padding:10px 14px;border-radius:999px;}
.landing-news-arrow-inline:hover{background:color-mix(in srgb,var(--surface) 78%, transparent);}
.landing-news-arrow-label{font-size:15px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:var(--text);line-height:1;}
.landing-news-arrow-icon{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:999px;border:1px solid var(--border);background:var(--surface);}
.landing-news-arrow-icon svg{width:18px;height:18px;}
#landing-news .landing-news-arrow-wrap, #landing-news .landing-news-arrow-inline, #landing-news .landing-news-arrow-label, #landing-news .landing-news-arrow-icon{display:none !important;}


.landing-news-inline-cta{margin-top:-18px !important;padding-top:0 !important;padding-bottom:0 !important;transform:translateY(-18px) !important;}
.landing-news-arrow-inline{padding:8px 12px !important;background:color-mix(in srgb,var(--surface) 88%, transparent) !important;backdrop-filter:blur(10px);}
.landing-news-arrow-label{font-size:14px !important;font-weight:600 !important;letter-spacing:.03em !important;}
.news-module-grid.with-admin{display:grid;grid-template-columns:minmax(0,1.45fr) 300px;gap:18px;align-items:start;}
.news-module-grid.full-news{display:block;}
.news-module-grid.full-news > .stack:first-child{width:100%;}
.admin-actions-panel{position:sticky;top:110px;}
.admin-module-actions.vertical{display:flex;flex-direction:column;gap:10px;}
.admin-modal-shell{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;padding:24px;}
.admin-modal-backdrop{position:absolute;inset:0;background:rgba(8,12,20,.56);backdrop-filter:blur(8px);}
.admin-modal{position:relative;z-index:1;max-width:980px;width:min(100%,980px);max-height:min(86vh,920px);overflow:auto;padding:22px;border-radius:24px;}
.admin-modal-header{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px;}
@media (max-height: 860px){
  .landing-news-inline-cta{transform:translateY(-30px) !important;}
}
@media (max-width: 1100px){
  .news-module-grid.with-admin{grid-template-columns:1fr;}
  .admin-actions-panel{position:static;}
}


.landing-hero-news-cta{display:flex;justify-content:center;align-items:center;width:100%;margin-top:6px !important;padding-top:0 !important;padding-bottom:0 !important;transform:translateY(-34px) !important;position:relative;z-index:4;}
.landing-hero-news-trigger{display:inline-flex;align-items:center;gap:8px;background:transparent !important;border:none !important;box-shadow:none !important;padding:0 !important;margin:0 !important;color:var(--text);cursor:pointer;}
.landing-hero-news-trigger:hover{opacity:.86;transform:translateY(1px);}
.landing-hero-news-trigger svg{width:18px;height:18px;}
.landing-hero-news-text{font-size:14px;font-weight:500;letter-spacing:.02em;color:var(--text);}
.landing-news-inline-cta,.landing-news-arrow-inline,.landing-news-arrow-icon,.landing-news-arrow-wrap,.landing-news-arrow-bottom{display:none !important;}
.admin-modal-shell{position:fixed !important;inset:0 !important;width:100vw !important;height:100vh !important;z-index:9999 !important;display:flex !important;align-items:center !important;justify-content:center !important;padding:24px !important;}
.admin-modal-backdrop{position:fixed !important;inset:0 !important;top:0 !important;right:0 !important;bottom:0 !important;left:0 !important;width:100vw !important;height:100vh !important;background:rgba(8,12,20,.56) !important;backdrop-filter:blur(10px) !important;-webkit-backdrop-filter:blur(10px) !important;z-index:0 !important;}
.admin-modal{position:relative !important;z-index:1 !important;}
body:has(.admin-modal-shell){overflow:hidden;}
#landing-news .landing-hero-news-cta{display:none !important;}


body.admin-modal-open{overflow:hidden;}
.admin-modal-portal{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:24px;}
.admin-modal-underlay{position:fixed;inset:0;background:rgba(7,10,18,.58);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}
.admin-modal-window{position:relative;z-index:1;width:min(100%,980px);max-height:min(88vh,920px);overflow:auto;padding:24px;border-radius:24px;box-shadow:0 24px 80px rgba(0,0,0,.35);}
.admin-modal-content{display:block;}
.hero-news-inline-link{display:inline-flex;align-items:center;gap:8px;background:none;border:none;padding:0;margin-top:10px;color:var(--text);font-size:14px;font-weight:500;cursor:pointer;}
.hero-news-inline-link svg{width:18px;height:18px;}
.hero-news-inline-link:hover{opacity:.82;}
.landing-hero-news-cta,.landing-news-inline-cta,.landing-news-arrow-wrap,.landing-news-arrow-bottom,.landing-news-arrow-inline,.landing-news-arrow-icon,.landing-news-arrow-label{display:none !important;}


@media (max-width: 980px){
  .landing-layout{grid-template-columns:1fr !important;gap:24px !important;}
  .news-module-grid.with-admin,.news-module-grid.full-news{grid-template-columns:1fr !important;}
  .news-toolbar{display:grid !important;grid-template-columns:1fr !important;}
  .modal-grid{grid-template-columns:1fr !important;}
  .news-list-card > div{grid-template-columns:1fr !important;}
}
@media (max-width: 640px){
  .section{padding-inline:14px !important;}
  .card-grid-2x3{grid-template-columns:1fr !important;}
  .admin-modal-window{width:min(100%,96vw) !important;padding:16px !important;max-height:90vh !important;}
}


.landing-topbar-minimal{background:transparent;border-bottom:none;box-shadow:none;}
.topbar-solid{background:color-mix(in srgb, var(--surface) 86%, transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.navbar-full,.navbar-minimal{display:grid;align-items:center;gap:16px;min-height:74px;}
.navbar-full{grid-template-columns:auto 1fr auto;}
.navbar-minimal{grid-template-columns:1fr auto;}
.brand-compact{display:inline-flex;align-items:center;gap:12px;text-decoration:none;color:inherit;min-width:0;}
.brand-logo.small{width:36px;height:36px;border-radius:12px;}
.brand-copy{display:flex;flex-direction:column;line-height:1.1;}
.brand-sub{font-size:12px;color:var(--muted);margin-top:3px;}
.nav-actions-minimal{margin-left:auto;display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end;}
.navbar-lang-btn{min-width:88px;}
.navbar-login-btn{min-width:132px;}
.hidden-nav .brand,.hidden-nav .nav-links{display:none;}
@media (max-width: 1100px){.navbar-full{grid-template-columns:1fr;}.nav-links{display:flex;flex-wrap:wrap;justify-content:center;}.nav-actions{justify-content:center;flex-wrap:wrap;}}
@media (max-width: 700px){.navbar-full,.navbar-minimal{min-height:64px;}.brand-copy strong{font-size:14px;}.brand-sub{font-size:11px;}.nav-actions,.nav-actions-minimal{gap:8px;}.navbar-login-btn{min-width:auto;}}


.floating-landing-controls{position:fixed;top:18px;right:18px;z-index:60;display:flex;align-items:flex-start;gap:10px;}
.floating-control,.floating-login-card{border:1px solid var(--border);background:color-mix(in srgb, var(--surface) 88%, transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 12px 30px rgba(0,0,0,.10);}
.floating-control{width:48px;height:48px;border-radius:16px;display:inline-flex;align-items:center;justify-content:center;color:var(--text);}
.flag-btn{font-size:22px;line-height:1;}
.theme-btn svg{width:18px;height:18px;}
.floating-login-card{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;min-width:118px;min-height:84px;padding:14px 16px;border-radius:22px;text-align:left;}
.floating-login-title{font-size:11px;letter-spacing:.18em;color:var(--muted);}
.floating-login-sub{font-size:16px;font-weight:700;margin-top:6px;}
.login-panel-backdrop{justify-content:flex-end;align-items:stretch;}
.login-side-panel{width:min(420px,100vw);height:100dvh;max-height:none;border-radius:28px 0 0 28px;margin-left:auto;padding:28px;overflow:auto;box-shadow:-18px 0 48px rgba(0,0,0,.18);}
@media (max-width: 700px){.floating-landing-controls{top:12px;right:12px;gap:8px;}.floating-control{width:44px;height:44px;border-radius:14px;}.floating-login-card{min-width:96px;min-height:72px;padding:12px 14px;border-radius:18px;}.floating-login-sub{font-size:14px;}.login-side-panel{width:min(100vw,100%);border-radius:22px 22px 0 0;height:auto;max-height:92dvh;margin-top:auto;}}


.floating-landing-controls{position:fixed;top:18px;right:18px;z-index:60;}
.compact-actions{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--border);border-radius:24px;background:color-mix(in srgb, var(--surface) 90%, transparent);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 18px 40px rgba(0,0,0,.10);}
.nav-icon-btn{position:relative;width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;border-radius:16px;}
.lang-badge{position:absolute;right:6px;bottom:4px;font-size:13px;line-height:1;filter:saturate(1.05);}
.nav-login-btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding-inline:16px;border-radius:16px;}
.nav-login-btn svg,.nav-icon-btn svg{width:18px;height:18px;}
.navbar-full{grid-template-columns:auto 1fr auto;gap:18px;min-height:74px;}
.nav-links{display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;}
.nav-link{padding:10px 14px;border-radius:14px;}
.topbar-solid{background:color-mix(in srgb, var(--surface) 82%, transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.login-panel-overlay{display:flex;align-items:center;justify-content:center;padding:24px;}
.login-float-panel{width:min(440px,calc(100vw - 24px));padding:26px;border-radius:28px;box-shadow:0 22px 60px rgba(0,0,0,.18);}
.login-panel-head{display:flex;align-items:flex-start;gap:12px;}
.login-panel-actions{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap;margin-top:20px;}
@media (max-width: 980px){.navbar-full{grid-template-columns:1fr;}.brand-compact{justify-content:center;}.nav-links,.nav-actions{justify-content:center;}}
@media (max-width: 700px){.floating-landing-controls{top:12px;right:12px;left:12px;}.compact-actions{width:100%;justify-content:flex-end;gap:8px;padding:8px 10px;border-radius:20px;}.nav-icon-btn{width:44px;height:44px;border-radius:14px;}.nav-login-btn{min-height:44px;padding-inline:14px;}.login-float-panel{padding:20px;border-radius:22px;}}


.admin-modal-portal{position:fixed;inset:0;z-index:12000;display:flex;align-items:center;justify-content:center;padding:24px;}
.admin-modal-underlay{position:absolute;inset:0;background:rgba(5,10,20,.52);backdrop-filter:blur(10px);}
.admin-modal-window{position:relative;z-index:1;width:min(760px,calc(100vw - 24px));max-height:min(88vh,900px);overflow:auto;border-radius:28px;background:var(--surface-strong);border:1px solid var(--line);box-shadow:var(--shadow-lg);padding:24px;}
.admin-modal-content{padding-top:6px;}
.floating-landing-controls{position:fixed;top:18px;left:0;right:0;z-index:60;pointer-events:none;}
.floating-landing-inner{display:flex;justify-content:flex-end;pointer-events:none;}
.landing-quick-controls{pointer-events:auto;}
.compact-actions{display:flex;align-items:center;gap:10px;padding:0;border:none;background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none;}
.nav-icon-btn{position:relative;width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;border-radius:16px;}
.nav-lang-btn{padding:0 12px 0 10px !important;width:auto;gap:8px;min-width:78px;}
.lang-code{font-size:12px;font-weight:700;letter-spacing:.08em;}
.nav-login-btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding-inline:16px;border-radius:16px;}
.navbar-full{grid-template-columns:auto 1fr auto;gap:18px;min-height:74px;}
.nav-links{display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;}
.nav-link{padding:10px 14px;border-radius:14px;}
@media (max-width: 980px){.navbar-full{grid-template-columns:1fr;}.brand-compact{justify-content:center;}.nav-links,.nav-actions{justify-content:center;}.floating-landing-inner{justify-content:flex-end;}}
@media (max-width: 700px){.floating-landing-controls{top:12px;}.compact-actions{gap:8px;}.nav-icon-btn{width:44px;height:44px;border-radius:14px;}.nav-lang-btn{min-width:72px;}.nav-login-btn{min-height:44px;padding-inline:14px;}.admin-modal-window{width:min(100vw - 16px,760px);padding:20px;border-radius:22px;}}


.floating-landing-controls{position:fixed;top:0;left:0;right:0;z-index:60;pointer-events:none;padding-top:18px;}
.floating-landing-inner{display:flex;justify-content:flex-end;pointer-events:none;}
.landing-quick-controls{pointer-events:auto;position:relative;}
.nav-login-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;min-width:164px;width:164px;padding-inline:16px;border-radius:16px;white-space:nowrap;}
@media (max-width:700px){.floating-landing-controls{padding-top:12px;}.nav-login-btn{min-width:148px;width:148px;min-height:44px;padding-inline:14px;}}


.floating-landing-controls{position:absolute;top:0;left:0;right:0;z-index:60;pointer-events:none;padding-top:18px;}
.landing-layout,.section{position:relative;}
.hero-news-jump-wrap{display:flex;justify-content:flex-start;margin-top:16px;}
.hero-news-jump{display:inline-flex;align-items:center;gap:10px;}
@media (max-width:700px){.floating-landing-controls{padding-top:12px;}.hero-news-jump-wrap{margin-top:14px;}}


.navbar-mobile-head{display:flex;align-items:center;justify-content:space-between;gap:12px;min-width:0;}
.mobile-menu-btn{display:none;flex-direction:column;gap:4px;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;padding:0;}
.mobile-menu-btn span{display:block;width:18px;height:2px;border-radius:999px;background:currentColor;}
.quick-controls-desktop{display:flex;}
.mobile-nav-panel{display:none;}
.mobile-nav-links{display:grid;gap:8px;}
.mobile-nav-link{min-height:48px;display:flex;align-items:center;padding:12px 14px;border-radius:16px;}
.mobile-quick-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px;}
.mobile-quick-controls .nav-icon-btn,.mobile-quick-controls .nav-login-btn{width:100%;min-width:0;}
.mobile-quick-controls .nav-login-btn{justify-content:center;}
@media (max-width: 980px){
  .navbar-full{grid-template-columns:1fr !important;gap:12px;min-height:auto;padding-block:12px;}
  .nav-links-desktop,.quick-controls-desktop{display:none;}
  .mobile-menu-btn{display:inline-flex;}
  .brand-compact{min-width:0;}
  .brand-copy{overflow:hidden;}
  .brand-copy strong,.brand-sub{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .mobile-nav-panel{display:none;padding-bottom:12px;}
  .mobile-nav-panel.open{display:grid;gap:10px;}
}
@media (max-width: 700px){
  .topbar-solid{padding-top:env(safe-area-inset-top,0px);}
  .mobile-menu-btn,.nav-icon-btn{width:48px;height:48px;}
  .nav-login-btn{width:100%;min-width:0;}
  .mobile-quick-controls{grid-template-columns:1fr;}
}


.nav-links{display:grid;grid-template-columns:repeat(6,minmax(96px,1fr));align-items:center;gap:8px;width:100%;max-width:780px;}
.nav-link{min-height:44px;display:flex;align-items:center;justify-content:center;padding:10px 12px;border-radius:14px;text-align:center;white-space:nowrap;min-width:96px;}
@media (max-width: 1180px){.nav-links{grid-template-columns:repeat(6,minmax(88px,1fr));max-width:none;}}
@media (max-width: 980px){.nav-links{display:none;}}


.calendar-page-section{padding-bottom:28px;}
.calendar-hero-grid{display:grid;grid-template-columns:1.45fr .9fr;gap:18px;align-items:stretch;margin-bottom:18px;}
.calendar-hero-card,.calendar-board,.day-focus-card,.booking-card,.admin-bookings-card{border-radius:28px;}
.calendar-hero-top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;}
.calendar-hero-top h3{font-size:30px;margin:10px 0 0;}
.calendar-view-switch{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;}
.calendar-filter-row{display:grid;grid-template-columns:1.2fr .8fr auto;gap:12px;margin-top:18px;}
.calendar-stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.calendar-stat-value{font-size:34px;font-weight:800;line-height:1;margin-bottom:10px;}
.calendar-main-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(320px,.8fr);gap:18px;align-items:start;}
.calendar-board{padding:18px;}
.calendar-weekdays{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;margin-bottom:12px;}
.calendar-month-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;}
.calendar-day-cell{min-height:148px;border-radius:20px;border:1px solid var(--line);background:var(--surface);padding:12px;text-align:left;display:flex;flex-direction:column;justify-content:flex-start;gap:10px;transition:var(--transition);}
.calendar-day-cell:hover{transform:translateY(-2px);background:var(--surface-strong);}
.calendar-day-cell.muted{opacity:.45;pointer-events:none;}
.calendar-day-cell.selected{border-color:var(--primary);box-shadow:0 0 0 1px var(--primary);background:var(--surface-strong);}
.calendar-day-head{display:flex;justify-content:space-between;align-items:center;font-size:14px;}
.calendar-day-events{display:grid;gap:8px;}
.calendar-day-pill{font-size:12px;line-height:1.35;padding:8px 10px;border-radius:12px;background:rgba(59,130,246,.12);color:var(--text);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.calendar-empty-mini{font-size:12px;color:var(--muted);}
.agenda-card{padding:18px;display:grid;grid-template-columns:130px 1fr;gap:18px;align-items:start;}
.agenda-time{display:grid;gap:10px;}
.muted-text{color:var(--muted);}
.day-focus-item,.request-row{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;padding:14px 0;border-top:1px solid var(--line);}
.day-focus-item:first-child,.request-row:first-child{border-top:none;padding-top:0;}
.calendar-form-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
.booking-conflict-box,.booking-ok-box{padding:14px 16px;border-radius:18px;}
.booking-conflict-box{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.28);}
.booking-ok-box{background:rgba(16,185,129,.10);border:1px solid rgba(16,185,129,.22);}
.status-pill{display:inline-flex;margin-top:10px;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;}
.status-pill.pending{background:rgba(245,158,11,.12);color:#b45309;}
.status-pill.approved{background:rgba(16,185,129,.12);color:#047857;}
.status-pill.rejected{background:rgba(239,68,68,.12);color:#b91c1c;}
.request-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;}
.empty-state-card{padding:22px;color:var(--muted);}
@media (max-width: 1180px){.calendar-hero-grid,.calendar-main-grid{grid-template-columns:1fr;}.calendar-stats-grid{grid-template-columns:repeat(3,1fr);}}
@media (max-width: 900px){.calendar-filter-row,.calendar-form-grid,.calendar-stats-grid{grid-template-columns:1fr;}.calendar-weekdays,.calendar-month-grid{gap:8px;}.calendar-day-cell{min-height:120px;}.agenda-card{grid-template-columns:1fr;}.request-row,.day-focus-item,.calendar-hero-top{grid-template-columns:1fr;display:grid;}.calendar-view-switch{justify-content:flex-start;}}
@media (max-width: 640px){.calendar-day-cell{min-height:104px;padding:10px;border-radius:16px;}.calendar-day-pill{font-size:11px;padding:7px 8px;}.calendar-hero-top h3{font-size:24px;}.calendar-stat-value{font-size:28px;}}


.calendar-booking-mini{font-size:12px;padding:6px 8px;border-radius:10px;background:rgba(16,185,129,.12);color:#047857;display:inline-flex;align-self:flex-start;}
.quick-slot-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;}
.approved-bookings-box{margin-top:14px;padding:14px 16px;border-radius:18px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.18);}
.admin-bookings-head{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;}
.request-filter{max-width:200px;}
@media (max-width: 900px){.admin-bookings-head{display:grid;}.request-filter{max-width:none;}}


.calendar-shell{display:grid;gap:18px;}
.calendar-unified-hero{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:22px 24px;border-radius:28px;}
.calendar-unified-hero h3{font-size:30px;margin:10px 0 8px;}
.calendar-unified-hero p{color:var(--muted);max-width:60ch;margin:0;}
.calendar-stat-strip{display:grid;grid-template-columns:repeat(3,minmax(120px,1fr));gap:12px;min-width:320px;}
.calendar-stat-chip{padding:16px 18px;border-radius:20px;background:var(--surface);border:1px solid var(--line);display:grid;gap:4px;}
.calendar-stat-chip strong{font-size:28px;line-height:1;}
.calendar-mode-tabs{display:flex;gap:10px;flex-wrap:wrap;}
.calendar-layout-grid,.calendar-surface-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(320px,.8fr);gap:18px;align-items:start;}
.calendar-toolbar-card,.focus-panel,.booking-surface,.queue-panel,.admin-panel{padding:20px;border-radius:24px;}
.schedule-timeline-row{padding:18px;display:grid;grid-template-columns:140px 1fr;gap:18px;align-items:start;}
.schedule-time-box{display:grid;gap:10px;align-content:start;}
.focus-panel.secondary,.queue-panel.secondary,.admin-panel.secondary{background:var(--surface-strong);}
.calendar-link-list{display:grid;gap:10px;margin-top:14px;}
.calendar-side-link{display:flex;align-items:center;justify-content:space-between;min-height:48px;padding:12px 14px;border-radius:16px;background:var(--surface);border:1px solid var(--line);text-decoration:none;color:var(--text);}
.calendar-side-link:hover{background:var(--surface-strong);}
.calendar-help-list{display:grid;gap:10px;padding-left:18px;color:var(--muted);}
.admin-action-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
.admin-row{align-items:center;}
@media (max-width: 1180px){.calendar-unified-hero,.calendar-layout-grid,.calendar-surface-grid{grid-template-columns:1fr;display:grid;}.calendar-stat-strip{min-width:0;}}
@media (max-width: 900px){.schedule-timeline-row{grid-template-columns:1fr;}.calendar-stat-strip{grid-template-columns:1fr;}.calendar-unified-hero h3{font-size:24px;}}


.calendar-v273{display:grid;gap:22px;}
.calendar-master-panel{padding:24px;border-radius:30px;display:grid;gap:22px;}
.calendar-topline{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;}
.calendar-topline-copy h3{font-size:32px;margin:10px 0 8px;}
.calendar-topline-copy p{margin:0;color:var(--muted);}
.calendar-topline-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-end;align-items:center;}
.calendar-filter-band{display:grid;grid-template-columns:1.15fr .8fr auto;gap:12px;align-items:center;}
.calendar-summary-inline{display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-end;color:var(--muted);font-size:14px;}
.calendar-view-panel{display:grid;gap:16px;}
.calendar-day-banner{display:flex;justify-content:space-between;gap:16px;align-items:center;padding:16px 18px;border-radius:20px;background:var(--surface);border:1px solid var(--line);}
.calendar-bottom-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.92fr);gap:22px;align-items:start;}
.news-admin-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:flex-end;}
.schedule-timeline-row{padding:20px;display:grid;grid-template-columns:140px 1fr auto;gap:20px;align-items:start;}
.schedule-time-box{display:grid;gap:10px;align-content:start;}
.booking-surface,.queue-panel{padding:22px;border-radius:26px;}
@media (max-width: 1180px){.calendar-topline,.calendar-filter-band,.calendar-bottom-grid{grid-template-columns:1fr;display:grid;}.calendar-topline-actions,.calendar-summary-inline{justify-content:flex-start;}}
@media (max-width: 900px){.schedule-timeline-row{grid-template-columns:1fr;}.calendar-day-banner{display:grid;}.calendar-topline-copy h3{font-size:26px;}}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \app\guides\page.tsx
NAME: page.tsx
SIZE: 217
SHA256: 16a6939cdfeebecf195dc371261d62cfc1ed2051a50fb6a1f97106811ad33836
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9534802Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7744266Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { GuidesModule } from '@/components/guides/GuidesModule';
import { PageShell } from '@/components/ui/Core';
export default function GuidesPage() { return <PageShell><GuidesModule /></PageShell>; }
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \app\layout.tsx
NAME: layout.tsx
SIZE: 910
SHA256: 4de5c04ea7dbe17027946140a900a456faf39eefec342965da214c5309e39f13
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9788577Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7759178Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import './globals.css';
import { AdminLoginModal } from '@/components/layout/AdminLoginModal';
import { AppProvider } from '@/components/layout/AppProvider';
import { Footer } from '@/components/layout/Footer';
import { ModalHost } from '@/components/layout/ModalHost';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';
import { ToastViewport } from '@/components/layout/ToastViewport';
export const metadata = { title: 'PTE MIK HÖK Web v14', description: 'Footer, jobb landing hírgomb, átrendezett naptár és hangsúlyosabb KKI eredmények' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="hu" data-theme="light"><body><AppProvider><Navbar /><main>{children}</main><Footer /><ToastViewport /><ModalHost /><AdminLoginModal /><ScrollTopButton /></AppProvider></body></html>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \app\office\page.tsx
NAME: page.tsx
SIZE: 1470
SHA256: e18fe2e83651fd74d908e74d9fc7463f86aabd6c68d4f7526ab0c3b9cde8d77b
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9686949Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7779177Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import { Card, SectionHeader } from '@/components/ui/Core';
export default function OfficePage() {
  return <div className="app-shell section"><SectionHeader eyebrow="Office" title="Részletesebb irodai információs oldal" text="Az Office oldal vizuálisan gazdagabb lett, hangsúlyos nyitvatartási és jelenléti blokkokkal, valamint jobban elkülönülő információs kártyákkal." /><div className="content-grid-rich"><div className="stack"><Card strong><h3>Aktuális nyitvatartás</h3><p style={{ color: 'var(--muted)' }}>Hétfő–csütörtök 10:00–16:00, pénteken ügyintézés előzetes egyeztetéssel.</p></Card><div className="grid-2"><Card><h4>Bent tartózkodók</h4><p style={{ color: 'var(--muted)' }}>Valós idejű vagy később automatizálható jelenléti blokk számára előkészített felület.</p></Card><Card><h4>Ügyfélfogadás</h4><p style={{ color: 'var(--muted)' }}>A hallgatói ügyintézés állapota és rövid tájékoztatók külön kártyában jelennek meg.</p></Card></div></div><div className="feature-list"><div className="feature-item"><strong>NFC lehetőség</strong><p style={{ color: 'var(--muted)' }}>Később csatlakoztatható automatizált jelenlétkezelési irányként megmarad.</p></div><div className="feature-item"><strong>Gyors információk</strong><p style={{ color: 'var(--muted)' }}>A legfontosabb ügyintézési tudnivalók külön, könnyen áttekinthető blokkban jelennek meg.</p></div></div></div></div>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \app\page.tsx
NAME: page.tsx
SIZE: 294
SHA256: 04a7867bec945bfd9aeff9bbf4d5c97e7323e47fd7e5616fad87cce95a49cd8e
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9853372Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7813386Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingNews } from '@/components/landing/LandingNews';
import { PageShell } from '@/components/ui/Core';
export default function HomePage() {
  return <PageShell><LandingHero /><LandingNews /></PageShell>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\about\AboutModule.tsx
NAME: AboutModule.tsx
SIZE: 1034
SHA256: 6f3be59224a83c53c6b6dc4065e758fc2ef2502a111cb89092daa54f03b81927
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0744185Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7833385Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { aboutPeople } from '@/lib/content';
export function AboutModule() {
  const { lang, isAdmin } = useApp();
  return <section className="section"><SectionHeader eyebrow="About Us" title={lang === 'hu' ? 'Jobban csiszolt szervezeti blokk' : 'A more polished organizational block'} text={lang === 'hu' ? 'Az About Us oldalon a szerkesztési gombok csak a tagkártyáknál jelennek meg admin módban.' : 'On the About Us page editing buttons appear only on member cards in admin mode.'} /><div className="grid-3">{aboutPeople.map((person) => <Card key={person.id} strong><div style={{ width: 62, height: 62, borderRadius: 999, background: 'var(--accent)', marginBottom: 14 }} /><h3>{person.name}</h3><p style={{ color: 'var(--muted)' }}>{lang === 'hu' ? person.roleHu : person.roleEn}</p>{isAdmin ? <button className="btn btn-ghost">Profil szerkesztése</button> : null}</Card>)}</div></section>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\calculator\CalculatorModule.tsx
NAME: CalculatorModule.tsx
SIZE: 6602
SHA256: 6e6e6871f869ea58808c49b6a314783aa979c830982ae8ed533903ed4a81b871
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0524646Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7857998Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { initialSemesters } from '@/lib/content';
import type { Semester } from '@/types';
export function CalculatorModule() {
  const { lang, toast } = useApp();
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const [newSemester, setNewSemester] = useState('Új félév');
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 260);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const summary = useMemo(() => {
    const included = semesters.filter((semester) => !semester.ghost);
    const allSubjects = included.flatMap((semester) => semester.subjects);
    const totalRegistered = allSubjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalCompleted = allSubjects.filter((subject) => subject.completed).reduce((sum, subject) => sum + subject.credits, 0);
    const weightedBase = allSubjects.reduce((sum, subject) => sum + subject.credits * subject.grade, 0);
    const weighted = totalRegistered ? weightedBase / totalRegistered : 0;
    const ki = totalRegistered ? totalCompleted / totalRegistered : 0;
    const kki = weighted * ki;
    return { weighted: weighted.toFixed(2), ki: ki.toFixed(2), kki: kki.toFixed(2), totalRegistered, totalCompleted };
  }, [semesters]);
  function addSemester() {
    setSemesters((prev) => [...prev, { id: Date.now(), name: newSemester, ghost: false, subjects: [] }]);
    setNewSemester('Új félév');
    toast(lang === 'hu' ? 'Új félév hozzáadva.' : 'New semester added.', 'success');
  }
  function addSubject(semesterId: number) {
    setSemesters((prev) => prev.map((semester) => semester.id === semesterId ? { ...semester, subjects: [...semester.subjects, { id: Date.now(), name: lang === 'hu' ? 'Új tárgy' : 'New subject', credits: 4, grade: 3, completed: true }] } : semester));
  }
  function updateSubject(semesterId: number, subjectId: number, field: 'name' | 'credits' | 'grade' | 'completed', value: string | number | boolean) {
    setSemesters((prev) => prev.map((semester) => semester.id === semesterId ? { ...semester, subjects: semester.subjects.map((subject) => subject.id === subjectId ? { ...subject, [field]: value } : subject) } : semester));
  }
  function removeSubject(semesterId: number, subjectId: number) {
    setSemesters((prev) => prev.map((semester) => semester.id === semesterId ? { ...semester, subjects: semester.subjects.filter((subject) => subject.id !== subjectId) } : semester));
  }
  return <section className="section"><SectionHeader eyebrow="KKI" title={lang === 'hu' ? 'Egysávos KKI elrendezés külön félév hozzáadás gombbal' : 'Single-column KKI layout with separate add-semester button'} text={lang === 'hu' ? 'A kalkulátor most egy oszlopban rendeződik, így a félévek és tárgyak kezelése lineárisabb és áttekinthetőbb lett.' : 'The calculator now uses a single-column layout so semesters and subjects are edited in a more linear and readable way.'} /><div className={`sticky-summary-top card card-strong ${compact ? 'compact' : ''}`} style={{ padding: 18, marginBottom: 18 }}><div className="metric-grid"><div className="metric-card color-blue"><span className="badge">KI</span><strong>{summary.ki}</strong></div><div className="metric-card color-pink"><span className="badge">KKI</span><strong>{summary.kki}</strong></div><div className="metric-card color-purple"><span className="badge">{lang === 'hu' ? 'Súlyozott átlag' : 'Weighted average'}</span><strong>{summary.weighted}</strong></div><div className="metric-card color-gold"><span className="badge">{lang === 'hu' ? 'Felvett kredit' : 'Registered credits'}</span><strong>{summary.totalRegistered}</strong></div><div className="metric-card color-green"><span className="badge">{lang === 'hu' ? 'Teljesített kredit' : 'Completed credits'}</span><strong>{summary.totalCompleted}</strong></div></div></div><Card strong><div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}><input className="input" value={newSemester} onChange={(e) => setNewSemester(e.target.value)} style={{ maxWidth: 320 }} /><button className="btn btn-primary" onClick={addSemester}>{lang === 'hu' ? 'Félév hozzáadása' : 'Add semester'}</button></div></Card><div className="stack" style={{ marginTop: 18 }}>{semesters.map((semester) => <div key={semester.id} className="semester-card"><div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}><input className="input" value={semester.name} onChange={(e) => setSemesters((prev) => prev.map((item) => item.id === semester.id ? { ...item, name: e.target.value } : item))} style={{ maxWidth: 320 }} /><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><button className="btn btn-secondary" onClick={() => setSemesters((prev) => prev.map((item) => item.id === semester.id ? { ...item, ghost: !item.ghost } : item))}>{semester.ghost ? 'Ghost OFF' : 'Ghost ON'}</button><button className="btn btn-primary" onClick={() => addSubject(semester.id)}>{lang === 'hu' ? 'Tárgy hozzáadása' : 'Add subject'}</button></div></div><div className="stack">{semester.subjects.map((subject) => <div key={subject.id} className="subject-row"><div className="grid-2"><input className="input" value={subject.name} onChange={(e) => updateSubject(semester.id, subject.id, 'name', e.target.value)} /><input className="input" type="number" value={subject.credits} onChange={(e) => updateSubject(semester.id, subject.id, 'credits', Number(e.target.value))} /></div><div className="grid-2" style={{ marginTop: 12 }}><input className="input" type="number" min={1} max={5} value={subject.grade} onChange={(e) => updateSubject(semester.id, subject.id, 'grade', Number(e.target.value))} /><select className="select" value={String(subject.completed)} onChange={(e) => updateSubject(semester.id, subject.id, 'completed', e.target.value === 'true')}><option value="true">{lang === 'hu' ? 'Teljesített' : 'Completed'}</option><option value="false">{lang === 'hu' ? 'Nem teljesített' : 'Not completed'}</option></select></div><div style={{ marginTop: 12 }}><button className="btn btn-ghost" onClick={() => removeSubject(semester.id, subject.id)}>{lang === 'hu' ? 'Eltávolítás' : 'Remove'}</button></div></div>)}</div></div>)}</div></section>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\calendar\CalendarModule.tsx
NAME: CalendarModule.tsx
SIZE: 16136
SHA256: daccd2a2127dcb21eb7ad78bb601f0d356327739033ce48cf8b451c71cc6e462
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0446130Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7898864Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { bookingRequests, calendarItems } from '@/lib/content';
import type { CalendarView } from '@/types';

type RequestStatus = 'pending' | 'approved' | 'rejected';
type EventItem = { id:number; titleHu:string; titleEn:string; date:string; time:string; location:string; category:string; dayLabel:string; note?:string; };
type BookingForm = { name:string; email:string; organization:string; date:string; start:string; end:string; purpose:string; };
type BookingRow = { id:number; title:string; slot:string; applicant:string; status:RequestStatus; purpose?:string; };

const initialEvents: EventItem[] = calendarItems.map((item) => ({ ...item }));
const seededRequests: BookingRow[] = bookingRequests.map((item, index) => ({ id: index + 100, title: item.title || 'Tornaterem foglalás', slot: item.slot || '', applicant: item.requester || 'Unknown', status: (item.status as RequestStatus) || 'pending', purpose: item.note || '' }));
const emptyForm: BookingForm = { name:'', email:'', organization:'', date:'2026-05-08', start:'18:00', end:'20:00', purpose:'' };
const dayNames = { hu:['H','K','Sze','Cs','P','Szo','V'], en:['M','T','W','T','F','S','S'] };

function isoDate(parts:string){ return (parts || '').includes('.') ? parts.split('.').reverse().join('-') : parts; }
function toMinutes(value?:string){ if (!value || !value.includes(':')) return null; const [h,m] = value.split(':').map(Number); if (Number.isNaN(h) || Number.isNaN(m)) return null; return h * 60 + m; }
function overlaps(aStart?:string,aEnd?:string,bStart?:string,bEnd?:string){ const aS = toMinutes(aStart), aE = toMinutes(aEnd), bS = toMinutes(bStart), bE = toMinutes(bEnd); if ([aS,aE,bS,bE].some((v) => v === null)) return false; return aS! < bE! && aE! > bS!; }
function parseSlot(slot:string){ if (!slot) return { date:'', start:'', end:'' }; const match = slot.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})-(\d{2}:\d{2})/); if (match) return { date:match[1], start:match[2], end:match[3] }; return { date:'', start:'', end:'' }; }

export function CalendarModule() {
  const { lang, isAdmin, toast, openModal } = useApp();
  const [view, setView] = useState<CalendarView>('calendar');
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [requests, setRequests] = useState<BookingRow[]>(seededRequests);
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [selectedDate, setSelectedDate] = useState('2026-05-08');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');

  const eventDates = useMemo(() => events.map((item) => ({ ...item, iso: isoDate(item.date) })), [events]);
  const categories = useMemo(() => Array.from(new Set(events.map((item) => item.category))), [events]);
  const filteredEvents = useMemo(() => eventDates.filter((item) => (categoryFilter === 'all' || item.category === categoryFilter) && `${item.titleHu} ${item.titleEn} ${item.location} ${item.category}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => `${a.iso} ${a.time}`.localeCompare(`${b.iso} ${b.time}`)), [eventDates, categoryFilter, query]);
  const selectedDayEvents = useMemo(() => filteredEvents.filter((item) => item.iso === selectedDate), [filteredEvents, selectedDate]);
  const selectedDayBookings = useMemo(() => requests.filter((item) => { const parsed = parseSlot(item.slot); return parsed.date === selectedDate && item.status !== 'rejected'; }), [requests, selectedDate]);
  const bookingConflicts = useMemo(() => requests.filter((item) => item.status !== 'rejected').filter((item) => { const parsed = parseSlot(item.slot); if (!parsed.date || parsed.date !== form.date) return false; return overlaps(form.start, form.end, parsed.start, parsed.end); }), [requests, form]);

  const monthDays = useMemo(() => {
    const days = [] as { day:number; date:string; muted:boolean; events:typeof filteredEvents; bookings:number; isSelected:boolean }[];
    const year = 2026; const month = 4;
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push({ day, date:`2026-04-${String(day).padStart(2,'0')}`, muted:true, events:[], bookings:0, isSelected:false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `2026-05-${String(day).padStart(2,'0')}`;
      days.push({ day, date, muted:false, events:filteredEvents.filter((item) => item.iso === date), bookings:requests.filter((item) => parseSlot(item.slot).date === date && item.status !== 'rejected').length, isSelected:selectedDate === date });
    }
    while (days.length < 42) {
      const nextDay = days.length - (startOffset + daysInMonth) + 1;
      days.push({ day:nextDay, date:`2026-06-${String(nextDay).padStart(2,'0')}`, muted:true, events:[], bookings:0, isSelected:false });
    }
    return days;
  }, [filteredEvents, requests, selectedDate]);

  function submitBooking() {
    if (!form.name.trim() || !form.email.trim() || !form.purpose.trim()) {
      toast(lang === 'hu' ? 'Töltsd ki a kötelező mezőket.' : 'Please fill in the required fields.', 'warning');
      return;
    }
    if ((toMinutes(form.start) ?? 0) >= (toMinutes(form.end) ?? 0)) {
      toast(lang === 'hu' ? 'A befejezés legyen később, mint a kezdés.' : 'End time must be later than start time.', 'warning');
      return;
    }
    const slot = `${form.date} ${form.start}-${form.end}`;
    setRequests((prev) => [{ id: Date.now(), title: lang === 'hu' ? 'Tornaterem foglalás' : 'Gym booking', slot, applicant: form.name, status:'pending', purpose: form.purpose }, ...prev]);
    setSelectedDate(form.date);
    setForm(emptyForm);
    toast(lang === 'hu' ? 'Tornaterem foglalási igény rögzítve.' : 'Gym booking request submitted.', 'success');
  }

  function updateRequest(id:number, status:RequestStatus) {
    setRequests((prev) => prev.map((item) => item.id === id ? { ...item, status } : item));
    toast(status === 'approved' ? (lang === 'hu' ? 'Foglalás jóváhagyva.' : 'Booking approved.') : (lang === 'hu' ? 'Foglalás elutasítva.' : 'Booking rejected.'), status === 'approved' ? 'success' : 'warning');
  }

  function openAdminPanel() {
    openModal(lang === 'hu' ? 'Naptár admin műveletek' : 'Calendar admin actions', lang === 'hu' ? 'Az admin kezelőgombok közvetlenül az eseménykártyákon és a foglalási sorokon érhetők el. Itt a felület egységes az admin szerkesztési mintával.' : 'Admin controls are available directly on event cards and booking rows. This modal confirms the unified admin editing pattern.');
  }

  function editEvent(item:EventItem) {
    openModal(lang === 'hu' ? 'Esemény szerkesztése' : 'Edit event', `${lang === 'hu' ? item.titleHu : item.titleEn}
${item.date} • ${item.time}
${item.location}`);
    toast(lang === 'hu' ? 'Eseményszerkesztő megnyitva.' : 'Event editor opened.', 'info');
  }

  function createQuickEvent() {
    const newEvent: EventItem = { id: Date.now(), titleHu:'Új kari esemény', titleEn:'New faculty event', date:selectedDate, time:'16:00', location:'MIK Aula', category:'Közösség', dayLabel:lang === 'hu' ? 'Új esemény' : 'New event', note:lang === 'hu' ? 'Admin által létrehozott gyors esemény.' : 'Quick event created by admin.' };
    setEvents((prev) => [newEvent, ...prev]);
    toast(lang === 'hu' ? 'Új esemény létrehozva.' : 'New event created.', 'success');
  }

  return <section className='section calendar-v273'><SectionHeader eyebrow={lang === 'hu' ? 'Naptár és tornaterem' : 'Calendar and gym'} title={lang === 'hu' ? 'Szellős, egybefüggő naptárélmény' : 'Airy, unified calendar experience'} text={lang === 'hu' ? 'A három nézet ugyanarra a kiválasztott napra és szűrésre épül, a foglalás pedig kizárólag a tornateremhez tartozik.' : 'The three views share the same selected day and filters, while the booking flow is dedicated to the gym only.'} />

  <div className='card calendar-master-panel'>
    <div className='calendar-topline'>
      <div className='calendar-topline-copy'><div className='badge'>{lang === 'hu' ? '2026. május' : 'May 2026'}</div><h3>{selectedDate}</h3><p>{lang === 'hu' ? 'A kijelölt nap minden nézetben szinkronban marad.' : 'The selected day stays synced across all views.'}</p></div>
      <div className='calendar-topline-actions'><div className='calendar-view-switch'><button className={`btn ${view === 'timeline' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('timeline')}>Timeline</button><button className={`btn ${view === 'cards' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('cards')}>Cards</button><button className={`btn ${view === 'calendar' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('calendar')}>{lang === 'hu' ? 'Naptár' : 'Calendar'}</button></div>{isAdmin ? <button className='btn btn-secondary' onClick={openAdminPanel}>{lang === 'hu' ? 'Admin műveletek' : 'Admin actions'}</button> : null}</div>
    </div>

    <div className='calendar-filter-band'><input className='input' placeholder={lang === 'hu' ? 'Keresés események között' : 'Search events'} value={query} onChange={(e)=>setQuery(e.target.value)} /><select className='select' value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)}><option value='all'>{lang === 'hu' ? 'Minden kategória' : 'All categories'}</option>{categories.map((cat)=><option key={cat} value={cat}>{cat}</option>)}</select><div className='calendar-summary-inline'><span>{filteredEvents.length} {lang === 'hu' ? 'esemény' : 'events'}</span><span>{selectedDayBookings.length} {lang === 'hu' ? 'foglalás' : 'bookings'}</span></div></div>

    {view === 'timeline' ? <div className='calendar-view-panel stack'><div className='calendar-day-banner'><div><strong>{lang === 'hu' ? 'Kijelölt nap' : 'Selected day'}:</strong> {selectedDate}</div><div className='muted-text'>{selectedDayEvents.length ? (lang === 'hu' ? 'Események és időrend lentebb.' : 'Events and chronology below.') : (lang === 'hu' ? 'Erre a napra nincs esemény.' : 'No events for this day.')}</div></div>{selectedDayEvents.length ? selectedDayEvents.map((item)=><div key={item.id} className='card schedule-timeline-row'><div className='schedule-time-box'><div className='badge'>{item.time}</div><span>{item.location}</span></div><div><h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p>{item.category} • {item.date}</p>{item.note ? <p className='muted-text'>{item.note}</p> : null}</div>{isAdmin ? <div className='news-admin-actions'><button className='btn btn-ghost' onClick={() => editEvent(item)}>{lang === 'hu' ? 'Szerkesztés' : 'Edit'}</button></div> : null}</div>) : <div className='card empty-state-card'>{lang === 'hu' ? 'Nincs esemény a kiválasztott napra.' : 'No events for the selected day.'}</div>}</div> : null}

    {view === 'cards' ? <div className='calendar-view-panel event-grid-wide'>{filteredEvents.map((item)=><Card key={item.id} strong><div className='badge'>{item.date}</div><h3 style={{ fontSize: 22 }}>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p>{item.time} • {item.location}</p><p className='muted-text'>{item.category}</p>{isAdmin ? <div className='news-admin-actions' style={{ marginTop: 12 }}><button className='btn btn-ghost' onClick={() => editEvent(item)}>{lang === 'hu' ? 'Szerkesztés' : 'Edit'}</button></div> : null}</Card>)}</div> : null}

    {view === 'calendar' ? <div className='calendar-view-panel'><div className='calendar-weekdays'>{dayNames[lang].map((day)=><div key={day} className='badge'>{day}</div>)}</div><div className='calendar-month-grid'>{monthDays.map((day)=><button key={day.date} type='button' className={`calendar-day-cell ${day.muted ? 'muted' : ''} ${day.isSelected ? 'selected' : ''}`} onClick={() => !day.muted && setSelectedDate(day.date)}><div className='calendar-day-head'><strong>{day.day}</strong><span>{day.events.length + day.bookings}</span></div><div className='calendar-day-events'>{day.events.slice(0,2).map((event)=><div key={event.id} className='calendar-day-pill'>{lang === 'hu' ? event.titleHu : event.titleEn}</div>)}{day.bookings ? <div className='calendar-booking-mini'>{day.bookings} {lang === 'hu' ? 'foglalás' : 'bookings'}</div> : null}{!day.events.length && !day.bookings ? <div className='calendar-empty-mini'>{lang === 'hu' ? 'Nincs esemény' : 'No events'}</div> : null}</div></button>)}</div></div> : null}
  </div>

  <div className='calendar-bottom-grid'>
    <div className='card booking-surface'><div className='badge'>{lang === 'hu' ? 'Tornaterem foglalás' : 'Gym booking'}</div><h3>{lang === 'hu' ? 'Foglalási igény a tornateremhez' : 'Booking request for the gym'}</h3><p className='muted-text'>{lang === 'hu' ? 'Ez a modul kizárólag a tornateremre vonatkozó foglalási igényeket kezeli.' : 'This form handles gym booking requests only.'}</p><div className='stack' style={{ marginTop: 16 }}><input className='input' placeholder={lang === 'hu' ? 'Név' : 'Name'} value={form.name} onChange={(e)=>setForm((p)=>({...p,name:e.target.value}))} /><input className='input' placeholder='Email' value={form.email} onChange={(e)=>setForm((p)=>({...p,email:e.target.value}))} /><input className='input' placeholder={lang === 'hu' ? 'Szervezet / csapat' : 'Organization / team'} value={form.organization} onChange={(e)=>setForm((p)=>({...p,organization:e.target.value}))} /><div className='calendar-form-grid'><input className='input' type='date' value={form.date} onChange={(e)=>setForm((p)=>({...p,date:e.target.value}))} /><input className='input' type='time' value={form.start} onChange={(e)=>setForm((p)=>({...p,start:e.target.value}))} /><input className='input' type='time' value={form.end} onChange={(e)=>setForm((p)=>({...p,end:e.target.value}))} /></div><textarea className='input' style={{ minHeight: 120 }} placeholder={lang === 'hu' ? 'Edzés vagy program célja' : 'Purpose of the training or event'} value={form.purpose} onChange={(e)=>setForm((p)=>({...p,purpose:e.target.value}))} />{bookingConflicts.length ? <div className='booking-conflict-box'><strong>{lang === 'hu' ? 'Lehetséges ütközés' : 'Possible conflict'}</strong><div className='stack' style={{ marginTop: 8 }}>{bookingConflicts.map((item)=><div key={item.id} className='muted-text'>{item.slot} • {item.applicant}</div>)}</div></div> : <div className='booking-ok-box'>{lang === 'hu' ? 'Nincs észlelt ütközés a tornatermi idősávban.' : 'No conflict detected for the gym time slot.'}</div>}<button className='btn btn-primary' onClick={submitBooking}>{lang === 'hu' ? 'Foglalási igény küldése' : 'Send booking request'}</button></div></div>

    <div className='card queue-panel'><div className='badge'>{lang === 'hu' ? 'Foglalási állapotok' : 'Booking statuses'}</div><h3>{lang === 'hu' ? 'Tornaterem igények' : 'Gym requests'}</h3><div className='stack' style={{ marginTop: 16 }}>{requests.map((item)=><div key={item.id} className='request-row admin-row'><div><strong>{item.title}</strong><div className='muted-text'>{item.slot} • {item.applicant}</div>{item.purpose ? <div className='muted-text'>{item.purpose}</div> : null}<div className={`status-pill ${item.status}`}>{item.status}</div></div>{isAdmin ? <div className='news-admin-actions'><button className='btn btn-ghost' onClick={() => updateRequest(item.id,'approved')}>{lang === 'hu' ? 'Elfogadás' : 'Approve'}</button><button className='btn btn-ghost' onClick={() => updateRequest(item.id,'rejected')}>{lang === 'hu' ? 'Elutasítás' : 'Reject'}</button></div> : null}</div>)}</div>{isAdmin ? <div className='news-admin-actions' style={{ marginTop: 16 }}><button className='btn btn-secondary' onClick={createQuickEvent}>{lang === 'hu' ? 'Új esemény' : 'New event'}</button></div> : null}</div>
  </div></section>;
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\gallery\GalleryModule.tsx
NAME: GalleryModule.tsx
SIZE: 3725
SHA256: 1eba43c70d69b6c3ad969aeb865054afbc4e159bff1c88a8653b439a7766bf31
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0572291Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7944474Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { galleryFolders, galleryItems } from '@/lib/content';
export function GalleryModule() {
  const { lang, toast, isAdmin } = useApp();
  const [view, setView] = useState<'grid' | 'folders' | 'timeline'>('grid');
  const [folderId, setFolderId] = useState<number | 'all'>('all');
  const [items, setItems] = useState(galleryItems.map((item) => ({ ...item })));
  const filtered = useMemo(() => items.filter((item) => folderId === 'all' || item.folderId === folderId), [items, folderId]);
  return <section className="section"><SectionHeader eyebrow={lang === 'hu' ? 'Galéria' : 'Gallery'} title={lang === 'hu' ? 'Kifinomultabb galéria és célzott admin szerkesztés' : 'Refined gallery with targeted admin editing'} text={lang === 'hu' ? 'A szerkesztési lehetőségek itt csak admin módban jelennek meg, mert ezen az oldalon valódi tartalomkezelésre van szükség.' : 'Editing options appear here only in admin mode because this page requires actual content management.'} /><div className="calendar-toolbar card" style={{ padding: 16, marginBottom: 18 }}><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><button className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('grid')}>Grid</button><button className={`btn ${view === 'folders' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('folders')}>Folders</button><button className={`btn ${view === 'timeline' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('timeline')}>Timeline</button></div><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><select className="select" value={folderId === 'all' ? 'all' : String(folderId)} onChange={(e) => setFolderId(e.target.value === 'all' ? 'all' : Number(e.target.value))}><option value="all">{lang === 'hu' ? 'Minden mappa' : 'All folders'}</option>{galleryFolders.map((folder) => <option key={folder.id} value={folder.id}>{folder.name}</option>)}</select>{isAdmin ? <button className="btn btn-primary" onClick={() => { setItems((prev) => [...prev, { id: Date.now(), folderId: 1, titleHu: 'Új kép', titleEn: 'New image', date: '2026-05-10' }]); toast(lang === 'hu' ? 'Demó feltöltés hozzáadva.' : 'Demo upload added.', 'success'); }}>{lang === 'hu' ? 'Feltöltés demó' : 'Upload demo'}</button> : null}</div></div>{view === 'grid' ? <div className="grid-3">{filtered.map((item) => <Card key={item.id} strong><div style={{ aspectRatio: '16 / 10', borderRadius: 18, background: 'linear-gradient(135deg, rgba(33,92,255,0.18), rgba(255,255,255,0.56))', marginBottom: 14 }} /><h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p style={{ color: 'var(--muted)' }}>{item.date}</p>{isAdmin ? <button className="btn btn-ghost">Szerkesztés</button> : null}</Card>)}</div> : null}{view === 'folders' ? <div className="grid-3">{galleryFolders.map((folder) => <Card key={folder.id}><h3>{folder.name}</h3><p style={{ color: 'var(--muted)' }}>{filtered.filter((item) => item.folderId === folder.id).length} elem</p>{isAdmin ? <button className="btn btn-ghost">Mappa szerkesztése</button> : null}</Card>)}</div> : null}{view === 'timeline' ? <div className="stack">{filtered.map((item) => <div className="timeline-item" key={item.id}><div><div className="badge">{item.date}</div></div><div><h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p style={{ color: 'var(--muted)' }}>{galleryFolders.find((folder) => folder.id === item.folderId)?.name}</p>{isAdmin ? <button className="btn btn-ghost">Szerkesztés</button> : null}</div></div>)}</div> : null}</section>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\guides\GuidesModule.tsx
NAME: GuidesModule.tsx
SIZE: 1305
SHA256: 44db25f9f3d5f34274c7b58086cbb38be7c90589b394d86659a168a563a64b5b
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0638292Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.7980984Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { guideItems } from '@/lib/content';
export function GuidesModule() {
  const { lang, openModal, isAdmin } = useApp();
  return <section className="section"><SectionHeader eyebrow={lang === 'hu' ? 'Útmutatók' : 'Guides'} title={lang === 'hu' ? 'Útmutatók célzott admin műveletekkel' : 'Guides with targeted admin actions'} text={lang === 'hu' ? 'Az útmutatók oldalon csak a tartalmi blokkoknál jelennek meg a szerkesztési lehetőségek, ahol ez valóban indokolt.' : 'On the guides page editing appears only around content blocks where it is truly needed.'} /><div className="grid-2">{guideItems.map((item) => <Card key={item.id} strong><h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p style={{ color: 'var(--muted)' }}>{lang === 'hu' ? item.textHu : item.textEn}</p><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}><button className="btn btn-primary" onClick={() => openModal(lang === 'hu' ? item.titleHu : item.titleEn, lang === 'hu' ? item.textHu : item.textEn)}>{lang === 'hu' ? 'Megnyitás' : 'Open'}</button>{isAdmin ? <button className="btn btn-ghost">Szerkesztés</button> : null}</div></Card>)}</div></section>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\landing\LandingHero.tsx
NAME: LandingHero.tsx
SIZE: 1768
SHA256: 62b0778e9d6b97bdb4289318161d41e0bfcdf87b98d44bfcdc5252f275be5f59
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0347357Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8010982Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import Link from 'next/link';
import { useApp } from '@/components/layout/AppProvider';
import { landingCards } from '@/lib/content';
import { getLandingCopy } from '@/lib/landingDictionary';

export function LandingHero() {
  const { lang } = useApp();
  const copy = getLandingCopy(lang);
  const scrollToNews = () => {
    const target = document.getElementById('landing-news');
    if (!target) return;
    const navbarTriggerTop = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, navbarTriggerTop), behavior: 'smooth' });
  };
  return <section className='section animate-fade'><div className='landing-layout'><div className='landing-side animate-rise'><div className='hok-logo-hero' style={{ marginBottom: 22 }} /><div className='section-head'><small>PTE MIK HÖK</small><h1>{copy.heroTitle}</h1><p>{copy.heroText}</p><div className='hero-news-jump-wrap'><button type='button' className='hero-news-inline-link hero-news-jump' aria-label={copy.newsCta} onClick={scrollToNews}>{copy.newsCta} <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'><path d='M12 5v14' /><path d='m6 13 6 6 6-6' /></svg></button></div></div></div><div><div className='card-grid-2x3 animate-rise'>{landingCards.map((item) => <Link prefetch={false} href={item.href} key={item.href} className='module-card' style={{ background: item.color }}><div className='badge' style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}>MIK HÖK</div><h3 style={{ fontSize: 28, marginBottom: 10 }}>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p style={{ lineHeight: 1.7, maxWidth: 280, margin: 0 }}>{lang === 'hu' ? item.textHu : item.textEn}</p></Link>)}</div></div></div></section>;
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\landing\LandingNews.tsx
NAME: LandingNews.tsx
SIZE: 20769
SHA256: 335fcceea1dd97ded03c93724bb54ba4f841ac4528d1b539df981569bc880212
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0397407Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8047357Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
// Magyar magyarázó megjegyzés: ez a landing hírmodul önálló, később más adatforrásra is átállítható.
'use client';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { SectionHeader } from '@/components/ui/Core';
import { AdminModal } from '@/components/ui/AdminModal';
import { getLandingCopy } from '@/lib/landingDictionary';

type NewsStatus = 'published' | 'draft' | 'scheduled' | 'archived';
type NewsSource = 'internal' | 'facebook' | 'instagram';
type CoverTone = 'blue' | 'pink' | 'teal' | 'gold';
type AdminModalKey = 'editor' | 'adapters' | 'archive' | 'category' | null;
type NewsItem = { id:number; source:NewsSource; category:string; status:NewsStatus; pinned:boolean; date:string; titleHu:string; titleEn:string; textHu:string; textEn:string; author:string; cover:CoverTone; hasCover:boolean; scheduledFor?:string; archived?:boolean; externalUrl?:string; };
type DraftForm = { source:NewsSource; category:string; status:NewsStatus; titleHu:string; titleEn:string; textHu:string; textEn:string; author:string; scheduledFor:string; externalUrl:string; cover:CoverTone; hasCover:boolean; };
const STORAGE_KEY='v25_17-landing-news';
const initialNews: NewsItem[] = [
{id:1,source:'internal',category:'Közélet',status:'published',pinned:true,date:'2026-04-12',titleHu:'Tavaszi kari fórum',titleEn:'Spring faculty forum',textHu:'A HÖK fórumot szervez a hallgatói visszajelzések összegyűjtésére.',textEn:'The student union organizes a forum to gather student feedback.',author:'MIK HÖK',cover:'blue',hasCover:true},
{id:2,source:'facebook',category:'Közösség',status:'published',pinned:false,date:'2026-04-10',titleHu:'Facebook bejegyzés: közösségi program',titleEn:'Facebook post: community event',textHu:'Közösségi program ajánló a hivatalos Facebook kommunikációból.',textEn:'Community event highlight coming from the official Facebook communication.',author:'Facebook feed',cover:'pink',hasCover:true,externalUrl:'https://facebook.com'},
{id:3,source:'instagram',category:'Képek',status:'published',pinned:false,date:'2026-04-09',titleHu:'Instagram feed: eseményfotók',titleEn:'Instagram feed: event photos',textHu:'Instagram poszt alapú képes összefoglaló a legutóbbi eseményről.',textEn:'Instagram-based visual recap of the most recent event.',author:'Instagram feed',cover:'pink',hasCover:true,externalUrl:'https://instagram.com'}
];
const emptyForm: DraftForm = { source:'internal', category:'', status:'draft', titleHu:'', titleEn:'', textHu:'', textEn:'', author:'', scheduledFor:'', externalUrl:'', cover:'blue', hasCover:true };
const icon = {plus:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M12 5v14M5 12h14'/></svg>,archive:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M3 7h18'/><path d='M5 7h14v12H5z'/><path d='M10 12h4'/></svg>,edit:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M12 20h9'/><path d='M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z'/></svg>,details:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><circle cx='12' cy='12' r='9'/><path d='M12 16v-4'/><circle cx='12' cy='8' r='1' fill='currentColor' stroke='none'/></svg>,external:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M14 5h5v5'/><path d='M10 14 19 5'/><path d='M19 14v5h-14V5h5'/></svg>,delete:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M3 6h18'/><path d='M19 6l-1 14H6L5 6'/><path d='M10 11v6M14 11v6'/></svg>};
const sourceLabel=(src:NewsSource,lang:'hu'|'en')=>src==='internal'?(lang==='hu'?'HÖK hír':'HÖK news'):src==='facebook'?'Facebook':'Instagram';
function IconButton({label,onClick,children}:{label:string;onClick:()=>void;children:React.ReactNode}){return <button type='button' className='btn btn-secondary' aria-label={label} title={label} onClick={onClick} style={{width:44,height:44,padding:0,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:14}}><span aria-hidden='true' style={{display:'inline-flex',width:18,height:18}}>{children}</span></button>;}
export function LandingNews(){
const { lang, openModal, isAdmin, toast } = useApp();
const copy=getLandingCopy(lang);
const [query,setQuery]=useState(''); const [category,setCategory]=useState('all'); const [source,setSource]=useState('all'); const [status,setStatus]=useState<'all'|NewsStatus>('all'); const [order,setOrder]=useState<'latest'|'oldest'>('latest');
const [customCategories,setCustomCategories]=useState(['Közélet','Közösség','Képek']); const [savedSearches,setSavedSearches]=useState<string[]>([]); const [newsItems,setNewsItems]=useState<NewsItem[]>(initialNews);
const [draftForm,setDraftForm]=useState<DraftForm>(emptyForm); const [editingId,setEditingId]=useState<number|null>(null); const [adapterFacebook,setAdapterFacebook]=useState({pageId:'',token:'',endpoint:''}); const [adapterInstagram,setAdapterInstagram]=useState({accountId:'',apiKey:'',endpoint:''}); const [pendingCategory,setPendingCategory]=useState(''); const [activeAdminModal,setActiveAdminModal]=useState<AdminModalKey>(null);
useEffect(()=>{ const raw=window.localStorage.getItem(STORAGE_KEY); if(!raw) return; try{ const data=JSON.parse(raw); if(data.newsItems) setNewsItems(data.newsItems); if(data.customCategories) setCustomCategories(data.customCategories); if(data.savedSearches) setSavedSearches(data.savedSearches); }catch{} },[]);
useEffect(()=>{ window.localStorage.setItem(STORAGE_KEY, JSON.stringify({newsItems,customCategories,savedSearches})); },[newsItems,customCategories,savedSearches]);
const visibleNews=useMemo(()=>{ const base=newsItems.filter((item)=>isAdmin||item.status==='published'); const list=base.filter((item)=>(category==='all'||item.category===category)&&(source==='all'||item.source===source)&&(status==='all'||item.status===status)&&`${item.titleHu} ${item.titleEn} ${item.textHu} ${item.textEn} ${item.author}`.toLowerCase().includes(query.toLowerCase())); return [...list].sort((a,b)=> order==='latest'?b.date.localeCompare(a.date):a.date.localeCompare(b.date));},[newsItems,query,category,source,status,order,isAdmin]);
const resetForm=()=>{setDraftForm(emptyForm);setEditingId(null);};
const persistNotice=(msg:string)=>toast(msg,'success');
const applyCreate=(publishDirectly:boolean)=>{ const newItem:NewsItem={id:Date.now(),source:draftForm.source,category:draftForm.category||'Általános',status:publishDirectly?'published':draftForm.status,pinned:false,date:new Date().toISOString().slice(0,10),titleHu:draftForm.titleHu||'Új hír',titleEn:draftForm.titleEn||'New news',textHu:draftForm.textHu||'Új tartalom',textEn:draftForm.textEn||'New content',author:draftForm.author||'Admin',cover:draftForm.cover,hasCover:draftForm.hasCover,scheduledFor:draftForm.scheduledFor,externalUrl:draftForm.externalUrl||undefined}; setNewsItems((prev)=>[newItem,...prev]); if(newItem.category&&!customCategories.includes(newItem.category)) setCustomCategories((prev)=>[...prev,newItem.category]); resetForm(); setActiveAdminModal(null); persistNotice(copy.newsCreated); };
const applyEdit=()=>{ if(editingId===null) return; setNewsItems((prev)=>prev.map((item)=>item.id===editingId?{...item,source:draftForm.source,category:draftForm.category||item.category,status:draftForm.status,titleHu:draftForm.titleHu||item.titleHu,titleEn:draftForm.titleEn||item.titleEn,textHu:draftForm.textHu||item.textHu,textEn:draftForm.textEn||item.textEn,author:draftForm.author||item.author,scheduledFor:draftForm.scheduledFor,externalUrl:draftForm.externalUrl||undefined,cover:draftForm.cover,hasCover:draftForm.hasCover}:item)); resetForm(); setActiveAdminModal(null); persistNotice(copy.newsUpdated); };
const archiveItem=(id:number)=>setNewsItems((prev)=>prev.map((item)=>item.id===id?{...item,status:'archived',archived:true}:item));
const deleteItem=(id:number)=>setNewsItems((prev)=>prev.filter((item)=>item.id!==id));
const publishItem=(id:number)=>setNewsItems((prev)=>prev.map((item)=>item.id===id?{...item,status:'published',archived:false}:item));
const addCategory=()=>{ const value=pendingCategory.trim(); if(value&&!customCategories.includes(value)){ setCustomCategories((prev)=>[...prev,value]); setPendingCategory(''); persistNotice(lang==='hu'?'Kategória mentve.':'Category saved.'); } };
const addSavedSearch=()=>{ const value=query.trim(); if(value&&!savedSearches.includes(value)){ setSavedSearches((prev)=>[...prev,value]); persistNotice(lang==='hu'?'Keresés mentve.':'Search saved.'); } };
const openDetails=(item:NewsItem)=>openModal(lang==='hu'?item.titleHu:item.titleEn,`${lang==='hu'?item.textHu:item.textEn}<div style='margin-top:16px;color:var(--muted)'>${copy.authorLabel}: ${item.author}</div><div style='margin-top:10px;color:var(--muted)'>${copy.dateLabel}: ${item.date}</div>`);
const openEditMode=(item:NewsItem)=>{ setEditingId(item.id); setDraftForm({source:item.source,category:item.category,status:item.status,titleHu:item.titleHu,titleEn:item.titleEn,textHu:item.textHu,textEn:item.textEn,author:item.author,scheduledFor:item.scheduledFor??'',externalUrl:item.externalUrl??'',cover:item.cover,hasCover:item.hasCover}); setActiveAdminModal('editor'); };
const featured=visibleNews[0]; const rest=visibleNews.slice(1);
return <section id='landing-news' className='section' style={{paddingTop:42}}><div className='card card-strong animate-fade' style={{padding:28,borderRadius:30,background:'linear-gradient(180deg, var(--surface-strong), var(--surface))'}}><SectionHeader eyebrow={copy.newsEyebrow} title={copy.newsTitle} text={copy.newsText} /><div id='landing-news-list' className='news-toolbar card' style={{padding:16,margin:'18px 0'}}><input className='input' placeholder={copy.search} value={query} onChange={(e)=>setQuery(e.target.value)} /><select className='select' value={category} onChange={(e)=>setCategory(e.target.value)}><option value='all'>{copy.allCategories}</option>{customCategories.map((cat)=><option key={cat} value={cat}>{cat}</option>)}</select><select className='select' value={source} onChange={(e)=>setSource(e.target.value)}><option value='all'>{copy.allSources}</option><option value='internal'>{copy.internalNews}</option><option value='facebook'>Facebook</option><option value='instagram'>Instagram</option></select><select className='select' value={status} onChange={(e)=>setStatus(e.target.value as 'all'|NewsStatus)}><option value='all'>{copy.allStatuses}</option><option value='published'>{copy.published}</option><option value='draft'>{copy.draft}</option><option value='scheduled'>{copy.scheduled}</option><option value='archived'>{copy.archived}</option></select>{isAdmin ? <><IconButton label={copy.saveSearch} onClick={addSavedSearch}>{icon.details}</IconButton><button className='btn btn-secondary' onClick={() => setOrder(order === 'latest' ? 'oldest' : 'latest')}>{order === 'latest' ? copy.latest : copy.oldest}</button></> : null}</div><div className={isAdmin ? 'news-module-grid with-admin' : 'news-module-grid full-news'}><div className='stack'>{featured ? <div className='news-list-card clickable' role='button' tabIndex={0} onClick={() => openDetails(featured)}><div style={{display:'grid',gridTemplateColumns:'1.15fr 1.1fr auto',gap:18,alignItems:'stretch'}}><div className={`news-cover ${featured.cover}`} /><div><div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:10}}><div className='badge'>{copy.featured}</div><div className='badge'>{sourceLabel(featured.source,lang)}</div><div className='badge'>{featured.category}</div></div><h3 style={{marginTop:0,fontSize:30}}>{lang==='hu'?featured.titleHu:featured.titleEn}</h3><p style={{color:'var(--muted)',lineHeight:1.75}}>{lang==='hu'?featured.textHu:featured.textEn}</p><div style={{color:'var(--muted)',fontSize:14}}>{copy.sourceAuthor} {featured.author}</div></div><div style={{display:'flex',gap:10,flexWrap:'wrap',alignContent:'flex-start'}}><IconButton label={copy.details} onClick={() => openDetails(featured)}>{icon.details}</IconButton>{featured.externalUrl ? <a href={featured.externalUrl} target='_blank' rel='noopener noreferrer' aria-label={copy.openExternal} title={copy.openExternal} className='btn btn-secondary' style={{width:44,height:44,padding:0,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:14}} onClick={(e)=>e.stopPropagation()}><span aria-hidden='true' style={{display:'inline-flex',width:18,height:18}}>{icon.external}</span></a> : null}{isAdmin ? <><IconButton label={copy.editNews} onClick={() => openEditMode(featured)}>{icon.edit}</IconButton><IconButton label={copy.archive} onClick={() => archiveItem(featured.id)}>{icon.archive}</IconButton><IconButton label={copy.delete} onClick={() => deleteItem(featured.id)}>{icon.delete}</IconButton></> : null}</div></div></div> : null}<div className='stack'>{rest.map((item)=><div key={item.id} className='news-list-card clickable' role='button' tabIndex={0} onClick={() => openDetails(item)}><div style={{display:'grid',gridTemplateColumns:'160px 1fr auto',gap:18,alignItems:'stretch'}}><div className={`news-cover ${item.cover}`} style={{minHeight:120}} /><div><div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:8}}><div className='badge'>{sourceLabel(item.source,lang)}</div><div className='badge'>{item.category}</div><div className='badge'>{item.status}</div></div><h3 style={{marginTop:0}}>{lang==='hu'?item.titleHu:item.titleEn}</h3><p style={{color:'var(--muted)'}}>{lang==='hu'?item.textHu:item.textEn}</p></div><div style={{display:'flex',gap:10,flexWrap:'wrap',alignContent:'flex-start'}}><IconButton label={copy.details} onClick={() => openDetails(item)}>{icon.details}</IconButton>{item.externalUrl ? <a href={item.externalUrl} target='_blank' rel='noopener noreferrer' aria-label={copy.openExternal} title={copy.openExternal} className='btn btn-secondary' style={{width:44,height:44,padding:0,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:14}} onClick={(e)=>e.stopPropagation()}><span aria-hidden='true' style={{display:'inline-flex',width:18,height:18}}>{icon.external}</span></a> : null}{isAdmin ? <><IconButton label={copy.editNews} onClick={() => openEditMode(item)}>{icon.edit}</IconButton><IconButton label={copy.publish} onClick={() => publishItem(item.id)}>{icon.plus}</IconButton><IconButton label={copy.archive} onClick={() => archiveItem(item.id)}>{icon.archive}</IconButton><IconButton label={copy.delete} onClick={() => deleteItem(item.id)}>{icon.delete}</IconButton></> : null}</div></div></div>)}</div></div>{isAdmin ? <aside className='stack'><div className='news-side-panel admin-actions-panel'><h3 style={{marginTop:0}}>{copy.adminActions}</h3><div className='admin-module-actions vertical'><button className='btn btn-secondary' onClick={() => { resetForm(); setActiveAdminModal('editor'); }}>{copy.newsEditor}</button><button className='btn btn-secondary' onClick={() => setActiveAdminModal('adapters')}>{copy.adapters}</button><button className='btn btn-secondary' onClick={() => setActiveAdminModal('archive')}>{copy.archiveScheduling}</button><button className='btn btn-secondary' onClick={() => setActiveAdminModal('category')}>{copy.categoryManagement}</button></div>{savedSearches.length ? <div className='admin-chip-row' style={{marginTop:16}}>{savedSearches.map((item)=><span key={item} className='badge'>{item}</span>)}</div> : null}</div></aside> : null}</div><AdminModal open={activeAdminModal==='editor'} title={copy.newsEditor} onClose={() => setActiveAdminModal(null)}><div className='stack'><div className='modal-grid'><label><div style={{marginBottom:8}}>Cím (HU)</div><input className='input' value={draftForm.titleHu} onChange={(e)=>setDraftForm((p)=>({...p,titleHu:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Title (EN)</div><input className='input' value={draftForm.titleEn} onChange={(e)=>setDraftForm((p)=>({...p,titleEn:e.target.value}))} /></label><label style={{gridColumn:'1/-1'}}><div style={{marginBottom:8}}>Leírás (HU)</div><textarea className='input' style={{minHeight:120}} value={draftForm.textHu} onChange={(e)=>setDraftForm((p)=>({...p,textHu:e.target.value}))} /></label><label style={{gridColumn:'1/-1'}}><div style={{marginBottom:8}}>Leírás (EN)</div><textarea className='input' style={{minHeight:120}} value={draftForm.textEn} onChange={(e)=>setDraftForm((p)=>({...p,textEn:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Forrás</div><select className='select' value={draftForm.source} onChange={(e)=>setDraftForm((p)=>({...p,source:e.target.value as NewsSource}))}><option value='internal'>internal</option><option value='facebook'>facebook</option><option value='instagram'>instagram</option></select></label><label><div style={{marginBottom:8}}>Státusz</div><select className='select' value={draftForm.status} onChange={(e)=>setDraftForm((p)=>({...p,status:e.target.value as NewsStatus}))}><option value='draft'>draft</option><option value='published'>published</option><option value='scheduled'>scheduled</option><option value='archived'>archived</option></select></label><label><div style={{marginBottom:8}}>Kategória</div><input className='input' value={draftForm.category} onChange={(e)=>setDraftForm((p)=>({...p,category:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Szerző</div><input className='input' value={draftForm.author} onChange={(e)=>setDraftForm((p)=>({...p,author:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Ütemezés ideje</div><input className='input' value={draftForm.scheduledFor} onChange={(e)=>setDraftForm((p)=>({...p,scheduledFor:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Külső link</div><input className='input' value={draftForm.externalUrl} onChange={(e)=>setDraftForm((p)=>({...p,externalUrl:e.target.value}))} /></label></div><div className='news-form-actions'><button className='btn btn-primary' onClick={()=>editingId===null?applyCreate(true):applyEdit()}>{editingId===null?copy.create:copy.saveChanges}</button><button className='btn btn-secondary' onClick={()=>applyCreate(false)} disabled={editingId!==null}>{copy.saveDraft}</button><button className='btn btn-secondary' onClick={resetForm}>{copy.resetForm}</button></div></div></AdminModal><AdminModal open={activeAdminModal==='adapters'} title={copy.adapters} onClose={() => setActiveAdminModal(null)}><div className='stack'><div className='modal-grid'><input className='input' placeholder='Facebook Page ID' value={adapterFacebook.pageId} onChange={(e)=>setAdapterFacebook((p)=>({...p,pageId:e.target.value}))} /><input className='input' placeholder='Facebook token' value={adapterFacebook.token} onChange={(e)=>setAdapterFacebook((p)=>({...p,token:e.target.value}))} /><input className='input' style={{gridColumn:'1/-1'}} placeholder='Facebook endpoint' value={adapterFacebook.endpoint} onChange={(e)=>setAdapterFacebook((p)=>({...p,endpoint:e.target.value}))} /><input className='input' placeholder='Instagram Account ID' value={adapterInstagram.accountId} onChange={(e)=>setAdapterInstagram((p)=>({...p,accountId:e.target.value}))} /><input className='input' placeholder='Instagram API key' value={adapterInstagram.apiKey} onChange={(e)=>setAdapterInstagram((p)=>({...p,apiKey:e.target.value}))} /><input className='input' style={{gridColumn:'1/-1'}} placeholder='Instagram endpoint' value={adapterInstagram.endpoint} onChange={(e)=>setAdapterInstagram((p)=>({...p,endpoint:e.target.value}))} /></div></div></AdminModal><AdminModal open={activeAdminModal==='archive'} title={copy.archiveScheduling} onClose={() => setActiveAdminModal(null)}><div className='admin-chip-row'><div className='badge'>published: {newsItems.filter(i=>i.status==='published').length}</div><div className='badge'>scheduled: {newsItems.filter(i=>i.status==='scheduled').length}</div><div className='badge'>archived: {newsItems.filter(i=>i.status==='archived').length}</div><div className='badge'>draft: {newsItems.filter(i=>i.status==='draft').length}</div></div></AdminModal><AdminModal open={activeAdminModal==='category'} title={copy.categoryManagement} onClose={() => setActiveAdminModal(null)}><div className='stack'><div className='admin-chip-row'>{customCategories.map((cat)=><span key={cat} className='badge'>{cat}</span>)}</div><div className='admin-module-actions'><input className='input' style={{minWidth:220}} placeholder={copy.newCategory} value={pendingCategory} onChange={(e)=>setPendingCategory(e.target.value)} /><button className='btn btn-secondary' onClick={addCategory}>{copy.add}</button></div></div></AdminModal></div></section>;
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\layout\AdminLoginModal.tsx
NAME: AdminLoginModal.tsx
SIZE: 1883
SHA256: 15886d4c2a033f923849787438b2c308bea4abfbf02dae37a1c1902367b3381e
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0241294Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8110077Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useApp } from '@/components/layout/AppProvider';
import { ShieldIcon } from '@/components/ui/Icons';
import { AdminModal } from '@/components/ui/AdminModal';

export function AdminLoginModal() {
  const { lang, showAdminLogin, closeAdminLogin, loginForm, setLoginForm, submitAdminLogin, setGuestMode } = useApp();
  return <AdminModal open={showAdminLogin} title={lang === 'hu' ? 'Mock bejelentkezés' : 'Mock login'} onClose={closeAdminLogin}><div className='stack'><div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}><span className='btn btn-secondary icon-btn' aria-hidden='true'><ShieldIcon /></span><div><p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.7 }}>{lang === 'hu' ? 'Admin vagy guest mód közti gyors demó váltás egységes felugró ablakban.' : 'Quick demo switch between admin and guest mode in the shared modal style.'}</p></div></div><div className='modal-grid' style={{ marginTop: 18 }}><label><div style={{ marginBottom: 8 }}>{lang === 'hu' ? 'Felhasználónév' : 'Username'}</div><input className='input' placeholder={lang === 'hu' ? 'Felhasználónév' : 'Username'} value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} /></label><label><div style={{ marginBottom: 8 }}>{lang === 'hu' ? 'Jelszó' : 'Password'}</div><input className='input' type='password' placeholder={lang === 'hu' ? 'Jelszó' : 'Password'} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} /></label></div><div className='news-form-actions'><button className='btn btn-secondary' type='button' onClick={setGuestMode}>{lang === 'hu' ? 'Guest mód' : 'Guest mode'}</button><button className='btn btn-primary' type='button' onClick={submitAdminLogin}>{lang === 'hu' ? 'Admin belépés' : 'Admin login'}</button></div></div></AdminModal>;
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\layout\AppProvider.tsx
NAME: AppProvider.tsx
SIZE: 4316
SHA256: f4f363451c16e93435cf21398d7448ce7ffae7068b219eff0a87e1b35edd3d1a
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:11.9933470Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8136305Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang, Theme, ToastItem } from '@/types';

type LoginForm = { username: string; password: string };
type AppContextValue = {
  lang: Lang; setLang: (lang: Lang) => void; toggleLang: () => void;
  theme: Theme; setTheme: (theme: Theme) => void; toggleTheme: () => void;
  isAdmin: boolean; setIsAdmin: (value: boolean) => void; setGuestMode: () => void;
  toast: (text: string, type?: ToastItem['type']) => void;
  toasts: ToastItem[]; removeToast: (id: number) => void;
  modal: { title: string; content: string } | null; openModal: (title: string, content: string) => void; closeModal: () => void;
  showAdminLogin: boolean; openAdminLogin: () => void; closeAdminLogin: () => void; loginForm: LoginForm; setLoginForm: (value: LoginForm) => void; submitAdminLogin: () => void;
};
const AppContext = createContext<AppContextValue | null>(null);
const STORAGE = { lang: 'v26-lang', theme: 'v26-theme', admin: 'v26-admin' };
const getSystemTheme = (): Theme => 'light';
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('hu');
  const [theme, setTheme] = useState<Theme>('light');
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [modal, setModal] = useState<{ title: string; content: string } | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' });
  useEffect(() => {
    const savedLang = window.localStorage.getItem(STORAGE.lang) as Lang | null;
    const savedTheme = window.localStorage.getItem(STORAGE.theme) as Theme | null;
    const savedAdmin = window.localStorage.getItem(STORAGE.admin) === 'true';
    if (savedLang === 'hu' || savedLang === 'en') setLang(savedLang);
    setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : getSystemTheme());
    setIsAdmin(savedAdmin);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem(STORAGE.theme, theme); }, [theme]);
  useEffect(() => { window.localStorage.setItem(STORAGE.lang, lang); }, [lang]);
  useEffect(() => { window.localStorage.setItem(STORAGE.admin, String(isAdmin)); }, [isAdmin]);
  function toggleLang(){ setLang((prev)=> prev === 'hu' ? 'en' : 'hu'); }
  function toggleTheme(){ setTheme((prev)=> prev === 'light' ? 'dark' : 'light'); }
  function setGuestMode(){ setIsAdmin(false); setShowAdminLogin(false); toast(lang === 'hu' ? 'Guest mód aktív.' : 'Guest mode active.', 'info'); }
  function toast(text: string, type: ToastItem['type'] = 'info') {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), 2500);
  }
  function removeToast(id: number) { setToasts((prev) => prev.filter((item) => item.id !== id)); }
  function openModal(title: string, content: string) { setModal({ title, content }); }
  function closeModal() { setModal(null); }
  function openAdminLogin() { setShowAdminLogin(true); }
  function closeAdminLogin() { setShowAdminLogin(false); }
  function submitAdminLogin() {
    if (loginForm.username.trim() && loginForm.password.trim()) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setLoginForm({ username: '', password: '' });
      toast(lang === 'hu' ? 'Admin mód aktiválva.' : 'Admin mode enabled.', 'success');
      return;
    }
    toast(lang === 'hu' ? 'Add meg a felhasználónevet és a jelszót.' : 'Please provide username and password.', 'warning');
  }
  const value = useMemo(() => ({ lang, setLang, toggleLang, theme, setTheme, toggleTheme, isAdmin, setIsAdmin, setGuestMode, toast, toasts, removeToast, modal, openModal, closeModal, showAdminLogin, openAdminLogin, closeAdminLogin, loginForm, setLoginForm, submitAdminLogin }), [lang, theme, isAdmin, toasts, modal, showAdminLogin, loginForm]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp csak AppProvider alatt használható.');
  return context;
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\layout\Footer.tsx
NAME: Footer.tsx
SIZE: 788
SHA256: 7d9990b6a5ee6b17a5c817bd45c3a8757b9b0451a8f2e8d39b14cc69230dc4f3
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0305581Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8167527Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import Link from 'next/link';
export function Footer() {
  return <footer className="footer"><div className="app-shell footer-inner"><div><strong>PTE MIK HÖK</strong><p style={{ color: 'var(--muted)', lineHeight: 1.72 }}>Hallgatói tájékoztatás, közösségi információk és adminisztratív tartalmak egy egységes webes felületen.</p></div><div><strong>Fő részek</strong><div className="stack" style={{ marginTop: 12 }}><Link href="/calendar">Naptár</Link><Link href="/calculator">KKI kalkulátor</Link><Link href="/gallery">Galéria</Link></div></div><div><strong>További oldalak</strong><div className="stack" style={{ marginTop: 12 }}><Link href="/guides">Útmutatók</Link><Link href="/about">About Us</Link><Link href="/office">Office</Link></div></div></div></footer>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\layout\ModalHost.tsx
NAME: ModalHost.tsx
SIZE: 1628
SHA256: 178446e34ed16f45f90d39dfc8cf4bb998c4ec38267a7684acbb9280cc18c76d
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0118677Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8190499Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
const emptyModal = { open: false, title: '', content: '', meta: '' };
export function ModalHost() {
  const app = useApp();
  const [mounted, setMounted] = useState(false);
  const modal = useMemo(() => app?.modal ?? emptyModal, [app]);
  const closeModal = app?.closeModal ?? (() => {});
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!modal || !modal.open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modal, closeModal]);
  if (!mounted || !modal || !modal.open) return null;
  return createPortal(
    <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-toolbar">
          <div>
            <h2 id="modal-title" style={{ margin: '0 0 6px 0' }}>{modal.title}</h2>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{modal.content}</p>
          </div>
          <button className="btn btn-secondary" onClick={closeModal}>Bezárás</button>
        </div>
        {modal.meta ? <div dangerouslySetInnerHTML={{ __html: modal.meta }} /> : null}
      </div>
    </div>,
    document.body
  );
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\layout\Navbar.tsx
NAME: Navbar.tsx
SIZE: 5075
SHA256: 9830202f6f57b02fe89a949d869db343e74619a9399d89656d38e4ce41902aa1
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0003426Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8221741Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { MoonIcon, SunIcon, GlobeIcon, ShieldIcon } from '@/components/ui/Icons';
import { t } from '@/lib/content';

const links = [
  { href: '/calendar', key: 'calendar' },
  { href: '/calculator', key: 'calculator' },
  { href: '/gallery', key: 'gallery' },
  { href: '/guides', key: 'guides' },
  { href: '/about', key: 'about' },
  { href: '/office', key: 'office' }
] as const;

function QuickControls({ lang, theme, isAdmin, onLang, onTheme, onAuth, className = '' }: { lang: 'hu' | 'en'; theme: 'light' | 'dark'; isAdmin: boolean; onLang: () => void; onTheme: () => void; onAuth: () => void; className?: string; }) {
  return <div className={`nav-actions compact-actions ${className}`.trim()}><button className='btn btn-secondary icon-btn nav-icon-btn nav-lang-btn' onClick={onLang} aria-label={lang === 'hu' ? 'Switch to English' : 'Váltás magyarra'}><GlobeIcon /><span className='lang-code'>{lang === 'hu' ? 'HU' : 'EN'}</span></button><button className='btn btn-secondary icon-btn nav-icon-btn' onClick={onTheme} aria-label={lang === 'hu' ? 'Témaváltás' : 'Toggle theme'}>{theme === 'light' ? <MoonIcon /> : <SunIcon />}</button><button className='btn btn-primary nav-login-btn' onClick={onAuth}><ShieldIcon /><span>{isAdmin ? (lang === 'hu' ? 'Guest mód' : 'Guest mode') : (lang === 'hu' ? 'Bejelentkezés' : 'Login')}</span></button></div>;
}

function MobileMenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return <button type='button' className='btn btn-secondary mobile-menu-btn' aria-label='Menu' aria-expanded={open} onClick={onClick}><span /><span /><span /></button>;
}

export function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLang, theme, toggleTheme, isAdmin, setGuestMode, openAdminLogin } = useApp();
  const dict = t(lang);
  const isLanding = pathname === '/';
  const [showFullLandingNav, setShowFullLandingNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (!isLanding) return;
    const ENTER_THRESHOLD = 132;
    const EXIT_THRESHOLD = 180;
    const onScroll = () => {
      const news = document.getElementById('landing-news');
      if (!news) {
        setShowFullLandingNav((prev) => window.scrollY > Math.max(420, window.innerHeight * 0.5) ? true : prev && window.scrollY > Math.max(360, window.innerHeight * 0.42));
        return;
      }
      const top = news.getBoundingClientRect().top;
      setShowFullLandingNav((prev) => {
        if (!prev && top <= ENTER_THRESHOLD) return true;
        if (prev && top > EXIT_THRESHOLD) return false;
        return prev;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isLanding]);

  const authAction = isAdmin ? setGuestMode : openAdminLogin;

  if (isLanding && !showFullLandingNav) {
    return <div className='floating-landing-controls'><div className='app-shell floating-landing-inner'><QuickControls lang={lang} theme={theme} isAdmin={isAdmin} onLang={toggleLang} onTheme={toggleTheme} onAuth={authAction} className='landing-quick-controls' /></div></div>;
  }

  return <header className='topbar topbar-solid'><div className='app-shell navbar navbar-full'><div className='navbar-mobile-head'><Link href='/' className='brand brand-compact' aria-label='PTE MIK HÖK landing'><span className='brand-logo small' /><div className='brand-copy'><strong>PTE MIK HÖK</strong><div className='brand-sub'>{isAdmin ? (lang === 'hu' ? 'Admin mód' : 'Admin mode') : (lang === 'hu' ? 'Guest mód' : 'Guest mode')}</div></div></Link><MobileMenuButton open={mobileOpen} onClick={() => setMobileOpen((prev) => !prev)} /></div><nav className={`nav-links nav-links-desktop`} aria-label='Desktop navigation'>{links.map((link) => <Link prefetch={false} key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>{dict.nav[link.key]}</Link>)}</nav><QuickControls lang={lang} theme={theme} isAdmin={isAdmin} onLang={toggleLang} onTheme={toggleTheme} onAuth={authAction} className='quick-controls-desktop' /></div><div className={`app-shell mobile-nav-panel ${mobileOpen ? 'open' : ''}`}><nav className='mobile-nav-links' aria-label='Mobile navigation'>{links.map((link) => <Link prefetch={false} key={link.href} href={link.href} className={`nav-link mobile-nav-link ${pathname === link.href ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>{dict.nav[link.key]}</Link>)}</nav><QuickControls lang={lang} theme={theme} isAdmin={isAdmin} onLang={toggleLang} onTheme={toggleTheme} onAuth={authAction} className='mobile-quick-controls' /></div></header>;
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\layout\ScrollTopButton.tsx
NAME: ScrollTopButton.tsx
SIZE: 419
SHA256: 89ae3f6e462da213e3b129d94fd6bc4a4f2f899b67aeec8a8d5f7610821feba9
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0190637Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8247372Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@/components/ui/Icons';
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\layout\ToastViewport.tsx
NAME: ToastViewport.tsx
SIZE: 432
SHA256: c49170cc4fc6e05940291eba5caf88c43dae9427e0155830e37c8a931fd2ee66
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0078657Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8278336Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useApp } from '@/components/layout/AppProvider';
export function ToastViewport() {
  const { toasts, removeToast } = useApp();
  return <div className="toast-stack">{toasts.map((item) => <button key={item.id} className="toast animate-rise" onClick={() => removeToast(item.id)}><strong style={{ display: 'block', marginBottom: 6 }}>{item.type.toUpperCase()}</strong><span>{item.text}</span></button>)}</div>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\office\OfficeModule.tsx
NAME: OfficeModule.tsx
SIZE: 1620
SHA256: bd53f5b69d3c8abb2fb6bf474534d798c4e10341e4e28eff09d1fdd57f9a18dd
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0821037Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8300068Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
'use client';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { officeInfo } from '@/lib/content';
export function OfficeModule() {
  const { lang, openModal, isAdmin } = useApp();
  return <section className="section"><SectionHeader eyebrow="Office" title={lang === 'hu' ? 'Jobban csiszolt office oldal' : 'A more polished office page'} text={lang === 'hu' ? 'Az office oldalon csak a tényleg szerkeszthető adatoknál maradnak admin műveletek, például nyitvatartás vagy jelenléti blokk esetén.' : 'On the office page admin actions remain only around truly editable data such as opening hours and attendance blocks.'} /><div className="grid-2"><Card strong><h3>{lang === 'hu' ? 'Nyitvatartás' : 'Opening hours'}</h3><p style={{ color: 'var(--muted)' }}>{officeInfo[lang]}</p>{isAdmin ? <button className="btn btn-ghost">Nyitvatartás szerkesztése</button> : null}</Card><Card><h3>{lang === 'hu' ? 'Kapcsolódó információk' : 'Related information'}</h3><div className="stack" style={{ marginTop: 14 }}><div className="badge">NFC előkészítés</div><div className="badge">Jelenléti blokk</div><div className="badge">Ügyintézési gyorsgombok</div></div><div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}><button className="btn btn-primary" onClick={() => openModal(lang === 'hu' ? 'Office részletek' : 'Office details', officeInfo[lang])}>{lang === 'hu' ? 'Részletek' : 'Details'}</button>{isAdmin ? <button className="btn btn-ghost">Blokk szerkesztése</button> : null}</div></Card></div></section>;
}
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\ui\AdminModal.tsx
NAME: AdminModal.tsx
SIZE: 1373
SHA256: 11cfb084cbb67fc08d30fe3c2209961114ba26bcc4782761a742b8ff7ec08e10
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0980871Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8324268Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
// Magyar magyarázó megjegyzés: ez a fájl a landing oldal működésének egy különálló, később is könnyen módosítható része.
'use client';

// Egységes, újrahasználható admin modal komponens.
// Később más oldalak is ezt használhatják, csak a tartalom változik.
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type AdminModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function AdminModal({ open, title, onClose, children }: AdminModalProps) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('admin-modal-open');
    return () => document.body.classList.remove('admin-modal-open');
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="admin-modal-portal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="admin-modal-underlay" onClick={onClose} />
      <div className="admin-modal-window card" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>{title}</h3>
          <button className="btn btn-secondary" type="button" onClick={onClose}>Bezárás</button>
        </div>
        <div className="admin-modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\ui\Core.tsx
NAME: Core.tsx
SIZE: 599
SHA256: a9b1abd547acf695605337f51a7ad88b26790b892f2ad9fe900500c9b0d7fbaa
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0871232Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8355300Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import type { ReactNode } from 'react';
export function PageShell({ children }: { children: ReactNode }) { return <div className="app-shell">{children}</div>; }
export function Card({ children, strong = false }: { children: ReactNode; strong?: boolean }) { return <div className={`card ${strong ? 'card-strong' : ''}`} style={{ padding: 20 }}>{children}</div>; }
export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <div className="section-head" style={{ marginBottom: 18 }}><small>{eyebrow}</small><h2>{title}</h2><p>{text}</p></div>; }
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \components\ui\Icons.tsx
NAME: Icons.tsx
SIZE: 1076
SHA256: 57e73a71847989125c000cccab5f15d62e539d69c4062be6b97884a32ec80b40
BINARY: False
LANG: tsx
CREATED_UTC: 2026-04-27T21:37:12.0920371Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8370527Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
export function SunIcon() { return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></svg>; }
export function MoonIcon() { return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>; }
export function GlobeIcon() { return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>; }
export function ArrowUpIcon() { return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>; }
export function ShieldIcon() { return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l7 3v6c0 5-3.4 8.4-7 9-3.6-.6-7-4-7-9V6l7-3z" /></svg>; }
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V19-homepage-plan.md
NAME: V19-homepage-plan.md
SIZE: 7707
SHA256: 1f47ff6cbf5a0ea0f2f0839ad2884f14a2381bcf79473fc76822237bdee4fa3a
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1617861Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8390499Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# PTE MIK HÖK Web – V19 irány és főoldal-fejlesztési terv

## V19 cél

A 19. verzió célja, hogy a v18 hibajavított állapotát megtartva visszaállítsa a nagy, erősebb vizuális landing kártyákat a v16-hoz közeli arányokra, miközben innentől a fejlesztés tudatosan oldalszintű, funkcióközpontú irányba fordul.
A következő verzióktól kezdve az oldalak egyesével kerülnek teljesebb kidolgozásra úgy, hogy minden funkció működőképes legyen, adatbázisra később rákapcsolható szerkezetben, mobilra is felkészítve.

## A designrendszer neve

A projekt vizuális nyelvének neve: **MIK Horizon UI**.

Ez a designrendszer egy letisztult, nagy felületű, világos-sötét módban is működő, hallgatóbarát, modern webes megjelenés, amelynek alapjai:
- nagy, hangsúlyos modul-kártyák,
- puha üveg-hatású panelek,
- egységes kék fókuszszín,
- sok levegővel dolgozó layout,
- jól elkülöníthető admin és felhasználói állapotok,
- közös design tokenekből vezérelt színek, radiusok, árnyékok és felületek.

## A MIK Horizon UI szekciói

### 1. Landing hero blokk
A nyitó szekció célja, hogy azonnal egy hivatalos, mégis modern első benyomást adjon.
Itt jelenik meg a HÖK azonosító hero-része, a nagy logó, a rövid bevezető szöveg, valamint a fő CTA, amely a hírekhez vagy a további modulokhoz vezet.
A bal oldal informatív és levegős, a jobb oldal pedig vizuálisan hangsúlyos modul-kártyákat tartalmaz.

### 2. 2x3-as modul-kártyás navigáció
Ez a kezdőoldal egyik legerősebb eleme.
A modul-kártyák a fő funkciók gyors elérésére szolgálnak, és minden kártya külön színes, jól felismerhető identitást kap.
A kártyák célja nem csak a navigáció, hanem az is, hogy már az első képernyőn megmutassák, milyen fő területeket fed le a rendszer.

### 3. Hírek és feed szekció
A főoldal tartalmi magja a hírek blokk.
Itt jelennek meg a saját HÖK hírek, később pedig a Facebook- és Instagram-forrásokból érkező tartalmak is.
Ez a szekció tartalmazza a keresést, szűrést, rendezést, részletező megnyitást és admin szerkesztési pontokat.
A hosszú távú cél, hogy ez legyen az oldal legfontosabb dinamikus információs központja.

### 4. Közösségi forráskapcsolatok
A Facebook és Instagram integráció kezdetben biztonságosan mockolt vagy előkészített adapterrétegen keresztül történjen.
A cél nem az azonnali külső API-függés, hanem egy olyan szerkezet, ahol a későbbi adatkapcsolat külön szolgáltatási rétegbe illeszthető.
Ez azért fontos, mert így a főoldal funkciói előbb is működhetnek, és a backend/adatbázis később köthető hozzájuk.

### 5. Modális ablakrendszer
Az oldal szerkesztési, részletező és létrehozási pontjai egységes felugró ablakokat használjanak.
Ezek közös stílus- és működési szabály alapján készülnek: címsor, leírás, bezárás, elsődleges és másodlagos gombok, valamint egységes overlay.
Ez a későbbi összes oldalnál újrahasznosítható közös alapelem lesz.

### 6. Közös UI-elemek rétege
A gombok, badge-ek, szekciófejlécek, kártyák, inputok, szűrők, toastek, modalok és reszponzív töréspontok közös elemekként legyenek kezelve.
Így a későbbi változtatások egy helyen végrehajthatók, és nem kell minden oldalon külön igazítani ugyanazt a megjelenést.
A V19 egyik fontos szempontja ezért a közös komponens- és stílusréteg tudatos továbbépítése.

## Fejlesztési elv innentől

A további verziókban az oldalak egyesével készülnek el teljes funkcionalitással.
Ez azt jelenti, hogy egyszerre mindig egy oldal kap teljesebb kidolgozást, működő logikát, admin kezelést, mobil finomítást, nyelvváltást, dark mode ellenőrzést és adatbázis-ready szerkezetet.

Javasolt sorrend:
1. Főoldal
2. Naptár és Tornaterem
3. KKI kalkulátor
4. Galéria
5. Útmutatók
6. About Us
7. Office

## A főoldal teljes funkcionalitásának következő lépései

### 1. Hírmodell kialakítása
A hírekhez külön adattípust kell fenntartani.
Legalább ezek az adatok kellenek:
- azonosító,
- cím magyarul,
- cím angolul,
- rövid leírás magyarul,
- rövid leírás angolul,
- teljes tartalom,
- kategória,
- forrás típusa,
- publikálási dátum,
- státusz,
- kiemeltség,
- borítókép,
- külső link,
- szerző vagy admin metaadat.

### 2. Forrásréteg szétválasztása
A saját hírek, Facebook hírek és Instagram feed-elemek külön adapteren keresztül érkezzenek.
A frontend szempontjából egységesített hírobjektumként jelenjenek meg.
Így később bármelyik forrás egyszerűbben cserélhető vagy bővíthető.

### 3. Admin hírszerkesztés
Az admin módban lehessen:
- új hírt létrehozni,
- meglévőt szerkeszteni,
- kiemelni,
- kategóriát adni,
- publikációs állapotot módosítani,
- archiválni vagy törölni.
Mindez modalos szerkesztőfelületen keresztül történjen.

### 4. Keresés, szűrés, rendezés
A főoldali hírek kapjanak teljes működő szűrőblokkot:
- szöveges keresés,
- kategória szerinti szűrés,
- forrástípus szerinti szűrés,
- rendezés dátum és kiemeltség szerint,
- csak publikált elemek megjelenítése normál felhasználóknak.

### 5. Animációs réteg
A főoldalhoz tartozzanak:
- kifinomult belépő animációk,
- hover állapotok,
- scroll alapú hangsúlyváltások,
- hírek nyitási animációi,
- modal nyitási-zárási animációk.
A cél, hogy a felület prémium hatású legyen, de ne váljon túlzsúfolttá.

### 6. Mobiloptimalizálás
A főoldal minden eleme mobilon is legyen jól kezelhető:
- nagy kártyák egy oszlopba törjenek,
- hírszűrők legyenek egymás alá rendezve,
- modalok maradjanak használhatók kisebb képernyőn,
- közösségi feed linkek is könnyen érhetők el.

### 7. Adatbázis-ready szerkezet
Bár az adatbázis a későbbi fázisban jön, a főoldalt már most úgy kell felépíteni, hogy a jelenlegi mock vagy lokális adatréteg később egyszerűen lecserélhető legyen.
Ezért külön kell kezelni:
- tartalmi modellek,
- adapterek,
- admin műveletek,
- UI megjelenítés,
- modalos szerkesztési logika.

## Javasolt mappafinomítás

A mostani szerkezetet érdemes úgy továbbtisztítani, hogy még mindig egyszerű maradjon, de jobban szétváljon a közös rendszer és az oldalspecifikus logika.

Javasolt irány:
- `app/` – route-ok és oldalak
- `components/common/` – közös gombok, badge-ek, szekciófejlécek, modalok, inputok
- `components/home/` – landing hero, module grid, news, social feed, admin tools
- `components/calendar/`
- `components/calculator/`
- `components/gallery/`
- `components/about/`
- `components/office/`
- `lib/content/` – tartalmi mockok és seed adatok
- `lib/adapters/` – facebook, instagram, news normalizálás későbbre
- `lib/utils/` – közös segédfüggvények
- `styles/` vagy központi tokenfájl

## Kódelvek

A további fejlesztések során minden fontosabb fájlban magyar nyelvű kommentek legyenek.
Minden összetettebb logikai résznél röviden szerepeljen:
- mire való az adott rész,
- milyen bemenetet kezel,
- mi az elvárt kimenet,
- hogyan cserélhető majd adatbázisra.

## V19 konkrét eredménye

A V19 jelenlegi célja még nem a főoldal teljes implementációja, hanem annak tudatos előkészítése.
Ennek része:
- a nagy landing kártyák visszaállítása,
- a designrendszer névvel ellátása,
- a szekciók részletes leírása,
- a közös elemek és mappaszerkezet finomításának kijelölése,
- valamint a további verziók oldalszintű fejlesztési stratégiájának rögzítése.
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V24-news-module-notes.md
NAME: V24-news-module-notes.md
SIZE: 3529
SHA256: 83ace39a142d5cb71bef38f49449df8f22f00e31f777aa810b49a02b470a6e3f
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1686094Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8425362Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V24.1 hírek modul – javítások és tudnivalók

## 1. Javított build hiba

A build hibát az okozta, hogy a `LandingNews.tsx` fájlban Python-szerű logikai értékek szerepeltek JavaScript helyett.
A hibás értékek:
- `True`
- `False`

JavaScriptben és TypeScriptben helyesen így kell használni őket:
- `true`
- `false`

Ezért a hiba oka ez volt:

```ts
hasCover: True
```

A javított forma:

```ts
hasCover: true
```

## 2. Hírek modulba bekerült további irányok

A hírek modul jelenlegi szerkezete már elő van készítve a következő fejlesztésekhez:
- borítókép kezelés,
- teljes kattintható hírkártyák,
- kiemelt hírblokk,
- részletek modal,
- admin belépési pontok,
- forráskezelés előkészítése,
- archiválás és ütemezés előkészítése.

A következő fejlesztési körökben ide érdemes még beépíteni:
- új hír létrehozása űrlappal,
- meglévő hír szerkesztése valódi mezőkkel,
- státusz módosítás,
- borítókép feltöltés,
- publikálási időpont megadása,
- kategória kezelés,
- külső link hozzárendelése,
- social source adapterek valós bekötése.

## 3. Animációs irányok

A design most már stabil, ezért a következő animációk húzhatók rá úgy, hogy ne bontsák meg az arculatot:
- landing kártyák finom hover-emelése,
- hírkártyák belépő animációi,
- modálok fade + slide nyitása,
- statisztikai blokkok enyhe count-up megjelenése,
- forrásszűrők és selectek finom állapotváltása,
- sticky navbar megjelenésének kisimítása.

Javaslat: ezeket külön animációs rétegben vagy utility osztályokkal érdemes kezelni, ne az üzleti logikába keverve.

## 4. Hol találod a logók cseréjét

A jelenlegi projektben a logó több helyen vizuális blokk vagy egyszerű stíluselem formájában jelenik meg.
A legfontosabb helyek:

### Navbar logó
Fájl:
- `components/layout/Navbar.tsx`

Itt a `brand-logo` elem felel a navbar logó megjelenítéséért.

### Landing hero logó
Fájl:
- `components/landing/LandingHero.tsx`

Itt a `hok-logo-hero` elem a nagy kezdőlapi logóhely.

### Hozzá tartozó stílusok
Fájl:
- `app/globals.css`

Itt találod a következő classokat:
- `.brand-logo`
- `.hok-logo-hero`

## 5. Ha valódi képet szeretnél beszúrni

A Next.js projektben a legegyszerűbb módszer:

1. Tedd a képet a `public/` mappába, például:
- `public/images/logo-navbar.png`
- `public/images/logo-hero.png`

2. Ezután a hivatkozás útvonala így lesz használható:
- `/images/logo-navbar.png`
- `/images/logo-hero.png`

A `public` mappa tartalma a gyökér URL-ről érhető el.[cite:227][cite:212]

## 6. Példa logó csere

### Navbarban
A mostani vizuális blokk helyett használhatsz például sima képet vagy `next/image` komponenst.

Egyszerű példa:

```tsx
<img src="/images/logo-navbar.png" alt="PTE MIK HÖK logó" width={42} height={42} />
```

### Hero részben

```tsx
<img src="/images/logo-hero.png" alt="PTE MIK HÖK nagy logó" width={340} height={340} />
```

A `public` könyvtárból érkező képeket Next.js-ben gyökérútvonalról lehet elérni, például `/images/logo-navbar.png` formában.[cite:227]

## 7. Gyakorlati javaslat

Érdemes külön mappát létrehozni:
- `public/images/branding/`

Például:
- `public/images/branding/logo-navbar.png`
- `public/images/branding/logo-hero.png`
- `public/images/branding/logo-dark.png`
- `public/images/branding/logo-light.png`

Így később a világos és sötét témához is külön logó használható.
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_10-fix-summary.md
NAME: V25_10-fix-summary.md
SIZE: 1107
SHA256: 9ea1b6de9c6a15794671f63d438e1e54d2e0640f702f63f8ca4cbdd1f7c0cf5d
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2190546Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8455362Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.10 javítási összefoglaló

A hero alatti „Hírek” CTA felirat vékonyabb tipográfiát kapott, és feljebb lett húzva, hogy a hajtás fölött maradjon, mert a hero szakaszban lévő elsődleges cselekvési elemnek azonnal látszania kell.[cite:450][cite:465][cite:468]

Az admin oldali műveletek a hírek jobb oldalára kerültek a korábbi forrásösszegzés helyére, és mindegyik külön felugró ablakot nyit. Ez jól illeszkedik a modálalapú admin műveleti mintákhoz és a fókuszált döntési felületekhez.[cite:523][cite:533][cite:541]

A Facebook és Instagram külön gombok helyett egy közös „Adapterek” gomb alá kerültek, míg a Hírszerkesztő modul, az Archívum és ütemezés, valamint a Kategóriakezelés is külön modálként nyílik meg.[cite:524][cite:538][cite:543]

Ha a felhasználó nincs admin módban, a jobb oldali oszlop teljesen eltűnik, így a hírek kártyái kapják meg a teljes rendelkezésre álló szélességet. A feltételes oldalsó panelmegjelenítés bevett megoldás ilyen adminfüggő felületeknél.[cite:529][cite:542][cite:534]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_11-fix-summary.md
NAME: V25_11-fix-summary.md
SIZE: 732
SHA256: 8a4bd70cc760d3c9c2095b461c12616317618b0e4c5194b7868ac55bd16b2c1c
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2250714Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8479719Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.11 finomítási összefoglaló

A felugró ablakok háttere most már teljes viewportos, fix pozíciójú overlayt használ, mert a teljes oldalas modálháttérhez az overlay-nek a viewporthoz kell igazodnia, nem egy szekciós konténerhez.[cite:557][cite:571][cite:573]

A háttér homályosítása így már nem csak a hírek modult, hanem az egész oldalt érinti, ami megfelel a modálos overlayek bevett megoldásának.[cite:560][cite:581][cite:565]

A „Hírek” CTA most már kizárólag a hero 2x3-as kártyái alatt jelenik meg, keret nélkül, csak a felirat és a lefelé mutató nyíl formájában. A szöveg+nyíl inline megoldás jól illeszkedik a letisztult irányjelző CTA mintákhoz.[cite:582][cite:577]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_12-fix-summary.md
NAME: V25_12-fix-summary.md
SIZE: 900
SHA256: 6b0023e144ba0483ba0da5ac0d1239fefe7459cb4e654497eabbb5253db12d0e
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2330920Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8544938Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.12 javítási összefoglaló

Az admin műveletek most már egy egységes, újrahasználható felugró ablak komponensen keresztül működnek, amely külön UI elemként hivatkozható későbbi oldalakból is. A megosztott modálkomponens használata bevett megoldás React alkalmazásokban, különösen akkor, ha ugyanazt az overlay- és dialóguslogikát több helyen is használni kell.[cite:598][cite:601][cite:604]

A felugró ablak most portálon keresztül a dokumentum törzsébe renderelődik, így a teljes látható oldalt takarja ki, nem csak a hírek modult. A teljes képernyős overlayhez és valóban globális modálhoz a portal-alapú renderelés tipikus megoldás.[cite:584][cite:593][cite:602]

A „Hírek” CTA teljesen kikerült a hero alsó részéből, és a hero title alá került, egyszerű szöveg plusz lefelé nyíl formájában.[cite:589][cite:465][cite:606]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_13-audit-summary.md
NAME: V25_13-audit-summary.md
SIZE: 4143
SHA256: 3a62e77d69a77c49128b73f0988b354faeab4a71bec76c335be0df66401ce35e
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2390905Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8578110Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.13 audit és rendezési összefoglaló

A v25.13 célja nem új funkció bevezetése volt, hanem a jelenlegi működés és design megtartása mellett a kód szerkezetének egységesítése, a közös elemek jobb elkülönítése és a landing + hírek jelenlegi állapotának összegzése.[cite:609][cite:610][cite:624]

A reusable admin műveleti felület közös UI komponensbe került, ami illeszkedik ahhoz a gyakorlathoz, hogy a megosztott modálok, gombok és általános elemek külön, jól hivatkozható helyre kerüljenek a projekten belül.[cite:616][cite:627][cite:633]

A célzott finomításoknál megmaradt az a szabály, hogy ne nőjön túl a mappaszerkezet, ne legyen indokolatlanul rétegzett a projekt, és a további oldalak is ugyanazt a modálos admin mintát tudják követni.[cite:610][cite:624][cite:632]

## Landing page jelenlegi részei

A landing page jelenleg egy külön navbar nélküli hero résszel indul, ahol a felső vezérlők minimalizált formában jelennek meg, és a fő fókusz a HÖK arculati megjelenésén, a fő címen és a 2x3-as nagy navigációs kártyarácson van.[cite:450][cite:628]

A hero title alatt kapott helyet a „Hírek” CTA, amely szöveg + lefelé mutató nyíl formájában közvetlen átvezetést ad a hírek modulhoz. Ez a megoldás illeszkedik a látható, egyértelmű vizuális cue-k használatához a hajtás fölötti részen.[cite:465][cite:628][cite:631]

A landing után érkezik a hírek modul, amely tartalmaz keresést, szűrést, kategória- és forrásszűrést, státuszkezelést, kiemelt hírblokkot és további hírkártyákat. Admin módban jobb oldali műveleti panel is megjelenik, normál módban viszont a hírkártyák kapják meg a teljes szélességet.[cite:450][cite:631][cite:634]

## Hírmodul jelenlegi funkciói

A hírmodulban működik a részletes hírmegnyitás, a keresés, a szűrés, az admin oldali hírszerkesztés, az adapterek kezelése, az archívum és ütemezés felülete, valamint a kategóriakezelés. Ezek mind egységes admin modal komponensen keresztül érhetők el.[cite:598][cite:601][cite:635]

A kiemelt hír külön vizuális blokkban jelenik meg, a további hírek listás-kártyás elrendezésben követik ezt. Az admin ikonok közvetlen gyorsműveletként működnek az egyes hírek mellett.[cite:450][cite:631]

A modálok jelenleg már teljes oldalas overlayjel működnek, mivel portálon keresztül a dokumentum szintjére renderelődnek, nem pedig a hírek komponens saját határain belülre.[cite:584][cite:602][cite:635]

## Még finomítható vagy beköthető részek

A jelenlegi állapot alapján a következő elemeket lehet még tovább finomítani vagy mélyebben bekötni:

- Valós backend vagy JSON-alapú adatforrás bekötése a hírekhez, hogy az adatok ne csak lokális állapotból éljenek.[cite:609][cite:633]
- Admin műveletek tartós mentése, például draft, archiválás, ütemezés és kategóriák állapotának perzisztálása.[cite:610][cite:635]
- Facebook és Instagram adapterek valódi API-logikájának bekötése, mert jelenleg ezek működő UI-k, de nem teljes külső integrációk.[cite:633][cite:634]
- Teljes audit log és visszaállítási logika az admin műveletekhez.[cite:617][cite:634]
- Mélyebb mobiloptimalizálás az admin modalok hosszabb űrlapjainál és kisebb képernyőkön.[cite:631][cite:634]
- A landing oldal későbbi bővítése további bizalmi vagy információs blokkokkal, ha szükséges, például GYIK vagy gyors elérhetőségi rész.[cite:615][cite:628]

## Javasolt következő bekötések

A legjobb következő fejlesztési sorrend az lenne, hogy először a hírek adatforrása váljon tartóssá, utána az admin műveletek mentése stabilizálódjon, és csak ezután történjen külső adapterek vagy fejlettebb jogosultsági logika tényleges bekötése.[cite:609][cite:624][cite:630]

Ez az irány összhangban van azzal a frontend refaktorálási gyakorlattal, amely először a szerkezetet és a shared komponenseket teszi stabillá, és csak ezután mélyíti a külső integrációkat.[cite:621][cite:623][cite:630]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_14-function-audit.md
NAME: V25_14-function-audit.md
SIZE: 4298
SHA256: eb718cd33d9e2120256a425b96bf7b1813d9f715711d7f271986e1c102bdef48
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2460889Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8618691Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.14 funkcióaudit és állapotjelentés

A v25.14 célja az volt, hogy a landing page és a hozzá tartozó hírmodul szerkezetileg rendezettebb, jobban kommentelhető, mobilra készebb és teljesebb működésű legyen úgy, hogy közben a meglévő design ne változzon meg.[cite:609][cite:643][cite:663]

A kód szervezésénél az volt az alapelv, hogy a közös logikák és újrahasznosítható elemek különíthetők legyenek, miközben a projekt egyszerű maradjon és ne csússzon át túlzottan rétegzett architektúrába.[cite:609][cite:624][cite:654]

A többnyelvűség és a dark mode esetében a cél az egységes, minden interaktív elemre kiterjedő működés, mert a nyelvváltás és a témaváltás akkor megbízható, ha nem maradnak benne félrefordított vagy csak részben témázott elemek.[cite:642][cite:645][cite:660]

## Mi működőképes jelenleg

A landing hero, a navigációs kártyák, a hírekhez vezető CTA, a hírkeresés, a kategória- és forrásszűrés, a részletes hírnézet, valamint az admin modalos műveletek jelenleg működőképesek.[cite:643][cite:658]

A közös admin modal teljes oldalas overlayként működik, így a hírek modul admin feladatai egységes felületen érhetők el. Ez megfelel annak a frontend gyakorlatnak, hogy a modálok dokumentumszintű, jól újrahasznosítható komponensek legyenek.[cite:609][cite:635][cite:658]

A landing jelenlegi állapotában mobilra is felkészíthető szerkezetet követ, mert a funkcionális blokkok jól elválaszthatók, a CTA egyértelmű, és az interaktív elemek auditálhatók kis kijelzőn is.[cite:646][cite:661][cite:664]

## Mi lett ebben a körben hozzáadva

Ebben a körben a hangsúly a teljesebb funkcióauditon, a kódlogika további rendezésén és a többnyelvű, dark mode és mobilkész működés állapotának egyértelműsítésén volt.[cite:609][cite:642][cite:663]

A landing page-hez és a hírmodulhoz készült egy részletes állapotjelentés, amely szétválasztja a ténylegesen működő részeket, a részben kész funkciókat és a következő körben beköthető elemeket.[cite:643][cite:649][cite:661]

A fejlesztési fókusz ezzel együtt továbbra is az maradt, hogy a kihelyezett vezérlők mind kapjanak egyértelmű funkciót, és a felhasználó számára látható legyen, melyik elem mire való.[cite:658][cite:664]

## Mi hiányzik még vagy csak részben kész

A többnyelvűség akkor tekinthető teljesen késznek, ha a landinghez kötődő összes admin felirat, státuszszöveg, modálcím és segédszöveg maradéktalanul lokalizált. Ha bármelyik felirat vegyes nyelven marad, azt még végig kell tisztítani.[cite:639][cite:651][cite:654]

A sötét mód akkor tekinthető teljesen késznek, ha a teljes landing, a hírkártyák, az admin modalok, a badge-ek, az inputok és az összes hover/fókusz állapot is következetesen ugyanarra a téma-rendszerre épül, villódzás nélkül.[cite:642][cite:645][cite:660]

Az admin műveletek UI szinten működnek, de a tartós adatmentés, a valódi külső adapterek és a hosszú távú állapotkezelés még további bekötést igényelhetnek.[cite:609][cite:633][cite:656]

## Mi kell még a teljes kész állapothoz

A következő teljesítendő elemek a legfontosabbak:

- Teljes lokalizációs kulcsrendszer a landinghez és a hírmodulhoz.[cite:639][cite:651]
- Teljes témaváltozó-audit light és dark állapotban.[cite:642][cite:645]
- Minden admin gomb mögött valódi mentési vagy állapotváltoztatási folyamat.[cite:658][cite:661]
- Mobilnézetes ellenőrzés a hosszú modaloknál, űrlapoknál és hírlistánál.[cite:646][cite:661][cite:664]
- Tartós adatforrás vagy mentési réteg a jelenlegi lokális működés helyett.[cite:609][cite:654][cite:656]

## Javasolt következő lépés

A legjobb következő kör az lenne, hogy a landing összes szövege és admin állapota közös i18n kulcsokra kerüljön, utána a dark mode teljes vizuális auditja történjen meg, majd ezután jöjjön az összes admin művelet valós perzisztenciája.[cite:639][cite:642][cite:645]

Ez a sorrend biztosítja, hogy a felület előbb konzisztens és stabil legyen, és csak utána épüljenek rá a tartósabb háttérlogikák.[cite:624][cite:654][cite:656]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_17-implementation-audit.md
NAME: V25_17-implementation-audit.md
SIZE: 1637
SHA256: 234c5c663bdfd0ac730e1230049532dc4c703b538431dcb31d2902e4ade6feff
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2551418Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8644548Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.17 implementációs audit

A v25.17-ben a korábban csak tervként megfogalmazott landing fejlesztések tényleges kódmódosítással kerültek átvezetésre. A közös i18n dictionary, a theme-perzisztencia, valamint a landing hírmodul lokális állapotmentése most már a projekt része.[cite:668][cite:707][cite:717]

## Mi került ténylegesen beépítésre

- Közös landing dictionary HU/EN kulcsokkal.[cite:668][cite:689]
- A hero és a hírmodul fő szövegeinek kulcsosítása.[cite:675][cite:681]
- Theme állapot megőrzése localStorage segítségével, rendszer-szintű fallbackkel.[cite:703][cite:706][cite:719]
- Landing news állapotok perzisztenciája localStorage alapon, beleértve híreket, kategóriákat és mentett kereséseket.[cite:717][cite:720][cite:723]
- Mobilnézetes finomítás CSS breakpointokkal a landing, a toolbar, a modal és a hírkártyák számára.[cite:649][cite:664]

## Mi működik most

A hero CTA működik, a landing fő szövegei közös kulcsrendszerből jönnek, a hírek létrehozása és szerkesztése mentődik a kliensoldali perzisztenciába, a kategóriák és mentett keresések szintén megmaradnak frissítés után. A dark mode és a nyelvi preferencia is megőrződik a következő betöltésig.[cite:709][cite:717][cite:724]

## Mi maradt későbbre

A teljes projekt összes oldalára kiterjedő i18n még nincs kész, jelenleg a landing fókuszú kulcsosítás valósult meg. Az admin műveletek perzisztenciája kliensoldali alapmegoldás, ezért a későbbi biztonságosabb, adatbázisos vagy API-s mentés továbbra is indokolt.[cite:676][cite:688][cite:693]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_1-fixes.md
NAME: V25_1-fixes.md
SIZE: 1599
SHA256: a52861d82caac28be25bcda0c446920a4cd8ed0cd0dbe3b09390e8ad10bd97d3
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1740242Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8690294Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.1 hibajavítás – ModalHost null context védelem

## Javított hiba

A v25-ben a következő hiba jelent meg:

```txt
TypeError: Cannot read properties of null (reading 'open')
```

Ez a `ModalHost` komponensben történt, mert a komponens a contextből érkező `modal` objektumot közvetlenül használta, miközben bizonyos renderelési helyzetekben a context még `null` lehetett.

## Mi volt a gond

A korábbi logika ilyen mintát követett:

```tsx
const { modal, closeModal } = useApp();
...
}, [modal.open, closeModal]);
```

Itt a `modal.open` már a dependency listában is kiértékelődött, ezért ha a context még nem állt készen, az oldal hibára futott.

## Mi lett javítva

A `ModalHost` most már védett fallback logikát használ:

- ha az app context még nem elérhető, akkor egy üres `emptyModal` objektumot használ,
- a `closeModal` is kap egy biztonságos no-op fallbacket,
- az effect és a render is csak akkor fut tovább, ha a `modal` tényleg létezik és `open === true`.

## Miért működik így stabilabban

A React context használatánál gyakori minta, hogy a fogyasztó oldalon explicit null vagy undefined védelmet kell beépíteni, különösen App Router, SSR és hydrate közeli helyzetekben.[cite:288][cite:293]

A portálos modáloknál szintén bevett gyakorlat, hogy a megjelenítés csak mount után történjen, és legyen SSR-védelem, illetve fallback konténer logika.[cite:271][cite:292]

## Eredmény

A `ModalHost` többé nem dob hibát akkor sem, ha a provider később áll fel, vagy átmenetileg hiányzik a contextérték.
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_2-news-admin-documentation.md
NAME: V25_2-news-admin-documentation.md
SIZE: 2419
SHA256: 89332f1626305c7111e7043b7ab2256ab00f070f5ecfc2a66309bcbafdc16010
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1554376Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8710831Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.2 – főoldali hírmodul admin és részletező dokumentáció

## 1. Alapelv

A főoldal jelenlegi designja véglegesnek tekintendő ezen a verzióágon, ezért a módosítások kizárólag működési oldalról történtek. A vizuális szerkezetet nem kellett áttervezni, csak a vezérlőelemek viselkedését és láthatóságát kellett pontosítani.[cite:295]

## 2. Teljesen eltávolított elem


## 3. Admin módban látható elemek

A következő elemek kizárólag admin módban jelennek meg:
- új hír,
- Facebook adapter,
- Instagram adapter,
- archívum / ütemezés,
- hír szerkesztése,
- kategóriabővítés és kategóriakezelés.

Ez feltételes rendereléssel történik, vagyis ezek az elemek normál felhasználói nézetben nem látszanak.[cite:295][cite:310]

## 4. Ikonos vezérlés

A fő admin műveletek most már ikon gombokkal érhetők el. Az ikon-only gombok mind kaptak `aria-label` és `title` attribútumot is, mert az ilyen vezérlőelemeknél ez fontos akadálymentességi követelmény.[cite:301][cite:321][cite:315]

## 5. Működő modálok

A következő funkciók működő felugró ablakkal nyílnak meg:
- új hír létrehozása,
- hír szerkesztése,
- Facebook adapter,
- Instagram adapter,
- archívum és ütemezés,
- kategóriakezelés,
- részletek megnyitása.

A modálrendszer a korábban stabilizált központi hostot használja, így minden funkció azonos megnyitási logikával működik.[cite:295]

## 6. Külső közösségi posztok

A Facebook és Instagram forrásból származó hírekhez most már közvetlen külső link is társítható. Ezek a linkek külön ikon gombbal nyithatók meg, új lapon, `target="_blank"` és `rel="noopener noreferrer"` használatával, ami biztonságos külső linkkezelési minta.[cite:300][cite:306][cite:320]

## 7. Hol keresd a fő működéseket

### Hírek fő logikája
- `components/landing/LandingNews.tsx`

### Központi modál host
- `components/layout/ModalHost.tsx`

### Általános stílusok
- `app/globals.css`

## 8. Mit lehet most már közvetlenül tesztelni

- Admin módba váltás után megjelennek az admin-only ikon gombok.
- Az új hír gomb megnyit egy működő admin űrlapot.
- A szerkesztés ikon megnyitja az adott hír előtöltött űrlapját.
- A részletek ikon működő modált nyit.
- Facebook és Instagram elemeknél a külső ikon új lapra navigál a forráshoz.[cite:300]
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_3-news-focus-documentation.md
NAME: V25_3-news-focus-documentation.md
SIZE: 1748
SHA256: 6b1b109b639cbc3bb7c78a1de018a445853e2f2cf8435532005165e887a855cb
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1811943Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8745652Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.3 – végleges főoldali design mellett működő hírmodul dokumentáció

## 1. Rögzített designelv

Ebben a verzióban a főoldal designja véglegesnek tekintendő, ezért a további munka kizárólag a hírek modul működési oldalára koncentrál. A vizuális szerkezetet nem módosítja ez a verzió, csak az admin műveletek, a modálok és a jövőbeli adatbázis-kapcsolhatóság lettek továbbfejlesztve.[cite:353]



## 3. Működő modál-alapú hírkezelés

A hírmodul most már külön felugró ablakot használ minden fontosabb művelethez: részletek megtekintése, új hír létrehozása, hír szerkesztése, Facebook adapter beállítása, Instagram adapter beállítása, archívum és ütemezés, valamint kategóriakezelés.[cite:330][cite:350][cite:353]

## 4. Database-ready felépítés

A mostani működés még lokális állapotkezeléssel dolgozik, de a struktúra már alkalmas arra, hogy később adatbázisra vagy API-ra lehessen kötni. Ez azért fontos, mert a create, edit, publish, archive és delete műveletek logikailag már külön vannak választva.[cite:342][cite:344][cite:347]

## 5. Hol találod a fő részeket

### Hírek fő logika
- `components/landing/LandingNews.tsx`

### Központi modálrendszer
- `components/layout/ModalHost.tsx`

### Általános stílusok
- `app/globals.css`

## 6. Mit lehet közvetlenül tesztelni

Admin módban jelenleg közvetlenül tesztelhető az új hír modál, a szerkesztés modál, a Facebook adapter modál, az Instagram adapter modál, az archívum / ütemezés modál, a kategóriakezelés modál, a piszkozat létrehozás, a publikálás, az archiválás, a törlés és a külső Facebook / Instagram link megnyitás új lapon.[cite:300][cite:306]
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_4-fix-summary.md
NAME: V25_4-fix-summary.md
SIZE: 589
SHA256: 8c4db69848d6b1cb563515552349639ee989208d829a7669324f864f3da461df
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1872768Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8776249Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.4 javítási összefoglaló

## 1. Landing hírek nyíl visszaállítása

A landing page-en visszakerült a lefelé mutató nyíl, amely közvetlenül a `landing-news` szekcióhoz görget. Ez a megoldás jól illeszkedik a Reactes in-page anchor és `scrollIntoView()` megközelítéshez.[cite:371][cite:375]



## 3. Hírmodul működő admin logikával

A hírmodul most már nem csak ikonokat tartalmaz, hanem lokális create, edit, publish, archive és delete működést is. Ez a struktúra jó alapot ad a későbbi API- vagy adatbázis-integrációhoz is.[cite:341][cite:344]
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_5-fix-summary.md
NAME: V25_5-fix-summary.md
SIZE: 418
SHA256: b5ba9284eb43cedd5d87bbed08995b0cae0966c950207206ee9b90961debe8b8
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1923828Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8811796Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.5 javítási összefoglaló

A landing hírekhez vezető nyíl a kártyák alá került, ami a szekcióhoz görgető CTA-k ismert és jól követhető mintájához illeszkedik.[cite:391][cite:394]

Az admin funkciókat összecsukható és újranyitható blokkokba szerveztem, mert ez a megoldás jól használható hosszabb vezérlőfelületeknél, és az accordion mintához is illeszkedik.[cite:399][cite:403]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_6-fix-summary.md
NAME: V25_6-fix-summary.md
SIZE: 580
SHA256: 4a2ae1e243b286f60bf5f1be8cac85da7eabfce3b946c49c8cd7cca910542999
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1975201Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8841758Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.6 javítási összefoglaló

Az admin funkciók most már csak admin módban látszanak, és egy külön gombpanelről választhatók ki, ami jól illeszkedik a React feltételes renderelési mintáihoz.[cite:431][cite:441]

A landing hírekhez vezető nyíl a kártyák alatti részhez lett kötve, és a hírek listájának tetejére görget.[cite:440][cite:394]

A footer alatti lap tetejére gomb maradványait agresszív szelektorokkal is letiltottam, mert a fix lebegő elemek gyakran fedik a láblécet vagy zavarják az alsó layoutot.[cite:435][cite:442][cite:376]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_7-fix-summary.md
NAME: V25_7-fix-summary.md
SIZE: 686
SHA256: 031a83d4a31b85398c87d6bf86b07d9ca84f6ac03ab24ed66accd800339c28d5
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2034112Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8866857Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.7 javítási összefoglaló

A hírekhez vezető görgető nyílból most már csak egyetlen darab marad a rendszerben. A duplikált nyilak minden más komponensből és köztes helyről ki lettek szedve.[cite:464][cite:446]

Az egyetlen megmaradó nyíl a landing page legaljára került, még a kezdőlap fő blokkán belül, ami jobban megfelel a hero aljára helyezett CTA-k és lefelé vezető vizuális jelzések bevett mintájának.[cite:459][cite:465][cite:468]

A javítás célja az volt, hogy a nyíl ne ússzon külön modulban vagy rossz helyen, hanem egyértelműen a landing alján jelenjen meg, és onnan vezessen tovább a hírek szekcióhoz.[cite:460][cite:461]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_8-fix-summary.md
NAME: V25_8-fix-summary.md
SIZE: 564
SHA256: bd026572715204010f28dba40fdcb33f43806947d245d4c5387807dd920a8f02
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2083825Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8886858Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.8 javítási összefoglaló

A landing oldali hírekhez vezető nyíl feljebb került, és külön szöveges címkét is kapott, mert a lefelé mutató vizuális jelzések akkor működnek a legjobban, ha egyértelműen jelzik, milyen tartalomhoz vezetnek tovább.[cite:488][cite:498]

A 2x3-as landing kártyák mérete enyhén növelve lett, hogy hangsúlyosabban töltsék ki a hero blokkot. A nagyobb kártyaméret a reszponzív gridnél is jól kezelhető, ha a minimum oszlopszélességet és a belső térközt óvatosan emeljük.[cite:491][cite:500]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V25_9-fix-summary.md
NAME: V25_9-fix-summary.md
SIZE: 603
SHA256: f1729ab8495e52dc9078a86e8ee54af0dd8c7863d80af9aa593ae3c6725a64ff
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2136020Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8912518Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V25.9 javítási összefoglaló

A „Hírek” kiírás most már közvetlenül a nyíl mellett jelenik meg, egy közös inline CTA-elemként.[cite:490][cite:512]

Az elem kifejezetten a hero főoldalon, közvetlenül a 2x3-as kártyák alatt kapott helyet, hogy még a navbar nélküli nyitóképen belül látható maradjon, és onnan vezessen tovább a hírek modulhoz.[cite:509][cite:514][cite:515]

A hírek panel tetején minden ilyen nyíl- és feliratmaradvány külön tiltást kapott, így a görgetési cue csak ott jelenik meg, ahol kell: a landing hero blokk alján.[cite:498][cite:508]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26_1-navbar-refine.md
NAME: V26_1-navbar-refine.md
SIZE: 615
SHA256: 7b965bd26ad0be46aa2d97d14861b03efcb67f0b67c68f6ac27f1e87b5b20b43
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2684979Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8933271Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26.1 navbar refine

A v26.1 célja a landing hero szakasz további tisztítása volt: ilyenkor már ne látszódjon a teljes navbar csíkja sem, csak a külön lebegő gyorsvezérlők. Ez csökkenti a vizuális terhelést a hero nyitókép felett, miközben a szükséges interakciók továbbra is gyorsan elérhetők maradnak.[cite:751][cite:753]

A nyelvváltó most egyszerű zászlós gombot kapott, a témaváltó nap/hold ikonra épül, és az alapértelmezett téma világosra lett állítva. A belépés mock külön kihelyezett panelként nyílik meg, nem a felső sáv részeként.[cite:733][cite:751]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26_2-navbar-cleanup.md
NAME: V26_2-navbar-cleanup.md
SIZE: 674
SHA256: bce5570194c71bf713a6132b43c60a875cd8748b37232b6fc61d861ffd460da5
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2737199Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8968389Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26.2 navbar cleanup

A v26.2-ben a landing hero állapot és a teljes navbar ikonrendszere egységesítésre került, hogy a helyettesítő gyorsgombok ugyanazt a vizuális nyelvet használják, mint a normál navbar vezérlői. Ez segíti az állandó mintafelismerést és csökkenti a váltásból eredő törést az élményben.[cite:751][cite:753]

A nyelvváltó most már valódi zászlójelzést is kap a gombon belül, miközben a navbarból kikerültek a fölösleges díszítő eltérések. A mock belépés panel pozicionálása is javítva lett, így már középre helyezett lebegő panelként nyílik, nem footer-szerű elrendezésben.[cite:733][cite:751]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26_3-navbar-modal-unify.md
NAME: V26_3-navbar-modal-unify.md
SIZE: 694
SHA256: 9567ec429bc8064ea3df1adb432ea4245d897fced0f5ab9833a1d8929c0d4074
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2780587Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.8989128Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26.3 navbar és login modal egységesítés

A v26.3-ban a mock bejelentkezés külön egyedi panel helyett ugyanarra az egységes AdminModal komponensre került, amelyet a hírek modul admin felugró ablakai is használnak. Ez a közös felugróablak-minta javítja a következetességet és csökkenti a külön UI-megoldások számát.[cite:751][cite:753]

A hibás footer alatti megjelenés megszüntetéséhez a modal portálos, fix pozicionált rétege külön megerősítést kapott CSS-szinten is. Emellett a navbarból kikerült a fölösleges landing-link a nav links sorból, a nyelvgombon pedig most már HU és EN felirat jelenik meg a globusz ikon mellett.[cite:751][cite:733]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26_4-navbar-stability.md
NAME: V26_4-navbar-stability.md
SIZE: 626
SHA256: 3e634f12aa44aae3bf5b6fdad2c0071e07d88a2d5cb532d1dc84bf889f44f968
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2850560Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9009113Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26.4 navbar stability finomítás

A v26.4-ben a landing oldali QuickControls már fixen a lap tetejére van rögzítve, és nem külön lebegő elemként mozog a tartalommal. A fix top mintázat gyakori megoldás ilyen vezérlőknél, mert egyértelműbb térbeli viselkedést ad a felhasználónak.[cite:763][cite:780]

A login gomb fix szélességet kapott, hogy a magyar és angol szöveg közti hosszúságkülönbség ne okozzon méretugrást. A lokalizált feliratok miatti szélességváltás tipikus UI instabilitás, amely rögzített vagy garantált minimális szélességgel kerülhető el.[cite:771][cite:786]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26_5-hero-navbar-transition.md
NAME: V26_5-hero-navbar-transition.md
SIZE: 736
SHA256: fdb8092df40b4fb7b4040aab2072ed808a0b71db6f518bab19bbdeef5d42982b
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2895490Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9033564Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26.5 hero és navbar átmenet

A v26.5-ben a landing hero állapotában látható QuickControls már nem viewporthoz ragadó lebegő elemként viselkedik, hanem a lap tetejére rögzített, statikus helyen marad addig, amíg a teljes navbar meg nem jelenik. A fixed és sticky viselkedés közti különbség ilyen átmeneteknél fontos, mert más térbeli érzetet ad a felhasználónak.[cite:809][cite:813]

A hírekhez vezető nyíl a hero leírás alá került, és a görgetés most célzott offsettel pontosan addig visz, ahol a navbar már fixen megjelenik. Fix vagy sticky fejléc mellett az anchor scroll offset külön kezelése bevett gyakorlat, hogy a célblokk ne csússzon a fejléc alá.[cite:799][cite:805][cite:812]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26_6-navbar-flicker-fix.md
NAME: V26_6-navbar-flicker-fix.md
SIZE: 611
SHA256: db1a55e689c66b0d1b1d81244bb2416b7349bc4c756f9d8ebce2fb005ccd88e8
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2945015Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9053563Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26.6 navbar flicker fix

A v26.6-ban a navbar megjelenésének villódzását hiszterézises belépési és kilépési küszöbök bevezetése csökkenti. Az ilyen megoldás gyakori akkor, amikor egy UI-állapot ugyanazon közeli pozíció környékén váltana oda-vissza görgetés közben.[cite:794][cite:818][cite:822]

A hírek gomb célpozíciója kissé lejjebb került, így a görgetés után a hírek blokk valamivel mélyebbre kerül a viewportban. Sticky vagy fixed fejléc mellett a scroll offset finomhangolása bevett módszer a pontosabb érkezési élményhez.[cite:799][cite:812][cite:823]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26_7-mobile-navbar.md
NAME: V26_7-mobile-navbar.md
SIZE: 681
SHA256: 32fbc7c3ac8d28c9f5bf2f61b7d2e2704b03eb601e90b3edb5e4b57c1caee0db
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.3012848Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9079219Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26.7 mobil navbar és scroll finomítás

A v26.7-ben a hírek scroll célpozíciója még kissé lejjebb került, hogy a felhasználó érkezéskor többet lásson magából a hírek blokkból. Fixed vagy sticky fejlécek mellett ez az offset-finomhangolás megszokott megoldás.[cite:812][cite:823]

A navbar mobilon teljesen külön optimalizált működést kapott: a desktop linksor helyett nyitható mobil menü jelenik meg, nagyobb érintési célfelületekkel és külön mobilra rendezett gyorsvezérlőkkel. Mobil navigációnál a kollabálható menü, a nagy tap targetek és a tiszta prioritáskezelés bevett best practice.[cite:841][cite:842][cite:843][cite:845]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26_8-nav-width-scroll.md
NAME: V26_8-nav-width-scroll.md
SIZE: 646
SHA256: 578813b839a7d2dab27566fa69f9feb4ac0d75a0599ecd953f6ad6bfcd30ac48
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.3075363Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9099821Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26.8 nav szélesség és scroll finomítás

A v26.8-ban a navbar oldalgombjai rögzített, kiegyensúlyozott sávszélességet kaptak, hogy nyelvváltáskor ne ugorjanak el a helyükről. Lokalizált felületeknél a szöveghossz-változás okozta layout shift tipikus probléma, amelyet stabil minimum vagy előre kiosztott helyekkel lehet csökkenteni.[cite:875][cite:878][cite:870]

A hero hírek nyíl scroll célja ismét kissé lejjebb került, hogy a hírek blokk érkezéskor még mélyebben helyezkedjen el a viewportban. Fixed header mellett a scroll offset további finomítása megszokott megoldás.[cite:862][cite:869][cite:877]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V26-navbar-audit.md
NAME: V26-navbar-audit.md
SIZE: 1046
SHA256: 4ed941f2febaa694f23a3cd1e4de0800b486dbe4d17a0cb855ffdaadb16161a9
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.2611322Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9119815Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V26 navbar audit

A v26 fő fókusza a navbar újrarendezése volt: a landingen a teljes navbar csak a hírek modul környékén jelenik meg, a hero szakaszban pedig csak a mock belépés, a nyelvváltás és a témaváltás marad látható. A sticky és feltételesen megjelenő navbar ilyen helyzetben bevett minta, mert csökkenti a vizuális zajt a hero szakaszban, miközben a navigáció később teljesen elérhető marad.[cite:728][cite:734][cite:751]

A login gomb most demó módban admin belépést és guest módra váltást is támogat, a nyelvgomb pedig ténylegesen vált a magyar és az angol nyelv között. A navigáció bal oldalán kis méretű HÖK logó marad, amely kattintásra a landing page-re visz vissza.[cite:733][cite:750][cite:751]

A landing minimal navbar állapotából kikerültek a felesleges elemek, így addig csak a tényleg szükséges vezérlők látszanak, amíg a felhasználó el nem éri a hírek modult. Ez megfelel a progresszív, rétegenként bővülő navigáció elvének.[cite:751][cite:753]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V27_1-calendar-fix.md
NAME: V27_1-calendar-fix.md
SIZE: 715
SHA256: 503f97984c3af32b3acf6daa02555eb119f6e8057bd595683b7da3419123f3f0
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.3218413Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9144369Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V27.1 naptár hibajavítás és funkcióbővítés

A v27.1 elsődleges célja a /calendar oldalon jelentkező runtime hiba megszüntetése volt. A projekt elvárása szerint minden fő oldalnak működő funkciókat kell kapnia, ezért a javítás mellett további használható naptár- és foglaláskezelési funkciók is bekerültek.[file:759]

A hiba oka az volt, hogy a foglalási slot feldolgozása nem minden bemeneti formátum esetén adott vissza biztonságosan kezdő és záró időpontot, ezért az időparszolás undefined értékre futhatott. A javított verzió biztonságos slot parsert, null-védett időfeldolgozást, státuszszűrést és gyors foglalási idősávokat is tartalmaz.[file:759]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V27_2-calendar-unification.md
NAME: V27_2-calendar-unification.md
SIZE: 824
SHA256: e7e0acad59caf1575b2f81103b49702487762f3a376e884b64845b9b2b49690e
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.3277050Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9174330Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V27.2 naptár egységesítés és navigációjavítás

A v27.2-ben a naptár oldal teljes szerkezeti újrarendezést kapott, mert a projekt célja szerint a fő oldalaknak egységes, átlátható és jól bemutatható rendszerként kell működniük. A projektleírás külön kiemeli, hogy az oldalak ugyanabból a közös vizuális és szerkezeti logikából épüljenek fel, és a naptár oldal havi nézetet, lista nézetet, foglalási űrlapot, valamint admin elfogadási és elutasítási logikát is tartalmazzon.[file:759]

Az új verzióban külön szekcióra vált szét a naptárnézetek tere, a hallgatói foglalási felület és az admin mód. Emellett javítva lett a navbar és a landing hero oldalgombjainak működése is, hogy az oldalakra vezető hivatkozások ismét stabilan navigáljanak.[file:759]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V27_3-calendar-refine.md
NAME: V27_3-calendar-refine.md
SIZE: 752
SHA256: bc2166b25997a3dade6935b1e06f67797c0b625eed2c29b9b5c47bd7c6095c3f
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.3343111Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9190028Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V27.3 naptár finomhangolás

A v27.3-ban a naptár oldal újra egybefüggő, szellősebb szerkezetet kapott. A projektleírás szerint a naptár oldalnak havi nézetet, lista nézetet, foglalási űrlapot és admin elfogadási vagy elutasítási logikát is tartalmaznia kell, de mindezt egységes és jól áttekinthető oldalszerkezetben érdemes bemutatni.[file:759]

Az új verzióban megszűnt a felül látható külön egységesített hero blokk, az admin műveletek pedig egyetlen gombon keresztül megnyitható egységes adminablak-logikához kapcsolódnak. A timeline, cards és naptár nézet ugyanazt a kiválasztott napot és szűrési állapotot használja, a foglalási felület pedig kizárólag a tornateremre vonatkozik.[file:759]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V27_4-timeline-and-modal.md
NAME: V27_4-timeline-and-modal.md
SIZE: 387
SHA256: 847d5a421df03bf36cde72ca8bd719964249aecb7cecfbd9e3959cf4e1f19d1a
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:36:08.9769602Z
MODIFIED_UTC: 2026-04-27T21:35:37.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9210093Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V27.4 timeline, card, modal refinement

A v27.4-ben a timeline napokra előre haladó, színezett láncként működik, a cards nézet kétoszlopos rácsot használ, az admin műveletek külön modal ablakba kerültek, és a tornaterem foglalás külön gombként jelenik meg a többi művelet mellett. A naptár nézet változatlanul áttekintő havi rácsként maradt meg.[file:759]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \docs\V27-calendar-module.md
NAME: V27-calendar-module.md
SIZE: 690
SHA256: 2f737c7fa596a336d6393da5d832e82ad82e4dbfb7501ba62f3ff5fd3c3861fa
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.3155345Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9230093Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# V27 naptár és tornaterem modul

A v27-ben a naptár oldal teljes design- és működésbeli kidolgozást kapott. A projektleírás szerint ez az oldal havi és lista nézetet, foglalási űrlapot, vizuális ütközésjelzést, valamint admin oldali elfogadási és elutasítási logikát is tartalmazzon.[file:759]

A mostani verzióban megvalósult egy valós havi nézet, kijelölt napi eseménylista, kategóriaszűrés, keresés, tornaterem-foglalási űrlap, ütközésfigyelés, valamint admin oldali jóváhagyás és elutasítás. Ez illeszkedik ahhoz a célhoz, hogy a naptár oldal a rendszer egyik legerősebb, önállóan is bemutatható működő modulja legyen.[file:759]

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \lib\content.ts
NAME: content.ts
SIZE: 6269
SHA256: deb46207aa3cfcedb439eb8e0540bc9b2ac5a71f30020c12421774a17ddbd493
BINARY: False
LANG: ts
CREATED_UTC: 2026-04-27T21:37:12.1026630Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9265886Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import type { Lang, Semester } from '@/types';
export const dictionary = {
  hu: {
    brand: 'PTE MIK HÖK',
    nav: { calendar: 'Naptár', calculator: 'KKI kalkulátor', gallery: 'Galéria', guides: 'Útmutatók', about: 'About Us', office: 'Office' },
    common: { adminLogin: 'Admin belépés', editOn: 'Szerkeszthető mód', editOff: 'Szerkesztés lezárása', openNews: 'Hírek lenyitása', closeNews: 'Hírek elrejtése', save: 'Mentés', cancel: 'Mégse', accept: 'Elfogadás', reject: 'Elutasítás', timeline: 'Timeline', cards: 'Kártya nézet', calendar: 'Naptár nézet' }
  },
  en: {
    brand: 'PTE MIK HÖK',
    nav: { calendar: 'Calendar', calculator: 'KKI Calculator', gallery: 'Gallery', guides: 'Guides', about: 'About Us', office: 'Office' },
    common: { adminLogin: 'Admin login', editOn: 'Editable mode', editOff: 'Lock editing', openNews: 'Open news', closeNews: 'Hide news', save: 'Save', cancel: 'Cancel', accept: 'Accept', reject: 'Reject', timeline: 'Timeline', cards: 'Card view', calendar: 'Calendar view' }
  }
} as const;
export const landingCards = [
  { href: '/calendar', color: 'linear-gradient(135deg,#2858ff,#567dff)', titleHu: 'Naptár', titleEn: 'Calendar', textHu: 'Programok, idővonal, foglalás.', textEn: 'Programs, timeline and booking.' },
  { href: '/calculator', color: 'linear-gradient(135deg,#0f8f78,#28ba95)', titleHu: 'KKI kalkulátor', titleEn: 'KKI Calculator', textHu: 'KI, KKI, súlyozott átlag.', textEn: 'KI, KKI and weighted average.' },
  { href: '/gallery', color: 'linear-gradient(135deg,#7c49ff,#a06cff)', titleHu: 'Galéria', titleEn: 'Gallery', textHu: 'Mappák, nézetek, feltöltés.', textEn: 'Folders, views and upload.' },
  { href: '/guides', color: 'linear-gradient(135deg,#da7d14,#f2a93c)', titleHu: 'Útmutatók', titleEn: 'Guides', textHu: 'Dokumentumok és segédanyagok.', textEn: 'Documents and support materials.' },
  { href: '/about', color: 'linear-gradient(135deg,#d24b5f,#f07590)', titleHu: 'About Us', titleEn: 'About Us', textHu: 'A HÖK felépítése és tagjai.', textEn: 'Structure and members of the union.' },
  { href: '/office', color: 'linear-gradient(135deg,#305f9f,#4b8de0)', titleHu: 'Office', titleEn: 'Office', textHu: 'Nyitvatartás és ügyintézés.', textEn: 'Office hours and service info.' }
] as const;
export const newsItems = [
  { id: 1, date: '2026-05-03', category: 'Közélet', titleHu: 'Hallgatói fórum a tavaszi félév végén', titleEn: 'Student forum at the end of spring semester', textHu: 'Nyitott egyeztetés a hallgatói visszajelzésekről és a következő fejlesztési irányokról.', textEn: 'Open discussion about student feedback and the next development directions.' },
  { id: 2, date: '2026-05-06', category: 'Sport', titleHu: 'Tornatermi foglalások új rendszere', titleEn: 'Updated gym booking process', textHu: 'Egyszerűbb kéréskezelés, átláthatóbb admin elfogadással.', textEn: 'Simpler request flow with clearer admin approval.' },
  { id: 3, date: '2026-05-09', category: 'Tanulmányok', titleHu: 'Vizsgaidőszaki segédlet elérhető', titleEn: 'Exam period guide is available', textHu: 'Az útmutatók oldalon új hallgatói anyagok jelentek meg.', textEn: 'New student resources have been published on the guides page.' }
] as const;
export const calendarItems = [
  { id: 1, date: '2026-05-03', dayLabel: 'Ma', time: '17:00', titleHu: 'Hallgatói fórum', titleEn: 'Student forum', location: 'Aula', category: 'community' },
  { id: 2, date: '2026-05-04', dayLabel: '+1', time: '18:00', titleHu: 'Kosárlabda edzés', titleEn: 'Basketball practice', location: 'Tornaterem', category: 'sport' },
  { id: 3, date: '2026-05-05', dayLabel: '+2', time: '15:00', titleHu: 'Vizsga felkészítő', titleEn: 'Exam preparation', location: 'B305', category: 'study' }
] as const;
export const bookingRequests = [
  { id: 1, title: 'Röplabda csapat', slot: '2026-05-07 18:00', status: 'pending' },
  { id: 2, title: 'Kari sportkör', slot: '2026-05-08 19:00', status: 'approved' }
] as const;
export const initialSemesters: Semester[] = [
  { id: 1, name: '2025/26 ősz', ghost: false, subjects: [
    { id: 11, name: 'Matematika 1', credits: 5, grade: 4, completed: true },
    { id: 12, name: 'Programozás 1', credits: 6, grade: 5, completed: true },
    { id: 13, name: 'Fizika', credits: 4, grade: 3, completed: false }
  ]},
  { id: 2, name: '2025/26 tavasz', ghost: false, subjects: [
    { id: 21, name: 'Matematika 2', credits: 5, grade: 4, completed: true },
    { id: 22, name: 'Webfejlesztés', credits: 5, grade: 5, completed: true }
  ]}
];
export const galleryFolders = [
  { id: 1, name: 'Rendezvények' },
  { id: 2, name: 'Sport' },
  { id: 3, name: 'Közélet' }
] as const;
export const galleryItems = [
  { id: 1, folderId: 1, titleHu: 'Gólyatábor', titleEn: 'Freshers camp', date: '2025-09-12' },
  { id: 2, folderId: 2, titleHu: 'Sportnap', titleEn: 'Sports day', date: '2026-03-20' },
  { id: 3, folderId: 3, titleHu: 'Hallgatói fórum', titleEn: 'Student forum', date: '2026-04-11' }
] as const;
export const guideItems = [
  { id: 1, titleHu: 'Kollégiumi ügyintézés', titleEn: 'Dorm administration', textHu: 'Lépésről lépésre összefoglaló kollégiumi ügyekhez.', textEn: 'Step-by-step overview for dormitory administration.' },
  { id: 2, titleHu: 'Neptun alapok', titleEn: 'Neptun basics', textHu: 'Hallgatói ügyintézéshez szükséges alap információk.', textEn: 'Core information for student administration.' }
] as const;
export const aboutPeople = [
  { id: 1, name: 'Elnök', roleHu: 'Képviselet és koordináció', roleEn: 'Representation and coordination' },
  { id: 2, name: 'Alelnök', roleHu: 'Belső működés támogatása', roleEn: 'Support of internal operations' },
  { id: 3, name: 'Tanulmányi referens', roleHu: 'Tanulmányi ügyek segítése', roleEn: 'Academic support' }
] as const;
export const officeInfo = {
  hu: 'Az iroda hétfőtől csütörtökig 10:00–15:00 között biztosan nyitva tart, pénteken pedig előzetes egyeztetéssel érhető el.',
  en: 'The office is reliably open Monday to Thursday between 10:00 and 15:00, while Friday visits require prior arrangement.'
} as const;
export function t(lang: Lang) { return dictionary[lang]; }
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \lib\landingDictionary.ts
NAME: landingDictionary.ts
SIZE: 3741
SHA256: 686a72371bb2b7c2b9d537886bcf0d8f2bec08371556fb2bad81a1389bded882
BINARY: False
LANG: ts
CREATED_UTC: 2026-04-27T21:37:12.1086617Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9294663Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import type { Lang } from '@/types';

export const landingDictionary = {
  hu: {
    heroTitle: 'A HÖK hivatalos webes felülete nagy, hangsúlyos kezdőoldali kártyákkal',
    heroText: 'A főoldali vizuális nyitás visszaáll a korábbi erősebb kártyás arányokra. A hero rész és a modulrács együtt adja meg az első benyomás karakterét.',
    newsCta: 'Hírek',
    newsEyebrow: 'Hírek',
    newsTitle: 'Egységes admin modulra épülő hírkezelés',
    newsText: 'Az admin műveletek most már közös, újrahasználható felugró ablak komponensen keresztül működnek, amit később más oldalak is ugyanígy használhatnak.',
    search: 'Keresés hírek között',
    allCategories: 'Minden kategória',
    allSources: 'Minden forrás',
    internalNews: 'Belső HÖK hírek',
    allStatuses: 'Minden státusz',
    published: 'Publikált',
    draft: 'Piszkozat',
    scheduled: 'Ütemezett',
    archived: 'Archivált',
    saveSearch: 'Keresés mentése',
    latest: 'Legújabb',
    oldest: 'Legrégebbi',
    featured: 'Kiemelt hír',
    sourceAuthor: 'Forrás / szerző:',
    details: 'Részletek',
    openExternal: 'Külső bejegyzés megnyitása',
    editNews: 'Hír szerkesztése',
    archive: 'Archiválás',
    delete: 'Törlés',
    publish: 'Publikálás',
    adminActions: 'Admin műveletek',
    newsEditor: 'Hírszerkesztő modul',
    adapters: 'Adapterek',
    archiveScheduling: 'Archívum és ütemezés',
    categoryManagement: 'Kategóriakezelés',
    newCategory: 'Új kategória',
    add: 'Hozzáadás',
    create: 'Létrehozás',
    saveChanges: 'Módosítás mentése',
    saveDraft: 'Piszkozat mentése',
    resetForm: 'Űrlap ürítése',
    saved: 'Mentés kész',
    newsCreated: 'Az új hír létrejött.',
    changesSaved: 'Szerkesztés mentve',
    newsUpdated: 'A kiválasztott hír frissült.',
    authorLabel: 'Szerző / forrás',
    dateLabel: 'Dátum',
    close: 'Bezárás'
  },
  en: {
    heroTitle: 'The official student union website with large and prominent landing cards',
    heroText: 'The homepage visual opening returns to the earlier stronger card proportions. The hero section and module grid together define the first impression.',
    newsCta: 'News',
    newsEyebrow: 'News',
    newsTitle: 'News management built on a shared admin modal',
    newsText: 'Admin actions now work through one shared reusable modal component that can later be reused by other pages as well.',
    search: 'Search news',
    allCategories: 'All categories',
    allSources: 'All sources',
    internalNews: 'Internal HÖK news',
    allStatuses: 'All statuses',
    published: 'Published',
    draft: 'Draft',
    scheduled: 'Scheduled',
    archived: 'Archived',
    saveSearch: 'Save search',
    latest: 'Latest',
    oldest: 'Oldest',
    featured: 'Featured news',
    sourceAuthor: 'Source / author:',
    details: 'Details',
    openExternal: 'Open external post',
    editNews: 'Edit news',
    archive: 'Archive',
    delete: 'Delete',
    publish: 'Publish',
    adminActions: 'Admin actions',
    newsEditor: 'News editor',
    adapters: 'Adapters',
    archiveScheduling: 'Archive and scheduling',
    categoryManagement: 'Category management',
    newCategory: 'New category',
    add: 'Add',
    create: 'Create',
    saveChanges: 'Save changes',
    saveDraft: 'Save draft',
    resetForm: 'Reset form',
    saved: 'Saved',
    newsCreated: 'The news item was created.',
    changesSaved: 'Changes saved',
    newsUpdated: 'The selected news item has been updated.',
    authorLabel: 'Author / source',
    dateLabel: 'Date',
    close: 'Close'
  }
} as const;

export function getLandingCopy(lang: Lang) {
  return landingDictionary[lang];
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \make_weblap_snapshot_max_precision.ps1
NAME: make_weblap_snapshot_max_precision.ps1
SIZE: 4594
SHA256: 2252c09f50b90170d2160f065653f325b4e9a3beb56c3b8759668ab3c3a56a09
BINARY: False
LANG: ps1
CREATED_UTC: 2026-04-27T23:31:42.4525790Z
MODIFIED_UTC: 2026-04-27T23:35:02.5939691Z
ACCESSED_UTC: 2026-04-27T23:35:02.5939691Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
param(
  [string]$Root = (Get-Location).Path,
  [string]$Output = (Join-Path (Get-Location).Path 'weblap.md')
)

$ErrorActionPreference = 'Stop'
$ExcludeDirs = @('node_modules', '.next', 'dist', 'out', 'coverage', '.git')
$ExcludeFiles = @('weblap.md')

function Write-Stage([string]$Message) { Write-Host "[SNAPSHOT] $Message" }

function Get-RelativePath {
  param([string]$Base, [string]$Full)
  $baseFull = [System.IO.Path]::GetFullPath($Base).TrimEnd('\','/') + [System.IO.Path]::DirectorySeparatorChar
  $fullFull = [System.IO.Path]::GetFullPath($Full)
  if ($fullFull.StartsWith($baseFull, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $fullFull.Substring($baseFull.Length)
  }
  return $fullFull
}

function Get-Sha256Hex {
  param([byte[]]$Bytes)
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    return (($sha.ComputeHash($Bytes) | ForEach-Object { $_.ToString('x2') }) -join '')
  }
  finally {
    $sha.Dispose()
  }
}

function Is-BinaryFile {
  param([byte[]]$Bytes)
  $limit = [Math]::Min($Bytes.Length, 4096)
  for ($i = 0; $i -lt $limit; $i++) {
    if ($Bytes[$i] -eq 0) { return $true }
  }
  return $false
}

Write-Stage 'Scanning project root'
$rootFull = [System.IO.Path]::GetFullPath($Root)

$files = Get-ChildItem -LiteralPath $rootFull -Recurse -File -Force | Where-Object {
  $rel = Get-RelativePath -Base $rootFull -Full $_.FullName

  if ($ExcludeFiles -contains $_.Name) { return $false }

  foreach ($d in $ExcludeDirs) {
    if ($rel -match "(^|[\\/])$([regex]::Escape($d))([\\/]|$)") {
      return $false
    }
  }

  return $true
} | Sort-Object FullName

Write-Stage "Found $($files.Count) files"

$dirs = New-Object System.Collections.Generic.HashSet[string]
foreach ($f in $files) {
  $rel = (Get-RelativePath -Base $rootFull -Full $f.FullName) -replace '/', '\'
  $parts = $rel -split '\\'
  if ($parts.Count -gt 1) {
    for ($i = 0; $i -lt $parts.Count - 1; $i++) {
      [void]$dirs.Add(($parts[0..$i] -join '\'))
    }
  }
}

$dirList = @($dirs)

$out = New-Object System.Collections.Generic.List[string]
$out.Add('# WEBLAP PROJECT SNAPSHOT')
$out.Add('')
$out.Add("PROJECT_NAME: $(Split-Path -Leaf $rootFull)")
$out.Add('PROJECT_VERSION: 27.3')
$out.Add('PROJECT_TAG: snapshot')
$out.Add("ROOT: $rootFull")
$out.Add("GENERATED_UTC: $([DateTime]::UtcNow.ToString('o'))")
$out.Add("FILE_COUNT: $($files.Count)")
$out.Add('BINARY_BASE64_ENABLED: True')
$out.Add('MAX_BASE64_BYTES: 5242880')
$out.Add('')
$out.Add('## FOLDER_STRUCTURE')
$out.Add('```text')
$out.Add('.')

foreach ($d in ($dirList | Sort-Object)) {
  $out.Add('.\' + $d)
}

foreach ($f in $files) {
  $out.Add('.\' + ((Get-RelativePath -Base $rootFull -Full $f.FullName) -replace '/', '\'))
}

$out.Add('```')
$out.Add('')
$out.Add('## FILE_RECORDS')
$out.Add('')

$index = 0
foreach ($f in $files) {
  $index++
  $rel = Get-RelativePath -Base $rootFull -Full $f.FullName
  Write-Stage "Reading file $index / $($files.Count): $rel"

  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  $sha = Get-Sha256Hex -Bytes $bytes
  $binary = Is-BinaryFile -Bytes $bytes
  $mode = if ($binary -or $bytes.Length -gt 5242880) { 'base64' } else { 'text' }
  $lang = [System.IO.Path]::GetExtension($f.Name).TrimStart('.')

  $out.Add('===== BEGIN FILE RECORD =====')
  $out.Add("PATH: \$rel")
  $out.Add("NAME: $($f.Name)")
  $out.Add("SIZE: $($bytes.Length)")
  $out.Add("SHA256: $sha")
  $out.Add("BINARY: $binary")
  $out.Add("LANG: $lang")
  $out.Add("CREATED_UTC: $([DateTime]::SpecifyKind($f.CreationTimeUtc, [DateTimeKind]::Utc).ToString('o'))")
  $out.Add("MODIFIED_UTC: $([DateTime]::SpecifyKind($f.LastWriteTimeUtc, [DateTimeKind]::Utc).ToString('o'))")
  $out.Add("ACCESSED_UTC: $([DateTime]::SpecifyKind($f.LastAccessTimeUtc, [DateTimeKind]::Utc).ToString('o'))")
  $out.Add('ATTRIBUTES: Archive')
  $out.Add('')
  $out.Add("CONTENT_MODE: $mode")
  $out.Add('```')

  if ($mode -eq 'base64') {
    $out.Add([Convert]::ToBase64String($bytes, [System.Base64FormattingOptions]::InsertLineBreaks))
  }
  else {
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)
    $text = $text -replace "`r`n", "`n"
    $out.Add($text)
  }

  $out.Add('```')
  $out.Add('===== END FILE RECORD =====')
  $out.Add('')
}

Write-Stage 'Writing markdown output'
[System.IO.File]::WriteAllText($Output, ($out -join "`r`n"), [System.Text.UTF8Encoding]::new($false))
Write-Host "[SNAPSHOT] SUCCESS: Snapshot written to $Output"
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \next.config.ts
NAME: next.config.ts
SIZE: 124
SHA256: 4d29b41d1ffda75712ddecaacbaaba16c1ae494ebaaf15ba4329b5e907f09d1a
BINARY: False
LANG: ts
CREATED_UTC: 2026-04-27T21:37:12.1406691Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9353081Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
import type { NextConfig } from 'next';
const nextConfig: NextConfig = { reactStrictMode: true };
export default nextConfig;
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \next-env.d.ts
NAME: next-env.d.ts
SIZE: 80
SHA256: a4f294737995c7c5e3f3b322b62fe3fa16450eb53c3bf8545238e9ee686b7775
BINARY: False
LANG: ts
CREATED_UTC: 2026-04-27T21:37:12.1346644Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9375982Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \package.json
NAME: package.json
SIZE: 500
SHA256: 296c7279bc73a2aa9f9b3ff05a094603a44f6347148d935b4d77434d18464838
BINARY: False
LANG: json
CREATED_UTC: 2026-04-27T21:37:12.1211465Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9395985Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
{
  "name": "hok-web-v11",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.5.7",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "@types/node": "^20.17.50",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "eslint": "^9.25.1",
    "eslint-config-next": "15.5.7"
  }
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \package-lock.json
NAME: package-lock.json
SIZE: 188997
SHA256: 1c21a1c8f0694a6a3554202c047feeea2c0663d5b20ffed4129a0919b22c2b0d
BINARY: False
LANG: json
CREATED_UTC: 2026-04-27T19:02:02.3551946Z
MODIFIED_UTC: 2026-04-27T19:02:02.3673430Z
ACCESSED_UTC: 2026-04-27T22:22:36.2095376Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
{
  "name": "hok-web-v11",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "hok-web-v11",
      "version": "1.0.0",
      "dependencies": {
        "next": "15.5.7",
        "react": "19.1.0",
        "react-dom": "19.1.0"
      },
      "devDependencies": {
        "@types/node": "^20.17.50",
        "@types/react": "^19.1.2",
        "@types/react-dom": "^19.1.2",
        "eslint": "^9.25.1",
        "eslint-config-next": "15.5.7",
        "typescript": "^5.8.3"
      }
    },
    "node_modules/@emnapi/core": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.10.0.tgz",
      "integrity": "sha512-yq6OkJ4p82CAfPl0u9mQebQHKPJkY7WrIuk205cTYnYe+k2Z8YBh11FrbRG/H6ihirqcacOgl2BIO8oyMQLeXw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.1",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.10.0.tgz",
      "integrity": "sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
      "integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
      "integrity": "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.2.tgz",
      "integrity": "sha512-nJl2KGTlrf9GjLimgIru+V/mzgSK0ABCDQRvxw5BjURL7WfH5uoWmizbH7QB6MmnMBd8cIC9uceWnezL1VZWWw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.5"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.5.tgz",
      "integrity": "sha512-4IlJx0X0qftVsN5E+/vGujTRIFtwuLbNsVUe7TO6zYPDR1O6nFwvwhIKEKSrl6dZchmYBITazxKoUYOjdtjlRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.14.0",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.1",
        "minimatch": "^3.1.5",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.4.tgz",
      "integrity": "sha512-nE7DEIchvtiFTwBw4Lfbu59PG+kCofhjsKaCWzxTpt4lfRjRMqG6uMBzKXuEcyXhOHoUp9riAm7/aWYGhXZ9cw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.2.tgz",
      "integrity": "sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/types": "^0.15.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.8",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.8.tgz",
      "integrity": "sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.2",
        "@humanfs/types": "^0.15.0",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/types": {
      "version": "0.15.0",
      "resolved": "https://registry.npmjs.org/@humanfs/types/-/types-0.15.0.tgz",
      "integrity": "sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.34.5.tgz",
      "integrity": "sha512-imtQ3WMJXbMY4fxb/Ndp6HBTNVtWCUI0WdobyheGf5+ad6xX8VIDO8u2xE4qc/fr08CKG/7dDseFtn6M6g/r3w==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.34.5.tgz",
      "integrity": "sha512-YNEFAF/4KQ/PeW0N+r+aVVsoIY0/qxxikF2SWdp+NRkmMB7y9LBZAVqQ4yhGCm/H3H270OSykqmQMKLBhBJDEw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.2.4.tgz",
      "integrity": "sha512-zqjjo7RatFfFoP0MkQ51jfuFZBnVE2pRiaydKJ1G/rHZvnsrHAOcQALIi9sA5co5xenQdTugCvtb1cuf78Vf4g==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.2.4.tgz",
      "integrity": "sha512-1IOd5xfVhlGwX+zXv2N93k0yMONvUlANylbJw1eTah8K/Jtpi15KC+WSiaX/nBmbm2HxRM1gZ0nSdjSsrZbGKg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.2.4.tgz",
      "integrity": "sha512-bFI7xcKFELdiNCVov8e44Ia4u2byA+l3XtsAj+Q8tfCwO6BQ8iDojYdvoPMqsKDkuoOo+X6HZA0s0q11ANMQ8A==",
      "cpu": [
        "arm"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.2.4.tgz",
      "integrity": "sha512-excjX8DfsIcJ10x1Kzr4RcWe1edC9PquDRRPx3YVCvQv+U5p7Yin2s32ftzikXojb1PIFc/9Mt28/y+iRklkrw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.2.4.tgz",
      "integrity": "sha512-FMuvGijLDYG6lW+b/UvyilUWu5Ayu+3r2d1S8notiGCIyYU/76eig1UfMmkZ7vwgOrzKzlQbFSuQfgm7GYUPpA==",
      "cpu": [
        "ppc64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.2.4.tgz",
      "integrity": "sha512-oVDbcR4zUC0ce82teubSm+x6ETixtKZBh/qbREIOcI3cULzDyb18Sr/Wcyx7NRQeQzOiHTNbZFF1UwPS2scyGA==",
      "cpu": [
        "riscv64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.2.4.tgz",
      "integrity": "sha512-qmp9VrzgPgMoGZyPvrQHqk02uyjA0/QrTO26Tqk6l4ZV0MPWIW6LTkqOIov+J1yEu7MbFQaDpwdwJKhbJvuRxQ==",
      "cpu": [
        "s390x"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.2.4.tgz",
      "integrity": "sha512-tJxiiLsmHc9Ax1bz3oaOYBURTXGIRDODBqhveVHonrHJ9/+k89qbLl0bcJns+e4t4rvaNBxaEZsFtSfAdquPrw==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.2.4.tgz",
      "integrity": "sha512-FVQHuwx1IIuNow9QAbYUzJ+En8KcVm9Lk5+uGUQJHaZmMECZmOlix9HnH7n1TRkXMS0pGxIJokIVB9SuqZGGXw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.2.4.tgz",
      "integrity": "sha512-+LpyBk7L44ZIXwz/VYfglaX/okxezESc6UxDSoyo2Ks6Jxc4Y7sGjpgU9s4PMgqgjj1gZCylTieNamqA1MF7Dg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.34.5.tgz",
      "integrity": "sha512-9dLqsvwtg1uuXBGZKsxem9595+ujv0sJ6Vi8wcTANSFpwV/GONat5eCkzQo/1O6zRIkh0m/8+5BjrRr7jDUSZw==",
      "cpu": [
        "arm"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.34.5.tgz",
      "integrity": "sha512-bKQzaJRY/bkPOXyKx5EVup7qkaojECG6NLYswgktOZjaXecSAeCWiZwwiFf3/Y+O1HrauiE3FVsGxFg8c24rZg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.34.5.tgz",
      "integrity": "sha512-7zznwNaqW6YtsfrGGDA6BRkISKAAE1Jo0QdpNYXNMHu2+0dTrPflTLNkpc8l7MUP5M16ZJcUvysVWWrMefZquA==",
      "cpu": [
        "ppc64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.34.5.tgz",
      "integrity": "sha512-51gJuLPTKa7piYPaVs8GmByo7/U7/7TZOq+cnXJIHZKavIRHAP77e3N2HEl3dgiqdD/w0yUfiJnII77PuDDFdw==",
      "cpu": [
        "riscv64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.34.5.tgz",
      "integrity": "sha512-nQtCk0PdKfho3eC5MrbQoigJ2gd1CgddUMkabUj+rBevs8tZ2cULOx46E7oyX+04WGfABgIwmMC0VqieTiR4jg==",
      "cpu": [
        "s390x"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.34.5.tgz",
      "integrity": "sha512-MEzd8HPKxVxVenwAa+JRPwEC7QFjoPWuS5NZnBt6B3pu7EG2Ge0id1oLHZpPJdn3OQK+BQDiw9zStiHBTJQQQQ==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.34.5.tgz",
      "integrity": "sha512-fprJR6GtRsMt6Kyfq44IsChVZeGN97gTD331weR1ex1c1rypDEABN6Tm2xa1wE6lYb5DdEnk03NZPqA7Id21yg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.34.5.tgz",
      "integrity": "sha512-Jg8wNT1MUzIvhBFxViqrEhWDGzqymo3sV7z7ZsaWbZNDLXRJZoRGrjulp60YYtV4wfY8VIKcWidjojlLcWrd8Q==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.34.5.tgz",
      "integrity": "sha512-OdWTEiVkY2PHwqkbBI8frFxQQFekHaSSkUIJkwzclWZe64O1X4UlUjqqqLaPbUpMOQk6FBu/HtlGXNblIs0huw==",
      "cpu": [
        "wasm32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.7.0"
      },
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.34.5.tgz",
      "integrity": "sha512-WQ3AgWCWYSb2yt+IG8mnC6Jdk9Whs7O0gxphblsLvdhSpSTtmu69ZG1Gkb6NuvxsNACwiPV6cNSZNzt0KPsw7g==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.34.5.tgz",
      "integrity": "sha512-FV9m/7NmeCmSHDD5j4+4pNI8Cp3aW+JvLoXcTUo0IqyjSfAZJ8dIUmijx1qaJsIiU+Hosw6xM5KijAWRJCSgNg==",
      "cpu": [
        "ia32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.34.5.tgz",
      "integrity": "sha512-+29YMsqY2/9eFEiW93eqWnuLcWcufowXewwSNIT6UwZdUUCrM3oFjMWH/Z6/TMmb4hlFenmfAVbpWeup2jryCw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "0.2.12",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-0.2.12.tgz",
      "integrity": "sha512-ZVWUcfwY4E/yPitQJl481FjFo3K22D6qF0DuFH6Y/nbnE11GY5uguDxZMGXPQ8WQ0128MXQD7TnfHyK4oWoIJQ==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.4.3",
        "@emnapi/runtime": "^1.4.3",
        "@tybys/wasm-util": "^0.10.0"
      }
    },
    "node_modules/@next/env": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-15.5.7.tgz",
      "integrity": "sha512-4h6Y2NyEkIEN7Z8YxkA27pq6zTkS09bUSYC0xjd0NpwFxjnIKeZEeH591o5WECSmjpUhLn3H2QLJcDye3Uzcvg==",
      "license": "MIT"
    },
    "node_modules/@next/eslint-plugin-next": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/eslint-plugin-next/-/eslint-plugin-next-15.5.7.tgz",
      "integrity": "sha512-DtRU2N7BkGr8r+pExfuWHwMEPX5SD57FeA6pxdgCHODo+b/UgIgjE+rgWKtJAbEbGhVZ2jtHn4g3wNhWFoNBQQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-glob": "3.3.1"
      }
    },
    "node_modules/@next/swc-darwin-arm64": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-15.5.7.tgz",
      "integrity": "sha512-IZwtxCEpI91HVU/rAUOOobWSZv4P2DeTtNaCdHqLcTJU4wdNXgAySvKa/qJCgR5m6KI8UsKDXtO2B31jcaw1Yw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-darwin-x64": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-15.5.7.tgz",
      "integrity": "sha512-UP6CaDBcqaCBuiq/gfCEJw7sPEoX1aIjZHnBWN9v9qYHQdMKvCKcAVs4OX1vIjeE+tC5EIuwDTVIoXpUes29lg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-gnu": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-15.5.7.tgz",
      "integrity": "sha512-NCslw3GrNIw7OgmRBxHtdWFQYhexoUCq+0oS2ccjyYLtcn1SzGzeM54jpTFonIMUjNbHmpKpziXnpxhSWLcmBA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-musl": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-15.5.7.tgz",
      "integrity": "sha512-nfymt+SE5cvtTrG9u1wdoxBr9bVB7mtKTcj0ltRn6gkP/2Nu1zM5ei8rwP9qKQP0Y//umK+TtkKgNtfboBxRrw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-gnu": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-15.5.7.tgz",
      "integrity": "sha512-hvXcZvCaaEbCZcVzcY7E1uXN9xWZfFvkNHwbe/n4OkRhFWrs1J1QV+4U1BN06tXLdaS4DazEGXwgqnu/VMcmqw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-musl": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-15.5.7.tgz",
      "integrity": "sha512-4IUO539b8FmF0odY6/SqANJdgwn1xs1GkPO5doZugwZ3ETF6JUdckk7RGmsfSf7ws8Qb2YB5It33mvNL/0acqA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-arm64-msvc": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-15.5.7.tgz",
      "integrity": "sha512-CpJVTkYI3ZajQkC5vajM7/ApKJUOlm6uP4BknM3XKvJ7VXAvCqSjSLmM0LKdYzn6nBJVSjdclx8nYJSa3xlTgQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-x64-msvc": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-15.5.7.tgz",
      "integrity": "sha512-gMzgBX164I6DN+9/PGA+9dQiwmTkE4TloBNx8Kv9UiGARsr9Nba7IpcBRA1iTV9vwlYnrE3Uy6I7Aj6qLjQuqw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nolyfill/is-core-module": {
      "version": "1.0.39",
      "resolved": "https://registry.npmjs.org/@nolyfill/is-core-module/-/is-core-module-1.0.39.tgz",
      "integrity": "sha512-nn5ozdjYQpUCZlWGuxcJY/KpxkWQs4DcbMCmKojjyrYDEAGy4Ce19NN4v5MduafTwJlbKc99UA8YhSVqq9yPZA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.4.0"
      }
    },
    "node_modules/@rtsao/scc": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@rtsao/scc/-/scc-1.1.0.tgz",
      "integrity": "sha512-zt6OdqaDoOnJ1ZYsCYGt9YmWzDXl4vQdKTyJev62gFhRGKdx7mcT54V9KIjg+d2wi9EXsPvAPKe7i7WjfVWB8g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rushstack/eslint-patch": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/@rushstack/eslint-patch/-/eslint-patch-1.16.1.tgz",
      "integrity": "sha512-TvZbIpeKqGQQ7X0zSCvPH9riMSFQFSggnfBjFZ1mEoILW+UuXCKwOoPcgjMwiUtRqFZ8jWhPJc4um14vC6I4ag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.15",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.15.tgz",
      "integrity": "sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.8.0"
      }
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.1.tgz",
      "integrity": "sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json5": {
      "version": "0.0.29",
      "resolved": "https://registry.npmjs.org/@types/json5/-/json5-0.0.29.tgz",
      "integrity": "sha512-dRLjCWHYg4oaA77cxO64oO+7JwCwnIzkZPdrrC71jQmQtlhM556pwKo5bUzqvZndkVbeFLIIi+9TC40JNF5hNQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "20.19.39",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.39.tgz",
      "integrity": "sha512-orrrD74MBUyK8jOAD/r0+lfa1I2MO6I+vAkmAWzMYbCcgrN4lCrmK52gRFQq/JRxfYPfonkr4b0jcY7Olqdqbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.14",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.14.tgz",
      "integrity": "sha512-ilcTH/UniCkMdtexkoCN0bI7pMcJDvmQFPvuPvmEaYA/NSfFTAgdUSLAoVjaRJm7+6PvcM+q1zYOwS4wTYMF9w==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.59.1.tgz",
      "integrity": "sha512-BOziFIfE+6osHO9FoJG4zjoHUcvI7fTNBSpdAwrNH0/TLvzjsk2oo8XSSOT2HhqUyhZPfHv4UOffoJ9oEEQ7Ag==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.12.2",
        "@typescript-eslint/scope-manager": "8.59.1",
        "@typescript-eslint/type-utils": "8.59.1",
        "@typescript-eslint/utils": "8.59.1",
        "@typescript-eslint/visitor-keys": "8.59.1",
        "ignore": "^7.0.5",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.59.1",
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz",
      "integrity": "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.59.1.tgz",
      "integrity": "sha512-HDQH9O/47Dxi1ceDhBXdaldtf/WV9yRYMjbjCuNk3qnaTD564qwv61Y7+gTxwxRKzSrgO5uhtw584igXVuuZkA==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.59.1",
        "@typescript-eslint/types": "8.59.1",
        "@typescript-eslint/typescript-estree": "8.59.1",
        "@typescript-eslint/visitor-keys": "8.59.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.59.1.tgz",
      "integrity": "sha512-+MuHQlHiEr00Of/IQbE/MmEoi44znZHbR/Pz7Opq4HryUOlRi+/44dro9Ycy8Fyo+/024IWtw8m4JUMCGTYxDg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.59.1",
        "@typescript-eslint/types": "^8.59.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.59.1.tgz",
      "integrity": "sha512-LwuHQI4pDOYVKvmH2dkaJo6YZCSgouVgnS/z7yBPKBMvgtBvyLqiLy9Z6b7+m/TRcX1NFYUqZetI5Y+aT4GEfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.59.1",
        "@typescript-eslint/visitor-keys": "8.59.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.59.1.tgz",
      "integrity": "sha512-/0nEyPbX7gRsk0Uwfe4ALwwgxuA66d/l2mhRDNlAvaj4U3juhUtJNq0DsY8M2AYwwb9rEq2hrC3IcIcEt++iJA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.59.1.tgz",
      "integrity": "sha512-klWPBR2ciQHS3f++ug/mVnWKPjBUo7icEL3FAO1lhAR1Z1i5NQYZ1EannMSRYcq5qCv5wNALlXr6fksRHyYl7w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.59.1",
        "@typescript-eslint/typescript-estree": "8.59.1",
        "@typescript-eslint/utils": "8.59.1",
        "debug": "^4.4.3",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.59.1.tgz",
      "integrity": "sha512-ZDCjgccSdYPw5Bxh+my4Z0lJU96ZDN7jbBzvmEn0FZx3RtU1C7VWl6NbDx94bwY3V5YsgwRzJPOgeY2Q/nLG8A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.59.1.tgz",
      "integrity": "sha512-OUd+vJS05sSkOip+BkZ/2NS8RMxrAAJemsC6vU3kmfLyeaJT0TftHkV9mcx2107MmsBVXXexhVu4F0TZXyMl4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.59.1",
        "@typescript-eslint/tsconfig-utils": "8.59.1",
        "@typescript-eslint/types": "8.59.1",
        "@typescript-eslint/visitor-keys": "8.59.1",
        "debug": "^4.4.3",
        "minimatch": "^10.2.2",
        "semver": "^7.7.3",
        "tinyglobby": "^0.2.15",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion": {
      "version": "5.0.5",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.5.tgz",
      "integrity": "sha512-VZznLgtwhn+Mact9tfiwx64fA9erHH/MCXEUfB/0bX/6Fz6ny5EGTXYltMocqg4xFAQZtnO3DHWWXi8RiuN7cQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch": {
      "version": "10.2.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.5.tgz",
      "integrity": "sha512-MULkVLfKGYDFYejP07QOurDLLQpcjk7Fw+7jXS2R2czRQzR56yHRveU5NDJEOviH+hETZKSkIk5c+T23GjFUMg==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.5"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.59.1.tgz",
      "integrity": "sha512-3pIeoXhCeYH9FSCBI8P3iNwJlGuzPlYKkTlen2O9T1DSeeg8UG8jstq6BLk+Mda0qup7mgk4z4XL4OzRaxZ8LA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.9.1",
        "@typescript-eslint/scope-manager": "8.59.1",
        "@typescript-eslint/types": "8.59.1",
        "@typescript-eslint/typescript-estree": "8.59.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.59.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.59.1.tgz",
      "integrity": "sha512-LdDNl6C5iJExcM0Yh0PwAIBb9PrSiCsWamF/JyEZawm3kFDnRoaq3LGE4bpyRao/fWeGKKyw7icx0YxrLFC5Cg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.59.1",
        "eslint-visitor-keys": "^5.0.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@unrs/resolver-binding-android-arm-eabi": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm-eabi/-/resolver-binding-android-arm-eabi-1.11.1.tgz",
      "integrity": "sha512-ppLRUgHVaGRWUx0R0Ut06Mjo9gBaBkg3v/8AxusGLhsIotbBLuRk51rAzqLC8gq6NyyAojEXglNjzf6R948DNw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-android-arm64": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm64/-/resolver-binding-android-arm64-1.11.1.tgz",
      "integrity": "sha512-lCxkVtb4wp1v+EoN+HjIG9cIIzPkX5OtM03pQYkG+U5O/wL53LC4QbIeazgiKqluGeVEeBlZahHalCaBvU1a2g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-arm64": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-arm64/-/resolver-binding-darwin-arm64-1.11.1.tgz",
      "integrity": "sha512-gPVA1UjRu1Y/IsB/dQEsp2V1pm44Of6+LWvbLc9SDk1c2KhhDRDBUkQCYVWe6f26uJb3fOK8saWMgtX8IrMk3g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-x64": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-x64/-/resolver-binding-darwin-x64-1.11.1.tgz",
      "integrity": "sha512-cFzP7rWKd3lZaCsDze07QX1SC24lO8mPty9vdP+YVa3MGdVgPmFc59317b2ioXtgCMKGiCLxJ4HQs62oz6GfRQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-freebsd-x64": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-freebsd-x64/-/resolver-binding-freebsd-x64-1.11.1.tgz",
      "integrity": "sha512-fqtGgak3zX4DCB6PFpsH5+Kmt/8CIi4Bry4rb1ho6Av2QHTREM+47y282Uqiu3ZRF5IQioJQ5qWRV6jduA+iGw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-gnueabihf": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-gnueabihf/-/resolver-binding-linux-arm-gnueabihf-1.11.1.tgz",
      "integrity": "sha512-u92mvlcYtp9MRKmP+ZvMmtPN34+/3lMHlyMj7wXJDeXxuM0Vgzz0+PPJNsro1m3IZPYChIkn944wW8TYgGKFHw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-musleabihf": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-musleabihf/-/resolver-binding-linux-arm-musleabihf-1.11.1.tgz",
      "integrity": "sha512-cINaoY2z7LVCrfHkIcmvj7osTOtm6VVT16b5oQdS4beibX2SYBwgYLmqhBjA1t51CarSaBuX5YNsWLjsqfW5Cw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-gnu/-/resolver-binding-linux-arm64-gnu-1.11.1.tgz",
      "integrity": "sha512-34gw7PjDGB9JgePJEmhEqBhWvCiiWCuXsL9hYphDF7crW7UgI05gyBAi6MF58uGcMOiOqSJ2ybEeCvHcq0BCmQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-musl": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-musl/-/resolver-binding-linux-arm64-musl-1.11.1.tgz",
      "integrity": "sha512-RyMIx6Uf53hhOtJDIamSbTskA99sPHS96wxVE/bJtePJJtpdKGXO1wY90oRdXuYOGOTuqjT8ACccMc4K6QmT3w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-ppc64-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-ppc64-gnu/-/resolver-binding-linux-ppc64-gnu-1.11.1.tgz",
      "integrity": "sha512-D8Vae74A4/a+mZH0FbOkFJL9DSK2R6TFPC9M+jCWYia/q2einCubX10pecpDiTmkJVUH+y8K3BZClycD8nCShA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-gnu/-/resolver-binding-linux-riscv64-gnu-1.11.1.tgz",
      "integrity": "sha512-frxL4OrzOWVVsOc96+V3aqTIQl1O2TjgExV4EKgRY09AJ9leZpEg8Ak9phadbuX0BA4k8U5qtvMSQQGGmaJqcQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-musl": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-musl/-/resolver-binding-linux-riscv64-musl-1.11.1.tgz",
      "integrity": "sha512-mJ5vuDaIZ+l/acv01sHoXfpnyrNKOk/3aDoEdLO/Xtn9HuZlDD6jKxHlkN8ZhWyLJsRBxfv9GYM2utQ1SChKew==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-s390x-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-s390x-gnu/-/resolver-binding-linux-s390x-gnu-1.11.1.tgz",
      "integrity": "sha512-kELo8ebBVtb9sA7rMe1Cph4QHreByhaZ2QEADd9NzIQsYNQpt9UkM9iqr2lhGr5afh885d/cB5QeTXSbZHTYPg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-gnu/-/resolver-binding-linux-x64-gnu-1.11.1.tgz",
      "integrity": "sha512-C3ZAHugKgovV5YvAMsxhq0gtXuwESUKc5MhEtjBpLoHPLYM+iuwSj3lflFwK3DPm68660rZ7G8BMcwSro7hD5w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-musl": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-musl/-/resolver-binding-linux-x64-musl-1.11.1.tgz",
      "integrity": "sha512-rV0YSoyhK2nZ4vEswT/QwqzqQXw5I6CjoaYMOX0TqBlWhojUf8P94mvI7nuJTeaCkkds3QE4+zS8Ko+GdXuZtA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-wasm32-wasi": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-wasm32-wasi/-/resolver-binding-wasm32-wasi-1.11.1.tgz",
      "integrity": "sha512-5u4RkfxJm+Ng7IWgkzi3qrFOvLvQYnPBmjmZQ8+szTK/b31fQCnleNl1GgEt7nIsZRIf5PLhPwT0WM+q45x/UQ==",
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@napi-rs/wasm-runtime": "^0.2.11"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@unrs/resolver-binding-win32-arm64-msvc": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-arm64-msvc/-/resolver-binding-win32-arm64-msvc-1.11.1.tgz",
      "integrity": "sha512-nRcz5Il4ln0kMhfL8S3hLkxI85BXs3o8EYoattsJNdsX4YUU89iOkVn7g0VHSRxFuVMdM4Q1jEpIId1Ihim/Uw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-ia32-msvc": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-ia32-msvc/-/resolver-binding-win32-ia32-msvc-1.11.1.tgz",
      "integrity": "sha512-DCEI6t5i1NmAZp6pFonpD5m7i6aFrpofcp4LA2i8IIq60Jyo28hamKBxNrZcyOwVOZkgsRp9O2sXWBWP8MnvIQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-x64-msvc": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-x64-msvc/-/resolver-binding-win32-x64-msvc-1.11.1.tgz",
      "integrity": "sha512-lrW200hZdbfRtztbygyaq/6jP6AKE8qQN2KvPcJ+x7wiD038YtnYtZ82IMNJ69GJibV7bwL3y9FgK+5w/pYt6g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/acorn": {
      "version": "8.16.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.16.0.tgz",
      "integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/aria-query": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-5.3.2.tgz",
      "integrity": "sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/array-buffer-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-buffer-byte-length/-/array-buffer-byte-length-1.0.2.tgz",
      "integrity": "sha512-LHE+8BuR7RYGDKvnrmcuSq3tDcKv9OFEXQt/HpbZhY7V6h0zlUXutnAD82GiFx9rdieCMjkvtcsPqBwgUl1Iiw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "is-array-buffer": "^3.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array-includes": {
      "version": "3.1.9",
      "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.1.9.tgz",
      "integrity": "sha512-FmeCCAenzH0KH381SPT5FZmiA/TmpndpcaShhfgEN9eCVjnFBqq3l1xrI42y8+PPLI6hypzou4GXw00WHmPBLQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.0",
        "es-object-atoms": "^1.1.1",
        "get-intrinsic": "^1.3.0",
        "is-string": "^1.1.1",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlast": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/array.prototype.findlast/-/array.prototype.findlast-1.2.5.tgz",
      "integrity": "sha512-CVvd6FHg1Z3POpBLxO6E6zr+rSKEQ9L6rZHAaY7lLfhKsWYUBBOuMs0e9o24oopj6H+geRCX0YJ+TJLBK2eHyQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlastindex": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/array.prototype.findlastindex/-/array.prototype.findlastindex-1.2.6.tgz",
      "integrity": "sha512-F/TKATkzseUExPlfvmwQKGITM3DGTK+vkAsCZoDc5daVygbJBnjEUCbgkAvVFsgfXfX4YIqZ/27G3k3tdXrTxQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-shim-unscopables": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flat": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flat/-/array.prototype.flat-1.3.3.tgz",
      "integrity": "sha512-rwG/ja1neyLqCuGZ5YYrznA62D4mZXg0i1cIskIUKSiqF3Cje9/wXAls9B9s1Wa2fomMsIv8czB8jZcPmxCXFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flatmap": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flatmap/-/array.prototype.flatmap-1.3.3.tgz",
      "integrity": "sha512-Y7Wt51eKJSyi80hFrJCePGGNo5ktJCslFuboqJsbf57CCPcm5zztluPlc4/aD8sWsKvlwatezpV4U1efk8kpjg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.tosorted": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/array.prototype.tosorted/-/array.prototype.tosorted-1.1.4.tgz",
      "integrity": "sha512-p6Fx8B7b7ZhL/gmUsAy0D15WhvDccw3mnGNbZpi3pmeJdxtWsj2jEaI4Y6oo3XiHfzuSgPwKc04MYt6KgvC/wA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3",
        "es-errors": "^1.3.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/arraybuffer.prototype.slice": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/arraybuffer.prototype.slice/-/arraybuffer.prototype.slice-1.0.4.tgz",
      "integrity": "sha512-BNoCY6SXXPQ7gF2opIP4GBE+Xw7U+pHMYKuzjgCN3GwiaIR09UUeKfheyIry77QtrCBlC0KK0q5/TER/tYh3PQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.1",
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "is-array-buffer": "^3.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/ast-types-flow": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/ast-types-flow/-/ast-types-flow-0.0.8.tgz",
      "integrity": "sha512-OH/2E5Fg20h2aPrbe+QL8JZQFko0YZaF+j4mnQ7BGhfavO7OpSLa8a0y9sBwomHdSbkhTS8TQNayBfnW5DwbvQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/async-function": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/async-function/-/async-function-1.0.0.tgz",
      "integrity": "sha512-hsU18Ae8CDTR6Kgu9DYf0EbCr/a5iGL0rytQDobUcdpYOKokk8LEjVphnXkDkgpi0wYVsqrXuP0bZxJaTqdgoA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/available-typed-arrays": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.7.tgz",
      "integrity": "sha512-wvUjBtSGN7+7SjNpq/9M2Tg350UZD3q62IFZLbRAR1bSMlCo1ZaeW+BJ+D090e4hIIZLBcTDWe4Mh4jvUDajzQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "possible-typed-array-names": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/axe-core": {
      "version": "4.11.3",
      "resolved": "https://registry.npmjs.org/axe-core/-/axe-core-4.11.3.tgz",
      "integrity": "sha512-zBQouZixDTbo3jMGqHKyePxYxr1e5W8UdTmBQ7sNtaA9M2bE32daxxPLS/jojhKOHxQ7LWwPjfiwf/fhaJWzlg==",
      "dev": true,
      "license": "MPL-2.0",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/axobject-query": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-4.1.0.tgz",
      "integrity": "sha512-qIj0G9wZbMGNLjLmg1PT6v2mE9AH2zlnADJD/2tC6E00hgmhUOfEB6greHPAfLRSufHqROIUTkw6E+M3lH0PTQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/brace-expansion": {
      "version": "1.1.14",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.14.tgz",
      "integrity": "sha512-MWPGfDxnyzKU7rNOW9SP/c50vi3xrmrua/+6hfPbCS2ABNWfx24vPidzvC7krjU/RTo235sV776ymlsMtGKj8g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/call-bind": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.9.tgz",
      "integrity": "sha512-a/hy+pNsFUTR+Iz8TCJvXudKVLAnz/DyeSUo10I5yvFDQJBFU2s9uqQpoSrJlroHUKoKqzg+epxyP9lqFdzfBQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "get-intrinsic": "^1.3.0",
        "set-function-length": "^1.2.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001791",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001791.tgz",
      "integrity": "sha512-yk0l/YSrOnFZk3UROpDLQD9+kC1l4meK/wed583AXrzoarMGJcbRi2Q4RaUYbKxYAsZ8sWmaSa/DsLmdBeI1vQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/client-only": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==",
      "license": "MIT"
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/damerau-levenshtein": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.8.tgz",
      "integrity": "sha512-sdQSFB7+llfUcQHUQO3+B8ERRj0Oa4w9POWMI/puGtuf7gFywGmkaLCElnudfTiKZV+NvHqL0ifzdrI8Ro7ESA==",
      "dev": true,
      "license": "BSD-2-Clause"
    },
    "node_modules/data-view-buffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-buffer/-/data-view-buffer-1.0.2.tgz",
      "integrity": "sha512-EmKO5V3OLXh1rtK2wgXRansaK1/mtVdTUEiEI0W8RkvgT05kfxaH29PliLnpLP73yYO6142Q72QNa8Wx/A5CqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/data-view-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-byte-length/-/data-view-byte-length-1.0.2.tgz",
      "integrity": "sha512-tuhGbE6CfTM9+5ANGf+oQb72Ky/0+s3xKUpHvShfiz2RxMFgFPjsXuRLBVMtvMs15awe45SRb83D6wH4ew6wlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/inspect-js"
      }
    },
    "node_modules/data-view-byte-offset": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/data-view-byte-offset/-/data-view-byte-offset-1.0.1.tgz",
      "integrity": "sha512-BS8PfmtDGnrgYdOonGZQdLZslWIeCGFP9tpan0hi1Co2Zr2NKADsvGYA8XxuG/4UWgJ6Cjtv+YJnB6MM69QGlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/define-data-property": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/define-data-property/-/define-data-property-1.1.4.tgz",
      "integrity": "sha512-rBMvIzlpA8v6E+SJZoo++HAYqsLrkg7MSfIinMPFhmkorw7X+dOXVJQs+QT69zGkzMyfDnIMN2Wid1+NbL3T+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0",
        "es-errors": "^1.3.0",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/define-properties": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.1.tgz",
      "integrity": "sha512-8QmQKqEASLd5nx0U1B1okLElbUuuttJ/AnYmRXbbbGDWh6uS208EjD4Xqq/I9wK7u0v6O08XhTWnt5XtEbR6Dg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.0.1",
        "has-property-descriptors": "^1.0.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "esutils": "^2.0.2"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/es-abstract": {
      "version": "1.24.2",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.24.2.tgz",
      "integrity": "sha512-2FpH9Q5i2RRwyEP1AylXe6nYLR5OhaJTZwmlcP0dL/+JCbgg7yyEo/sEK6HeGZRf3dFpWwThaRHVApXSkW3xeg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.2",
        "arraybuffer.prototype.slice": "^1.0.4",
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "data-view-buffer": "^1.0.2",
        "data-view-byte-length": "^1.0.2",
        "data-view-byte-offset": "^1.0.1",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-set-tostringtag": "^2.1.0",
        "es-to-primitive": "^1.3.0",
        "function.prototype.name": "^1.1.8",
        "get-intrinsic": "^1.3.0",
        "get-proto": "^1.0.1",
        "get-symbol-description": "^1.1.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "internal-slot": "^1.1.0",
        "is-array-buffer": "^3.0.5",
        "is-callable": "^1.2.7",
        "is-data-view": "^1.0.2",
        "is-negative-zero": "^2.0.3",
        "is-regex": "^1.2.1",
        "is-set": "^2.0.3",
        "is-shared-array-buffer": "^1.0.4",
        "is-string": "^1.1.1",
        "is-typed-array": "^1.1.15",
        "is-weakref": "^1.1.1",
        "math-intrinsics": "^1.1.0",
        "object-inspect": "^1.13.4",
        "object-keys": "^1.1.1",
        "object.assign": "^4.1.7",
        "own-keys": "^1.0.1",
        "regexp.prototype.flags": "^1.5.4",
        "safe-array-concat": "^1.1.3",
        "safe-push-apply": "^1.0.0",
        "safe-regex-test": "^1.1.0",
        "set-proto": "^1.0.0",
        "stop-iteration-iterator": "^1.1.0",
        "string.prototype.trim": "^1.2.10",
        "string.prototype.trimend": "^1.0.9",
        "string.prototype.trimstart": "^1.0.8",
        "typed-array-buffer": "^1.0.3",
        "typed-array-byte-length": "^1.0.3",
        "typed-array-byte-offset": "^1.0.4",
        "typed-array-length": "^1.0.7",
        "unbox-primitive": "^1.1.0",
        "which-typed-array": "^1.1.19"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-iterator-helpers": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/es-iterator-helpers/-/es-iterator-helpers-1.3.2.tgz",
      "integrity": "sha512-HVLACW1TppGYjJ8H6/jqH/pqOtKRw6wMlrB23xfExmFWxFquAIWCmwoLsOyN96K4a5KbmOf5At9ZUO3GZbetAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-errors": "^1.3.0",
        "es-set-tostringtag": "^2.1.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.3.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "iterator.prototype": "^1.1.5",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-shim-unscopables": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/es-shim-unscopables/-/es-shim-unscopables-1.1.0.tgz",
      "integrity": "sha512-d9T8ucsEhh8Bi1woXCf+TIKDIROLG5WCkxg8geBCbvk22kzwC5G2OnXVMO6FUsvQlgUUXQ2itephWDLqDzbeCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-to-primitive": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.3.0.tgz",
      "integrity": "sha512-w+5mJ3GuFL+NjVtJlvydShqE1eN3h3PbI7/5LAsYJP/2qtuMXjfL2LpHSRqo4b4eSF5K/DH1JXKUAHSB2UW50g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-callable": "^1.2.7",
        "is-date-object": "^1.0.5",
        "is-symbol": "^1.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.4.tgz",
      "integrity": "sha512-XoMjdBOwe/esVgEvLmNsD3IRHkm7fbKIUGvrleloJXUZgDHig2IPWNniv+GwjyJXzuNqVjlr5+4yVUZjycJwfQ==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.2",
        "@eslint/config-helpers": "^0.4.2",
        "@eslint/core": "^0.17.0",
        "@eslint/eslintrc": "^3.3.5",
        "@eslint/js": "9.39.4",
        "@eslint/plugin-kit": "^0.4.1",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-config-next": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/eslint-config-next/-/eslint-config-next-15.5.7.tgz",
      "integrity": "sha512-nU/TRGHHeG81NeLW5DeQT5t6BDUqbpsNQTvef1ld/tqHT+/zTx60/TIhKnmPISTTe++DVo+DLxDmk4rnwHaZVw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@next/eslint-plugin-next": "15.5.7",
        "@rushstack/eslint-patch": "^1.10.3",
        "@typescript-eslint/eslint-plugin": "^5.4.2 || ^6.0.0 || ^7.0.0 || ^8.0.0",
        "@typescript-eslint/parser": "^5.4.2 || ^6.0.0 || ^7.0.0 || ^8.0.0",
        "eslint-import-resolver-node": "^0.3.6",
        "eslint-import-resolver-typescript": "^3.5.2",
        "eslint-plugin-import": "^2.31.0",
        "eslint-plugin-jsx-a11y": "^6.10.0",
        "eslint-plugin-react": "^7.37.0",
        "eslint-plugin-react-hooks": "^5.0.0"
      },
      "peerDependencies": {
        "eslint": "^7.23.0 || ^8.0.0 || ^9.0.0",
        "typescript": ">=3.3.1"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-import-resolver-node": {
      "version": "0.3.10",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.10.tgz",
      "integrity": "sha512-tRrKqFyCaKict5hOd244sL6EQFNycnMQnBe+j8uqGNXYzsImGbGUU4ibtoaBmv5FLwJwcFJNeg1GeVjQfbMrDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7",
        "is-core-module": "^2.16.1",
        "resolve": "^2.0.0-next.6"
      }
    },
    "node_modules/eslint-import-resolver-node/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-import-resolver-typescript": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-typescript/-/eslint-import-resolver-typescript-3.10.1.tgz",
      "integrity": "sha512-A1rHYb06zjMGAxdLSkN2fXPBwuSaQ0iO5M/hdyS0Ajj1VBaRp0sPD3dn1FhME3c/JluGFbwSxyCfqdSbtQLAHQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@nolyfill/is-core-module": "1.0.39",
        "debug": "^4.4.0",
        "get-tsconfig": "^4.10.0",
        "is-bun-module": "^2.0.0",
        "stable-hash": "^0.0.5",
        "tinyglobby": "^0.2.13",
        "unrs-resolver": "^1.6.2"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint-import-resolver-typescript"
      },
      "peerDependencies": {
        "eslint": "*",
        "eslint-plugin-import": "*",
        "eslint-plugin-import-x": "*"
      },
      "peerDependenciesMeta": {
        "eslint-plugin-import": {
          "optional": true
        },
        "eslint-plugin-import-x": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils": {
      "version": "2.12.1",
      "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.12.1.tgz",
      "integrity": "sha512-L8jSWTze7K2mTg0vos/RuLRS5soomksDPoJLXIslC7c8Wmut3bx7CPpJijDcBZtxQ5lrbUdM+s0OlNbz0DCDNw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependenciesMeta": {
        "eslint": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-import": {
      "version": "2.32.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.32.0.tgz",
      "integrity": "sha512-whOE1HFo/qJDyX4SnXzP4N6zOWn79WhnCUY/iDR0mPfQZO8wcYE4JClzI2oZrhBnnMUCBCHZhO6VQyoBU95mZA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rtsao/scc": "^1.1.0",
        "array-includes": "^3.1.9",
        "array.prototype.findlastindex": "^1.2.6",
        "array.prototype.flat": "^1.3.3",
        "array.prototype.flatmap": "^1.3.3",
        "debug": "^3.2.7",
        "doctrine": "^2.1.0",
        "eslint-import-resolver-node": "^0.3.9",
        "eslint-module-utils": "^2.12.1",
        "hasown": "^2.0.2",
        "is-core-module": "^2.16.1",
        "is-glob": "^4.0.3",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "object.groupby": "^1.0.3",
        "object.values": "^1.2.1",
        "semver": "^6.3.1",
        "string.prototype.trimend": "^1.0.9",
        "tsconfig-paths": "^3.15.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^2 || ^3 || ^4 || ^5 || ^6 || ^7.2.0 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/eslint-plugin-jsx-a11y": {
      "version": "6.10.2",
      "resolved": "https://registry.npmjs.org/eslint-plugin-jsx-a11y/-/eslint-plugin-jsx-a11y-6.10.2.tgz",
      "integrity": "sha512-scB3nz4WmG75pV8+3eRUQOHZlNSUhFNq37xnpgRkCCELU3XMvXAxLk1eqWWyE22Ki4Q01Fnsw9BA3cJHDPgn2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "aria-query": "^5.3.2",
        "array-includes": "^3.1.8",
        "array.prototype.flatmap": "^1.3.2",
        "ast-types-flow": "^0.0.8",
        "axe-core": "^4.10.0",
        "axobject-query": "^4.1.0",
        "damerau-levenshtein": "^1.0.8",
        "emoji-regex": "^9.2.2",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^3.3.5",
        "language-tags": "^1.0.9",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "safe-regex-test": "^1.0.3",
        "string.prototype.includes": "^2.0.1"
      },
      "engines": {
        "node": ">=4.0"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-react": {
      "version": "7.37.5",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.37.5.tgz",
      "integrity": "sha512-Qteup0SqU15kdocexFNAJMvCJEfa2xUKNV4CC1xsVMrIIqEy3SQ/rqyxCWNzfrd3/ldy6HMlD2e0JDVpDg2qIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.8",
        "array.prototype.findlast": "^1.2.5",
        "array.prototype.flatmap": "^1.3.3",
        "array.prototype.tosorted": "^1.1.4",
        "doctrine": "^2.1.0",
        "es-iterator-helpers": "^1.2.1",
        "estraverse": "^5.3.0",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^2.4.1 || ^3.0.0",
        "minimatch": "^3.1.2",
        "object.entries": "^1.1.9",
        "object.fromentries": "^2.0.8",
        "object.values": "^1.2.1",
        "prop-types": "^15.8.1",
        "resolve": "^2.0.0-next.5",
        "semver": "^6.3.1",
        "string.prototype.matchall": "^4.0.12",
        "string.prototype.repeat": "^1.0.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9.7"
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-5.2.0.tgz",
      "integrity": "sha512-+f15FfK64YQwZdJNELETdn5ibXEUQmW1DZL6KXhNnc2heoy/sg9VJJeT7n8TlMWouzWqSWavFkIhHyIbIAEapg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.1.tgz",
      "integrity": "sha512-kNFPyjhh5cKjrUltxs+wFx+ZkbRaxxmZ+X0ZU31SOsxCEtP9VPgtq2teZw1DebupL5GmDaNQ6yKMMVcM41iqDg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.4"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fastq": {
      "version": "1.20.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.1.tgz",
      "integrity": "sha512-GGToxJ/w1x32s/D2EKND7kTil4n8OVk/9mycTc4VDza13lOvpUZTGX3mFSCtV9ksdGBVzvsyAVLM6mHFThxXxw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.2.tgz",
      "integrity": "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/for-each": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.5.tgz",
      "integrity": "sha512-dKx12eRCVIzqCxFGplyFKJMPvLEWgmNtUrpTiJIR5u97zEhRG8ySrtboPHZXx7daLxQVrl643cTzbab2tkQjxg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-callable": "^1.2.7"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/function.prototype.name": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/function.prototype.name/-/function.prototype.name-1.1.8.tgz",
      "integrity": "sha512-e5iwyodOHhbMr/yNrc7fDYG4qlbIvI5gajyzPnb5TCwyhjApznQh1BMFou9b30SevY43gCJKXycoCBjMbsuW0Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "functions-have-names": "^1.2.3",
        "hasown": "^2.0.2",
        "is-callable": "^1.2.7"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/functions-have-names": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/functions-have-names/-/functions-have-names-1.2.3.tgz",
      "integrity": "sha512-xckBUXyTIqT97tq2x2AMb+g163b5JFysYk0x4qxNFwbfQkmNZoiRHb6sPzI9/QV33WeuvVYBUIiD4NzNIyqaRQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/generator-function": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/generator-function/-/generator-function-2.0.1.tgz",
      "integrity": "sha512-SFdFmIJi+ybC0vjlHN0ZGVGHc3lgE0DxPAT0djjVg+kjOnSqclqmj0KQ7ykTOLP6YxoqOvuAODGdcHJn+43q3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-symbol-description": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/get-symbol-description/-/get-symbol-description-1.1.0.tgz",
      "integrity": "sha512-w9UMqWwJxHNOvoNzSJ2oPF5wvYcvP7jUvYzhp67yEhTi17ZDBBC1z9pTdGuzjD+EFIqLSYRweZjqfiPzQ06Ebg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-tsconfig": {
      "version": "4.14.0",
      "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.14.0.tgz",
      "integrity": "sha512-yTb+8DXzDREzgvYmh6s9vHsSVCHeC0G3PI5bEXNBHtmshPnO+S5O7qgLEOn0I5QvMy6kpZN8K1NKGyilLb93wA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "resolve-pkg-maps": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/privatenumber/get-tsconfig?sponsor=1"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/globalthis": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/globalthis/-/globalthis-1.0.4.tgz",
      "integrity": "sha512-DpLKbNU4WylpxJykQujfCcwYWiV/Jhm50Goo0wrVILAv5jOr9d+H+UR3PhSCD2rCCEIg0uc+G+muBTwD54JhDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.2.1",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-bigints": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-bigints/-/has-bigints-1.1.0.tgz",
      "integrity": "sha512-R3pbpkcIqv2Pm3dUwgjclDRVmWpTJW2DcMzcIhEXEx1oh/CEMObMm3KLmRJOdvhM7o4uQBnwr8pzRK2sJWIqfg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-property-descriptors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-property-descriptors/-/has-property-descriptors-1.0.2.tgz",
      "integrity": "sha512-55JNKuIW+vq4Ke1BjOTjM2YctQIvCT7GFzHwmfZPGo5wnrgkid0YQtnAleFSqumZm4az3n2BS+erby5ipJdgrg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-proto": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/has-proto/-/has-proto-1.2.0.tgz",
      "integrity": "sha512-KIL7eQPfHQRC8+XluaIw7BHUwwqL19bQn4hzNgdr+1wXoU0KKj6rufu47lhY7KbJR2C6T6+PfyN0Ea7wkSS+qQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.3.tgz",
      "integrity": "sha512-ej4AhfhfL2Q2zpMmLo7U1Uv9+PyhIZpgQLGT1F9miIGmiCJIoCgSmczFdrc97mWT4kVY72KA+WnnhJ5pghSvSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/internal-slot": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/internal-slot/-/internal-slot-1.1.0.tgz",
      "integrity": "sha512-4gd7VpWNQNB4UKKCFFVcp1AVv+FMOgs9NKzjHKusc8jTMhd5eL1NqQqOpE0KzMds804/yHlglp3uxgluOqAPLw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "hasown": "^2.0.2",
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/is-array-buffer": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/is-array-buffer/-/is-array-buffer-3.0.5.tgz",
      "integrity": "sha512-DDfANUiiG2wC1qawP66qlTugJeL5HyzMpfr8lLK+jMQirGzNod0B12cFB/9q838Ru27sBwfw78/rdoU7RERz6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-async-function": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-async-function/-/is-async-function-2.1.1.tgz",
      "integrity": "sha512-9dgM/cZBnNvjzaMYHVoxxfPj2QXt22Ev7SuuPrs+xav0ukGB0S6d4ydZdEiM48kLx5kDV+QBPrpVnFyefL8kkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "async-function": "^1.0.0",
        "call-bound": "^1.0.3",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bigint": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-bigint/-/is-bigint-1.1.0.tgz",
      "integrity": "sha512-n4ZT37wG78iz03xPRKJrHTdZbe3IicyucEtdRsV5yglwc3GyUfbAfpSeD0FJ41NbUNSt5wbhqfp1fS+BgnvDFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-bigints": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-boolean-object": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/is-boolean-object/-/is-boolean-object-1.2.2.tgz",
      "integrity": "sha512-wa56o2/ElJMYqjCjGkXri7it5FbebW5usLw/nPmCMs5DeZ7eziSYZhSmPRn0txqeW4LnAmQQU7FgqLpsEFKM4A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bun-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-bun-module/-/is-bun-module-2.0.0.tgz",
      "integrity": "sha512-gNCGbnnnnFAUGKeZ9PdbyeGYJqewpmc2aKHUEMO5nQPWU9lOmv7jcmQIv+qHD8fXW6W7qfuCwX4rY9LNRjXrkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "semver": "^7.7.1"
      }
    },
    "node_modules/is-callable": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.7.tgz",
      "integrity": "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-data-view": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-data-view/-/is-data-view-1.0.2.tgz",
      "integrity": "sha512-RKtWF8pGmS87i2D6gqQu/l7EYRlVdfzemCJN/P3UOs//x1QE7mfhvzHIApBTRf7axvT6DMGwSwBXYCT0nfB9xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "get-intrinsic": "^1.2.6",
        "is-typed-array": "^1.1.13"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-date-object": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.1.0.tgz",
      "integrity": "sha512-PwwhEakHVKTdRNVOw+/Gyh0+MzlCl4R6qKvkhuvLtPMggI1WAHt9sOwZxQLSGpUaDnrdyDsomoRgNnCfKNSXXg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-finalizationregistry": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-finalizationregistry/-/is-finalizationregistry-1.1.1.tgz",
      "integrity": "sha512-1pC6N8qWJbWoPtEjgcL2xyhQOP491EQjeUo3qTKcmV8YSDDJrOepfG8pcC7h/QgnQHYSv0mJ3Z/ZWxmatVrysg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-generator-function": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/is-generator-function/-/is-generator-function-1.1.2.tgz",
      "integrity": "sha512-upqt1SkGkODW9tsGNG5mtXTXtECizwtS2kA161M+gJPc1xdb/Ax629af6YrTwcOeQHbewrPNlE5Dx7kzvXTizA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4",
        "generator-function": "^2.0.0",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-map": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-map/-/is-map-2.0.3.tgz",
      "integrity": "sha512-1Qed0/Hr2m+YqxnM09CjA2d/i6YZNfF6R2oRAOj36eUdS6qIV/huPJNSEpKbupewFs+ZsJlxsjjPbc0/afW6Lw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-negative-zero": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.3.tgz",
      "integrity": "sha512-5KoIu2Ngpyek75jXodFvnafB6DJgr3u8uuK0LEZJjrU19DrMD3EVERaR8sjz8CCGgpZvxPl9SuE1GMVPFHx1mw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-number-object": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-number-object/-/is-number-object-1.1.1.tgz",
      "integrity": "sha512-lZhclumE1G6VYD8VHe35wFaIif+CTy5SJIi5+3y4psDgWu4wPDoBhF8NxUOinEc7pHgiTsT6MaBb92rKhhD+Xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-regex": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
      "integrity": "sha512-MjYsKHO5O7mCsmRGxWcLWheFqN9DJ/2TmngvjKXihe6efViPqc274+Fx/4fYj/r03+ESvBdTXK0V6tA3rgez1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-set": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-set/-/is-set-2.0.3.tgz",
      "integrity": "sha512-iPAjerrse27/ygGLxw+EBR9agv9Y6uLeYVJMu+QNCoouJ1/1ri0mGrcWpfCqFZuzzx3WjtwxG098X+n4OuRkPg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-shared-array-buffer": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-shared-array-buffer/-/is-shared-array-buffer-1.0.4.tgz",
      "integrity": "sha512-ISWac8drv4ZGfwKl5slpHG9OwPNty4jOWPRIhBpxOoD+hqITiwuipOQ2bNthAzwA3B4fIjO4Nln74N0S9byq8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-string": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-string/-/is-string-1.1.1.tgz",
      "integrity": "sha512-BtEeSsoaQjlSPBemMQIrY1MY0uM6vnS1g5fmufYOtnxLGUZM2178PKbhsk7Ffv58IX+ZtcvoGwccYsh0PglkAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-symbol": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.1.1.tgz",
      "integrity": "sha512-9gGx6GTtCQM73BgmHQXfDmLtfjjTUDSyoxTCbp5WtoixAhfgsDirWIcVQ/IHpvI5Vgd5i/J5F7B9cN/WlVbC/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-symbols": "^1.1.0",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-typed-array": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/is-typed-array/-/is-typed-array-1.1.15.tgz",
      "integrity": "sha512-p3EcsicXjit7SaskXHs1hA91QxgTw46Fv6EFKKGS5DRFLD8yKnohjF3hxoju94b/OcMZoQukzpPpBE9uLVKzgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakmap": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/is-weakmap/-/is-weakmap-2.0.2.tgz",
      "integrity": "sha512-K5pXYOm9wqY1RgjpL3YTkF39tni1XajUIkawTLUo9EZEVUFga5gSQJF8nNS7ZwJQ02y+1YCNYcMh+HIf1ZqE+w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakref": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-weakref/-/is-weakref-1.1.1.tgz",
      "integrity": "sha512-6i9mGWSlqzNMEqpCp93KwRS1uUOodk2OJ6b+sq7ZPDSy2WuI5NFIxp/254TytR8ftefexkWn5xNiHUNpPOfSew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakset": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-weakset/-/is-weakset-2.0.4.tgz",
      "integrity": "sha512-mfcwb6IzQyOKTs84CQMrOwW4gQcaTOAWJ0zzJCl2WSPDrWk/OzDaImWFH3djXhb24g4eudZfLRozAvPGw4d9hQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/isarray": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.5.tgz",
      "integrity": "sha512-xHjhDr3cNBK0BzdUJSPXZntQUx/mwMS5Rw4A7lPJ90XGAO6ISP/ePDNuo0vhqOZU+UD5JoodwCAAoZQd3FeAKw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/iterator.prototype": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/iterator.prototype/-/iterator.prototype-1.1.5.tgz",
      "integrity": "sha512-H0dkQoCa3b2VEeKQBOxFph+JAbcrQdE7KC0UkqwpLmv2EC4P41QXP+rqo9wYodACiG5/WM5s9oDApTU8utwj9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.6",
        "get-proto": "^1.0.0",
        "has-symbols": "^1.1.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
      "integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.2.tgz",
      "integrity": "sha512-g1MWMLBiz8FKi1e4w0UyVL3w+iJceWAFBAaBnnGKOpNa5f8TLktkbre1+s6oICydWAm+HRUGTmI+//xv2hvXYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minimist": "^1.2.0"
      },
      "bin": {
        "json5": "lib/cli.js"
      }
    },
    "node_modules/jsx-ast-utils": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/jsx-ast-utils/-/jsx-ast-utils-3.3.5.tgz",
      "integrity": "sha512-ZZow9HBI5O6EPgSJLUb8n2NKgmVWTwCvHGwFuJlMjvLFqlGG6pjirPhtdsseaLZjSibD8eegzmYpUZwoIlj2cQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.6",
        "array.prototype.flat": "^1.3.1",
        "object.assign": "^4.1.4",
        "object.values": "^1.1.6"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/language-subtag-registry": {
      "version": "0.3.23",
      "resolved": "https://registry.npmjs.org/language-subtag-registry/-/language-subtag-registry-0.3.23.tgz",
      "integrity": "sha512-0K65Lea881pHotoGEa5gDlMxt3pctLi2RplBb7Ezh4rRdLEOtgi7n4EwK9lamnUCkKBqaeKRVebTq6BAxSkpXQ==",
      "dev": true,
      "license": "CC0-1.0"
    },
    "node_modules/language-tags": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/language-tags/-/language-tags-1.0.9.tgz",
      "integrity": "sha512-MbjN408fEndfiQXbFQ1vnd+1NoLDsnQW41410oQBXiyXDMYH5z505juWa4KUE1LqxRC7DgOgZDbKLxHIwm27hA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "language-subtag-registry": "^0.3.20"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/napi-postinstall": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/napi-postinstall/-/napi-postinstall-0.3.4.tgz",
      "integrity": "sha512-PHI5f1O0EP5xJ9gQmFGMS6IZcrVvTjpXjz7Na41gTE7eE2hK11lg04CECCYEEjdc17EV4DO+fkGEtt7TpTaTiQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "napi-postinstall": "lib/cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/napi-postinstall"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/next": {
      "version": "15.5.7",
      "resolved": "https://registry.npmjs.org/next/-/next-15.5.7.tgz",
      "integrity": "sha512-+t2/0jIJ48kUpGKkdlhgkv+zPTEOoXyr60qXe68eB/pl3CMJaLeIGjzp5D6Oqt25hCBiBTt8wEeeAzfJvUKnPQ==",
      "deprecated": "This version has a security vulnerability. Please upgrade to a patched version. See https://nextjs.org/blog/security-update-2025-12-11 for more details.",
      "license": "MIT",
      "dependencies": {
        "@next/env": "15.5.7",
        "@swc/helpers": "0.5.15",
        "caniuse-lite": "^1.0.30001579",
        "postcss": "8.4.31",
        "styled-jsx": "5.1.6"
      },
      "bin": {
        "next": "dist/bin/next"
      },
      "engines": {
        "node": "^18.18.0 || ^19.8.0 || >= 20.0.0"
      },
      "optionalDependencies": {
        "@next/swc-darwin-arm64": "15.5.7",
        "@next/swc-darwin-x64": "15.5.7",
        "@next/swc-linux-arm64-gnu": "15.5.7",
        "@next/swc-linux-arm64-musl": "15.5.7",
        "@next/swc-linux-x64-gnu": "15.5.7",
        "@next/swc-linux-x64-musl": "15.5.7",
        "@next/swc-win32-arm64-msvc": "15.5.7",
        "@next/swc-win32-x64-msvc": "15.5.7",
        "sharp": "^0.34.3"
      },
      "peerDependencies": {
        "@opentelemetry/api": "^1.1.0",
        "@playwright/test": "^1.51.1",
        "babel-plugin-react-compiler": "*",
        "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "sass": "^1.3.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        },
        "@playwright/test": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "sass": {
          "optional": true
        }
      }
    },
    "node_modules/node-exports-info": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/node-exports-info/-/node-exports-info-1.6.0.tgz",
      "integrity": "sha512-pyFS63ptit/P5WqUkt+UUfe+4oevH+bFeIiPPdfb0pFeYEu/1ELnJu5l+5EcTKYL5M7zaAa7S8ddywgXypqKCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array.prototype.flatmap": "^1.3.3",
        "es-errors": "^1.3.0",
        "object.entries": "^1.1.9",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/node-exports-info/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object-keys": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.assign": {
      "version": "4.1.7",
      "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.7.tgz",
      "integrity": "sha512-nK28WOo+QIjBkDduTINE4JkF/UJJKyf2EJxvJKfblDpyg0Q+pkOHNTL0Qwy6NP6FhE/EnzV73BxxqcJaXY9anw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0",
        "has-symbols": "^1.1.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.entries": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/object.entries/-/object.entries-1.1.9.tgz",
      "integrity": "sha512-8u/hfXFRBD1O0hPUjioLhoWFHRmt6tKA4/vZPyckBr18l1KE9uHrFaFaUi8MDRTpi4uak2goyPTSNJLXX2k2Hw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.fromentries": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/object.fromentries/-/object.fromentries-2.0.8.tgz",
      "integrity": "sha512-k6E21FzySsSK5a21KRADBd/NGneRegFO5pLHfdQLpRDETUNJueLXs3WCzyQ3tFRDYgbq3KHGXfTbi2bs8WQ6rQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.groupby": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/object.groupby/-/object.groupby-1.0.3.tgz",
      "integrity": "sha512-+Lhy3TQTuzXI5hevh8sBGqbmurHbbIjAi0Z4S63nthVLmLxfbj4T54a4CfZrXIrt9iP4mVAPYMo/v99taj3wjQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.values": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.2.1.tgz",
      "integrity": "sha512-gXah6aZrcUxjWg2zR2MwouP2eHlCBzdV4pygudehaKXSGW4v2AsRQUK+lwwXhii6KFZcunEnmSUoYp5CXibxtA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/own-keys": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/own-keys/-/own-keys-1.0.1.tgz",
      "integrity": "sha512-qFOyK5PjiWZd+QQIh+1jhdb9LpxTF0qs7Pm8o5QHYZ0M3vKqSqzsZaEB6oWlxZ+q2sJBMI/Ktgd2N5ZwQoRHfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "get-intrinsic": "^1.2.6",
        "object-keys": "^1.1.1",
        "safe-push-apply": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/possible-typed-array-names": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/possible-typed-array-names/-/possible-typed-array-names-1.1.0.tgz",
      "integrity": "sha512-/+5VFTchJDoVj3bhoqi6UeymcD00DAwb1nJwamzPvHEszJ4FpF6SNNbUbOS8yI56qHzdV8eK0qEfOSiodkTdxg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.31",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.31.tgz",
      "integrity": "sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.6",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.0.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.1.0",
      "resolved": "https://registry.npmjs.org/react/-/react-19.1.0.tgz",
      "integrity": "sha512-FS+XFBNvn3GTAWq26joslQgWNoFu08F4kl0J4CgdNKADkdSGXQyTCnKteIAJy96Br6YbpEU1LSzV5dYtjMkMDg==",
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.1.0",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.1.0.tgz",
      "integrity": "sha512-Xs1hdnE+DyKgeHJeJznQmYMIBG3TKIHJJT95Q58nHLSrElKlGQqDTR2HQ9fx5CN/Gk6Vh/kupBTDLU11/nDk/g==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "scheduler": "^0.26.0"
      },
      "peerDependencies": {
        "react": "^19.1.0"
      }
    },
    "node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/reflect.getprototypeof": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/reflect.getprototypeof/-/reflect.getprototypeof-1.0.10.tgz",
      "integrity": "sha512-00o4I+DVrefhv+nX0ulyi3biSHCPDe+yLv5o/p6d/UVlirijB8E16FtfwSAi4g3tcqrQ4lRAqQSoFEZJehYEcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.7",
        "get-proto": "^1.0.1",
        "which-builtin-type": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/regexp.prototype.flags": {
      "version": "1.5.4",
      "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.5.4.tgz",
      "integrity": "sha512-dYqgNSZbDwkaJ2ceRd9ojCGjBq+mOm9LmtXnAnEGyHhN/5R7iDW2TRw3h+o/jCFxus3P2LfWIIiwowAjANm7IA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-errors": "^1.3.0",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve": {
      "version": "2.0.0-next.6",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-2.0.0-next.6.tgz",
      "integrity": "sha512-3JmVl5hMGtJ3kMmB3zi3DL25KfkCEyy3Tw7Gmw7z5w8M9WlwoPFnIvwChzu1+cF3iaK3sp18hhPz8ANeimdJfA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "node-exports-info": "^1.6.0",
        "object-keys": "^1.1.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/resolve-pkg-maps": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz",
      "integrity": "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/privatenumber/resolve-pkg-maps?sponsor=1"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/safe-array-concat": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.4.tgz",
      "integrity": "sha512-wtZlHyOje6OZTGqAoaDKxFkgRtkF9CnHAVnCHKfuj200wAgL+bSJhdsCD2l0Qx/2ekEXjPWcyKkfGb5CPboslg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "get-intrinsic": "^1.3.0",
        "has-symbols": "^1.1.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">=0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-push-apply": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/safe-push-apply/-/safe-push-apply-1.0.0.tgz",
      "integrity": "sha512-iKE9w/Z7xCzUMIZqdBsp6pEQvwuEebH4vdpjcDWnyzaI6yl6O9FHvVpmGelvEHNsoY6wGblkxR6Zty/h00WiSA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-regex-test": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex-test/-/safe-regex-test-1.1.0.tgz",
      "integrity": "sha512-x/+Cz4YrimQxQccJf5mKEbIa1NzeCRNI5Ecl/ekmlYaampdNLPalVyIcCZNNH3MvmqBugV5TMYZXv0ljslUlaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-regex": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/scheduler": {
      "version": "0.26.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.26.0.tgz",
      "integrity": "sha512-NlHwttCI/l5gCPR3D1nNXtWABUmBwvZpEQiD4IXSbIDq8BzLIK/7Ir5gTFSGZDUu37K5cMNp0hFtzO38sC7gWA==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.7.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
      "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
      "devOptional": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/set-function-length": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
      "integrity": "sha512-pgRc4hJ4/sNjWCSS9AmnS40x3bNMDTknHgL5UaMBTMyJnU90EgWh1Rz+MC9eFu4BuN/UwZjKQuY/1v3rM7HMfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.2.4",
        "gopd": "^1.0.1",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-function-name": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/set-function-name/-/set-function-name-2.0.2.tgz",
      "integrity": "sha512-7PGFlmtwsEADb0WYyvCMa1t+yke6daIG4Wirafur5kcf+MhUnPms1UeR0CKQdTZD81yESwMHbtn+TR+dMviakQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "functions-have-names": "^1.2.3",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-proto": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/set-proto/-/set-proto-1.0.0.tgz",
      "integrity": "sha512-RJRdvCo6IAnPdsvP/7m6bsQqNnn1FCBX5ZNtFL98MmFF/4xAIJTIg1YbHW5DC2W5SKZanrC6i4HsJqlajw/dZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/sharp": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.34.5.tgz",
      "integrity": "sha512-Ou9I5Ft9WNcCbXrU9cMgPBcCK8LiwLqcbywW3t4oDV37n1pzpuNLsYiAV8eODnjbtQlSDwZ2cUEeQz4E54Hltg==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/colour": "^1.0.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.7.3"
      },
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.34.5",
        "@img/sharp-darwin-x64": "0.34.5",
        "@img/sharp-libvips-darwin-arm64": "1.2.4",
        "@img/sharp-libvips-darwin-x64": "1.2.4",
        "@img/sharp-libvips-linux-arm": "1.2.4",
        "@img/sharp-libvips-linux-arm64": "1.2.4",
        "@img/sharp-libvips-linux-ppc64": "1.2.4",
        "@img/sharp-libvips-linux-riscv64": "1.2.4",
        "@img/sharp-libvips-linux-s390x": "1.2.4",
        "@img/sharp-libvips-linux-x64": "1.2.4",
        "@img/sharp-libvips-linuxmusl-arm64": "1.2.4",
        "@img/sharp-libvips-linuxmusl-x64": "1.2.4",
        "@img/sharp-linux-arm": "0.34.5",
        "@img/sharp-linux-arm64": "0.34.5",
        "@img/sharp-linux-ppc64": "0.34.5",
        "@img/sharp-linux-riscv64": "0.34.5",
        "@img/sharp-linux-s390x": "0.34.5",
        "@img/sharp-linux-x64": "0.34.5",
        "@img/sharp-linuxmusl-arm64": "0.34.5",
        "@img/sharp-linuxmusl-x64": "0.34.5",
        "@img/sharp-wasm32": "0.34.5",
        "@img/sharp-win32-arm64": "0.34.5",
        "@img/sharp-win32-ia32": "0.34.5",
        "@img/sharp-win32-x64": "0.34.5"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stable-hash": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/stable-hash/-/stable-hash-0.0.5.tgz",
      "integrity": "sha512-+L3ccpzibovGXFK+Ap/f8LOS0ahMrHTf3xu7mMLSpEGU0EO9ucaysSylKo9eRDFNhWve/y275iPmIZ4z39a9iA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/stop-iteration-iterator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/stop-iteration-iterator/-/stop-iteration-iterator-1.1.0.tgz",
      "integrity": "sha512-eLoXW/DHyl62zxY4SCaIgnRhuMr6ri4juEYARS8E6sCEqzKpOiE521Ucofdx+KnDZl5xmvGYaaKCk5FEOxJCoQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "internal-slot": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/string.prototype.includes": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/string.prototype.includes/-/string.prototype.includes-2.0.1.tgz",
      "integrity": "sha512-o7+c9bW6zpAdJHTtujeePODAhkuicdAryFsfVKwA+wGw89wJ4GTY484WTucM9hLtDEOpOvI+aHnzqnC5lHp4Rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/string.prototype.matchall": {
      "version": "4.0.12",
      "resolved": "https://registry.npmjs.org/string.prototype.matchall/-/string.prototype.matchall-4.0.12.tgz",
      "integrity": "sha512-6CC9uyBL+/48dYizRf7H7VAYCMCNTBeM78x/VTUe9bFEaxBepPJDa1Ow99LqI/1yF7kuy7Q3cQsYMrcjGUcskA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.6",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.6",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "regexp.prototype.flags": "^1.5.3",
        "set-function-name": "^2.0.2",
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.repeat": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/string.prototype.repeat/-/string.prototype.repeat-1.0.0.tgz",
      "integrity": "sha512-0u/TldDbKD8bFCQ/4f5+mNRrXwZ8hg2w7ZR8wa16e8z9XpePWl3eGEcUD0OXpEH/VJH/2G3gjUtR3ZOiBe2S/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5"
      }
    },
    "node_modules/string.prototype.trim": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/string.prototype.trim/-/string.prototype.trim-1.2.10.tgz",
      "integrity": "sha512-Rs66F0P/1kedk5lyYyH9uBzuiI/kNRmwJAR9quK6VOtIpZ2G+hMZd+HQbbv25MgCA6gEffoMZYxlTod4WcdrKA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.2",
        "define-data-property": "^1.1.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-object-atoms": "^1.0.0",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimend": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.9.tgz",
      "integrity": "sha512-G7Ok5C6E/j4SGfyLCloXTrngQIQU3PWtXGst3yM7Bea9FRURf1S42ZHlZZtsNque2FN2PoUhfZXYLNWwEr4dLQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.2",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimstart": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.8.tgz",
      "integrity": "sha512-UXSH262CSZY1tfu3G3Secr6uGLCFVPMhIqHjlgCUtCCcgihYc/xKs9djMTMUOb2j1mVSeU8EU6NWc/iQKU6Gfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha512-vavAMRXOgBVNF6nyEEmL3DBK19iRpDcoIwW+swQ+CbGiu7lju6t+JklA1MHweoWtadgt4ISVUsXLyDq34ddcwA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/styled-jsx": {
      "version": "5.1.6",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.6.tgz",
      "integrity": "sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==",
      "license": "MIT",
      "dependencies": {
        "client-only": "0.0.1"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "peerDependencies": {
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.16",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.16.tgz",
      "integrity": "sha512-pn99VhoACYR8nFHhxqix+uvsbXineAasWm5ojXoN8xEwK5Kd3/TrhNn1wByuD52UxWRLy8pu+kRMniEi6Eq9Zg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.5.0.tgz",
      "integrity": "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/tsconfig-paths": {
      "version": "3.15.0",
      "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.15.0.tgz",
      "integrity": "sha512-2Ac2RgzDe/cn48GvOe3M+o82pEFewD3UPbyoUHHdKasHwJKjds4fLXWf/Ux5kATBKN20oaFGu+jbElp1pos0mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/json5": "^0.0.29",
        "json5": "^1.0.2",
        "minimist": "^1.2.6",
        "strip-bom": "^3.0.0"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/typed-array-buffer": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-buffer/-/typed-array-buffer-1.0.3.tgz",
      "integrity": "sha512-nAYYwfY3qnzX30IkA6AQZjVbtK6duGontcQm1WSG1MD94YLqK0515GNApXkoxKOWMusVssAHWLh9SeaoefYFGw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/typed-array-byte-length": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-byte-length/-/typed-array-byte-length-1.0.3.tgz",
      "integrity": "sha512-BaXgOuIxz8n8pIq3e7Atg/7s+DpiYrxn4vdot3w9KbnBhcRQq6o3xemQdIfynqSeXeDrF32x+WvfzmOjPiY9lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "for-each": "^0.3.3",
        "gopd": "^1.2.0",
        "has-proto": "^1.2.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-byte-offset": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/typed-array-byte-offset/-/typed-array-byte-offset-1.0.4.tgz",
      "integrity": "sha512-bTlAFB/FBYMcuX81gbL4OcpH5PmlFHqlCCpAl8AlEzMz5k53oNDvN8p1PNOWLEmI2x4orp3raOFB51tv9X+MFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "for-each": "^0.3.3",
        "gopd": "^1.2.0",
        "has-proto": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "reflect.getprototypeof": "^1.0.9"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-length": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/typed-array-length/-/typed-array-length-1.0.7.tgz",
      "integrity": "sha512-3KS2b+kL7fsuk/eJZ7EQdnEmQoaho/r6KUef7hxvltNA5DR8NAUM+8wJMbJyZ4G9/7i3v5zPBIMN5aybAh2/Jg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "for-each": "^0.3.3",
        "gopd": "^1.0.1",
        "is-typed-array": "^1.1.13",
        "possible-typed-array-names": "^1.0.0",
        "reflect.getprototypeof": "^1.0.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "peer": true,
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/unbox-primitive": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/unbox-primitive/-/unbox-primitive-1.1.0.tgz",
      "integrity": "sha512-nWJ91DjeOkej/TA8pXQ3myruKpKEYgqvpw9lz4OPHj/NWFNluYrjbz9j01CJ8yKQd2g4jFoOkINCTW2I5LEEyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-bigints": "^1.0.2",
        "has-symbols": "^1.1.0",
        "which-boxed-primitive": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/unrs-resolver": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/unrs-resolver/-/unrs-resolver-1.11.1.tgz",
      "integrity": "sha512-bSjt9pjaEBnNiGgc9rUiHGKv5l4/TGzDmYw3RhnkJGtLhbnnA/5qJj7x3dNDCRx/PJxu774LlH8lCOlB4hEfKg==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "napi-postinstall": "^0.3.0"
      },
      "funding": {
        "url": "https://opencollective.com/unrs-resolver"
      },
      "optionalDependencies": {
        "@unrs/resolver-binding-android-arm-eabi": "1.11.1",
        "@unrs/resolver-binding-android-arm64": "1.11.1",
        "@unrs/resolver-binding-darwin-arm64": "1.11.1",
        "@unrs/resolver-binding-darwin-x64": "1.11.1",
        "@unrs/resolver-binding-freebsd-x64": "1.11.1",
        "@unrs/resolver-binding-linux-arm-gnueabihf": "1.11.1",
        "@unrs/resolver-binding-linux-arm-musleabihf": "1.11.1",
        "@unrs/resolver-binding-linux-arm64-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-arm64-musl": "1.11.1",
        "@unrs/resolver-binding-linux-ppc64-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-riscv64-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-riscv64-musl": "1.11.1",
        "@unrs/resolver-binding-linux-s390x-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-x64-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-x64-musl": "1.11.1",
        "@unrs/resolver-binding-wasm32-wasi": "1.11.1",
        "@unrs/resolver-binding-win32-arm64-msvc": "1.11.1",
        "@unrs/resolver-binding-win32-ia32-msvc": "1.11.1",
        "@unrs/resolver-binding-win32-x64-msvc": "1.11.1"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/which-boxed-primitive": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/which-boxed-primitive/-/which-boxed-primitive-1.1.1.tgz",
      "integrity": "sha512-TbX3mj8n0odCBFVlY8AxkqcHASw3L60jIuF8jFP78az3C2YhmGvqbHBpAjTRH2/xqYunrJ9g1jSyjCjpoWzIAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-bigint": "^1.1.0",
        "is-boolean-object": "^1.2.1",
        "is-number-object": "^1.1.1",
        "is-string": "^1.1.1",
        "is-symbol": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-builtin-type": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/which-builtin-type/-/which-builtin-type-1.2.1.tgz",
      "integrity": "sha512-6iBczoX+kDQ7a3+YJBnh3T+KZRxM/iYNPXicqk66/Qfm1b93iu+yOImkg0zHbj5LNOcNv1TEADiZ0xa34B4q6Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "function.prototype.name": "^1.1.6",
        "has-tostringtag": "^1.0.2",
        "is-async-function": "^2.0.0",
        "is-date-object": "^1.1.0",
        "is-finalizationregistry": "^1.1.0",
        "is-generator-function": "^1.0.10",
        "is-regex": "^1.2.1",
        "is-weakref": "^1.0.2",
        "isarray": "^2.0.5",
        "which-boxed-primitive": "^1.1.0",
        "which-collection": "^1.0.2",
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-collection": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/which-collection/-/which-collection-1.0.2.tgz",
      "integrity": "sha512-K4jVyjnBdgvc86Y6BkaLZEN933SwYOuBFkdmBu9ZfkcAbdVbpITnDmjvZ/aQjRXQrv5EPkTnD1s39GiiqbngCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-map": "^2.0.3",
        "is-set": "^2.0.3",
        "is-weakmap": "^2.0.2",
        "is-weakset": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-typed-array": {
      "version": "1.1.20",
      "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.20.tgz",
      "integrity": "sha512-LYfpUkmqwl0h9A2HL09Mms427Q1RZWuOHsukfVcKRq9q95iQxdw0ix1JQrqbcDR9PH1QDwf5Qo8OZb5lksZ8Xg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "for-each": "^0.3.5",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    }
  }
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \README.md
NAME: README.md
SIZE: 671
SHA256: 87b51d4ada82a7713060bd94d4a1acf1633ea01dca8249755bdcb648aabd6002
BINARY: False
LANG: md
CREATED_UTC: 2026-04-27T21:37:12.1467449Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9451694Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
# PTE MIK HÖK Web – 25.3 verzió

## V25.3 fókusz


## Fő módosítások


### Hírek modul fókusz
- Külön modál az új hír létrehozásához.
- Külön modál a hír szerkesztéséhez.
- Külön modál a Facebook adapterhez.
- Külön modál az Instagram adapterhez.
- Külön modál az archívum / ütemezés kezeléséhez.
- Külön modál a kategóriakezeléshez.
- Működő lokális publish / archive / delete logika.

### Database-ready irány
- A jelenlegi hírmodul lokális állapotkezelésen fut.
- A szerkezet később API vagy adatbázis alá könnyen beköthető.

### Dokumentáció
- Részletes leírás: `docs/V25_3-news-focus-documentation.md`
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \run_weblap_snapshot.bat
NAME: run_weblap_snapshot.bat
SIZE: 645
SHA256: e11bb7c0c3362661dad894f42ac39ea20363d1750641f42044e97c634e399495
BINARY: False
LANG: bat
CREATED_UTC: 2026-04-27T23:32:10.1273817Z
MODIFIED_UTC: 2026-04-27T23:32:30.6100218Z
ACCESSED_UTC: 2026-04-27T23:32:30.6100218Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
@echo off
setlocal EnableExtensions EnableDelayedExpansion

echo [SNAPSHOT] Starting snapshot generation...
echo [SNAPSHOT] Running PowerShell script...

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0make_weblap_snapshot_max_precision.ps1"
set "EXITCODE=%ERRORLEVEL%"

if "%EXITCODE%"=="0" (
  echo [SNAPSHOT] SUCCESS: weblap.md generated correctly.
  echo [SNAPSHOT] Next step: send the generated weblap.md back here.
) else (
  echo [SNAPSHOT] ERROR: Snapshot generation failed with exit code %EXITCODE%.
  echo [SNAPSHOT] Check the PowerShell output above for the exact failing stage.
)

pause
exit /b %EXITCODE%
```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \tsconfig.json
NAME: tsconfig.json
SIZE: 560
SHA256: 9bb749f558a3e6d99ffbeccdd28c8bee022b8e559b694f8ee78206ac41584f61
BINARY: False
LANG: json
CREATED_UTC: 2026-04-27T21:37:12.1265594Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9509378Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

```
===== END FILE RECORD =====

===== BEGIN FILE RECORD =====
PATH: \types\index.ts
NAME: index.ts
SIZE: 433
SHA256: 56454870ca0e41a4982941fe8e06067a15f7f9957d54d0ed7f0e3d97433d76ca
BINARY: False
LANG: ts
CREATED_UTC: 2026-04-27T21:37:12.1142814Z
MODIFIED_UTC: 2026-04-27T21:21:15.0000000Z
ACCESSED_UTC: 2026-04-27T22:57:25.9535599Z
ATTRIBUTES: Archive

CONTENT_MODE: text
```
export type Lang = 'hu' | 'en';
export type Theme = 'light' | 'dark';
export type ToastItem = { id: number; text: string; type: 'success' | 'info' | 'warning' };
export type CalendarView = 'timeline' | 'cards' | 'calendar';
export type SemesterSubject = { id: number; name: string; credits: number; grade: number; completed: boolean };
export type Semester = { id: number; name: string; ghost: boolean; subjects: SemesterSubject[] };
```
===== END FILE RECORD =====
