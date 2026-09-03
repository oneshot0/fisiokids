export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  school: string;
  parentId: string;
  therapistId: string;
  areas: string[];
};

export const students: Student[] = [
  {
    id: "student-mateo",
    firstName: "Mateo",
    lastName: "Pérez",
    age: 5,
    school: "Colegio San Marcos",
    parentId: "parent-ana",
    therapistId: "therapist-diego",
    areas: ["Lenguaje", "Motora"],
  },
  {
    id: "student-valentina",
    firstName: "Valentina",
    lastName: "Gómez",
    age: 6,
    school: "Colegio San Marcos",
    parentId: "parent-lucia",
    therapistId: "therapist-diego",
    areas: ["Sensorial", "Autonomía"],
  },
  {
    id: "student-santiago",
    firstName: "Santiago",
    lastName: "Ruiz",
    age: 7,
    school: "Colegio San Marcos",
    parentId: "parent-marco",
    therapistId: "therapist-ana",
    areas: ["Motora", "Autonomía"],
  },
  {
    id: "student-emilia",
    firstName: "Emilia",
    lastName: "Castro",
    age: 4,
    school: "Colegio San Marcos",
    parentId: "parent-sofia",
    therapistId: "therapist-ana",
    areas: ["Lenguaje", "Sensorial"],
  },
  {
    id: "student-lucas",
    firstName: "Lucas",
    lastName: "Castro",
    age: 8,
    school: "Colegio San Marcos",
    parentId: "parent-sofia",
    therapistId: "therapist-carla",
    areas: ["Motora", "Lenguaje", "Autonomía"],
  },
];
