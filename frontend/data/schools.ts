import type { PanelConfig } from "@/components/schools/PanelShell";

export const child = {
  firstName: "Mateo",
  parentFirstName: "Ana",
  parentName: "Ana Pérez",
  parentInitials: "AP",
  school: "Colegio San Marcos",
};

export type WeekDay = {
  day: string;
  minutes: number;
  tone: "mint" | "peach" | "butter" | "sky" | "blush";
};

/** Minutos de terapia y juegos por día de la semana (maqueta). */
export const weekActivity: WeekDay[] = [
  { day: "Lun", minutes: 45, tone: "mint" },
  { day: "Mar", minutes: 30, tone: "butter" },
  { day: "Mié", minutes: 50, tone: "peach" },
  { day: "Jue", minutes: 20, tone: "sky" },
  { day: "Vie", minutes: 45, tone: "mint" },
  { day: "Sáb", minutes: 15, tone: "blush" },
  { day: "Dom", minutes: 10, tone: "butter" },
];

export type AreaShare = {
  area: string;
  percent: number;
  tone: "mint" | "peach" | "butter" | "sky" | "blush";
};

/** Distribución del tiempo de trabajo por área terapéutica (maqueta). */
export const areaShares: AreaShare[] = [
  { area: "Lenguaje", percent: 40, tone: "mint" },
  { area: "Motora", percent: 25, tone: "peach" },
  { area: "Sensorial", percent: 20, tone: "butter" },
  { area: "Autonomía", percent: 15, tone: "sky" },
];

export type PanelSection = {
  href: string;
  label: string;
  icon:
    | "home"
    | "blog"
    | "tips"
    | "games"
    | "payments"
    | "reports"
    | "users"
    | "children"
    | "school"
    | "calendar"
    | "alert"
    | "chat"
    | "check";
  description: string;
};

export const panelSections: PanelSection[] = [
  {
    href: "/schools/panel",
    label: "Inicio",
    icon: "home",
    description: "Resumen del día de tu peque",
  },
  {
    href: "/schools/panel/informes",
    label: "Informes",
    icon: "reports",
    description: "Reportes diarios y avances por objetivo",
  },
  {
    href: "/schools/panel/blog",
    label: "Blog",
    icon: "blog",
    description: "Artículos del equipo terapéutico",
  },
  {
    href: "/schools/panel/tips",
    label: "Tips",
    icon: "tips",
    description: "Ejercicios y rutinas para casa",
  },
  {
    href: "/schools/panel/juegos",
    label: "Juegos",
    icon: "games",
    description: "Actividades interactivas para el peque",
  },
  {
    href: "/schools/panel/pagos",
    label: "Pagos",
    icon: "payments",
    description: "Estado de cuenta y comprobantes",
  },
];

export const parentPanelConfig: PanelConfig = {
  navId: "panel-nav",
  sections: panelSections,
  homeHref: "/schools/panel",
  greeting: {
    title: "¡Hola, Ana! 👋",
    subtitle: "Mamá de Mateo",
    href: "/schools",
  },
  user: {
    name: "Ana Pérez",
    initials: "AP",
    roleLabel: "Apoderada",
  },
  searchPlaceholder: "Buscar informes, tips o juegos...",
  promo: {
    emoji: "🌟",
    title: "Plan Familia",
    text: "Más juegos y videollamadas con el terapeuta",
    cta: "Conocer plan",
    href: "/schools",
  },
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMin: number;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mochilas-y-postura",
    title: "Cómo elegir la mochila escolar y cuidar la espalda",
    excerpt:
      "El peso ideal no supera el 10% del peso del niño. Te contamos cómo ajustarla y qué señales vigilar.",
    category: "Postura",
    readMin: 4,
    date: "2026-02-02",
  },
  {
    slug: "pantallas-y-motricidad",
    title: "Pantallas y motricidad fina: encontrando el equilibrio",
    excerpt:
      "No es prohibir, es sustituir. Cinco actividades manuales que compiten de igual a igual con la tablet.",
    category: "Desarrollo",
    readMin: 6,
    date: "2026-01-28",
  },
  {
    slug: "senales-de-alerta-lenguaje",
    title: "Señales de alerta en el lenguaje según la edad",
    excerpt:
      "Una guía rápida por rangos de edad para saber cuándo conviene una evaluación.",
    category: "Lenguaje",
    readMin: 5,
    date: "2026-01-19",
  },
  {
    slug: "regulacion-sensorial-en-el-aula",
    title: "Regulación sensorial en el aula: qué puede hacer el colegio",
    excerpt:
      "Rincones de calma, pausas activas y materiales que ayudan a los peques a autorregularse.",
    category: "Colegio",
    readMin: 7,
    date: "2026-01-08",
  },
];

