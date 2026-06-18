interface InterestTileProps {
  label: string;
}

export function InterestTile({ label }: InterestTileProps) {
  return (
    <span className="rounded-xl border border-[color-mix(in_srgb,var(--color-muted)_16%,transparent)] bg-elevated px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-amber hover:text-amber-bright">
      {label}
    </span>
  );
}
