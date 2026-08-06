import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/FaqSection";
import { BrowserFrame } from "@/components/trade/BrowserFrame";
import { ChannelShowcase } from "@/components/trade/ChannelShowcase";
import { CoreDiagram } from "@/components/trade/CoreDiagram";
import { audiences, featureGroups, tradeFaqs } from "@/lib/trade";
import { siteUrl, tradeDemoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Distribution ERP with a Built-in POS and Online Store",
  description:
    "Corewell Trade runs your trade desk, your counter and your website over one catalogue, one stock pool and one ledger. Open every screen of the system — no signup.",
  alternates: { canonical: "/trade" },
};

/** Articles that support this page — the linking runs both ways (plan §4). */
const relatedReading = [
  {
    href: "/insights/odoo-alternatives-when-custom-erp-makes-sense",
    title: "Odoo alternatives — when a custom ERP makes sense",
    blurb:
      "Where a configurable suite stops paying for itself, and what replaces it.",
  },
  {
    href: "/insights/wholesale-distribution-software-what-it-should-do",
    title: "Wholesale distribution software — what it should do",
    blurb:
      "The operational checklist, from credit control to backorders to landed cost.",
  },
  {
    href: "/insights/what-is-an-online-pos-system",
    title: "What is an online POS system?",
    blurb:
      "What connects a till to the rest of a business, and what a disconnected one costs.",
  },
  {
    href: "/insights/sell-online-without-breaking-your-shop-stock",
    title: "Selling online without breaking your shop stock",
    blurb: "Why a storefront on a separate stock number oversells, and the fix.",
  },
];

