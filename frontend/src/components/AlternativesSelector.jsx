import { useState } from "react";
import { Check } from "lucide-react";

export default function AlternativesSelector({ alternatives, onSelect, onBack }) {
  const [selected, setSelected] = useState(null);

  if (!alternatives || alternatives.length === 0) {
    return (
      <div className="flex flex-col items-center min-h-screen px-6 py-10 gap-6">
        <h2 className="text-xl font-bold text-text-dark text-center">
          Elige una alternativa saludable
        </h2>
        <p className="text-text-gray text-sm text-center">
          No se encontraron alternativas disponibles.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="w-full max-w-sm bg-gray-100 text-text-gray font-semibold py-3 rounded-2xl hover:bg-gray-200 transition-colors"
        >
          Volver
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    if (selected !== null) onSelect(alternatives[selected]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-10 gap-6">
      <h2 className="text-xl font-bold text-text-dark text-center">
        Elige una alternativa saludable
      </h2>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {alternatives.map((alt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary ${
              selected === i
                ? "border-green-primary bg-green-bg"
                : "border-gray-200 bg-white hover:border-green-light"
            }`}
          >
            <span className="text-3xl">{alt.emoji ?? "?"}</span>
            <span className="text-sm font-medium text-text-dark text-center">
              {alt.nombre ?? "Sin nombre"}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-3 w-full max-w-sm mt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-100 text-text-gray font-semibold py-3 rounded-2xl hover:bg-gray-200 transition-colors"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={selected === null}
          className="flex-1 flex items-center justify-center gap-2 bg-green-primary text-white font-semibold py-3 rounded-2xl hover:bg-green-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Check className="h-5 w-5" />
          Confirmar
        </button>
      </div>
    </div>
  );
}
