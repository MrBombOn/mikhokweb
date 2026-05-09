# ESLint CLI (`eslint .`) a `next lint` helyett — Fázis 9

## Miért

A Next.js **deprecated** a `next lint` parancsot; a **Next 16**-tól eltávolítás várható. A hivatalos irány: a projekt gyökerében futtatott **ESLint CLI** ugyanazzal a flat configgal (`eslint.config.mjs`), mint eddig.

Hivatalos migrációs eszköz (interaktív / sablon frissítés):  
`npx @next/codemod@canary next-lint-to-eslint-cli .`  
(lásd [Next.js — ESLint](https://nextjs.org/docs/app/building-your-application/configuring/eslint) és a codemod lista.)

Ebben a repóban a lépések **kézzel** lettek alkalmazva (ekvivalens a codemod `lint` + ignore kimenetével).

## Mit változtattunk

| Elem | Tartalom |
|------|----------|
| `package.json` → `scripts.lint` | `next lint` → **`eslint .`** |
| `eslint.config.mjs` | **`globalIgnores()`** (`eslint/config`) — `**/.next/**`, `node_modules`, `out`, `build`, stb. A puszta `{ ignores: [...] }` blokk + `FlatCompat` mellett a `.next` néha mégis bejárásra került (generált `require()` → több ezer hiba). |
| `eslint.config.mjs` | **`**/*.cjs`** override: `@typescript-eslint/no-require-imports` kikapcsolva (CommonJS segédek, pl. `scripts/prisma-env.cjs`). |
| `eslint.config.mjs` | `export default` helyett **`eslintConfig` konstans** + export (elkerüli az `import/no-anonymous-default-export` figyelmeztetést a config fájlra). |

## CI és lokális futtatás

- **GitHub Actions** és **GitLab CI** továbbra is `npm run lint`-et hív — nem kellett külön parancsot módosítani.
- Lokálisan: `npm run lint` (ugyanaz, mint a CI).

## Tippek

- Ha a `.next` mégis lintelődik: ellenőrizd, hogy a config **`globalIgnores`**-t használjon (nem csak lapos `{ ignores }` blokkot a `FlatCompat` előtt).
- A **`next build`** továbbra is futtat típusellenőrzést a saját pipeline-jában; ez nem helyettesíti a `eslint`-et, de kiegészíti.

---

## DoD — Fázis 9 lezárás (ellenőrző lista)

- [ ] `package.json` → `"lint": "eslint ."` (nem `next lint`).
- [ ] `eslint.config.mjs` — `globalIgnores` a generált mappákra; `**/*.cjs` override ahol kell.
- [ ] **CI:** `.github/workflows/ci.yml` és `.gitlab-ci.yml` — `npm run lint` (változatlan scriptnév).
- [ ] Lokálisan és CI-ben: `npm run lint` zöld; release előtt: `npm run typecheck`, `npm run test`, `npm run build` (Fázis 0 DoD).

**Verzió jellegű megjegyzés (2026-05):** `eslint` ^9.x + `eslint-config-next` a `package.json` devDependencies-ben — Next major bumpnál kövesd a [Next ESLint](https://nextjs.org/docs/app/building-your-application/configuring/eslint) oldalt.

**Mesterütemterv:** [`phased-master-plan.md`](./phased-master-plan.md) → Fázis 9.
