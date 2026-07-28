"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Shared building blocks for the sandboxed demo environments — spec
 * Section 6. Every screen keeps the "Interactive Demo — sample data" label
 * visible; quick-access roles replace credentials entirely.
 */

/**
 * Always-visible provenance badge. `kind` distinguishes a demo backed by a
 * production system of ours from one that previews a design we have
 * prototyped but not deployed (spec Section 7).
 */
export function DemoBadge({ kind = "demo" }: { kind?: "demo" | "design" }) {
  const isDesign = kind === "design";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        isDesign
          ? "border border-line bg-canvas-subtle text-soft"
          : "bg-accent/10 text-accent"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isDesign ? "bg-faint" : "bg-accent"
        )}
      />
      {isDesign
        ? "Design Preview — sample data"
        : "Interactive Demo — sample data"}
    </span>
  );
}

type DemoEntryProps = {
  label: string;
  blurb: string;
  roles: { id: string; label: string; description: string }[];
  onSelect: (roleId: string) => void;
  exitHref: string;
  kind?: "demo" | "design";
};

/** Quick-access entry screen: pick a role, land in the dashboard. */
export function DemoEntry({
  label,
  blurb,
  roles,
  onSelect,
  exitHref,
  kind = "demo",
}: DemoEntryProps) {
  return (
    <div className="mx-auto max-w-xl py-10 text-center sm:py-16">
      <DemoBadge kind={kind} />
      <h1 className="mt-5 text-2xl font-semibold leading-tight sm:text-3xl">
        {label}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-soft sm:text-base">
        {blurb}
      </p>
      <p className="mt-2 text-xs text-faint">
        No signup, no credentials — choose a role to enter. Everything you see
        is fabricated sample data.
        {kind === "design" &&
          " This is our design built as a working prototype, not a deployed installation."}
      </p>
      <div className="mt-8 space-y-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className="block w-full rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="block text-sm font-semibold text-ink">
              {role.label}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-soft">
              {role.description}
            </span>
          </button>
        ))}
      </div>
      <Link
        href={exitHref}
        className="mt-6 inline-block text-sm font-medium text-accent hover:text-accent-strong"
      >
        ← Back without entering
      </Link>
    </div>
  );
}

type DemoFrameProps = {
  title: string;
  roleLabel: string;
  onSwitchRole: () => void;
  exitHref: string;
  nav: { id: string; label: string }[];
  activeView: string;
  onNavigate: (viewId: string) => void;
  children: React.ReactNode;
  kind?: "demo" | "design";
};

/** The demo application chrome: top bar, side nav, content panel. */
export function DemoFrame({
  title,
  roleLabel,
  onSwitchRole,
  exitHref,
  nav,
  activeView,
  onNavigate,
  children,
  kind = "demo",
}: DemoFrameProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-canvas-subtle px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-ink">{title}</p>
          <DemoBadge kind={kind} />
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full border border-line bg-surface px-3 py-1 font-medium text-ink">
            {roleLabel}
          </span>
          <button
            onClick={onSwitchRole}
            className="font-medium text-accent hover:text-accent-strong"
          >
            Switch role
          </button>
          <Link
            href={exitHref}
            className="font-medium text-soft hover:text-ink"
          >
            Exit demo
          </Link>
        </div>
      </div>

      <div className="flex min-h-[34rem] flex-col sm:flex-row">
        <nav
          aria-label="Demo sections"
          className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-canvas-subtle/50 p-2 sm:w-48 sm:flex-col sm:border-b-0 sm:border-r sm:p-3"
        >
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition-colors",
                activeView === item.id
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-soft hover:bg-canvas-subtle hover:text-ink"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex-1 p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

type PillTone = "green" | "amber" | "rose" | "gray" | "accent";

const pillTones: Record<PillTone, string> = {
  green: "bg-emerald-600/10 text-emerald-700",
  amber: "bg-amber-600/10 text-amber-700",
  rose: "bg-rose-600/10 text-rose-700",
  gray: "bg-canvas-subtle text-soft border border-line",
  accent: "bg-accent/10 text-accent",
};

export function Pill({
  tone,
  children,
}: {
  tone: PillTone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        pillTones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-canvas p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-faint">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-semibold text-ink-strong">{value}</p>
      {hint && <p className="mt-1 text-xs text-soft">{hint}</p>}
    </div>
  );
}

export function PanelHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-ink-strong">{children}</h2>;
}
