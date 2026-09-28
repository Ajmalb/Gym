@echo off
title TITAN FORGE GYM - WEBSITE LAUNCHER
echo ========================================================
echo   ⚡ STARTING TITAN FORGE ATHLETIC CLUB WEBSITE ⚡
echo ========================================================
echo.

python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Launching development server with automatic port detection...
    python "%~dp0server.py"
    goto end
)

echo Opening website directly in your default browser...
start "" "%~dp0index.html"

:end
pause
