import type { DayStats } from "@/data/sessions";

export function SessionsChart({ data }: { data: DayStats[] }) {
  const maxSessions = Math.max(
    1,
    ...data.map((day) => day.realizadas + day.canceladas),
  );
  const totalRealizadas = data.reduce((total, day) => total + day.realizadas, 0);
  const totalCanceladas = data.reduce((total, day) => total + day.canceladas, 0);
  const totalSessions = totalRealizadas + totalCanceladas;
  const attendance = totalSessions
    ? Math.round((totalRealizadas / totalSessions) * 100)
    : 0;
  const ticks = [maxSessions, Math.ceil(maxSessions / 2), 0];

  return (
    <figure className="mt-5">
      <figcaption className="sr-only">
        Sesiones realizadas y canceladas durante los últimos 14 días
      </figcaption>

      <div className="flex gap-3">
        <ul
          aria-hidden="true"
          className="flex h-40 w-5 shrink-0 flex-col justify-between text-[0.65rem] font-bold text-brand-900/40"
        >
          {ticks.map((tick) => (
            <li key={tick}>{tick}</li>
          ))}
        </ul>

        <ul className="flex h-40 min-w-0 flex-1 items-end gap-1.5 border-b border-cream-200 sm:gap-2">
          {data.map((day, index) => {
            const total = day.realizadas + day.canceladas;
            const realizadasHeight = (day.realizadas / maxSessions) * 100;
            const canceladasHeight = (day.canceladas / maxSessions) * 100;

            return (
              <li key={day.date} className="flex h-full min-w-0 flex-1 items-end">
                <div
                  className="flex w-full flex-col justify-end overflow-hidden rounded-t-lg"
                  style={{ height: `${(total / maxSessions) * 100}%` }}
                  title={`${day.label}: ${day.realizadas} realizadas, ${day.canceladas} canceladas`}
                >
                  {day.canceladas > 0 && (
                    <div
                      className="animate-grow-bar w-full bg-blush-100"
                      style={{
                        height: `${(canceladasHeight / (canceladasHeight + realizadasHeight)) * 100}%`,
                        animationDelay: `${0.06 * index}s`,
                      }}
                    />
                  )}
                  {day.realizadas > 0 && (
                    <div
                      className="animate-grow-bar w-full bg-brand-300"
                      style={{
                        height: `${(realizadasHeight / (canceladasHeight + realizadasHeight)) * 100}%`,
                        animationDelay: `${0.06 * index}s`,
                      }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="mt-2 flex gap-1.5 pl-8 text-center text-[0.6rem] font-bold text-brand-900/50 sm:gap-2">
        {data.map((day) => (
          <li key={day.date} className="min-w-0 flex-1 truncate">
            {day.label}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-brand-900/55">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-brand-300" />
            Realizadas
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-blush-100" />
            Canceladas
          </span>
        </div>
        <p>
          Asistencia general:{" "}
          <span className="font-extrabold text-brand-700">{attendance}%</span>
        </p>
      </div>
    </figure>
  );
}
