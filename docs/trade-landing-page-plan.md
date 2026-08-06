# Corewell Trade — landing page plan

A full product landing page on the main domain, marketing Corewell Trade as
the system it is: a distribution ERP with a point-of-sale till and a consumer
storefront.

**Status: planned, not started.** Build order and open decisions are at the end.

---

## 1. The decisions already made

| Decision | Choice | Why |
|---|---|---|
| Domain | **corewellsystems.com**, not the subdomain | A new subdomain carries no authority. The main domain has 38 indexed URLs, Search Console history, and five supporting articles that can link to this page |
| URL | **`/trade`** | Short, sayable out loud, mirrors `trade.corewellsystems.com`. Keywords live in the H1, which is where they matter |
| Framing | A product page | Full feature marketing. Not a demo apology |
| Demo app | Stays at `trade.corewellsystems.com` | The landing page sells; the subdomain is where "Open the system" goes |
| Depth | Long-form, 11 sections | This page is the SEO asset for the whole ERP/POS keyword cluster |

### The one sequencing note

The page is written for a shipping product — no hedging, no "prototype"
language. The backend is expected within one to two weeks of this plan being
written (2026-08-05).

**Build the page now; publish it when the backend is live.** Building takes
about as long as the backend does, so nothing is lost by sequencing it that
way — and it means no line on the page needs revisiting later. There is one
switch that controls this, described in §6.

---

## 2. Page structure

### 1 — Hero

- **H1:** *Distribution ERP with a built-in POS and online store*
  (carries the three primary keyword heads in one natural sentence)
- **Subline:** One catalogue, one stock pool, one ledger — across your trade
  desk, your counter and your website.
- **CTAs:** `Open the system` (→ trade subdomain, new tab) · `Book a
  consultation` (primary, per site rule: one primary CTA everywhere)
- **Visual:** the real dashboard in a browser frame, not an illustration
- **Eyebrow:** three-word channel chain — Trade desk · Counter · Online

### 2 — The problem

The story every distributor recognises: a POS at the counter, older software
on the trade desk, a website someone built separately. Three stock numbers,
all correct for about an hour a day. One unit sold twice, discovered at
picking.

This is the emotional hook and it is naturally dense with the terms people
search.

### 3 — The core idea (diagram)

A single custom SVG: **three channels → one catalogue → one stock pool → one
ledger.** Built inline so it themes with the page. This is the image people
screenshot and send to a colleague.

### 4 — The three channels

Three deep blocks, each with a real screenshot and an interactive tab switcher
(reuse the motion pattern from the home page industry morph).

| Channel | What to show |
|---|---|
| **Trade desk** | Credit hold at order entry, the credit-hold queue, unified party model, backorders |
| **POS till** | Barcode search, split tender with change due, park and recall, counter returns, X/Z report and drawer variance |
| **Online store** | Retail price list, channel stock reserve, checkout, order tracking, customer returns |

Write each as *"a distribution business needs X — here is how it works"*, not
*"our software has X"*. Same information, better content, and it reads as
expertise rather than a spec sheet.

### 5 — Full feature grid

Icon cards covering every module. This section is where the long-tail search
terms live, so it should be complete rather than curated:

Inventory · products, categories, brands, units, stock levels, movements,
adjustments, transfers, warehouses, price lists
Purchasing · purchase orders, goods receipts, purchase invoices, returns,
supplier ledger
Sales · orders, invoices, returns, credit holds, online orders, backorders
Accounting · chart of accounts, journal entries, vouchers, expenses, general
ledger, trial balance, P&L, balance sheet, cash flow, bank reconciliation,
period close, Zakat
Reports · 19-report library, AR/AP aging, customer statements, supplier
ledgers, dead stock, slow moving, sales trends
Admin · users, role and permission matrix, branches, audit log, backup and
restore, multi-branch

### 6 — Try it

Demo credentials printed on the page beside a screenshot. Zero friction — no
form in front of the demo.

### 7 — Under the hood

