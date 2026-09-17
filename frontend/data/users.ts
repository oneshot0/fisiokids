export type Role = "admin" | "terapeuta" | "padre";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  active: boolean;
  school?: string;
  studentIds?: string[];
};

export const roleLabels: Record<Role, string> = {
  admin: "Administrador",
  terapeuta: "Terapeuta",
  padre: "Apoderado",
};

export const roleHome: Record<Role, string> = {
  admin: "/schools/admin",
  terapeuta: "/schools/terapeuta",
  padre: "/schools/panel",
};

export const users: User[] = [
  {
    id: "user-admin",
    name: "Administración FisioKids",
    email: "admin@fisiokids.pe",
    role: "admin",
    initials: "FK",
    active: true,
  },
  {
    id: "therapist-diego",
    name: "Diego Ramos",
    email: "terapeuta@fisiokids.pe",
    role: "terapeuta",
    initials: "DR",
    active: true,
    school: "Colegio San Marcos",
  },
  {
    id: "therapist-ana",
    name: "Ana Torres",
    email: "ana.torres@fisiokids.pe",
    role: "terapeuta",
    initials: "AT",
    active: true,
    school: "Colegio San Marcos",
  },
  {
    id: "therapist-carla",
    name: "Carla Mendoza",
    email: "carla.mendoza@fisiokids.pe",
    role: "terapeuta",
    initials: "CM",
    active: true,
    school: "Colegio San Marcos",
  },
  {
    id: "parent-ana",
    name: "Ana Pérez",
    email: "ana@correo.com",
    role: "padre",
    initials: "AP",
    active: true,
    studentIds: ["student-mateo"],
  },
  {
    id: "parent-lucia",
    name: "Lucía Gómez",
    email: "lucia@correo.com",
    role: "padre",
    initials: "LG",
    active: true,
    studentIds: ["student-valentina"],
  },
  {
    id: "parent-marco",
    name: "Marco Ruiz",
    email: "marco@correo.com",
    role: "padre",
    initials: "MR",
    active: true,
    studentIds: ["student-santiago"],
  },
  {
    id: "parent-sofia",
    name: "Sofía Castro",
    email: "sofia@correo.com",
    role: "padre",
    initials: "SC",
    active: false,
    studentIds: ["student-emilia", "student-lucas"],
  },
];

export function findUserByEmail(email: string): User | undefined {
  const normalizedEmail = email.trim().toLowerCase();
  return users.find((user) => user.email.toLowerCase() === normalizedEmail);
}
