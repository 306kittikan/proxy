# 🚀 Proxy Server with Nginx Reverse Proxy

A production-ready web application with Nginx reverse proxy, serving both frontend (Quasar/Vue.js) and backend (Express.js) through a single entry point.

## 🏗️ Architecture

```
                    ┌──────────────────┐
                    │   Nginx Proxy    │
                    │    Port 80/443   │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
    ┌─────────────────┐         ┌─────────────────┐
    │  Frontend       │         │   Backend       │
    │  (Static Files) │         │  (Express API)  │
    │  /usr/share/    │         │  Port 3000      │
    │  nginx/html     │         │  (internal)     │
    └─────────────────┘         └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │   Supabase      │
                                │  (PostgreSQL)   │
                                └─────────────────┘
```

## ✨ Features

- ✅ **Single Entry Point** - All traffic through port 80
- ✅ **Reverse Proxy** - Nginx routes `/api/*` to backend
- ✅ **Static File Serving** - Optimized frontend delivery
- ✅ **Gzip Compression** - ~70% size reduction
- ✅ **Caching** - 1-year cache for static assets
- ✅ **Security Headers** - X-Frame-Options, X-XSS-Protection, etc.
- ✅ **Health Checks** - Built-in monitoring endpoint
- ✅ **SSL/TLS Ready** - Production-ready HTTPS configuration
- ✅ **Docker Compose** - Easy deployment and scaling

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js & npm
- Port 80 available

### Deploy in One Command
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

### Access Application
- **Frontend**: http://localhost
- **API**: http://localhost/api/tasks
- **Health**: http://localhost/health

## 📁 Project Structure

```
.
├── nginx/
│   ├── nginx.conf              # Main Nginx config
│   ├── conf.d/
│   │   ├── app.conf           # Routing rules
│   │   └── ssl.conf.template  # SSL template
│   └── ssl/                   # SSL certificates
├── frontend/                   # Quasar/Vue.js app
├── backend/                    # Express.js API
├── docker-compose.yml          # Main Docker config
├── docker-compose.prod.yml     # Production overrides
├── docker-compose.staging.yml  # Staging overrides
├── build.bat / build.sh        # Build scripts
├── deploy.bat / deploy.sh      # Deployment scripts
├── deploy-prod.bat             # Production deployment
└── status.bat                  # Status monitoring
```

## 🔧 Common Commands

### Development
```bash
# Build and deploy
deploy.bat

# Check status
status.bat

# View logs
docker-compose logs -f

# Restart services
docker-compose restart
```

### Production
```bash
# Deploy to production
deploy-prod.bat

# Check health
curl http://localhost/health
```

### Debugging
```bash
# Test Nginx config
docker-compose exec nginx nginx -t

# Reload Nginx
docker-compose exec nginx nginx -s reload

# View specific logs
docker-compose logs -f nginx
docker-compose logs -f backend
```

## 📚 Documentation

- **[NGINX-SETUP.md](NGINX-SETUP.md)** - Detailed setup guide, troubleshooting, SSL configuration
- **[TESTING-CHECKLIST.md](TESTING-CHECKLIST.md)** - Complete testing procedures
- **[Implementation Plan](.agent/artifacts/nginx-implementation-plan.md)** - Full implementation details

## 🛠️ Troubleshooting

### Port 80 already in use
```bash
# Windows
netstat -ano | findstr :80
taskkill /PID <PID> /F
```

### Frontend shows 404
```bash
cd frontend
npm run build
docker-compose restart nginx
```

### API returns 502
```bash
docker-compose logs backend
docker-compose restart backend
```

See [NGINX-SETUP.md](NGINX-SETUP.md) for more troubleshooting.

## 🔐 SSL/TLS Setup

1. Place certificates in `nginx/ssl/`:
   - `cert.pem` (certificate)
   - `key.pem` (private key)

2. Enable SSL config:
   ```bash
   mv nginx/conf.d/ssl.conf.template nginx/conf.d/ssl.conf
   ```

3. Restart Nginx:
   ```bash
   docker-compose restart nginx
   ```

## 📊 Performance

- **Gzip Compression**: ~70% size reduction
- **Static Caching**: 1-year cache for assets
- **Connection Pooling**: Keepalive enabled
- **Response Time**: <100ms (typical)

## 🔒 Security

- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Request size limits (10MB)
- Backend not exposed directly
- SSL/TLS ready for production

## 🤝 Contributing

1. Make changes
2. Test locally: `deploy.bat`
3. Run tests: See [TESTING-CHECKLIST.md](TESTING-CHECKLIST.md)
4. Deploy to production: `deploy-prod.bat`

## 📝 License

MIT
