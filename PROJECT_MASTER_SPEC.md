# PTE MIK HÖK Web – Master specifikáció

## 1. Projektcél

A projekt célja a Pécsi Tudományegyetem Műszaki és Informatikai Kar Hallgatói Önkormányzata számára egy egységes, professzionális, hosszú távon fenntartható, kétnyelvű, reszponzív és technikailag jól dokumentált webplatform létrehozása. A rendszer egyszerre szolgáljon hallgatói tájékoztató felületként, hivatalos információs portálként, esemény- és tartalomkezelő rendszerként, valamint belső office és admin működési felületként.

A platformnak egyetlen központi rendszerben kell kezelnie a híreket, eseményeket, foglalásokat, tanulmányi segédleteket, képi és dokumentumos tartalmakat, szervezeti információkat, valamint az adminisztratív és irodai műveleteket. A cél nem egy hagyományos intézményi honlap, hanem egy modern, hallgatóbarát, mégis hivatalos és megbízható digitális termék.

A teljes megvalósítás Next.js App Router alapokon, TypeScript használatával, moduláris szerkezetben, központi design systemre és SSOT-elvre építve történjen.

---

## 2. Alapelvek

### 2.1 SSOT – Single Source of Truth

A rendszer minden alapvető döntése központi forrásból származzon. Ez különösen igaz az alábbiakra:

- design tokenek,
- színek,
- spacingek,
- radiusok,
- shadow-k,
- tipográfia,
- státuszok,
- szerepkörök,
- jogosultságok,
- locale kulcsok,
- validációs sémák,
- API response minták,
- kategóriarendszer,
- domainmodellek.

Nem megengedett, hogy ugyanaz a logika több különböző helyen, eltérő formában ismétlődjön. Nem lehet oldalszinten vagy feature-szinten párhuzamos vizuális vagy üzleti szabályrendszert kialakítani.

### 2.2 Moduláris architektúra

A rendszer feature-alapon szerveződjön. Minden nagyobb üzleti terület saját feature modulként működjön, önálló komponens-, schema-, service-, type- és utility-réteggel.

### 2.3 Route-komponensek szerepe

A route-szintű fájlok feladata kizárólag az összeállítás és a layout-kompozíció. Domain logika, üzleti szabály, permission döntés, számítás vagy adattranszformáció nem élhet `page.tsx` vagy `layout.tsx` fájlokban.

### 2.4 Security-first szemlélet

A biztonság a rendszer alapja, nem utólagos javítás. Minden érzékeny művelet szerveroldali hitelesítést, jogosultság-ellenőrzést, validációt és auditálhatóságot igényel.

### 2.5 Dokumentáció mint első osztályú komponens

A dokumentáció a rendszer része. A specifikáció, roadmap, architecture, API-leírás, RBAC, progress log, decision log és handoff dokumentumok a projekt működésének alapvető elemei.

---

## 3. Technológiai alap

A projekt technológiai iránya:

- **Next.js App Router**,
- **TypeScript**,
- központi design system,
- feature-first szerkezet,
- szerveroldali auth és permission-check,
- validációs réteg,
- Prisma-alapú adatmodell,
- jól strukturált API route-ok,
- shared UI primitive-ek,
- központi i18n és theme réteg.

A projekt célja egy tiszta, bővíthető, AI-val és emberi fejlesztővel egyaránt jól folytatható kódbázis.

---

## 4. Design rendszer

### 4.1 Vizuális identitás

A vizuális identitás alapja a PTEMIK brand blue köré szervezett, modern, letisztult, rétegzett és kártyaorientált design. A rendszer karaktere legyen technológiai, hallgatóbarát, prémium, de ne legyen túldíszített vagy sablonos.

A design célja:

- modern portál- és dashboard-hangulat,
- egységes vizuális nyelv public és internal felületen,
- világos és sötét téma támogatása,
- finom blur, glassmorphism-szerű surface-kezelés mértékkel,
- tiszta kártya- és panelhierarchia,
- következetes visszajelzések,
- jól skálázható komponensrendszer.

### 4.2 A design rendszer kötelező elemei

A design systemnek tartalmaznia kell:

- központi színrendszert,
- typography skálát,
- spacing rendszert,
- radius tokeneket,
- shadow tokeneket,
- surface és border szabályokat,
- gombvariánsokat,
- input- és form-elemeket,
- kártya- és panelkomponenseket,
- badge és státuszjelölő rendszert,
- dropdown és select mintákat,
- modalrendszert,
- toast és feedback mintákat,
- loading, empty és error state mintákat,
- page shell szabályokat,
- light és dark módhoz tartozó tokeneket.

### 4.3 Tipográfia

A tipográfia legyen jól olvasható, modern sans-serif alapú, karakteres, de funkcionális. A teljes rendszer központi tokenekből vezérelt tipográfiai skálát használjon. A fontcsalád cseréje és finomhangolása egyetlen központi ponton történhessen.

### 4.4 Design system proof

A tényleges oldalépítés előtt külön proof-fázis szükséges, amelyben ellenőrizni kell:

- a light és dark mód működését,
- a színtokenek együttműködését,
- a surface-hierarchiát,
- a display és body font szerepeket,
- a minimum olvashatósági méreteket,
- az alap komponensek egymás közti vizuális konzisztenciáját.

---

## 5. Globális működés

### 5.1 Kétnyelvűség

A teljes rendszer magyar és angol nyelven működjön. A nyelvváltás reaktívan történjen, teljes újratöltés nélkül.

A nyelvváltás terjedjen ki az alábbiakra:

- menük,
- gombok,
- címsorok,
- segédszövegek,
- placeholderök,
- hibák,
- üres állapotok,
- modálok,
- admin feliratok,
- rendszerüzenetek,
- dinamikus tartalmi UI-elemek,
- accessibility labelök.

