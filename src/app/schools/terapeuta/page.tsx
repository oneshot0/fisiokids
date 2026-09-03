import type { Metadata } from "next";
import Link from "next/link";
import { Turtle } from "@/components/Turtle";
import { students } from "@/data/students";
import { findUserByEmail, roleLabels } from "@/data/users";

export const metadata: Metadata = {
  title: "Terapeuta",
};

export default function TherapistPage() {
  const therapist = findUserByEmail("terapeuta@fisiokids.pe");
  const assignedStudents = students.filter((student) => student.therapistId === therapist?.id);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-brand-100">
        <Turtle className="mx-auto size-24" title="Tuki, la tortuga de FisioKids" />
        <p className="mt-4 text-sm font-bold text-brand-600">{roleLabels.terapeuta}</p>
        <h1 className="mt-1 text-3xl font-extrabold text-brand-900">Hola, {therapist?.name}</h1>
        <p className="mt-3 text-slate-600">Módulo en construcción — paso 2</p>
        <div className="mt-6 rounded-2xl bg-brand-50 px-4 py-3 text-left text-sm text-brand-700">
          <p className="font-bold">{assignedStudents.length} niños asignados</p>
          <ul className="mt-2 space-y-1">
            {assignedStudents.map((student) => (
              <li key={student.id}>
                {student.firstName} {student.lastName} · {student.school}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/schools/login"
          className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
        >
          Volver al inicio de sesión
        </Link>
      </section>
    </main>
  );
}
