from supabase import create_client, Client
from typing import Optional, List, Dict, Any
from config import settings
import bcrypt


class SupabaseDB:
    def __init__(self):
        self.supabase: Client = create_client(
            settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY
        )

    def hash_password(self, password: str) -> str:
        """Hash a password using bcrypt"""
        salt = bcrypt.gensalt(rounds=settings.BCRYPT_ROUNDS)
        hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
        return hashed.decode("utf-8")

    def verify_password(self, password: str, hashed_password: str) -> bool:
        """Verify a password against its hash"""
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

    async def create_user(
        self, username: str, email: str, password: str
    ) -> Dict[str, Any]:
        """Create a new user in Supabase"""
        try:
            # Hash the password
            hashed_password = self.hash_password(password)

            # Insert user into the users table
            response = (
                self.supabase.table("users")
                .insert(
                    {
                        "username": username,
                        "email": email,
                        "password_hash": hashed_password,
                    }
                )
                .execute()
            )

            if response.data:
                user = response.data[0]
                # Don't return the password hash
                return {
                    "id": user["id"],
                    "username": user["username"],
                    "email": user["email"],
                    "created_at": user["created_at"],
                }
            else:
                raise Exception("Failed to create user")

        except Exception as e:
            raise Exception(f"Error creating user: {str(e)}")

    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email"""
        try:
            response = (
                self.supabase.table("users").select("*").eq("email", email).execute()
            )

            if response.data:
                return response.data[0]
            return None

        except Exception as e:
            raise Exception(f"Error getting user: {str(e)}")

    async def authenticate_user(
        self, email: str, password: str
    ) -> Optional[Dict[str, Any]]:
        """Authenticate a user with email and password"""
        try:
            user = await self.get_user_by_email(email)
            if not user:
                return None

            if self.verify_password(password, user["password_hash"]):
                # Don't return the password hash
                return {
                    "id": user["id"],
                    "username": user["username"],
                    "email": user["email"],
                    "created_at": user["created_at"],
                }
            return None

        except Exception as e:
            raise Exception(f"Error authenticating user: {str(e)}")

    async def create_text_translation(
        self, user_id: str, text: str, video_url: str
    ) -> Dict[str, Any]:
        """Create a new text translation record"""
        try:
            response = (
                self.supabase.table("text_translations")
                .insert({"user_id": user_id, "text": text, "video_url": video_url})
                .execute()
            )

            if response.data:
                return response.data[0]
            else:
                raise Exception("Failed to create text translation")

        except Exception as e:
            raise Exception(f"Error creating text translation: {str(e)}")

    async def get_user_translations(self, user_id: str) -> List[Dict[str, Any]]:
        """Get all translations for a specific user"""
        try:
            response = (
                self.supabase.table("text_translations")
                .select("*")
                .eq("user_id", user_id)
                .order("created_at", desc=True)
                .execute()
            )

            return response.data or []

        except Exception as e:
            raise Exception(f"Error getting user translations: {str(e)}")

    async def get_translation_by_id(
        self, translation_id: str
    ) -> Optional[Dict[str, Any]]:
        """Get a specific translation by ID"""
        try:
            response = (
                self.supabase.table("text_translations")
                .select("*")
                .eq("id", translation_id)
                .execute()
            )

            if response.data:
                return response.data[0]
            return None

        except Exception as e:
            raise Exception(f"Error getting translation: {str(e)}")


# Create database instance
db = SupabaseDB()