### 5.2 Dark mode

A rendszer alapértelmezésben világos témával induljon, és a felhasználó bármikor átválthasson sötét módra. A váltás legyen villogásmentes, CSS-változókra épülő és mobilbarát.

### 5.3 Globális state-ek

Központilag kezelt globális működések:

- theme state,
- locale state,
- auth/login dialog state,
- toast/notification state,
- layout-szintű interakciók,
- esetleges globális modalhost.

---

## 6. Szerepkörök és auth

### 6.1 Szerepkörök

A rendszer legalább az alábbi szerepköröket kezelje:

- **Guest** – publikus látogató,
- **Office** – tartalomkezelő és operatív szerepkör,
- **Admin** – teljes adminisztratív és jogosultságkezelő szerepkör.

### 6.2 Bejelentkezés

A bejelentkezés felhasználónév/jelszó alapon történjen. A rendszer külön kezelje:

- session lifecycle-t,
- szerveroldali auth ellenőrzést,
- role-checket,
- permission-checket,
- protected route-ok védelmét,
- érzékeny műveletek auditját.

### 6.3 Jogosultsági szabály

A frontend kizárólag a felületet igazíthatja a jogosultsághoz. A valódi jogosultsági döntés mindig szerveroldalon történjen.

### 6.4 Admin jogosultságok

Az Admin jogosult legyen:

- Office felhasználók létrehozására,
- felhasználók kezelésére,
- szerepkör-emelésre,
- kategóriakezelésre,
- tartalomkezelésre,
- audit log megtekintésére,
- kritikus admin workflow-k kezelésére.

---

## 7. Globális Ablak rendszer

A teljes rendszerben legyen egy egységes modálkomponens, magyarul „Ablak”, amely minden szerkesztési, létrehozási, törlési, jóváhagyási, részletmegtekintési és megerősítési folyamat alapja.

Az Ablak komponens kötelező tulajdonságai:

- egységes fejléc,
- cím,
- vissza vagy mégse akció,
- overlay és háttérhomályosítás,
- következetes zárási logika,
- escape és keyboard támogatás,
- mobilbarát viselkedés,
- minden modulban ugyanaz a használati minta.

---

## 8. Főoldal és landing

A főoldal egyben landing page is legyen. Ez a rendszer első benyomását adó felület, ezért különösen erős információs hierarchiával, tiszta vizuális ritmussal és fokozatos tartalomfeltárással kell rendelkeznie.

### 8.1 Landing működés

A landing oldalon kezdetben ne legyen teljes navbar. Csak a jobb felső sarokban jelenjen meg:

- dark mode toggle,
- language toggle,
- bejelentkezés gomb.

A teljes navigáció scroll után aktiválódjon.

### 8.2 Landing tartalom

A landing oldalon kapjon helyet:

- HÖK logó kiemelt szerepben,
- nagy hero headline,
- rövid leíró bevezetés,
- fő CTA-k,
- 2x3-as vagy hasonló modulgrid a fő aloldalakhoz,
- hírek blokk,
- hivatalos közlések,
- Instagram és Facebook feed integráció lehetősége,
- hírek fölé épített komplex kereső,
- Office módban hírszerkesztési lehetőség modálos workflow-val.

A landing célja nem az, hogy mindent egyszerre megmutasson, hanem hogy világos belépési pontokat adjon a felhasználónak.

---

## 9. Navbar

A navbar a landing kivételével minden oldalon jelenjen meg.

### 9.1 Szerkezet

- bal oldalon HÖK logó és főoldal link,
- középen fő navigációs elemek,
- jobb oldalon theme, language és auth-related elemek.

### 9.2 Mobil menü

Mobilon a navbar off-canvas vagy teljes képernyős menüként működjön. Ne csak összenyomott desktop menü legyen, hanem külön jól használható mobil interakció.

### 9.3 Viselkedés

- aktív állapotok,
- hover és focus állapotok,
- scroll utáni landing-nav aktiváció,
- következetes animációs szabályok.

---

## 10. Hírek modul

A hírek modul a rendszer egyik elsődleges tartalmi motorja.

### 10.1 Funkciók

- hírlista,
- részletes hírnézet,
- kategóriaszűrés,
- kulcsszavas keresés,
- archive nézet,
- Office oldali CRUD,
- szerkesztés modálban,
- temezés,
- publikációs életciklus-kezelés.

### 10.2 Státuszok

A hírek legalább az alábbi státuszokat támogassák:

- draft,
- scheduled,
- published,
- archived,
- deleted,
- opcionálisan pending approval.

### 10.3 Cél

A hírek modul legyen referencia-tartalmi modul, amely mintát ad a guides, gallery és más content-részek számára.

---

## 11. Naptár és tornaterem modul

A naptár a rendszer egyik legösszetettebb modulja.

### 11.1 Kötelező nézetek

A modul három, ugyanarra az adatforrásra épülő nézetet támogasson:

- **Timeline view**,
- **Card view**,
- **Calendar view**.

### 11.2 Funkciók

- eseménylista és részletek,
- kategóriajelzés,
- Mai nap visszaugrás,
- keresés és szűrés,
- tornatermi foglalási kérvény,
- booking modal,
- Office approve/reject workflow,
- conflict warning,
- esemény létrehozás, szerkesztés, temezés, törlés.

### 11.3 Fontos szabály

A három nézet nem használhat három külön adatlogikát. Egyetlen közös eseményforrásból kell dolgozniuk.

### 11.4 Konfliktuskezelés

Az időütközéseket a rendszer jelezze, de ne blokkolja automatikusan a kérelem beküldését.

