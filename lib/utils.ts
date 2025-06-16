import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases condicionales de manera segura y elimina duplicados.
 * @example
 * cn("px-2", isActive && "text-primary")
 */
export function cn(...inputs: (string | false | null | undefined)[]): string {
  return twMerge(clsx(...inputs));
}

/**
 * Convierte un valor hexadecimal a RGB string
 * @param hex Color en formato #RRGGBB
 * @returns "r, g, b"
 */
export function hexToRgb(hex: string): string {
  const [, r, g, b] = hex.match(/^#?(\w{2})(\w{2})(\w{2})$/i) || [];
  return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`;
}

/**
 * Ajusta el alpha de un color hex (devuelve rgba)
 */
export function withAlpha(hex: string, alpha: number): string {
  return `rgba(${hexToRgb(hex)}, ${alpha})`;
}
