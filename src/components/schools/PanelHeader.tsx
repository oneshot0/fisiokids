export function PanelHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="animate-fade-up mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-900">{title}</h1>
        <p className="mt-1.5 font-semibold text-brand-900/60">{subtitle}</p>
      </div>
      {action}
    </header>
  );
}
