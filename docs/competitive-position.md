# Competitive Position & Deep Audit — August 2026

Audit date: 2026-08-20. Method: full read of the codebase, a clean production
build, and direct HTTP inspection of the live site — plus market research
against the competitor set. Claims below are verified against what is actually
served in production, not against project documentation.

**Two production defects were found that plausibly explain the site's total
absence from search. They are in §2.1 and should be read first.**

---

# Part I — The competitive landscape

A clinic owner, hotel owner or distributor with a budget does not shortlist
"custom software agencies". They choose between six things, and only one of
them is another agency.

## Ring 1 — Doing nothing (paper, spreadsheets, phone calls)

Still the market leader in every vertical the site targets, and the site
already attacks it well: the ROI article's "invisible tax" framing, the three
case studies, the "where the leaks actually are" section. No change needed.

## Ring 2 — Vertical SaaS: the "buy" option, and the real budget competitor

This is where the money would otherwise go, and it is cheap.

| Vertical | Incumbent | 2026 price |
|---|---|---|
| Clinics | Jane App | CAD $54–99 / practitioner / mo; AI Scribe +$15 |
| Clinics | SimplePractice | $49 / $79 / $99 per practitioner / mo; AI notes +$35 |
| Hotels | Cloudbeds | ~$15 / room / mo + property minimum |
| Hotels | Mews | ~$17 / room / mo entry tier |
| Hotels | Little Hotelier | from $39/mo + 1% booking fee; Pro ~$109/mo |
| Distribution | Odoo, ERPNext, SAP Business One, NetSuite, Brightpearl, Fulfil | subscription, per-user |

**The arithmetic that decides these deals.** A five-practitioner clinic pays
$12,000+/year in subscriptions, so a $15–22k custom build pays back in two to
three years. PMS onboarding runs another $500–2,000. That maths is the single
strongest argument Corewell has, and the insights articles already make it.

**Market structure favours the pitch.** Independent properties held 51.45% of
the hospitality PMS market in 2025, in a market heading to $2.44B by 2031 —
the target buyer is the majority of that market, not a niche.

**The counter-argument that is not yet answered.** The incumbents' best line is
that a modern vertical platform gives an SME *"90% of custom fit without the
custom price."* Nothing on the site addresses that sentence. It is the most
important missing piece of copy on the site, and it needs the honest answer:
the 10% is where the operation actually differs, and the question is whether
that 10% is a spreadsheet workaround or a real cost.

**A second unaddressed force:** vendor lock-in and creeping per-seat cost is
now the *industry's own* stated reason practices move to custom EHR — high
integration fees, per-provider licensing that grows with headcount, and
switching difficulty. Corewell's "no lock-in, you own it" principle is exactly
on target and under-sold.

## Ring 3 — Custom software agencies (the direct competitor)

Two tiers, and Corewell sits between them.

**Vertical specialists with far deeper proof.** In healthcare alone: CapMinds
(HIPAA/ONC/GDPR, FHIR, RCM), TATEEDA (Epic / Cerner / Oracle Health /
athenahealth integration), OSP Labs, DreamzTech (200+ projects, 15 years),
Thinkitive ("125+ clinics, 1,465+ providers, 10-week go-live"), Ani Solutions
("150+ EHRs built", 50+ healthcare developers, 16 specialties), DocVilla,
Clarity Ventures.

Note what those firms lead with: **counts and named integrations.** Corewell
leads with neither, by policy. Its advantage is different in kind — it *runs*
production clinical systems (AI documentation, electronic claims with payer
responses posting back) rather than listing delivered projects. That is a
stronger claim than any of theirs, and it is currently buried in a four-line
proof band on the homepage.

**Generalist offshore shops competing on price.** 2026 agency rates for a
Western client: $15–30/hr South Asia, $28–60/hr senior Pakistan-based,
$30–60/hr Eastern Europe, $100+/hr onshore US. AI/ML carries a 25–50% premium,
security engineering 20–40%.

**Market size.** Custom software development is $48.7B in 2026 heading to
$300.3B by 2035 (22.4% CAGR); other estimates put 2026 at $65.85B → $141B by
2030 (21% CAGR). US healthcare IT software alone: $216.5B in 2026 → $634B by
2033 (16.6% CAGR). The average custom project runs $132,480 over ~13 months.

