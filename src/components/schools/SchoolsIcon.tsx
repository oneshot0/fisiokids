import type { PanelSection } from "@/data/schools";

const paths: Record<PanelSection["icon"], string> = {
  home: "M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z",
  blog: "M6 4h9l3 3v13H6V4Zm3 6h6M9 14h6M9 18h4",
  tips: "M9 18h6m-5 3h4M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.3-1 2.1H9c0-.8-.4-1.5-1-2.1A6 6 0 0 1 12 3Z",
  games:
    "M7 11h4M9 9v4m5-1h.01M17 10h.01M6.5 7h11a3.5 3.5 0 0 1 3.4 4.3l-1 4.5A3 3 0 0 1 17 18a3 3 0 0 1-2.4-1.2L14 16h-4l-.6.8A3 3 0 0 1 7 18a3 3 0 0 1-2.9-2.2l-1-4.5A3.5 3.5 0 0 1 6.5 7Z",
  payments: "M3 8h18M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm4 7h4",
  reports:
    "M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5M10 16h5",
};

export function SchoolsIcon({
  icon,
  className = "size-5",
}: {
  icon: PanelSection["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[icon]} />
    </svg>
  );
}
