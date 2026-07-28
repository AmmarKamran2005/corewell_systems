"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NodeChain } from "@/components/motion/NodeChain";
import type { Vertical } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

/**
 * Sub-market selector for an industry — e.g. clinics vs therapy vs equipment
 * suppliers within healthcare. Same tap-driven pattern as the Home industry
 * morph, so the mobile fallback is the default interaction (spec Section 11).
 */
export function VerticalTabs({ verticals }: { verticals: Vertical[] }) {
  const [slug, setSlug] = useState(verticals[0].slug);
  const reduceMotion = useReducedMotion();
  const active = verticals.find((v) => v.slug === slug)!;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a sector"
        className="flex flex-wrap gap-2"
      >
        {verticals.map((vertical) => {
          const isActive = vertical.slug === slug;
          return (
            <button
              key={vertical.slug}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSlug(vertical.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-line bg-surface text-soft hover:border-faint/60 hover:text-ink"
              )}
            >
              {vertical.name}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              {active.audience}
            </p>
            <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
              {active.name}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-soft">
              {active.summary}
            </p>

            <div className="mt-7">
              <p className="text-xs font-medium uppercase tracking-wider text-faint">
                How the work flows
              </p>
              <NodeChain nodes={active.flow} className="mt-4" />
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {active.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-sm leading-relaxed text-soft">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