Corewell's drafted tiers ($8–25k / $25–80k / scoped) sit deliberately below
that average. Correct for the stated audience — but it means the site has to
work harder to read as a firm rather than a freelancer, which is precisely why
the no-founder-identity rule exists.

**Win-rate context.** Small agencies (2–10 people) convert proposals at
20–35%. RFP-sourced work converts at ~28%; inbound and relationship-sourced
work converts at **40–50%**. Everything in Part III that improves inbound is
worth roughly double the same effort spent on outbound.

## Ring 4 — AI app builders: the fastest-moving force, and mostly a tailwind

The numbers are no longer speculative:

- **Lovable**: ~$500M ARR by June 2026, up from $200M in Nov 2025; $13.2B
  valuation; hit $100M ARR in 8 months.
- **Replit**: ~$525M ARR April 2026, $9B valuation.
- **Bolt.new**: $40M ARR in 5 months, profitable.
- A working internal tool — backend, DB, auth, frontend, deploy — now costs
  roughly **$30–40 in inference**.
- Retool's 2026 report: **35% of teams have already replaced a purchased tool
  with something custom-built; 78% expect to build more in 2026.**

**Why this is mostly a tailwind.** The entire build-vs-buy pendulum is swinging
toward *build*, which is what Corewell sells. The market's own settled
boundary — AI builders for prototypes, internal tools and non-regulated MVPs;
a real firm once people depend on the system operationally or a regulator is
involved — is Corewell's positioning almost word for word.

**Why it is also a real threat, and where the counter-attack is.** At the
bottom of the range an $8k engagement now competes with a weekend and a
subscription. But the failure evidence is strong and public:

- Replit's agent **deleted a live production database during a code freeze**
  and misreported the result (July 2025).
- Security testing of apps from **Lovable's own showcase** found exposed
  Supabase endpoints, missing row-level security, and client-side auth
  bypasses that let testers upgrade themselves to paid status. One researcher
  logged **16 vulnerabilities in 30 days**, and noted the same weaknesses in
  Bolt and Replit — "the problem isn't any single platform, it's generating
  code without security context."
- As of early 2026 Replit has SOC 2 Type II; **Bolt and Lovable do not.**

That is the single best piece of unclaimed content territory available to
Corewell: *what vibe-coded software gets wrong once real people depend on it*,
and *we rebuild the app you prototyped*. It is credible only from someone who
runs production systems — which is exactly the claim Corewell can make and its
Ring 3 competitors mostly cannot.

## Ring 5 — AI automation agencies (an adjacent market being left on the table)

2026 pricing: $5k–50k per project, $2k–15k/mo retainers, $100–300/hr. For SMB
scope specifically: $500–2,000/mo retainers, or $1,000–3,500/mo to automate two
or three workflows. **The hybrid model — fixed-fee build for the first
workflow, then a monthly retainer — is now the default.**

Meanwhile the professional-services literature is unanimous that the
labour-based model is collapsing and that **outcome-based agreements are a
survival question**, with the surviving differentiators being strategic
judgement, sector expertise, original research and proprietary data.

Corewell has `/solutions/ai-automation`, production AI capability, and sells
**only one-off builds**. There is no recurring revenue anywhere on the site,
no retainer, no support plan with a price. This is the largest business-model
gap in the business.

## Ring 6 — The name

Corewell Health (Michigan, ~$14B health system) owns the "corewell" entity.
Verified today: a search for `"Corewell Systems"` returns Corewell Health, Core
Systems, Coreware and Corewill Soft — **no Corewell Systems result**. A search
for `corewellsystems.com` returns the same. The countermeasures shipped so far
are mostly the right ones, but see §2.6 — one of the four load-bearing ones has
been shown by three independent studies to do nothing.

---

# Part II — Current state, audited

## 2.1 Two critical production defects

### DEFECT 1 — Every page canonicalises to the homepage *(severity: critical)*

Verified live, three separate pages:

```
GET /insights/how-much-does-a-custom-erp-system-cost
  → rel="canonical" href="https://corewellsystems.com"
GET /industries/healthcare
  → rel="canonical" href="https://corewellsystems.com"
GET /
  → rel="canonical" href="https://corewellsystems.com"
```

**Cause.** `app/layout.tsx:46` sets `alternates: { canonical: "/" }`. In the
Next.js App Router, `metadata.alternates` is **inherited** by every child
segment that does not declare its own. Only two pages in the entire app do:
`app/about/page.tsx:40` and `app/trade/page.tsx:17`. The remaining ~41 URLs —
every article, every industry page, every solution, every case study, every
demo — tell Google they are duplicates of the homepage.

