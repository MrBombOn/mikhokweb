# DR / BCP és go-back runbook (§12 Fázis 20)

Egy helyen: **RTO/RPO célok**, éves helyreállítási gyakorlat, **egyszerűsített chaos / failover** (DB read-only), valamint **go-live / go-back** lépések és **feature flag + üzemeltetési kill switch** táblázat.

**Kapcsolódó:** [`recovery-checklist.md`](./recovery-checklist.md), [`backup-restore-drill.md`](./backup-restore-drill.md), [`go-live-checklist.md`](./go-live-checklist.md), [`media-object-storage-dr.md`](./media-object-storage-dr.md), [`incident-debug.md`](./incident-debug.md), [`incident-communication-templates.md`](./incident-communication-templates.md).

---

## 1) RTO / RPO célértékek (szervezeti egyeztetés szükséges)

Az alábbi értékek **induló javaslatok** a portál jellegéhez (tartalom + admin, nem valós idejű pénzügyi core). A vezetőség / üzemeltetés **rögzítse** a végleges számokat és a mentési ablakot.

| Metrika | Javasolt induló cél | Megjegyzés |
|--------|----------------------|------------|
| **RPO** (max elfogadható adatvesztés) | **24 óra** (napi DB backup + tranzakciós napló stratégia külön egyeztetés) | Ha van folyamatos WAL archiválás / PITR, az RPO csökkenthető. |
| **RTO** (szolgáltatás újra elfogadható szinten) | **4 óra** (P1: olvasható publikus minimum) / **24 óra** (teljes funkció + admin írások) | „Minimum” = statikus / CDN cache vagy karbantartó oldal + egészségüzenet is lehet. |
| **Fájlok (feltöltések)** | Ugyanaz az RPO mint az objektumtár **verziózott** backupjaihoz igazítva | S3: versioning + lifecycle; helyi `public/uploads`: host szintű snapshot. Lásd [`media-object-storage-dr.md`](./media-object-storage-dr.md). |
| **Konfig / titkok** | RTO része: **újra deploy** + titoktár visszaállítás | Ne csak DB-re tervezz; `AUTH_SECRET`, SMTP, S3 kulcsok, feature flag env-ek. |

**Éves DR gyakorlat (kötelező javasolt minimum):**

1. **DB:** `npm run ops:backup-drill` (nem `light` mód éleshez hasonló környezetben) — [`backup-restore-drill.md`](./backup-restore-drill.md).
2. **Fájlok:** S3 / MinIO esetén `npm run ops:s3-upload-inventory` + minta objektum letöltés / helyreállítási próba — [`media-object-storage-dr.md`](./media-object-storage-dr.md).
3. **Alkalmazás:** stagingen **előző image / előző git SHA** deploy + `prisma migrate deploy` ellenőrzés.
4. **Lezárás:** [`recovery-checklist.md`](./recovery-checklist.md) kitöltése + rövid jegyzőkönyv (dátum, résztvevők, eltérések az RTO/RPO-tól).

---

## 2) Chaos / failover – egyszerűsített változat (PostgreSQL read-only)

**Cél:** tudni, mi történik, ha az adatbázis **csak olvasható** (lemez tele, szolgáltató karbantartás, explicit `default_transaction_read_only = on`).

| Terület | Várható viselkedés |
|--------|---------------------|
| **Olvasás** | A cache-elt / statikus oldalak részben működhetnek; minden **Prisma read** hibára fut, ha a pool nem kap kapcsolatot. |
| **Írások** | Hír / esemény / foglalás / bejelentkezés utáni session store stb. **hibával** elhasal (5xx vagy alkalmazás szintű hiba). |
| **`GET /api/health`** | Ha a health DB-t pingel, **`db` nem ok** állapot várható — riasztás triggerelhető ([`alerting-rules.md`](./alerting-rules.md)). |
| **Mitigáció üzemeltetői oldalon** | Reverse proxy / CDN: **karbantartó oldal** + HTTP 503 rövid szöveg; forgalom csökkítése; DB írhatóság visszaállítása. |

