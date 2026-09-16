import { Turtle } from "../Turtle";

const ring = [
  { color: "#16a34a", value: 40 },
  { color: "#4ade80", value: 25 },
  { color: "#94a3b8", value: 20 },
  { color: "#cbd5e1", value: 15 },
];

const CIRCUMFERENCE = 2 * Math.PI * 42;

function StatsCard() {
  let offset = 0;

  return (
    <div className="animate-pop-in w-64 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-900/5 [animation-delay:0.5s]">
      <p className="text-sm font-bold text-slate-800">Estadísticas</p>
      <div className="mt-3 flex items-center gap-4">
        <ul className="flex-1 space-y-2">
          {ring.map((r) => (
            <li key={r.color} className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ background: r.color }} />
              <span className="h-1.5 flex-1 rounded-full bg-slate-200" />
            </li>
          ))}
        </ul>
        <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
          {ring.map((r) => {
            const length = (r.value / 100) * CIRCUMFERENCE;
            const dashOffset = -offset;
            offset += length;
            return (
              <circle
                key={r.color}
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={r.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${length - 4} ${CIRCUMFERENCE}`}
                strokeDashoffset={dashOffset}
                className="animate-draw-ring"
                style={
                  {
                    "--ring-length": `${CIRCUMFERENCE}`,
                    "--ring-offset": `${dashOffset}`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="animate-pop-in w-64 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-900/5 [animation-delay:0.7s]">
      <p className="text-sm font-bold text-slate-800">Chat con el terapeuta</p>
      <ul className="mt-4 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
              {["AT", "DR", "SN", "CR"][i]}
            </span>
            <span className="flex-1 space-y-1.5">
              <span className="block h-1.5 rounded-full bg-slate-200" />
              <span
                className="block h-1.5 rounded-full bg-slate-100"
                style={{ width: `${[70, 55, 80, 60][i]}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AppMockup() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="animate-fade-up overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        <div className="flex items-center gap-1.5 bg-slate-200 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-slate-400" />
          <span className="size-2.5 rounded-full bg-slate-400" />
          <span className="size-2.5 rounded-full bg-slate-400" />
        </div>

        <div className="flex h-[340px]">
          <div className="flex w-14 flex-col items-center gap-5 bg-slate-800 py-5">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-500">
              <Turtle className="size-6" title="FisioKids Schools" />
            </span>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="size-5 rounded-md bg-slate-600" />
            ))}
          </div>

          <div className="hidden w-52 flex-col gap-3 border-r border-slate-100 p-4 sm:flex">
            <span className="h-2 w-24 rounded-full bg-slate-200" />
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-9 rounded-lg ${i === 2 ? "bg-brand-100" : "bg-slate-100"}`}
              />
            ))}
          </div>

          <div className="relative flex flex-1 flex-col justify-center bg-gradient-to-br from-brand-600 to-brand-500 px-8 text-white">
            <p className="animate-fade-up text-sm font-semibold text-brand-50 [animation-delay:0.2s]">
              Un equipo, una misión
            </p>
            <p className="animate-fade-up text-3xl font-extrabold uppercase leading-none tracking-tight [animation-delay:0.3s] sm:text-4xl">
              Aprender
            </p>
            <span className="animate-fade-up mt-5 w-fit rounded-full border-2 border-white/80 px-6 py-2 text-sm font-bold [animation-delay:0.4s]">
              Ingresar
            </span>
            <span
              aria-hidden="true"
              className="animate-float absolute -bottom-2 right-4 text-6xl [animation-delay:0.5s]"
            >
              🐢
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -left-6 bottom-6 hidden lg:block">
        <StatsCard />
      </div>
      <div className="pointer-events-none absolute -right-8 top-16 hidden lg:block">
        <ChatCard />
      </div>
    </div>
  );
}