export type Tip = {
  title: string;
  text: string;
  minutes: number;
  area: "Motora" | "Lenguaje" | "Sensorial" | "Autonomía";
};

export const tips: Tip[] = [
  {
    title: "Circuito de la alfombra",
    text: "Marca con cinta un camino en el piso y pide que lo recorra en punta, en cuclillas y saltando.",
    minutes: 10,
    area: "Motora",
  },
  {
    title: "La caja de las texturas",
    text: "Arroz, algodón, esponjas. Que meta la mano sin mirar y adivine qué tocó.",
    minutes: 8,
    area: "Sensorial",
  },
  {
    title: "Cuento con pausas",
    text: "Lee un cuento conocido y detente antes de la última palabra para que la complete.",
    minutes: 12,
    area: "Lenguaje",
  },
  {
    title: "Me visto solo",
    text: "Deja la ropa ordenada en el orden en que se pone. Cronometra sin apurar.",
    minutes: 15,
    area: "Autonomía",
  },
  {
    title: "Pinzas y pompones",
    text: "Trasladar pompones de un bol a otro con pinzas de cocina. Fuerza y precisión.",
    minutes: 7,
    area: "Motora",
  },
  {
    title: "Respiración de la tortuga",
    text: "Inhalar contando 4, retener 2, exhalar 6. Ideal antes de dormir o tras una rabieta.",
    minutes: 5,
    area: "Sensorial",
  },
];

export type Game = {
  title: string;
  text: string;
  ages: string;
  skill: string;
  emoji: string;
};

export const games: Game[] = [
  {
    title: "Memoria de animales",
    text: "Encuentra las parejas y aprende el sonido de cada animal.",
    ages: "3 – 6 años",
    skill: "Memoria",
    emoji: "🐢",
  },
  {
    title: "Sigue el ritmo",
    text: "Repite la secuencia de colores y sonidos que marca Tuki.",
    ages: "4 – 8 años",
    skill: "Atención",
    emoji: "🥁",
  },
  {
    title: "Caza sílabas",
    text: "Arma palabras juntando sílabas antes de que se acabe el tiempo.",
    ages: "5 – 9 años",
    skill: "Lenguaje",
    emoji: "🔤",
  },
  {
    title: "Laberinto motor",
    text: "Guía a la tortuga esquivando obstáculos con movimientos precisos.",
    ages: "4 – 10 años",
    skill: "Motricidad fina",
    emoji: "🌀",
  },
];

export type Invoice = {
  id: string;
  concept: string;
  amount: number;
  dueDate: string;
  status: "Pagado" | "Pendiente" | "Vencido";
};

export const invoices: Invoice[] = [
  {
    id: "F-000128",
    concept: "Terapia de lenguaje · Febrero (8 sesiones)",
    amount: 640,
    dueDate: "2026-02-05",
    status: "Pendiente",
  },
  {
    id: "F-000117",
    concept: "Terapia de lenguaje · Enero (8 sesiones)",
    amount: 640,
    dueDate: "2026-01-05",
    status: "Pagado",
  },
  {
    id: "F-000109",
    concept: "Evaluación inicial",
    amount: 120,
    dueDate: "2025-12-18",
    status: "Pagado",
  },
];

export type Report = {
  date: string;
  therapist: string;
  session: string;
  summary: string;
  mood: "Muy bien" | "Bien" | "Regular";
};

export const reports: Report[] = [
  {
    date: "2026-02-06",
    therapist: "Lic. Diego Ramos",
    session: "Terapia de lenguaje",
    summary:
      "Produjo /r/ en posición inicial en 7 de 10 intentos. Trabajamos con tarjetas y espejo.",
    mood: "Muy bien",
  },
  {
    date: "2026-02-04",
    therapist: "Lic. Diego Ramos",
    session: "Terapia de lenguaje",
    summary:
      "Sesión más corta por cansancio. Reforzamos vocabulario de la casa con pictogramas.",
    mood: "Regular",
  },
  {
    date: "2026-02-02",
    therapist: "Lic. Ana Torres",
    session: "Fisioterapia motora",
    summary:
      "Mantuvo equilibrio monopodal 6 segundos por lado. Subió y bajó escaleras alternando pies.",
    mood: "Bien",
  },
];

export type Goal = {
  title: string;
  progress: number;
  area: string;
};

export const goals: Goal[] = [
  { title: "Articular /r/ en palabras", progress: 68, area: "Lenguaje" },
  { title: "Equilibrio monopodal 10 s", progress: 45, area: "Motora" },
  { title: "Vestirse sin ayuda", progress: 82, area: "Autonomía" },
  { title: "Tolerar texturas nuevas", progress: 30, area: "Sensorial" },
];
