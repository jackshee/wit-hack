from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import jwt
from datetime import datetime, timedelta
import uuid
import os

# Import our custom modules
from config import settings
from database import db
from pixverse_api import pixverse_client

app = FastAPI(title="Sign Language Translator API", version="1.0.0")

# Mount static files directory
app.mount("/assets", StaticFiles(directory="../assets"), name="assets")


# Validate environment variables on startup
@app.on_event("startup")
async def startup_event():
    try:
        settings.validate()
        print("✅ Environment variables validated successfully")
    except ValueError as e:
        print(f"❌ Environment validation failed: {e}")
        print("Please check your .env file configuration")


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()


# Models
class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class User(BaseModel):
    id: str
    username: str
    email: str
    created_at: Optional[datetime] = None


class TextInput(BaseModel):
    text: str


class TextResponse(BaseModel):
    id: str
    text: str
    video_url: str
    user_id: str
    created_at: datetime


# Helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# Routes
@app.get("/")
async def root():
    return {"message": "Sign Language Translator API with Supabase"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}


@app.post("/signup", response_model=User)
async def signup(user: UserCreate):
    try:
        # Check if user already exists
        existing_user = await db.get_user_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Create new user
        new_user = await db.create_user(user.username, user.email, user.password)
        return new_user

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/login")
async def login(user: UserLogin):
    try:
        # Authenticate user
        authenticated_user = await db.authenticate_user(user.email, user.password)
        if not authenticated_user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # Create access token
        access_token = create_access_token(data={"sub": authenticated_user["id"]})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": authenticated_user,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/translate", response_model=TextResponse)
async def translate_text(text_input: TextInput, user_id: str = Depends(verify_token)):
    try:
        # Generate sign language video using PixVerse API (disabled by default)
        video_url = pixverse_client.generate_sign_language_video(
            text_input.text, usePixverse=False
        )

        if not video_url:
            # Fallback to demo video if PixVerse API fails
            video_url = "http://localhost:8000/assets/wasnt hungry anymore.mp4"

        # Create translation record in database
        translation = await db.create_text_translation(
            user_id=user_id, text=text_input.text, video_url=video_url
        )

        return translation

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/translate")
async def translate_text_demo(text_input: TextInput):
    """
    Demo endpoint for translating text to sign language without authentication.
    This is used by the live OCR frontend for testing purposes.
    """

    try:
        # Generate sign language video using PixVerse API (disabled by default)
        video_url = pixverse_client.generate_sign_language_video(
            text_input.text, usePixverse=False
        )

        if not video_url:
            # Fallback to demo video if PixVerse API fails
            video_url = "http://localhost:8000/assets/wasnt hungry anymore.mp4"

        response_data = {
            "text": text_input.text,
            "video_url": video_url,
            "message": "Demo translation successful",
            "status": "success",
            "error_details": None,
        }

        return response_data

    except Exception as e:
        # Return fallback response on error
        fallback_response = {
            "text": text_input.text,
            "video_url": "http://localhost:8000/assets/wasnt hungry anymore.mp4",
            "message": "Demo translation successful (fallback)",
            "status": "error",
            "error_details": str(e),
        }
        return fallback_response


@app.post("/api/ocr")
async def process_ocr(file: UploadFile = File(...)):
    """
    Process OCR on uploaded image file.
    This endpoint is prepared for future OCR implementation.
    """
    try:
        # For now, return a placeholder response
        # In production, this would use EasyOCR or similar library
        return {
            "text": "OCR processing not yet implemented. This is a placeholder response.",
            "confidence": 0.0,
            "message": "OCR endpoint ready for implementation",
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/texts", response_model=List[TextResponse])
async def get_user_texts(user_id: str = Depends(verify_token)):
    try:
        translations = await db.get_user_translations(user_id)
        return translations

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/texts/{translation_id}", response_model=TextResponse)
async def get_text_by_id(translation_id: str, user_id: str = Depends(verify_token)):
    try:
        translation = await db.get_translation_by_id(translation_id)
        if not translation:
            raise HTTPException(status_code=404, detail="Translation not found")

        # Ensure user can only access their own translations
        if translation["user_id"] != user_id:
            raise HTTPException(status_code=403, detail="Access denied")

        return translation

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    import os

    # Get port from environment variable (Render sets this)
    port = int(os.environ.get("PORT", 8000))

    uvicorn.run(app, host="0.0.0.0", port=port)
