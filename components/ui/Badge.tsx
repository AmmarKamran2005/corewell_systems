import { cn } from "@/lib/utils";

type BadgeVariant = "live" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  // text-accent-strong, not text-accent. The badge tints its own background
  // with the accent, so the text sits on a ground derived from itself and the
  // ratio collapses: on canvas-subtle, healthcare measured 4.34:1 and
  // hospitality 3.98:1 against the 4.5 AA floor. accent-strong clears every
  // industry on every surface (5.62–7.63) without changing a single accent.
  live: "bg-accent/10 text-accent-strong",
  neutral: "bg-canvas-subtle text-soft border border-line",
};

type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
};

/**
 * Status label. Per docs/spec.md Section 7, "Live Product" badges may only be
 * used for products that are genuinely live; concepts must be labeled
 * "Concept — Available as Custom Build" or "In Development".
 */
export function Badge({ variant = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {variant === "live" && (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
      )}
      {children}
    </span>
  );
}
