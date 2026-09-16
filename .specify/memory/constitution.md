<!--
Sync Impact Report
- Version change: inexistente → 1.0.0
- Modified principles: no aplica; constitución inicial
- Added sections: Core Principles, Additional Constraints, Development Workflow,
  Governance
- Removed sections: no aplica
- Follow-up TODOs: definir la fecha original de ratificación
-->

# FisioKids Constitution

## Core Principles

### I. Propósito, alcance y simplicidad del MVP

FisioKids MUST operar como una plataforma web para un centro de atención terapéutica
infantil orientado a niños con trastorno del espectro autista (TEA), sus familias o
tutores, terapeutas y colegios vinculados. El sistema MUST distinguir entre el sitio
web público y el módulo privado de colegios.

El MVP MUST limitarse a: sitio institucional; registro e inicio de sesión de usuarios
autorizados; roles y permisos; creación, consulta, modificación y cancelación de
citas; disponibilidad de terapeutas; prevención de cruces; paneles diferenciados;
acceso restringido de colegios; gestión básica de niños vinculados a un tutor; y
asociaciones autorizadas entre niño, colegio y terapeuta.

FisioKids MUST NOT ser tratado como historia clínica electrónica, sistema de
diagnóstico médico ni sustituto de atención clínica. Quedan fuera del MVP pagos,
historia clínica completa, diagnósticos, recetas o medicamentos, chat, foros,
videollamadas, telemedicina, integraciones externas automáticas, IA clínica,
aplicación móvil nativa y analítica o reportes clínicos complejos. Cualquier
excepción REQUIRES una actualización formal de la especificación.

No se debe desarrollar funcionalidad fuera del alcance “por si acaso”. La solución
MUST preferir el diseño más simple que satisfaga la especificación, evitando
Clean Architecture, DDD completo, CQRS, microservicios, repositorios abstractos,
factories innecesarias y capas complejas durante el MVP.

### II. Seguridad, privacidad y autorización por mínimo privilegio

El sistema MUST proteger especialmente la información de menores. Ningún usuario
puede acceder a un niño sin una relación autorizada. Un colegio MUST ver únicamente
estudiantes vinculados explícitamente a su institución; un terapeuta, únicamente
pacientes, citas y horarios asignados; y un tutor, únicamente los menores que tenga
asociados como responsable. Solo el administrador puede crear o modificar relaciones
entre niño, tutor, colegio y terapeuta, salvo especificación posterior aprobada.

Las rutas privadas MUST exigir autenticación y autorización en el servidor en cada
operación. Ocultar botones en el frontend NO constituye control de acceso. El módulo
de colegios MUST requerir sesión activa y limitar la información a la finalidad
educativa, operativa o de coordinación autorizada; NO debe mostrar diagnósticos,
notas clínicas detalladas ni información médica sensible no autorizada.

Las contraseñas MUST almacenarse con hash seguro y NUNCA en texto plano. Secretos,
tokens, claves API, credenciales y datos reales MUST permanecer fuera del
repositorio y gestionarse mediante variables de entorno. `.env` MUST estar fuera
del control de versiones y solo se permite un `.env.example` sin secretos. Los
errores, logs y datos de demostración MUST evitar información sensible; los datos
de desarrollo, pruebas, capturas y presentaciones serán ficticios o anonimizados.
Antes de producción se deben definir respaldos, restauración, control de acceso,
cifrado en tránsito y protección de la base de datos.

### III. Citas, disponibilidad y ausencia de colisiones

Toda cita terapéutica MUST incluir niño, tutor responsable, terapeuta, fecha, hora
de inicio, hora de fin y estado, usando formato de 24 horas. Las terapias solo
pueden iniciar desde las 12:00 y finalizar como máximo a las 22:00. La duración
permitida MUST estar definida por la especificación o por una configuración
administrable. Las citas canceladas NO bloquean disponibilidad.

La jornada de colegios es de 08:00 a 12:30 y la jornada de terapias en el centro es
de 12:00 a 22:00. La superposición de 12:00 a 12:30 exige disponibilidad real del
terapeuta y del ambiente, sin afectar actividades escolares. Cambiar este criterio
a un inicio de terapias a las 12:30 REQUIRES actualizar formalmente la especificación
y esta constitución.

El backend MUST validar horario, permisos, disponibilidad y cruces antes de
persistir o confirmar una cita, tanto al crear como al modificar fecha, hora,
terapeuta o sala. Existe colisión cuando:

`inicioNueva < finExistente AND finNueva > inicioExistente`

La búsqueda MUST considerar citas activas del mismo terapeuta y fecha, excluir la
cita actual al editar y, si existen salas o ambientes, aplicar la misma regla a la
sala. Una colisión MUST rechazarse con HTTP `409 Conflict`. El frontend puede
ocultar horarios ocupados, pero nunca sustituye la validación del servidor.

Una cita de 12:00 a 13:00 o de 21:00 a 22:00 es válida si no colisiona. Una cita
de 11:30 a 12:30 o de 21:30 a 22:30 es inválida.

### IV. Arquitectura y calidad técnica

El proyecto MUST conservar la arquitectura existente: Next.js con App Router,
TypeScript, React con componentes funcionales y Hooks, Tailwind CSS y estilos
globales existentes. El backend MUST resolverse con rutas API de Next.js, Server
Actions o lógica de servidor integrada; NO se debe agregar Express separado,
microservicios ni arquitectura distribuida sin necesidad explícita documentada.

