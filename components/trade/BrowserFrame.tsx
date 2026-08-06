import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A screenshot in a restrained browser chrome. The product is the visual, so
 * the frame does as little as possible: a hairline border, a muted bar, and a
 * path so a reader knows which screen they are looking at.
 */
export function BrowserFrame({
  src,
  alt,
  path,
  priority,
  className,
  sizes = "(min-width: 1024px) 720px, 100vw",
}: {
  src: string;
  alt: string;
  /** Shown in the address pill — the route inside the system, not a URL. */
  path?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_24px_rgb(27_36_48/0.05)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-canvas-subtle px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
        </span>
        {path && (
          <span className="ml-1 truncate rounded-full bg-surface px-2.5 py-0.5 text-[11px] leading-5 text-faint">
            {path}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={900}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </figure>
  );
}
