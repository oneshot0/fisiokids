---

description: "Lista ejecutable de tareas para la agenda terapéutica, evaluaciones y módulo de colegios de FisioKids"
---

# Tareas: Agenda Terapéutica, Evaluaciones y Módulo de Colegios

**Entrada**: Documentos de diseño de `specs/001-agenda-evaluaciones-colegios/`

**Prerrequisitos**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md` y `.specify/memory/constitution.md`

**Pruebas**: Se incluyen pruebas porque la especificación exige validaciones automatizadas para horarios, concurrencia, autorización, privacidad y criterios de aceptación medibles.

**Formato**: Todas las tareas usan `- [ ] [TaskID] [P?] [Story?] Descripción con ruta exacta`.

## Fase 1: Configuración (Infraestructura compartida)

**Propósito**: Preparar dependencias, configuración local y estructura de pruebas sin ampliar el alcance del MVP.

- [X] T001 Confirmar en `package.json` los scripts `test`, `test:integration`, `test:e2e`, `prisma:generate` y `prisma:seed`, manteniendo Next.js 15, TypeScript, Prisma, Auth.js, Zod, Vitest y Playwright.
- [X] T002 [P] Añadir variables sin secretos para `DATABASE_URL`, `AUTH_SECRET` y `NEXT_PUBLIC_TIMEZONE=America/Lima` en `.env.example`.
- [X] T003 [P] Configurar PostgreSQL local con healthcheck en `docker-compose.yml`.
- [X] T004 [P] Configurar alias `@/`, entorno Node y descubrimiento de `tests/**/*.test.ts` en `vitest.config.ts`.
- [X] T005 [P] Configurar el proyecto autenticado y los navegadores requeridos para Playwright en `playwright.config.ts`.
- [ ] T006 [P] Crear las carpetas `src/lib/{auth,authorization,appointments,evaluations,schools,db,validation}`, `src/components/{appointments,evaluations,schools,auth}` y `tests/{fixtures,unit,contract,integration,e2e}`.

---

## Fase 2: Fundamentos (Prerrequisitos bloqueantes)

**Propósito**: Dejar listas persistencia, sesión, autorización, validación, auditoría y datos ficticios antes de implementar historias.

**⚠️ CRÍTICO**: Ninguna historia puede comenzar antes de completar esta fase.

- [X] T007 Actualizar `BD/prisma/schema.prisma` con `User`, `TutorProfile`, `TherapistProfile`, `School`, `SchoolMembership`, `Child`, `ChildTutor`, `ChildTherapist`, `ChildSchool`, `Availability`, `Room`, `Appointment`, `ProfessionalEvaluation` y `AuditLog`, conservando `role: tutor | terapeuta | colegio | administrador`, `teaLevel: 1 | 2 | 3`, estados de evaluación `draft | active | superseded` y estados de cita `scheduled | completed | cancelled`.
- [X] T008 Crear o ajustar `BD/prisma/migrations/0001_init/migration.sql` para habilitar `btree_gist` y aplicar exclusión de rangos a citas activas por terapeuta y sala, excluyendo `cancelled`.
- [X] T009 [P] Implementar el cliente Prisma singleton y el mapeo de errores de persistencia en `src/lib/db/client.ts` y `src/lib/db/errors.ts`.
- [X] T010 [P] Implementar Credentials provider, hash/verificación de contraseñas, cuentas inactivas y sesión mínima (`userId`, rol y membresía necesaria) en `src/lib/auth/config.ts`, `src/lib/auth/password.ts` y `src/app/api/auth/[...nextauth]/route.ts`.
- [X] T011 [P] Implementar `requireSession`, `requireRole` y autorización por relaciones en `src/lib/authorization/session.ts`, `src/lib/authorization/roles.ts` y `src/lib/authorization/relationships.ts`.
- [X] T012 [P] Implementar esquemas Zod y respuestas `{ code, message, fieldErrors? }` para `400`, `401`, `403`, `404`, `409`, `422` y `500` en `src/lib/validation/http.ts` y `src/lib/validation/schemas.ts`.
- [X] T013 [P] Implementar auditoría redactada de lecturas y mutaciones sensibles en `src/lib/authorization/audit.ts`, sin tokens, stack traces ni datos clínicos innecesarios.
- [X] T014 Crear seed con usuarios, perfiles, relaciones, disponibilidad, salas, citas y evaluaciones ficticios en `BD/prisma/seed.ts`, usando contraseñas de desarrollo no reutilizables.
- [ ] T015 [P] Crear fixtures anonimizadas de sesiones, roles, usuarios, niños, relaciones y fechas en `tests/fixtures/auth.ts`, `tests/fixtures/database.ts` y `tests/fixtures/domain.ts`.
- [ ] T016 Validar migración, seed y la regla de que cada `Child` tenga al menos un `ChildTutor` en `tests/integration/database-bootstrap.test.ts`.

**Punto de control**: La base de datos, sesión, autorización, validación y auditoría funcionan sin datos reales y protegen operaciones privadas.

---

## Fase 3: Historia de Usuario 1 - Gestionar una cita terapéutica segura (Prioridad: P1) 🎯 MVP

**Objetivo**: Consultar disponibilidad y reservar para un niño autorizado un bloque exacto de 60 minutos, con 45 minutos directos y 15 operativos.

**Prueba independiente**: Como tutor autenticado, consultar hoy y una fecha futura, verificar los slots permitidos, reservar un bloque asociado y comprobar que una reserva duplicada o no autorizada se rechace sin filtrar datos.

### Pruebas de la Historia de Usuario 1

- [X] T017 [P] [US1] Cubrir en `tests/unit/appointments/slots.test.ts` los inicios en horas exactas, el rango 12:00–21:00 con fin máximo 22:00, la zona `America/Lima` y la duración de 60 minutos.
- [X] T018 [P] [US1] Cubrir en `tests/unit/appointments/slots.test.ts` la regla del día actual: a las 18:00 solo pueden aparecer 19:00, 20:00 y 21:00; para días futuros debe aparecer el rango completo.
- [ ] T019 [P] [US1] Cubrir contratos de `GET /api/appointments/availability` y `POST /api/appointments` en `tests/contract/appointments-availability.test.ts` y `tests/contract/appointments-create.test.ts`, incluyendo `401`, `403`, `409` y DTOs.
- [ ] T020 [P] [US1] Cubrir la exclusión de solapamientos y 100 reservas concurrentes con como máximo una cita activa en `tests/integration/appointments-concurrency.test.ts`.

### Implementación de la Historia de Usuario 1

- [X] T021 [P] [US1] Implementar generación de slots y filtrado por disponibilidad/citas activas en `src/lib/appointments/slots.ts` y `src/lib/appointments/availability.ts`, usando `[startsAt, endsAt)`, `America/Lima` y el redondeo del día actual.
- [X] T022 [US1] Implementar validación y creación transaccional en `src/lib/appointments/create.ts`, exigiendo relación tutor-niño, terapeuta asignado y disponible, bloque exacto de 60 minutos, `directMinutes=45`, `operationalMinutes=15` y estado `scheduled`.
- [X] T023 [US1] Implementar `GET /api/appointments/availability` en `src/app/api/appointments/availability/route.ts` con sesión, roles permitidos, fecha presente/futura, zona `America/Lima` y respuesta `{ date, timezone, slots }`.
- [X] T024 [US1] Implementar `POST /api/appointments` en `src/app/api/appointments/route.ts` sin aceptar `tutorId` ni autorización del cliente, traduciendo conflictos a `409` con “El horario seleccionado ya no está disponible. Elige otro, por favor.”.
- [ ] T025 [US1] Implementar la interfaz de disponibilidad y reserva en `src/app/(site)/agenda/page.tsx`, `src/app/(site)/agenda/AppointmentForm.tsx` y `src/components/appointments/AvailabilityGrid.tsx`, distinguiendo `available`, `unavailable` y `reserved`.
- [ ] T026 [US1] Añadir el flujo autenticado de reserva, bloqueo de envíos duplicados y validación del rango de hoy en `tests/e2e/appointments.spec.ts`.

**Punto de control**: Un tutor puede consultar y reservar un bloque válido; las relaciones inválidas, horarios fuera de rango y carreras concurrentes quedan protegidos.

---

## Fase 4: Historia de Usuario 2 - Consultar y administrar citas según el rol (Prioridad: P1)

**Objetivo**: Filtrar citas por tutor, terapeuta y administrador, conservar cancelaciones y permitir reprogramación solo administrativa.

**Prueba independiente**: Con sesiones ficticias de cada rol, comprobar alcance de lectura, cancelación con 24 horas, rechazo de cancelación tardía del tutor, cancelación administrativa y reprogramación sin colisiones.

### Pruebas de la Historia de Usuario 2

- [ ] T027 [P] [US2] Cubrir DTOs y autorización de `GET /api/appointments` en `tests/contract/appointments-list.test.ts`.
- [ ] T028 [P] [US2] Cubrir cancelación, reprogramación, mensaje exacto de cancelación tardía y conflictos `409` en `tests/contract/appointments-actions.test.ts`.
- [ ] T029 [P] [US2] Cubrir historial, liberación de slots, citas completadas/iniciadas y regla de 24 horas en `tests/integration/appointments-lifecycle.test.ts`.

### Implementación de la Historia de Usuario 2

- [ ] T030 [P] [US2] Implementar consultas filtradas por rol y DTOs sin identificadores ajenos en `src/lib/appointments/list.ts`.
- [ ] T031 [US2] Implementar cancelación en `src/lib/appointments/cancel.ts`, conservando el registro, liberando disponibilidad, rechazando menos de 24 horas para tutores y bloqueando citas `completed`, `cancelled` o iniciadas.
- [ ] T032 [US2] Implementar reprogramación administrativa con revalidación de zona, disponibilidad y colisiones en `src/lib/appointments/reschedule.ts`.
- [ ] T033 [US2] Implementar `GET /api/appointments` en `src/app/api/appointments/route.ts` con filtros server-side por rol y respuesta paginada.
- [ ] T034 [P] [US2] Implementar `POST /api/appointments/[id]/cancel` en `src/app/api/appointments/[id]/cancel/route.ts`.
- [ ] T035 [P] [US2] Implementar `POST /api/appointments/[id]/reschedule` en `src/app/api/appointments/[id]/reschedule/route.ts` solo para `administrador`.
- [ ] T036 [US2] Crear lista y controles de citas por rol en `src/components/appointments/AppointmentList.tsx` y `src/app/(site)/agenda/page.tsx`, sin duplicar reglas server-side.

**Punto de control**: Las citas se consultan y modifican según rol, las cancelaciones son trazables y los bloques cancelados vuelven a estar disponibles.

---

## Fase 5: Historia de Usuario 3 - Registrar una evaluación profesional básica (Prioridad: P1)

**Objetivo**: Crear y versionar evaluaciones profesionales con niveles 1, 2 o 3, sin diagnóstico automático ni acceso indebido.

**Prueba independiente**: Crear una evaluación autorizada, ejecutar solo `draft -> active -> superseded`, comprobar que exista una sola revisión activa y denegar niveles inválidos, colegios y tutores no habilitados.

### Pruebas de la Historia de Usuario 3

- [X] T037 [P] [US3] Cubrir niveles `1 | 2 | 3` y la máquina `draft -> active -> superseded` en `tests/unit/evaluations/state-machine.test.ts`.
- [ ] T038 [P] [US3] Cubrir creación, actualización, lecturas autorizadas, `tutorVisible` y denegación a colegios en `tests/contract/evaluations.test.ts`.
- [ ] T039 [P] [US3] Cubrir una sola revisión activa y sustitución transaccional en `tests/integration/evaluations-versioning.test.ts`.

### Implementación de la Historia de Usuario 3

- [X] T040 [P] [US3] Implementar reglas de nivel y transición estricta en `src/lib/evaluations/rules.ts`, rechazando niveles distintos de `1`, `2` o `3` y cualquier retroceso.
- [ ] T041 [US3] Implementar creación, actualización versionada, lectura filtrada y visibilidad explícita de tutor en `src/lib/evaluations/service.ts`, permitiendo cambiar `tutorVisible` solo a administradores.
- [X] T042 [US3] Implementar `POST /api/evaluations` en `src/app/api/evaluations/route.ts` para terapeutas asignados y administradores.
- [X] T043 [US3] Implementar `PATCH /api/evaluations/[id]` en `src/app/api/evaluations/[id]/route.ts` con transacción y denegación segura.
- [ ] T044 [P] [US3] Implementar lecturas autorizadas en `src/app/api/evaluations/route.ts` y `src/app/api/evaluations/[id]/route.ts`, excluyendo evaluaciones y niveles TEA de DTOs escolares.
- [ ] T045 [US3] Crear formulario profesional y vista de tutor condicionada por `tutorVisible` en `src/app/(site)/evaluations/page.tsx` y `src/components/evaluations/EvaluationForm.tsx`.

**Punto de control**: Las evaluaciones están versionadas, auditadas, limitadas por rol y nunca se convierten en diagnósticos automáticos.

---

## Fase 6: Historia de Usuario 5 - Acceder a áreas protegidas según la sesión (Prioridad: P1)

**Objetivo**: Exigir autenticación, rol y relación autorizada antes de cada operación privada, con errores semánticos y no reveladores.

**Prueba independiente**: Repetir operaciones privadas como visitante, tutor, terapeuta, colegio y administrador; verificar `401`, `403`, `404` y filtrado de datos.

### Pruebas de la Historia de Usuario 5

- [ ] T046 [P] [US5] Cubrir la matriz de autorización para citas, evaluaciones y colegios en `tests/contract/authorization-matrix.test.ts`.
- [ ] T047 [P] [US5] Cubrir credenciales inválidas, usuarios inactivos, sesión mínima y mensajes genéricos en `tests/unit/auth/credentials.test.ts`.
- [ ] T048 [P] [US5] Cubrir auditoría redactada de tokens, datos clínicos e identificadores innecesarios en `tests/integration/audit-privacy.test.ts`.

### Implementación de la Historia de Usuario 5

- [ ] T049 [US5] Integrar `requireSession`, `requireRole` y autorización relacional en todos los handlers privados bajo `src/app/api/**/route.ts` y en `src/app/schools/panel/layout.tsx`.
- [ ] T050 [US5] Crear estados de inicio, cierre, no autorizado y error con mensajes genéricos en `src/app/schools/login/LoginForm.tsx`, `src/app/schools/login/page.tsx` y `src/components/auth/AccessState.tsx`.
- [ ] T051 [US5] Reforzar DTOs, logs y límites de error para no exponer tokens, stack traces, datos clínicos ni identificadores ajenos en `src/lib/validation/http.ts`, `src/app/error.tsx` y `src/app/global-error.tsx`.

**Punto de control**: Toda operación privada está protegida en servidor, independientemente de los controles visibles en frontend.

---

## Fase 7: Historia de Usuario 4 - Consultar estudiantes desde un colegio autorizado (Prioridad: P2)

**Objetivo**: Permitir que un miembro escolar consulte solo estudiantes de su institución y únicamente el DTO operativo mínimo.

**Prueba independiente**: Asociar niños ficticios a dos colegios; comprobar aislamiento institucional, campos permitidos y denegación de información clínica.

### Pruebas de la Historia de Usuario 4

- [ ] T052 [P] [US4] Cubrir `GET /api/schools/students`, institución derivada de sesión, DTO allowlistado y respuestas `401/403` en `tests/contract/schools-students.test.ts`.
- [ ] T053 [P] [US4] Cubrir aislamiento entre dos colegios y exclusión de evaluaciones, nivel TEA, diagnósticos, notas, tratamientos y datos médicos en `tests/integration/schools-privacy.test.ts`.

### Implementación de la Historia de Usuario 4

- [X] T054 [P] [US4] Implementar membresía activa y DTO escolar con solo `name`, `guardianName`, `therapistName?` y `operationalStatus` en `src/lib/schools/students.ts`.
- [X] T055 [US4] Implementar `GET /api/schools/students` en `src/app/api/schools/students/route.ts`, derivando `schoolId` de la sesión y sin crear citas.
- [ ] T056 [US4] Crear lista escolar, estados vacíos y errores respetuosos de privacidad en `src/app/schools/panel/students/page.tsx` y `src/components/schools/StudentDirectory.tsx`.
- [ ] T057 [US4] Implementar gestión administrativa de membresías y asociaciones niño-colegio en `src/lib/schools/memberships.ts`, `src/app/api/schools/memberships/route.ts` y `src/app/api/schools/children/route.ts`.

**Punto de control**: El colegio ve únicamente la lista operativa de su institución y no puede consultar datos clínicos ni de otros colegios.

---

## Fase 8: Pulido y preocupaciones transversales

**Propósito**: Validar el alcance completo, documentar la operación y corregir regresiones sin añadir funcionalidades fuera del MVP.

- [ ] T058 [P] Actualizar `README.md` y `specs/001-agenda-evaluaciones-colegios/quickstart.md` con PostgreSQL, migraciones, seed, variables, pruebas y datos ficticios.
- [ ] T059 [P] Documentar solicitudes, respuestas, autorización y errores en `docs/api/appointments.md`, `docs/api/evaluations.md`, `docs/api/schools.md` y `docs/api/auth.md`.
- [ ] T060 [P] Reemplazar respuestas de éxito ficticias o fallos silenciosos en las pantallas privadas bajo `src/app/schools/` por estados explícitos de carga y error.
- [ ] T061 Ejecutar `npm run lint`, `npm run test`, `npm run test:integration`, `npx tsc --noEmit` y `npm run test:e2e`; resolver regresiones sin debilitar seguridad, privacidad, horarios o colisiones.
- [ ] T062 Revisar la implementación contra `.specify/memory/constitution.md`, `specs/001-agenda-evaluaciones-colegios/spec.md` y `specs/001-agenda-evaluaciones-colegios/checklists/requirements.md`, registrando brechas pendientes sin marcar tareas como completadas.

---

## Dependencias y orden de ejecución

### Dependencias entre fases

- **Fase 1** no depende de otra fase; T002–T006 pueden ejecutarse en paralelo después de confirmar T001.
- **Fase 2** depende de la Fase 1 y bloquea todas las historias.
- **US1, US3, US5 y US4** pueden iniciar después de la Fase 2; los archivos compartidos deben editarse de forma serializada.
- **US2** depende de los modelos y servicios de citas de US1, aunque sus pruebas de ciclo de vida pueden prepararse en paralelo.
- **Fase 8** depende de las historias que se decida entregar.

### Dependencias entre historias

- **US1 (P1)**: depende solo de Fundamentos; es el MVP recomendado.
- **US2 (P1)**: depende de Fundamentos y de las reglas de cita creadas en US1.
- **US3 (P1)**: depende solo de Fundamentos.
- **US5 (P1)**: depende de Fundamentos y debe cubrir todas las rutas privadas.
- **US4 (P2)**: depende de Fundamentos; su validación final debe confirmar que las evaluaciones siguen excluidas.

## Oportunidades de ejecución en paralelo

- T002–T006 después de T001.
- T009–T013 y T015 después de acordar T007–T008.
- T017–T020 y T021 pueden avanzar en paralelo antes de conectar los handlers T023–T024.
- T027–T029, T030 y T034–T035 pueden dividirse una vez disponibles los servicios de US1.
- T037–T039 y T040 pueden avanzar en paralelo.
- T046–T048 y T049–T050 pueden dividirse por archivos.
- T052–T054 pueden avanzar en paralelo.
- T058–T060 pueden ejecutarse en paralelo antes de T061.

## Ejemplos de paralelización

### Historia de Usuario 1

```text
Tarea: T017 — pruebas unitarias de slots en tests/unit/appointments/slots.test.ts
Tarea: T019 — pruebas de contrato en tests/contract/appointments-availability.test.ts y tests/contract/appointments-create.test.ts
Tarea: T020 — pruebas de concurrencia en tests/integration/appointments-concurrency.test.ts
Tarea: T021 — generación y disponibilidad en src/lib/appointments/slots.ts y src/lib/appointments/availability.ts
```

### Historia de Usuario 3

```text
Tarea: T037 — máquina de estados en tests/unit/evaluations/state-machine.test.ts
Tarea: T038 — contratos en tests/contract/evaluations.test.ts
Tarea: T040 — reglas en src/lib/evaluations/rules.ts
```

### Historia de Usuario 4

```text
Tarea: T052 — contrato escolar en tests/contract/schools-students.test.ts
Tarea: T053 — privacidad escolar en tests/integration/schools-privacy.test.ts
Tarea: T054 — DTO escolar en src/lib/schools/students.ts
```

## Estrategia de implementación

### MVP primero

1. Completar Fase 1 y Fase 2.
2. Completar US1, incluyendo validación del día actual, concurrencia y flujo autenticado.
3. Ejecutar los escenarios de US1 en `quickstart.md` y detenerse para validar el MVP.

### Entrega incremental

1. Añadir US2 para ciclo de vida y administración de citas.
2. Añadir US3 para evaluaciones profesionales versionadas.
3. Aplicar US5 transversalmente a todas las rutas privadas.
4. Añadir US4 para colegios y aislamiento institucional.
5. Ejecutar Fase 8 como puerta de lanzamiento.

### Validación del formato

Todas las tareas tienen checkbox pendiente, identificador secuencial `T001`–`T062`, marcador `[P]` solo cuando corresponde, etiqueta `[USn]` en fases de historias y ruta de archivo explícita.
