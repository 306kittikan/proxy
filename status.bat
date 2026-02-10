@echo off
echo ========================================
echo   System Status Check
echo ========================================
echo.

echo [1] Container Status:
docker-compose ps
echo.

echo [2] Nginx Configuration Test:
docker-compose exec nginx nginx -t 2>nul || echo Nginx container not running
echo.

echo [3] Health Check:
curl -s http://localhost/health || echo Health endpoint not responding
echo.

echo [4] Recent Logs (last 20 lines):
docker-compose logs --tail=20
