import LoadingSpinner from "../components/LoadingSpinner";

export default function AnalyzingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <LoadingSpinner message="Analizando tu producto..." />
    </div>
  );
}