**Consequence.** A self-canonical pointing elsewhere is the strongest
de-indexing instruction a page can send. This is a complete and sufficient
explanation for:
- none of the ten buyer-intent articles ranking;
- the site being absent from its own brand query;
- 43 sitemap URLs producing no visibility.

Every other SEO or content action is worth close to nothing until this is
fixed. **This is the highest-value fix available and it is roughly a one-line
change per page template.**

**Fix.** Remove `alternates` from the root layout and set a self-referencing
canonical in each page's `metadata` / `generateMetadata` (a small helper that
takes the path is the tidy version).

### DEFECT 2 — A raw `[PLACEHOLDER: …]` block is live on all six industry pages

Verified live on `/industries/healthcare`, `/hospitality`, `/retail`,
`/education`, `/legal-professional-services`, `/construction-real-estate`.
Source: `app/industries/[slug]/page.tsx:329`.

Under a heading that reads **"Proof, not promises"**, the body text is:

> `[PLACEHOLDER: anonymized case study block for healthcare — real,`
> `non-identifying facts only, described by region and type, never by name.`
> `Arrives with the Phase 4 case-study pipeline; …spec Sections 5 + 7.]`

The industry pages are the highest-intent commercial pages on the site. A
prospect who reaches `/industries/healthcare` sees a section promising proof
and delivering an internal engineering note. It has been live for weeks. For a
site whose entire positioning is *"nothing we claim is decorative"*, this is
the most damaging single thing on it after Defect 1 — and it is worse than
having no section at all.

**Fix.** Either render the matching case study (all three exist and map to
healthcare / hospitality / retail), or drop the section for industries with no
study — the `Testimonials` component already models this pattern correctly by
rendering nothing when empty.

## 2.2 The rest of the technical SEO picture

