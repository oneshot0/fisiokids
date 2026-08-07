export const site = {
  name: "FisioKids",
  tagline: "Terapias pediátricas en Lima",
  description:
    "Centro de terapias pediátricas en Lima: fisioterapia motora, terapia de lenguaje, terapia ocupacional y estimulación temprana. Acompañamos el desarrollo de tu peque con un equipo especializado.",
  phone: "+51 999 999 999",
  whatsapp: "51999999999",
  email: "hola@fisiokids.pe",
  address: "Av. Ejemplo 123, Miraflores, Lima",
  schedule: "Lunes a viernes 8:00 – 19:00 · Sábados 9:00 – 14:00",
  url: "https://fisiokids.pe",
} as const;

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/agenda", label: "Agenda una cita" },
] as const;

export const schoolsNavItem = {
  href: "/schools",
  label: "FisioKids Schools",
} as const;
