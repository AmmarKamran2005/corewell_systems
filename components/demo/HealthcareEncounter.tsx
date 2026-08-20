"use client";

import { useEffect, useRef, useState } from "react";
import { PanelHeading, Pill, StatCard } from "@/components/demo/primitives";
import {
  demoEligibility,
  demoGeneratedNote,
  demoHistory,
  demoOrderCatalog,
  demoOrders,
  demoSuggestedCodes,
  demoTranscriptLines,
  demoVitals,
  encounterSteps,
  getPatient,
  ENCOUNTER_PATIENT_ID,
  type DemoCode,
  type DemoOrder,
  type EncounterStepId,
} from "@/lib/demo/healthcare";
import { cn } from "@/lib/utils";

type ScribeState = "idle" | "recording" | "generating" | "ready";

/**
 * Encounter workspace — the guided visit flow from the real clinical
 * platform, reproduced on sample data: vitals → history → note → orders →
 * codes → checkout.
 *
 * The ambient-scribe step is a scripted simulation and says so on screen:
 * no audio is captured and no model is called. In the production system the
 * visit is recorded, transcribed, and drafted into the clinic's own template
 * with patient identifiers removed before the model sees anything.
 */
export function HealthcareEncounter({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [step, setStep] = useState<EncounterStepId>("vitals");
  const [scribe, setScribe] = useState<ScribeState>("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const [orders, setOrders] = useState<DemoOrder[]>(demoOrders);
  const [codes, setCodes] = useState<DemoCode[]>([]);
  const [claimCreated, setClaimCreated] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const patient = getPatient(ENCOUNTER_PATIENT_ID)!;
  const stepIndex = encounterSteps.findIndex((s) => s.id === step);

  // Clear any pending simulation timers on unmount.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const startScribe = () => {
    setScribe("recording");
    setVisibleLines(0);
    demoTranscriptLines.forEach((_, index) => {
      timers.current.push(
        setTimeout(() => setVisibleLines(index + 1), (index + 1) * 700)
      );
    });
    timers.current.push(
      setTimeout(
        () => setScribe("generating"),
        demoTranscriptLines.length * 700 + 400
      )
    );
    timers.current.push(
      setTimeout(
        () => setScribe("ready"),
        demoTranscriptLines.length * 700 + 1900
      )
    );
  };

  const acceptCode = (code: DemoCode) => {
    setCodes((current) =>
      current.some((c) => c.code === code.code) ? current : [...current, code]
    );
  };

  const removeCode = (codeValue: string) => {
    setCodes((current) => current.filter((c) => c.code !== codeValue));
  };

  const addOrder = (order: DemoOrder) => {
    setOrders((current) =>
      current.some((o) => o.id === order.id) ? current : [...current, order]
    );
  };

  const goNext = () => {
    const next = encounterSteps[stepIndex + 1];
    if (next) setStep(next.id);
  };

  return (
    <div>
      {/* Patient banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-canvas p-4">
        <div>
          <p className="text-sm font-semibold text-ink">{patient.name}</p>
          <p className="mt-0.5 text-xs text-soft">
            {patient.id} · {patient.age} {patient.gender} · Allergies:{" "}
            {patient.allergies}
          </p>
        </div>
        <Pill tone="amber">Visit in progress</Pill>
      </div>

      {/* Step rail */}
      <nav aria-label="Encounter steps" className="mt-5 overflow-x-auto">
        <ol className="flex min-w-max items-center gap-2">
          {encounterSteps.map((s, index) => {
            const done = index < stepIndex;
            const active = index === stepIndex;
            return (
              <li key={s.id} className="flex items-center gap-2">
                <button type="button"
                  onClick={() => setStep(s.id)}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-accent/40 bg-accent/10 text-accent-strong"
                      : done
                        ? "border-emerald-600/30 bg-emerald-600/5 text-emerald-700"
                        : "border-line bg-surface text-soft hover:text-ink"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem]",
                      done
                        ? "bg-emerald-600 text-white"
                        : active
                          ? "bg-accent text-white"
                          : "bg-canvas-subtle text-faint"
                    )}
                  >
                    {done ? "✓" : index + 1}
                  </span>
                  {s.label}
                </button>
                {index < encounterSteps.length - 1 && (
                  <span aria-hidden className="h-px w-4 bg-line" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-6">
        {step === "vitals" && (
          <div>
            <PanelHeading>Vitals</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              Recorded by the medical assistant before the provider enters.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {demoVitals.map((vital) => (
                <div
                  key={vital.label}
                  className="rounded-xl border border-line bg-canvas p-4"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-faint">
                    {vital.label}
                  </p>
                  <p className="mt-1.5 text-xl font-semibold text-ink-strong">
                    {vital.value}{" "}
                    <span className="text-sm font-normal text-soft">
                      {vital.unit}
                    </span>
                  </p>
                  {vital.flag === "high" && (
                    <span className="mt-1 inline-block text-xs font-medium text-amber-700">
                      Above target
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "history" && (
          <div>
            <PanelHeading>History review</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              Active problems, medications, and allergies — reviewed at every
              visit.
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-line bg-canvas p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  Problems
                </p>
                <ul className="mt-3 space-y-2.5">
                  {demoHistory.problems.map((p) => (
                    <li key={p.name}>
                      <p className="text-sm text-ink">{p.name}</p>
                      <p className="text-xs text-soft">
                        {p.status} · {p.since}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-canvas p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  Medications
                </p>
                <ul className="mt-3 space-y-2.5">
                  {demoHistory.medications.map((m) => (
                    <li key={m.name}>
                      <p className="text-sm text-ink">{m.name}</p>
                      <p className="text-xs text-soft">
                        {m.detail} · {m.status}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-rose-600/30 bg-rose-600/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-rose-700">
                  Allergies
                </p>
                <ul className="mt-3 space-y-2.5">
                  {demoHistory.allergies.map((a) => (
                    <li key={a.name}>
                      <p className="text-sm text-ink">{a.name}</p>
                      <p className="text-xs text-soft">
                        {a.detail} · {a.severity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {step === "note" && (
          <div>
            <PanelHeading>Clinical note</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              In the production system the visit is recorded and drafted into
              the clinic&apos;s own template. This demo plays a scripted
              conversation — no audio is captured.
            </p>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-line bg-canvas p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-faint">
                    Visit transcript
                  </p>
                  {scribe === "recording" && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-rose-700">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-rose-600" />
                      Recording
                    </span>
                  )}
                </div>

                {scribe === "idle" ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-soft">
                      Start the ambient scribe to see the note build itself.
                    </p>
                    <button type="button"
                      onClick={startScribe}
                      className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
                    >
                      Start recording
                    </button>
                  </div>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {demoTranscriptLines.slice(0, visibleLines).map((line, i) => (
                      <li
                        key={i}
                        className={cn(
                          "rounded-lg px-3 py-2 text-xs leading-relaxed",
                          i % 2 === 0
                            ? "bg-surface text-ink"
                            : "bg-accent/5 text-soft"
                        )}
                      >
                        <span className="font-medium">
                          {i % 2 === 0 ? "Provider" : "Patient"}:
                        </span>{" "}
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-xl border border-line bg-canvas p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  Generated note
                </p>
                {scribe === "ready" ? (
                  <div className="mt-3 space-y-3">
                    {(
                      [
                        ["Subjective", demoGeneratedNote.subjective],
                        ["Objective", demoGeneratedNote.objective],
                        ["Assessment", demoGeneratedNote.assessment],
                        ["Plan", demoGeneratedNote.plan],
                      ] as const
                    ).map(([label, body]) => (
                      <div key={label}>
                        <p className="text-xs font-semibold text-ink">
                          {label}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-soft">
                          {body}
                        </p>
                      </div>
                    ))}
                    <p className="rounded-lg border border-line bg-surface p-3 text-[0.7rem] leading-relaxed text-faint">
                      Identifiers are removed before the transcript reaches any
                      model. The provider reviews and signs — nothing is filed
                      automatically.
                    </p>
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-soft">
                    {scribe === "generating"
                      ? "Drafting the note…"
                      : scribe === "recording"
                        ? "Listening…"
                        : "The draft appears here once the visit is recorded."}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === "orders" && (
          <div>
            <PanelHeading>Orders & referrals</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              Labs, imaging, and referrals placed during the visit.
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_18rem]">
              <ul className="divide-y divide-line rounded-xl border border-line">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {order.name}
                      </p>
                      <p className="text-xs text-soft">
                        {order.type} · {order.priority}
                      </p>
                    </div>
                    <Pill tone="accent">Placed</Pill>
                  </li>
                ))}
              </ul>
              <aside className="rounded-xl border border-line bg-canvas p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  Add an order
                </p>
                <div className="mt-3 space-y-2">
                  {demoOrderCatalog.map((order) => {
                    const added = orders.some((o) => o.id === order.id);
                    return (
                      <button type="button"
                        key={order.id}
                        onClick={() => addOrder(order)}
                        disabled={added}
                        className="block w-full rounded-lg border border-line bg-surface p-2.5 text-left text-xs transition-colors hover:border-accent/50 disabled:opacity-45"
                      >
                        <span className="font-medium text-ink">
                          {order.name}
                        </span>
                        <span className="mt-0.5 block text-soft">
                          {order.type}
                          {added ? " · added" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        )}

        {step === "codes" && (
          <div>
            <PanelHeading>Diagnosis & procedure codes</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              Suggested from the note, with the reasoning shown. The provider
              decides what gets billed.
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  Suggested
                </p>
                <ul className="mt-3 space-y-2">
                  {demoSuggestedCodes.map((code) => {
                    const accepted = codes.some((c) => c.code === code.code);
                    return (
                      <li
                        key={code.code}
                        className="rounded-xl border border-line bg-canvas p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-ink">
                              <span className="font-mono">{code.code}</span> ·{" "}
                              {code.description}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-soft">
                              {code.rationale}
                            </p>
                          </div>
                          <button type="button"
                            onClick={() => acceptCode(code)}
                            disabled={accepted}
                            className="shrink-0 rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent-strong transition-colors hover:bg-accent/10 disabled:opacity-45"
                          >
                            {accepted ? "Added" : "Accept"}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  On this visit
                </p>
                {codes.length === 0 ? (
                  <p className="mt-3 rounded-xl border border-dashed border-faint/40 p-6 text-center text-xs text-soft">
                    Accept a suggestion to add it to the visit.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {codes.map((code) => (
                      <li
                        key={code.code}
                        className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface p-3"
                      >
                        <span className="text-sm text-ink">
                          <span className="font-mono">{code.code}</span>{" "}
                          <span className="text-soft">({code.kind})</span>
                        </span>
                        <button type="button"
                          onClick={() => removeCode(code.code)}
                          className="text-xs font-medium text-soft hover:text-rose-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <div>
            <PanelHeading>Checkout</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              Coverage confirmed in real time, then the claim is prepared from
              the signed note.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <StatCard
                label="Coverage"
                value={demoEligibility.status}
                hint={`${demoEligibility.plan} · ${demoEligibility.network}`}
              />
              <StatCard
                label="Patient copay"
                value={`$${demoEligibility.copay}`}
                hint="Due at checkout"
              />
              <StatCard
                label="Deductible"
                value={`$${demoEligibility.deductibleMet} / $${demoEligibility.deductibleTotal}`}
                hint="Met this year"
              />
            </div>

            <div className="mt-5 rounded-xl border border-line bg-canvas p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-faint">
                Claim preparation
              </p>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-soft">Codes on this visit</span>
                  <span className="text-ink">
                    {codes.length > 0
                      ? codes.map((c) => c.code).join(", ")
                      : "None selected"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-soft">Orders placed</span>
                  <span className="text-ink">{orders.length}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-soft">Note</span>
                  <span className="text-ink">
                    {scribe === "ready" ? "Drafted, ready to sign" : "Not drafted"}
                  </span>
                </div>
              </div>

              {claimCreated ? (
                <div className="mt-4 rounded-lg border border-emerald-600/30 bg-emerald-600/5 p-3">
                  <p className="text-xs font-medium text-emerald-700">
                    Claim CLM-4415 created and queued for submission.
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-soft">
                    In production this is transmitted electronically to the
                    clearinghouse; payer responses and remittances post back
                    automatically.
                  </p>
                </div>
              ) : (
                <button type="button"
                  onClick={() => {
                    setClaimCreated(true);
                    onComplete?.();
                  }}
                  disabled={codes.length === 0}
                  className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-45"
                  title={
                    codes.length === 0
                      ? "Add at least one code first"
                      : undefined
                  }
                >
                  Create claim from this visit
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {stepIndex < encounterSteps.length - 1 && (
        <div className="mt-6 flex justify-end border-t border-line pt-5">
          <button type="button"
            onClick={goNext}
            className="rounded-full border border-line bg-surface px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            Next: {encounterSteps[stepIndex + 1].label} →
          </button>
        </div>
      )}
    </div>
  );
}
