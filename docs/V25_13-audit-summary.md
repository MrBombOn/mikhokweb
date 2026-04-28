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
