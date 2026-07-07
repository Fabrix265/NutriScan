import { useState } from "react";
import ResultHealthy from "../components/ResultHealthy";
import ResultUnhealthy from "../components/ResultUnhealthy";
import AlternativesSelector from "../components/AlternativesSelector";
import DeliveryConfirmation from "../components/DeliveryConfirmation";

export default function ResultScreen({ data, onRestart }) {
  const [step, setStep] = useState("result");
  const [chosenAlternative, setChosenAlternative] = useState(null);

  if (!data) return null;

  if (data.es_saludable) {
    return <ResultHealthy data={data} onRestart={onRestart} />;
  }

  if (step === "alternatives") {
    return (
      <AlternativesSelector
        alternatives={data.alternativas}
        onSelect={(alt) => {
          setChosenAlternative(alt);
          setStep("delivery");
        }}
        onBack={() => setStep("result")}
      />
    );
  }

  if (step === "delivery" && chosenAlternative) {
    return (
      <DeliveryConfirmation
        alternative={chosenAlternative}
        onRestart={onRestart}
      />
    );
  }

  return (
    <ResultUnhealthy
      data={data}
      onShowAlternatives={() => setStep("alternatives")}
      onRestart={onRestart}
    />
  );
}
