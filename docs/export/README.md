# Dokumentáció PDF export

A Markdown fájlokból **külön PDF** állítható elő magyar fájlnevekkel (lásd `scripts/docs/pdf-title-overrides.json`).

## Parancs

```bash
npm run docs:pdf
```

Gyors próba (első 3 fájl): `set DOCS_PDF_MAX=3&& npm run docs:pdf` (Windows CMD) vagy PowerShell: `$env:DOCS_PDF_MAX=3; npm run docs:pdf`.

Az első futtatáskor a **Puppeteer / Chromium** letöltése hosszabb lehet. A kimenet: `docs/export/pdf/` (a mappa a `.gitignore`-ban van — nem kerül fel a repóba, hogy ne növelje a klónozást).

## Kimenet

- Minden `docs/**/*.md` (kivéve az `export/` alatti) egy-egy **PDF**.
- Automatikus táblázat: `docs/export/pdf/_INDEX.md` (melyik `.md` melyik `.pdf`).

## Követelmények

- Node.js ugyanaz, mint a projektnek.
- Hálózat: Chromium letöltéshez (corporate proxy esetén állítsd a `HTTPS_PROXY` változót).

Ha egy fájl konverziója hibázik (pl. túl nagy táblázat), a script végén hibaszámot ad; a részletek a konzolon látszanak.
