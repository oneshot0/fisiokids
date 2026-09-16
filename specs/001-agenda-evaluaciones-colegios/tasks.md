---

description: "Lista de tareas para la agenda terapéutica, evaluaciones y módulo de colegios de FisioKids"
---

# Tareas: Agenda Terapéutica, Evaluaciones y Módulo de Colegios

**Entrada**: Documentos de diseño de `specs/001-agenda-evaluaciones-colegios/`

**Prerrequisitos**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md` y `.specify/memory/constitution.md`

**Pruebas**: Se incluyen pruebas unitarias, de contrato, integración y E2E porque la especificación define validaciones automatizadas, concurrencia, autorización, privacidad y criterios de aceptación medibles.

**Organización**: Las tareas están agrupadas por historia de usuario. La persistencia y los prerrequisitos de seguridad compartidos se completan antes del trabajo específico de cada historia.

## Fase 1: Configuración (Infraestructura compartida)

**Propósito**: Añadir las dependencias y la infraestructura local necesarias para la implementación con Next.js, Prisma, PostgreSQL, Auth.js, Zod, Vitest y Playwright.

- [ ] T001 Actualizar `package.json` con Prisma/Prisma Client, Auth.js, Zod, hashing de contraseñas compatible con Argon2id, Vitest, Testing Library y Playwright, además de los scripts `test`, `test:integration`, `test:e2e`, `prisma:generate` y `prisma:seed`
- [ ] T002 [P] Añadir marcadores de configuración sin secretos para PostgreSQL, Auth.js y `America/Lima` en `.env.example`
- [ ] T003 [P] Añadir los servicios de desarrollo de PostgreSQL y sus comprobaciones de salud en `docker-compose.yml`
- [ ] T004 [P] Configurar Vitest, los alias de rutas y el entorno de pruebas del servidor en `vitest.config.ts`
- [ ] T005 [P] Configurar Playwright para el flujo autenticado de reserva en `playwright.config.ts`
- [ ] T006 Crear los directorios planificados bajo `src/app/api`, `src/lib/{auth,authorization,appointments,evaluations,schools,db,validation}`, `prisma` y `tests/{unit,contract,integration,e2e}`

---

## Fase 2: Fundamentos (Prerrequisitos bloqueantes)

**Propósito**: Establecer la persistencia, autenticación, autorización, validación, manejo de errores y auditoría necesarios para todas las operaciones privadas.

**⚠️ CRÍTICO**: No se puede comenzar ninguna historia de usuario hasta completar esta fase.

- [ ] T007 Crear el esquema Prisma/PostgreSQL en `prisma/schema.prisma` para `User`, `TutorProfile`, `TherapistProfile`, `School`, `SchoolMembership`, `Child`, `ChildTutor`, `ChildTherapist`, `ChildSchool`, `Availability`, `Room`, `Appointment`, `ProfessionalEvaluation` y `AuditLog`, conservando las restricciones “role: `tutor | terapeuta | colegio | administrador`”, “teaLevel: solo `1 | 2 | 3`”, “status: `draft | active | superseded`” y “status: `scheduled | completed | cancelled`”
- [ ] T008 Crear la migración inicial de Prisma en `prisma/migrations/`, incluyendo PostgreSQL `btree_gist` y restricciones parciales de exclusión para rangos de citas activas por terapeuta y sala, excluyendo las citas `cancelled`
- [ ] T009 [P] Implementar el singleton de Prisma y el mapeo de errores de base de datos en `src/lib/db/client.ts` y `src/lib/db/errors.ts`
- [ ] T010 [P] Implementar la configuración del proveedor Credentials de Auth.js, la verificación segura de contraseñas, mensajes genéricos para cuentas inválidas y declaraciones mínimas de sesión en `src/lib/auth/config.ts`, `src/lib/auth/password.ts` y `src/app/api/auth/[...nextauth]/route.ts`
- [ ] T011 [P] Implementar las ayudas de autorización `requireSession`, `requireRole` y autorización por relación en `src/lib/authorization/session.ts`, `src/lib/authorization/roles.ts` y `src/lib/authorization/relationships.ts`
- [ ] T012 [P] Implementar esquemas Zod compartidos y ayudas de respuesta `{ code, message, fieldErrors? }` para `400`, `401`, `403`, `404`, `409`, `422` y `500` en `src/lib/validation/http.ts` y `src/lib/validation/schemas.ts`
- [ ] T013 [P] Implementar el registro redactado de `AuditLog` para lecturas y mutaciones sensibles en `src/lib/authorization/audit.ts`
- [ ] T014 Crear usuarios, perfiles, relaciones, disponibilidad, salas y citas ficticios para desarrollo en `prisma/seed.ts`, usando contraseñas no reutilizables
- [ ] T015 [P] Añadir fábricas compartidas de fixtures, roles y sesiones con datos anonimizados en `tests/fixtures/auth.ts`, `tests/fixtures/database.ts` y `tests/fixtures/domain.ts`
- [ ] T016 Añadir una prueba de verificación de migración y seed en `tests/integration/database-bootstrap.test.ts`, confirmando que cada `Child` tenga al menos un `ChildTutor` y que no existan datos personales reales

**Punto de control**: Las operaciones autenticadas del servidor, las restricciones de base de datos, los contratos de error y la auditoría están listas para el trabajo independiente de las historias.

---

## Fase 3: Historia de usuario 1 - Gestionar una cita terapéutica segura (Prioridad: P1) 🎯 MVP

**Objetivo**: Permitir que un tutor autorizado consulte disponibilidad futura válida y reserve exactamente un bloque terapéutico seguro de 60 minutos para un niño asociado.

**Prueba independiente**: Con un tutor, un niño asociado, un terapeuta asignado y una fecha futura, consultar los bloques, crear una reserva y verificar que una reserva duplicada o no autorizada sea rechazada sin exponer datos del niño.

### Pruebas para la Historia de Usuario 1

- [ ] T017 [P] [US1] Añadir pruebas unitarias para la generación de bloques en `America/Lima`, inicios en horas exactas, límites 12:00–22:00, filtrado de bloques pasados del día actual y duración de 60 minutos en `tests/unit/appointments/slots.test.ts`
- [ ] T018 [P] [US1] Añadir pruebas de contrato para `GET /api/appointments/availability` y `POST /api/appointments`, incluyendo formas de respuesta, comprobaciones de rol y errores genéricos en `tests/contract/appointments-availability.test.ts` y `tests/contract/appointments-create.test.ts`
- [ ] T019 [P] [US1] Añadir pruebas de integración PostgreSQL para exclusión de solapamientos de terapeuta/sala y 100 intentos concurrentes que dejen como máximo una cita activa en `tests/integration/appointments-concurrency.test.ts`

### Implementación de la Historia de Usuario 1

- [ ] T020 [P] [US1] Implementar la generación de bloques y las consultas de colisiones de disponibilidad en `src/lib/appointments/slots.ts` y `src/lib/appointments/availability.ts`, excluyendo citas canceladas y conservando la regla exacta `[startsAt, endsAt)`
- [ ] T021 [US1] Implementar la validación server-side y la creación transaccional de reservas en `src/lib/appointments/create.ts`, exigiendo relación tutor-niño, terapeuta asignado/disponible, cita exacta de 60 minutos, `directMinutes=45`, `operationalMinutes=15` y estado `scheduled`
- [ ] T022 [US1] Implementar `GET /api/appointments/availability` con comprobaciones de sesión/rol y DTO `{ date, timezone, slots }` en `src/app/api/appointments/availability/route.ts`
- [ ] T023 [US1] Implementar `POST /api/appointments` sin depender de la autorización del niño enviada por el cliente y con el mensaje genérico `409` “El horario seleccionado ya no está disponible. Elige otro, por favor.” en `src/app/api/appointments/route.ts`
- [ ] T024 [US1] Crear la interfaz autenticada de disponibilidad y reserva con estados disponible, no disponible y reservado en `src/app/(site)/agenda/page.tsx`, `src/app/(site)/agenda/AppointmentForm.tsx` y `src/components/appointments/AvailabilityGrid.tsx`
- [ ] T025 [US1] Añadir el flujo E2E de reserva y la comprobación de envíos duplicados en `tests/e2e/appointments.spec.ts`

**Punto de control**: Un tutor puede consultar y reservar de forma independiente un bloque válido, mientras las relaciones inválidas y las colisiones concurrentes siguen protegidas.

---

## Fase 4: Historia de usuario 2 - Consultar y administrar citas según el rol (Prioridad: P1)

**Objetivo**: Proporcionar listas de citas filtradas por rol, cancelación segura y reprogramación exclusiva del administrador, conservando el historial y la disponibilidad.

**Prueba independiente**: Crear sesiones ficticias de tutor, terapeuta y administrador; verificar que cada una vea solo su alcance, que una cancelación válida conserve el registro y libere el bloque, y que una cancelación tardía del tutor sea rechazada mientras el administrador pueda realizarla.

### Pruebas para la Historia de Usuario 2

- [ ] T026 [P] [US2] Añadir pruebas de contrato para los DTO de `GET /api/appointments` filtrados por rol y el comportamiento `401/403` en `tests/contract/appointments-list.test.ts`
- [ ] T027 [P] [US2] Añadir pruebas de contrato para cancelación y reprogramación, incluyendo el mensaje exacto de cancelación tardía y la colisión `409` de reprogramación en `tests/contract/appointments-actions.test.ts`
- [ ] T028 [P] [US2] Añadir pruebas de integración para conservación histórica, reutilización de bloques cancelados, protecciones de citas completadas/iniciadas y regla de 24 horas en `America/Lima` en `tests/integration/appointments-lifecycle.test.ts`

### Implementación de la Historia de Usuario 2

- [ ] T029 [P] [US2] Implementar consultas de citas filtradas por rol y mapeo de DTO en `src/lib/appointments/list.ts`, devolviendo los niños del tutor, las asignaciones del terapeuta o todos los registros para administradores sin identificadores de terceros
- [ ] T030 [US2] Implementar las reglas de cancelación en `src/lib/appointments/cancel.ts`, conservando registros cancelados, rechazando solicitudes del tutor con menos de 24 horas mediante “Las cancelaciones requieren al menos 24 horas de anticipación. Comunícate con el centro si necesitas ayuda.” y evitando cancelar citas `completed`, `cancelled` o ya iniciadas
- [ ] T031 [US2] Implementar la reprogramación exclusiva del administrador con revalidación de colisiones y exclusión de la propia cita en `src/lib/appointments/reschedule.ts`
- [ ] T032 [US2] Implementar `GET /api/appointments` en `src/app/api/appointments/route.ts` usando el servicio filtrado por rol y DTO paginados
- [ ] T033 [P] [US2] Implementar `POST /api/appointments/{id}/cancel` en `src/app/api/appointments/[id]/cancel/route.ts`
- [ ] T034 [P] [US2] Implementar `POST /api/appointments/{id}/reschedule` en `src/app/api/appointments/[id]/reschedule/route.ts`
- [ ] T035 [US2] Crear paneles de citas específicos por rol y controles de cancelación/reprogramación en `src/app/(site)/agenda/page.tsx` y `src/components/appointments/AppointmentList.tsx`

**Punto de control**: Los flujos de citas del tutor, terapeuta y administrador están filtrados por alcance, son auditables y respetan el ciclo de vida.

---

## Fase 5: Historia de usuario 3 - Registrar una evaluación profesional básica (Prioridad: P1)

**Objetivo**: Permitir que terapeutas y administradores autorizados creen y hagan avanzar evaluaciones profesionales sensibles sin revelar datos ni generar diagnósticos automáticos.

**Prueba independiente**: Crear una evaluación para un niño asignado con nivel 1, 2 o 3; hacerla avanzar únicamente mediante `draft -> active -> superseded`; verificar que fallen los niveles inválidos, los usuarios no autorizados y los intentos de reactivación.

### Pruebas para la Historia de Usuario 3

- [ ] T036 [P] [US3] Añadir pruebas unitarias para la validación del nivel TEA y la máquina de estados estricta `draft -> active -> superseded` en `tests/unit/evaluations/state-machine.test.ts`
- [ ] T037 [P] [US3] Añadir pruebas de contrato para creación, actualización y autorización de lectura de evaluaciones, incluyendo visibilidad para tutores y denegación a colegios en `tests/contract/evaluations.test.ts`
- [ ] T038 [P] [US3] Añadir pruebas de integración para garantizar una sola revisión activa y la sustitución transaccional de cambios sustantivos en evaluaciones activas en `tests/integration/evaluations-versioning.test.ts`

### Implementación de la Historia de Usuario 3

- [ ] T039 [P] [US3] Implementar la validación y la lógica de transición de evaluaciones en `src/lib/evaluations/rules.ts`, rechazando niveles fuera de `1 | 2 | 3` y evitando reactivar revisiones `superseded` o saltar transiciones
- [ ] T040 [US3] Implementar los servicios de creación, actualización versionada y lectura filtrada de evaluaciones en `src/lib/evaluations/service.ts`, estableciendo `tutorVisible` en `false` por defecto y permitiendo modificarlo solo a administradores
- [ ] T041 [US3] Implementar `POST /api/evaluations` en `src/app/api/evaluations/route.ts` para terapeutas asignados y administradores
- [ ] T042 [US3] Implementar `PATCH /api/evaluations/{id}` en `src/app/api/evaluations/[id]/route.ts` con creación transaccional de revisiones y respuestas de autorización seguras
- [ ] T043 [P] [US3] Implementar lecturas autorizadas de evaluaciones en `src/app/api/evaluations/[id]/route.ts` y `src/app/api/evaluations/route.ts`, excluyendo todos los datos de evaluación de los DTO destinados a colegios
- [ ] T044 [US3] Crear formularios de evaluación para terapeutas/administradores y una vista de solo lectura para tutores, condicionada por autorización explícita `tutorVisible`, en `src/app/(site)/evaluations/page.tsx` y `src/components/evaluations/EvaluationForm.tsx`

**Punto de control**: Los registros sensibles de evaluación están versionados, restringidos por rol, auditados y nunca se convierten en diagnósticos automáticos.

---

## Fase 6: Historia de usuario 5 - Acceder a áreas protegidas según la sesión (Prioridad: P1)

**Objetivo**: Exigir sesión, rol y relación autorizada antes de cada ruta privada, mostrando errores seguros y no técnicos.

**Prueba independiente**: Repetir solicitudes privadas representativas como visitante, tutor, terapeuta, usuario de colegio y administrador; verificar que cada combinación no autorizada devuelva el estado semántico correcto sin revelar la existencia del recurso.

### Pruebas para la Historia de Usuario 5

- [ ] T045 [P] [US5] Añadir pruebas de matriz de autorización para handlers con respuestas `401`, `403`, `404` y filtrado por relación en citas, evaluaciones y colegios en `tests/contract/authorization-matrix.test.ts`
- [ ] T046 [P] [US5] Añadir pruebas de credenciales de Auth.js para usuarios inactivos, cuentas desconocidas, contraseñas incorrectas, declaraciones mínimas de sesión y mensajes genéricos en `tests/unit/auth/credentials.test.ts`
- [ ] T047 [P] [US5] Añadir pruebas de integración que demuestren que los registros de auditoría redactan tokens, detalles clínicos e identificadores internos innecesarios en `tests/integration/audit-privacy.test.ts`

### Implementación de la Historia de Usuario 5

- [ ] T048 [US5] Integrar las protecciones de sesión y rol del servidor en todos los Route Handlers privados y layouts protegidos en `src/app/api/**/route.ts`, `src/app/(site)/agenda/page.tsx`, `src/app/(site)/evaluations/page.tsx` y `src/app/schools/panel/layout.tsx`
- [ ] T049 [US5] Añadir estados seguros de inicio de sesión, cierre de sesión, no autorizado y error mediante mensajes genéricos en `src/app/schools/login/LoginForm.tsx`, `src/app/schools/login/page.tsx` y `src/components/auth/AccessState.tsx`
- [ ] T050 [US5] Revisar y reforzar DTO privados, logs y límites de error para que ninguna respuesta exponga tokens, stack traces, datos clínicos o identificadores ajenos en `src/lib/validation/http.ts`, `src/app/error.tsx` y `src/app/global-error.tsx`

**Punto de control**: Cada operación privada está protegida en el servidor independientemente de la visibilidad del frontend, y los fallos de seguridad son explícitos sin revelar información sensible.

---

## Fase 7: Historia de usuario 4 - Consultar estudiantes desde un colegio autorizado (Prioridad: P2)

**Objetivo**: Permitir que un miembro activo de un colegio consulte únicamente los datos operativos mínimos de estudiantes pertenecientes al colegio derivado de su sesión.

**Prueba independiente**: Asociar niños ficticios a dos colegios; consultar como miembro de cada colegio y verificar el aislamiento institucional, los campos mínimos del DTO y la denegación de acceso a evaluaciones y datos clínicos.

### Pruebas para la Historia de Usuario 4

- [ ] T051 [P] [US4] Añadir pruebas de contrato para `GET /api/schools/students`, incluyendo institución derivada de la sesión, campos permitidos, respuesta vacía/404 y respuestas `401/403` en `tests/contract/schools-students.test.ts`
- [ ] T052 [P] [US4] Añadir pruebas de integración para el aislamiento entre dos colegios y la denegación explícita de evaluaciones, nivel TEA, diagnósticos, notas, tratamientos y datos médicos en `tests/integration/schools-privacy.test.ts`

### Implementación de la Historia de Usuario 4

- [ ] T053 [P] [US4] Implementar la consulta de membresía activa del colegio y el servicio de DTO allowlistado en `src/lib/schools/students.ts`, devolviendo únicamente `name`, `guardianName`, `therapistName?` y `operationalStatus`
- [ ] T054 [US4] Implementar `GET /api/schools/students` en `src/app/api/schools/students/route.ts` sin aceptar `schoolId` del cliente y sin crear ni consultar citas
- [ ] T055 [US4] Añadir la lista autenticada de estudiantes del colegio y estados vacíos/de error respetuosos de la privacidad en `src/app/schools/panel/students/page.tsx` y `src/components/schools/StudentDirectory.tsx`
- [ ] T056 [US4] Añadir operaciones de membresía escolar y asociación niño-colegio exclusivas del administrador en `src/lib/schools/memberships.ts`, `src/app/api/schools/memberships/route.ts` y `src/app/api/schools/children/route.ts`

**Punto de control**: Los usuarios de colegio pueden coordinar únicamente la lista operativa de su institución, sin acceso a datos clínicos ni de otros colegios.

---

## Fase 8: Pulido y preocupaciones transversales

**Propósito**: Validar la funcionalidad completa, documentar la configuración operativa y alinear las pantallas mock existentes con el comportamiento protegido nuevo sin ampliar el alcance del MVP.

- [ ] T057 [P] Actualizar `README.md` y `specs/001-agenda-evaluaciones-colegios/quickstart.md` con instrucciones de PostgreSQL, migraciones, seed, entorno, pruebas y datos ficticios
- [ ] T058 [P] Añadir documentación de solicitudes/respuestas y autorización para todos los Route Handlers implementados bajo `docs/api/appointments.md`, `docs/api/evaluations.md`, `docs/api/schools.md` y `docs/api/auth.md`
- [ ] T059 [P] Reemplazar los fallos mock silenciosos que devuelven éxito en pantallas privadas dentro de `src/lib/{schools,students,users,sessions,incidents,payments}/*-repository.ts` por estados explícitos de carga/error cuando dichas pantallas se superpongan con rutas protegidas
- [ ] T060 Ejecutar `npm run lint`, `npm run test`, `npm run test:integration` y el flujo crítico `npm run test:e2e`; resolver regresiones sin debilitar las reglas de autorización, privacidad, horarios o colisiones
- [ ] T061 Revisar la implementación contra `.specify/memory/constitution.md`, `specs/001-agenda-evaluaciones-colegios/spec.md` y `specs/001-agenda-evaluaciones-colegios/checklists/requirements.md`, registrando cualquier brecha de alcance o seguridad pendiente en `specs/001-agenda-evaluaciones-colegios/checklists/requirements.md`

---

## Dependencias y orden de ejecución

### Dependencias entre fases

- **Configuración (Fase 1)**: No tiene dependencias; T002–T006 pueden ejecutarse en paralelo después de T001 si el manifiesto de paquetes es la fuente de verdad.
- **Fundamentos (Fase 2)**: Depende de T001–T006; T009–T013 y T015 pueden ejecutarse en paralelo después de acordar el esquema/interfaces, mientras T014 y T016 dependen de T007–T008.
- **Historias de usuario (Fases 3–7)**: Dependen de la Fase 2. Las fases de historias pueden ejecutarse en paralelo después de los fundamentos, excepto las ediciones compartidas del mismo route o componente, que deben serializarse.
- **Pulido (Fase 8)**: Depende de completar las historias seleccionadas; T057–T059 pueden ejecutarse en paralelo antes de T060–T061.

### Dependencias entre historias de usuario

- **Historia de Usuario 1 (P1)**: Depende de la Fase 2; no depende de otra historia.
- **Historia de Usuario 2 (P1)**: Depende de la Fase 2 y de la persistencia/servicios de citas de US1; las listas, cancelaciones y reprogramaciones pueden implementarse después de que existan el modelo compartido de citas y las reglas de colisión.
- **Historia de Usuario 3 (P1)**: Depende de la Fase 2; no depende de las historias de citas.
- **Historia de Usuario 5 (P1)**: Depende de la Fase 2 y debe verificarse en las rutas de US1, US2, US3 y US4; puede desarrollarse en paralelo, pero la validación final de la matriz sigue a esas rutas.
- **Historia de Usuario 4 (P2)**: Depende de la Fase 2; no depende del comportamiento de citas o evaluaciones, aunque su validación final de privacidad debe confirmar que las evaluaciones sigan excluidas.

### Orden dentro de cada historia

- Las pruebas deben escribirse antes de la implementación y fallar inicialmente cuando el entorno lo permita.
- Las reglas de dominio y modelos preceden a los servicios; los servicios preceden a los Route Handlers; los Route Handlers preceden a la integración de UI.
- Los archivos compartidos, como `src/app/api/appointments/route.ts`, requieren integración serializada cuando las tareas de US1 y US2 los modifiquen.
- Una historia está completa únicamente cuando sus criterios de prueba independientes pasan sin depender de la UI de otra historia.

### Oportunidades de paralelización

- Las tareas de configuración T002–T006 pueden ejecutarse en paralelo después de decidir el manifiesto de paquetes.
- Las tareas de cliente de base de datos, Auth.js, autorización, validación HTTP, auditoría y fixtures T009–T015 pueden ejecutarse en paralelo cuando no compartan archivos.
- Las pruebas de bloques, contrato, concurrencia y la implementación de disponibilidad de US1 pueden avanzar en paralelo; el servicio de reserva y la conexión de rutas van después.
- Las pruebas de ciclo de vida de US2 pueden avanzar en paralelo, al igual que los Route Handlers de cancelación y reprogramación una vez estable el servicio.
- Las pruebas de reglas, contrato e integración de versionado de US3 pueden avanzar en paralelo.
- Las pruebas de contrato/privacidad de US4 y el servicio de DTO escolar pueden avanzar en paralelo.
- Después de la Fase 2, US1, US3, US4 y el trabajo inicial de US5 pueden asignarse en paralelo; US2 sigue a los fundamentos compartidos de citas.

## Ejemplo de paralelización: Historia de Usuario 1

```text
Tarea T017: Pruebas unitarias de generación de bloques en tests/unit/appointments/slots.test.ts
Tarea T018: Pruebas de contrato de disponibilidad/creación en tests/contract/appointments-availability.test.ts y tests/contract/appointments-create.test.ts
Tarea T019: Pruebas PostgreSQL de colisiones/concurrencia en tests/integration/appointments-concurrency.test.ts
Tarea T020: Servicios de bloques y disponibilidad en src/lib/appointments/slots.ts y src/lib/appointments/availability.ts
```

## Ejemplo de paralelización: Historia de Usuario 3

```text
Tarea T036: Pruebas de máquina de estados en tests/unit/evaluations/state-machine.test.ts
Tarea T037: Pruebas de contrato de evaluaciones en tests/contract/evaluations.test.ts
Tarea T039: Reglas de evaluación en src/lib/evaluations/rules.ts
```

## Ejemplo de paralelización: Historia de Usuario 4

```text
Tarea T051: Pruebas de contrato del endpoint escolar en tests/contract/schools-students.test.ts
Tarea T052: Pruebas de integración de privacidad escolar en tests/integration/schools-privacy.test.ts
Tarea T053: Servicio de DTO allowlistado escolar en src/lib/schools/students.ts
```

## Estrategia de implementación

### Primero el MVP

1. Completar la Fase 1 y la Fase 2.
2. Completar US1, incluyendo validación de colisiones/concurrencia y el flujo crítico de reserva.
3. Detenerse y validar US1 de forma independiente contra `quickstart.md`; este es el alcance MVP recomendado.
4. Añadir US2 y US3 para la administración operativa de citas y los registros de evaluaciones profesionales.

### Entrega incremental

1. Fundamentos listos: PostgreSQL, Prisma, Auth.js, autorización, validación, auditoría y seed.
2. US1: disponibilidad y reserva seguras → validar de forma independiente → demostrar/desplegar.
3. US2: ciclo de vida de citas filtrado por rol → validar de forma independiente.
4. US3: evaluaciones profesionales versionadas → validar de forma independiente.
5. US5: completar la matriz de áreas protegidas en todas las rutas privadas.
6. US4: DTO mínimo escolar y aislamiento institucional → validar de forma independiente.
7. Ejecutar el pulido, la documentación y las comprobaciones lint, unitarias, de integración y E2E.

### Estrategia de equipo en paralelo

1. Una persona completa la Fase 1 y coordina las decisiones de esquema/contratos de la Fase 2.
2. Después de la Fase 2, una persona se encarga de US1/US2 de citas, otra de US3 de evaluaciones y otra de US4/US5 de autorización y privacidad escolar.
3. Integrar serialmente los archivos de rutas compartidos y ejecutar la validación de la Fase 8 como puerta de lanzamiento.

## Notas

- Todas las tareas usan el formato checklist requerido, con ID secuencial, marcador `[P]` opcional únicamente para trabajo independiente, etiquetas de historia obligatorias en las fases de historias y una ruta de archivo exacta.
- `[P]` no anula dependencias causadas por archivos compartidos o migraciones de base de datos.
- Todos los seeds, fixtures, pruebas, capturas y ejemplos de documentación deben usar datos ficticios o anonimizados.
- Ninguna tarea añade pagos, notificaciones externas, historia clínica completa, diagnóstico automático u otra funcionalidad fuera del alcance del MVP.