| Finding | Severity | Detail |
|---|---|---|
| Apex/www split | High | `https://corewellsystems.com` **308-redirects to `www.`**, but `lib/site.ts` `siteUrl`, every canonical, the sitemap, `robots.txt`'s sitemap line, and the Organization/WebSite JSON-LD `@id` all use the **apex**. Every sitemap URL is a redirect; the declared identity and the served identity disagree. |
| No `Article`/`BlogPosting` schema | High | Articles emit `FAQPage` only. No `author`, `datePublished`, `dateModified`, `publisher`, `headline`. Confirmed by inspecting built HTML: articles carry `FAQPage` + global `Organization`/`WebSite` and nothing else. Loses article rich results and E-E-A-T signals. |
| Case studies have no schema at all | Medium | Built HTML for `/case-studies/connected-clinic-network` contains only the global `Organization`/`WebSite`/`ContactPoint`. |
| No `lastmod` in sitemap | Medium | `app/sitemap.ts` emits `changeFrequency` + `priority` only — both of which Google has said it largely ignores — and omits the one field it does use. Content frontmatter has `date` but no `dateModified`. |
| No `BreadcrumbList` except `/trade` | Medium | `/trade` is the only page with breadcrumb schema. Everything else loses the breadcrumb SERP treatment. |
| Title-tag bug | Medium | `/industries/retail` renders **"Retail & Shop Management Management Software"**. Cause: `app/industries/[slug]/page.tsx:36` appends `" Management Software"` to `industry.name`, which is already `"Retail & Shop Management"` (`lib/industries.ts:149`). |
| Title lengths | Low | The `%s — Corewell Systems` template pushes article titles well past 60 characters (e.g. *"Custom Software vs. Off-the-Shelf: How to Decide for Your Business — Corewell Systems"* = 84 chars). All will truncate in SERPs. |
| One shared OG image | Low | A single `/opengraph-image` for the whole site; no per-article social cards. |
| No security response headers | Medium | Live headers carry only `Strict-Transport-Security` (Vercel's default). No CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. `next.config.mjs` is bare. For a firm selling *"compliance-grade security and audit trails"*, this is a check a technical evaluator can run in ten seconds. |

## 2.3 What is genuinely healthy

Worth stating plainly, because the defect list above is not the whole picture.

- **Build quality is high.** `npx tsc --noEmit` clean, `next lint` clean, `next
  build` exits 0 across 48 generated pages. First Load JS 137–154 kB — good.
  Live TTFB 0.20s, 12.5 kB compressed HTML.
- **The demo-first bet is empirically correct.** Visitors who engage an
  interactive demo convert at **24.35% vs 3.05%**; companies with them close
  **23% faster**; ~**80% of the buying journey is asynchronous** before any
  contact. Four no-signup demos plus a full external ERP is more working proof
  than almost any agency this size puts online.
- **The maturity system is a real asset.** `production` / `design` / `concept`
  enforced in code, with `SoftwareApplication` schema gated on tier — verified:
  it emits on `/industries/healthcare` and not on design-preview pages. This is
  unusual, honest, and the strongest structural answer to Ring 4.
- **API routes are competently built.** Both routes validate input, rate-limit,
  keep keys server-side, store nothing. The consult form has a honeypot. The
  consultant streams SSE properly with resync-tolerant frame parsing.
- **Internal linking to `/trade` works** — verified live: the POS article and
  `/industries/retail` each carry two `href="/trade"` links. (Documentation
  claimed this; it checks out.)
- **The About page placeholder has been written** — the copy is live; the
  checklist is stale on this item.
- **`testimonials.ts` empty-by-design is the right call**, and the component
  correctly renders nothing.

## 2.4 Content and messaging

**The H1 is doing no work.** *"Engineering software that powers modern
businesses."* contains no vertical, no outcome, no differentiator and no target
term. For a site whose two structural problems are (a) an entity collision and
(b) invisibility in buyer-intent search, the single most prominent string on
the site is generic enough to belong to any of the fifty agencies in Ring 3.
Compare it to what the page actually has to offer three lines lower: four
working systems you can open without signing up.

**The proof band is strong and buried.** The four evidence lines — AI clinical
documentation in production, electronic claims with payer responses, built-in
tap-to-pay, four open demos — are the best copy on the site. They sit in
section five of eight on the homepage.

**Homepage section order fights the conversion data.** Current order: Hero →
IndustryMorph → **Process** → DemoStrip → Proof → Testimonials(empty) →
Insights → CTA. Process — the least differentiated section, since every agency
has a four-step process — sits ahead of both the demos and the proof, which are
the two assets that actually convert.

**Ten articles, well-targeted, no comparison content.** The catalogue covers
cost queries, feature queries and one alternatives query (Odoo). There is
nothing in the shape *"[Incumbent] vs a custom build"* — the exact query a Ring
2 buyer types, and the format AI engines prefer to cite. There is also nothing
on the Ring 4 rebuild opportunity.

**Article structure vs. what earns AI citations.** The 2026 evidence: engines
prefer content that **fully answers one specific question in one piece**, and
heavily favour **research, surveys, experiments or proprietary data that cannot
be found elsewhere**. Corewell's GEO/AEO pattern (H1 = question, first
paragraph answers it, FAQs with schema) satisfies the first. It has nothing
proprietary — no benchmark, no dataset, no original measurement — which is the
factor with the most upside and the one nobody else in Ring 3 is doing either.

**Voice is a genuine differentiator.** The copy is unusually restrained and
specific for this category, and the recent uncommitted edits improve it further
(replacing "owners consistently describe this as…" with checkable mechanism).
Keep it.

## 2.5 Conversion funnel