---

## 12. KKI kalkulátor

A KKI kalkulátor külön domainként kezelendő, szigorúan pontos és ellenőrizhető számítási logikával.

### 12.1 Funkciók

- félévek kezelése,
- tárgyak kezelése,
- tárgynév, kredit, érdemjegy megadása,
- KKI számítás,
- KI számítás,
- súlyozott átlag,
- felvett kredit,
- teljesített kredit,
- összesített átlag,
- sticky summary panel,
- ghost mód,
- összecsukható félévek,
- exportálási lehetőség.

### 12.2 Számítási szabály

A képletek külön domain-rétegben éljenek. A UI nem tartalmazhat közvetlenül szétszórt számítási logikát.

### 12.3 Dokumentáció

A kalkulátorhoz külön dokumentumban kell rögzíteni:

- képleteket,
- edge case-eket,
- ghost mód működését,
- kizárási logikát,
- validációs szabályokat.

---

## 13. Galéria

A galéria a képi tartalmak kezelésére és böngészésére szolgáló modul.

### 13.1 Kötelező nézetek

- grid view,
- folder/map view,
- timeline view.

### 13.2 Funkciók

- képböngészés,
- keresés,
- kategóriák vagy albumok,
- letöltés,
- Office oldali feltöltés és szerkesztés,
- temezés,
- duplikáció- és konfliktusjelzés,
- metaadat-kezelés.

### 13.3 Technikai szempontok

A galéria külön figyelmet igényel az alábbiak miatt:

- képméretezés,
- thumbnail stratégia,
- storage kezelés,
- teljesítmény,
- timeline és grid közti konzisztencia.

---

## 14. Útmutatók modul

Az Útmutatók oldal strukturált tudásbázisként és dokumentumtárként működjön.

### 14.1 Funkciók

- guide listing,
- részletes guide nézet,
- dokumentumtípusok,
- témakörök,
- kulcsszavas keresés,
- kategóriaszűrés,
- Office oldali teljes szerkesztés,
- hosszabb tartalmak és letölthető dokumentumok kezelése.

### 14.2 Elv

A guides modul ne egyszerű linkgyűjtemény legyen, hanem skálázható információs architektúra.

---

## 15. About Us modul

Az About Us oldal a HÖK szervezeti, bemutatkozó és történeti információs oldala.

### 15.1 Tartalom

- szervezeti felépítés,
- hierarchia,
- szerepkörök,
- tagok bemutatása,
- történeti áttekintés,
- korábbi és jelenlegi tagok,
- „kihez forduljak” jellegű információk.

### 15.2 Szerkesztés

Office módban teljes körűen szerkeszthető, temezhető, módosítható és törölhető legyen.

### 15.3 Információs szerkezet

Az oldal ne váljon hosszú, áttekinthetetlen szövegfallá. Inkább információs térképként működjön, jól tagolt profilblokkokkal és szerkezeti egységekkel.

---

## 16. Office oldal

Az Office oldal az irodai információk gyors elérésére szolgál.

### 16.1 Tartalom

- aktuális nyitvatartás,
- bent lévők listája,
- ügyintézési helyzet,
- szolgáltatási információk,
- későbbi NFC-alapú vagy jelenléti automatizálás előkészítése.

### 16.2 Működés

Office felhasználóként az oldal tartalma szerkeszthető, ütemezhető, módosítható és törölhető legyen.

### 16.3 Elv

Az Office oldal legyen pillantásra értelmezhető. A legfontosabb információk azonnal látszódjanak.

---

## 17. Admin felület

Az admin felület a teljes rendszer központi felügyeleti tere.

### 17.1 Fő részek

- admin dashboard,
- users management,
- categories management,
- content management,
- audit viewer,
- opcionálisan settings és office tools.

### 17.2 Admin dashboard célja

Az admin dashboard adjon áttekintést a rendszer állapotáról és a napi operatív teendőkről.

### 17.3 Kezelendő területek

- felhasználók,
- szerepkörök,
- tartalmak,
- kategóriák,
- audit események,
- pending folyamatok,
- gyorsműveletek.

---

## 18. Tartalomkezelés és adatbázis

### 18.1 Fő entitások

A rendszerhez szükséges fő domain entitások:

- User,
- Role,
- Permission,
- Category,
- Status,
- News,
- Event,
- Booking,
- GalleryItem,
- Guide,
- AboutContent,
- OfficeInfo,
- AuditLog.

### 18.2 Tartalom-életciklus

Ahol releváns, a tartalmak egységes életciklust használjanak:

- draft,
- scheduled,
- published,
- archived,
- deleted,
- opcionálisan approval-related státusz.

### 18.3 Adatbázis-elvárások

- jól normalizált szerkezet,
- nem túlbonyolított modell,
- indexek a gyakori lekérdezésekhez,
- publikációs és módosítási mezők,
- auditálhatóság,
- soft delete támogatás,
- restore lehetőség kritikus tartalmaknál.

---

## 19. Kategóriakezelés és keresés

A keresési rendszer közös alapokra épüljön, de modulonként eltérő szűrési logikát használjon.

### 19.1 Kategóriatípusok példák szerint

- hírek: témakörök,
- naptár: eseménykategóriák,
- galéria: mappák vagy albumok,
- guides: dokumentumtípusok és címkék.

### 19.2 Szabály

A kategóriák szerkesztése jogosultsághoz kötött adminisztratív művelet legyen.

### 19.3 Elvárás

A kategóriák és a szűrők állapota minden oldalon azonnal tükröződjön a keresési felületen.

---

## 20. Kiegészítő funkciók

A rendszerhez tervezetten hozzátartoznak:

