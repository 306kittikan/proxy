@echo off
echo [BUILD] Starting build process...

echo [BUILD] Building Frontend...
cd frontend
call npm install
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed!
    exit /b %errorlevel%
)
echo [BUILD] Frontend built successfully.
cd ..

echo [BUILD] Building Docker Images...
docker-compose build
if %errorlevel% neq 0 (
    echo [ERROR] Docker build failed!
    exit /b %errorlevel%
)

echo [SUCCESS] Build completed successfully!
