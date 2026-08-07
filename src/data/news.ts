export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  tag: "Nuevo" | "Próximamente" | "Taller";
  date: string;
};

export const news: NewsItem[] = [
  {
    slug: "portal-de-padres",
    title: "Portal de padres",
    excerpt:
      "Pronto podrás revisar el historial de terapias, los avances de tu peque, sus reportes y tus pagos desde un solo lugar.",
    tag: "Próximamente",
    date: "2026-03-01",
  },
  {
    slug: "fisiokids-schools",
    title: "FisioKids Schools",
    excerpt:
      "Llevamos tamizajes del desarrollo y talleres para docentes a colegios de Lima. Estamos abriendo cupos para el próximo año escolar.",
    tag: "Próximamente",
    date: "2026-02-15",
  },
  {
    slug: "sala-de-integracion-sensorial",
    title: "Nueva sala de integración sensorial",
    excerpt:
      "Columpios terapéuticos, panel táctil y circuito propioceptivo para trabajar la regulación de forma divertida.",
    tag: "Nuevo",
    date: "2026-01-20",
  },
  {
    slug: "taller-porteo-y-postura",
    title: "Taller de porteo y postura para bebés",
    excerpt:
      "Sesión gratuita para papás y mamás primerizos: cómo cargar, dormir y jugar cuidando la columna del bebé.",
    tag: "Taller",
    date: "2026-01-10",
  },
];
