import { useRef, useState, useEffect } from "react";
import { Camera, RotateCcw, Check } from "lucide-react";

export default function CameraCapture({ onCapture, onBack }) {
  const fileRef = useRef(null);
  const loadingRef = useRef(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleConfirm = () => {
    if (file && !loadingRef.current) {
      loadingRef.current = true;
      setLoading(true);
      onCapture(file);
    }
  };

  const handleReset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-6">
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleFile}
      />

      {!preview ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label="Tomar foto del producto"
          className="flex flex-col items-center gap-4 bg-green-bg rounded-2xl p-12 w-full max-w-sm border-2 border-dashed border-green-light hover:border-green-primary transition-colors"
        >
          <Camera className="h-16 w-16 text-green-primary" />
          <span className="text-text-gray font-medium">Tomar foto</span>
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <img
            src={preview}
            alt="Imagen del producto seleccionado"
            className="w-full rounded-2xl object-cover max-h-80"
          />
          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-text-gray font-semibold py-3 rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-40"
            >
              <RotateCcw className="h-5 w-5" />
              Volver
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-green-primary text-white font-semibold py-3 rounded-2xl hover:bg-green-dark transition-colors disabled:opacity-40"
            >
              <Check className="h-5 w-5" />
              {loading ? "Analizando..." : "Analizar"}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onBack}
        className="text-text-gray text-sm font-medium hover:text-text-dark transition-colors"
      >
        Volver al inicio
      </button>
    </div>
  );
}
