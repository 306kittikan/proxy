#!/bin/bash
set -e

echo "[BUILD] Starting build process..."

echo "[BUILD] Building Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "[BUILD] Building Docker Images..."
docker-compose build

echo "[SUCCESS] Build completed successfully!"
