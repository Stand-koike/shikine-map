#Requires -Version 5.1
param(
    [string]$BasePath = "C:\Users\vagab\Desktop\Stand\01.案件\フェスマップ"
)

$ErrorActionPreference = "Continue"
$repo = Join-Path $BasePath "shikine-map"
$checks = @(
    @{ Name = "作業ルート"; Path = $BasePath },
    @{ Name = "README_ローカル"; Path = (Join-Path $BasePath "README_ローカル.txt") },
    @{ Name = "qgis\source"; Path = (Join-Path $BasePath "qgis\source") },
    @{ Name = "qgis\export"; Path = (Join-Path $BasePath "qgis\export") },
    @{ Name = "secrets"; Path = (Join-Path $BasePath "secrets") },
    @{ Name = "web\index.html"; Path = (Join-Path $repo "web\index.html") },
    @{ Name = "Start-Map.ps1"; Path = (Join-Path $repo "local-kit\windows\Start-Map.ps1") },
    @{ Name = "Setup-LocalFesMap.ps1"; Path = (Join-Path $repo "local-kit\windows\Setup-LocalFesMap.ps1") },
    @{ Name = "web\secrets.local.js"; Path = (Join-Path $repo "web\secrets.local.js") }
)

Write-Host "BasePath: $BasePath"
Write-Host ""
$ok = 0
foreach ($c in $checks) {
    $exists = Test-Path -LiteralPath $c.Path
    if ($exists) { $ok++ }
    Write-Host ("[{0}] {1}" -f $(if ($exists) { "OK" } else { "--" }), $c.Name)
}
Write-Host ""
Write-Host "$ok / $($checks.Count) OK"
if ($ok -lt $checks.Count) {
    Write-Host "Fix: powershell -ExecutionPolicy Bypass -File `"$repo\local-kit\windows\Setup-LocalFesMap.ps1`" -BasePath `"$BasePath`""
}
