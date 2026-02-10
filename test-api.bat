@echo off
echo Testing API endpoints...
echo.

echo [1] Health Check:
curl -s http://localhost/health
echo.
echo.

echo [2] API Tasks Endpoint:
curl -s http://localhost/api/tasks
echo.
echo.

echo [3] Frontend (HTML):
curl -s -I http://localhost | findstr "HTTP"
echo.

echo [4] Performance Test (with timing):
curl -w "@curl-format.txt" -o nul -s http://localhost/api/tasks