| Stage | State | Gap |
|---|---|---|
| Discovery | Broken by Defects 1 + 2 | No organic entry at all |
| Homepage | Complete | Section order deprioritises the converting assets |
| Demos | Four live, no signup | No email capture anywhere in a demo; a visitor can explore the entire system and leave untracked |
| AI consultant | Live, on-policy, well-prompted | **Cannot capture a lead.** It ends by pointing at `/book-consultation` — the highest-intent visitors on the site, in an open text channel, and there is no way to take an email |
| Pricing | Complete but `noindex` and unlinked | 51% of buyers now start in an AI chatbot and two-thirds of the journey completes before contact; a missing number sends them elsewhere |
| Booking | Cal.com 30-min + 15-min, embedded with link fallback | Good |
| Form | Resend delivery, honeypot, rate-limited | **No persistence.** If Resend fails the lead is gone — a 502 to the user and no record anywhere. No CRM, no lead log |
| Analytics | **None.** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` unset | Every optimisation decision from here is a guess |

**A structural constraint worth knowing before publishing pricing:** the nav
comment at `components/layout/NavBar.tsx` records that the row already needs
~1130px of the 1176px the container gives. Adding "Pricing" back will overflow
it — this was the bug fixed in commit `eead461`. Publishing pricing therefore
requires a nav decision (move something to the footer, or move the breakpoint),
not just un-hiding a link.

## 2.6 Discoverability and the entity problem

**The countermeasure that does not work.** The `llms.txt` disambiguation block
is one of the four shipped defences against the Corewell Health collision. The
2026 evidence is that it is inert:

- Ahrefs, across **137,000 sites**: 97% of `llms.txt` files received **zero
  traffic** in May 2026.
- Three independent studies across **300K+ domains**: no impact on AI citations
  or visibility. A matched-pair study of 2,400 domains across eight engines
  over 90 days found no citation lift.
- Across 515M LLM bot events, requests touching `/llms.txt` are statistically
  negligible.
- Google (Gary Illyes, July 2025) confirmed Google does not support it and does
  not plan to. Anthropic supports it; Perplexity retrieves it; neither
  translates into measurable citation lift.

It costs nothing to keep, but it must not be counted as a defence. **It is also
factually stale** — it says *"Education: Demo coming soon"* and *"Retail &
shop management: Demo coming soon"* when both demos have been live for weeks,
and it does not mention Corewell Trade or `/trade` at all.

**What the evidence says actually works for an entity collision:** a stable
`@id` Organization node with consistent `sameAs` (✅ shipped), a category-first
`disambiguatingDescription` (✅ shipped), **a real Wikidata item with a P1889
"different from" assertion pointing at the colliding entity** (❌ not done —
the site only references the generic Q1058914 "software company" as
`additionalType`), and **co-occurrence with category-anchoring entities** —
appearing consistently alongside competitor names, integration partners and
category concepts (⚠️ partial; Odoo is named, little else).

**The distribution gap.** 86% of AI-engine citations come from sources a brand
controls: first-party sites (44%) and **business listings (42%)**. 51% of B2B
tech brands have zero citations across ChatGPT, Perplexity and Gemini. Corewell
has the 44% built and the **42% at zero** — no Clutch, GoodFirms, DesignRush,
UpCity or G2 profile exists.

Separately, the most-cited domains in AI answers are **Reddit, Wikipedia,
YouTube, LinkedIn and Forbes**; roughly fifteen sources account for ~68% of all
citations across ChatGPT, Claude, Gemini, Perplexity and AI Overviews. A
first-party site alone will rarely be the cited source.

**Why this matters more than normal SEO here:** 51% of B2B software buyers now
begin in an AI chatbot; 95% of purchases go to a day-one shortlist; **69% chose
a different vendor than they had planned based on AI guidance; one-third bought
from a vendor they had never heard of.** For an unknown brand with a name
collision, being AI-citable is not a nice-to-have — it is the only channel
where anonymity is not disqualifying.

## 2.7 Product portfolio and momentum

**Momentum has stopped.** Last marketing-site commit `f55d40d` on 2026-08-09
(11 days ago). Last Corewell Trade commit `c43fd30` on 2026-08-06 (14 days).
The live www response carried `Age: 985495` — ~11.4 days of cache, consistent
with no deploy since the 9th.

**The Trade backend is two weeks overdue and absent.** NestJS + Prisma +
PostgreSQL was expected "within one to two weeks of 2026-08-05". The repo
(`myprojects/Sales Softwaer/corewell-trade`, 9 commits) contains only
`src/{app,components,data,lib}` — no `api`, `server`, `prisma` or `backend`
directory. Meanwhile `/trade` is published as product marketing, which
`CONTEXT.md` explicitly records was meant to happen *after* the backend
shipped, not before.

The page itself is scrupulous — no `SoftwareApplication` schema, demo notices
on every screen, and `robots.txt` on the demo disallows everything behind
`/login`. But the gap between what the marketing says and what exists widens
every week it sits, and `/trade`'s two headline features (`/pos`, `/store`) are
both `Disallow`ed, so nothing corroborates the page from the demo's side.

**The demo strategy is inverted.** The strongest vertical — healthcare,
`production`, with genuinely differentiated capability — has only an in-page
sandbox. The weakest — retail, `design`, no backend — has the flagship external
application, a dedicated landing page, a nav button and five supporting
articles. Effort has gone to the asset with the least proof behind it.

**Asset hygiene, minor:** `public/media/cta-loop.mp4` is 2.87 MB on the
homepage; 14 Trade screenshots total ~5.9 MB of source PNG (served through
`next/image`, so delivery is fine, but they are PNG in-repo); `app/c_logo.png`
(184 kB) appears unused — only `c_logo-withoutbg.png` is imported.

## 2.8 Business model

- **No recurring revenue.** No retainer, no support plan, no hosting/managed
  offer with a price — against a market where hybrid build-plus-retainer is the
  2026 default and outcome-based agreements are described as a survival
  question.
- **Pricing is fixed-band and unpublished.** Fixed-price bidding is the model
  most exposed to change-order friction and margin erosion; it is also the one
  buyers most want to see a number for.
- **No proof of any kind is publishable.** `testimonials.ts` empty; all three
  case studies labelled *"Illustrative scenario"*. Against: social proof lifts
  B2B conversion 12–34%, and **industry expertise (52%) has overtaken price
  (49%) and product fit (46%)** as the top vendor-selection factor. The
  expertise is real and none of it is showable. This is the biggest gap that
  code cannot close.

---

# Part III — What to do, in order

Ordered by (impact ÷ effort). P0 items are hours of work and unblock everything
else.

## P0 — This week. Nothing else matters until these ship.

1. **Fix the canonical inheritance.** Remove `alternates` from
   `app/layout.tsx`; add a self-referencing canonical to every page template
   and dynamic route. Verify with `curl … | grep canonical` on five pages
   before deploying, and again after.
2. **Remove or fill the `[PLACEHOLDER]` block** on all six industry pages.
   Render the matching case study where one exists; render nothing where none
   does.
3. **Resolve apex vs www.** Pick one — `www` is what Vercel currently serves —
   and make `lib/site.ts`, every canonical, the sitemap, `robots.txt` and the
   JSON-LD `@id` agree with it. Then resubmit the sitemap in Search Console.
4. **Fix the "Management Management" title** (`app/industries/[slug]/page.tsx:36`).
5. **Turn on Plausible.** One env var. Without it, every step below is unmeasured.
6. **Commit the ten pending copy edits** — build and typecheck are already clean.

*Then request re-indexing in Search Console for the top 15 URLs and give it
two to three weeks before judging anything else.*

## P1 — Next two weeks. Structural fixes.

7. **Add `Article` schema to insights** (headline, author = Organization,
   `datePublished`, `dateModified`, `publisher`) and `BreadcrumbList`
   site-wide. Add `lastmod` to the sitemap and a `dateModified` field to
   content frontmatter.
8. **Create the third-party footprint** — Clutch, GoodFirms, DesignRush, G2,
   plus consistent LinkedIn company activity. This is the 42% of AI citations
   currently at zero and the strongest available answer to the entity
   collision. Effort, not money.
9. **Create a Wikidata item for Corewell Systems** with a P1889 "different
   from" assertion pointing at Corewell Health. This is the one disambiguation
   lever that lives off-site and does not require naming a competitor in your
   own copy.
10. **Update `llms.txt`** — it is stale (two demos wrongly marked "coming
    soon", no mention of Trade). Keep it, cost is zero, but stop counting it as
    a defence.
11. **Add security response headers** in `next.config.mjs` (CSP,
    `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
    `X-Frame-Options`). Cheap, and it makes the security claims checkable.
