# Contrato HTTP: evaluaciones profesionales

## `POST /api/evaluations`

- Roles: `terapeuta` autorizado para el niño o `administrador`.
- Body: `{ childId, recordedAt, teaLevel, status }`.
- `teaLevel` solo admite `1`, `2` o `3`; no calcula diagnósticos.
- `201`: evaluación con `tutorVisible: false` por defecto.
- `401/403/422` según sesión, permiso o validación.

## `PATCH /api/evaluations/{id}`

- Transiciones estrictas `draft -> active -> superseded`.
- Un cambio sustantivo de una revisión activa crea una revisión nueva y
  supersede la anterior dentro de una transacción.
- Una revisión `superseded` no puede reactivarse.
- Solo administrador puede cambiar `tutorVisible`.

## Lectura

- Terapeuta autorizado y administrador: acceso profesional.
- Tutor: solo si `tutorVisible` fue habilitado explícitamente para ese niño.
- Colegio: siempre `403` o `404` genérico.