**Gyakorlat menete (staging):** DB felhasználó ideiglenesen read-only jogosultságra; 15 perc megfigyelés (health, login, egy publikus GET, egy admin POST); visszaállítás; RCA sablon: [`incident-debug.md`](./incident-debug.md).

---

## 3) Go-live / go-back egy oldalon

### 3.1 Go-live (rövid sorrend)

1. Merge utolsó zöld pipeline: `npm run lint`, `npm run test`, `npm run build` (és szervezeti szabály szerint `ops:release-checklist` / `ops:smoke-gate`).
2. Titkok a **host titoktárában**; migráció: `prisma migrate deploy` a deploy lépésben.
3. DNS / TLS ellenőrzés — részletek: [`go-live-checklist.md`](./go-live-checklist.md).
4. Deploy után: `GET /api/health`, publikus főoldal, egy admin bejelentkezés, opcionálisan `npm run test:e2e:prod-smoke` — [`synthetic-monitoring.md`](./synthetic-monitoring.md).

### 3.2 Go-back (rollback)

| Lépés | Teendő |
|-------|--------|
| 1 | **Állítsd le** az új forgalást (opcionális maintenance mode a proxy-n). |
| 2 | **Deploy az előző stabil artifact-ra** (előző konténer image / előző git tag SHA). |
| 3 | **Migráció:** ha az új verzió **új migrációt** hozott és hibás, egyeztetett módon: vagy **forward fix** deploy, vagy DB restore **előző backupból** (RPO figyelem!) + migráció állapot ellenőrzés. Ne „kézzel visszagörgesd” a migrációt productionben dokumentáció nélkül. |
| 4 | **Kill switch** (lásd §4): gyors kockázatcsökkentés (Builder canary, demo fallback, partner read API, stb.). |
| 5 | [`recovery-checklist.md`](./recovery-checklist.md) smoke + kommunikáció. |

---

## 4) Kill switch táblázat (feature flag + gyakori env)

### 4.1 Alkalmazás feature flag-ek (`/admin/feature-flags` + env)

Forrás: [`lib/feature-flags/registry.ts`](../lib/feature-flags/registry.ts).

| Kulcs | Env (master) | Rollout env | Gyors „leállítás” |
|-------|----------------|---------------|-------------------|
| `officeHistoryPanel` | `FF_OFFICE_HISTORY_PANEL` | — | `0` vagy admin UI kikapcsolás |
| `calculatorReadonlyShare` | `FF_CALCULATOR_READONLY_SHARE` | — | `0` |
| `galleryUploadPipeline` | `FF_GALLERY_UPLOAD_PIPELINE` | — | `0` |
| `guidesAttachmentUpload` | `FF_GUIDES_ATTACHMENT_UPLOAD` | — | `0` |
| `lighthouseCiGate` | `FF_LIGHTHOUSE_CI_GATE` | — | csak CI/releasere vonatkozik tipikusan |
| `siteBuilderV2Canary` | `FF_SITE_BUILDER_V2_CANARY` | `FF_SITE_BUILDER_V2_CANARY_ROLLOUT` | `FF_SITE_BUILDER_V2_CANARY=0` **vagy** rollout `0` |

### 4.2 Üzemeltetési / integrációs kapcsolók (`.env.example` szerint)

| Cél | Env / művelet |
|-----|----------------|
| Demó tartalom kikapcsolása | `ALLOW_DEMO_FALLBACK` ne legyen `1` élesben |
| Partner read API kikapcsolása | `PUBLIC_READ_API_KEY` üres / eltávolítva |
| Booking email | `BOOKING_EMAIL_ENABLED=0` |
| Staff / booking / feedback webhook | illető `*_WEBHOOK_URL` üres |
| Retention törlés szárazon | `RETENTION_PRUNE_DRY_RUN=1` |
| Éles Playwright smoke CI | `PRODUCTION_SMOKE_ENABLED` / workflow titkok — lásd [`synthetic-monitoring.md`](./synthetic-monitoring.md) |

---

## 5) Kimenet

Vezetőség és üzemeltetés számára: **mérhető** RTO/RPO, **évente bizonyított** visszaállítás (DB + fájl + deploy), és **ismert** go-back + kill switch útvonal — nem csak reaktív incidenskezelés.
