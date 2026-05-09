# Indító szkriptek (Windows PowerShell)

Mindkét szkript a **repo gyökeréhez** visz relatív útvonalból, és részletesen kiírja a lépéseket, URL-t, leállítást.

## Fejlesztői (teszt) – localhost

```powershell
cd f:\WEB\source\pte-mik-hok-web
powershell -ExecutionPolicy Bypass -File .\scripts\start-dev.ps1
```

Vagy npm-ből (ugyanaz a szkript):

```powershell
npm run start:dev:ps1
```

Opciók:

```powershell
.\scripts\start-dev.ps1 -SkipSeed      # seed nélkül
.\scripts\start-dev.ps1 -SkipMigrate   # migráció nélkül
.\scripts\start-dev.ps1 -Port 3001
```

- Ha nincs `.env.local`, a szkript létrehozza `.env.example` alapján.
- Leállítás: **Ctrl+C** a futó ablakban.

## Éles (production build + start)

```powershell
cd f:\WEB\source\pte-mik-hok-web
powershell -ExecutionPolicy Bypass -File .\scripts\start-prod.ps1
```

```powershell
npm run start:prod:ps1
```

```powershell
.\scripts\start-prod.ps1 -Port 8080
.\scripts\start-prod.ps1 -SkipInstall  # ha épp lefutott az npm ci
```

- **Nem** futtat migrációt és **nem** futtat seedet — éles deploy folyamatban ezek külön lépések.
- Előtte állítsd be a szerveren a megfelelő env változókat (`DATABASE_URL`, `AUTH_SECRET`, stb.).
- Leállítás: **Ctrl+C**.

## Megjegyzés

Ha a végrehajtási policy tiltja a szkriptet, használd a fenti `powershell -ExecutionPolicy Bypass -File ...` formát, vagy egyszeri sessionre:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
