/**
 * Full-viewport film-grain overlay (see `.grain` in globals.css).
 * Purely decorative; kept very low opacity to add texture without noise.
 */
export function GrainOverlay() {
  return <div aria-hidden className="grain" />;
}
