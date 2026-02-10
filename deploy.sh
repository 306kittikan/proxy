#!/bin/bash
set -e

echo "[DEPLOY] Starting local deployment..."

./build.sh

echo "[DEPLOY] Stopping existing containers..."
docker-compose down

echo "[DEPLOY] Starting new containers..."
docker-compose up -d

echo "[SUCCESS] Deployment completed!"
echo "App is running at http://localhost"
docker-compose ps
