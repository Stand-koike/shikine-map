#Requires -Version 5.1
<#
.SYNOPSIS
  Create local folder layout for Shikine festival map (Windows).

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\local-kit\windows\Setup-LocalFesMap.ps1 `
    -BasePath "C:\Users\vagab\Desktop\Stand\01.案件\フェスマップ"
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$BasePath
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $BasePath)) {
    New-Item -ItemType Directory -Force -Path $BasePath | Out-Null
}

$RepoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not (Test-Path -LiteralPath (Join-Path $RepoRoot 'web\index.html'))) {
    $RepoRoot = Join-Path $BasePath 'shikine-map'
}
if (-not (Test-Path -LiteralPath (Join-Path $RepoRoot 'web\index.html'))) {
    throw "shikine-map not found. Clone repo to: $BasePath\shikine-map"
}

$dirs = @(
    $BasePath,
    (Join-Path $BasePath 'qgis\source'),
    (Join-Path $BasePath 'qgis\export'),
    (Join-Path $BasePath 'secrets')
)
foreach ($d in $dirs) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
}

$template = Join-Path $PSScriptRoot 'secrets\secrets.local.js.template'
$webSecrets = Join-Path $RepoRoot 'web\secrets.local.js'
if ((Test-Path -LiteralPath $template) -and -not (Test-Path -LiteralPath $webSecrets)) {
    Copy-Item -LiteralPath $template -Destination $webSecrets
    Write-Host "Created $webSecrets (edit MAPBOX_TOKEN and SHEET_ID)"
}

$backupSecrets = Join-Path $BasePath 'secrets\secrets.local.js'
if (Test-Path -LiteralPath $webSecrets) {
    Copy-Item -LiteralPath $webSecrets -Destination $backupSecrets -Force
}

$readme = Join-Path $BasePath 'README-local.txt'
$readmeBody = @(
    'Shikine festival map - local workspace'
    'Docs: shikine-map\local-kit\windows\フェスマップ_ローカル構築.md'
    "Start: powershell -ExecutionPolicy Bypass -File shikine-map\local-kit\windows\Start-Map.ps1 -BasePath `"$BasePath`""
) -join [Environment]::NewLine
Set-Content -LiteralPath $readme -Value $readmeBody -Encoding UTF8

$qgisReadme = Join-Path $BasePath 'qgis\source\PUT-QGIS-FILES-HERE.txt'
$qgisBody = @(
    'Copy into this folder (qgis\source):'
    '  - illustration PNG'
    '  - *.points (Georeferencer)'
    '  - 4point.csv'
    '  - point.csv'
    ''
    'Export GeoTIFF to: qgis\export\park_4326.tif (EPSG:4326)'
) -join [Environment]::NewLine
Set-Content -LiteralPath $qgisReadme -Value $qgisBody -Encoding UTF8

$exportReadme = Join-Path $BasePath 'qgis\export\README.txt'
$exportBody = @(
    'Save QGIS export as park_4326.tif (EPSG:4326 WGS84).'
    ''
    'Then run:'
    "  powershell -ExecutionPolicy Bypass -File shikine-map\local-kit\windows\tools\Import-GeoTiff.ps1 -GeoTiff `"$BasePath\qgis\export\park_4326.tif`" -WebRoot `"$RepoRoot\web`""
) -join [Environment]::NewLine
Set-Content -LiteralPath $exportReadme -Value $exportBody -Encoding UTF8

Write-Host ''
Write-Host "OK: $BasePath"
Write-Host "Repo: $RepoRoot"
Write-Host 'Next: edit web\secrets.local.js then Start-Map.ps1'
