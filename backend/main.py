from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import jwt
from datetime import datetime, timedelta
import uuid

app = FastAPI(title="Sign Language Translator API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

# Simulated database
users_db = {}
texts_db = {}


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


class TextInput(BaseModel):
    text: str


class TextResponse(BaseModel):
    id: str
    text: str
    video_url: str
    created_at: datetime


# Helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM]
        )
        user_id = payload.get("sub")
        if user_id is None or user_id not in users_db:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# Routes
@app.get("/")
async def root():
    return {"message": "Sign Language Translator API"}


@app.post("/signup", response_model=User)
async def signup(user: UserCreate):
    if any(u["email"] == user.email for u in users_db.values()):
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(uuid.uuid4())
    users_db[user_id] = {
        "id": user_id,
        "username": user.username,
        "email": user.email,
        "password": user.password,  # In production, hash this password
    }

    return users_db[user_id]


@app.post("/login")
async def login(user: UserLogin):
    for u in users_db.values():
        if u["email"] == user.email and u["password"] == user.password:
            access_token = create_access_token(data={"sub": u["id"]})
            return {"access_token": access_token, "token_type": "bearer"}

    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.post("/translate", response_model=TextResponse)
async def translate_text(text_input: TextInput, user_id: str = Depends(verify_token)):
    text_id = str(uuid.uuid4())

    # Simulate video generation - in production this would call a sign language model
    video_url = f"/assets/sample_sign_{text_id}.mp4"

    text_response = TextResponse(
        id=text_id,
        text=text_input.text,
        video_url=video_url,
        created_at=datetime.utcnow(),
    )

    texts_db[text_id] = text_response.dict()
    return text_response


@app.get("/texts", response_model=List[TextResponse])
async def get_user_texts(user_id: str = Depends(verify_token)):
    user_texts = [text for text in texts_db.values() if text.get("user_id") == user_id]
    return user_texts


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
