# Handoff — build the Corewell Trade landing page

Give this file to a fresh session. It contains everything needed to start
without re-deriving the project.

---

## Your task

Build a full product landing page for **Corewell Trade** at
**`corewellsystems.com/trade`**.

The complete plan is in **`docs/trade-landing-page-plan.md`** — read it in full
before writing anything. This file gives you the surrounding context the plan
assumes you already have.

---

## Read these first, in this order

1. **`CONTEXT.md`** — the project's rules and structure. Non-negotiables are in
   §2; read them properly, breaking one damages the business.
2. **`docs/trade-landing-page-plan.md`** — the page itself, section by section.
3. **`docs/spec.md`** — product source of truth. §4 design system, §9 SEO,
   §13 copy voice.
4. **`PROGRESS.md`** — what has been built and when.

---

## What Corewell Trade is

A multi-branch distribution ERP with a point-of-sale till and a consumer
storefront — three sales channels over one catalogue, one stock pool and one
ledger.

| | |
|---|---|
| Live | https://trade.corewellsystems.com |
| Repo | https://github.com/AmmarKamran2005/corewell-trade (public) |
| Local | `myprojects/Sales Softwaer/corewell-trade` (also reachable as `myprojects/ct-app`) |
| Demo login | Printed on the sign-in screen |
| Routes | 120 — `/dashboard` trade desk, `/pos` till, `/store` storefront |

**Backend status:** the front end is complete and runs on typed mock data. The
backend (NestJS + Prisma + PostgreSQL) was expected within one to two weeks of
2026-08-05. **Check whether it has shipped before you publish** — the page is
written as product marketing, with no prototype hedging, and that is only
accurate once the backend is live. Build now, publish then. See the plan §6.

---

## The rules that will bite you

From `CONTEXT.md` §2 — these are not style preferences:

1. **No founder identity.** Company voice only. No personal name anywhere.
2. **Never invent** client counts, metrics, percentages, testimonials or
   outcomes. If a fact is missing, write the sentence without it.
   `lib/testimonials.ts` is empty by design — leave it empty.
3. **No firm timelines or fixed prices** in copy. `/pricing` is unpublished
   pending owner sign-off.
4. **One primary CTA everywhere:** Book a Consultation. Everything else is
   visually subordinate.
5. **Outcome language over technology language.** No tech in a headline; it
   belongs in an "Under the hood" section.
6. **No geographic claims.** Regional positioning was removed by owner
   direction.

And one that is specific to this page:

7. **`SoftwareApplication` schema only when genuinely deployed.** The site
   emits it for `production` maturity only — see `lib/industries.ts`. Use
   `WebPage` + `FAQPage` + `BreadcrumbList` until the backend ships.

---

## Where things are

```
app/
  trade/                    ← you are creating this
  industries/[slug]/        Industry pages; retail links to the demo
  insights/[slug]/          MDX articles — five of them target this page's keywords
components/
  ui/                       Badge, Button, Card, Container
  motion/                   Reveal, NodeChain — reuse, do not reinvent
  home/                     Hero, IndustryMorph — the tab-switcher pattern to copy
lib/
  site.ts                   Canonical URL, contact, tradeDemoUrl
  industries.ts             Industry data + maturity + demoBadge()
  solutions.ts              Solutions data
  content.ts                MDX pipeline
content/insights/           Articles; five of them should link to /trade
docs/                       Plans and specs
```

**Design tokens:** `app/globals.css` + `tailwind.config.ts`. Warm off-white
canvas `#FAF9F6`, ink `#1B2430`, single teal accent `#0F766E`, Inter Tight
headings, 1240px max width.

---

## Working conventions

**Verify before you commit:**

```bash
npx tsc --noEmit && npx eslint src --max-warnings 0 && npm run build
```

**Stop the dev server before running a build.** A production build and a dev
server sharing `.next` leaves a stale route manifest, and pages start
returning 404 for no visible reason. It has cost time twice in this project;
if routes vanish, `rm -rf .next` and rebuild before debugging anything else.

**Dev servers:** `.claude/launch.json` has `corewell-dev` (marketing site,
port 3000) and `corewell-trade` (the demo, port 3100).

**Deploys:** push to `main` deploys the marketing site to production
automatically. Both repos are public.

**Browser testing gotchas** (learned the hard way, see `CONTEXT.md` §10):
- A hidden browser pane reports `viewport 0x0` and stalls hydration on some
  routes. Resize explicitly, and verify server-rendered HTML with `curl` when
  the pane will not cooperate.
- Toggling the `dark` class with JavaScript does not survive — `next-themes`
  restores it. Set `localStorage.theme` and reload instead.
- Elements inside a Suspense boundary sit in a `[hidden]` container while the
  pane is hidden; filter those out when querying.

---

## First moves

1. Read `docs/trade-landing-page-plan.md`.
2. Start the demo (`corewell-trade`, port 3100) and capture the 8–10
   screenshots listed in plan §3. This is the blocking asset — the page is
   mostly product imagery and copy.
3. Draft the full copy and show it before writing any markup. The owner is
   particular about copy and it is cheaper to change in a draft.
4. Then build, in the order given in plan §7.

---

## Ask before deciding

- The nav currently has a `Demo` item pointing at the subdomain. Should it
  point at `/trade` instead once the page exists?
- Publish now or hold until the backend ships?
- Anything that would add a claim about deployment, customers or pricing.
