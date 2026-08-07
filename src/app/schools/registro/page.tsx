import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/schools/AuthShell";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description:
    "Crea tu cuenta de apoderado en FisioKids Schools y vincula el perfil de tu peque.",
};

export default function RegistroPage() {
  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle="Vincula a tu peque con el código que te entregó el colegio."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/schools/login" className="font-bold text-brand-600 hover:underline">
            Ingresa aquí
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
