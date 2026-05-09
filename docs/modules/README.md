# Modul dokumentáció (réteg C – Fázis 5)

Egy fájl ≈ egy **felhasználói modul** vagy jól elkülönített **publikus felület**: mit csinál, melyik útvonalon él, mely fájlok a belépési pontok, milyen API-kat hív.

**DoD (Fázis 5):** legalább hat modul a mesterütemterv listájából — jelenleg **11** lefedett fájl a táblázatban; **réteg D** (auth / CSRF / edge): [`security-walkthrough.md`](../security-walkthrough.md); **réteg E** (laikus linkek): [`laikus-kodmagyarazo.md`](../laikus-kodmagyarazo.md) §7.

| Modul | Fájl |
|--------|------|
| Rólunk | [`about.md`](./about.md) |
| Naptár (UI + foglalások) | [`calendar.md`](./calendar.md) |
| Naptári események (domain + API) | [`events.md`](./events.md) |
| Kalkulátor | [`calculator.md`](./calculator.md) |
| Galéria | [`gallery.md`](./gallery.md) |
| Útmutatók | [`guides.md`](./guides.md) |
| Hírek | [`news.md`](./news.md) |
| Iroda | [`office.md`](./office.md) |
| Keresés | [`search.md`](./search.md) |
| Adatvédelem / süti szöveg | [`privacy.md`](./privacy.md) |
| Publikus állapot (`/status`) | [`status.md`](./status.md) |

**Rétegek összefoglalója:** `docs/phased-master-plan.md` → Fázis 5 táblázat (A–E). **Réteg B** (API + Zod): `docs/api.md`, `lib/validation/*`. **Biztonsági séta (D):** [`docs/security-walkthrough.md`](../security-walkthrough.md).

**LCP / kép (Fázis 10):** [`about.md`](./about.md), [`gallery.md`](./gallery.md) + [`lighthouse-baseline.md`](../lighthouse-baseline.md).
