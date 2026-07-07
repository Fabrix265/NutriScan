import { useState } from "react";
import { PartyPopper } from "lucide-react";

export default function DeliveryConfirmation({ alternative, onRestart }) {
  const [delivered, setDelivered] = useState(false);

  if (delivered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-6">
        <div className="bg-green-bg rounded-full p-4">
          <PartyPopper className="h-12 w-12 text-green-primary" />
        </div>
        <h2 className="text-xl font-bold text-green-primary text-center">
          ¡Entrega registrada!
        </h2>
        <p className="text-text-gray text-sm text-center">
          Has recibido: {alternative.emoji} {alternative.nombre}
        </p>
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-6">
      <div className="text-center space-y-2">
        <span className="text-5xl">{alternative.emoji}</span>
        <h2 className="text-xl font-bold text-text-dark">{alternative.nombre}</h2>
        <p className="text-text-gray text-sm">Alternativa seleccionada</p>
      </div>

      <button
        type="button"
        onClick={() => setDelivered(true)}
        className="w-full max-w-sm bg-green-primary text-white font-semibold py-4 rounded-2xl text-lg hover:bg-green-dark transition-colors active:scale-95"
      >
        Entregar alimento saludable
      </button>
    </div>
  );
}
