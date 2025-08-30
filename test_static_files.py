#!/usr/bin/env python3
"""
Test script to verify static file serving is working
"""

import requests


def test_static_files():
    """Test if the backend can serve static files"""

    print("🧪 Testing Static File Serving")
    print("=" * 40)

    try:
        # Test if the backend is running
        print("🔍 Testing backend connectivity...")
        response = requests.get("http://localhost:8000/health", timeout=5)
        print(f"✅ Backend health check: {response.status_code}")

        # Test static file serving
        print("\n🔍 Testing static file serving...")
        response = requests.get(
            "http://localhost:8000/assets/wasnt hungry anymore.mp4", timeout=10
        )
        print(f"✅ Static file response: {response.status_code}")

        if response.status_code == 200:
            print(f"📁 File size: {len(response.content)} bytes")
            print("✅ Static file serving is working!")
        else:
            print(f"❌ Static file serving failed: {response.status_code}")
            print(f"📄 Response: {response.text}")

    except requests.exceptions.ConnectionError:
        print("❌ Connection failed - is your backend server running?")
        print("💡 Try running: cd backend && python main.py")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")


if __name__ == "__main__":
    test_static_files()
