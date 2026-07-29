"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { booking, bookingUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type Option = "primary" | "short";

/**
 * Cal.com scheduling, embedded so the visitor never leaves the site — this
 * is the one conversion point the whole site drives toward (spec Section 10).
 *
 * The embed is a third-party script, so a direct link to the same booking
 * page is always rendered beneath it. If the script is blocked or slow, the
 * booking path still works.
 */
export function BookingEmbed() {
  const [option, setOption] = useState<Option>("primary");
  const active = booking[option];

  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi({ namespace: option });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: {
            light: { "cal-brand": "#0F766E" },
            dark: { "cal-brand": "#0F766E" },
          },
        });
      } catch {
        // Embed unavailable — the direct link below remains the booking path.
      }
    })();
  }, [option]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a call length"
        className="flex flex-wrap gap-2"
      >
        {(["primary", "short"] as const).map((key) => {
          const isActive = key === option;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setOption(key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-line bg-surface text-soft hover:border-faint/60 hover:text-ink"
              )}
            >
              {booking[key].label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-soft">{active.hint}</p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface">
        <Cal
          key={option}
          namespace={option}
          calLink={active.calLink}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view" }}
        />
      </div>

      <p className="mt-4 text-sm text-soft">
        Calendar not loading?{" "}
        <a
          href={bookingUrl(active.calLink)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:text-accent-strong"
        >
          Open the booking page directly →
        </a>
      </p>
    </div>
  );
}
