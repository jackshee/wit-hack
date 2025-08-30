import requests
import uuid
import time
from typing import Optional, Dict, Any
from config import settings


class PixVerseAPI:
    """Client for interacting with PixVerse API for video generation"""

    def __init__(self):
        self.api_key = settings.PIXVERSE_API_KEY
        self.base_url = "https://app-api.pixverse.ai/openapi/v2"
        self.headers = {"API-KEY": self.api_key, "Content-Type": "application/json"}

    def generate_video(
        self,
        prompt: str,
        duration: int = 5,
        aspect_ratio: str = "16:9",
        model: str = "v5",
        quality: str = "360p",
        seed: int = 0,
        negative_prompt: str = "",
        watermark: bool = False,
    ) -> Optional[Dict[str, Any]]:
        """
        Generate a video from text using PixVerse API.

        Args:
            prompt: Text prompt for video generation
            duration: Duration of the video in seconds
            aspect_ratio: Aspect ratio (e.g., "16:9")
            model: Model version (e.g., "v5")
            quality: Video resolution (e.g., "360p")
            seed: Random seed (0 for random)
            negative_prompt: Negative prompt to avoid unwanted details
            watermark: Whether to add watermark (boolean)

        Returns:
            Response JSON from API or None if error
        """

        if not self.api_key:
            raise ValueError("PIXVERSE_API_KEY not configured")

        endpoint = f"{self.base_url}/video/text/generate"

        payload = {
            "aspect_ratio": aspect_ratio,
            "duration": duration,
            "model": model,
            "negative_prompt": negative_prompt,
            "prompt": prompt,
            "quality": quality,
            "seed": seed,
            "water_mark": watermark,
        }

        try:
            response = requests.post(endpoint, headers=self.headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            print(f"HTTP error: {e}")
            print(f"Response content: {response.text}")
            return None
        except Exception as e:
            print(f"Error generating video: {e}")
            return None

    def check_status(self, video_id: str) -> tuple[int, Optional[str]]:
        """
        Check the status of a video generation request.

        Args:
            video_id: The video ID returned from generate_video

        Returns:
            Tuple of (status, url) where status is an integer and url is the video URL if complete
        """
        endpoint = f"{self.base_url}/video/result/{video_id}"

        try:
            response = requests.get(endpoint, headers=self.headers)
            response.raise_for_status()
            data = response.json()

            if data.get("ErrCode") == 0:
                return data["Resp"]["status"], data["Resp"].get("url")
            else:
                raise RuntimeError(f"Error checking status: {data.get('ErrMsg')}")

        except Exception as e:
            print(f"Error checking video status: {e}")
            raise

    def wait_for_completion(
        self, video_id: str, check_interval: int = 5, timeout: int = 300
    ) -> Optional[str]:
        """
        Wait for video generation to complete.

        Args:
            video_id: The video ID returned from generate_video
            check_interval: Seconds between status checks
            timeout: Maximum time to wait in seconds

        Returns:
            Video URL if successful, None if timeout or error
        """
        start_time = time.time()

        while True:
            if time.time() - start_time > timeout:
                return None

            try:
                status, url = self.check_status(video_id)

                if status == 1:  # Completed
                    return url
                elif status == 5:  # Processing
                    pass  # Continue waiting
                else:
                    pass  # Continue waiting

            except Exception as e:
                return None

            time.sleep(check_interval)

    def generate_sign_language_video(
        self, text: str, duration: int = 5, usePixverse: bool = False
    ) -> Optional[str]:
        """
        Generate a sign language video for the given text.

        Args:
            text: The text to translate to sign language
            duration: Duration of the video in seconds
            usePixverse: Whether to use PixVerse API (False = use local asset)

        Returns:
            Video URL if successful, None if error
        """
        if not usePixverse:
            # Return local asset instead of calling PixVerse API
            return "http://localhost:8000/assets/wasnt hungry anymore.mp4"

        # Create a prompt optimized for sign language generation
        prompt = f"An avatar doing hand signing asking '{text}' in Auslan sign language"
        negative_prompt = (
            "text, words, letters, writing, bad quality, blurry, distorted"
        )

        # Generate the video
        result = self.generate_video(
            prompt=prompt,
            duration=duration,
            negative_prompt=negative_prompt,
            quality="360p",  # Lower quality for faster generation
        )

        if not result:
            return None

        try:
            video_id = result["Resp"]["video_id"]

            # Wait for completion
            video_url = self.wait_for_completion(video_id)
            return video_url

        except KeyError as e:
            return None
        except Exception as e:
            return None


# Create a global instance
pixverse_client = PixVerseAPI()
