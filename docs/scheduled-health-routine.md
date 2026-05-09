# Ütemezett rendszerellenőrzési rutin — Fázis 5

Cél: **ismétlődő**, könnyen automatizálható ellenőrzés — különösen élesben — anélkül, hogy minden alkalommal manuális kattintás kellene.

## 1) HTTP health (kötelező minimum)

**Végpont:** `GET /api/health`  
**Várt JSON:** `status: "ok"`, `db: "ok"`.

### Beépített CLI (repo)

```bash
# Lokális (futtasd a szerver mellett):
npm run ops:health-check

# Éles / staging:
set HEALTHCHECK_URL=https://pelda.hu/api/health
npm run ops:health-check
```

| Változó | Leírás |
|---------|--------|
| `HEALTHCHECK_URL` | Teljes URL (pl. `https://…/api/health`). |
| `BASE_URL` | Ha nincs `HEALTHCHECK_URL`, erre fűzi az `/api/health`-t. |
| `HEALTHCHECK_TIMEOUT_MS` | Alap: `15000`. |

**Kilépési kód:** `0` = OK, `1` = hiba (nem elérhető, nem JSON, `db` nem ok).

## 2) Ütemezés (javaslat)

| Gyakoriság | Mit | Hol |
|------------|-----|-----|
| **5–15 perc** | `ops:health-check` vagy egyenértékű HTTP check | Hosting monitor / Uptime Kuma / Pingdom / load balancer |
| **Napi** | `npm run ops:backup-drill` vagy hosting backup integritás | CI vagy cron (lásd alább) |
| **Heti** | Részletes smoke (bejelentkezés, egy admin művelet olvasás) | QA / üzemeltetés — [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) §6 |

### CI (GitHub / GitLab)

A pipeline **`test`** szakaszában a migráció után lefut a **`ops:backup-drill`** (szigorú mód), így minden merge előtt ellenőrzött a helyreállítási út SQLite-on.

Éles **cron** példa (Linux):

```cron
*/10 * * * * cd /opt/hok-web && HEALTHCHECK_URL=https://example.org/api/health /usr/bin/npm run ops:health-check || alert-script.sh
```

*(Az `npm` elérési út és az alert a környezethez igazítandó.)*

## 3) Kapcsolódó dokumentumok

- [`alerting-rules.md`](./alerting-rules.md) — mikor riasszunk
- [`incident-debug.md`](./incident-debug.md) — hiba esén triage
- [`backup-restore-drill.md`](./backup-restore-drill.md) — DR drill
