@echo off
echo Starting FastAPI Backend...
echo ========================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Navigate to backend directory
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo ❌ Virtual environment not found!
    echo Please run the setup first: setup_backend.bat
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Verify we're in the virtual environment
if "%VIRTUAL_ENV%"=="" (
    echo ❌ Failed to activate virtual environment!
    pause
    exit /b 1
)

echo ✅ Virtual environment activated: %VIRTUAL_ENV%

REM Check if requirements are installed
python -c "import fastapi" >nul 2>&1
if errorlevel 1 (
    echo ❌ Dependencies not installed!
    echo Please run the setup first: setup_backend.bat
    pause
    exit /b 1
)

REM Start the server
echo 🚀 Starting server at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python main.py
pause 