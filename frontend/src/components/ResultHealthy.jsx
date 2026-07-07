import { CheckCircle } from "lucide-react";
import NutritionTable from "../components/NutritionTable";

export default function ResultHealthy({ data, onRestart }) {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-10 gap-6">
      <div className="bg-green-bg rounded-full p-4">
        <CheckCircle className="h-12 w-12 text-green-primary" />
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-green-primary">
          ¡Excelente elección!
        </h2>
        <p className="text-text-gray text-sm">{data.producto}</p>
      </div>

      <p className="text-text-dark text-center text-sm leading-relaxed max-w-sm">
        {data.mensaje}
      </p>

      <NutritionTable data={data.tabla_nutricional} />

      <button
        type="button"
        onClick={onRestart}
        className="w-full max-w-sm bg-green-primary text-white font-semibold py-3 rounded-2xl hover:bg-green-dark transition-colors mt-4"
      >
        Escanear otro producto
      </button>
    </div>
  );
}
