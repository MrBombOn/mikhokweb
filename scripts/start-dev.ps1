#Requires -Version 5.1
<#
.SYNOPSIS
  PTE MIK HÖK Web – fejlesztői (teszt) indítás: migráció, seed, Next.js dev szerver.

.DESCRIPTION
  - A szkript könyvtárából automatikusan a repo gyökerébe vált.
  - Ellenőrzi a Node / npm jelenlétét.
  - Ha nincs .env.local, másolja a .env.example fájlból (AUTH_SECRET ellenőrzés figyelmeztetés).
  - npm ci → prisma migrate → seed → next dev
  - A dev szerver előtérben fut; leállítás: Ctrl+C ebben az ablakban.

.PARAMETER SkipSeed
  Ne futtassa a prisma seed-et (gyorsabb újraindítás).

.PARAMETER SkipMigrate
  Ne futtassa a prisma migrate dev-et.

.PARAMETER Port
  Next dev port (alapértelmezett: 3000).

.EXAMPLE
  .\scripts\start-dev.ps1
  .\scripts\start-dev.ps1 -SkipSeed
  .\scripts\start-dev.ps1 -Port 3001
#>

[CmdletBinding()]
param(
  [switch] $SkipSeed,
  [switch] $SkipMigrate,
  [int] $Port = 3000
)

$ErrorActionPreference = 'Stop'

function Write-Banner {
  param([string]$Text)
  Write-Host ''
  Write-Host ('=' * 72) -ForegroundColor DarkCyan
  Write-Host "  $Text" -ForegroundColor Cyan
  Write-Host ('=' * 72) -ForegroundColor DarkCyan
  Write-Host ''
}

function Write-Step { param([string]$Msg) Write-Host "[*] $Msg" -ForegroundColor Cyan }
function Write-Ok { param([string]$Msg) Write-Host "[OK] $Msg" -ForegroundColor Green }
function Write-Warn { param([string]$Msg) Write-Host "[!] $Msg" -ForegroundColor Yellow }
function Write-Info { param([string]$Msg) Write-Host "    $Msg" -ForegroundColor Gray }

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Resolve-Path (Join-Path $ScriptDir '..')
Set-Location -LiteralPath $RepoRoot

Write-Banner 'PTE MIK HÖK Web — FEJLESZTŐI (TESZT) INDÍTÁS'

Write-Host 'Repo gyökér:' -NoNewline
Write-Host " $RepoRoot" -ForegroundColor White
Write-Host 'Mód:          ' -NoNewline
Write-Host 'development (next dev)' -ForegroundColor Yellow
Write-Host 'Cél URL:      ' -NoNewline
Write-Host "http://localhost:$Port" -ForegroundColor Green
Write-Host ''

# --- Előfeltételek ---
Write-Step 'Node.js és npm ellenőrzése...'
try {
  $nodeV = node -v 2>$null
  $npmV = npm -v 2>$null
  if (-not $nodeV -or -not $npmV) { throw 'node vagy npm nem található a PATH-on.' }
  Write-Ok "node $nodeV | npm $npmV"
} catch {
  Write-Warn 'Telepítsd a Node.js LTS verziót: https://nodejs.org/'
  throw $_
}

# --- .env.local ---
$envLocal = Join-Path $RepoRoot '.env.local'
$envExample = Join-Path $RepoRoot '.env.example'
if (-not (Test-Path -LiteralPath $envLocal)) {
  if (Test-Path -LiteralPath $envExample) {
    Write-Warn '.env.local hiányzik — másolás .env.example → .env.local'
    Copy-Item -LiteralPath $envExample -Destination $envLocal
    Write-Ok 'Létrejött a .env.local. Ellenőrizd benne az AUTH_SECRET-et (min. 32 karakter éleshez; devhez is érdemes).'
  } else {
    Write-Warn 'Nincs .env.example — hozd létre kézzel a .env.local fájlt (DATABASE_URL, AUTH_SECRET).'
  }
} else {
  Write-Ok '.env.local megtalálva.'
}

Write-Info 'Next.js a .env.local-t tölti be fejlesztésben.'
Write-Info 'DATABASE_URL példa devhez: file:./dev.db (lásd .env.example)'

# --- npm ci ---
Write-Step 'Függőségek telepítése (npm ci)...'
npm ci
if ($LASTEXITCODE -ne 0) { throw 'npm ci sikertelen.' }
Write-Ok 'node_modules rendben.'

# --- Prisma ---
if (-not $SkipMigrate) {
  Write-Step 'Adatbázis migráció (npm run db:migrate → prisma migrate dev)...'
  npm run db:migrate
  if ($LASTEXITCODE -ne 0) { throw 'db:migrate sikertelen. Nézd meg a DATABASE_URL-t a .env.local-ban.' }
  Write-Ok 'Migráció lefutott.'
} else {
  Write-Warn 'Migráció kihagyva (-SkipMigrate).'
}

if (-not $SkipSeed) {
  Write-Step 'Seed adatok (npm run db:seed)...'
  npm run db:seed
  if ($LASTEXITCODE -ne 0) { throw 'db:seed sikertelen.' }
  Write-Ok 'Seed kész (upsert — biztonságosan újrafuttatható).'
} else {
  Write-Warn 'Seed kihagyva (-SkipSeed).'
}

# --- Összegzés indulás előtt ---
Write-Banner 'DEV SZERVER INDÍTÁSA'
Write-Host 'Parancs: ' -NoNewline -ForegroundColor Gray
Write-Host "npm run dev -- -p $Port" -ForegroundColor White
Write-Host ''
Write-Host 'Hogyan éred el:' -ForegroundColor Cyan
Write-Host "  • Böngésző: http://localhost:$Port" -ForegroundColor Green
Write-Host ''
Write-Host 'Hogyan állítsd le:' -ForegroundColor Cyan
Write-Host '  • Ebben a PowerShell ablakban: Ctrl+C (egyszer vagy kétszer, amíg le nem áll).' -ForegroundColor Yellow
Write-Host '  • Ha beragadt a 3000-es port: keresd meg a PID-et, majd állítsd le:' -ForegroundColor Yellow
Write-Host "      netstat -ano | findstr :$Port" -ForegroundColor DarkGray
Write-Host '      taskkill /PID <pid> /F' -ForegroundColor DarkGray
Write-Host ''
Write-Host 'További teszt parancsok (másik terminálban, ugyanitt a repo gyökérben):' -ForegroundColor Cyan
Write-Host '  npm run lint' -ForegroundColor White
Write-Host '  npm run test' -ForegroundColor White
Write-Host '  npm run build   (prod build előnézet lokálisan)' -ForegroundColor White
Write-Host ''
Write-Host 'A szerver naplói az alábbi soroktól jelennek meg (élő kimenet).' -ForegroundColor DarkGray
Write-Host ('-' * 72) -ForegroundColor DarkGray
Write-Host ''

# --- next dev (előtérben) ---
$env:NODE_ENV = 'development'
npm run dev -- -p $Port
$exit = $LASTEXITCODE

Write-Host ''
Write-Host ('-' * 72) -ForegroundColor DarkGray
if ($exit -eq 0 -or $exit -eq $null) {
  Write-Ok 'A dev szerver normálisan leállt.'
} else {
  Write-Warn "A dev szerver kilépési kódja: $exit"
}
Write-Host 'Kész.' -ForegroundColor Gray
exit $exit
