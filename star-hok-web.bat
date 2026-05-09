@echo off
setlocal EnableExtensions EnableDelayedExpansion
title STAR HOK WEB launcher

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"
set "PID_FILE=%ROOT_DIR%\.hok-web-server.pid"

set "HOST=127.0.0.1"
set "PORT=3000"

set "RUN_MIGRATIONS=1"
set "RUN_SEED=0"
set "OPEN_BROWSER=1"
set "DISABLE_TELEMETRY=1"
set "AUTO_INSTALL=0"
set "RUN_PRISMA_GENERATE=1"

:menu
cls
echo ==============================================
echo   STAR HOK WEB - indito es kezelo
echo ==============================================
echo.
echo Projekt mappa: %ROOT_DIR%
echo Lokal cim:     http://%HOST%:%PORT%
echo.
call :print_status
echo.
echo Beallitasok:
call :print_toggle "Migrate inditas elott" %RUN_MIGRATIONS%
call :print_toggle "Seed inditas elott" %RUN_SEED%
call :print_toggle "Bongeszo automatikus nyitas" %OPEN_BROWSER%
call :print_toggle "Next telemetry kikapcsolasa" %DISABLE_TELEMETRY%
call :print_toggle "npm install futtatasa" %AUTO_INSTALL%
call :print_toggle "Prisma generate futtatasa" %RUN_PRISMA_GENERATE%
echo.
echo Muveletek:
echo   1 - Weboldal inditasa
echo   2 - Leallitas
echo   3 - Migrate ki/be
echo   4 - Seed ki/be
echo   5 - Bongeszo nyitas ki/be
echo   6 - Telemetry ki/be
echo   7 - npm install ki/be
echo   8 - Prisma generate ki/be
echo   9 - Host/Port beallitas
echo   S - Status frissites
echo   Q - Kilepes
echo.
set "choice="
set /p "choice=Valasztas: "

if /i "%choice%"=="1" call :start_server
if /i "%choice%"=="2" call :stop_server
if /i "%choice%"=="3" call :toggle RUN_MIGRATIONS
if /i "%choice%"=="4" call :toggle RUN_SEED
if /i "%choice%"=="5" call :toggle OPEN_BROWSER
if /i "%choice%"=="6" call :toggle DISABLE_TELEMETRY
if /i "%choice%"=="7" call :toggle AUTO_INSTALL
if /i "%choice%"=="8" call :toggle RUN_PRISMA_GENERATE
if /i "%choice%"=="9" call :set_host_port
if /i "%choice%"=="S" goto menu
if /i "%choice%"=="Q" goto end

goto menu

:print_toggle
set "label=%~1"
set "value=%~2"
if "%value%"=="1" (
  echo   [ON ] %label%
) else (
  echo   [OFF] %label%
)
exit /b 0

:toggle
set "var_name=%~1"
for %%A in (!%var_name%!) do (
  if "%%A"=="1" (
    set "%var_name%=0"
  ) else (
    set "%var_name%=1"
  )
)
exit /b 0

:set_host_port
set "new_host="
set "new_port="
echo.
set /p "new_host=Host [%HOST%]: "
if not "%new_host%"=="" set "HOST=%new_host%"
set /p "new_port=Port [%PORT%]: "
if not "%new_port%"=="" set "PORT=%new_port%"
exit /b 0

:print_status
if not exist "%PID_FILE%" (
  echo Szerver allapot: NEM FUT
  exit /b 0
)

set /p SERVER_PID=<"%PID_FILE%"
if "%SERVER_PID%"=="" (
  echo Szerver allapot: NEM ISMERT (ures PID file)
  exit /b 0
)

powershell -NoProfile -Command "if (Get-Process -Id %SERVER_PID% -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }" >nul 2>nul
if errorlevel 1 (
  echo Szerver allapot: NEM FUT (stale PID: %SERVER_PID%)
) else (
  echo Szerver allapot: FUT (PID: %SERVER_PID%)
)
exit /b 0

:start_server
set "PUSHED=0"
call :is_running
if "%IS_RUNNING%"=="1" (
  echo.
  echo A szerver mar fut. Elobb allitsd le, vagy ne inditsd ujra.
  pause
  exit /b 0
)

