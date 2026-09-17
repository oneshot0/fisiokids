# Contrato HTTP: citas y disponibilidad

Todos los endpoints requieren sesión. Fechas se interpretan en `America/Lima`;
instantes se serializan en ISO 8601. Los errores usan
`{ code, message, fieldErrors? }` sin detalles técnicos.

## `GET /api/appointments/availability?date=YYYY-MM-DD`

- Roles: `tutor`, `terapeuta`, `administrador`.
- El tutor recibe disponibilidad de sus niños; el servidor resuelve terapeuta
  entre asignaciones válidas.
- Para la fecha actual, `slots` solo incluye inicios posteriores a la hora actual
  de `America/Lima`, redondeados a la siguiente hora exacta. Por ejemplo, a las
  18:00 solo puede devolver 19:00, 20:00 y 21:00. Para fechas futuras devuelve el
  rango completo de 12:00 a 21:00.
- `200`: `{ date, timezone, slots: [{ startsAt, endsAt, state }] }`.
- `state`: `available | unavailable | reserved`.
- `400` fecha inválida/pasada; `401` sin sesión; `403` sin rol.

## `POST /api/appointments`

- Roles: `tutor`, `administrador`.
- Body: `{ childId, startsAt }`; no se acepta `tutorId` del cliente.
- `201`: cita `scheduled`, 60 minutos, 45 directos y 15 operativos.
- `409`: `"El horario seleccionado ya no está disponible. Elige otro, por favor."`
- `400/422` entrada o regla inválida; `401/403` según sesión/rol.

## `GET /api/appointments`

- Tutor: citas de sus niños; terapeuta: asignadas a él; administrador: todas.
- `200` lista paginada de DTOs dentro del alcance del rol.

## `POST /api/appointments/{id}/cancel`

- Tutor: cita relacionada, futura, `scheduled` y con al menos 24 horas.
- Administrador: puede cancelar una cita futura fuera de ese plazo.
- `200`: registro conservado con `status: cancelled`.
- `422`: mensaje exacto de cancelación tardía para tutor.

## `POST /api/appointments/{id}/reschedule`

- Solo `administrador` en esta iteración; body `{ startsAt }`.
- Revalida reglas y excluye la cita actual al buscar colisiones; `409` si colide.
