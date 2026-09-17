# Modelo de datos

## Entidades

### User

- `id`, `email` único, `passwordHash`, `role`, `active`, `createdAt`,
  `updatedAt`.
- `role`: `tutor | terapeuta | colegio | administrador`.

### TutorProfile

- `id`, `userId` único, `displayName`, `phone`.
- Relación con uno o más niños mediante `ChildTutor`.

### TherapistProfile

- `id`, `userId` único, `displayName`, `active`.
- Relación con `ChildTherapist`, `Availability`, `Appointment` y
  `ProfessionalEvaluation`.

### School

- `id`, `name`, `active`.
- Usuarios autorizados mediante `SchoolMembership`; estudiantes mediante
  `ChildSchool`.

### SchoolMembership

- `userId`, `schoolId`, `active`.
- Solo un administrador puede crear o retirar la relación.

### Child

- `id`, `firstName`, `lastName`, `birthDate`, `operationalStatus`,
  `createdAt`, `updatedAt`.
- Debe tener al menos un `ChildTutor`.

### ChildTutor / ChildTherapist / ChildSchool

- `ChildTutor`: `childId`, `tutorId`, `isPrimary`.
- `ChildTherapist`: `childId`, `therapistId`, `active`.
- `ChildSchool`: `childId`, `schoolId`, `active`, `linkedAt`.
- Las tres son relaciones explícitas para autorización por recurso.

### Availability

- `id`, `therapistId`, `weekday`, `startMinute`, `endMinute`, `active`.
- Se interpreta en `America/Lima` para generar slots.
- Para la fecha actual, solo se generan slots cuyo inicio sea posterior a la hora
  actual y esté redondeado a la siguiente hora exacta; para fechas futuras se
  genera todo el rango configurado entre 12:00 y 21:00.

### Room

- `id`, `name`, `active`; nullable en una cita.

### Appointment

- `id`, `childId`, `tutorId`, `therapistId`, `roomId?`, `startsAt`, `endsAt`,
  `directMinutes=45`, `operationalMinutes=15`, `status`, timestamps y
  `cancelledAt?`.
- `status`: `scheduled | completed | cancelled`.
- Duración exacta de 60 minutos; rango persistido semiabierto `[startsAt, endsAt)`.
- Canceladas se conservan y no participan en disponibilidad/colisiones.

### ProfessionalEvaluation

- `id`, `childId`, `therapistId`, `recordedAt`, `teaLevel`, `status`,
  `revision`, `tutorVisible`, timestamps.
- `teaLevel`: solo `1 | 2 | 3`.
- Estados: `draft | active | superseded`; `superseded` es terminal.

### AuditLog

- `id`, `actorUserId`, `action`, `entity`, `entityId`, `metadataRedacted`,
  `createdAt`.
- No guarda tokens ni datos clínicos innecesarios.

## Reglas y transiciones

- Cada niño necesita al menos un tutor responsable antes de ser reservable.
- Una cita solo se crea con relación tutor-niño, terapeuta asignado/disponible,
  slot exacto y ausencia de colisiones.
- Colisión activa:
  `newStart < existingEnd AND newEnd > existingStart`, por terapeuta y sala.
- La base de datos refuerza exclusión de rangos para estados no `cancelled`; la
  migración debe habilitar `btree_gist` y declarar la exclusión parcial por
  terapeuta y sala. La aplicación traduce la violación a `409 Conflict`.
- `tutorVisible` solo lo habilita un administrador y no amplía permisos de
  colegio.
- `scheduled -> completed` o `scheduled -> cancelled`; citas `completed` y
  `cancelled` no se cancelan automáticamente.
- Evaluaciones: `draft -> active -> superseded`, sin saltos ni retrocesos.
- El DTO escolar nunca incluye evaluaciones, nivel TEA, diagnósticos, notas,
  tratamientos, datos médicos ni identificadores internos innecesarios.
