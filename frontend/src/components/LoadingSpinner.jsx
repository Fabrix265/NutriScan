import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ message = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Loader2 className="h-12 w-12 animate-spin text-green-primary" />
      <p className="text-text-gray text-sm font-medium">{message}</p>
    </div>
  );
}