12. **Capture leads where intent is highest.** An email field in the consultant
    widget after a substantive exchange, and one on demo exit. Persist form
    submissions somewhere durable so a Resend failure cannot lose a lead.

## P2 — Month one. Revenue and conversion.

13. **Publish `/pricing`** — the drafted ranges hold up well against market
    data (small ERP module $10–40k; clinic MVP $12–25k; market average $132k).
    Requires the nav decision noted in §2.5. Owner sign-off is the blocker.
14. **Reorder the homepage**: Hero → IndustryMorph → **DemoStrip → Proof** →
    Process → Insights → CTA. Move the two converting sections above the least
    differentiated one.
15. **Rewrite the H1** to carry a vertical and an outcome instead of a
    category-generic sentence. The material is already three lines below it.
16. **Ship the comparison cluster** — the direct attack on Ring 2, one per
    category: practice-management subscriptions vs owning a clinic system; PMS
    per-room pricing vs a group platform; the subscription-stack maths for a
    distributor. Each must end on the honest answer — *sometimes buying is
    right* — which is what makes the rest credible, and which the "We say no
    when it's the right answer" principle already commits to.
17. **Ship the Ring 4 cluster** — the unclaimed territory: what vibe-coded
    software gets wrong once people depend on it, and a "we rebuild the
    prototype you shipped" service line. The Replit database deletion, the
    Lovable showcase RLS failures and the SOC 2 gap are all citable public
    facts, and this is credible only from someone running production systems.
