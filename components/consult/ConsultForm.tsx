"use client";

import { useEffect, useRef, useState } from "react";
import { cardIndustries } from "@/lib/industries";

const budgetBands = [
  "Under $10k",
  "$10k – $30k",
  "$30k – $80k",
  "$80k+",
  "Not sure yet",
];

type FormState = "idle" | "sending" | "sent" | "unconfigured" | "error";

/**
 * Short qualifying form — spec Sections 5 + 10: stay short, qualify deeper on
 * the call. Honeypot field + server-side rate limiting (Section 11).
 */
export function ConsultForm() {
  const [state, setState] = useState<FormState>("idle");
  // The submit button unmounts when the form is replaced by the confirmation,
  // which would drop focus to <body>. Move it to the confirmation instead so
  // keyboard and screen-reader users land on the result (WCAG 2.4.3).
  const confirmationRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state === "sent") confirmationRef.current?.focus();
  }, [state]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/consult-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("sent");
        form.reset();
      } else if (res.status === 503) {
        setState("unconfigured");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-line bg-surface p-8 text-center"
      >
        <p
          ref={confirmationRef}
          tabIndex={-1}
          className="text-lg font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Request received.
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-soft">
          We&apos;ll reply within one business day to set up the call. No
          pitch deck — just a conversation about your operation.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users, tempting to bots */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-ink">Name</span>
          <input name="name" autoComplete="name" required maxLength={200} className={`mt-1.5 ${inputClasses}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} className={`mt-1.5 ${inputClasses}`} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-ink">Company</span>
          <input name="company" autoComplete="organization" maxLength={200} className={`mt-1.5 ${inputClasses}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Industry</span>
          <select name="industry" defaultValue="" className={`mt-1.5 ${inputClasses}`}>
            <option value="">Select an industry</option>
            {cardIndustries.map((industry) => (
              <option key={industry.slug} value={industry.name}>
                {industry.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-ink">Rough budget band</span>
        <select name="budget" defaultValue="" className={`mt-1.5 ${inputClasses}`}>
          <option value="">Select a range</option>
          {budgetBands.map((band) => (
            <option key={band} value={band}>
              {band}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="font-medium text-ink">
          What problem should the software solve?
        </span>
        <textarea
          name="message"
          required
          rows={4}
          maxLength={2000}
          placeholder="A few sentences is plenty — we'll go deeper on the call."
          className={`mt-1.5 ${inputClasses}`}
        />
      </label>

      <button
        type="submit"
        disabled={state === "sending"}
        className="h-11 w-full rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Request a Consultation"}
      </button>

      {/*
        Always in the DOM so assistive tech is already watching it when a
        message appears — a live region mounted at the same moment as its
        content is announced unreliably (WCAG 4.1.3).
      */}
      <div role="alert" aria-live="assertive">
        {state === "unconfigured" && (
          <p className="rounded-lg border border-line bg-canvas-subtle p-3 text-xs leading-relaxed text-soft">
            Form delivery is still being configured — email us directly at{" "}
            <a
              href="mailto:info@corewellsystems.com"
              className="font-medium text-accent"
            >
              info@corewellsystems.com
            </a>{" "}
            and we&apos;ll reply within one business day.
          </p>
        )}
        {state === "error" && (
          <p className="rounded-lg border border-rose-600/30 bg-rose-600/5 p-3 text-xs leading-relaxed text-soft">
            Something went wrong sending your request — please try again in a
            minute.
          </p>
        )}
      </div>
    </form>
  );
}
