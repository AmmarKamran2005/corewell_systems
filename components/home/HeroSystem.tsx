"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A living fragment of real software in the hero.
 *
 * The site claims "working systems you can try" — this proves it before the
 * visitor scrolls, and it is the one thing that separates a software company
 * from an agency at a glance.
 *
 * Deliberately hand-built rather than an embedded demo: no iframe, no image,
 * no network request, a few hundred bytes of state. It must never threaten
 * the hero's paint time (spec Section 11). Motion stops entirely under
 * prefers-reduced-motion, which leaves a legible static panel.
 */

type Row = {
  time: string;
  name: string;
  detail: string;
  state: "done" | "active" | "waiting";
};

const baseRows: Row[] = [
  { time: "09:00", name: "S. Mitchell", detail: "Diabetes review", state: "done" },
  { time: "09:30", name: "D. Chen", detail: "Lab results", state: "done" },
  { time: "10:15", name: "A. Khan", detail: "Follow-up", state: "waiting" },
  { time: "11:00", name: "F. Noor", detail: "Consult", state: "waiting" },
];

const stateMeta = {
  done: { label: "Seen", cls: "bg-emerald-600/10 text-emerald-700" },
  active: { label: "In room", cls: "bg-accent/10 text-accent" },
  waiting: { label: "Waiting", cls: "bg-canvas-subtle text-faint" },
} as const;

export function HeroSystem() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  // One slow, four-beat loop. Paused entirely for reduced-motion users.
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const rows: Row[] = baseRows.map((row, i) => {
    if (reduceMotion) return row;
    if (i === 2) return { ...row, state: step >= 1 ? "active" : "waiting" };
    if (i === 3) return { ...row, state: step >= 3 ? "active" : "waiting" };
    return row;
  });

  const seen = rows.filter((r) => r.state === "done").length;

  return (
    <div
      aria-hidden
      className="relative select-none rounded-2xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgb(27_36_48/0.04),0_12px_32px_-12px_rgb(27_36_48/0.14)] sm:p-5"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-2 text-xs font-medium text-soft">
            Today&apos;s schedule
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[0.65rem] font-medium text-accent">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={reduceMotion ? {} : { opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          Live
        </span>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-2 py-3">
        {[
          { label: "Booked", value: rows.length },
          { label: "Seen", value: seen },
          { label: "Waiting", value: rows.length - seen },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-canvas px-3 py-2">
            <p className="text-[0.6rem] font-medium uppercase tracking-wider text-faint">
              {stat.label}
            </p>
            <p className="mt-0.5 font-display text-lg font-semibold tabular-nums text-ink-strong">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Schedule rows */}
      <ul className="divide-y divide-line border-t border-line">
        {rows.map((row) => (
          <li
            key={row.time}
            className="flex items-center justify-between gap-3 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-xs tabular-nums text-faint">
                {row.time}
              </span>
              <div>
                <p className="text-xs font-medium leading-tight text-ink">
                  {row.name}
                </p>
                <p className="text-[0.65rem] leading-tight text-soft">
                  {row.detail}
                </p>
              </div>
            </div>
            <motion.span
              layout
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-medium transition-colors duration-500",
                stateMeta[row.state].cls
              )}
            >
              {stateMeta[row.state].label}
            </motion.span>
          </li>
        ))}
      </ul>

      {/* Note drafting — the capability that separates this from a calendar */}
      <div className="mt-3 rounded-xl border border-line bg-canvas p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.6rem] font-medium uppercase tracking-wider text-faint">
            Clinical note
          </p>
          <span className="text-[0.6rem] font-medium text-accent">
            {reduceMotion || step < 2 ? "Drafting…" : "Ready to sign"}
          </span>
        </div>
        <div className="mt-2 space-y-1.5">
          {[100, 88, 64].map((width, i) => (
            <motion.div
              key={width}
              className="h-1.5 rounded-full bg-accent/20"
              initial={false}
              animate={{
                width: reduceMotion
                  ? `${width}%`
                  : step >= 2
                    ? `${width}%`
                    : `${width * 0.35}%`,
              }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
