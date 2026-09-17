# Research: Agenda terapéutica, evaluaciones y colegios

## Decisiones

### Persistencia y backend

- **Decisión**: Prisma sobre PostgreSQL, usado desde Route Handlers y servicios
  server-side de Next.js.
- **Racional**: El MVP necesita relaciones explícitas entre usuarios, tutores,
  niños, terapeutas, colegios y citas, además de transacciones y restricciones
  para concurrencia. El repositorio actual solo tiene repositorios mock y un
  placeholder MySQL; el roadmap ya define PostgreSQL + Prisma.
- **Alternativas consideradas**: Mantener mocks/MySQL dejaría los flujos
  privados sin persistencia confiable. Express separado contradice la
  constitución y agrega complejidad innecesaria.

### Autenticación y roles

- **Decisión**: Auth.js con Credentials provider, sesiones persistidas y
  contraseñas con hash Argon2id o equivalente aprobado. Los roles persistidos
  serán `tutor`, `terapeuta`, `colegio` y `administrador`; las etiquetas de
  interfaz se traducen por separado.
- **Racional**: La maqueta actual redirige sin verificar contraseña ni crear
  sesión. Auth.js encaja con Next.js y permite propagar un rol mínimo en la
  sesión. El registro público no concede acceso automáticamente.
- **Alternativas consideradas**: JWT artesanal y autorización solo en layouts
  fueron rechazados por riesgo de filtración y duplicación. `admin`/`padre` se
  normalizan al vocabulario de la especificación.

### Autorización y privacidad

- **Decisión**: `requireSession`, `requireRole` y consultas de relación en
  `src/lib/authorization`. Cada Route Handler repite la comprobación de sesión,
  rol y relación; los identificadores del cliente nunca bastan para autorizar.
- **Racional**: Ocultar controles en React no protege datos. Las consultas deben
  filtrar por tutor, terapeuta o colegio desde el servidor y responder con
  `403`/`404` genérico sin revelar existencia de terceros.

### Citas, zona horaria y concurrencia

- **Decisión**: Interpretar fechas y regla de 24 horas en `America/Lima`;
  persistir instantes consistentemente y calcular slots exactos de una hora
  entre 12:00 y 21:00. Para la fecha actual, excluir la hora actual y todas las
  anteriores, comenzando en la siguiente hora exacta; para fechas futuras,
  mostrar el rango completo. Validar en servicio y reforzar en PostgreSQL mediante
  exclusión parcial con `tstzrange` para terapeuta y sala opcional, excluyendo
  citas `cancelled`.
- **Racional**: La consulta previa mejora UX, pero solo una restricción de base
  de datos evita que dos reservas simultáneas confirmen el mismo bloque. El
  rango semiabierto `[)` implementa correctamente el solapamiento.
- **Alternativas consideradas**: Unicidad `(therapistId, startsAt)` sirve para
  slots fijos, pero no expresa cruces futuros. La migración usará `btree_gist`.

### Evaluaciones profesionales

- **Decisión**: Modelar revisiones como registros versionados, con transición
  lineal `draft -> active -> superseded`, un solo activo por niño/sujeto y una
  bandera independiente de visibilidad para tutores, inicialmente falsa.
- **Racional**: Evita reactivar una revisión sustituida y conserva trazabilidad.
- **Alternativas consideradas**: Editar una fila activa destruye historial y no
  satisface la transición requerida.

### Colegios y contratos

- **Decisión**: Asociaciones explícitas `SchoolMembership` y `ChildSchool`;
  `GET /api/schools/students` deriva el colegio de la sesión y devuelve un DTO
  allowlistado.
- **Racional**: Impide cambiar un `schoolId` en la URL para consultar otra
  institución y mantiene separadas coordinación escolar y agenda terapéutica.

### Validación y pruebas

- **Decisión**: Zod para esquemas de entrada, Vitest para dominio y contratos,
  PostgreSQL para integración de restricciones/concurrencia y Playwright para
  el flujo crítico de reserva si se incorpora el entorno E2E.
- **Racional**: Mantiene validación explícita en backend y permite probar reglas
  sin depender de componentes React.

## Riesgos resueltos

- El terapeuta lo selecciona el servidor entre asignaciones/disponibilidad
  válidas; el tutor no puede elegir uno no relacionado.
- La sala es nullable y participa en colisiones solo cuando está asignada.
- En esta iteración el tutor cancela, pero no reprograma; la reprogramación es
  administrativa y trazable.
- Cada actualización sustantiva de una evaluación activa crea una revisión nueva.
- El colegio recibe nombre, tutor, terapeuta autorizado y estado operativo
  allowlistado.
- La auditoría cubre creación, modificación, cancelación, lecturas de
  evaluaciones y consultas escolares.
