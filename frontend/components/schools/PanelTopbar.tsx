"use client";

export function PanelTopbar({
  burger,
  user,
  searchPlaceholder,
}: {
  burger: React.ReactNode;
  user: {
    name: string;
    initials: string;
    roleLabel: string;
  };
  searchPlaceholder: string;
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-cream-200 bg-cream-100/85 backdrop-blur lg:z-20">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-8">
        {burger}

        <form
          role="search"
          className="hidden flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-soft ring-1 ring-brand-100 transition-shadow focus-within:ring-2 focus-within:ring-brand-400 sm:flex"
          onSubmit={(event) => event.preventDefault()}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-5 shrink-0 text-brand-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            name="q"
            placeholder={searchPlaceholder}
            aria-label="Buscar en el panel"
            className="w-full bg-transparent text-sm font-semibold text-brand-900 placeholder:font-medium placeholder:text-brand-900/40 focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-3 sm:ml-0">
          <button
            type="button"
            aria-label="Ver avisos (3 nuevos)"
            className="lift-glow relative grid size-11 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-brand-100"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M18 15V10a6 6 0 1 0-12 0v5l-1.5 2.5h15L18 15Z" />
              <path d="M10 20h4" />
            </svg>
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-peach-500 text-[0.65rem] font-extrabold text-white">
              3
            </span>
          </button>

          <div
            tabIndex={0}
            className="lift-glow flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-soft ring-1 ring-brand-100"
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-brand-100 text-sm font-extrabold text-brand-700"
            >
              {user.initials}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-extrabold leading-tight text-brand-900">
                {user.name}
              </span>
              <span className="block text-xs font-semibold text-brand-600">{user.roleLabel}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