- globális toast és notification rendszer,
- skeletonok,
- empty state-ek,
- error state-ek,
- back-to-top gomb,
- breadcrumb,
- aktív route-jelzés,
- keresési előzmények,
- megosztási lehetőségek,
- archívumok,
- export funkciók,
- jól használható mobil érintési zónák.

Ezek nem opcionális díszítőelemek, hanem a használhatóság, a termékminőség és a konzisztencia részei.

---

## 21. Biztonság

### 21.1 Kötelező biztonsági elemek

- szerveroldali hitelesítés,
- szerveroldali jogosultság-ellenőrzés,
- role-based access control,
- permission-based ellenőrzés,
- input validáció,
- CSRF-védelem,
- biztonságos session-kezelés,
- jelszó-hash-elés,
- audit log,
- soft delete,
- restore lehetőség.

### 21.2 Biztonsági elv

Nem tekinthető késznek egyetlen protected funkció sem, ha csak frontend szinten van „elrejtve”, de szerveroldalon nincs védve.

---

## 22. Mobil és akadálymentesség

A rendszer teljes egészében mobilbarát és hozzáférhető legyen.

### 22.1 Követelmények

- minimum 44x44 px interaktív zónák,
- jól használható mobil navigáció,
- reszponzív kártyák és listák,
- konzisztens heading hierarchy,
- jó kontrasztok,
- keyboard támogatás,
- fókuszjelölés,
- megfelelő alt szövegek,
- semantic HTML,
- villogásmentes dark mode.

### 22.2 Elv

A mobilélmény ne desktopról összenyomott kompromisszum legyen, hanem önállóan is teljes értékű felület.

---

## 23. Javasolt teljes mappaszerkezet

```txt
pte-mik-hok-web/
├─ app/
│  ├─ (public)/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ about/page.tsx
│  │  ├─ calendar/page.tsx
│  │  ├─ calculator/page.tsx
│  │  ├─ gallery/page.tsx
│  │  ├─ guides/page.tsx
│  │  ├─ news/page.tsx
│  │  └─ office/page.tsx
│  ├─ (internal)/
│  │  ├─ layout.tsx
│  │  ├─ admin/page.tsx
│  │  ├─ admin/users/page.tsx
│  │  ├─ admin/categories/page.tsx
│  │  ├─ admin/content/page.tsx
│  │  ├─ admin/audit/page.tsx
│  │  └─ office/page.tsx
│  ├─ api/
│  │  ├─ auth/[...nextauth]/route.ts
│  │  ├─ news/route.ts
│  │  ├─ news/[id]/route.ts
│  │  ├─ events/route.ts
│  │  ├─ events/[id]/route.ts
│  │  ├─ gallery/route.ts
│  │  ├─ gallery/[id]/route.ts
│  │  ├─ guides/route.ts
│  │  ├─ guides/[id]/route.ts
│  │  ├─ office/route.ts
│  │  ├─ bookings/route.ts
│  │  ├─ users/route.ts
│  │  ├─ categories/route.ts
│  │  └─ audit/route.ts
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ loading.tsx
│  ├─ error.tsx
│  ├─ not-found.tsx
│  └─ sitemap.ts
├─ components/
│  ├─ ui/
│  ├─ layout/
│  └─ shared/
├─ features/
│  ├─ news/
│  ├─ calendar/
│  ├─ calculator/
│  ├─ gallery/
│  ├─ guides/
│  ├─ about/
│  └─ office/
├─ lib/
│  ├─ auth/
│  ├─ db/
│  ├─ i18n/
│  ├─ theme/
│  ├─ audit/
│  ├─ validation/
│  ├─ search/
│  ├─ storage/
│  ├─ state/
│  └─ utils/
├─ prisma/
├─ content/
├─ public/
├─ styles/
├─ tests/
├─ docs/
├─ .env.example
├─ next.config.ts
├─ tsconfig.json
├─ tailwind.config.ts
├─ eslint.config.mjs
├─ package.json
└─ README.md
```

---

## 24. Dokumentációs rendszer

A `docs/` mappában kötelezően vezetendő dokumentumok:

- `specification.md`
- `architecture.md`
- `design-system.md`
- `rbac.md`
- `database.md`
- `api.md`
- `progress-log.md`
- `decision-log.md`
- `calculator-rules.md`
- `search-rules.md`

### 24.1 Progress log

Minden lezárt vagy részben lezárt lépésről legyen rövid státuszbejegyzés.

### 24.2 Decision log

Minden fontos technikai vagy design döntést dokumentálni kell:

- döntési téma,
- alternatívák,
- elfogadott megoldás,
- indoklás,
- roadmap-hatás,
- érintett fájlok,
- érintett pontok.

### 24.3 Checkpoint protokoll

Minden lezárt blokk végén rögzíteni kell:

- checkpoint ID,
- pont száma és neve,
- dátum,
- érintett fájlok,
- elfogadott döntések,
- nyitott kérdések,
- következő konkrét lépés,
- visszatérési pont.

---

## 25. Fejlesztési sorrend

A rendszer ajánlott megvalósítási sorrendje:

1. Projekt bootstrap.
2. SSOT alapok.
3. Layout váz.
4. Alap UI komponensek.
5. Globális működés.
6. Navbar és landing shell.
7. Auth és szerepkörök.
8. Adatmodellek.
9. Hírek modul.
10. Naptár és tornaterem.
11. KKI kalkulátor.
12. Galéria.
13. Útmutatók.
14. About Us.
15. Office oldal.
16. Admin felület.
17. API validáció és hardening.
18. Biztonsági audit.
19. Mobil és a11y audit.
20. Tesztelés és polish.
21. Tartalmi és API SSOT: landing és modulok teljes szinkronja (lásd §29.1).
22. Feature-first refaktor és domain réteg tisztítása (lásd §29.2).
23. Observability, teljesítmény és üzemeltetés (lásd §29.3).
24. SEO, megosztás és hivatalos kommunikáció (lásd §29.4).
25. Hallgatói élmény: keresés, személyre szabás, visszajelzés (lásd §29.5).
26. Integrációk és automatizáció (lásd §29.6).
27. Minőség, tesztek és folyamatos karbantartás (lásd §29.7).
28. Szezonális, kikapcsolható ünnepi hangulat (díszítő réteg, HU naptár; lásd §29.9).

