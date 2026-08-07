type TurtleProps = {
  className?: string;
  title?: string;
};

export function Turtle({ className, title = "Tuki, la tortuga de FisioKids" }: TurtleProps) {
  return (
    <svg
      viewBox="0 0 240 200"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <ellipse cx="124" cy="180" rx="80" ry="11" fill="#dcfce8" />

      <g fill="#4ade80">
        <ellipse cx="78" cy="162" rx="20" ry="13" transform="rotate(-16 78 162)" />
        <ellipse cx="170" cy="162" rx="20" ry="13" transform="rotate(16 170 162)" />
        <ellipse cx="206" cy="140" rx="17" ry="9" transform="rotate(26 206 140)" />
      </g>

      <ellipse cx="128" cy="120" rx="76" ry="54" fill="#16a34a" />
      <ellipse cx="128" cy="114" rx="63" ry="44" fill="#22c55e" />
      <g fill="#15803d" opacity="0.85">
        <circle cx="128" cy="100" r="17" />
        <circle cx="90" cy="110" r="12" />
        <circle cx="166" cy="110" r="12" />
        <circle cx="106" cy="140" r="11" />
        <circle cx="150" cy="140" r="11" />
      </g>
      <g fill="#86efad" opacity="0.9">
        <circle cx="128" cy="100" r="8" />
        <circle cx="90" cy="110" r="5" />
        <circle cx="166" cy="110" r="5" />
      </g>

      <g>
        <ellipse cx="46" cy="106" rx="32" ry="29" fill="#4ade80" />
        <ellipse cx="46" cy="106" rx="26" ry="23" fill="#86efad" opacity="0.45" />
        <circle cx="35" cy="100" r="5" fill="#14532d" />
        <circle cx="36.8" cy="98.2" r="1.8" fill="#ffffff" />
        <circle cx="56" cy="100" r="5" fill="#14532d" />
        <circle cx="57.8" cy="98.2" r="1.8" fill="#ffffff" />
        <path
          d="M35 116 q11 9 21 -1"
          stroke="#14532d"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="24" cy="111" r="5.5" fill="#bbf7d1" opacity="0.85" />
        <circle cx="67" cy="111" r="5.5" fill="#bbf7d1" opacity="0.85" />
      </g>
    </svg>
  );
}
