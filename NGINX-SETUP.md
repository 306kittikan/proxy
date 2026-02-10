# Nginx Reverse Proxy Setup Guide

## 🎯 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Node.js & npm installed
- Port 80 and 443 available

### Deploy in One Command
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

### Access Your Application
- **Frontend**: http://localhost
- **API**: http://localhost/api/tasks
- **Health Check**: http://localhost/health

---

## 📁 Architecture

```
Browser (Port 80)
    ↓
Nginx Reverse Proxy
    ├── / → Frontend (Static Files)
    ├── /api/* → Backend:3000 (Proxy)
    └── /health → Health Check
```

---

## 🔧 Configuration Files

### Nginx Configuration
- **`nginx/nginx.conf`** - Main configuration with gzip, logging
- **`nginx/conf.d/app.conf`** - Routing rules and proxy settings
- **`nginx/conf.d/ssl.conf.template`** - SSL/TLS template (for production)

### Docker Configuration
- **`docker-compose.yml`** - Main services (nginx + backend)
- **`docker-compose.prod.yml`** - Production overrides
- **`docker-compose.staging.yml`** - Staging overrides

---

## 🚀 Deployment Commands

### Local Development
```bash
deploy.bat              # Build and deploy
status.bat              # Check system status
test-api.bat            # Test API endpoints
```

### Production
```bash
deploy-prod.bat         # Deploy with production config
```

### Manual Steps
```bash
# 1. Build frontend
cd frontend
npm run build
cd ..

# 2. Start services
docker-compose up -d

# 3. Check status
docker-compose ps
docker-compose logs -f
```

---

## 🔍 Monitoring & Debugging

### Check Container Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Nginx only
docker-compose logs -f nginx

# Backend only
docker-compose logs -f backend
```

### Test Nginx Configuration
```bash
docker-compose exec nginx nginx -t
```

### Reload Nginx (without restart)
```bash
docker-compose exec nginx nginx -s reload
```

---

## 🛠️ Troubleshooting

### Issue: Port 80 already in use
**Solution**: Stop other services using port 80
```bash
# Windows
netstat -ano | findstr :80
taskkill /PID <PID> /F

# Linux/Mac
sudo lsof -i :80
sudo kill -9 <PID>
```

### Issue: Frontend shows 404
**Solution**: Ensure frontend is built
```bash
cd frontend
npm run build
```

### Issue: API returns 502 Bad Gateway
**Solution**: Check backend is running
```bash
docker-compose logs backend
docker-compose restart backend
```

### Issue: SSL not working
**Solution**: 
1. Place certificates in `nginx/ssl/`
2. Rename `ssl.conf.template` to `ssl.conf`
3. Restart nginx: `docker-compose restart nginx`

---

## 🔐 SSL/TLS Setup (Production)

### 1. Obtain SSL Certificates
```bash
# Using Let's Encrypt (example)
certbot certonly --standalone -d yourdomain.com
```

### 2. Copy Certificates
```bash
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/key.pem
```

### 3. Enable SSL Configuration
```bash
# Uncomment ssl.conf.template and rename
mv nginx/conf.d/ssl.conf.template nginx/conf.d/ssl.conf
```

### 4. Update server_name
Edit `nginx/conf.d/ssl.conf` and replace `localhost` with your domain.

### 5. Restart
```bash
docker-compose restart nginx
```

---

## ⚡ Performance Optimization

### Current Optimizations
- ✅ Gzip compression (~70% size reduction)
- ✅ Static asset caching (1 year)
- ✅ Connection keepalive
- ✅ Optimized buffer sizes

### Additional Optimizations
```nginx
# Add to nginx/nginx.conf
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 4096;
    use epoll;
}

http {
    # Enable HTTP/2
    listen 443 ssl http2;
    
    # Browser caching
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 📊 Monitoring

### Health Checks
```bash
# Quick health check
curl http://localhost/health

# Detailed status
status.bat
```

### Performance Testing
```bash
# Response time
curl -w "@curl-format.txt" -o /dev/null -s http://localhost/api/tasks

# Load testing (using Apache Bench)
ab -n 1000 -c 10 http://localhost/api/tasks
```

---

## 🔒 Security Enhancements

### Current Security Features
- ✅ Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- ✅ Request size limits (10MB)
- ✅ Backend not exposed directly

### Additional Security
```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
location /api/ {
    limit_req zone=api burst=20;
}

# IP whitelisting (for admin endpoints)
location /api/admin/ {
    allow 192.168.1.0/24;
    deny all;
}
```

---

## 📝 Environment Variables

### Frontend (.env)
```
API_URL=/api
VITE_API_URL=/api
```

### Backend (.env)
```
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
```

---

## 🎓 Best Practices

1. **Always build frontend before deploying**
2. **Use production config for production** (`deploy-prod.bat`)
3. **Monitor logs regularly** (`docker-compose logs -f`)
4. **Test nginx config before reload** (`nginx -t`)
5. **Keep SSL certificates updated**
6. **Use environment-specific configs**

---

## 📞 Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Test config: `docker-compose exec nginx nginx -t`
3. Verify services: `docker-compose ps`
4. Review this guide's troubleshooting section
