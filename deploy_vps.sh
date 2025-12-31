#!/bin/bash

# ==========================================
# Automated Deployment Script for Ahmad Qaoud Portfolio
# Target: Hostinger VPS (KVM2) - Ubuntu/Debian
# ==========================================

# Configuration
DOMAIN="valuemaker.net"
REPO_URL="https://github.com/hayahlearn/ahmad--Qaoud-portfolio.git"
APP_DIR="/var/www/$DOMAIN"
NGINX_CONFIG="/etc/nginx/sites-available/$DOMAIN"

# Text Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Deployment for $DOMAIN ===${NC}"

# 1. System Update
echo -e "${GREEN}[1/7] Updating System Packages...${NC}"
apt update && apt upgrade -y

# 2. Install Essentials (Git, Nginx, Curl)
echo -e "${GREEN}[2/7] Installing Git, Nginx, Curl...${NC}"
apt install -y git nginx curl

# 3. Install Node.js (v20 LTS)
echo -e "${GREEN}[3/7] Installing Node.js v20...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
else
    echo "Node.js is already installed: $(node -v)"
fi

# 4. Directory Structure (Clean Architecture)
echo -e "${GREEN}[4/7] Setting up Directory Structure...${NC}"
if [ -d "$APP_DIR" ]; then
    echo "Directory exists. Pulling latest changes..."
    cd $APP_DIR
    git pull origin master
else
    echo "Cloning repository..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# 5. Build Application
echo -e "${GREEN}[5/7] Installing Dependencies & Building...${NC}"
npm install
npm run build

# 6. Configure Nginx
echo -e "${GREEN}[6/7] Configuring Nginx Web Server...${NC}"
cat > $NGINX_CONFIG <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    root $APP_DIR/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public";
    }
}
EOF

# Enable Site
ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# 7. SSL Setup (Certbot)
echo -e "${GREEN}[7/7] Checking for SSL (Certbot)...${NC}"
if ! command -v certbot &> /dev/null; then
    apt install -y certbot python3-certbot-nginx
fi

echo -e "${BLUE}=== Deployment Complete! ===${NC}"
echo -e "Next Step: Run 'certbot --nginx -d $DOMAIN -d www.$DOMAIN' to enable HTTPS."
