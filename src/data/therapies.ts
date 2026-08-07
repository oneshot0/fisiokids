export type Therapy = {
  slug: string;
  name: string;
  summary: string;
  bullets: string[];
  durationMin: number;
  ageRange: string;
  icon: "motor" | "speech" | "occupational" | "early" | "respiratory" | "aquatic";
};

export const therapies: Therapy[] = [
  {
    slug: "fisioterapia-motora",
    name: "Fisioterapia motora",
    summary:
      "Fortalecemos el control postural, la marcha y la coordinación con juego dirigido.",
    bullets: ["Retraso motor", "Tortícolis y plagiocefalia", "Marcha en puntas"],
    durationMin: 45,
    ageRange: "0 – 12 años",
    icon: "motor",
  },
  {
    slug: "terapia-de-lenguaje",
    name: "Terapia de lenguaje",
    summary:
      "Estimulamos la comunicación, la articulación y la comprensión del lenguaje.",
    bullets: ["Retraso del habla", "Dislalias", "Deglución atípica"],
    durationMin: 45,
    ageRange: "1 – 12 años",
    icon: "speech",
  },
  {
    slug: "terapia-ocupacional",
    name: "Terapia ocupacional",
    summary:
      "Integración sensorial y autonomía en las actividades del día a día.",
    bullets: ["Integración sensorial", "Motricidad fina", "Autonomía y rutinas"],
    durationMin: 45,
    ageRange: "2 – 12 años",
    icon: "occupational",
  },
  {
    slug: "estimulacion-temprana",
    name: "Estimulación temprana",
    summary:
      "Sesiones lúdicas para acompañar los hitos del desarrollo del bebé.",
    bullets: ["Hitos del desarrollo", "Vínculo con papá y mamá", "Juego sensorial"],
    durationMin: 40,
    ageRange: "0 – 3 años",
    icon: "early",
  },
  {
    slug: "terapia-respiratoria",
    name: "Terapia respiratoria",
    summary:
      "Higiene bronquial y ejercicios respiratorios para peques con cuadros recurrentes.",
    bullets: ["Bronquiolitis", "Asma infantil", "Higiene bronquial"],
    durationMin: 30,
    ageRange: "0 – 12 años",
    icon: "respiratory",
  },
  {
    slug: "hidroterapia",
    name: "Hidroterapia",
    summary:
      "El agua como aliada: menos carga articular y más confianza en el movimiento.",
    bullets: ["Relajación muscular", "Fuerza sin impacto", "Confianza en el agua"],
    durationMin: 40,
    ageRange: "1 – 12 años",
    icon: "aquatic",
  },
];
