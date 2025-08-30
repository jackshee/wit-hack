#!/usr/bin/env python3
"""
Standalone test script for PixVerse API integration
This tests the API directly without going through FastAPI
"""

import sys
import os

# Add the current directory to Python path so we can import our modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pixverse_api import pixverse_client


def test_pixverse_api():
    """Test the PixVerse API with a sample text"""

    test_text = "Now he wasn't hungry any more"

    print("🧪 Testing PixVerse API Integration")
    print("=" * 50)
    print(f"📝 Test text: '{test_text}'")
    print(f"🔑 API Key configured: {'Yes' if pixverse_client.api_key else 'No'}")
    if pixverse_client.api_key:
        print(f"🔑 API Key (first 10 chars): {pixverse_client.api_key[:10]}...")
    print()

    try:
        print("🚀 Testing with usePixverse=False (local asset)...")
        video_url = pixverse_client.generate_sign_language_video(
            test_text, usePixverse=False
        )
        print(f"✅ Local asset URL: {video_url}")
        print(f"📁 Asset should be accessible at: {video_url}")

        print("\n🚀 Testing with usePixverse=True (PixVerse API)...")
        video_url = pixverse_client.generate_sign_language_video(
            test_text, usePixverse=True
        )
        if video_url:
            print(f"✅ PixVerse API URL: {video_url}")
        else:
            print("❌ PixVerse API failed or returned no URL")

    except Exception as e:
        print(f"❌ ERROR occurred: {e}")
        print(f"❌ Error type: {type(e)}")
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    print("Starting PixVerse API Test...")
    print()

    test_pixverse_api()

    print("\n🏁 Test completed!")
