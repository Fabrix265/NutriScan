const rows = [
  { key: "porcion", label: "Porcion" },
  { key: "calorias", label: "Calorias" },
  { key: "grasas", label: "Grasas" },
  { key: "azucares", label: "Azúcares" },
  { key: "proteinas", label: "Proteínas" },
  { key: "sodio", label: "Sodio" },
  { key: "fibra", label: "Fibra" },
];

export default function NutritionTable({ data }) {
  if (!data || typeof data !== "object") return null;

  return (
    <div className="rounded-2xl border-2 border-green-light bg-green-bg p-4 w-full">
      <h3 className="text-green-primary font-semibold text-base mb-3 text-center">
        Tabla Nutricional
      </h3>
      <div className="divide-y divide-green-light/50">
        {rows.map(({ key, label }) => (
          <div key={key} className="flex justify-between py-2 text-sm">
            <span className="text-text-gray font-medium">{label}</span>
            <span className="text-text-dark font-semibold">{data[key] ?? "\u2014"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
