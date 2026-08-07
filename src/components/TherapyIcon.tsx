import type { Therapy } from "@/data/therapies";

const paths: Record<Therapy["icon"], string> = {
  motor: "M12 4a2 2 0 1 0 0-.001ZM7 21l2.5-6 2-2m0 0 1.5 4 3.5 4m-5-8 4-1 3 2M6 10l3-2h3",
  speech: "M4 5h16v10H9l-5 4V5Zm4 4h8M8 12h5",
  occupational: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-1V4.5a1.5 1.5 0 0 1 3 0V12m0-.5V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.5A6.5 6.5 0 0 1 5 13.5V11a1.5 1.5 0 0 1 3 0",
  early: "M12 21s-7-4.6-7-9.4A4.6 4.6 0 0 1 12 8a4.6 4.6 0 0 1 7 3.6C19 16.4 12 21 12 21Z",
  respiratory: "M12 4v7m0 0c0 4-2 5-4 5s-3-1.2-3-3 1-3 3-3m4 1c0 4 2 5 4 5s3-1.2 3-3-1-3-3-3",
  aquatic: "M3 15c1.8 0 1.8 2 3.6 2s1.8-2 3.6-2 1.8 2 3.6 2 1.8-2 3.6-2 1.8 2 3.6 2M3 10c1.8 0 1.8 2 3.6 2s1.8-2 3.6-2 1.8 2 3.6 2 1.8-2 3.6-2 1.8 2 3.6 2",
};

export function TherapyIcon({ icon, className = "size-6" }: { icon: Therapy["icon"]; className?: string }) {
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