pushd "%ROOT_DIR%" >nul 2>nul
if errorlevel 1 (
  echo HIBA: a projekt mappa nem talalhato: %ROOT_DIR%
  pause
  exit /b 1
)
set "PUSHED=1"
echo.
echo [1/4] Node/NPM ellenorzes...
where npm >nul 2>nul
if errorlevel 1 (
  echo HIBA: npm nem talalhato a PATH-ban.
  popd >nul
  pause
  exit /b 1
)

if "%AUTO_INSTALL%"=="1" (
  echo [2/4] npm install fut...
  call npm install
  if errorlevel 1 (
    echo HIBA: npm install sikertelen.
    if "%PUSHED%"=="1" popd >nul 2>nul
    pause
    exit /b 1
  )
)

if "%RUN_PRISMA_GENERATE%"=="1" (
  echo [3/4] Prisma generate fut...
  call npx prisma generate
  if errorlevel 1 (
    echo HIBA: prisma generate sikertelen.
    if "%PUSHED%"=="1" popd >nul 2>nul
    pause
    exit /b 1
  )
)

if "%RUN_MIGRATIONS%"=="1" (
  echo [4/4] Migraciok futtatasa...
  call npm run db:migrate
  if errorlevel 1 (
    echo HIBA: migracio sikertelen.
    if "%PUSHED%"=="1" popd >nul 2>nul
    pause
    exit /b 1
  )
)

if "%RUN_SEED%"=="1" (
  echo Seed futtatasa...
  call npm run db:seed
  if errorlevel 1 (
    echo HIBA: seed sikertelen.
    if "%PUSHED%"=="1" popd >nul 2>nul
    pause
    exit /b 1
  )
)

set "DEV_COMMAND=npm run dev -- --hostname %HOST% --port %PORT%"
if "%DISABLE_TELEMETRY%"=="1" (
  set "DEV_COMMAND=set NEXT_TELEMETRY_DISABLED=1&& %DEV_COMMAND%"
)

echo.
echo Webszerver inditasa kulon konzolban...
echo Inditasi mappa: %ROOT_DIR%
echo Inditasi parancs: %DEV_COMMAND%
powershell -NoProfile -Command "$p=Start-Process -FilePath 'cmd.exe' -WorkingDirectory '%ROOT_DIR%' -ArgumentList '/k','%DEV_COMMAND%' -PassThru; Set-Content -Path '%PID_FILE%' -Value $p.Id" >nul 2>nul
set "STARTED_PID="
if exist "%PID_FILE%" set /p STARTED_PID=<"%PID_FILE%"

if "%STARTED_PID%"=="" (
  echo HIBA: nem sikerult elinditani a dev szervert.
  if "%PUSHED%"=="1" popd >nul 2>nul
  pause
  exit /b 1
)

echo.
echo Sikeres inditas.
echo PID: %STARTED_PID%
echo Lokal cim: http://%HOST%:%PORT%
echo.
echo A szerver logjai a megnyilt kulon ablakban latszanak.
echo Hiba eseten ott fogod latni a reszleteket.

if "%OPEN_BROWSER%"=="1" (
  powershell -NoProfile -Command "Start-Process 'http://%HOST%:%PORT%'" >nul 2>nul
)

if "%PUSHED%"=="1" popd >nul 2>nul
pause
exit /b 0

:stop_server
call :is_running
if not "%IS_RUNNING%"=="1" (
  echo.
  echo Nincs futo szerver.
  if exist "%PID_FILE%" del /q "%PID_FILE%" >nul 2>nul
  pause
  exit /b 0
)

set /p SERVER_PID=<"%PID_FILE%"
echo.
echo Leallitas (PID: %SERVER_PID%)...
powershell -NoProfile -Command "Stop-Process -Id %SERVER_PID% -Force -ErrorAction SilentlyContinue"

timeout /t 1 >nul
call :is_running
if "%IS_RUNNING%"=="1" (
  echo FIGYELEM: a folyamat meg fut. Probald manualisan bezarni a szerver ablakot.
) else (
  echo Szerver leallitva.
  if exist "%PID_FILE%" del /q "%PID_FILE%" >nul 2>nul
)
pause
exit /b 0

:is_running
set "IS_RUNNING=0"
if not exist "%PID_FILE%" exit /b 0
set /p SERVER_PID=<"%PID_FILE%"
if "%SERVER_PID%"=="" exit /b 0
powershell -NoProfile -Command "if (Get-Process -Id %SERVER_PID% -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }" >nul 2>nul
if not errorlevel 1 set "IS_RUNNING=1"
exit /b 0

:end
echo Kilepes.
endlocal
exit /b 0
