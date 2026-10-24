#Requires -Version 5.1
param(
    [Parameter(Mandatory = $true)]
    [string]$BasePath
)

$ErrorActionPreference = 'Continue'
$repo = Join-Path $BasePath 'shikine-map'
$checks = @(
    @{ Name = 'base folder'; Path = $BasePath },
    @{ Name = 'README-local.txt'; Path = (Join-Path $BasePath 'README-local.txt') },
    @{ Name = 'qgis\source'; Path = (Join-Path $BasePath 'qgis\source') },
    @{ Name = 'qgis\export'; Path = (Join-Path $BasePath 'qgis\export') },
    @{ Name = 'secrets'; Path = (Join-Path $BasePath 'secrets') },
    @{ Name = 'web\index.html'; Path = (Join-Path $repo 'web\index.html') },
    @{ Name = 'Start-Map.ps1'; Path = (Join-Path $repo 'local-kit\windows\Start-Map.ps1') },
    @{ Name = 'Setup-LocalFesMap.ps1'; Path = (Join-Path $repo 'local-kit\windows\Setup-LocalFesMap.ps1') },
    @{ Name = 'web\secrets.local.js'; Path = (Join-Path $repo 'web\secrets.local.js') }
)

Write-Host "BasePath: $BasePath"
Write-Host ''
$ok = 0
foreach ($c in $checks) {
    $exists = Test-Path -LiteralPath $c.Path
    if ($exists) { $ok++ }
    $mark = if ($exists) { 'OK' } else { '--' }
    Write-Host "[$mark] $($c.Name)"
}
Write-Host ''
Write-Host "$ok / $($checks.Count) OK"
if ($ok -lt $checks.Count) {
    Write-Host "Run Setup:"
    Write-Host "  powershell -ExecutionPolicy Bypass -File `"$repo\local-kit\windows\Setup-LocalFesMap.ps1`" -BasePath `"$BasePath`""
}
