import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/schools/AuthShell";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Ingresar",
  description: "Accede al portal de FisioKids Schools con tu cuenta de apoderado.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Ingresa a tu cuenta"
      subtitle="Revisa los reportes, avances y recursos de tu peque."
      footer={
        <>
          ¿Aún no tienes cuenta?{" "}
          <Link href="/schools/registro" className="font-bold text-brand-600 hover:underline">
            Regístrate
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
