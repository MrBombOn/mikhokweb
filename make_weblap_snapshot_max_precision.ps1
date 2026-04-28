param(
  [string]$Root = (Get-Location).Path,
  [string]$Output = (Join-Path (Get-Location).Path 'weblap.md')
)

$ErrorActionPreference = 'Stop'
$ExcludeDirs = @('node_modules', '.next', 'dist', 'out', 'coverage', '.git')
$ExcludeFiles = @('weblap.md')

function Write-Stage([string]$Message) { Write-Host "[SNAPSHOT] $Message" }

function Get-RelativePath {
  param([string]$Base, [string]$Full)
  $baseFull = [System.IO.Path]::GetFullPath($Base).TrimEnd('\','/') + [System.IO.Path]::DirectorySeparatorChar
  $fullFull = [System.IO.Path]::GetFullPath($Full)
  if ($fullFull.StartsWith($baseFull, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $fullFull.Substring($baseFull.Length)
  }
  return $fullFull
}

function Get-Sha256Hex {
  param([byte[]]$Bytes)
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    return (($sha.ComputeHash($Bytes) | ForEach-Object { $_.ToString('x2') }) -join '')
  }
  finally {
    $sha.Dispose()
  }
}

function Is-BinaryFile {
  param([byte[]]$Bytes)
  $limit = [Math]::Min($Bytes.Length, 4096)
  for ($i = 0; $i -lt $limit; $i++) {
    if ($Bytes[$i] -eq 0) { return $true }
  }
  return $false
}

Write-Stage 'Scanning project root'
$rootFull = [System.IO.Path]::GetFullPath($Root)

$files = Get-ChildItem -LiteralPath $rootFull -Recurse -File -Force | Where-Object {
  $rel = Get-RelativePath -Base $rootFull -Full $_.FullName

  if ($ExcludeFiles -contains $_.Name) { return $false }

  foreach ($d in $ExcludeDirs) {
    if ($rel -match "(^|[\\/])$([regex]::Escape($d))([\\/]|$)") {
      return $false
    }
  }

  return $true
} | Sort-Object FullName

Write-Stage "Found $($files.Count) files"

$dirs = New-Object System.Collections.Generic.HashSet[string]
foreach ($f in $files) {
  $rel = (Get-RelativePath -Base $rootFull -Full $f.FullName) -replace '/', '\'
  $parts = $rel -split '\\'
  if ($parts.Count -gt 1) {
    for ($i = 0; $i -lt $parts.Count - 1; $i++) {
      [void]$dirs.Add(($parts[0..$i] -join '\'))
    }
  }
}

$dirList = @($dirs)

$out = New-Object System.Collections.Generic.List[string]
$out.Add('# WEBLAP PROJECT SNAPSHOT')
$out.Add('')
$out.Add("PROJECT_NAME: $(Split-Path -Leaf $rootFull)")
$out.Add('PROJECT_VERSION: 27.3')
$out.Add('PROJECT_TAG: snapshot')
$out.Add("ROOT: $rootFull")
$out.Add("GENERATED_UTC: $([DateTime]::UtcNow.ToString('o'))")
$out.Add("FILE_COUNT: $($files.Count)")
$out.Add('BINARY_BASE64_ENABLED: True')
$out.Add('MAX_BASE64_BYTES: 5242880')
$out.Add('')
$out.Add('## FOLDER_STRUCTURE')
$out.Add('```text')
$out.Add('.')

foreach ($d in ($dirList | Sort-Object)) {
  $out.Add('.\' + $d)
}

foreach ($f in $files) {
  $out.Add('.\' + ((Get-RelativePath -Base $rootFull -Full $f.FullName) -replace '/', '\'))
}

$out.Add('```')
$out.Add('')
$out.Add('## FILE_RECORDS')
$out.Add('')

$index = 0
foreach ($f in $files) {
  $index++
  $rel = Get-RelativePath -Base $rootFull -Full $f.FullName
  Write-Stage "Reading file $index / $($files.Count): $rel"

  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  $sha = Get-Sha256Hex -Bytes $bytes
  $binary = Is-BinaryFile -Bytes $bytes
  $mode = if ($binary -or $bytes.Length -gt 5242880) { 'base64' } else { 'text' }
  $lang = [System.IO.Path]::GetExtension($f.Name).TrimStart('.')

  $out.Add('===== BEGIN FILE RECORD =====')
  $out.Add("PATH: \$rel")
  $out.Add("NAME: $($f.Name)")
  $out.Add("SIZE: $($bytes.Length)")
  $out.Add("SHA256: $sha")
  $out.Add("BINARY: $binary")
  $out.Add("LANG: $lang")
  $out.Add("CREATED_UTC: $([DateTime]::SpecifyKind($f.CreationTimeUtc, [DateTimeKind]::Utc).ToString('o'))")
  $out.Add("MODIFIED_UTC: $([DateTime]::SpecifyKind($f.LastWriteTimeUtc, [DateTimeKind]::Utc).ToString('o'))")
  $out.Add("ACCESSED_UTC: $([DateTime]::SpecifyKind($f.LastAccessTimeUtc, [DateTimeKind]::Utc).ToString('o'))")
  $out.Add('ATTRIBUTES: Archive')
  $out.Add('')
  $out.Add("CONTENT_MODE: $mode")
  $out.Add('```')

  if ($mode -eq 'base64') {
    $out.Add([Convert]::ToBase64String($bytes, [System.Base64FormattingOptions]::InsertLineBreaks))
  }
  else {
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)
    $text = $text -replace "`r`n", "`n"
    $out.Add($text)
  }

  $out.Add('```')
  $out.Add('===== END FILE RECORD =====')
  $out.Add('')
}

Write-Stage 'Writing markdown output'
[System.IO.File]::WriteAllText($Output, ($out -join "`r`n"), [System.Text.UTF8Encoding]::new($false))
Write-Host "[SNAPSHOT] SUCCESS: Snapshot written to $Output"