Collapsible, for technical evaluators. Next.js, TypeScript, PostgreSQL,
NestJS. Kept out of every headline (site rule: outcome language above the
fold, technology below it).

### 8 — Why it is different from an off-the-shelf suite

A comparison block against ERP suites, linking to the Odoo article. Two-way
internal linking between this page and the five articles is what makes the
cluster rank.

### 9 — Who it is for

Wholesale distributors, importers, multi-branch retailers, businesses selling
both trade and direct. Each with one line. Helps a visitor self-identify and
adds industry search terms.

### 10 — FAQ

8–10 questions with `FAQPage` schema, reusing the pattern already in
`content/insights/*.mdx`.

### 11 — Closing CTA band

`Book a consultation` primary, `Open the system` secondary.

---

## 3. What has to be produced

| Asset | Notes |
|---|---|
| **8–10 screenshots** | Dashboard, sales orders, credit holds, POS till, tender dialog, storefront, product page, fulfilment, trial balance. Light theme. Capture at 1440×900 from the running demo, crop chrome |
| **Core diagram** | Inline SVG, three channels → one core. Themed with CSS variables, not hardcoded hex |
| **Copy** | Roughly 1,500–2,000 words. House voice: outcome first, no hype, no invented numbers |
| **FAQ set** | 8–10 questions, written for the schema as well as the page |

---

## 4. SEO

**Primary target:** `distribution erp`, `erp with pos`, `wholesale
distribution software`, `pos and inventory system`

**Secondary:** `multi branch pos`, `b2b order management`, `inventory
management software`, `erp with online store`, `distribution management
system`

**Schema:** `WebPage` + `FAQPage` + `BreadcrumbList`.

> **`SoftwareApplication` schema:** the site only emits this for `production`
> maturity (see `CONTEXT.md` §4, enforced in `lib/industries.ts`). Add it once
> the backend ships and Corewell Trade is genuinely deployed — not before.

**Internal linking — do all of these, they matter as much as the page:**

- All five ERP/POS articles link to `/trade` in their closing section
- `/trade` links back to at least three of them
- `/solutions` and `/industries/retail` link to it
- Add to `sitemap.ts` and the nav (the nav already has a `Demo` item — decide
  whether that points here or stays on the subdomain; see §6)

---

## 5. Design

Follow the existing system — no new visual language.

- Warm off-white canvas `#FAF9F6`, ink `#1B2430`, single teal accent `#0F766E`
- Inter Tight headings, Inter body, 1240px max width
- Spec §4 bans: all-black heroes, gradient blobs, particle canvases, neon glow
- Motion reveals meaning, not decoration — reuse `components/motion/Reveal`
  and `NodeChain`
- Screenshots in restrained browser frames; the product is the visual
- One primary CTA per screenful: Book a Consultation

Accessibility, as on every other page: 4.5:1 text contrast in both themes,
44px touch targets, visible focus rings, no horizontal scroll at 375px.

---

## 6. Open decisions

1. **Nav item.** The nav currently has `Demo` → `trade.corewellsystems.com`.
   Once `/trade` exists, that item should probably point at the landing page
   instead, with the page's own CTA going to the app. Decide before launch.
2. **Publish switch.** Build behind a flag or on a branch, and publish when the
   backend is live. One line in `lib/site.ts` plus the sitemap entry.
3. **Pricing.** The page has no pricing section in this plan, because
   `/pricing` is still unpublished pending sign-off. If pricing lands first,
   add a section; if not, the consultation CTA carries it.
4. **Testimonials.** `lib/testimonials.ts` is empty by design. Leave it empty.
   Do not add a social-proof section with invented quotes.

---

## 7. Suggested build order

1. Capture screenshots from the live demo
2. Draft the copy in full, section by section, for review before any markup
3. Build the page shell and hero
4. Sections 2–5 (problem, diagram, channels, features)
5. Sections 6–11
6. Schema, sitemap, internal links from the five articles
7. Verify: contrast both themes, 375px, no horizontal scroll, Lighthouse
8. Publish when the backend is live
