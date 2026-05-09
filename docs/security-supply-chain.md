# Supply chain és SBOM (Fázis 16)

## Cél

Az `npm audit` eredményét **rendszeresen** rögzíteni, policy-t adni a registryre és a függőségek frissítésére — nem helyettesíti a SBOM generátort (pl. CycloneDX), de összhangban van az OWASP „dependency” irányelveivel.

## Parancsok

| Parancs | Leírás |
|---------|--------|
| `npm audit` | Gyors ellenőrzés a terminálban. |
| `npm run ops:audit-report` | JSON riport a `.ops/npm-audit-report.json` fájlba (mappa gitignore alatt). **CI:** GitHub Actions `test` job (artifact `npm-audit-report`, `continue-on-error`); GitLab `test` stage (artifact 14 nap). |
| `npm run ops:sbom` | CycloneDX **JSON** SBOM: `.ops/sbom.cdx.json` (spec 1.5; `npx @cyclonedx/cyclonedx-npm`). **CI:** GitHub `test` job (artifact `sbom-cdx`, `continue-on-error`); GitLab `test` stage artifact. |

## Policy (javasolt)

1. **Registry:** csak `https://registry.npmjs.org/` (vagy belső mirror); ne használj ismeretlen scoped registry-t ellenőrzés nélkül.
2. **Lockfile:** mindig commitold a `package-lock.json`-t; CI `npm ci`-vel épít.
3. **Pinning:** semver caret a library-knál OK; **kritikus** (auth, crypto) csomagoknál fontolj meg explicit verziót és gyakoribb review-t.
4. **Frissítés:** havonta `npm outdated` + security patch kör; breaking major csak külön PR-ben.
5. **npm audit „high”:** ne ignoráld tartósan; ha false positive, dokumentáld a `decision-log.md`-ben.

## SBOM (CycloneDX pipeline)

- **Repo parancs:** `npm run ops:sbom` → `.ops/sbom.cdx.json` (nagy fájl; ne commitold).
- **Beszállító / audit:** ugyanez a fájl exportálható; verziókövetéshez elég a **hash** (pl. SHA-256) a release jegyzőkönyvben.

## Kapcsolódó

- Függőség kockázat dashboard (repo): `npm run ops:dependency-risk` + `/admin/dependency-risk`
