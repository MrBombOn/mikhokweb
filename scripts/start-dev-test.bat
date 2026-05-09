@echo off
setlocal EnableExtensions
cd /d "%~dp0.."

rem UTF-8 kimenet (magyar ékezetek az üzenetekben)
chcp 65001 >nul 2>&1

echo ========================================================================
echo   PTE MIK HÖK Web — teszt / fejlesztői indítás (next dev)
echo ========================================================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [HIBA] A Node.js nem található a PATH-on. Telepítsd: https://nodejs.org/
  exit /b 1
)

if not exist ".env.local" (
  if exist ".env.example" (
    echo [!] A .env.local hiányzik — másolás: .env.example → .env.local
    copy /Y ".env.example" ".env.local" >nul
    echo [OK] Létrejött a .env.local. Ellenőrizd az AUTH_SECRET-et (min. 32 karakter éleshez).
  ) else (
    echo [!] Nincs .env.example — hozd létre kézzel a .env.local fájlt (DATABASE_URL, AUTH_SECRET).
  )
) else (
  echo [OK] A .env.local megvan.
)

echo [*] Függőségek: npm ci...
call npm ci
if errorlevel 1 (
  echo [HIBA] Az npm ci sikertelen volt.
  exit /b 1
)

echo [*] Adatbázis migráció (npm run db:migrate)...
call npm run db:migrate
if errorlevel 1 (
  echo [HIBA] A migráció sikertelen. Nézd meg a DATABASE_URL-t a .env.local-ban.
  exit /b 1
)

echo [*] Seed (npm run db:seed)...
call npm run db:seed
if errorlevel 1 (
  echo [HIBA] A seed sikertelen.
  exit /b 1
)

echo.
echo ========================================================================
echo   Next.js fejlesztői szerver — http://localhost:3000
echo   Leállítás: Ctrl+C ebben az ablakban
echo ========================================================================
echo.

set "NODE_ENV=development"
call npm run dev

set "EXITCODE=%ERRORLEVEL%"
echo.
if "%EXITCODE%"=="0" echo [OK] A szerver normálisan leállt.
if not "%EXITCODE%"=="0" echo [!] Kilépési kód: %EXITCODE%
exit /b %EXITCODE%
