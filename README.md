# FisioKids

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
    page.tsx              landing
    nosotros/             quiénes somos
    agenda/               formulario de reserva
    schools/              FisioKids Schools (B2B)
  components/
    Navbar, Footer, Logo, Turtle (mascota Tuki), WhatsAppButton
    sections/             bloques de la landing
  data/                   terapias y novedades (contenido editable)
  lib/site.ts             datos de contacto y navegación
```

Para cambiar teléfono, dirección, correo o WhatsApp: `src/lib/site.ts`.
Para editar terapias o novedades: `src/data/`.

## Marca

- Colores: blanco + verde (`--color-brand-*` en `src/app/globals.css`)
- Tipografía: Nunito
- Mascota: Tuki, la tortuga (`src/components/Turtle.tsx`, SVG puro)
