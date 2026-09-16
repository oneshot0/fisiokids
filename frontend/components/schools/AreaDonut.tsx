import { areaShares } from "@/data/schools";

const strokeTones: Record<string, string> = {
  mint: "stroke-brand-400",
  peach: "stroke-peach-200",
  butter: "stroke-butter-200",
  sky: "stroke-sky-200",
  blush: "stroke-blush-100",
};

const dotTones: Record<string, string> = {
  mint: "bg-brand-400",
  peach: "bg-peach-200",
  butter: "bg-butter-200",
  sky: "bg-sky-200",
  blush: "bg-blush-100",
};

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function AreaDonut() {
  let offset = 0;

  const segments = areaShares.map((share, i) => {
    const length = (share.percent / 100) * CIRCUMFERENCE;
    const rotation = (offset / 100) * 360 - 90;
    offset += share.percent;

    return (
      <circle
        key={share.area}
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        strokeWidth="16"
        strokeLinecap="butt"
        className={`animate-fade-in ${strokeTones[share.tone]}`}
        strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
        transform={`rotate(${rotation} 50 50)`}
        style={{ animationDelay: `${0.12 * i}s` }}
      />
    );
  });

  return (
    <figure className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
      <figcaption className="sr-only">
        Distribución del tiempo de trabajo por área terapéutica
      </figcaption>

      <svg viewBox="0 0 100 100" className="size-36 shrink-0" aria-hidden="true">
        {segments}
      </svg>

      <ul className="w-full space-y-2.5">
        {areaShares.map((share) => (
          <li
            key={share.area}
            className="flex items-center gap-2.5 text-sm font-bold text-brand-900/70"
          >
            <span
              aria-hidden="true"
              className={`size-3 shrink-0 rounded-full ${dotTones[share.tone]}`}
            />
            <span className="flex-1">{share.area}</span>
            <span className="font-extrabold text-brand-900">{share.percent}%</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
