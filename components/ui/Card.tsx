import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
  /** Adds a subtle lift on hover — use for cards that are links. */
  interactive?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface p-6 sm:p-8",
        interactive &&
          "transition-shadow duration-150 hover:shadow-[0_2px_16px_rgb(27_36_48/0.06)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
