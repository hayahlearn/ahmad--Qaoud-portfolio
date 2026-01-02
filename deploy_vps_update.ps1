$ErrorActionPreference = "Stop"

# --- SOVEREIGN CONFIGURATION (HIDDEN) ---
$vpsUser = "root"
$vpsHost = "valuemaker.cloud"
$vpsPass = "Hayahahmed@2030"
# ----------------------------------------

Write-Host "🦅 Sovereign Deployment Operator - Initializing..." -ForegroundColor Cyan
Write-Host "---------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "Target: $vpsUser@$vpsHost" -ForegroundColor Gray

# Auto-copy password to clipboard
Set-Clipboard -Value $vpsPass
Write-Host "`n� Password has been copied to your clipboard!" -ForegroundColor Green
Write-Host "👉 Just RIGHT-CLICK in the prompt to paste it when asked." -ForegroundColor Green
Write-Host "---------------------------------------------------------------" -ForegroundColor Cyan

# Command string to execute on server
$commands = "
echo '👉 [1/4] Starting Update Sequence...';
cd /var/www/valuemaker.cloud || exit 1;

echo '⬇️  [2/4] Fetching latest security code from GitHub...';
git fetch --all;
git reset --hard origin/master;

echo '🔨 [3/4] Building Frontend (this may take a minute)...';
cd frontend;
npm install;
npm run build;

echo '🔄 [4/4] Restarting Web Server...';
systemctl restart nginx;

echo '✅ Deployment Complete! The system is now secure.';
"

# Execute SSH
ssh -t $vpsUser@$vpsHost $commands

Write-Host "`n✨ Operation Completed Successfully." -ForegroundColor Green
Pause
