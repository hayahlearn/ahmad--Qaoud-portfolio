#!/bin/bash

# ==========================================
# Cockpit Proxy Fix Script
# ==========================================

echo "🔧 Configuring Cockpit to trust Nginx Proxy..."

# Create or Overwrite cockpit.conf
mkdir -p /etc/cockpit
cat > /etc/cockpit/cockpit.conf <<EOF
[WebService]
Origins = https://app.valuemaker.cloud
ProtocolHeader = X-Forwarded-Proto
AllowUnencrypted = true
EOF

echo "🔄 Restarting Cockpit..."
systemctl restart cockpit

echo "✅ Cockpit Configuration Fixed!"
