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
    <header className="animate-fade-up mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1.5 text-slate-600">{subtitle}</p>
      </div>
      {action}
    </header>
  );
}
