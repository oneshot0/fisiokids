import { Turtle } from "./Turtle";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid size-10 place-items-center rounded-full bg-brand-100">
        <Turtle className="size-8" title="FisioKids" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-brand-800">
        Fisio<span className="text-brand-500">Kids</span>
      </span>
    </span>
  );
}
