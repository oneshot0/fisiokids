# Feature Specification: Agenda Terapéutica, Evaluaciones y Módulo de Colegios

**Feature Branch**: `001-agenda-evaluaciones-colegios`

**Created**: 2026-09-16

**Status**: Draft

**Input**: User description: "Implementar la primera versión funcional de FisioKids para gestionar de forma segura las citas terapéuticas, registrar evaluaciones profesionales básicas y permitir la consulta limitada de información operativa por colegios autorizados."

## Clarifications

### Session 2026-09-16

- Q: ¿Qué valores exactos debe permitir el campo `estado` de una evaluación profesional? → A: `draft`, `active`, `superseded`
- Q: ¿Qué mensaje exacto debe mostrar el sistema cuando un tutor intenta cancelar una cita con menos de 24 horas de anticipación? → A: “Las cancelaciones requieren al menos 24 horas de anticipación. Comunícate con el centro si necesitas ayuda.”
- Q: ¿Qué zona horaria debe usar el centro para interpretar fechas, horas de citas y la regla de cancelación de 24 horas? → A: `America/Lima`
- Q: ¿Los tutores deben poder consultar evaluaciones profesionales en algún caso dentro de esta versión? → A: Sí, si el administrador habilita al tutor explícitamente
- Q: ¿Cómo debe cambiar el estado de una evaluación cuando un profesional registra una nueva versión? → A: Transición lineal: `draft → active → superseded`
- Q: Cuando el tutor consulta la fecha de hoy, ¿desde qué hora deben comenzar a mostrarse los bloques disponibles hasta las 22:00? → A: Desde la siguiente hora exacta posterior a la hora actual.

## User Scenarios & Testing

### User Story 1 - Gestionar una cita terapéutica segura (Priority: P1)

Como tutor autorizado, quiero consultar y reservar un bloque de terapia para uno
de los niños que tengo vinculados, para organizar su atención sin cruces de
horarios ni acceso a información de otros pacientes.

**Why this priority**: La agenda es la operación principal del MVP y debe impedir
reservas inválidas o duplicadas desde el primer flujo funcional.

**Independent Test**: Con una cuenta de tutor y un niño asociado, seleccionar una
fecha futura, reservar un bloque disponible de 60 minutos y verificar que la cita
aparezca en el panel del tutor sin permitir una segunda reserva superpuesta.

**Acceptance Scenarios**:

1. **Given** un tutor autenticado con un niño asociado, **When** consulta una fecha
   presente o futura, **Then** para el día actual solo se muestran bloques de 60
   minutos cuyo inicio sea posterior a la hora actual de `America/Lima`, redondeado
   a la siguiente hora exacta, hasta las 22:00; para días futuros se muestran los
   bloques disponibles completos entre las 12:00 y las 22:00, iniciados en horas
   exactas.
2. **Given** un bloque disponible y un terapeuta asignable, **When** el tutor confirma
   la reserva, **Then** se crea una cita con estado `scheduled`, duración de 60
   minutos y atención directa de 45 minutos.
3. **Given** una cita activa del mismo terapeuta en el mismo bloque, **When** alguien
   intenta reservarlo, **Then** la operación se rechaza con `409 Conflict` y se
   muestra “El horario seleccionado ya no está disponible. Elige otro, por favor.”
4. **Given** un tutor sin relación autorizada con un niño, **When** intenta reservar
   una cita para ese niño, **Then** la operación se rechaza sin revelar datos del niño.

---

### User Story 2 - Consultar y administrar citas según el rol (Priority: P1)

Como tutor, terapeuta o administrador, quiero consultar las citas que corresponden
a mi rol y cancelar o reprogramar las permitidas, para mantener una agenda
operativa y trazable.

**Why this priority**: La visibilidad limitada por rol evita filtraciones y permite
que cada participante gestione únicamente sus responsabilidades.

**Independent Test**: Crear citas de prueba ficticias y comprobar que cada rol ve
solo sus registros, que una cancelación conserva el historial y que el bloque
cancelado vuelve a estar disponible.

**Acceptance Scenarios**:

1. **Given** un tutor autenticado, **When** abre su panel, **Then** ve las citas
   futuras e históricas de sus niños asociados, sin citas de terceros.
2. **Given** un terapeuta autenticado, **When** abre su agenda, **Then** ve solo las
   citas y pacientes asignados a él.
3. **Given** un administrador autenticado, **When** consulta la agenda, **Then** puede
   consultar, cancelar y reprogramar las citas del sistema.
4. **Given** una cita futura de un tutor con al menos 24 horas de anticipación,
   **When** el tutor solicita cancelarla, **Then** cambia a `cancelled`, conserva
   su registro y libera el bloque.