La estructura esperada es `src/app` para rutas y lógica del App Router,
`src/app/(site)` para el sitio público, `src/app/(site)/agenda` para agenda,
`src/app/schools` para el módulo privado, `src/components` para componentes
reutilizables, `src/lib` para validaciones, autenticación, autorización, datos y
lógica compartida, `src/data` para datos ficticios o estáticos y `public` para
recursos públicos. SQLite solo puede usarse en desarrollo, demostración o
prototipo académico; producción REQUIRES una base gestionada y controles de
protección de datos.

Toda entrada MUST validarse en frontend y obligatoriamente en backend. Se usarán
tipos explícitos y se evitará `any`. Las entidades principales DEBEN tener tipos
claros, incluyendo `Appointment`, `AppointmentStatus`, `Child`, `Guardian`,
`Therapist`, `School`, `User` y `UserRole`. Se usarán componentes funcionales,
Hooks, `camelCase` para variables y funciones, y `PascalCase` para componentes,
interfaces, tipos y enumeraciones. Las funciones serán pequeñas y de una sola
responsabilidad; la lógica de permisos, horario y cruces se centralizará en
`src/lib` y no se duplicará.

### V. Roles, manejo de errores y trazabilidad

Los roles mínimos son Visitante, Tutor o familiar, Terapeuta, Colegio y
Administrador. Visitantes solo ven contenido público; tutores gestionan únicamente
datos básicos y citas de sus menores; terapeutas consultan sus asignaciones;
colegios consultan la información mínima autorizada de sus estudiantes; y
administradores gestionan usuarios, terapeutas, horarios, citas, colegios,
asociaciones y datos operativos.

El backend MUST usar códigos semánticos: `200` para acciones exitosas, `201` para
creación, `400` para datos inválidos o fuera de horario, `401` sin sesión, `403`
sin permisos, `404` para recursos inexistentes o no disponibles, `409` para
colisiones, `422` para reglas de negocio cuando se diferencien de un `400`, y
`500` para fallos técnicos inesperados. Los detalles técnicos se registrarán de
forma segura en el servidor, nunca se enviarán al cliente.

La interfaz MUST mostrar mensajes claros, respetuosos, inclusivos y comprensibles,
sin stack traces, SQL, tokens, identificadores internos ni datos de terceros.
Los cambios deben ser trazables, conservar funcionalidades existentes y modificar
solo archivos relacionados con la funcionalidad actual.

## Additional Constraints

### Naturaleza del dominio

Todo niño MUST estar vinculado al menos a un tutor, familiar o representante
responsable. Un menor no puede tener una cuenta autónoma para módulos privados.
Los datos de contacto principales corresponden al adulto autorizado. Las
asociaciones con colegios y terapeutas serán explícitas, verificables y gestionadas
por un administrador o por un flujo de solicitud y aprobación definido en una
especificación aprobada.

La actividad de colegios entre 08:00 y 12:30 y las terapias del centro son
contextos operativos distintos. La actividad escolar NO debe crear automáticamente
citas terapéuticas.

### Datos y despliegue

No se incluirán datos personales reales de menores, tutores, terapeutas o colegios
en seeds, pruebas, ejemplos o documentación. Un despliegue con datos reales exige
definir previamente respaldo, restauración, acceso, cifrado y protección de la
base de datos.

## Development Workflow

Antes de generar o modificar código, el agente MUST leer esta constitución, la
especificación aplicable, `ROADMAP.md` y la estructura existente. Debe implementar
solo lo documentado, reutilizar patrones del repositorio y verificar que la
funcionalidad preserve seguridad, privacidad, permisos y simplicidad.

Toda funcionalidad de citas MUST comprobar horario, duración, permisos,
disponibilidad y colisiones en servidor antes de guardar. Toda funcionalidad del
módulo de colegios MUST comprobar identidad, sesión, rol, institución asociada y
relación autorizada con el estudiante en servidor.

Los cambios que afecten reglas críticas deben acompañarse de validaciones o
pruebas adecuadas. El agente MUST reportar errores explícitamente y NO ocultarlos
con capturas amplias, valores por defecto silenciosos o respuestas de éxito
ficticias. Si una instrucción contradice esta constitución o deja indefinida una
regla crítica de horarios, permisos, privacidad o citas, el agente MUST detenerse,
explicar el conflicto y solicitar una actualización de la especificación antes de
modificar código.

## Governance

Esta constitución prevalece sobre prácticas informales del proyecto. Toda enmienda
debe documentar el motivo, el alcance afectado y cualquier migración necesaria;
debe actualizar las especificaciones relacionadas cuando cambie el comportamiento
del producto. Las revisiones de código, pruebas y planificación MUST comprobar
cumplimiento de esta constitución, especialmente en privacidad, autorización,
horarios y prevención de colisiones.

La versión usa SemVer:

- MAJOR para eliminar o redefinir de forma incompatible un principio o regla.
- MINOR para añadir un principio, sección o guía materialmente nueva.
- PATCH para aclaraciones, correcciones de redacción y cambios no semánticos.

Los cambios de código no pueden ampliar el alcance del MVP sin una especificación
aprobada. Las excepciones requieren justificación explícita, revisión de seguridad
y actualización de esta constitución cuando alteren una regla gobernante.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): definir la fecha original de adopción | **Last Amended**: 2026-09-16
