import json
import logging
import re
import threading
import time
import google.generativeai as genai

from app.config import settings

logger = logging.getLogger(__name__)


class GeminiClient:
    def __init__(self) -> None:
        self._keys = settings.GEMINI_API_KEYS
        self._current_index = 0
        self._lock = threading.Lock()

    def _get_next_key(self) -> str:
        key = self._keys[self._current_index]
        self._current_index = (self._current_index + 1) % len(self._keys)
        return key

    def analyze_image(self, image_bytes: bytes, mime_type: str) -> dict:
        if not self._keys:
            raise ValueError("No Gemini API keys configured")

        prompt = """Analiza esta imagen de un producto alimenticio y responde SOLO con un JSON válido (sin texto adicional, sin markdown, sin backticks) con esta estructura exacta:

{
  "producto": "nombre del producto",
  "es_saludable": true o false,
  "tabla_nutricional": {
    "porcion": "tamaño de porción estimado",
    "calorias": "valor kcal",
    "grasas": "valor en gramos",
    "azucares": "valor en gramos",
    "proteinas": "valor en gramos",
    "sodio": "valor en mg",
    "fibra": "valor en gramos"
  },
  "mensaje": "breve explicación de por qué es saludable o no",
  "alternativas": [
    {"nombre": "alternativa 1", "emoji": "emoji representativo"},
    {"nombre": "alternativa 2", "emoji": "emoji representativo"},
    {"nombre": "alternativa 3", "emoji": "emoji representativo"},
    {"nombre": "alternativa 4", "emoji": "emoji representativo"},
    {"nombre": "alternativa 5", "emoji": "emoji representativo"}
  ]
}

Si el producto es saludable, igualmente incluye 5 alternativas saludables relacionadas.
Si no se detecta ningún alimento en la imagen, responde con un JSON que tenga "error" en lugar de los campos normales."""

        last_error = None
        for i in range(len(self._keys)):
            key = self._get_next_key()
            try:
                with self._lock:
                    genai.configure(api_key=key)
                    model = genai.GenerativeModel(settings.GEMINI_MODEL)

                image_part = {"mime_type": mime_type, "data": image_bytes}
                start = time.monotonic()
                response = model.generate_content(
                    [prompt, image_part],
                    request_options={"timeout": settings.GEMINI_TIMEOUT},
                )
                elapsed = time.monotonic() - start

                if not response.text:
                    logger.warning("Gemini returned empty response on key %d (%.2fs)", i, elapsed)
                    last_error = ValueError("Empty response from Gemini")
                    continue

                raw_text = response.text.strip()
                raw_text = re.sub(r"^```json\s*", "", raw_text)
                raw_text = re.sub(r"\s*```$", "", raw_text)

                result = json.loads(raw_text)
                logger.info("Gemini responded in %.2fs with key index %d", elapsed, i)
                return result

            except json.JSONDecodeError as e:
                logger.warning("Gemini returned invalid JSON on key %d (%.2fs): %s", i, elapsed, e)
                last_error = e
                continue
            except ValueError as e:
                logger.warning("Gemini safety block on key %d: %s", i, e)
                last_error = e
                continue
            except Exception as e:
                logger.warning("Gemini API error on key %d: %s", i, e)
                last_error = e
                continue

        raise RuntimeError(f"All Gemini API keys failed. Last error: {last_error}")


gemini_client = GeminiClient()
