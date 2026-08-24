import { PanelShell } from "@/components/schools/PanelShell";

export default function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PanelShell>{children}</PanelShell>;
}
