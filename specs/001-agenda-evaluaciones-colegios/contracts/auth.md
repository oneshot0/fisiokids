# Contrato de autenticación y autorización

## Inicio de sesión

- Auth.js Credentials provider con email y contraseña.
- Contraseñas almacenadas únicamente como hash seguro.
- Cuenta inexistente, inactiva o contraseña incorrecta produce un mensaje
  genérico sin distinguir cuál dato falló.
- La sesión contiene solo `userId`, rol y membresía mínima necesaria.

## Códigos comunes

- `401 Unauthorized`: no existe sesión activa.
- `403 Forbidden`: sesión válida sin rol o relación suficiente.
- `404 Not Found`: recurso no disponible para la relación solicitante cuando
  revelar existencia sería sensible.
- `500 Internal Server Error`: fallo técnico registrado solo en servidor.

Los layouts pueden redirigir para navegación, pero cada Route Handler repite la
comprobación server-side. Mutaciones y lecturas sensibles generan un `AuditLog`
redactado.