5. **Given** una cita con menos de 24 horas para iniciar, **When** el tutor intenta
   cancelarla, **Then** la operación se rechaza con “Las cancelaciones requieren al
   menos 24 horas de anticipación. Comunícate con el centro si necesitas ayuda.” y
   un administrador conserva la capacidad operativa de cancelarla.

---

### User Story 3 - Registrar una evaluación profesional básica (Priority: P1)

Como terapeuta autorizado o administrador, quiero registrar el resultado consignado
por un profesional en una evaluación básica, para mantener un dato operativo
controlado sin generar diagnósticos automáticamente.

**Why this priority**: El registro profesional es sensible y debe quedar limitado
al personal autorizado, sin convertirse en una historia clínica completa.

**Independent Test**: Con una cuenta autorizada, registrar una evaluación de un niño
asignado usando nivel 1, 2 o 3 y comprobar que los roles no autorizados no pueden
leerla ni modificarla.

**Acceptance Scenarios**:

1. **Given** un terapeuta autorizado o administrador y un niño relacionado,
   **When** registra una evaluación con fecha, profesional, nivel 1, 2 o 3 y estado,
   **Then** el registro se crea correctamente.
2. **Given** una evaluación existente, **When** un usuario autorizado la actualiza,
   **Then** el cambio conserva un estado válido, respeta la transición
   `draft → active → superseded` y solo afecta al niño permitido.
3. **Given** un tutor o usuario de colegio, **When** intenta crear, modificar o
   consultar evaluaciones no habilitadas para su rol, **Then** recibe una respuesta
   de autorización segura sin datos sensibles.

---

### User Story 4 - Consultar estudiantes desde un colegio autorizado (Priority: P2)

Como usuario autorizado de un colegio, quiero consultar la lista mínima de
estudiantes vinculados a mi institución, para coordinar aspectos operativos sin
acceder a información clínica o de otros colegios.

**Why this priority**: El módulo de colegios aporta coordinación operativa, pero
requiere una frontera estricta de privacidad entre instituciones.

**Independent Test**: Asociar estudiantes ficticios a dos colegios y verificar que
cada usuario solo consulte los estudiantes de su institución y los campos mínimos
permitidos.

**Acceptance Scenarios**:

1. **Given** un usuario autenticado con rol `colegio`, **When** consulta su panel,
   **Then** ve solo estudiantes vinculados explícitamente a su institución.
2. **Given** un usuario de colegio, **When** intenta cambiar un identificador para
   consultar otro colegio, **Then** recibe `403 Forbidden` o `404 Not Found` sin
   inferir la existencia de estudiantes ajenos.
3. **Given** un estudiante visible para el colegio, **When** se muestra su ficha
   operativa, **Then** solo contiene nombre, tutor responsable, terapeuta asignado
   si está autorizado y estado operativo permitido.
4. **Given** un usuario de colegio, **When** intenta consultar una evaluación,
   nivel de TEA, diagnóstico o nota clínica, **Then** el acceso se rechaza.

---

### User Story 5 - Acceder a áreas protegidas según la sesión (Priority: P1)

Como usuario del sistema, quiero que la sesión y el rol se validen antes de cada
operación privada, para que mis datos y los de los niños estén protegidos.

**Why this priority**: La autenticación y autorización son condiciones de seguridad
transversales a todas las demás historias.

**Independent Test**: Ejecutar las mismas consultas como visitante, tutor,
terapeuta, colegio y administrador, y comprobar las respuestas y datos visibles
para cada combinación.

**Acceptance Scenarios**:

1. **Given** un visitante sin sesión, **When** intenta abrir un panel privado,
   **Then** la operación responde `401 Unauthorized`.
2. **Given** un usuario autenticado sin permiso suficiente, **When** intenta una
   operación restringida, **Then** responde `403 Forbidden`.
3. **Given** cualquier rol autorizado, **When** consulta información de un niño sin
   relación permitida, **Then** no recibe información ni identificadores sensibles.

### Edge Cases

- La fecha seleccionada puede ser la fecha actual, pero un bloque cuya hora ya pasó
  no debe aparecer como disponible.
- Para la fecha actual, si son las 18:00, los únicos inicios que pueden mostrarse
  son 19:00, 20:00 y 21:00; nunca se muestra el bloque de la hora actual ni uno
  anterior.
- Una fecha anterior a la actual no puede mostrar bloques reservables.
- Los bloques deben terminar como máximo a las 22:00; el último comienza a las 21:00.
- Un inicio en 12:30 o cualquier minuto distinto de `00` no es reservable.
- Una cita que termina a las 22:00 es válida; una que termina después no lo es.
- La franja de colegios de 08:00 a 12:30 no genera citas terapéuticas automáticamente.
- Las citas canceladas no producen conflictos y no se eliminan físicamente.
- Una cita completada no puede cancelarse automáticamente.
- Una segunda solicitud simultánea para el mismo bloque debe dejar como máximo una
  cita activa confirmada.
