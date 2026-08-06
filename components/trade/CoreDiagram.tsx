const CHANNELS = [
  { label: "Trade desk", sub: "Orders on account" },
  { label: "POS till", sub: "Cash at the counter" },
  { label: "Online store", sub: "Retail, direct" },
];

const CORE = [
  { label: "One catalogue", sub: "Defined once, priced per channel" },
  { label: "One stock pool", sub: "Counted once, per warehouse" },
  { label: "One ledger", sub: "Posted as it happens" },
];

/**
 * The idea the whole page rests on: three channels feeding one core, rather
 * than three systems reconciled nightly. Drawn rather than photographed
 * because it is the one thing on the page a reader might send to a colleague.
 *
 * Two renderings of the same content — an SVG wide enough to breathe on a
 * desktop, and a stacked list below `md` where that SVG's type would fall
 * under 8px. Both carry the same labels, so neither is decoration.
 */
export function CoreDiagram() {
  return (
    <div>
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 900 400"
        role="img"
        aria-labelledby="core-diagram-title core-diagram-desc"
        className="hidden w-full md:block"
      >
        <title id="core-diagram-title">
          Three sales channels over one catalogue, one stock pool and one ledger
        </title>
        <desc id="core-diagram-desc">
          The trade desk, the point-of-sale till and the online store all feed a
          single core: one catalogue defined once and priced per channel, one
          stock pool counted once per warehouse, and one ledger posted as sales
          happen.
        </desc>

        {/* Channel boxes */}
        {CHANNELS.map((channel, i) => {
          const x = 30 + i * 310;
          return (
            <g key={channel.label}>
              <rect
                x={x}
                y={16}
                width={250}
                height={68}
                rx={14}
                className="fill-surface stroke-line"
                strokeWidth={1}
              />
              <text
                x={x + 24}
                y={44}
                className="fill-ink-strong font-display text-[17px] font-semibold"
              >
                {channel.label}
              </text>
              <text x={x + 24} y={66} className="fill-faint text-[13px]">
                {channel.sub}
              </text>
            </g>
          );
        })}

        {/* Connectors — each channel bends into the top edge of the core */}
        {CHANNELS.map((channel, i) => {
          const from = 30 + i * 310 + 125;
          const to = 450;
          return (
            <path
              key={`link-${channel.label}`}
              d={`M ${from} 84 C ${from} 118, ${to} 116, ${to} 150`}
              fill="none"
              className="stroke-accent/35"
              strokeWidth={1.5}
            />
          );
        })}
        <circle cx={450} cy={150} r={3.5} className="fill-accent" />

        {/* The core */}
        <rect
          x={110}
          y={150}
          width={680}
          height={230}
          rx={18}
          className="fill-canvas-subtle stroke-line"
          strokeWidth={1}
        />
        {CORE.map((row, i) => {
          const y = 150 + 30 + i * 70;
          return (
            <g key={row.label}>
              {i > 0 && (
                <line
                  x1={140}
                  x2={760}
                  y1={y - 22}
                  y2={y - 22}
                  className="stroke-line"
                  strokeWidth={1}
                />
              )}
              <circle cx={152} cy={y + 12} r={4} className="fill-accent" />
              <text
                x={172}
                y={y + 11}
                className="fill-ink-strong font-display text-[18px] font-semibold"
              >
                {row.label}
              </text>
              <text x={172} y={y + 33} className="fill-soft text-[13px]">
                {row.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── Below md: the same content, stacked ─────────────────── */}
      <div className="md:hidden">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li
              key={channel.label}
              className="rounded-xl border border-line bg-surface px-4 py-3"
            >
              <p className="font-display text-sm font-semibold text-ink-strong">
                {channel.label}
              </p>
              <p className="mt-0.5 text-xs text-faint">{channel.sub}</p>
            </li>
          ))}
        </ul>

        <div aria-hidden className="flex justify-center py-3">
          <svg width="14" height="26" viewBox="0 0 14 26" fill="none">
            <path
              d="M7 0v20M1.5 15L7 21l5.5-6"
              className="stroke-accent/50"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <ul className="divide-y divide-line rounded-2xl border border-line bg-canvas-subtle">
          {CORE.map((row) => (
            <li key={row.label} className="flex gap-3 px-4 py-4">
              <span
                aria-hidden
                className="mt-1.5 h-2 w-2 flex-none rounded-full bg-accent"
              />
              <div>
                <p className="font-display text-base font-semibold text-ink-strong">
                  {row.label}
                </p>
                <p className="mt-0.5 text-sm text-soft">{row.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
