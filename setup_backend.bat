@echo off
echo Setting up FastAPI Backend...
echo =============================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Navigate to backend directory
cd backend

REM Remove existing virtual environment if it exists
if exist "venv" (
    echo Removing existing virtual environment...
    rmdir /s /q venv
)

REM Create new virtual environment
echo Creating new virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install requirements
echo Installing requirements...
pip install -r requirements.txt

echo.
echo ✅ Backend setup complete!
echo To start the backend server, run: start_backend.bat
echo Or manually: cd backend ^&^& venv\Scripts\activate ^&^& python main.py
pause 