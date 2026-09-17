# Autenticación

Auth.js Credentials valida cuentas activas mediante contraseña hash. Los errores
de credenciales son genéricos y las rutas privadas devuelven `401` sin sesión y
`403` cuando falta autorización.