A **21–28. pontok** jelenleg **javasolt továbbfázisok**: részletes leírásuk a §29-ben található (a 28. pont: §29.9). Prioritás, ütemezés és scope egyeztetés után beemelhetők a kötelező sorrendbe, vagy módosíthatók / elvethetők.

Minden pont csak akkor tekinthető lezárhatónak, ha az elfogadási feltételek teljesülnek, a dokumentáció frissült, és a következő lépés egyértelműen rögzítésre került.

---

## 26. Fejlesztési működési szabályok Cursorhoz és további AI használathoz

A projektet minden további fejlesztés során referenciaalapú rendszerként kell kezelni.

Kötelező szabályok:

- új szín, új státusz, új méret csak központi forrásból vezethető be,
- feature mappában csak domain-specifikus UI születhet,
- route-komponens nem tartalmazhat domain logikát,
- a frontend nem hozhat egyedül biztonsági döntést,
- minden modulnak light és dark módban is működnie kell,
- minden modulnak magyar és angol nyelven is működnie kell,
- minden feature kapjon types, schema, service és dokumentációs nyomvonalat,
- minden érzékeny írási művelet validált és auditált legyen,
- minden új fejlesztési kör végén történjen sanity check light/dark és HU/EN nézetben is.

---

## 27. Kész állapot definíciója

A rendszer akkor tekinthető késznek, ha:

- a public és internal világ stabilan elkülönül,
- a design system proof validált,
- a shared UI primitive-ek elkészültek,
- a theme és i18n globálisan működik,
- az auth és RBAC helyes,
- az adatmodellek stabilak,
- a news, calendar, calculator, gallery, guides, about és office modulok működnek,
- a kategória- és keresőrendszer konzisztens,
- az admin felület használható,
- az API validált és dokumentált,
- a security és audit kész,
- a mobilos és akadálymentes működés megfelelő,
- a tesztek és fallback állapotok lefedettek,
- a dokumentáció teljes,
- a projekt megszakítás után is egyértelműen folytatható.

---

## 28. Záró elv

Ez a dokumentum a projekt központi master specifikációja. Minden további roadmap, handoff, implementációs döntés és fejlesztési blokk ennek szellemében értelmezendő. A cél egy olyan rendszer létrehozása, amely nemcsak működik, hanem hosszú távon is tisztán karbantartható, dokumentált, bővíthető és átadható marad.

A **§25** alap fejlesztési sorrenden túli, előre vetített lépések a **§29** fejezetben kaptak helyet; azok csak a fejezet elején leírt egyeztetés után válnak kötelező iránnyá.

---

## 29. További, javasolt fejlesztési fázisok (átgondolandó)

Ez a fejezet a **§25 fejlesztési sorrend 21–27. pontjainak** részletes kibontása (**§29.1–§29.7**), a **28.** pont kibontása (**§29.9**), valamint a **§29.8** ötletbank. Célja, hogy a specifikációval összhangban lévő, előre gondolható fejlesztési irányok dokumentáltan rendelkezésre álljanak; a tételek **nem minősülnek automatikusan elfogadott követelménynek**, amíg a projekt szereplői nem erősítik meg őket (§24.2, `docs/decision-log.md`).

### 29.1 Fázis 21 – Tartalmi és API SSOT: landing, modulok, egy adatforrás

**Kontextus:** A master spec szerint a route-komponensek csak kompozíciót végeznek, a hírek és egyéb modulok pedig referencia-minőségű tartalmi motort képviselnek. A landing és a dedikált moduloldalak között el kell kerülni a párhuzamos, eltérő adat- vagy üzleti logikát.

**Cél:** Egyetlen, dokumentált adatút minden nyilvános tartalommodulhoz (hír, esemény, galéria, útmutató, office kiemelések): ugyanaz a service / API szerződés a főoldalon és a modul route-okon; a kliens cache és invalidáció szabályai egy helyen (SSOT).

**Tartalom (javasolt feladatok):**

- Hírek: landing lista és `/news` (és esetleges archív) ugyanabból a `GET` szerződésből, közös mapper és validáció; ütemezett és piszkozat állapotok viselkedésének szinkronja a §10 szerint.
- Naptár, galéria, guides: hasonló minta – nincs „csak landingre” hardcodeolt demo-adat éles útvonalon; fallback csak fejlesztői vagy feature flag mögött.
- Központi „content fetch” réteg (pl. `lib/` vagy `features/*/service`) + rövid `docs/api.md` frissítés minden változásnál.

**Elfogadási feltételek (javasolt):**

- Nincs olyan production útvonal, ahol ugyanannak a tartalomtípusnak két eltérő forrása él párhuzamosan felhasználói művelet nélkül.
- A §2.1 SSOT és a §2.3 route-szabály betartása code review checklistben szerepel.

**Kapcsolódó fejezetek:** §2.1, §2.3, §10, §18, §25 (1–10, 20).

---

### 29.2 Fázis 22 – Feature-first refaktor: `features/` könyvtár és domain izoláció

**Kontextus:** A §23 javasolt szerkezet és a §2.2 moduláris architektúra előírja a feature mappákat types, schema, service nyomvonalakkal.

