# Синхронизация HTML из канона extracted/ в laravel/public/site/ (один источник правды для разметки).
# Запуск из корня репозитория:  powershell -ExecutionPolicy Bypass -File scripts/sync-site-html.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$src = Join-Path $root "extracted"
$dst = Join-Path $root "laravel\public\site"

if (-not (Test-Path $src)) {
    Write-Error "Not found: $src"
}
New-Item -ItemType Directory -Force -Path $dst | Out-Null

Get-ChildItem -Path $src -Filter "*.html" -Recurse | ForEach-Object {
    $rel = $_.FullName.Substring($src.Length).TrimStart("\", "/")
    $target = Join-Path $dst $rel
    $dir = Split-Path -Parent $target
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Copy-Item -LiteralPath $_.FullName -Destination $target -Force
    Write-Host "OK $rel"
}

Write-Host "Done. HTML copied to $dst"
