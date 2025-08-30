#!/usr/bin/env python3
"""
Simple test script to check if the backend is accessible
"""

import requests
import json


def test_backend():
    try:
        # Test basic connectivity
        print("🔍 Testing backend connectivity...")
        response = requests.get("http://localhost:8000/health", timeout=5)
        print(f"✅ Health check response: {response.status_code}")
        print(f"📄 Response: {response.text}")

        # Test the translate endpoint
        print("\n🔍 Testing translate endpoint...")
        test_data = {"text": "Hello, how are you?"}
        response = requests.post(
            "http://localhost:8000/api/translate", json=test_data, timeout=30
        )
        print(f"✅ Translate response: {response.status_code}")
        print(f"📄 Response: {response.text}")

        if response.status_code == 200:
            data = response.json()
            print(f"🎯 Video URL: {data.get('video_url', 'Not found')}")

    except requests.exceptions.ConnectionError:
        print("❌ Connection failed - is your backend server running?")
        print("💡 Try running: cd backend && python main.py")
    except requests.exceptions.Timeout:
        print("❌ Request timed out - backend might be slow or unresponsive")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")


if __name__ == "__main__":
    test_backend()
