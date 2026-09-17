# Citas

`GET /api/appointments/availability?date=YYYY-MM-DD` requiere sesión y devuelve
bloques de 60 minutos en `America/Lima`. `POST /api/appointments` requiere tutor
o administrador y valida relaciones en servidor. Las colisiones devuelven `409`.

`GET /api/appointments` filtra por rol. `POST /api/appointments/:id/cancel`
conserva el registro; los tutores necesitan 24 horas de anticipación.
