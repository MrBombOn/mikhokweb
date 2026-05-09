@echo off
setlocal
set "LAUNCHER_ROOT=%~dp0"
if "%LAUNCHER_ROOT:~-1%"=="\" set "LAUNCHER_ROOT=%LAUNCHER_ROOT:~0,-1%"
set "PROJ=%LAUNCHER_ROOT%\HokWebLauncher\HokWebLauncher.csproj"
set "OUT=%LAUNCHER_ROOT%\dist"

echo Building GUI launcher...
dotnet publish "%PROJ%" -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true -o "%OUT%"
if errorlevel 1 (
  echo Build failed.
  exit /b 1
)

echo.
echo Launcher kesz:
echo   %OUT%\WebProjectLauncher.exe
echo.
exit /b 0
