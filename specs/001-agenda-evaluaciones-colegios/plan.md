# Implementation Plan: Agenda terapéutica, evaluaciones y colegios

**Branch**: `001-agenda-evaluaciones-colegios` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)

## Summary

Implementar el primer flujo privado funcional de FisioKids: autenticación por
correo y contraseña, autorización por relación y rol, reserva/cancelación de
citas terapéuticas de 60 minutos, evaluaciones profesionales versionadas y
consulta mínima de estudiantes por colegios autorizados. La implementación
usará Route Handlers de Next.js, servicios pequeños en `src/lib`, Prisma sobre
PostgreSQL y sesiones Auth.js. Las validaciones de horario, privacidad,
transiciones y colisiones ocurrirán en servidor y se reforzarán con restricciones
transaccionales de base de datos.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 15.5.23, React 19.1

**Primary Dependencies**: Next.js App Router, Auth.js Credentials provider,
Prisma, PostgreSQL, Zod para validación de entrada, Tailwind CSS 4

**Storage**: PostgreSQL gestionado/local para datos operativos; Prisma como ORM.
Las fixtures ficticias quedan limitadas a demostraciones aisladas.

**Testing**: Vitest para dominio/servicios y Route Handlers; PostgreSQL de
integración para restricciones y concurrencia; Playwright para el flujo crítico
de reserva si se incorpora el entorno E2E.

**Target Platform**: Aplicación web Next.js desplegable en Node.js y PostgreSQL,
con zona horaria operativa `America/Lima`.

**Project Type**: Aplicación web full-stack con frontend App Router y backend
integrado mediante Route Handlers/servicios de servidor.

**Performance Goals**: Disponibilidad y reserva en menos de 500 ms en condiciones
normales; 100 intentos concurrentes para un mismo bloque dejan como máximo una
cita activa; el flujo principal se completa en menos de 3 minutos.

**Constraints**: Autorización server-side en toda operación privada; datos de
menores ficticios/anonimizados; slots exactos de 60 minutos entre 12:00 y 21:00
con fin máximo 22:00; cancelación de tutor solo con al menos 24 horas; no
diagnóstico automático ni datos clínicos para colegios.

**Scale/Scope**: MVP para un centro, múltiples tutores, terapeutas, colegios,
niños, salas opcionales, citas y revisiones de evaluación; sin pagos,
notificaciones externas, historia clínica completa ni integraciones externas.

## Constitution Check

* **I. Alcance y simplicidad**: PASS. Se limita a agenda, roles, evaluaciones
  básicas y colegio operativo; no agrega historia clínica, pagos ni servicios
  distribuidos.
* **II. Seguridad y mínimo privilegio**: PASS. Auth.js, hash de contraseñas,
  sesiones, consultas relacionadas al usuario y DTOs allowlistados para colegios.
* **III. Citas y colisiones**: PASS. La lógica centraliza zona horaria,
  ventanas, duración fija y cruces; PostgreSQL refuerza la carrera concurrente.
* **IV. Arquitectura**: PASS. Conserva Next.js App Router, TypeScript, Tailwind,
  `src/app`, `src/components` y `src/lib`; no introduce Express ni microservicios.
* **V. Roles, errores y trazabilidad**: PASS. Route Handlers documentan
  `401/403/404/409/422/500`, mensajes genéricos y auditoría.

No hay violaciones que requieran Complexity Tracking.

## Project Structure

### Documentation

```text
specs/001-agenda-evaluaciones-colegios/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code

```text
src/
├── app/
│   ├── api/
│   │   ├── appointments/
│   │   ├── evaluations/
│   │   └── schools/students/
│   ├── (site)/agenda/
│   └── schools/
├── components/
└── lib/
    ├── auth/
    ├── appointments/
    ├── evaluations/
    ├── schools/
    ├── authorization/
    ├── db/
    └── validation/

BD/prisma/
├── schema.prisma
├── seed.ts
└── migrations/

tests/
├── contract/
├── integration/
└── unit/
```

**Structure Decision**: Aplicación web única. Las rutas públicas y privadas
permanecen en `src/app`; los Route Handlers delegan validación, autorización y
transacciones a módulos pequeños de `src/lib`. Prisma y migraciones viven en
`BD/prisma/`; las pruebas se separan por dominio, integración y contrato sin crear
un backend independiente.

## Complexity Tracking

No aplica: la solución conserva la arquitectura existente y evita capas
abstractas que no aportan valor al MVP.

## Constitution Check — Post-design

* **Seguridad y privacidad**: PASS. Los contratos derivan la institución y las
  relaciones desde la sesión, definen DTOs mínimos y mantienen evaluaciones fuera
  del alcance escolar.
* **Citas y concurrencia**: PASS. El modelo fija duración, zona horaria,
  cancelación y exclusión de rangos, incluyendo el tratamiento de citas
  canceladas.
* **Arquitectura y simplicidad**: PASS. Los artefactos no introducen un backend
  separado, capas abstractas innecesarias ni funcionalidades fuera del MVP.
* **Trazabilidad y errores**: PASS. Las mutaciones sensibles se auditan y los
  contratos definen respuestas semánticas sin filtrar detalles internos.