- Una evaluación con nivel distinto de 1, 2 o 3 debe rechazarse.
- Un usuario no debe inferir la existencia de registros de otro niño, colegio o cita
  mediante mensajes de error.
- Los errores técnicos no deben aparecer en la interfaz.

## Requirements

### Functional Requirements

- **FR-001**: El sistema MUST permitir iniciar sesión con correo electrónico y
  contraseña a usuarios autorizados.
- **FR-002**: El sistema MUST reconocer como mínimo los roles `tutor`, `terapeuta`,
  `colegio` y `administrador`, además del visitante no autenticado.
- **FR-003**: El sistema MUST exigir una sesión activa para toda operación privada y
  responder `401 Unauthorized` cuando no exista.
- **FR-004**: El sistema MUST verificar permisos y relaciones autorizadas en cada
  operación privada y responder `403 Forbidden` cuando corresponda.
- **FR-005**: El sistema MUST asociar cada niño con al menos un tutor responsable y
  mantener datos básicos operativos de nombre, apellidos y fecha de nacimiento.
- **FR-006**: El sistema MUST permitir al administrador asociar explícitamente un
  niño con un colegio y modificar o eliminar esa asociación.
- **FR-007**: El sistema MUST permitir consultar disponibilidad para fechas presentes
  o futuras en bloques de 60 minutos entre las 12:00 y las 22:00; para la fecha
  actual, solo debe mostrar inicios posteriores a la hora actual de `America/Lima`,
  redondeados a la siguiente hora exacta.
- **FR-008**: El sistema MUST ofrecer únicamente inicios en horas exactas y no
  ofrecer bloques pasados, el bloque correspondiente a la hora actual, horarios
  anteriores a las 12:00 o posteriores a las 21:00 como inicio; los días futuros
  deben mostrar el rango completo permitido hasta terminar a las 22:00.
- **FR-009**: El sistema MUST distinguir visualmente bloques disponibles, no
  disponibles y reservados sin exponer los motivos sensibles de indisponibilidad.
- **FR-010**: El sistema MUST crear una cita solo para un niño autorizado para el
  usuario, con tutor, terapeuta, fecha, inicio, fin y estado `scheduled`.
- **FR-011**: Cada cita MUST ocupar exactamente 60 minutos, con 45 minutos de
  atención directa y 15 minutos operativos protegidos.
- **FR-012**: El sistema MUST validar fecha, horario, disponibilidad, permisos y
  ausencia de cruces antes de crear o modificar una cita.
- **FR-013**: El sistema MUST rechazar con `409 Conflict` una cita activa que se
  cruce con otra del mismo terapeuta o, si existe, de la misma sala.
- **FR-014**: Las citas con estado `cancelled` MUST conservarse como registro y no
  bloquear disponibilidad.
- **FR-015**: El tutor MUST poder consultar las citas futuras e históricas de sus
  niños; el terapeuta, las asignadas a él; y el administrador, todas las citas.
- **FR-016**: El tutor MUST poder cancelar una cita futura solo con 24 horas o más
  antes de su inicio; el administrador MUST poder hacerlo fuera de ese plazo.
- **FR-017**: El sistema MUST rechazar la cancelación del tutor con menos de 24 horas
  y mostrar “Las cancelaciones requieren al menos 24 horas de anticipación.
  Comunícate con el centro si necesitas ayuda.”.
- **FR-018**: El sistema MUST impedir cancelar automáticamente citas canceladas,
  completadas o que ya hayan iniciado.
- **FR-019**: El sistema MUST permitir a un terapeuta autorizado o administrador
  registrar y actualizar evaluaciones profesionales básicas.
- **FR-020**: Cada evaluación MUST incluir niño, fecha, profesional responsable,
  nivel de TEA `1`, `2` o `3`, y un estado del registro: `draft`, `active` o
  `superseded`. Los estados solo pueden avanzar de `draft` a `active` y de
  `active` a `superseded`; un registro `superseded` no puede volver a estar activo.
- **FR-021**: El sistema MUST rechazar niveles distintos de `1`, `2` o `3` y MUST
  evitar diagnósticos o determinaciones automáticas.
- **FR-022**: El sistema MUST restringir evaluaciones y niveles de TEA a usuarios
  autorizados; colegios no pueden consultarlos y los tutores solo pueden
  consultarlos cuando un administrador los habilite explícitamente para ese niño.
- **FR-023**: El sistema MUST permitir a un usuario de colegio consultar solo los
  estudiantes vinculados explícitamente a su propia institución.
- **FR-024**: La información de colegio MUST limitarse a nombre del estudiante,
  tutor responsable, terapeuta asignado si está autorizado y estado operativo.
- **FR-025**: El sistema MUST impedir que un colegio consulte evaluaciones, nivel de
  TEA, diagnósticos, notas clínicas, tratamientos o datos médicos detallados.
