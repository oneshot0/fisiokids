# Quickstart de validación

## Prerrequisitos

- Node.js compatible con Next.js 15.
- PostgreSQL local o gestionado.
- `DATABASE_URL`, `AUTH_SECRET` y configuración requerida por Auth.js.
- Datos ficticios: usuarios de cada rol, dos colegios, niños asociados,
  terapeutas, disponibilidad y una sala opcional.

## Preparación

```powershell
npm install
npx prisma migrate dev
npx prisma db seed
```

El seed debe usar únicamente datos ficticios y contraseñas de desarrollo no
reutilizadas.

## Validaciones automatizadas

```powershell
npm run lint
npm run test
npm run test:integration
```

Cubrir generación de slots, límites 12:00/22:00, zona `America/Lima`, regla de
visibilidad del día actual (a las 18:00 solo 19:00, 20:00 y 21:00), rango
completo para días futuros, regla de 24 horas, estados de evaluación y
autorización por relación. Las pruebas de
integración deben ejecutar dos reservas concurrentes para el mismo bloque y
confirmar una sola respuesta exitosa.

## Escenarios manuales

1. Como tutor, consultar un día futuro y reservar un slot exacto de uno de sus
   niños. Verificar 60 minutos, 45 directos y 15 operativos.
2. Repetir la reserva simultáneamente. Esperar una respuesta `201` y otra `409`
   con el mensaje genérico de indisponibilidad.
3. Cancelar con 24 horas o más y verificar que se conserva el registro y se
   libera el slot. Repetir con menos de 24 horas y verificar el mensaje exacto.
4. Consultar como terapeuta y administrador; confirmar sus alcances distintos.
5. Crear una evaluación y probar `draft -> active -> superseded`; confirmar que
   niveles fuera de 1, 2 o 3 devuelven `422`.
6. Comparar tutor no habilitado, tutor habilitado y colegio; solo el tutor
   explícitamente habilitado puede leer la evaluación.
7. Asociar niños ficticios a dos colegios y verificar que
   `GET /api/schools/students` devuelve solo la institución de la sesión y el
   DTO mínimo.
8. Ejecutar operaciones privadas sin sesión y con rol insuficiente; confirmar
   `401` y `403` sin datos de terceros.

Los contratos HTTP están en `contracts/` y las reglas de persistencia en
`data-model.md`.
# Quickstart implementado

1. Copia `.env.example` a `.env`.
2. Ejecuta `docker compose up -d db`.
3. Ejecuta `npx prisma migrate deploy` y `npm run prisma:seed`.
4. Inicia con `npm run dev`.
5. Comprueba `npm run lint`, `npm run test` y `npx tsc --noEmit`.

Si PostgreSQL o los navegadores de Playwright no están disponibles, las pruebas
unitarias y el typecheck siguen siendo ejecutables; las pruebas de integración
deben ejecutarse al disponer de la base de datos.
