import { weekActivity } from "@/data/schools";

const barTones: Record<string, string> = {
  mint: "bg-brand-300",
  peach: "bg-peach-200",
  butter: "bg-butter-200",
  sky: "bg-sky-200",
  blush: "bg-blush-100",
};

const maxMinutes = 60;
const ticks = [60, 40, 20, 0];

export function WeekBars() {
  return (
    <figure className="mt-5">
      <figcaption className="sr-only">
        Minutos de terapia y actividades en casa por día de la semana
      </figcaption>

      <div className="flex gap-3">
        <ul
          aria-hidden="true"
          className="flex h-40 flex-col justify-between text-[0.7rem] font-bold text-brand-900/40"
        >
          {ticks.map((tick) => (
            <li key={tick}>{tick}</li>
          ))}
        </ul>

        <ul className="flex h-40 flex-1 items-end gap-2 border-b border-cream-200 sm:gap-3">
          {weekActivity.map((day, i) => (
            <li key={day.day} className="flex h-full flex-1 items-end">
              <div
                className={`animate-grow-bar w-full rounded-t-xl transition-all hover:opacity-80 ${barTones[day.tone]}`}
                style={{
                  height: `${(day.minutes / maxMinutes) * 100}%`,
                  animationDelay: `${0.08 * i}s`,
                }}
                title={`${day.day}: ${day.minutes} min`}
              />
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-2 flex gap-2 pl-8 text-center text-xs font-bold text-brand-900/50 sm:gap-3">
        {weekActivity.map((day) => (
          <li key={day.day} className="flex-1">
            {day.day}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm font-semibold text-brand-900/60">
        <span className="font-extrabold text-brand-700">215 min</span> de actividad esta
        semana entre terapias y juegos en casa.
      </p>
    </figure>
  );
}
