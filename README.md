# NutriScan - App de Control Nutricional Escolar

Aplicación web mobile-first donde un estudiante toma una foto de un producto alimenticio, la IA (Gemini) lo identifica y evalúa si es saludable o no, mostrando una tabla nutricional. Si el producto no es saludable, se retiene y se ofrecen 5 alternativas saludables.

## Stack

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** FastAPI (Python) + Gemini API
- **Monorepo:** `frontend/` y `backend/` en el mismo repositorio

## Instalación

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
cp .env.example .env         # Agrega tus API keys de Gemini
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173` y hará proxy al backend en `http://localhost:8000`.

## Configuración de API Keys

1. Obtén tus API keys gratuitas de [Google AI Studio](https://aistudio.google.com/apikey)
2. Edita `backend/.env` y agrega las keys separadas por coma:
   ```
   GEMINI_API_KEYS=key1,key2,key3
   ```
3. El sistema rotará automáticamente entre las keys si una falla

## Estructura del Proyecto

```
NutriScan/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── gemini_client.py
│   │   ├── models.py
│   │   ├── routers/
│   │   │   └── analyze.py
│   │   └── utils/
│   │       └── image_utils.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── screens/
    │   └── api/
    ├── package.json
    └── vite.config.js
```
