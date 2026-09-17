# Contrato HTTP: estudiantes de colegios

## `GET /api/schools/students`

- Rol: `colegio`.
- La institución se obtiene exclusivamente de la sesión y membresía activa; no
  se acepta `schoolId` como autorización.
- `200`: `{ students: [{ name, guardianName, therapistName?, operationalStatus }] }`.
- No incluye evaluaciones, nivel TEA, diagnósticos, notas, tratamientos, datos
  médicos ni identificadores internos innecesarios.
- `401` sin sesión; `403` sin membresía escolar; `404` o respuesta vacía para
  recursos ajenos sin inferir su existencia.

Las asociaciones `ChildSchool` solo las gestiona un administrador. El endpoint no
crea citas ni mezcla la jornada escolar 08:00-12:30 con la agenda terapéutica.
