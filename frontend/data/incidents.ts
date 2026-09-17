export type IncidentKind = "incidente" | "queja" | "recomendacion";
export type IncidentStatus = "nueva" | "en_revision" | "resuelta";

export type Incident = {
  id: string;
  kind: IncidentKind;
  title: string;
  detail: string;
  source: "padre" | "terapeuta" | "colegio";
  authorName: string;
  studentId?: string;
  priority: "alta" | "media" | "baja";
  status: IncidentStatus;
  date: string;
};

export const incidentKindLabels: Record<IncidentKind, string> = {
  incidente: "Incidente",
  queja: "Queja",
  recomendacion: "Recomendación",
};

export const incidentKindPluralLabels: Record<IncidentKind, string> = {
  incidente: "Incidentes",
  queja: "Quejas",
  recomendacion: "Recomendaciones",
};

export const incidentStatusLabels: Record<IncidentStatus, string> = {
  nueva: "Nueva",
  en_revision: "En revisión",
  resuelta: "Resuelta",
};

export const priorityLabels: Record<Incident["priority"], string> = {
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

export const incidents: Incident[] = [
  {
    id: "incident-1",
    kind: "incidente",
    title: "Golpe leve durante la sesión",
    detail: "Mateo tuvo un golpe menor mientras realizaba una actividad motora.",
    source: "terapeuta",
    authorName: "Diego Ramos",
    studentId: "student-mateo",
    priority: "alta",
    status: "en_revision",
    date: "2026-09-03",
  },
  {
    id: "incident-2",
    kind: "incidente",
    title: "Atraso en el ingreso al colegio",
    detail: "La sesión de Valentina comenzó diez minutos tarde por acceso restringido.",
    source: "colegio",
    authorName: "Colegio San Marcos",
    studentId: "student-valentina",
    priority: "media",
    status: "resuelta",
    date: "2026-09-01",
  },
  {
    id: "incident-3",
    kind: "queja",
    title: "Dificultad para ver el informe",
    detail: "La familia no pudo abrir el último informe desde su panel.",
    source: "padre",
    authorName: "Ana Pérez",
    studentId: "student-mateo",
    priority: "media",
    status: "nueva",
    date: "2026-09-03",
  },
  {
    id: "incident-4",
    kind: "queja",
    title: "Solicitud de cambio de horario",
    detail: "La familia solicita revisar la hora de las terapias de los viernes.",
    source: "padre",
    authorName: "Sofía Castro",
    studentId: "student-lucas",
    priority: "baja",
    status: "en_revision",
    date: "2026-09-02",
  },
  {
    id: "incident-5",
    kind: "queja",
    title: "Consulta sobre materiales",
    detail: "El colegio pregunta por los materiales necesarios para la próxima actividad.",
    source: "colegio",
    authorName: "Colegio San Marcos",
    priority: "baja",
    status: "resuelta",
    date: "2026-08-31",
  },
  {
    id: "incident-6",
    kind: "recomendacion",
    title: "Sumar una pausa sensorial",
    detail: "Incorporar una pausa breve antes de iniciar actividades de lenguaje.",
    source: "terapeuta",
    authorName: "Ana Torres",
    studentId: "student-emilia",
    priority: "media",
    status: "nueva",
    date: "2026-09-02",
  },
  {
    id: "incident-7",
    kind: "recomendacion",
    title: "Compartir actividades para casa",
    detail: "Enviar una guía semanal con ideas simples para reforzar autonomía.",
    source: "padre",
    authorName: "Lucía Gómez",
    studentId: "student-valentina",
    priority: "baja",
    status: "en_revision",
    date: "2026-08-30",
  },
];
