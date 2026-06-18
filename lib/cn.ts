/**
 * Tiny classnames helper — joins truthy values with a space.
 * Avoids an extra dependency for V1; swap for clsx/tailwind-merge later
 * if conditional class logic grows.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