- **FR-026**: Las consultas o coordinaciones de colegio MUST permanecer separadas de
  las citas terapéuticas y no crear citas automáticamente.
- **FR-027**: El sistema MUST utilizar mensajes de usuario claros y no revelar
  consultas, stack traces, tokens, identificadores internos ni datos de terceros.
- **FR-028**: El sistema MUST responder con códigos semánticos `200`, `201`, `400`,
  `401`, `403`, `404`, `409`, `422` y `500` según el resultado de la operación.
- **FR-029**: Los datos de desarrollo, pruebas, demostraciones y capturas MUST ser
  ficticios o anonimizados.

### Key Entities

- **Usuario**: Persona autenticada con correo, credenciales protegidas, rol y,
  cuando corresponda, institución o relación profesional autorizada.
- **Niño o paciente**: Menor con datos básicos de identificación operativa y uno o
  más tutores responsables; puede estar vinculado a un colegio.
- **Tutor**: Adulto responsable autorizado para gestionar la información y citas de
  los niños asociados.
- **Terapeuta**: Profesional autorizado con disponibilidad, pacientes, citas y
  evaluaciones asignadas.
- **Colegio**: Institución vinculada a estudiantes y usuarios de colegio autorizados.
- **Cita**: Reserva de un bloque de 60 minutos con niño, tutor, terapeuta, fecha,
  horario y estado; incluye 45 minutos directos y 15 minutos operativos.
- **Evaluación profesional**: Registro sensible de una evaluación realizada por un
  profesional autorizado, con fecha, nivel 1, 2 o 3 y estado.
- **Sala o ambiente**: Recurso operativo opcional que no puede tener citas activas
  superpuestas.
- **Disponibilidad**: Bloques que indican si un terapeuta y, cuando corresponda,
  una sala pueden recibir una cita.

## Success Criteria

### Measurable Outcomes

- **SC-001**: En pruebas de aceptación, el 100% de los intentos de acceso sin sesión
  a áreas privadas recibe `401 Unauthorized`.
- **SC-002**: En pruebas de autorización, el 100% de los roles solo puede consultar
  los niños, citas, colegios y evaluaciones permitidos para su relación.
- **SC-003**: El 100% de las citas creadas cumple un bloque exacto de 60 minutos,
  inicia entre las 12:00 y las 21:00 y termina a más tardar a las 22:00.
- **SC-004**: En 100 intentos de reservas simultáneas para el mismo terapeuta y
  bloque, como máximo una cita activa queda confirmada.
- **SC-005**: El 100% de las colisiones detectadas se rechaza con `409 Conflict` y
  un mensaje que no revela información de terceros.
- **SC-006**: El 100% de las cancelaciones de tutor con menos de 24 horas se rechaza,
  mientras que las solicitudes con 24 horas o más se procesan correctamente.
- **SC-007**: El 100% de las evaluaciones aceptadas contiene nivel 1, 2 o 3 y solo
  puede ser creado o modificado por un terapeuta autorizado o administrador.
- **SC-008**: En pruebas de colegios vinculados a instituciones distintas, el 100%
  de las consultas devuelve únicamente estudiantes de la institución autenticada.
- **SC-009**: Al menos el 90% de los usuarios de prueba puede completar su tarea
  principal de reservar, consultar o cancelar una cita en el primer intento.
- **SC-010**: Los usuarios de prueba pueden identificar el estado de un bloque y
  completar una reserva válida en menos de 3 minutos, sin instrucciones técnicas.
- **SC-011**: El 100% de los mensajes visibles ante errores de validación es
  comprensible y no contiene detalles técnicos ni datos sensibles.

## Assumptions

- La autenticación por correo y contraseña reutiliza o se integra con el mecanismo
  de usuarios autorizado que defina el producto, sin registro público irrestricto.
- El administrador configura terapeutas, disponibilidad, colegios, relaciones y,
  si aplica, salas antes de que tutores intenten reservar.
- La zona horaria operativa única del centro es `America/Lima` y debe aplicarse a
  fechas, horas de citas y la regla de cancelación de 24 horas.
- La duración de 60 minutos es fija para esta iteración; no se permiten sesiones
  parciales ni reservas separadas de los 45 minutos directos y 15 operativos.
- El nivel de TEA es un dato consignado por un profesional y no una conclusión
  generada por el sistema.
- La visualización de evaluaciones para tutores queda deshabilitada por defecto y
  requiere habilitación expresa del administrador para cada niño.
- Los registros de citas canceladas y evaluaciones mantienen su trazabilidad durante
  el periodo operativo definido por el centro.
- Las notificaciones externas, pagos, documentos médicos, historia clínica completa,
  mensajería, telemedicina, integraciones de calendarios e IA clínica están fuera
  del alcance de esta iteración.
