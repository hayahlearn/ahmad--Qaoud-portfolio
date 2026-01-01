#!/bin/bash

# ==========================================
# Automated Update Script for Ahmad Qaoud Portfolio
# ==========================================

APP_DIR="/var/www/valuemaker.cloud"

echo "🚀 Starting Update Process..."

# 1. Pull latest code
cd $APP_DIR
echo "📥 Pulling latest changes from GitHub..."
git pull origin master

# 2. Build Frontend
echo "🏗️ Building Frontend..."
cd frontend
npm install
npm run build

# 3. Reload Nginx (Optional, just to be safe)
echo "cx🔄 Reloading Web Server..."
systemctl reload nginx

echo "✅ Update Complete! Your changes are live."
