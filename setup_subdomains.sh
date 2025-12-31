#!/bin/bash

# ==========================================
# Subdomains Setup Script (ops & app)
# ==========================================

# 1. Install Cockpit (Server Dashboard)
echo "Installing Cockpit..."
apt update
apt install -y cockpit
systemctl start cockpit
systemctl enable cockpit

# 2. Configure 'ops.valuemaker.cloud' (n8n)
echo "Configuring ops.valuemaker.cloud (n8n)..."
cat > /etc/nginx/sites-available/ops.valuemaker.cloud <<'EOF'
server {
    server_name ops.valuemaker.cloud;

    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
    }
}
EOF
ln -sf /etc/nginx/sites-available/ops.valuemaker.cloud /etc/nginx/sites-enabled/

# 3. Configure 'app.valuemaker.cloud' (Cockpit)
echo "Configuring app.valuemaker.cloud (Cockpit)..."
cat > /etc/nginx/sites-available/app.valuemaker.cloud <<'EOF'
server {
    server_name app.valuemaker.cloud;

    location / {
        proxy_pass http://127.0.0.1:9090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # Security headers for Cockpit/WebSocket
        proxy_set_header Origin "";
    }
}
EOF
ln -sf /etc/nginx/sites-available/app.valuemaker.cloud /etc/nginx/sites-enabled/

# 4. Check & Reload Nginx
echo "Reloading Nginx..."
nginx -t && systemctl reload nginx

echo "✅ Subdomains Setup Complete!"
