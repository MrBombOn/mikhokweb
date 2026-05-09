# Backup / restore drill (Fázis 5)

Cél: **bizonyítani**, hogy a DB mentésből visszaállított példány olvasható, és (szigorú módban) a **`prisma migrate deploy`** lefut a helyreállított adatbázison.

## Automatizált parancs

```bash
npm run ops:backup-drill
```

- Betölti a `.env` és `.env.local` fájlokat (ugyanúgy, mint a Prisma scriptek).
- **SQLite** (`DATABASE_URL` = `file:…`): másolat készül a `.ops/backup-drill/` mappába, majd ellenőrzés.
- **PostgreSQL**: ha a `pg_dump` elérhető a `PATH`-on, tömörített dump készül. Opcionális: `BACKUP_DRILL_RESTORE_URL` — eldobható, üres adatbázis URL-je; ekkor `pg_restore` + ugyanaz az ellenőrzési sor, mint SQLite-nál.

### Módok

| `BACKUP_DRILL_MODE` | Viselkedés |
|---------------------|------------|
| *(üres, alapértelmezés)* | `migrate deploy` + `migrate status` + `SELECT 1` a **másolaton** / visszaállított DB-n |
| `light` | Csak fájl másolat + `SELECT 1` (ha a forrás DB-ben hibás / félbemaradt migráció van, gyors olvashatóság-teszt) |

**CI / éles drill:** ne használd a `light` módot; a forrás DB-nek konzisztens migrációs állapotúnak kell lennie.

### Környezeti változók

| Változó | Leírás |
|---------|--------|
| `DATABASE_URL` | Kötelező (forrás DB). |
| `BACKUP_DRILL_DIR` | Kimenet mappa (alap: `.ops/backup-drill`). |
| `BACKUP_DRILL_RESTORE_URL` | PostgreSQL: visszaállítási cél URL (`pg_restore` után). |
| `BACKUP_DRILL_MODE` | `light` opcionálisan. |

### SQLite: `dev.db` helye

Ha a `DATABASE_URL` `file:./dev.db`, de a fájl ténylegesen `prisma/dev.db`, a script **egyszer figyelmeztet**, és a meglévő `prisma/dev.db`-t használja (csak ha a fájlnév `dev.db`). Érdemes a `DATABASE_URL`-t a tényleges útvonalra igazítani (lásd [`.env.example`](../.env.example)).

## PostgreSQL kézi visszaállítás (összefoglaló)

1. Üres adatbázis létrehozása (vagy eldobható példány).
2. `pg_restore --dbname "<URL>" --clean --if-exists backup.dump` (formátum: `pg_dump -Fc`).
3. `DATABASE_URL=<visszaállított>` mellett: `npx prisma migrate deploy`.
4. Smoke: `GET /api/health`, admin bejelentkezés (lásd [`recovery-checklist.md`](./recovery-checklist.md)).

Részletes helyreállítási lépések: [`recovery-checklist.md`](./recovery-checklist.md).

## Kapcsolódó

- [`go-live-checklist.md`](./go-live-checklist.md) §4 — backup / restore feladatok
- [`scheduled-health-routine.md`](./scheduled-health-routine.md) — ütemezett ellenőrzés
