#Requires -Version 5.1
param(
    [Parameter(Mandatory = $false)]
    [string]$BasePath = "C:\Users\vagab\Desktop\Stand\01.案件\フェスマップ"
)

$ErrorActionPreference = "Stop"

$RepoRoot = Join-Path $BasePath "shikine-map"
if (-not (Test-Path (Join-Path $RepoRoot "web\index.html"))) {
    $RepoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
}
$WebRoot = Join-Path $RepoRoot "web"
if (-not (Test-Path (Join-Path $WebRoot "index.html"))) {
    throw "web folder not found: $WebRoot"
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js is required. Install from https://nodejs.org/"
}

Write-Host "Serving $WebRoot"
Write-Host "Open the URL shown below (usually http://localhost:3000)"
Set-Location $WebRoot
npx --yes serve .
