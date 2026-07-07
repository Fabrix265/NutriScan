import { ShieldOff } from "lucide-react";
import NutritionTable from "../components/NutritionTable";

export default function ResultUnhealthy({ data, onShowAlternatives, onRestart }) {
  const hasAlternatives = data.alternativas && data.alternativas.length > 0;

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-10 gap-6">
      <div className="bg-red-soft/20 rounded-full p-4">
        <ShieldOff className="h-12 w-12 text-red-soft" />
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-red-soft">Producto retenido</h2>
        <p className="text-text-gray text-sm">{data.producto}</p>
      </div>

      <p className="text-text-dark text-center text-sm leading-relaxed max-w-sm">
        {data.mensaje}
      </p>

      <NutritionTable data={data.tabla_nutricional} />

      {hasAlternatives ? (
        <button
          type="button"
          onClick={onShowAlternatives}
          className="w-full max-w-sm bg-green-primary text-white font-semibold py-3 rounded-2xl hover:bg-green-dark transition-colors mt-4"
        >
          Ver alternativas saludables
        </button>
      ) : (
        <button
          type="button"
          onClick={onRestart}
          className="w-full max-w-sm bg-gray-100 text-text-gray font-semibold py-3 rounded-2xl hover:bg-gray-200 transition-colors mt-4"
        >
          Escanear otro producto
        </button>
      )}
    </div>
  );
}
