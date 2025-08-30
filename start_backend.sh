#!/bin/bash

echo "Starting FastAPI Backend..."
echo "=========================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Please run the setup first: ./setup_backend.sh"
    exit 1
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Verify we're in the virtual environment
if [ -z "$VIRTUAL_ENV" ]; then
    echo "❌ Failed to activate virtual environment!"
    exit 1
fi

echo "✅ Virtual environment activated: $VIRTUAL_ENV"

# Check if requirements are installed
if ! python -c "import fastapi" &> /dev/null; then
    echo "❌ Dependencies not installed!"
    echo "Please run the setup first: ./setup_backend.sh"
    exit 1
fi

# Check if uvicorn is available
if ! python -c "import uvicorn" &> /dev/null; then
    echo "❌ Uvicorn not found! Installing..."
    pip install uvicorn
fi

# Start the server with uvicorn and auto-reload
echo "🚀 Starting server with auto-reload at http://localhost:8000"
echo "📝 Server will automatically restart when you make code changes"
echo "Press Ctrl+C to stop the server"
echo ""
uvicorn main:app --reload --host 0.0.0.0 --port 8000 