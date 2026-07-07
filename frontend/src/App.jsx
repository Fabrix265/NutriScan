import { useState, useCallback } from "react";
import HomeScreen from "./screens/HomeScreen";
import CaptureScreen from "./screens/CaptureScreen";
import AnalyzingScreen from "./screens/AnalyzingScreen";
import ResultScreen from "./screens/ResultScreen";
import { analyzeImage } from "./api/analyzeApi";

const STEPS = { HOME: "home", CAPTURE: "capture", ANALYZING: "analyzing", RESULT: "result", ERROR: "error" };

function App() {
  const [step, setStep] = useState(STEPS.HOME);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRestart = useCallback(() => {
    setStep(STEPS.HOME);
    setResult(null);
    setError(null);
  }, []);

  const handleCapture = useCallback(async (file) => {
    setStep(STEPS.ANALYZING);
    try {
      const data = await analyzeImage(file);
      setResult(data);
      setStep(STEPS.RESULT);
    } catch (err) {
      setResult(null);
      let msg = "Error al conectar con el servidor";
      if (err.code === "ECONNABORTED") {
        msg = "La conexión tardó demasiado. Intenta de nuevo.";
      } else if (err.message && !err.response) {
        msg = err.message;
      } else if (err.response) {
        const detail = err.response.data?.detail;
        if (typeof detail === "string") {
          msg = detail;
        } else if (Array.isArray(detail)) {
          msg = detail.map((d) => d.msg || String(d)).join(", ");
        } else {
          msg = "Error inesperado del servidor.";
        }
      }
      setError(msg);
      setStep(STEPS.ERROR);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {step === STEPS.HOME && <HomeScreen onScan={() => setStep(STEPS.CAPTURE)} />}
      {step === STEPS.CAPTURE && <CaptureScreen onCapture={handleCapture} onBack={handleRestart} />}
      {step === STEPS.ANALYZING && <AnalyzingScreen />}
      {step === STEPS.RESULT && <ResultScreen data={result} onRestart={handleRestart} />}
      {step === STEPS.ERROR && (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-6" aria-live="assertive">
          <p className="text-red-soft text-center font-medium">{error}</p>
          <button
            type="button"
            onClick={handleRestart}
            className="bg-green-primary text-white font-semibold py-3 px-8 rounded-2xl hover:bg-green-dark transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
