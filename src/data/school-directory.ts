export type SchoolStatus = "activo" | "en_pausa" | "prospecto";

export type School = {
  id: string;
  name: string;
  district: string;
  address: string;
  level: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  status: SchoolStatus;
  /** Inicio del convenio (YYYY-MM-DD). Vacío para prospectos. */
  agreementSince?: string;
  notes?: string;
};

export const schoolStatusLabels: Record<SchoolStatus, string> = {
  activo: "Activo",
  en_pausa: "En pausa",
  prospecto: "Prospecto",
};

/** Directorio de centros educativos aliados (maqueta). */
export const schools: School[] = [
  {
    id: "school-san-marcos",
    name: "Colegio San Marcos",
    district: "Surco",
    address: "Av. Benavides 2450",
    level: "Inicial y primaria",
    contactName: "Rosa Villanueva",
    contactRole: "Coordinadora de inicial",
    contactEmail: "coordinacion@sanmarcos.edu.pe",
    contactPhone: "+51 987 654 321",
    status: "activo",
    agreementSince: "2026-03-02",
    notes: "Sesiones en el aula de psicomotricidad, lunes a viernes por la mañana.",
  },
  {
    id: "school-santa-maria",
    name: "Colegio Santa María",
    district: "Miraflores",
    address: "Calle Los Pinos 180",
    level: "Inicial",
    contactName: "Jorge Salas",
    contactRole: "Director",
    contactEmail: "direccion@santamaria.edu.pe",
    contactPhone: "+51 912 345 678",
    status: "en_pausa",
    agreementSince: "2025-08-18",
    notes: "Convenio pausado por obras en el local hasta octubre.",
  },
  {
    id: "school-los-alamos",
    name: "IE Los Álamos",
    district: "La Molina",
    address: "Jr. Las Begonias 455",
    level: "Inicial y primaria",
    contactName: "Patricia Quispe",
    contactRole: "Psicóloga",
    contactEmail: "pquispe@losalamos.edu.pe",
    contactPhone: "+51 998 111 222",
    status: "prospecto",
    notes: "Interesados en tamizajes del desarrollo para el próximo año escolar.",
  },
  {
    id: "school-nido-arcoiris",
    name: "Nido Arcoíris",
    district: "San Borja",
    address: "Av. Aviación 3120",
    level: "Inicial",
    contactName: "Milagros Torres",
    contactRole: "Directora",
    contactEmail: "hola@nidoarcoiris.pe",
    contactPhone: "+51 955 000 777",
    status: "prospecto",
    notes: "Primera reunión realizada; falta propuesta económica.",
  },
];
