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
