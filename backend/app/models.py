from pydantic import BaseModel, Field


class NutritionTable(BaseModel):
    porcion: str
    calorias: str
    grasas: str
    azucares: str
    proteinas: str
    sodio: str
    fibra: str


class Alternative(BaseModel):
    nombre: str
    emoji: str


class AnalyzeResponse(BaseModel):
    producto: str
    es_saludable: bool
    tabla_nutricional: NutritionTable
    mensaje: str
    alternativas: list[Alternative] = Field(default_factory=list)
