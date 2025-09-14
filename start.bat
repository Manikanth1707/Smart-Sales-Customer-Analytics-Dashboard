@echo off
echo ========================================
echo   Smart Sales Dashboard - Quick Start
echo ========================================
echo.

echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Frontend dependencies installation failed!
    echo Please check your Node.js installation.
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Backend dependencies installation failed!
    echo Please check your Node.js installation.
    pause
    exit /b 1
)

echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd /d %~dp0server && node server.js"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting frontend development server...
start "Frontend Server" cmd /k "cd /d %~dp0 && npm start"

echo.
echo ========================================
echo Smart Sales Dashboard is starting up!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Demo Accounts:
echo - Admin: admin@company.com / admin123
echo - Employee: employee@company.com / employee123
echo - Manager: manager@company.com / manager123
echo.
echo The application will open in your browser automatically.
echo Keep both terminal windows open while using the app.
echo.
echo Press any key to exit this window...
pause > nul