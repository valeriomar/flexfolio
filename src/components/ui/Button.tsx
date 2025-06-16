"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";

// ── Variants & Sizes ──────────────────────────────────
export type ButtonVariant =
  | "primary"   // filled with --primary
  | "secondary" // subtle filled using primary at 10 %
  | "outline"   // border only
  | "ghost";    // text only

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  asChild?: boolean; // allows <Button asChild><Link /></Button>
}

/**
 * Tailwind‑powered button that adapts to the current theme (`--primary`).
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-full transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2",
          // Size rules
          {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-sm",
            lg: "px-6 py-3 text-base"
          }[size],
          // Variant rules
          {
            primary: "bg-[var(--primary)]  hover:brightness-110",
            secondary:
              "bg-[rgba(var(--primary-rgb),0.12)] text-[var(--primary)] hover:bg-[rgba(var(--primary-rgb),0.18)]",
            outline:
              "border border-[var(--primary)] text-[var(--primary)] hover:bg-[rgba(var(--primary-rgb),0.05)]",
            ghost: "text-[var(--primary)] hover:bg-[rgba(var(--primary-rgb),0.05)]"
          }[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
