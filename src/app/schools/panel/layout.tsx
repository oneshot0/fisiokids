import { PanelShell } from "@/components/schools/PanelShell";
import { parentPanelConfig } from "@/data/schools";

export default function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PanelShell config={parentPanelConfig}>{children}</PanelShell>;
}
