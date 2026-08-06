# Progress

What has been built, in the order it happened. `CONTEXT.md` describes the
project as it stands now; this file is the record of how it got there.

---

## Marketing site — corewellsystems.com

Live on Vercel, auto-deploying from `main`. Repo public since 2026-08-04.

| Phase | Delivered |
|---|---|
| 1 · Foundation | Next.js 14 App Router, design tokens, base components, Home layout |
| 2 · Core pages | Industries hub + 7 industry pages, Solutions hub + 5 solutions |
| 3 · Motion | Industry-morph selector, per-industry accents, node-chain reveals, page transitions |
| 4 · Content | MDX pipeline, Insights hub + article template with `FAQPage` schema, Case Studies |
| 5 · Demos | In-site sandboxes for healthcare, hospitality, education, retail |
| 6 · AI consultant | "Ask Our Software Architect", Gemini-backed streaming route |
| 7 · SEO pass | Organization + WebSite + ContactPoint JSON-LD, sitemap, robots, `llms.txt` |
| 8 · Launch | 404/error pages, favicon, OG image, Cal.com booking, Resend form delivery |

**Later work**

- **Entity disambiguation** — a large US health system owns the "corewell"
  entity in Google's knowledge graph. Countermeasures shipped:
  `disambiguatingDescription`, Wikidata `additionalType`, 18-topic `knowsAbout`,
  identity FAQs on `/about`, instruction block at the top of `llms.txt`.
- **Technology page** for technical evaluators.
- **Repo made public** (2026-08-04) to unblock Vercel builds. Real product
  names were purged from the working tree *and* from git history first — they
  were present in `docs/spec.md` and two removed components across 34 commits.

---

## Corewell Trade — the distribution ERP

Rebranded from a client codebase held in gitignored `myprojects/`, then
extended. Its own public repo, deployed separately.

| | |
|---|---|
| Live | https://trade.corewellsystems.com |
| Repo | https://github.com/AmmarKamran2005/corewell-trade |
| Local | `myprojects/Sales Softwaer/corewell-trade` (junction: `myprojects/ct-app`) |
| Routes | 120 |

### What was done

**Rebrand.** Client identity removed throughout — product names, the owner's
name and email domain, real phone number and business address, SKU prefixes,
and two logo files that survived the first pass because the giveaway was in
the filenames rather than the file contents. Brand identity consolidated into
one constant (`src/lib/brand.ts`). Accent moved from yellow to Corewell teal,
navy shell shifted to match the brand mark.

**Contrast.** The teal swap broke several pairings — accent buttons sat at
2.9:1, and so did teal text on the navy shell. Fixed at token level so a
colour resolves to the right tint per theme rather than being hardcoded per
component. Audited every text node on every page in both themes: zero
failures.

**Reports.** Two dead nav links and seven report cards that pointed at the
wrong page. Six new report pages built, including customer statements and
supplier ledgers that open with a brought-forward balance so the closing
figure agrees with the party record.

**Point of sale** (`/pos`). Its own full-screen shell. Barcode search, split
tender across cash/card/wallets with change due, park and recall, counter
returns against a receipt, register open and close with X/Z report and drawer
variance. Keyboard-first.

**Online store** (`/store`). Consumer storefront on the same catalogue:
browse and filter, product pages, basket, checkout with delivery and payment
options, order tracking, customer-initiated returns.

**Fulfilment and 2C.** Online orders flow to a pick → pack → dispatch queue.
Short picks raise backorders rather than cancelling lines, and there is a
queue showing what the business owes. Serialised goods require a serial number
before dispatch. Price lists — retail, wholesale, distributor — over one
catalogue.

**Lint and hooks.** Cleared the pre-existing rule violations across the older
ERP pages: impure `Date.now()` during render, four different
`set-state-in-effect` patterns, and hooks called after an early return in two
detail pages. `npx eslint src --max-warnings 0` passes.

**Logo.** Uses the brand's own artwork rather than a redrawing. Lifted with a
filter on dark shells, where the fixed teal would otherwise sit at 2.9:1.

**Indexing.** The `/login` landing page is indexable with metadata aimed at
ERP/POS demo searches; every screen behind it is `noindex` and disallowed,
because the seeded records are fabricated.

**Backend: not built.** NestJS + Prisma + PostgreSQL, expected within one to
two weeks of 2026-08-05.

---

## SEO

**Technical** — sitemap, robots, Organization/WebSite/ContactPoint JSON-LD,
`FAQPage` on articles, `llms.txt` with entity disambiguation, Search Console
verified.

**Content** — five articles added 2026-08-04 to cover the ERP, POS and
online-store search intent that the site had capability for but no content on:

- Odoo Alternatives: When a Custom ERP Is the Better Call
- What Should Wholesale Distribution Software Actually Do?
- What Is an Online POS System, and Does Your Shop Need One?
- How Do You Sell Online Without Breaking Your Shop's Stock?
- How Much Does a Custom ERP System Cost?

Sitemap: 33 → 38 URLs.

## 2026-08-06 — Corewell Trade landing page

**`/trade` built and published.** Eleven sections per
`docs/trade-landing-page-plan.md`: hero over the real dashboard, the problem,
an inline diagram of three channels feeding one core, a tab switcher for the
trade desk / till / storefront with screenshots of each, the full module
inventory, the demo invitation, a collapsed technical section, the comparison
against a configurable suite, who it fits, ten FAQs, closing band.

- Copy drafted and approved first: `docs/trade-landing-copy.md`
- Schema: `WebPage` + `FAQPage` + `BreadcrumbList`. **No
  `SoftwareApplication`** — the backend is not live, and the maturity rules
  reserve that schema for deployed systems
- Nav: the `Demo` item became `Corewell Trade` → `/trade`; the page's own
  CTA is what opens the app
- Internal linking: five ERP/POS articles link in, the page links back to four,
  and `/industries/retail` + its demo page link across. Sitemap: 38 → 39 URLs
- 14 screenshots captured from the running demo at 1440×900, served through
  `next/image`

**Demo reseeded region-neutral** (separate repo, committed there, not pushed):
branch cities, party and staff names, banks, wallets and SMS gateways are now
placeholders with no geography in them; phone numbers are obviously fictional.
Money is read as integer minor units and divided once at display, so totals stay
exact while prices read as a wholesale catalogue. Lakh/crore compaction removed.

**Published while the backend is still pending, by owner decision.** The page is
written as product marketing; the five articles still describe the demo as a
design preview on fabricated data.

---

## Next

1. **Backend** for Corewell Trade — the one thing `/trade` is waiting on.
   Once it ships, add `SoftwareApplication` schema and revisit the
   design-preview wording in the five articles.
2. **Healthcare demo** — planned in `docs/healthcare-demo-plan.md`, deferred by
   owner. Ownership of the source codebase should be confirmed before forking.
3. **Owner items** — pricing sign-off, real case-study facts, the About page
   placeholder. Tracked in `OWNER-CHECKLIST.md`.