**Cél:** A meglévő `components/` és `app/` alatti logika fokozatos áthelyezése úgy, hogy minden nagyobb üzleti terület (`news`, `calendar`, `gallery`, …) önálló feature legyen; a route-ok vékonyak maradnak.

**Tartalom (javasolt feladatok):**

- Modulonként: `types` → `validation` (Zod vagy választott séma) → `service` (fetch, transform) → „dumb” UI komponensek.
- Közös primitívek továbbra is `components/ui/` alatt; domain-specifikus UI a feature-ben.
- Migráció lépésenként, modulonként lezárható checkpointokkal (§24.3).

**Elfogadási feltételek (javasolt):**

- Legalább egy referenciamodul (pl. hírek) teljes feature-szerkezetben; a többi modulra követhető minta és dokumentált migrációs sorrend.

**Kapcsolódó fejezetek:** §2.2, §2.3, §23, §26.

---

### 29.3 Fázis 23 – Observability, teljesítmény és üzemeltetés

**Kontextus:** A §21 biztonság és a §20 kiegészítő funkciók mellett a hosszú távú működéshez kell láthatóság és mérhetőség.

**Cél:** Éles és staging környezetben is értelmezhető hibanaplózás, alapvető metrikák és teljesítménybudget; a felhasználói élmény romlása ne csak szubjektív visszajelzésből derüljön ki.

**Tartalom (javasolt feladatok):**

- Szerveroldali log struktúra (kérések, auth hibák, 5xx okok) PII nélkül; opcionálisan Sentry / OpenTelemetry / hostoló platform integráció.
- Next.js: image optimization, bundle méret figyelés, LCP / CLS célértékek dokumentálása `docs/architecture.md`-ben.
- Alap health check (pl. API ping + DB connectivity) üzemeltetők számára.

**Elfogadási feltételek (javasolt):**

- Dokumentált „hogyan debugolunk egy éles incidenst” 1 oldal; legalább egy automatikus riasztás vagy jelentés prototípus (környezetfüggő).

**Kapcsolódó fejezetek:** §3, §20, §21, §24.

---

### 29.4 Fázis 24 – SEO, Open Graph, megosztás és hivatalos kommunikáció

**Kontextus:** A portál hivatalos információs felület is; a §8 landing és a nyilvános oldalak felderíthetősége közvetlenül érinti a HÖK elérhetőségét.

**Cél:** Keresőbarát, megosztható oldalak: cím, leírás, nyelvváltás és kanonikus URL-ek konzisztenciája; közösségi előnézetek.

**Tartalom (javasolt feladatok):**

- `metadata` / `generateMetadata` modulonként; `sitemap` és `robots` finomhangolás; strukturált adat (hol releváns: események, hírek).
- Nyelvi alternatívák (`hreflang` vagy egyenértékű stratégia) dokumentálása.
- Megosztás gombok a §20 szerinti kiegészítő funkciók részeként, adatvédelmi minimumokkal (nincs felesleges harmadik fél trackelés jóváhagyás nélkül).

**Elfogadási feltételek (javasolt):**

- Lighthouse SEO alap audit dokumentált eredménnyel főbb útvonalakra; nincs üres vagy duplikált `<title>` kritikus oldalakon.

**Kapcsolódó fejezetek:** §8, §20, §22.

---

### 29.5 Fázis 25 – Hallgatói élmény: globális keresés, személyre szabás, visszajelzés

**Kontextus:** A §19 keresés és kategóriák, valamint a §20 keresési előzmények és értesítések iránya.

**Cél:** A hallgató gyorsan megtalálja a számára releváns híreket, eseményeket, útmutatókat; opcionálisan mentett szűrések, „kövesd ezt a kategóriát” jellegű egyszerűsített UX (nem feltétlenül push értesítés az első körben).

**Tartalom (javasolt feladatok):**

- Globális kereső vagy kiemelt kereső entry point a navban; egyesített index vagy modulonkénti API + frontend aggregáció – architekturális döntés a §24.2 szerinti decision logban rögzítendő.
- Elmentett keresések / szűrők: autentikált office felhasználónak szerveroldali opció is szóba jöhet (vs. csak localStorage vendégnek – adatvédelmi határ dokumentálva).
- Visszajelzési csatorna (pl. rövid űrlap, CAPTCHA vagy rate limit) hibás információ jelzésére.

**Elfogadási feltételek (javasolt):**

- Keresési és szűrési szabályok rögzítve `docs/search-rules.md`-ben; a11y: kereső billentyűzettel használható (§22).

**Kapcsolódó fejezetek:** §9, §19, §20, §22.

---

### 29.6 Fázis 26 – Integrációk és automatizáció (Facebook / Instagram / naptár / export)

**Kontextus:** A §10 hírforrások és a §11 naptár workflow; a §12 kalkulátor export; a landing admin UI-ban megjelenő adapter-felületek koncepcionálisan ide kapcsolódnak.

**Cél:** A manuális másolás helyett kontrollált, auditálható integrációk, ahol az üzleti kockázat és a jogi megfelelés is kezelhető.

**Tartalom (javasolt feladatok):**

- Közösségi feed import: token tárolás titkos kezelése, rate limit, hibaüzenetek office nyelven; opcionálisan csak „bemutató” stub marad addig, amíg nincs szerződés szerinti adatátadás.
- Naptár: iCal export/import, campus naptár szinkron – ütemezés szerint.
- KKI és egyéb modulok: export formátumok (PDF/CSV) a §12 elvárásokkal összhangban.

**Elfogadási feltételek (javasolt):**

- Minden külső hívás szerveroldalon, titkok nélkül a kliens bundle-ben; audit napló (§21) az érzékeny írásokhoz.

