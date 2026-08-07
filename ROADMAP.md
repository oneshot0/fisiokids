# FisioKids — Roadmap

Guía paso a paso del proyecto. Cada fase es independiente y termina con algo usable.
Marca las casillas conforme avancemos.

**Contexto**: centro de terapias pediátricas en Lima, Perú.
**Marca**: blanco + verde, mascota tortuga ("Tuki").
**Stack**: Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Prisma + PostgreSQL · AWS.

---

## Fase 0 — Base del proyecto ✅

- [x] Scaffold Next.js 15 + TypeScript + Tailwind 4 + ESLint
- [x] Paleta de marca (verde `brand-50…900`) y tipografía Nunito
- [x] Mascota Tuki como componente SVG (`src/components/Turtle.tsx`)
- [x] Navbar (Inicio · Nosotros · Agenda una cita · FisioKids Schools) + Footer
- [x] Botón flotante de WhatsApp
- [x] Metadata SEO base (`es-PE`, Open Graph)

## Fase 1 — Landing pública ✅

- [x] Hero con CTA "Agenda una cita"
- [x] Sección de terapias (6 especialidades, data en `src/data/therapies.ts`)
- [x] "¿Cómo funciona?" (4 pasos)
- [x] "Lo nuevo que se viene" (`src/data/news.ts`)
- [x] Testimonios de familias
- [x] Contacto + horarios + espacio para el mapa
- [x] Página Nosotros (historia, valores, equipo)
- [x] Página FisioKids Schools (landing B2B)
- [x] Página Agenda con formulario que envía por WhatsApp

**Pendiente de contenido real** (lo necesito de ti):
- [ ] Logo oficial en SVG/PNG
- [ ] Fotos del local, del equipo y de sesiones (con consentimiento)
- [ ] Lista definitiva de terapias, duración y precios
- [ ] Dirección exacta, teléfono, WhatsApp y correo reales
- [ ] Textos de "Nosotros" y testimonios reales

## Fase 2 — Contenido y pulido

- [ ] Reemplazar datos de ejemplo por contenido real
- [ ] Página de detalle por terapia (`/terapias/[slug]`)
- [ ] Optimización de imágenes con `next/image`
- [ ] `sitemap.ts`, `robots.ts`, imagen Open Graph
- [ ] JSON-LD `MedicalBusiness` + `LocalBusiness` (SEO local en Lima)
- [ ] Google Analytics 4 / Meta Pixel
- [ ] Auditoría de accesibilidad y Lighthouse ≥ 90

## Fase 3 — Base de datos y agenda real

- [ ] PostgreSQL local con Docker Compose
- [ ] Prisma + schema inicial (ver "Modelo de datos" abajo)
- [ ] Seed con terapias, terapeutas y disponibilidad
- [ ] CRUD de disponibilidad por terapeuta
- [ ] Reserva en línea: terapia → terapeuta → calendario → confirmación
- [ ] Emails transaccionales (confirmación y recordatorio 24 h antes)
- [ ] Panel de agenda para recepción

## Fase 4 — Cuentas y portal de padres

- [ ] Auth.js (email + contraseña) con roles `PARENT | THERAPIST | ADMIN | SCHOOL`
- [ ] Registro de padres y verificación de correo
- [ ] Perfiles de hijos (datos, diagnóstico, consentimiento firmado)
- [ ] Historial de terapias realizadas
- [ ] Avances: objetivos terapéuticos, métricas y línea de tiempo
- [ ] Reportes en PDF descargables (S3 con URLs prefirmadas)
- [ ] Fotos/videos de sesiones con control de visibilidad

## Fase 5 — Pagos

- [ ] Integrar pasarela peruana: **Culqi** o **Izipay** (evaluar comisiones)
- [ ] Facturas por sesión o por paquete de sesiones
- [ ] Estado de cuenta en el portal (pagado / pendiente / vencido)
- [ ] Webhooks de confirmación de pago
- [ ] Comprobantes electrónicos SUNAT (boleta) — evaluar proveedor (Nubefact, Bizlinks)

## Fase 6 — Back office para terapeutas

- [ ] Agenda personal del terapeuta
- [ ] Notas de sesión y registro de avances
- [ ] Carga de reportes y media
- [ ] Métricas del centro (ocupación, asistencia, ingresos)
- [ ] `AuditLog` de accesos a datos clínicos

## Fase 7 — Despliegue en AWS

- [ ] IaC con AWS CDK (TypeScript), entornos `dev` y `prod`
- [ ] Route 53 + ACM (dominio `fisiokids.pe`)
- [ ] CloudFront + WAF → Next.js SSR en Lambda (Amplify Hosting u OpenNext/SST)
- [ ] RDS PostgreSQL Serverless v2 en VPC privada + RDS Proxy
- [ ] Cognito para autenticación (migrar desde Auth.js)
- [ ] S3 privado para reportes y media, con cifrado KMS
- [ ] SES para correos + EventBridge Scheduler para recordatorios
- [ ] Secrets Manager, CloudWatch, X-Ray
- [ ] Backups automáticos y plan de restauración probado
- [ ] CI/CD con GitHub Actions

Costo estimado inicial: **USD 60–120/mes**.

## Fase 8 — FisioKids Schools

- [ ] Modelo de datos de colegios, alumnos y tamizajes
- [ ] Portal para colegios (rol `SCHOOL`)
- [ ] Campañas de tamizaje y captura de resultados en tablet
- [ ] Informes agregados por grado y por institución
- [ ] Derivaciones al centro desde el colegio
- [ ] Facturación B2B

---

## Modelo de datos (referencia)

```
User(id, email, passwordHash|cognitoSub, role, phone)
Parent(id, userId, address, docId)
Child(id, parentId, firstName, lastName, birthDate, diagnosis, notes)
Therapist(id, userId, specialties[], bio, photoUrl)
Therapy(id, slug, name, description, durationMin, price, imageUrl, active)
Availability(id, therapistId, weekday, startTime, endTime)
Appointment(id, childId, therapistId, therapyId, startsAt, endsAt, status, notes)
Session(id, appointmentId, summary, therapistNotes, createdAt)
ProgressGoal(id, childId, title, metricType, targetValue)
ProgressEntry(id, goalId, sessionId, value, comment, recordedAt)
MediaAsset(id, childId|sessionId, s3Key, type, visibleToParent)
Report(id, childId, periodStart, periodEnd, s3Key, publishedAt)
Invoice(id, parentId, appointmentId?, amount, currency, status, issuedAt, dueAt)
Payment(id, invoiceId, provider, providerRef, amount, paidAt, status)
AuditLog(id, actorUserId, action, entity, entityId, at)
-- Fase 8
School(id, name, contactUserId, address)
SchoolStudent(id, schoolId, childId?, fullName, grade)
Screening(id, schoolId, therapistId, date, resultsJson)
```

## Privacidad (importante: datos de salud de menores)

- Cifrado en reposo (KMS) y en tránsito (TLS) obligatorio.
- Acceso por rol estricto; un padre solo ve a sus hijos.
- Consentimiento informado firmado antes de guardar fotos o videos.
- Registro de auditoría de todo acceso a datos clínicos.
- Cumplir la Ley N° 29733 de Protección de Datos Personales (Perú) y registrar el
  banco de datos ante la ANPD.
