# Corewell Systems — Project Context

Everything a new session (or a new person) needs to work on this project
without re-deriving it. Read this first.

> **Repository visibility: PUBLIC** (changed 2026-08-04, to unblock Vercel
> builds). Real product names were purged from the working tree *and* from git
> history before the switch. Keep
> credentials and API keys out of it entirely, and keep client and internal
> product names out of anything that could ever be made public or pasted
> elsewhere. Full product analysis stays outside version control (see §8).

---

## 1. What this is

**Corewell Systems** — a boutique software engineering company that builds
custom operational systems for businesses. This repo is its website.

| | |
|---|---|
| Live site | https://corewellsystems.com |
| Repo | GitHub, **private** |
| Hosting | Vercel, auto-deploys on push to `main` |
| Contact | info@corewellsystems.com |
| Booking | cal.com handle `corewell-systems-scv5vs` |
| Source of truth for product decisions | `docs/spec.md` (v7) |

**Positioning statement — every page traces back to it:**
> We design and build business software that solves real operational problems.

**Audience:** non-technical decision-makers — clinic owners, hospital
administrators, hotel owners, school administrators, shop owners. They are
not evaluating code. **They are evaluating risk.** Every section should
reduce a fear.

---

## 2. Non-negotiable rules

Breaking any of these damages the business. They come from `docs/spec.md`
Sections 1, 7 and 13 and from explicit owner decisions.

1. **No founder identity.** The site speaks entirely in company voice. No
   personal name, no bio, no "meet the team". This is a deliberate
   positioning choice — a one-person team page would announce *solo
   operator*, which the whole site exists to counter.
2. **No named or linked real products.** Internal product names and live
   client URLs never appear publicly. Capability is shown through generic,
   industry-labelled demos.
3. **Never invent** client counts, metrics, percentages, testimonials, or
   outcomes. If a fact is missing, write the sentence without it.
4. **Maturity labelling is mandatory.** Every capability claim carries its
   true tier (see §4). Calling a design "live" is the worst available error.
5. **No firm timelines or fixed prices** in copy or from the AI assistant.
6. **One primary CTA everywhere:** Book a Consultation.
7. **Outcome language over technology language.** Tech never appears in a
   headline; it lives in "Under the hood" sections and on `/technology`.
8. **No geographic claims.** Positioning is universal (regional claims were
   removed by owner direction).

---

## 3. Site structure

```
/                       Home — hero with live system fragment, industry morph,
                        process, demo strip, proof band, insights, CTA
/industries             Hub — 6 cards + enterprise invitation
/industries/[slug]      Per-industry: problem → capabilities → demo → FAQ → CTA
/industries/[slug]/demo Interactive demos (4 live)
/solutions              Hub — numbered index
/solutions/[slug]       Problem → included → evidence ledger → FAQ → CTA
/how-we-work            Process, engineering standards, life after launch
/technology             Stack, grouped by purpose, with reasoning + FAQ
/case-studies           Hub + 3 anonymised studies
/insights               5 articles (MDX pipeline)
/about                  Story, principles, identity FAQs
/book-consultation      Cal.com embed + qualifying form
/pricing                ⚠️ UNPUBLISHED — noindex, removed from nav/sitemap,
                        reachable by direct link. Awaiting owner sign-off
```

**Industries:** healthcare · hospitality · education · retail ·
construction-real-estate · legal-professional-services · enterprise (catch-all)

**Solutions:** custom-software-development · saas-platforms · mobile-apps ·
cloud-deployment · ai-automation

---

## 4. The maturity system — the most important mechanic

`Industry.maturity` in `lib/industries.ts` drives labelling everywhere via
`demoBadge()`, so the home strip, hub cards, industry pages, demo routes and
the demo chrome itself can never drift apart.

| Tier | Industries | Badge | Meaning |
|---|---|---|---|
| `production` | Healthcare, Hospitality | **Interactive Demo** | Systems of ours run in daily use |
| `design` | Education, Retail | **Design Preview** | Our design, prototyped, offered as a custom build — *not deployed* |
| `concept` | Construction, Legal, Enterprise | **Concept — Available as Custom Build** | Not built |

Consequences enforced in code:
- `SoftwareApplication` schema only emits for `production` industries
- Design-preview demos use a muted badge and say "not a deployed installation"
  on the entry screen and on every screen inside
