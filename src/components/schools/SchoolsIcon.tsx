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
  users:
    "M16 20v-1a4 4 0 0 0-8 0v1M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-4a2.5 2.5 0 0 1 0 5m1 8v-1a3.5 3.5 0 0 0-2-3.2",
  children:
    "M8 20v-1a3 3 0 0 1 6 0v1M11 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm6 5v-1a3 3 0 0 0-2.2-2.9M17 14a2 2 0 1 0 0-4",
  school: "M3 10 12 4l9 6M5 11v9h14v-9M9 20v-5h6v5",
  calendar:
    "M6 4v3m12-3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Zm2 8h3m2 0h3m-8 4h3m2 0h3",
  alert: "M12 4 21 20H3L12 4Zm0 6v4m0 3h.01",
  chat: "M4 5h16v11H8l-4 4V5Zm4 5h.01m3.99 0h.01m3.99 0h.01",
  check: "m5 12 4 4L19 6",
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
