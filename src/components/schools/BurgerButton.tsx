export function BurgerButton({
  expanded,
  showClose,
  label,
  controls,
  onClick,
  className = "",
}: {
  /** Estado real del menú, para lectores de pantalla. */
  expanded: boolean;
  /** Si el ícono debe transformarse en una X (menú flotante abierto en móvil). */
  showClose: boolean;
  label: string;
  controls: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-open={showClose}
      aria-expanded={expanded}
      aria-controls={controls}
      aria-label={label}
      title={label}
      className={`grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft ring-1 ring-brand-100 transition-all hover:-translate-y-0.5 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${className}`}
    >
      <span aria-hidden="true" className="flex h-4 w-5 flex-col justify-between">
        <span className="panel-burger-line h-[3px] w-full rounded-full bg-current" />
        <span className="panel-burger-line h-[3px] w-full rounded-full bg-current" />
        <span className="panel-burger-line h-[3px] w-full rounded-full bg-current" />
      </span>
    </button>
  );
}
