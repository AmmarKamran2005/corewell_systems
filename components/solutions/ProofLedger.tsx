import { Reveal } from "@/components/motion/Reveal";

/**
 * Evidence ledger — the signature element of a solution page.
 *
 * Deliberately not a feature-card grid. It reads as an exhibit list: a
 * numbered index, a hairline rule per entry, a claim, and the substance
 * behind it. The buyer this site is written for is assessing risk, and a
 * ledger reads as accounting rather than advertising.
 *
 * Composition: a narrow tabular numeral column against a wide prose column,
 * so the eye scans the index and settles into the text — asymmetric by
 * intent, and it collapses to a single column on small screens.
 */
export function ProofLedger({
  entries,
}: {
  entries: { title: string; detail: string }[];
}) {
  return (
    <ol className="mt-10">
      {entries.map((entry, index) => (
        <Reveal key={entry.title} delay={index * 0.05}>
          <li className="group relative border-t border-line">
            {/* Accent rule that draws itself in on hover */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full"
            />
            <div className="grid gap-x-6 gap-y-2 py-7 sm:grid-cols-[4rem_1fr] sm:py-8">
              <span
                aria-hidden
                className="font-display text-sm font-semibold tabular-nums tracking-display text-faint/70 transition-colors duration-300 group-hover:text-accent sm:pt-1 sm:text-base"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-display text-lg font-semibold tracking-display text-ink-strong sm:text-xl">
                  {entry.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-soft sm:text-base">
                  {entry.detail}
                </p>
              </div>
            </div>
          </li>
        </Reveal>
      ))}
      <li aria-hidden className="border-t border-line" />
    </ol>
  );
}
