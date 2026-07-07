import logging
from io import BytesIO

from PIL import Image, ImageOps

from app.config import settings

logger = logging.getLogger(__name__)


def compress_image(image_bytes: bytes) -> tuple[bytes, str]:
    with BytesIO(image_bytes) as input_buffer:
        img = Image.open(input_buffer)

        try:
            img = ImageOps.exif_transpose(img)
        except Exception:
            logger.debug("No EXIF orientation data found")

        if img.width > settings.MAX_IMAGE_SIZE or img.height > settings.MAX_IMAGE_SIZE:
            img.thumbnail((settings.MAX_IMAGE_SIZE, settings.MAX_IMAGE_SIZE), Image.LANCZOS)

        if img.mode == "RGBA":
            background = Image.new("RGB", img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode == "P":
            img = img.convert("RGB")

        with BytesIO() as buffer:
            img.save(buffer, format="JPEG", quality=85)
            return buffer.getvalue(), "image/jpeg"
