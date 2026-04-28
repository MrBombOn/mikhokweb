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
