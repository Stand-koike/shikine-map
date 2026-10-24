#Requires -Version 5.1
# Fallback when Node/npx fails. Python 3 required.
param(
    [Parameter(Mandatory = $true)]
    [string]$BasePath,
    [int]$Port = 3000
)

$ErrorActionPreference = 'Stop'

$RepoRoot = Join-Path $BasePath 'shikine-map'
$WebRoot = Join-Path $RepoRoot 'web'
if (-not (Test-Path -LiteralPath (Join-Path $WebRoot 'index.html'))) {
    throw "web folder not found: $WebRoot"
}

$py = Get-Command python -ErrorAction SilentlyContinue
if (-not $py) {
    $py = Get-Command py -ErrorAction SilentlyContinue
    if ($py) {
        Set-Location -LiteralPath $WebRoot
        Write-Host "URL: http://localhost:$Port"
        Write-Host 'Keep this window OPEN. Ctrl+C to stop.'
        & py -3 -m http.server $Port
        exit 0
    }
    throw 'Python 3 not found. Install Node.js or Python 3.'
}

Set-Location -LiteralPath $WebRoot
Write-Host "URL: http://localhost:$Port"
Write-Host 'Keep this window OPEN. Ctrl+C to stop.'
& python -m http.server $Port