- Legal keeps its concept label but shows genuine adjacent work built for the
  sector

---

## 5. Key components and where things live

```
lib/
  industries.ts     Industry data + maturity + accents + demoBadge()
  capabilities.ts   Deep per-industry capability content (healthcare,
                    hospitality, legal) with optional framing overrides
  solutions.ts      Solution data incl. evidence ledger + appliesTo
  faqs.ts           44 buyer FAQs across industries and solutions
  technology.ts     Stack, two tiers: "shipped" vs "works"
  content.ts        MDX pipeline (insights + case studies)
  site.ts           Canonical URL, contact, socials, Cal.com handles
  testimonials.ts   ⚠️ EMPTY BY DESIGN — see §9
  demo/*.ts         Seeded sample data for the four demos

components/
  home/             Hero (+HeroSystem live fragment), IndustryMorph,
                    ProcessSection, DemoStrip, ProofSection, InsightsPreview
  demo/             primitives + Healthcare/Hospitality/Education/Retail demos
                    + HealthcareEncounter (AI scribe simulation)
  solutions/        ProofLedger (signature element), AppliesTo
  industry/         VerticalTabs, CapabilityGroups
  motion/           Reveal, NodeChain
  consultant/       ConsultantWidget (Gemini-backed)
  FaqSection.tsx    Reusable Q&A + FAQPage schema
  Testimonials.tsx  Renders nothing while the data array is empty
```

**Design system** (`app/globals.css` + `tailwind.config.ts`): warm off-white
canvas `#FAF9F6`, ink `#1B2430`, single teal accent `#0F766E`, Inter Tight
(headings) + Inter (body), 1240px max width. Per-industry accents override
`--color-accent` inside scoped sections.

---

## 6. Integrations and environment

| Service | Status | Env var |
|---|---|---|
| Gemini (AI consultant) | ✅ Live | `GEMINI_API_KEY`, optional `GEMINI_MODEL` |
| Resend (form delivery) | ✅ Live | `RESEND_API_KEY`, `CONSULT_TO_EMAIL`, `CONSULT_FROM_EMAIL` |
| Cal.com | ✅ Live | Handles in `lib/site.ts`, not env |
| Plausible | ⬜ Optional | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |
| Canonical URL | Hardcoded fallback in `lib/site.ts`; `NEXT_PUBLIC_SITE_URL` overrides for local dev |

**Gotcha:** the default Gemini model is `gemini-flash-latest`. Pinned versions
(e.g. `gemini-2.5-flash`) return 404 for newer API accounts. Gemini 3.x also
"thinks" by default and thoughts consume the output budget — the route sets
`thinkingLevel: "low"` with a 2048 cap so replies don't truncate mid-sentence.

---

## 7. Business infrastructure (owner side)

| Item | State |
|---|---|
| Domain | corewellsystems.com, DNS at registrar, apex canonical, www redirects |
| Email | info@ (single mailbox) + support@ / contact@ aliases, fronted by Gmail — forwarder in, send-as out |
| Google Search Console | Verified (domain property); sitemap Success, all pages |
| Google Business Profile | Created |
| Socials | LinkedIn, Instagram, Facebook — wired into footer + `sameAs` schema |
| Git identity | `Corewell Systems <info@corewellsystems.com>`. Commits before 2026-07-27 carry earlier placeholder identities |

**Entity disambiguation:** a large US health system has a near-identical
name and owns the "corewell" entity in Google's knowledge graph and AI
Overviews. Countermeasures shipped: `disambiguatingDescription` in
Organization schema, Wikidata `additionalType` for "software company",
18-topic `knowsAbout`, identity FAQs on `/about`, and an explicit
instruction block at the top of `public/llms.txt`. **This is an entity
problem, not a ranking problem** — the site already ranks first for its own
brand query. The winnable game is buyer-intent search, not the brand name.

---

## 8. The real product codebases

Seven of the owner's real systems were copied to `myprojects/` for analysis.

- **`myprojects/` is gitignored AND excluded from `tsconfig.json`.** Nothing
  from it may ever enter this repo.
- Full per-product analyses and a cross-product capability map live in
  `myprojects/analysis/*.md` — **read those before writing any capability
  copy.** They map which claims are evidenced and which are not.
- A cleanup pass removed 319 sensitive files from those copies (captured real
  emails, patient audio, insurance claim files, a plaintext credentials file).

