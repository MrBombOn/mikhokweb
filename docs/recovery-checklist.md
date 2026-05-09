# Recovery checklist (helyreállítás) — Fázis 5

Használd **éles / staging incidens** vagy **DR gyakorlat** után. Pipáld a sorokat a jegyzőkönyvben (ticket / wiki).

**Szélesebb DR/BCP keret (RTO/RPO, éves gyakorlat, read-only chaos, kill switch):** [`dr-bcp-phase20.md`](./dr-bcp-phase20.md).

## 0) Azonnali tények (5 perc)

- [ ] **Incidens időpontja** (UTC + helyi) és **érintett környezet** (prod / staging) rögzítve.
- [ ] **Döntés:** teljes szolgáltatás kiesés (P1) vs részleges (P2–P4) — lásd [`incident-debug.md`](./incident-debug.md).
- [ ] **Kommunikáció:** belső csatorna + (ha kell) külső szöveg — sablonok: [`incident-communication-templates.md`](./incident-communication-templates.md).

## 1) Alkalmazás és függőségek

- [ ] **Hosting / konténer** újraindítás vagy előző **stabil image** visszaállítása dokumentálva.
- [ ] **`DATABASE_URL`**, **`AUTH_SECRET`**, egyéb titkok a várható értéken (titoktár vs rossz rollout).
- [ ] Legutóbbi **`npm run build`** / deploy commit azonosítója (git SHA) rögzítve.

## 2) Adatbázis

- [ ] **Mentés** időpontja és forrása (automatikus backup / manuális snapshot) azonosítva.
- [ ] Visszaállítás **nem éles** próbán előre validálva (lásd [`backup-restore-drill.md`](./backup-restore-drill.md)), vagy kontrollált éles restore jóváhagyással.
- [ ] Visszaállítás után: `npx prisma migrate deploy` (vagy üzemeltetési egyenérték) **hibamentesen**.
- [ ] **Séma vs kód:** deployolt alkalmazás verziója egyezik a migrációkkal (ne maradjon le új deploy).

## 3) Fájlok (feltöltések)

- [ ] Ha a hoston volt **`public/uploads/**`**, szükség szerint **fájlmentés** visszaállítva (guides / gallery), vagy tudatosan elfogadott adatvesztés dokumentálva.

## 4) Funkcionális smoke (min.)

- [ ] `GET /api/health` → `status: ok`, `db: ok`.
- [ ] Publikus főoldal + egy modul (pl. hírek / naptár).
- [ ] **Bejelentkezés** (OFFICE vagy ADMIN) + egy **olvasható** admin nézet.
- [ ] Kritikus írás **csak** akkor, ha szándékos: pl. teszt rekord törlése.

## 5) Megfigyelhetőség

- [ ] **Logok** / Sentry: új hibaspike megszűnt-e.
- [ ] **Riasztások** visszaállítva (nem marad „néma” állapot) — [`alerting-rules.md`](./alerting-rules.md).

## 6) Lezárás

- [ ] **RCA** rövid összefoglaló (ok, detektálás, javítás, megelőzés).
- [ ] **`docs/progress-log.md`** bejegyzés, ha a javítás kódot / folyamatot változtatott.

---

*Kapcsolódó: [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) §5–7.*
