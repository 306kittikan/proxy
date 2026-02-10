# Testing Checklist

## ✅ Pre-Deployment Tests

### 1. Frontend Build
- [ ] `cd frontend && npm install`
- [ ] `npm run build`
- [ ] Verify `frontend/dist/spa/` exists
- [ ] Check for build errors

### 2. Docker Build
- [ ] `docker-compose build`
- [ ] No build errors
- [ ] Images created successfully

---

## ✅ Deployment Tests

### 1. Container Startup
- [ ] `docker-compose up -d`
- [ ] All containers running: `docker-compose ps`
- [ ] No restart loops

### 2. Health Checks
```bash
# Nginx health
curl http://localhost/health
# Expected: "healthy"

# Container health
docker-compose ps
# Expected: All "healthy" or "running"
```

---

## ✅ Functional Tests

### 1. Frontend Access
```bash
curl -I http://localhost
# Expected: HTTP/1.1 200 OK
```
- [ ] Browser: http://localhost loads
- [ ] No console errors
- [ ] Static assets load (CSS, JS, images)

### 2. API Endpoints
```bash
# Tasks endpoint
curl http://localhost/api/tasks
# Expected: JSON response

# Health endpoint
curl http://localhost/health
# Expected: "healthy"
```

### 3. Routing Tests
- [ ] `/` → Frontend (HTML)
- [ ] `/api/tasks` → Backend API (JSON)
- [ ] `/health` → Health check
- [ ] `/nonexistent` → Frontend (SPA fallback)

---

## ✅ Performance Tests

### 1. Response Time
```bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost/api/tasks
```
- [ ] Total time < 500ms
- [ ] No timeout errors

### 2. Compression
```bash
curl -H "Accept-Encoding: gzip" -I http://localhost
```
- [ ] `Content-Encoding: gzip` present

### 3. Caching
```bash
curl -I http://localhost/assets/index.js
```
- [ ] `Cache-Control` header present
- [ ] `expires` header present

---

## ✅ Security Tests

### 1. Security Headers
```bash
curl -I http://localhost
```
Check for:
- [ ] `X-Frame-Options: SAMEORIGIN`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-XSS-Protection: 1; mode=block`

### 2. Backend Isolation
```bash
# This should FAIL (backend not exposed)
curl http://localhost:3000/api/tasks
```
- [ ] Connection refused (expected)

---

## ✅ Error Handling Tests

### 1. Backend Down
```bash
docker-compose stop backend
curl http://localhost/api/tasks
```
- [ ] Returns 502 Bad Gateway (expected)

### 2. Invalid Routes
```bash
curl http://localhost/api/invalid
```
- [ ] Returns appropriate error (404 or backend error)

---

## ✅ Configuration Tests

### 1. Nginx Config Validation
```bash
docker-compose exec nginx nginx -t
```
- [ ] "syntax is ok"
- [ ] "test is successful"

### 2. Environment Variables
- [ ] `frontend/.env` has `VITE_API_URL=/api`
- [ ] `backend/.env` has correct DATABASE_URL

---

## ✅ Production Readiness

### 1. Resource Limits (Production)
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml config
```
- [ ] CPU limits defined
- [ ] Memory limits defined

### 2. SSL/TLS (if applicable)
- [ ] Certificates in `nginx/ssl/`
- [ ] `ssl.conf` enabled
- [ ] HTTPS redirects working

---

## ✅ Monitoring Tests

### 1. Logs
```bash
docker-compose logs -f
```
- [ ] No error messages
- [ ] Access logs working
- [ ] Proper log format

### 2. Status Script
```bash
status.bat
```
- [ ] Shows container status
- [ ] Nginx config test passes
- [ ] Health check responds

---

## 🔄 Regression Tests (After Changes)

### After Nginx Config Changes
1. [ ] `docker-compose exec nginx nginx -t`
2. [ ] `docker-compose restart nginx`
3. [ ] Test all routes still work

### After Backend Changes
1. [ ] `docker-compose restart backend`
2. [ ] Test API endpoints
3. [ ] Check logs for errors

### After Frontend Changes
1. [ ] Rebuild: `cd frontend && npm run build`
2. [ ] `docker-compose restart nginx`
3. [ ] Clear browser cache
4. [ ] Test frontend loads

---

## 📊 Load Testing (Optional)

### Using Apache Bench
```bash
# 1000 requests, 10 concurrent
ab -n 1000 -c 10 http://localhost/api/tasks
```
- [ ] No failed requests
- [ ] Reasonable response times

### Using wrk
```bash
wrk -t4 -c100 -d30s http://localhost/api/tasks
```
- [ ] No errors
- [ ] Consistent throughput

---

## ✅ Final Checklist

- [ ] All containers running
- [ ] Frontend accessible
- [ ] API responding
- [ ] Health checks passing
- [ ] No errors in logs
- [ ] Security headers present
- [ ] Compression working
- [ ] Caching configured
- [ ] Documentation complete
- [ ] Ready for deployment

---

## 🚨 Common Issues

| Issue | Check | Solution |
|-------|-------|----------|
| Port 80 in use | `netstat -ano \| findstr :80` | Stop conflicting service |
| 404 on frontend | `ls frontend/dist/spa` | Run `npm run build` |
| 502 on API | `docker-compose logs backend` | Restart backend |
| No gzip | `curl -H "Accept-Encoding: gzip" -I` | Check nginx.conf |
