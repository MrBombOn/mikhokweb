# Web Project Launcher (Windows, .NET 9)

Általános **WinForms** indító **bármely npm-alapú** webprojekthez (Next.js, Vite, CRA, stb.): projektmappa, előlépések (telepítés, Prisma, migráció, seed, lint, typecheck, unit teszt, production build, E2E), majd **dev szerver** egy gombbal.

## Cél

- Ne kelljen kézzel sorban futtatni a parancsokat új klónozás / gép után.
- **Másik repóhoz** elég a `web-launcher.json` (lásd lent) + opcionálisan a `web-launcher.example.json` másolata.
- **Teljes ellenőrzéshez** pipáld be: lint, typecheck, test, build, E2E (a `package.json`-ban létező `scripts` alapján engedélyeződnek).

## Hol van az exe?

- Build után: `launcher/dist/WebProjectLauncher.exe`
- A projekt **AssemblyName**-je: `WebProjectLauncher` (a régi `HokWebLauncher.exe` név elavult).

## Fordítás

```bat
launcher\build-launcher.bat
```

Szükséges: **.NET SDK 9** (`dotnet --version`).

## Projektprofil: `web-launcher.json` (opcionális, a webprojekt gyökerében)

A launcher a kiválasztott mappában megkeresi a **`web-launcher.json`** fájlt. Ha nincs, alapértelmezett parancsok és kapcsolók érvényesek.

Más projekthez:

1. Másold a repo gyökerében lévő **`web-launcher.example.json`** fájlt `web-launcher.json` néven a **célprojekt** gyökerébe (ahol a `package.json` van).
2. Igazítsd a `steps` objektumban a **parancsokat** (pl. `npm run dev` Vite esetén más flag kellhet).
3. A **`devCommand`** mezőben a `{host}` és `{port}` helyőrzők behelyettesítődnek.

Példa mezők:

| Mező | Jelentés |
|--------|-----------|
| `displayName` | Csak infó; az abalcím része lehet. |
| `windowTitle` | Ha megadod, ez lesz az ablak címe. |
| `devCommand` | Dev szerver parancs sablonja. |
| `steps` | Kulcs: `npm-ci`, `npm-install`, `prisma-generate`, `db-migrate`, `db-seed`, `lint`, `typecheck`, `test`, `build`, `e2e`. Minden lépéshez: `command`, `defaultOn`. |

**Prisma** lépések (`prisma-generate`, `db-migrate`, `db-seed`) csak akkor engedélyezhetők a felületen, ha létezik a `prisma/schema.prisma`.

**npm script** lépések (`db-migrate`, `db-seed`, `lint`, …) csak akkor választhatók, ha a `package.json` `scripts` szekciójában megvan a megfelelő név (pl. `lint`).

## Felület

- **Projekt és lépések** fül: mappa, host, port, téma, pipák (telepítés, Prisma, DB, minőség, böngésző, telemetry).
- **Haladó** fül: **dev parancs** szerkesztése (pl. más framework), visszaállítás gomb.

**npm ci** és **npm install** egyszerre ne legyen bepipálva — a launcher figyelmeztet.

## Tipikus „új gép, teljes kör” sorrend

1. `npm ci` (vagy `npm install`)
2. Prisma generate (ha van séma)
3. `db:migrate` + `db:seed` (ha kell tesztadat)
4. Opcionálisan: `lint` → `typecheck` → `test` → `build` → `test:e2e`
5. `npm run dev` (a `devCommand` sablon szerint)

Az E2E sok projektnél **saját Playwright `webServer`**-t indít — ebben az esetben a dev szervert nem kell előtte külön elindítani. Ha a teszt konfig nálad másképp van, állítsd a `web-launcher.json` lépéseit.

## Konzol és témák

UTF-8 (`chcp 65001`), ANSI színek a logban, témák: PowerShell, Dark, Light, Amber.

## Mappaszerkezet (forrás)

- `launcher/HokWebLauncher/` — WinForms forrás (`Program.cs`, `.csproj`)
- `launcher/build-launcher.bat` — `dotnet publish` → `launcher/dist/`
- Gyökér: `web-launcher.json` (projekt-specifikus), `web-launcher.example.json` (sablon)

A **`launcher/dist`**, **`bin/`**, **`obj/`** build melléktermékek — a `launcher/.gitignore` kizárja őket a gitből.

## Megjegyzés

Build közben „file is locked” esetén zárd be a futó launcher példányt, majd fordíts újra.
