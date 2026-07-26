import { cn } from "@/lib/utils";

type BadgeVariant = "live" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  live: "bg-accent/10 text-accent",
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
