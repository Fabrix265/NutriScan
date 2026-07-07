import { ScanLine } from "lucide-react";

export default function HomeScreen({ onScan }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center gap-8">
      <div className="bg-green-bg rounded-full p-6">
        <ScanLine className="h-16 w-16 text-green-primary" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-dark">NutriScan</h1>
        <p className="text-text-gray text-sm max-w-xs mx-auto">
          Escanea un producto alimenticio y descubre si es saludable
        </p>
      </div>

      <button
        type="button"
        onClick={onScan}
        aria-label="Escanear producto alimenticio"
        className="bg-green-primary hover:bg-green-dark text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-colors active:scale-95 w-full max-w-xs"
      >
        Escanear producto
      </button>
    </div>
  );
}