**Kapcsolódó fejezetek:** §10–§12, §21, §27.

---

### 29.7 Fázis 27 – Minőség: E2E, szerződéstesztek, vizuális regresszió, release folyamat

**Kontextus:** A §25 20. pont (tesztelés és polish) és a §27 kész definíció; a §26 AI fejlesztési szabályok fenntarthatóságot követelnek.

**Cél:** Regressziók korai felismerése; PR-ek merge előtti automatikus ellenőrzése; verziózott release jegyzőkönyv.

**Tartalom (javasolt feladatok):**

- Playwright (vagy választott) E2E a kritikus útvonalakra: nyilvános főoldal, bejelentkezés, egy admin írási művelet smoke.
- API szerződéstesztek vagy snapshot tesztek a mapper és validációs rétegre.
- Opcionális: Chromatic / Percy jellegű vizuális diff a design system proof kritikus komponenseire.
- `CHANGELOG` és címkézett release gyakorlat rögzítése a `docs/progress-log.md`-ben.

**Elfogadási feltételek (javasolt):**

- CI-ben zöld a minimális tesztcsomag; a dokumentációban linkelt „hogyan futtatjuk lokálisan” lépéssor.

**Kapcsolódó fejezetek:** §24.1, §25 (20), §26, §27.

---

### 29.8 Ötletbank: további bővítési irányok (nem ütemezett)

Az alábbi tételek **nem részei a §25 21–27. sorrendnek**; önállóan vagy későbbi fázisokként, priorizálás és jogi/üzleti egyeztetés után emelhetők be. Formátum: rövid **cél** + **fő elem**; részletes scope esetén külön alpont vagy decision log bejegyzés javasolt.

#### 29.8.1 Hallgatói érték és közösség

- **Hírlevél / digest:** heti vagy havi összefoglaló e-mail (kettős opt-in, leiratkozás, adatkezelési tájékoztató). *Kapcsolódik:* §10, §21.
- **RSS / Atom feed:** hírek és események gépi felhasználóra (naptár app, feed olvasó). *Kapcsolódik:* §10, §11.
- **Kedvencek és „később olvasom”:** böngészőben vagy opcionálisan bejelentkezett office nézetben mentett hírek (nem helyettesíti a teljes auth modellt). *Kapcsolódik:* §20, §29.5.
- **PWA:** telepíthető webapp, offline cache a statikus és legutóbb megtekintett nyilvános oldalakra (mérési és frissítési szabályokkal). *Kapcsolódik:* §3, §22.
- **Esemény „emlékeztető” export:** egy kattintással `.ics` egy eseményhez vagy szűrt listához. *Kapcsolódik:* §11, §29.6.

#### 29.8.2 Tartalom, átláthatóság, hivatalosság

- **Űrlapközpont:** pályázat, javaslat, panasz, rendezvényjelentkezés – sablonok, Office általi státusz (beérkezett / elutasítva / megválaszolva), audit. *Kapcsolódik:* §16–§18, §21.
- **Letöltések / dokumentumtár:** a guides modultól elkülönített vagy azzal összekapcsolt „hivatalos PDF” gyűjtemény verziózással vagy „érvényes ettől” dátummal. *Kapcsolódik:* §14, §2.1.
- **Átláthatósági összefoglaló:** közérthető számok és szöveges magyarázat (pl. éves tevékenység, rendezvényszám – csak olyan adat, amelyhez van jogalap és jóváhagyás). *Kapcsolódik:* §15, §21.
- **Szervezeti fa / kapcsolat:** interaktív fa vagy lapozható kártyák a HÖK szervezetéről, felelősök elérhetőségeivel (spam védelem). *Kapcsolódik:* §15.
- **Partnerek és projektek:** külső szervezetek, együttműködések rövid bemutatkozása (szerkesztett, nem automatikus linkfarm). *Kapcsolódik:* §15.

#### 29.8.3 Tanulmányi és karrier jellegű kiegészítések

- **GYIK modul:** kereshető kérdés–válasz, Office által karbantartott; összekapcsolható a guides-szal. *Kapcsolódik:* §14, §19.
- **„Melyik szakmai képviselet?”** döntőfa vagy szűrő (hallgatói jogok, elérhetőség) – tartalomjogilag egyeztetendő. *Kapcsolódik:* §15.
- **KKI kiterjesztések:** órarend import (CSV), terv vs tényleges félév összehasonlítás, megosztható link (read-only snapshot). *Kapcsolódik:* §12.
- **E-learning / linkgyűjtemény:** hivatalos tananyag- és platformlinkek kurált listája (nem LMS helyettesítés). *Kapcsolódik:* §14.

#### 29.8.4 Rendezvény és helyszín

- **Térképes nézet:** események és iroda helyszín megjelenítése (OpenStreetMap vagy egyeztetett szolgáltatás, adatvédelem). *Kapcsolódik:* §11, §15.
- **„Hogyan jutok oda”:** tömegközlekedés + akadálymentesség megjegyzés mező eseményenként. *Kapcsolódik:* §11, §22.
- **Várólista tornateremhez:** ha a foglalás betelt, várólista és automatikus felszabadulás értesítés (komplex workflow – külön spec). *Kapcsolódik:* §11.

#### 29.8.5 Interakció és visszacsatolás

- **Rövid szavazások / közvélemény:** anonim, időzített, eredmény csak lezárás után (abusz elleni limit). *Kapcsolódik:* §20, §21.
- **Hibás információ jelzése:** egy mezős űrlap URL előtöltéssel, rate limit, Office feladatlista. *Kapcsolódik:* §29.5.
- **Opcionális chat / asszisztens:** csak GYIK-ből tanított, emberi handoff; nem kötelező AI. *Kapcsolódik:* §21 (adat, audit).

