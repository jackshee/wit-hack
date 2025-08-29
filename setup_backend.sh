#!/bin/bash

echo "Setting up FastAPI Backend..."
echo "============================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Navigate to backend directory
cd backend

# Remove existing virtual environment if it exists
if [ -d "venv" ]; then
    echo "Removing existing virtual environment..."
    rm -rf venv
fi

# Create new virtual environment
echo "Creating new virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "Installing requirements..."
pip install -r ../requirements.txt

echo ""
echo "✅ Backend setup complete!"
echo "To start the backend server, run: ./start_backend.sh"
echo "Or manually: cd backend && source venv/bin/activate && python main.py" 