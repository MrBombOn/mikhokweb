# OWASP ASVS – rövid önellenőrző lista (Fázis 16)

Ez **nem** helyettesíti a professzionális penetration testet; célja, hogy a csapat **évente egyszer** végigpipálja a legfontosabb kontrollokat és nyomon követi a hiányokat.

Jelmagyarázat: **I** = megfelel, **R** = részben / javítandó, **N** = nem alkalmazható / nem készült el.

| # | Kontroll (V2.0 kategória – rövidítve) | Állapot | Megjegyzés |
|---|----------------------------------------|---------|------------|
| 1 | V1.1: biztonságos SDLC, threat model jegyzetek | | |
| 2 | V2.x: jelszó tárolás (hash), session TTL, logout | | `bcrypt`, JWT süti |
| 3 | V3.x: session fixation / újrahasználat védelem | | JWT rotáció éles audit: `docs/teljes-modul-...` |
| 4 | V4.x: hozzáférés-vezérlés minden admin íráson | | RBAC + route ellenőrzés |
| 5 | V5.x: bemenet validáció (Zod), output encoding | | Kritikus mezők |
| 6 | V7.x: kriptográfia (HTTPS, titkok nem repóban) | | `AUTH_SECRET`, TLS a hoston |
| 7 | V8.x: adatvédelem / naplók / retention | | GDPR doc, retention batch |
| 8 | V9.x: kommunikációs biztonság (HSTS, CSP) | | `next.config.ts` headers |
| 9 | V11.x: biztonságos konfiguráció / hibakezelés | | Ne szivárogjanak stack trace-ek vendégnek |
| 10 | V14.x: HTTP biztonsági fejlécek | | CSP, X-Frame-Options, stb. |

**Következő lépés:** töltsd ki az **Állapot** oszlopot és linkeld a backlog issue-kat. Pen-test után frissítsd a táblázatot és archiváld a jegyzetet dátummal.
