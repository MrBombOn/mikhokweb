@echo off
setlocal EnableExtensions EnableDelayedExpansion

echo [SNAPSHOT] Starting snapshot generation...
echo [SNAPSHOT] Running PowerShell script...

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0make_weblap_snapshot_max_precision.ps1"
set "EXITCODE=%ERRORLEVEL%"

if "%EXITCODE%"=="0" (
  echo [SNAPSHOT] SUCCESS: weblap.md generated correctly.
  echo [SNAPSHOT] Next step: send the generated weblap.md back here.
) else (
  echo [SNAPSHOT] ERROR: Snapshot generation failed with exit code %EXITCODE%.
  echo [SNAPSHOT] Check the PowerShell output above for the exact failing stage.
)

pause
exit /b %EXITCODE%