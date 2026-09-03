import type { Metadata } from "next";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { adminSections } from "@/data/admin";

const section = adminSections.find((item) => item.href.endsWith("/sesiones"))!;

export const metadata: Metadata = {
  title: "Sesiones",
};

export default function AdminSessionsPage() {
  return (
    <>
      <PanelHeader title={section.label} subtitle={section.description} />
      <section className="animate-fade-up rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-cream-200">
        <p className="font-semibold text-brand-900/60">
          Módulo en construcción — próximo paso
        </p>
      </section>
    </>
  );
}
