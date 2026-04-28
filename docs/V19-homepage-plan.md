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