export default function TradePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Corewell Trade — Distribution ERP with a Built-in POS and Online Store",
      url: `${siteUrl}/trade`,
      description:
        "A distribution ERP with a point-of-sale till and a consumer storefront over one catalogue, one stock pool and one ledger.",
      isPartOf: { "@type": "WebSite", name: "Corewell Systems", url: siteUrl },
      about: [
        "Distribution ERP",
        "Point of sale",
        "Inventory management",
        "Wholesale distribution software",
      ],
      // No SoftwareApplication schema: the site emits that only where a
      // production system stands behind the offering (CONTEXT.md §4).
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Corewell Systems",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Corewell Trade",
          item: `${siteUrl}/trade`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ───────── 1. Hero ───────── */}
      <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
        <Container>
          <Reveal mode="mount" className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Trade desk · Counter · Online
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Distribution ERP with a built-in POS and online store
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">
              One catalogue, one stock pool, one ledger — across your trade
              desk, your counter and your website.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-soft">
              Corewell Trade runs wholesale orders, a point-of-sale till and a
              consumer storefront as three faces of the same system. Sell a unit
              anywhere and every other channel knows about it in the same
              moment.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/book-consultation" size="lg">
                Book a Consultation
              </Button>
              <Button
                href={tradeDemoUrl}
                variant="secondary"
                size="lg"
                target="_blank"
                rel="noopener"
              >
                Open the system
                <ExternalArrow />
              </Button>
            </div>
            <p className="mt-5 text-sm text-faint">
              Every screen is open, on sample data. The demo account is printed
              on the sign-in page.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 sm:mt-14">
            <BrowserFrame
              src="/trade/dashboard.png"
              alt="Corewell Trade dashboard showing today's sales, collections, receivables and payables, branch performance and a sales trend"
              path="corewell trade / dashboard"
              priority
              sizes="(min-width: 1280px) 1180px, 100vw"
            />
          </Reveal>
        </Container>
      </section>

      {/* ───────── 2. The problem ───────── */}
      <section className="border-y border-line bg-canvas-subtle py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                The problem
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Three systems, three stock numbers
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="max-w-2xl">
              <p className="text-lg leading-relaxed text-ink">
                Most distribution businesses did not choose their software. They
                accumulated it.
              </p>
              <p className="mt-4 text-base leading-relaxed text-soft">
                A till at the counter, because the counter needed a till. An
                older package on the trade desk, because that is what the trade
                desk has always used. A website built later by somebody else,
                because customers started asking.
              </p>
              <p className="mt-4 text-base leading-relaxed text-soft">
                Each one keeps its own stock number. Each number is right for
                about an hour a day — the hour after somebody exports a
                spreadsheet and imports it somewhere else. In between, the
                website sells a case that left the building yesterday morning,
                the trade desk promises a pallet the counter has already broken
                into, and nobody finds out until picking.
              </p>
              <p className="mt-4 text-base leading-relaxed text-soft">
                The cost is not the software. It is the phone call afterwards,
                the credit note, the customer who now checks stock by ringing
                rather than by ordering — and a month-end where three sets of
                figures have to be argued into agreement before anyone can close
                the books.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────── 3. The core idea ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              The idea
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              One catalogue. One stock pool. One ledger.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-soft">
              Corewell Trade does not synchronise three systems. There is only
              one, and the three channels are ways into it. A product is defined
              once and priced per channel. Stock is counted once, per warehouse,
              and every channel draws from that count. Every sale — trade,
              counter or online — posts to the same double-entry ledger as it
              happens.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <CoreDiagram />
            <p className="mt-6 text-center text-sm text-faint">
              Three ways to sell. One set of numbers.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ───────── 4. The three channels ───────── */}
      <section className="border-y border-line bg-canvas-subtle py-16 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              The channels
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Three channels, one system
            </h2>
            <p className="mt-5 text-base leading-relaxed text-soft">
              Each channel is built for the people who work in it. What they
              share is everything underneath.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <ChannelShowcase />
          </Reveal>
        </Container>
      </section>

      {/* ───────── 5. Full feature grid ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Everything in it
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              What is in the system
            </h2>
            <p className="mt-5 text-base leading-relaxed text-soft">
              The whole of it, not a selection. If the module your business
              cannot do without is missing from this list, it is missing from
              the software.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featureGroups.map((group, index) => (
              <Reveal key={group.name} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <h3 className="font-display text-lg font-semibold text-ink-strong">
                    {group.name}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-relaxed text-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.45rem] h-1 w-1 flex-none rounded-full bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <BrowserFrame
                  src="/trade/trial-balance.png"
                  alt="Trial balance report listing accounts with debit and credit columns that agree"
                  path="accounting / trial balance"
                  sizes="(min-width: 640px) 60vw, 100vw"
                />
              </div>
              <div>
                <BrowserFrame
                  src="/trade/stock-levels.png"
                  alt="Stock levels screen showing quantities per product across warehouses"
                  path="inventory / stock levels"
                  sizes="(min-width: 640px) 30vw, 100vw"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────── 6. Try it ───────── */}
      <section className="border-y border-line bg-canvas-subtle py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                Try it
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Open it and look around
              </h2>
              <p className="mt-5 text-base leading-relaxed text-soft">
                There is no form in front of the demo. Sign in with the account
                printed on the sign-in page and every screen is open — enter an
                order, take a payment at the till, buy something from the
                storefront, run the trial balance.
              </p>
              <p className="mt-4 text-base leading-relaxed text-soft">
                The data is fabricated and nothing you type is kept.
              </p>
              <div className="mt-8">
                <Button
                  href={tradeDemoUrl}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noopener"
                >
                  Open the system
                  <ExternalArrow />
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <BrowserFrame
                src="/trade/login.png"
                alt="Corewell Trade sign-in screen with the demo account filled in and a notice that the data is sample data"
                path="trade.corewellsystems.com"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────── 7. Under the hood ───────── */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <details className="group rounded-2xl border border-line bg-surface px-6 py-5 sm:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span>
                  <h2 className="font-display text-lg font-semibold text-ink-strong">
                    Under the hood
                  </h2>
                  <span className="mt-1 block text-sm text-faint">
                    For anyone evaluating the engineering rather than the
                    workflow.
                  </span>
                </span>
                <span
                  aria-hidden
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line text-soft transition-transform duration-200 group-open:rotate-180"
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path
                      d="M1 1.5L6 6.5l5-5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="mt-5 border-t border-line pt-5">
                <p className="text-base leading-relaxed text-soft">
                  The application is TypeScript throughout — a Next.js front end
                  over a NestJS API, with PostgreSQL underneath and Prisma
                  between them. Every screen is typed against the same contract
                  the API publishes, so a field cannot quietly mean two
                  different things in two places.
                </p>
                <p className="mt-4 text-base leading-relaxed text-soft">
                  Access is by role, and the permission matrix is granular
                  enough to keep a counter user out of the ledger and a branch
                  user out of another branch&apos;s figures. Actions that change
                  money or stock are written to an audit log with the user, the
                  time, and the before and after. Backup and restore are in the
                  admin area rather than in somebody&apos;s cron job.
                </p>
                <p className="mt-4 text-base leading-relaxed text-soft">
                  It is built to run on your own infrastructure or on ours.{" "}
                  <Link
                    href="/technology"
                    className="text-accent underline underline-offset-4 hover:text-accent-strong"
                  >
                    More about how we build
                  </Link>
                  .
                </p>
              </div>
            </details>
          </Reveal>
        </Container>
      </section>

      {/* ───────── 8. Against an off-the-shelf suite ───────── */}
      <section className="border-y border-line bg-canvas-subtle py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                The comparison
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Against an off-the-shelf suite
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="max-w-2xl">
              <p className="text-base leading-relaxed text-soft">
                A general ERP suite is built to be configured into any business,
                which is why implementing one is a project of its own. The
                modules are broad, the parts you need are spread across several
                of them, and the parts you do not need are still in front of
                your staff every day. What you adapt is your operation, and you
                keep adapting it for as long as you own the software.
              </p>
              <p className="mt-4 text-base leading-relaxed text-soft">
                Corewell Trade starts from the opposite end. It is a
                distribution system with the counter and the storefront already
                in it, so the three channels are not an integration project.
                Where it does not match how you work, it is changed — the source
                is ours to change, and the system belongs to the business
                running it.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {relatedReading.map((article) => (
                  <li key={article.href}>
                    <Link
                      href={article.href}
                      className="block h-full rounded-xl border border-line bg-surface p-4 transition-shadow duration-150 hover:shadow-[0_2px_16px_rgb(27_36_48/0.06)]"
                    >
                      <span className="font-display text-sm font-semibold text-ink-strong">
                        {article.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-soft">
                        {article.blurb}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────── 9. Who it is for ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              The fit
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Who it is for
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {audiences.map((audience, index) => (
              <Reveal key={audience.name} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <h3 className="font-display text-lg font-semibold text-ink-strong">
                    {audience.name}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-soft">
                    {audience.line}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── 10. FAQ ───────── */}
      <div className="border-t border-line bg-canvas-subtle">
        <FaqSection
          faqs={tradeFaqs}
          title="Questions buyers ask about Corewell Trade"
          intro="The objections that come up in the first conversation, answered before it."
        />
      </div>

      {/* ───────── 11. Closing CTA ───────── */}
      <section className="bg-ink-strong py-16 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              One system for the whole operation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Tell us how your business sells today, and we will tell you
              honestly whether this fits.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/book-consultation" size="lg">
                Book a Consultation
              </Button>
              <a
                href={tradeDemoUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-1.5 text-base text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                Open the system
                <ExternalArrow />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

/** Marks a link that leaves the site, matching the nav's treatment. */
function ExternalArrow() {
  return (
    <svg
      aria-hidden
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-70"
    >
      <path d="M4 8l4-4M4.5 3.5H8.5V7.5" />
    </svg>
  );
}
