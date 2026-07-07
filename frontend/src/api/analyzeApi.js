import axios from "axios";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 60000,
});

export async function analyzeImage(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Tipo de archivo no válido. Usa JPG, PNG o WebP.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("La imagen es demasiado grande. Máximo 10MB.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.post("/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
