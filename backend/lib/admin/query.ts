/**
 * Utilidades compartidas por las páginas del panel admin.
 *
 * Todas las pantallas filtran mediante query string (`?estado=...&q=...`) en
 * lugar de estado en el cliente: así las vistas son enlazables, funcionan sin
 * JavaScript y el filtrado vive en el repositorio (mock hoy, SQL mañana).
 */

export type SearchParams = Record<string, string | string[] | undefined>;

/** Next puede entregar un parámetro repetido como arreglo; nos quedamos con el primero. */
export function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Devuelve el valor solo si pertenece a la lista permitida (evita valores arbitrarios en la URL). */
export function oneOf<T extends string>(
  value: string | undefined,
  allowed: readonly T[],
): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

/** Texto de búsqueda normalizado; `undefined` si está vacío. */
export function queryText(value: string | string[] | undefined): string | undefined {
  return first(value)?.trim() || undefined;
}

/** Construye `href?clave=valor` omitiendo claves vacías. */
export function buildHref(
  base: string,
  params: Record<string, string | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
}