**Maturity of those systems, described generically** (names withheld — this
file is public):

| What | Reality |
|---|---|
| Clinic/practice platform | Production, in daily use, very large |
| Therapy clinic platform | Production, real clearinghouse integration |
| Booking marketplace | Live, early-production, real payments |
| Medical-equipment system | Working demo slice on the clinical platform |
| Legal-sector platform | ~70% MVP, built, never launched |
| Distribution/retail ERP | Frontend prototype only, no backend |
| School management | Frontend prototype only, no backend |

Security findings were reported to the owner separately and are **not**
recorded here.

---

## 9. Open items

**Blocking better content:**
1. **Case-study facts.** All three studies carry "Illustrative scenario —
   sample data" because outcomes aren't in code. Needs: go-live years,
   whether multi-location is real, and any true non-identifying outcome.
   `content.ts` has an `illustrative` flag; set it false once real.
2. **Testimonials.** `lib/testimonials.ts` is empty by design; the section
   renders nothing. Adding one real permissioned quote publishes it. **Never
   populate with invented quotes** — spec Section 7 forbids it and it is the
   easiest claim on a site to disprove.
3. **Pricing sign-off.** Page complete but unpublished. Drafted tiers:
   Starter $8k–$25k, Growth $25k–$80k, Enterprise scoped individually.

**Nice to have:** Plausible analytics; more Insights articles (healthcare
cluster started).

**Shipped — Corewell Trade demo:** the distribution ERP in `myprojects/` was
rebranded as **Corewell Trade** and now has a point-of-sale till and a consumer
storefront on the same catalogue. It lives in its **own public repo**
(github.com/AmmarKamran2005/corewell-trade) — client identity stripped, seeded
data fabricated, `noindex` everywhere. Front end only: no API, no database, no
auth, so it stays a **Design Preview**, never "live". **Live at https://corewelltrade.vercel.app** and linked from the Retail demo
page. A branded subdomain is still to do — `NEXT_PUBLIC_DEMO_TRADE_URL`
overrides the Vercel URL when one exists. See `docs/demo-deployment.md`.

**In flight — healthcare demo replica:** a whitelabelled fork of the clinical
platform to be deployed at `clinic.corewellsystems.com` as "Corewell Clinic".
Fully separate infrastructure, all branding stripped from code, Stripe test
mode, Gemini live, other integrations stubbed with a "not available in the
demo" message, hardcoded demo accounts, nightly reset. Plan and UI mockup were
produced in discussion; **no implementation started.**

---

## 10. Working conventions

**Build and deploy**
- `npm run dev` for local; **stop the dev server before `npm run build`** —
  running both corrupts `.next` and produces phantom errors.
- Verify with `npx tsc --noEmit` then `npm run build` before committing.
- Push to `main` deploys to production automatically.

**Testing gotchas learned the hard way**
- The in-app browser pane reports `viewport 0x0` when hidden, so element
  measurements are meaningless — call `resize_window` with explicit
  dimensions first.
- Hidden panes suspend `requestAnimationFrame`, freezing Framer Motion; verify
  interactive state via `aria-*` attributes and computed styles instead of
  visual change.
- `setTimeout` is throttled in hidden tabs; use `MessageChannel` ticks to
  await React renders.
- Labels styled `uppercase` return uppercase from `innerText` — case-sensitive
  string assertions give false negatives.

**Content**
- Articles and case studies are MDX in `content/`. Adding a file publishes it.
- Articles follow the GEO/AEO pattern: the H1 is the question, the first
  paragraph answers it completely, detail follows, FAQs carry `FAQPage` schema.

**Documentation in this repo**
| File | Purpose |
|---|---|
| `docs/spec.md` | Product source of truth, with a change log |
| `docs/marketing-brief.md` | Paste into an AI before asking for social posts |
| `docs/brand-kit.html` | Self-contained brand kit (logo, palette, templates) |
| `docs/healthcare-demo-plan.md` | Build plan for the whitelabelled clinical demo |
| `docs/demo-deployment.md` | Deploying the Corewell Trade demo — Vercel + Hostinger DNS |
| `docs/mockups/corewell-clinic-ui.html` | UI mockup for that demo — open in a browser, toggle Login ↔ Dashboard top-right |
| `OWNER-CHECKLIST.md` | Everything still owed by the owner |
| `CONTEXT.md` | This file |
