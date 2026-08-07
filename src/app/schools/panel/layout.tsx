import { PanelSidebar } from "@/components/schools/PanelSidebar";

export default function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-100">
      <PanelSidebar />
      <div className="lg:pl-64">
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