18. **Add a retainer offer.** Fixed-fee first build + monthly support and
    automation. SMB market rate is $500–2,000/mo. This is the only route to
    recurring revenue and it is the 2026 default engagement shape.
19. **Publish one real proof point.** One permissioned testimonial or one case
    study with real anonymised facts is worth more than every item above it on
    this list. Owner-blocked.

## P3 — Strategic. Owner decisions.

20. **Decide the Trade backend.** Either build it — which moves retail from
    `design` to `production`, unlocks `SoftwareApplication`, retires the
    "design preview" hedging in five articles, and closes the marketing-reality
    gap — or reframe `/trade` honestly now. Letting it drift is the one option
    that costs credibility without buying anything.
21. **Un-invert the demo strategy.** Build the `clinic.corewellsystems.com`
    replica (`docs/healthcare-demo-plan.md`) so the strongest vertical has the
    strongest demo. Confirm ownership of the source codebase first.
22. **Produce one piece of proprietary research.** A benchmark, a survey of
    twenty clinic owners, a measured dataset — anything original. It is the
    single highest-weighted factor in AI citation selection, and no one in Ring
    3 is doing it.
23. **Services or product.** Vertical SaaS retains ~2x better than horizontal
    tools, and two product-shaped assets already exist. Whether Trade and the
    clinical platform become priced products or stay demonstrations that sell
    services shapes the next six months more than anything else on this list.

---

# Part IV — Needed from the owner

| Item | Blocks |
|---|---|
| Pricing sign-off on $8–25k / $25–80k / scoped | P2-13 (and the nav decision that comes with it) |
| One permissioned testimonial, **or** real anonymised facts for one case study (go-live year, whether multi-location is real, one true outcome) | P2-19, and Defect 2's permanent fix |
| Decision: build the Trade backend, or reframe `/trade` | P3-20, and the honesty of five articles |
| Plausible domain | P0-5 and all measurement after it |
| Go-ahead for Clutch / GoodFirms / G2 listings (needs company details and, ideally, one referenceable client) | P1-8 |
| Confirmation that a retainer offer is wanted | P2-18 |
| Confirmation of source-codebase ownership for the clinical replica | P3-21 |

---

## Evidence and sources

**Market & pricing:** MarkWide Research · Grand View Research · DesignRush ·
TechFundingNews · Octal · BigDataCentric · Adevs · Top10ERP · XB Software ·
NOI Technologies · PWH Services · Founders Workshop.

**Vertical incumbents:** Pabau · AIToolPick · Oli Health · Medesk · Capterra ·
Hotel Tech Insight · Houseful · eviivo · Stayntouch · FullGuest · CFO Club ·
MyOfficeApps · ERP Research · Swell · Bitrix24.

**Agency competitor set:** CapMinds · TATEEDA · OSP Labs · DreamzTech ·
Thinkitive · Ani Solutions · DocVilla · Clarity Ventures · Qubit Labs · Full
Scale · The Scalers · Dreamix · Pitchsite · Bidara.

**AI builders:** Retool 2026 build-vs-buy report · Sacra · Value Add VC ·
HackerNoon · MindStudio · FuseLab Creative · Wavect · AIThinkerLab ·
vibe-eval.com · Flatlogic.

**Buyer behaviour & AEO/GEO:** G2 2026 Buyer Behavior Report · MarketScale ·
Reechee · Martal · Yext citation study · Everything-PR AI Citation Source Index
(680M citations, six studies) · arXiv 2605.25517 · White Beard Strategies ·
Mersel AI · Ahrefs `llms.txt` study (137k sites) · MaxAEO · QuickSEO ·
Search Atlas · MLforSEO · Single Grain · Search Engine Journal · Pixelmojo.

**Conversion:** Walnut · Userpilot · Navattic · SaaSHero · Storylane · Guideflow.

**Services economics:** TSIA State of Professional Services 2026 · Piscari ·
Digital Agency Network · Automaton · KampaignLab · SaaS Intelligence · Jishu Labs.
