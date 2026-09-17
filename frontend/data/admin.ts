import type { PanelConfig } from "@/components/schools/PanelShell";
import type { PanelSection } from "./schools";
import { users } from "./users";

export const adminSections: PanelSection[] = [
  {
    href: "/schools/admin",
    label: "Inicio",
    icon: "home",
    description: "Resumen general de FisioKids Schools",
  },
  {
    href: "/schools/admin/usuarios",
    label: "Usuarios",
    icon: "users",
    description: "Administradores, terapeutas y apoderados",
  },
  {
    href: "/schools/admin/sesiones",
    label: "Sesiones",
    icon: "calendar",
    description: "Registro diario de terapias realizadas y canceladas",
  },
  {
    href: "/schools/admin/incidentes",
    label: "Incidentes y quejas",
    icon: "alert",
    description: "Bandeja de incidentes, quejas y recomendaciones",
  },
  {
    href: "/schools/admin/ninos",
    label: "Niños",
    icon: "children",
    description: "Perfiles de los peques y sus vínculos",
  },
  {
    href: "/schools/admin/colegios",
    label: "Colegios",
    icon: "school",
    description: "Centros educativos aliados",
  },
  {
    href: "/schools/admin/pagos",
    label: "Pagos",
    icon: "payments",
    description: "Facturación y cobros",
  },
];

const admin = users.find((user) => user.role === "admin");

export const adminPanelConfig: PanelConfig = {
  navId: "admin-nav",
  sections: adminSections,
  homeHref: "/schools/admin",
  greeting: {
    title: "Hola, equipo 👋",
    subtitle: "Panel de administración",
    href: "/schools/admin",
  },
  user: {
    name: admin?.name ?? "Administración FisioKids",
    initials: admin?.initials ?? "FK",
    roleLabel: "Administrador",
  },
  searchPlaceholder: "Buscar usuarios, niños o colegios...",
};
