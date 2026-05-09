# Web Project Launcher (.exe)

Altalanos, Windows-os GUI launcher barmilyen Node/Next webprojekthez.

## Cél

- Ne kelljen `.bat`-ot szerkeszteni vagy külön terminálokat nyitni.
- Egy helyen legyen:
  - projektmappa kiválasztás,
  - indítás/leállítás,
  - lépések (install/generate/migrate/seed),
  - élő konzol log,
  - téma és olvashatóság.

## Hol van az exe?

- Build után: `launcher/dist/WebProjectLauncher.exe` (a projekt `AssemblyName`-je; a korábbi **`HokWebLauncher.exe`** név elavult — ha még létezik a `dist` mappában, töröld a teljes `launcher/dist` könyvtárat, majd fordíts újra.)

## Fordítás

Futtasd:

```bat
launcher\build-launcher.bat
```

Szükséges: .NET SDK 9 (`dotnet --version`).

## Funkciók

- **Projekt mappa** tallózás
- **Host/Port** beállítás
- **Indítás előtti lépések**:
  - `npm install`
  - `npx prisma generate`
  - `npm run db:migrate`
  - `npm run db:seed`
- **Dev szerver indítás** (`npm run dev -- --hostname ... --port ...`)
- **Leállítás** (`taskkill /PID ... /T /F`)
- **Automatikus böngészőnyitás**
- **Progress bar** az indítási folyamatra
- **Állapotkijelzés** (NEM FUT / INDUL / FUT)

## Konzol és karakterek

A launcher kimenetkezelése UTF-8-ra állított, ezért:

- a korábban megjelenő „ismeretlen karakterek” csökkennek/megszűnnek,
- a tipikus Next/Node kimenet olvashatóbb.

Az indított folyamatoknál a launcher `chcp 65001`-et és UTF-8 redirectet használ.

## Színes log + témák

A log panel ANSI színkódokat értelmez, és több téma választható:

- PowerShell
- Dark
- Light
- Amber

## Mappaszerkezet (launcher)

- `launcher/HokWebLauncher/HokWebLauncher.csproj` - WinForms projekt
- `launcher/HokWebLauncher/Program.cs` - teljes GUI + process orchestration
- `launcher/build-launcher.bat` - build helper
- `launcher/dist/` - elkészült exe

## Megjegyzés

Ha build közben „file is locked” warning jön, zárd be a futó launcher példányt, és futtasd újra a buildet.

A **`launcher/dist`**, **`HokWebLauncher/bin`** és **`HokWebLauncher/obj`** könyvtárak **nem** részei a forrásnak: a `launcher/.gitignore` kizárja őket. Régi / részleges buildek takarítása: töröld ezt a három mappát, majd futtasd a `build-launcher.bat`-ot.
