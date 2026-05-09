#Requires -Version 5.1
<#
.SYNOPSIS
  PTE MIK HÖK Web – éles (production) build és indítás: next build + next start.

.DESCRIPTION
  - NEM futtat seedet és NEM futtat migrate dev-et (éles környezetben ezeket külön CI/CD vagy kézi deploy lépéshez szokás).
  - Beállítja NODE_ENV=production a build és start előtt.
  - A Next.js éles szerver előtérben fut; leállítás: Ctrl+C.

.PARAMETER Port
  Port (alapértelmezett: 3000). A Next.js a PORT környezeti változót is figyelembe veheti.

.PARAMETER SkipInstall
  Ne futtasson npm ci-t (ha épp most telepítettél).

.EXAMPLE
  .\scripts\start-prod.ps1
  .\scripts\start-prod.ps1 -Port 8080
#>

[CmdletBinding()]
param(
  [int] $Port = 3000,
  [switch] $SkipInstall
)

$ErrorActionPreference = 'Stop'

function Write-Banner {
  param([string]$Text)
  Write-Host ''
  Write-Host ('=' * 72) -ForegroundColor DarkRed
  Write-Host "  $Text" -ForegroundColor Yellow
  Write-Host ('=' * 72) -ForegroundColor DarkRed
  Write-Host ''
}

function Write-Step { param([string]$Msg) Write-Host "[*] $Msg" -ForegroundColor Cyan }
function Write-Ok { param([string]$Msg) Write-Host "[OK] $Msg" -ForegroundColor Green }
function Write-Warn { param([string]$Msg) Write-Host "[!] $Msg" -ForegroundColor Yellow }
function Write-Info { param([string]$Msg) Write-Host "    $Msg" -ForegroundColor Gray }

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Resolve-Path (Join-Path $ScriptDir '..')
Set-Location -LiteralPath $RepoRoot

Write-Banner 'PTE MIK HÖK Web — ÉLES (PRODUCTION) BUILD + INDÍTÁS'

Write-Host 'Repo gyökér:' -NoNewline
Write-Host " $RepoRoot" -ForegroundColor White
Write-Host 'Mód:          ' -NoNewline
Write-Host 'production (next build + next start)' -ForegroundColor Yellow
Write-Host ''

# --- Figyelmeztetések éleshez ---
Write-Warn 'Ellenőrizd a környezetet ÉLES futtatás előtt:'
Write-Info '  • DATABASE_URL — PostgreSQL (éles). A repo Prisma sémája devhez SQLite-ra van állítva; éleshez állítsd át a providert + URL-t.'
Write-Info '  • AUTH_SECRET — legalább 32 erős karakter (kötelező élesben).'
Write-Info '  • Next.js: .env.production a build időben, .env.local is olvasható — dokumentáld, mit hol adsz meg a szerveren.'
Write-Info '  • Migráció élesen: npx prisma migrate deploy (általában CI vagy kézi deploy lépés, nem ez a szkript).'
Write-Info '  • Seed: csak kontrollált környezetben (npm run db:seed); élesen ne futtasd véletlenül demó jelszavakkal.'
Write-Host ''

# --- Előfeltételek ---
Write-Step 'Node.js és npm ellenőrzése...'
try {
  $nodeV = node -v 2>$null
  $npmV = npm -v 2>$null
  if (-not $nodeV -or -not $npmV) { throw 'node vagy npm nem található.' }
  Write-Ok "node $nodeV | npm $npmV"
} catch {
  Write-Warn 'Telepítsd a Node.js LTS verziót: https://nodejs.org/'
  throw $_
}

$envProd = Join-Path $RepoRoot '.env.production'
$envLocal = Join-Path $RepoRoot '.env.local'
if (-not (Test-Path -LiteralPath $envProd) -and -not (Test-Path -LiteralPath $envLocal)) {
  Write-Warn 'Nincs .env.production és .env.local sem — a build alapértelmezett env nélkül mehet; élesen szinte mindig kell env fájl.'
}

# --- npm ci ---
if (-not $SkipInstall) {
  Write-Step 'Függőségek (npm ci)...'
  npm ci
  if ($LASTEXITCODE -ne 0) { throw 'npm ci sikertelen.' }
  Write-Ok 'node_modules rendben.'
} else {
  Write-Warn 'npm ci kihagyva (-SkipInstall).'
}

# --- Build ---
Write-Step 'Production build (npm run build)...'
$env:NODE_ENV = 'production'
npm run build
if ($LASTEXITCODE -ne 0) { throw 'next build sikertelen.' }
Write-Ok 'Build kész (.next mappa).'

# --- Start előtti összegzés ---
Write-Banner 'ÉLES SZERVER INDÍTÁSA (next start)'
$env:PORT = "$Port"
$env:NODE_ENV = 'production'

Write-Host 'Port:         ' -NoNewline
Write-Host $Port -ForegroundColor Green
Write-Host 'URL (helyi):  ' -NoNewline
Write-Host "http://localhost:$Port" -ForegroundColor Green
Write-Host '              Ha a szerver máshol fut, add meg a gépet / domaint a tűzfal és reverse proxy szerint.' -ForegroundColor Gray
Write-Host ''
Write-Host 'Hogyan állítsd le:' -ForegroundColor Cyan
Write-Host '  • Ebben az ablakban: Ctrl+C' -ForegroundColor Yellow
Write-Host "  • Port felszabadítás: netstat -ano | findstr :$Port  →  taskkill /PID <pid> /F" -ForegroundColor DarkGray
Write-Host ''
Write-Host 'Élő szerver napló:' -ForegroundColor DarkGray
Write-Host ('-' * 72) -ForegroundColor DarkGray
Write-Host ''

npm run start -- -p $Port
$exit = $LASTEXITCODE

Write-Host ''
Write-Host ('-' * 72) -ForegroundColor DarkGray
if ($exit -eq 0 -or $exit -eq $null) {
  Write-Ok 'A production szerver leállt.'
} else {
  Write-Warn "Kilépési kód: $exit"
}
exit $exit
