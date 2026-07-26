import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

/** Centered content column, max width 1240px per spec Section 4. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
