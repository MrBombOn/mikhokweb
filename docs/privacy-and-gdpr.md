# Adatvédelem, GDPR és retention (Fázis 12)

## Publikus tájékoztató

- Oldal: `/privacy` (HU/EN a globális nyelvváltóval).
- Süti sáv: alsó rögzített banner — választás: „Csak szükséges” / „Elfogadom”, link az adatvédelem oldalra.

## Belső fiókok (OFFICE / ADMIN)

- **Export:** Admin → Felhasználók → **Export (JSON)**. Tartalom: profil meta (jelszó hash nélkül), kalkulátor állapot, mentett nézetek, értesítések, audit sorok ahol a felhasználó szereplő, hozzárendelt visszajelzések.
- **Törlés:** **Fiók törlése** — tiltva, ha ez lenne az **utolsó ADMIN** (403/400 + üzenet).
- API: `docs/api.md` (`/api/admin/privacy/...`).

## Vendég visszajelzések

- A `FeedbackSubmission` táblában tárolt üzenet + opcionális email.
- Teljes automatizált „export/törlés kérelem” workflow jogi egyeztetés után bővíthető; addig manuális folyamat (SQL / admin eszköz) dokumentálható az üzemeltetőnek.

## Retention végrehajtás

- Konfiguráció: `/admin/retention`, `GET/PATCH /api/admin/retention` — lásd `docs/retention-settings.md`.
- Batch törlés: `npm run ops:retention-prune` — törli a lejárt `AuditLog` és `FeedbackSubmission` sorokat a `RetentionConfig` napjai alapján.
- Száraz futás: `RETENTION_PRUNE_DRY_RUN=1 npm run ops:retention-prune` (csak számláló a kimenetben).
- **Megjegyzés:** strukturált request logok nincsenek Prisma táblában — a `requestLogDays` mező a host log rotációjára utal.

## Jogi disclaimer

Ez a dokumentum **műszaki** összefoglaló; nem helyettesíti a kari adatkezelési tájékoztatót / szerződéseket.
