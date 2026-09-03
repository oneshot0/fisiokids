export type DbConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};

export const DB_ENV_VARS = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"] as const;

export type DbEnvVar = (typeof DB_ENV_VARS)[number];

export const DB_NOT_CONFIGURED_MESSAGE =
  "La conexión a MySQL todavía no está configurada. Copia `.env.example` a `.env` y completa DB_HOST, DB_PORT, DB_NAME, DB_USER y DB_PASSWORD.";

export function getMissingDbEnvVars(env: NodeJS.ProcessEnv = process.env): DbEnvVar[] {
  return DB_ENV_VARS.filter((name) => !env[name]?.trim());
}

export function isDbConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return getMissingDbEnvVars(env).length === 0;
}

/**
 * Lee la configuración de MySQL exclusivamente desde variables de entorno.
 * Devuelve `null` (sin lanzar) cuando falta alguna variable, para que la app
 * pueda seguir funcionando con datos mock.
 */
export function getDbConfig(env: NodeJS.ProcessEnv = process.env): DbConfig | null {
  const missing = getMissingDbEnvVars(env);
  if (missing.length > 0) return null;

  const port = Number(env.DB_PORT);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`DB_PORT debe ser un número entero válido (valor actual: "${env.DB_PORT}").`);
  }

  return {
    host: env.DB_HOST!.trim(),
    port,
    database: env.DB_NAME!.trim(),
    user: env.DB_USER!.trim(),
    password: env.DB_PASSWORD!,
  };
}

/** Igual que `getDbConfig`, pero lanza un error claro si la conexión no está configurada. */
export function requireDbConfig(env: NodeJS.ProcessEnv = process.env): DbConfig {
  const config = getDbConfig(env);
  if (!config) {
    const missing = getMissingDbEnvVars(env).join(", ");
    throw new Error(`${DB_NOT_CONFIGURED_MESSAGE} Faltan: ${missing}.`);
  }
  return config;
}
