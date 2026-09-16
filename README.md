# FisioKids

## Agenda, evaluaciones y colegios

La primera versión funcional usa PostgreSQL, Prisma y Auth.js. Copia
`.env.example` a `.env`, inicia `docker compose up -d db`, ejecuta
`npx prisma migrate deploy`, `npm run prisma:seed` y luego `npm run dev`.

Las credenciales demo del seed son `tutor.demo@fisiokids.test`,
`terapeuta.demo@fisiokids.test` y `admin.demo@fisiokids.test`, con contraseña
`Demo-FisioKids-2026!`. Son datos ficticios y deben reemplazarse en cualquier
entorno compartido.

Validación local: `npm run lint`, `npm run test` y `npx tsc --noEmit`.

Sitio web del centro de terapias pediátricas FisioKids (Lima, Perú): landing pública,
agenda de citas y, más adelante, portal de padres y el módulo FisioKids Schools.

El plan completo por fases está en [ROADMAP.md](./ROADMAP.md).

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
```

Otros comandos:

```bash
npm run build   # build de producción
npm run lint    # ESLint
npx tsc --noEmit  # chequeo de tipos
```

## Estructura

```
src/
  app/
    (site)/               sitio público (navbar verde + footer + WhatsApp)
      page.tsx            landing
      nosotros/           quiénes somos
      agenda/             formulario de reserva
    schools/              FisioKids Schools: sitio aparte con su propio layout
      page.tsx            landing de la plataforma
      login/ registro/    acceso de apoderados (maqueta sin backend)
      panel/              informes, blog, tips, juegos, pagos
  components/
    Navbar, Footer, Logo, Turtle (mascota Tuki), WhatsAppButton
    sections/             bloques de la landing pública
    schools/              header, sidebar, mockup y formularios de Schools
  data/                   terapias, novedades y datos de Schools (editable)
  lib/site.ts             datos de contacto y navegación
```

Las dos partes viven en el mismo proyecto pero no comparten layout: el sitio público
usa el route group `(site)` y FisioKids Schools tiene el suyo en `src/app/schools`.

Para cambiar teléfono, dirección, correo o WhatsApp: `src/lib/site.ts`.
Para editar terapias o novedades: `src/data/`.

## Marca

- Colores: blanco + verde (`--color-brand-*` en `src/app/globals.css`)
- Tipografía: Nunito
- Mascota: Tuki, la tortuga (`src/components/Turtle.tsx`, SVG puro)
