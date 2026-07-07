import logging
import os
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


class Settings:
    GEMINI_API_KEYS: list[str] = [
        k.strip() for k in os.getenv("GEMINI_API_KEYS", "").split(",") if k.strip()
    ]
    CORS_ORIGINS: list[str] = [
        o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
    ]
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8001"))
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    MAX_IMAGE_SIZE: int = 1024
    GEMINI_TIMEOUT: int = 60


settings = Settings()

if not settings.GEMINI_API_KEYS:
    logger.warning("No GEMINI_API_KEYS configured. The /api/analyze endpoint will return 503.")
