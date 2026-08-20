"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NodeChain } from "@/components/motion/NodeChain";
import {
  cardIndustries,
  demoBadge,
  enterpriseIndustry,
  industryAccentStyle,
} from "@/lib/industries";
import { cn } from "@/lib/utils";

/**
 * The Home industry selector — spec Section 5 item 2: choosing an industry
 * re-themes the preview inline instead of navigating away. Selecting a tab
 * shifts the accent theme, rebuilds the workflow node chain, and swaps the
 * demo/concept treatment. Tap-driven, so the mobile fallback (spec Section
 * 11) is the default interaction, not a special case.
 */
export function IndustryMorph() {
  const [slug, setSlug] = useState(cardIndustries[0].slug);
  const reduceMotion = useReducedMotion();

  const active = cardIndustries.find((i) => i.slug === slug)!;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Built for the way your industry operates
          </h2>
          <p className="mt-4 text-base leading-relaxed text-soft">
            Every industry runs on different workflows. We build software
            around yours — not the other way around.
          </p>
        </div>

        {/* Accent scope: everything inside re-themes to the active industry */}
        <div className="mt-10" style={industryAccentStyle(active)}>
          <div
            role="tablist"
            aria-label="Choose an industry"
            className="flex flex-wrap gap-2"
          >
            {cardIndustries.map((industry) => {
              const isActive = industry.slug === slug;
              return (
                <button type="button"
                  key={industry.slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSlug(industry.slug)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    isActive
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-line bg-surface text-soft hover:border-faint/60 hover:text-ink"
                  )}
                >
                  {industry.name}
                </button>
              );
            })}
          </div>

          <div className="mt-5 min-h-[22rem] rounded-2xl border border-line bg-surface p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                initial={
                  reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    {active.name}
                  </h3>
                  {active.status === "demo" ? (
                    <Badge variant={demoBadge(active).tone}>
                      {demoBadge(active).label}
                    </Badge>
                  ) : (
                    <Badge variant="neutral">
                      Concept — Available as Custom Build
                    </Badge>
                  )}
                </div>

                <p className="mt-3 max-w-2xl text-base leading-relaxed text-soft">
                  {active.oneLiner}
                </p>

                <div className="mt-7">
                  <p className="text-xs font-medium uppercase tracking-wider text-faint">
                    How the system connects
                  </p>
                  <NodeChain nodes={active.nodes} className="mt-4" />
                </div>

                {active.demo && (
                  <p className="mt-7 max-w-2xl text-sm leading-relaxed text-soft">
                    {active.demo.blurb}
                  </p>
                )}

                <div className="mt-7 flex flex-wrap gap-4">
                  <Button href={`/industries/${active.slug}`}>
                    Explore {active.name}
                  </Button>
                  {active.demo && (
                    <Button
                      href={`/industries/${active.slug}/demo`}
                      variant="secondary"
                    >
                      Open the interactive demo
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Link
          href={`/industries/${enterpriseIndustry.slug}`}
          className="group mt-8 block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <div className="rounded-2xl border border-dashed border-faint/40 p-6 text-center transition-colors duration-150 group-hover:border-accent/50 sm:p-8">
            <h3 className="text-lg font-semibold">
              Don&apos;t see your industry?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-soft">
              {enterpriseIndustry.oneLiner}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Talk to us about a custom build
              <span
                aria-hidden
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </Container>
    </section>
  );
}
