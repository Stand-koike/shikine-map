#Requires -Version 5.1
<#
.SYNOPSIS
  敷根フェスマップの Windows ローカル作業フォルダを整備します。

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\local-kit\windows\Setup-LocalFesMap.ps1 `
    -BasePath "C:\Users\vagab\Desktop\Stand\01.案件\フェスマップ"
#>
param(
    [Parameter(Mandatory = $false)]
    [string]$BasePath = "C:\Users\vagab\Desktop\Stand\01.案件\フェスマップ"
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

$RepoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not (Test-Path (Join-Path $RepoRoot "web\index.html"))) {
    $RepoRoot = Get-Location
}

$dirs = @(
    $BasePath,
    (Join-Path $BasePath "qgis\source"),
    (Join-Path $BasePath "qgis\export"),
    (Join-Path $BasePath "secrets")
)
foreach ($d in $dirs) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
}

$template = Join-Path $PSScriptRoot "secrets\secrets.local.js.template"
$webSecrets = Join-Path $RepoRoot "web\secrets.local.js"
if ((Test-Path $template) -and -not (Test-Path $webSecrets)) {
    Copy-Item $template $webSecrets
    Write-Host "Created $webSecrets (edit MAPBOX_TOKEN and SHEET_ID)"
}

$backupSecrets = Join-Path $BasePath "secrets\secrets.local.js"
if (Test-Path $webSecrets) {
    Copy-Item $webSecrets $backupSecrets -Force
}

$readme = Join-Path $BasePath "README_ローカル.txt"
@"
敷根フェスマップ ローカル作業ルート
詳細: shikine-map\local-kit\windows\フェスマップ_ローカル構築.md

起動: powershell -File shikine-map\local-kit\windows\Start-Map.ps1 -BasePath "$BasePath"
"@ | Set-Content -Path $readme -Encoding UTF8

$qgisReadme = Join-Path $BasePath "qgis\source\ここにQGIS元データ.txt"
@"
次をこのフォルダ (qgis\source) に置いてください:
  - イラスト PNG
  - *.points (Georeferencer)
  - 4point.csv
  - point.csv

書き出し GeoTIFF は qgis\export\park_4326.tif
"@ | Set-Content -Path $qgisReadme -Encoding UTF8

$exportReadme = Join-Path $BasePath "qgis\export\README.txt"
@"
QGIS で EPSG:4326 の GeoTIFF を park_4326.tif として保存。

反映:
  powershell -File shikine-map\local-kit\windows\tools\Import-GeoTiff.ps1 `
    -GeoTiff "$BasePath\qgis\export\park_4326.tif" `
    -WebRoot "$RepoRoot\web"
"@ | Set-Content -Path $exportReadme -Encoding UTF8

Write-Host ""
Write-Host "OK: $BasePath"
Write-Host "Repo: $RepoRoot"
Write-Host "Next: edit web\secrets.local.js then Start-Map.ps1"
