#Requires -Version 5.1
param(
    [Parameter(Mandatory = $true)]
    [string]$BasePath,
    [int]$Port = 3000
)

$ErrorActionPreference = 'Stop'

$RepoRoot = Join-Path $BasePath 'shikine-map'
if (-not (Test-Path -LiteralPath (Join-Path $RepoRoot 'web\index.html'))) {
    $RepoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
}
$WebRoot = Join-Path $RepoRoot 'web'
if (-not (Test-Path -LiteralPath (Join-Path $WebRoot 'index.html'))) {
    throw "web folder not found: $WebRoot"
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host 'ERROR: Node.js is not installed.'
    Write-Host 'Install LTS from https://nodejs.org/ then open a NEW PowerShell window.'
    Write-Host 'Or run: Start-Map-Python.ps1 (needs Python 3)'
    exit 1
}

Write-Host "Node: $(node -v)"
Write-Host "Web root: $WebRoot"
Write-Host "URL: http://localhost:$Port"
Write-Host ''
Write-Host 'IMPORTANT: Keep this window OPEN while using the map. Ctrl+C to stop.'
Write-Host ''

Set-Location -LiteralPath $WebRoot
npx --yes serve . -l $Port
