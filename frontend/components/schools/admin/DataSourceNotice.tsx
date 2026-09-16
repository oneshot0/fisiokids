import { DB_NOT_CONFIGURED_MESSAGE } from "@/lib/db/config";
import type { DataSource } from "@/lib/users/repository";

/** Etiqueta para el `action` de `PanelHeader`: indica si la vista usa datos mock o MySQL. */
export function DataSourceBadge({ source }: { source: DataSource }) {
  return (
    <span className="rounded-full bg-cream-100 px-3.5 py-1.5 text-xs font-bold text-brand-900/70 ring-1 ring-cream-200">
      {source === "mock" ? "Datos de ejemplo (sin MySQL)" : "Conectado a MySQL"}
    </span>
  );
}

/** Aviso amarillo con las instrucciones de `.env`; solo se muestra mientras no haya MySQL. */
export function DataSourceNotice({ source }: { source: DataSource }) {
  if (source !== "mock") return null;
  return (
    <p className="animate-fade-up mb-6 rounded-2xl bg-butter-100 px-5 py-3 text-sm font-semibold text-butter-600 ring-1 ring-butter-200">
      {DB_NOT_CONFIGURED_MESSAGE}
    </p>
  );
}
