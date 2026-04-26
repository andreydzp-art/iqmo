# Тонкая Windows-обёртка над scripts/sync-site.mjs. Рекомендуемый путь — node-скрипт
# (он же работает в CI/Linux). Запуск из корня репозитория:
#   powershell -ExecutionPolicy Bypass -File scripts/sync-site-html.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$mjs = Join-Path $root "scripts/sync-site.mjs"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is required. Install Node 18+ and re-run."
}

Push-Location $root
try {
    node $mjs
} finally {
    Pop-Location
}
