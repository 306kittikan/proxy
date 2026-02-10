@echo off
echo [WARNING] You are about to deploy to PRODUCTION environment.
echo [WARNING] This will use docker-compose.prod.yml and strict resource limits.
pause

echo [DEPLOY] Starting PRODUCTION deployment...

echo [DEPLOY] Building with production config...
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

echo [DEPLOY] Stopping containers...
docker-compose down

echo [DEPLOY] Starting containers in PRODUCTION mode...
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

echo [SUCCESS] Production deployment completed!
docker-compose ps
