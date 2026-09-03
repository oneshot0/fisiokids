import { PanelShell } from "@/components/schools/PanelShell";
import { adminPanelConfig } from "@/data/admin";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PanelShell config={adminPanelConfig}>{children}</PanelShell>;
}
