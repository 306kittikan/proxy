@echo off
echo [DEPLOY] Starting local deployment...

call build.bat
if %errorlevel% neq 0 exit /b %errorlevel%

echo [DEPLOY] Stopping existing containers...
docker-compose down

echo [DEPLOY] Starting new containers...
docker-compose up -d

echo [SUCCESS] Deployment completed!
echo App is running at http://localhost
docker-compose ps
