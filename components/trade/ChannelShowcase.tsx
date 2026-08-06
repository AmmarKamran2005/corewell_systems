"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrowserFrame } from "@/components/trade/BrowserFrame";
import { channels } from "@/lib/trade";
import { cn } from "@/lib/utils";

/**
 * The three channels, one at a time — the tab-switcher pattern from the home
 * page industry morph, reused rather than reinvented (plan §5).
 *
 * Tab-driven rather than hover-driven, so the touch behaviour is the default
 * one. The motion carries meaning: switching channel replaces the screen, and
 * the crossfade is what says "same system, different face". It collapses to an
 * instant swap under prefers-reduced-motion.
 */
export function ChannelShowcase() {
  const [activeId, setActiveId] = useState(channels[0].id);
  const reduceMotion = useReducedMotion();
  const active = channels.find((c) => c.id === activeId)!;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a sales channel"
        className="flex flex-wrap gap-2"
      >
        {channels.map((channel) => {
          const isActive = channel.id === activeId;
          return (
            <button
              key={channel.id}
              type="button"
              role="tab"
              id={`channel-tab-${channel.id}`}
              aria-selected={isActive}
              aria-controls={`channel-panel-${channel.id}`}
              onClick={() => setActiveId(channel.id)}
              className={cn(
                "min-h-11 rounded-full border px-5 text-sm font-medium transition-colors duration-150",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-soft hover:border-faint/60 hover:text-ink"
              )}
            >
              {channel.tab}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`channel-panel-${active.id}`}
        aria-labelledby={`channel-tab-${active.id}`}
        className="mt-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
              <div>
                <h3 className="text-2xl font-semibold sm:text-3xl">
                  {active.heading}
                </h3>
                <p className="mt-3 text-base font-medium leading-relaxed text-ink">
                  {active.lede}
                </p>
                {active.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-base leading-relaxed text-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Lead screen full width, the supporting pair beneath it — a
                  single tall column of three would leave the copy stranded
                  against a metre of whitespace. */}
              <div className="grid gap-5">
                {active.shots.slice(0, 1).map((shot) => (
                  <div key={shot.src}>
                    <BrowserFrame
                      src={shot.src}
                      alt={shot.alt}
                      sizes="(min-width: 1024px) 700px, 100vw"
                      /* The first screen of the first channel is what a
                         visitor scrolls to first; the rest can wait. */
                      priority={active.id === channels[0].id}
                    />
                    <p className="mt-2 text-sm text-faint">{shot.caption}</p>
                  </div>
                ))}
                <div className="grid gap-5 sm:grid-cols-2">
                  {active.shots.slice(1).map((shot) => (
                    <div key={shot.src}>
                      <BrowserFrame
                        src={shot.src}
                        alt={shot.alt}
                        sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 100vw"
                      />
                      <p className="mt-2 text-sm text-faint">{shot.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