#### 29.8.6 Technikai, üzemeltetés, megfelelőség

- **Cookie / analytics suite:** egységes consent banner, dokumentált third-party lista. *Kapcsolódik:* §21, §24.
- **Egyszerűsített / nagy kontrasztú „olvasó” nézet:** tipográfia és zaj csökkentése egy kapcsolóval (a teljes téma mellett). *Kapcsolódik:* §4, §22.
- **Tartalom-fordítási workflow:** angol szöveg státusz „review pending”, Office jóváhagyás után publikálás. *Kapcsolódik:* §2.1, §10, §16.
- **Státusz oldal:** külső szolgáltatás vagy saját `/status` – szándékos leállások kommunikációja. *Kapcsolódik:* §29.3.

**Elv:** minden ötlet a §2.1 SSOT, a §2.4 security-first és a §22 akadálymentesség szűrőjén esik át, mielőtt ütemezett fejlesztéssé válik.

---

### 29.9 Fázis 28 – Szezonális, kikapcsolható ünnepi hangulat (díszítő réteg)

**Kontextus:** A portál hivatalos arculata mellett időszakosan, mértékkel erősíthető a közösségi érzés; a díszítés **soha nem veheti el** a tartalom olvashatóságát és a §22 szerinti akadálymentességet. A magyarországi és egyetemi közösség számára ismert ünnepekhez illeszkedő, **felhasználó által kikapcsolható** vizuális réteg külön fejlesztésként, a fő funkciók után valósítható meg.

**Cél:**

- Időszakos „hangulat” effektek és opcionális dekorációs elemek (nem tartalmi követelmény, hanem design layer).
- **Alapértelmezett:** a rendszer a **magyarországi** dátum- és ünnepkultúrához igazított **javasolt időszakokban** finom díszítést ajánlhat (pl. advent–karácsony, szilveszter–újév, farsang, húsvét, májusfa / május 1. környéke, október 23., mindenszentek / halottak napja, **Halloween** mint opcionális, nem kötelező blokk).
- **Felhasználói kontroll:** egyértelmű kapcsoló (pl. „Ünnepi díszítés” / „Seasonal effects”) a **globális beállításokban** vagy a láblécben / navban; állapot **localStorage** vagy profilhoz kötött preferencia (döntés: vendég vs. belső felhasználó). Harmadik állapot: **„Rendszer követése”** = csak akkor jelenik meg díszítés, ha nincs `prefers-reduced-motion: reduce`.
- **Admin / Office opció:** globális „díszítés kikapcsolva” (pl. gyászidőszak, incidens, vizsgaidőszak csendesebb megjelenés) – csak jogosultsággal, auditálhatóan.

**Példa motívumok (nem kötelező lista, döntésnaplóban bővíthető):**

| Időszak (tipikus) | Példa díszítés / effekt | Megjegyzés |
|-------------------|-------------------------|------------|
| Advent, karácsony | finom **hóesés** (CSS / canvas, alacsony CPU), opcionális diszkrét fenyő / csillag motívum a headerben | ne takarja a menüt |
| Szilveszter, újév | rövid ideig **tűzijáték** vagy konfetti (egyszeri animáció, **nem** villogó teljes képernyő) | §22: villogásmentesség |
| Halloween (opcionális) | tökök, pók minimalista sziluett, lila–narancs **akcent** token | kulturális érzékenység: kikapcsolható alapból HU-only közönségnél |
| Húsvét / tavasz | tojás ikon, zöld növény motívum, könnyű háttér textúra | |
| Október 23., nemzeti ünnep | visszafogott trikolór **akcent** (nem animált lobogtatás egész nap) | méltóság |
| Mindenszentek / halottak napja | csendes, statikus vizuális hang (szürke árnyalat, levél motívum) | nincs vidám konfetti |

**Technikai és UX szabályok:**

- **SSOT:** színek és animáció időtartama design tokenekből; külön `seasonal` vagy `festivity` konfigurációs objektum (dátumtartomány → téma azonosító → engedélyezett effektek listája).
- **Teljesítmény:** alapértelmezésben GPU-barát CSS; canvas/WebGL csak ha szükséges és alacsony részletességgel; mobil nézeten egyszerűsített vagy automatikusan kikapcsolt effekt opció.
- **Akadálymentesség:** `prefers-reduced-motion` esetén **csak statikus** díszítés vagy teljes tiltás; képernyőolvasó számára a díszítő réteg **dekorációként** jelölendő (`aria-hidden`), fókusz ne kerüljön dekor elemre.
- **Belső felület:** `(internal)` / admin útvonalakon alapból **nincs** distrakció, vagy ugyanaz a kapcsoló érvényesül.
- **Biztonság:** külső asset vagy CDN csak jóváhagyott forrásból; inline script tiltva a spec §21 szellemében.

**Elfogadási feltételek (javasolt):**

- A díszítés kikapcsolása egy kattintással / azonnal érvényesül, frissítés nélkül is (kliens állapot).
- Lighthouse és manuális a11y ellenőrzés: a díszítés bekapcsolt állapotban sem romlik jelentősen az olvashatóság és a fókuszrend.
- Dokumentált ünnepnaptár-forrás (saját konfig vagy HU locale szabályok) és „hogyan adunk hozzá új időszakot” rövid útmutató a `docs/design-system.md` vagy külön `docs/seasonal-theme.md` fájlban.

**Kapcsolódó fejezetek:** §4 (design rendszer), §20 (kiegészítő UX), §22 (mobil és a11y), §25 (28), §26 (AI / fejlesztési konzisztencia).
