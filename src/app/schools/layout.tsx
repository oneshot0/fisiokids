import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "FisioKids Schools",
    template: "%s · FisioKids Schools",
  },
  description:
    "Plataforma de FisioKids para colegios y familias: informes diarios, avances, recursos, juegos y pagos en un solo lugar.",
};

export default function SchoolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-slate-50 text-slate-800">{children}</div>;
}
