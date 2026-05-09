# Laikus kódmagyarázó (Frontend + Backend)

Ez a leírás úgy magyarázza a rendszert, mintha nem fejlesztő olvasná.

## 1) Hogyan épül fel az oldal?

- Az oldal több “modulból” áll (például hírek, naptár, galéria).
- Minden modul külön komponens, így könnyebb fejleszteni és javítani.
- A külső megjelenést közös stílusok szabályozzák, ezért egységes a kinézet.

## 2) Mit jelent a “frontend”?

- A frontend az, amit a látogató lát és használ a böngészőben.
- Ide tartozik:
  - menü,
  - gombok,
  - űrlapok,
  - hibaoldalak,
  - betöltési állapotok.

## 3) Mit jelent a “backend”?

- A backend a szerveroldali “motor”, ami az adatokat kezeli.
- Ide tartozik:
  - API végpontok,
  - jogosultság-ellenőrzés,
  - adatbázis műveletek,
  - naplózás (audit log).

## 4) Miért vannak külön hibaoldalak?

- Ha nem létező oldalra megy valaki: 404.
- Ha egy oldal feldolgozás közben hibát dob: error oldal.
- Ha rendszerszintű hiba van: global-error oldal.
- Ha adat töltődik: loading oldal.

Ez azért fontos, mert a felhasználó nem “fagyást” lát, hanem érthető visszajelzést.

## 5) Miért lett custom a dropdown és a textarea?

- Egységesebb kinézet minden oldalon.
- Mobilon könnyebb használat (nagyobb érintési célfelület).
- Jobb fókuszjelzés billentyűzetes használathoz.

## 6) Miért nem kommentelünk ki szó szerint minden sort?

- A túl sok inline komment gyakran nehezebbé teszi az olvasást.
- Iparági gyakorlat szerint a bonyolult részeket kommenteljük, az egyértelmű részeket beszédes nevekkel oldjuk meg.
- Kezdőknek a leghasznosabb az ilyen “magas szintű” magyarázó dokumentáció és modulonkénti útmutató.

## 7) Mit olvass tovább, ha részletesebben érdekel?

- `docs/architecture.md` – teljes rendszer szerkezete
- `docs/api.md` – backend API-k
- `docs/rbac.md` – szerepkörök és jogosultság
- `docs/testing.md` – hogyan ellenőrizzük, hogy jól működik
- `docs/final-frontend-backend-audit.md` – végső állapotlista
- **Modulonként (mit hol találsz a kódban):** [`docs/modules/README.md`](./modules/README.md) — pl. rólunk, naptár, esemény domain, kalkulátor, hírek, iroda, galéria, útmutatók, keresés, adatvédelem, állapot oldal
- **Biztonság (middleware, bejelentkezés, CSRF):** [`docs/security-walkthrough.md`](./security-walkthrough.md)
