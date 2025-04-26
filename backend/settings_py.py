import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables
load_dotenv()

# API Keys
OPENAI_API_KEY: Optional[str] = os.getenv("Open_AI_API")
GEMINI_API_KEY: Optional[str] = os.getenv("gemini_API")

# Database settings
DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./app.db")

# JWT settings for authentication
SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-for-development")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

# API settings
API_PREFIX: str = "/api/v1"
