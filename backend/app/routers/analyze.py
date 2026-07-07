import asyncio
import logging
from typing import Annotated

from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import ValidationError

from app.gemini_client import gemini_client
from app.models import AnalyzeResponse
from app.utils.image_utils import compress_image

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["analyze"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_SIZE_MB = 10


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_product(image: Annotated[UploadFile, File()]):
    if image.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Tipo de imagen no válido. Permitidos: {', '.join(ALLOWED_TYPES)}",
        )

    # image.size puede ser None si el cliente no envía Content-Length
    if image.size is not None and image.size > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"Imagen demasiado grande. Máximo: {MAX_SIZE_MB}MB")

    raw_bytes = await image.read()

    if len(raw_bytes) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"Imagen demasiado grande. Máximo: {MAX_SIZE_MB}MB")

    try:
        compressed, mime_type = compress_image(raw_bytes)
    except Exception:
        logger.exception("Failed to process image")
        raise HTTPException(status_code=400, detail="No se pudo procesar la imagen")

    try:
        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(
            None, gemini_client.analyze_image, compressed, mime_type
        )
    except ValueError:
        raise HTTPException(status_code=503, detail="No hay API keys de Gemini configuradas")
    except RuntimeError as e:
        logger.error("Gemini API failed: %s", e)
        raise HTTPException(status_code=503, detail="API de Gemini no disponible. Intenta de nuevo.")

    if "error" in result:
        raise HTTPException(status_code=400, detail="No se detectó ningún producto alimenticio en la imagen")

    try:
        return AnalyzeResponse(**result)
    except ValidationError as e:
        logger.error("Gemini response validation failed: %s", e)
        raise HTTPException(status_code=500, detail="Respuesta inválida de Gemini")
