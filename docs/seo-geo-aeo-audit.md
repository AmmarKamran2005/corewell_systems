# SEO / GEO / AEO Audit — corewellsystems.com

**Date:** 2026-08-20
**Scope:** Full technical SEO, on-page SEO, GEO (generative engine optimization),
AEO (answer engine optimization), content architecture, off-site/entity signals,
and measurement.

**Method:** Source review of the Next.js app, rendered-HTML inspection of every
route on the local dev server, and direct verification against production
(`https://corewellsystems.com` and `trade.corewellsystems.com`). Content measured
by word count, link density, em-dash density, table count, and citation count.

**Skills applied (marketingskills collection):** `seo-audit` (+ `ai-writing-detection`,
`international-seo`), `ai-seo` (+ `platform-ranking-factors`, `content-patterns`,
`content-types`, `citations-vs-recommendations`, `okf`, `youtube-ai-citations`),
`schema` (+ `schema-examples`), `site-architecture` (+ `navigation-patterns`,
`site-type-templates`), `programmatic-seo`, `content-strategy`, `competitors`,
`copy-editing` (+ `checklist`, `content-refresh`), `directory-submissions`,
`free-tools`, `analytics`, `product-marketing`.

**Not tested** (no access): Search Console / Bing Webmaster data, real Core Web
Vitals field data, current index coverage, backlink profile, keyword rankings, and
whether the brand is presently cited by ChatGPT / Perplexity / AI Overviews. Every
finding below comes from code, rendered markup, or measured content.

---

## Executive summary

The writing and entity work on this site are well above average for the category.
The article pattern is textbook AEO, the `llms.txt` disambiguation is genuinely
strong, and the `Organization` schema does entity work most agencies never attempt.

Three things are undermining it.

**First, every page tells Google it is a duplicate of the homepage.** The root
layout sets `alternates: { canonical: "/" }` and Next.js inherits it into every
child route. Verified in production: only `/about` and `/trade` self-canonicalize.
All ~30 other URLs — every insight, industry page, case study, and solution —
declare the homepage as canonical, while `sitemap.xml` simultaneously submits them
all for indexing.

**Second, the canonical host is not the serving host.** `siteUrl` is the apex
`corewellsystems.com`, but production 308-redirects apex → **www**. So every
canonical tag, every sitemap entry, and the `robots.txt` sitemap reference point at
a host that redirects. All 39 sitemap URLs are redirects. This compounds the first
problem: the canonicals are wrong about the page *and* the host.

**Third, the content does not do the two things that most increase AI citation.**
Across all 13 content files there are **zero external citations** and **zero
sourced statistics** — the Princeton GEO study ranks those as the #1 and #2
levers (+40% and +37%). Internal linking runs at **0.0–0.8 links per 1,000 words**
against a 5–10 guideline, roughly 10× under, so no topical cluster ever forms.

Fix the canonical and the host together — fixing one without the other still leaves
every canonical pointing at a redirect. The rest is a content and schema programme
that can run in parallel.

---

## Project constraints that shape every recommendation

Read before actioning anything. These come from `CONTEXT.md` §2 and `docs/spec.md`,
and several of them **overrule** what a generic SEO playbook would tell you to do.
Where a best practice collides with one of these, the constraint wins.

| Constraint | What it rules out | Where it applies |
|---|---|---|
| **No founder identity** — company voice only | Named human authors, author bios, "meet the team" pages | Overrides the standard E-E-A-T author fix (H2) |
| **Never invent** counts, metrics, percentages, testimonials, outcomes | Generating plausible statistics to satisfy the GEO citation lever | Hard limit on H7 |
| **No named or linked real client products** | Client logos, live product links, named case studies | Caps case-study depth (M3) |
| **Maturity labelling is mandatory** | `SoftwareApplication` schema on anything not deployed | Constrains new schema work (M2) |
| **No firm timelines or fixed prices** | A published price list; `/pricing.md` with fixed figures | Constrains M4 |
| **No geographic claims** | Location pages, local SEO, `[service] in [city]` pSEO | Removes an entire `programmatic-seo` playbook |
| **One primary CTA: Book a Consultation** | Competing CTAs on new pages | Applies to every page added below |
| **Repo is public** | Client names or internal product names in any committed file | Applies to all content work |

Two audit findings were revised after checking these documents, and both revisions
are recorded in place below: **C3** (Search Console is verified — an earlier draft
said otherwise) and **H8** (the demo subdomain is correctly configured — an earlier
draft reported it as fully indexable, which was wrong).

---

## What is already working

Stated plainly, because none of this should be disturbed while fixing the rest.

- **`llms.txt` is excellent.** The disambiguation block against Corewell Health is
  the right instrument for this entity collision and is written for the model that
  will read it rather than as marketing copy.
- **`Organization` schema is advanced.** `disambiguatingDescription`, `knowsAbout`
  with 18 topical anchors, `additionalType` pointing at the Wikidata entity for
  "software company", `sameAs` across three profiles.
- **The article pattern is correct AEO.** H1 is the question, the first paragraph
  answers it directly and self-containedly, headings are phrased the way queries
  are phrased, and FAQ answers run 50–100 words — the range the `content-patterns`
  reference specifies.
- **Visible text and schema text are identical** in every FAQ block. No hidden
  keyword copy anywhere on the site.
- **Heading hierarchy is clean sitewide.** Exactly one `<h1>` per route, no skipped
  levels, on all 32 routes. `directory-submissions` notes 87% of ChatGPT-cited
  pages use a single H1 and clean hierarchy correlates with 2.8× higher AI citation
  rates — this site already passes.
- **Server response is fast.** Production TTFB measured at 0.21–0.23s, comfortably
  inside Copilot's sub-2-second threshold.
- **All AI crawlers are allowed.** No `Disallow` against GPTBot, PerplexityBot,
  ClaudeBot, or Google-Extended.
- **`FAQPage` schema is on insights, industries, solutions, and `/trade`** — the
  single content preference Perplexity rewards most.
- **Semantic, agent-readable HTML.** `<main>`, `<nav aria-label>`, skip link, and
  FAQs in native `<details>` so answers sit in the DOM rather than behind JS.
- **`/trade` is the model page** — own canonical, `WebPage` + `BreadcrumbList`, and
  bidirectional related reading into four insight articles.
- **The CTA video is properly gated** — not mounted on mobile, under reduced motion,
  or before the band nears the viewport.

---

## Findings

### CRITICAL

#### C1 — Every page canonicalizes to the homepage

- **Issue:** `app/layout.tsx:46` sets `alternates: { canonical: "/" }`. Next.js
  metadata inheritance pushes that into every route that does not override it.
- **Evidence:** Production fetch — `/`, `/insights`, and `/industries/healthcare`
  all return `<link rel="canonical" href="https://corewellsystems.com">`. Local
  sweep of all 32 routes: only `/about` and `/trade` override it.
- **Impact:** This instructs Google to drop every interior page from the index and
  consolidate to `/`. It directly contradicts `sitemap.xml`, producing the
  "Alternate page with proper canonical tag" exclusion. The insights library is the
  site's entire AEO engine and is currently marked duplicate.
- **Fix:** Remove `alternates` from the root layout. Add
  `alternates: { canonical: "/<path>" }` to every static page and to every
  `generateMetadata` in the five dynamic segments. Use a shared helper rather than
  32 hand-written strings.
- **Priority:** 1.

#### C2 — Canonical host does not match the serving host

- **Issue:** `lib/site.ts` sets `siteUrl = "https://corewellsystems.com"` (apex),
  and every canonical tag, the sitemap, and the `Sitemap:` line in `robots.txt`
  use that apex host. But production **308-redirects apex → www**.
- **Evidence:**
  - `https://corewellsystems.com/insights` → `308` → `https://www.corewellsystems.com/insights`
  - `https://www.corewellsystems.com/insights` → `200`, and its canonical tag reads
    `https://corewellsystems.com` — a different host, which then redirects back.
  - `sitemap.xml` `<loc>` entries are all apex, so **every URL in the sitemap is a
    redirect**.
- **Conflict with documented intent:** `CONTEXT.md` §7 records the domain as
  "apex canonical, www redirects". The live configuration is the reverse. Either
  the hosting/DNS drifted or the doc is stale — worth resolving deliberately.
- **Impact:** Compounds C1. Every canonical points to the wrong page *and* the
  wrong host, resolving only through a redirect. `seo-audit` requires sitemaps to
  contain only canonical, indexable URLs — this one contains 39 redirects.
- **Fix (choose one, then be consistent everywhere):**
  - **Preferred:** restore apex as canonical at the host — redirect www → apex.
    This matches `siteUrl`, the sitemap, `robots.txt`, `llms.txt`, and CONTEXT.md
    as already written, so no code changes at all.
  - **Alternative:** accept www as canonical and change `siteUrl` to
    `https://www.corewellsystems.com`, then update CONTEXT.md §7.
- **Priority:** 1, alongside C1 — fixing C1 while the host is wrong just produces
  correct-looking canonicals that still point at a redirect.

#### C3 — No analytics

- **Issue:** `app/layout.tsx:137` renders the Plausible script only when
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. It is empty in `.env.example` and unset in
  `.env.local`, so the script never renders. The site collects no analytics at all.
- **Correction to an earlier draft of this audit:** Search Console **is** verified —
  `CONTEXT.md` §7 records a verified domain property with the sitemap submitted
  successfully. Domain-property verification is a DNS record and does not appear in
  the repo, which is why the code scan missed it. Only analytics is missing.
- **Also missing:** Bing Webmaster Tools and IndexNow. Bing is Copilot's index and
  most sites skip it; `platform-ranking-factors` calls this out specifically.
- **Impact:** GSC gives query and coverage data, which is the important half. But
  with no analytics there is no view of on-site behaviour, no conversion tracking on
  the consultation CTA, and no way to see AI-referred traffic.
- **Fix:** Set the Plausible domain (already wired, one env var), verify Bing
  Webmaster Tools, submit the sitemap there, and enable IndexNow.
- **Priority:** 2.

---

### HIGH

#### H1 — No `Article` / `BlogPosting` schema on insights

`app/insights/[slug]/page.tsx` emits `FAQPage` only. No `headline`,
`datePublished`, `dateModified`, `author`, `publisher`, or `image` exists in
structured data anywhere on an article. Per `platform-ranking-factors`, schema is
the single biggest lever for Google AI Overviews (30–40% visibility), and Perplexity
specifically looks for `Article` with publication and modification timestamps.

**Fix:** Add an `Article` node alongside the existing `FAQPage`, with
`publisher: { "@id": siteUrl + "/#organization" }` so it joins the entity graph
the root layout already establishes.

#### H2 — No author attribution anywhere on the site

No byline, no author page, no `author` property in any schema. Grep across `app/`,
`components/`, `lib/`, and `content/` returns zero author signals.

This is the clearest E-E-A-T gap. Princeton GEO puts expert attribution at +25–30%
citation lift; `platform-ranking-factors` lists author bios with real credentials
as a weighted Google AI Overviews factor and a ChatGPT signal.

**Constraint that decides the fix:** `CONTEXT.md` §2 rule 1 is non-negotiable —
"No founder identity. The site speaks entirely in company voice. No personal name,
no bio, no 'meet the team'." A named human author is therefore **off the table**,
and correctly so: it is a deliberate positioning choice to avoid reading as a solo
operator.

**Fix within that constraint:** attribute to the `Organization`. Add
`author: { "@id": siteUrl + "/#organization" }` and a visible "By Corewell
Systems" byline. This is weaker than a credentialed human for E-E-A-T, and that
tradeoff is accepted deliberately — but it is far better than the current absence,
because right now the articles have no attributed source of any kind.

The experience half of E-E-A-T can still be earned without a named person: state
plainly in the article or a standing footer line that the claims come from systems
the company has built and operates. That is first-hand experience expressed in
company voice.

#### H3 — No freshness signals

No `dateModified` in frontmatter, no "Last updated" on any page, and `app/sitemap.ts`
emits no `<lastmod>` at all (confirmed in the live sitemap XML).

Freshness is the most platform-differentiating signal in the whole audit:
`platform-ranking-factors` reports ChatGPT cites content updated within 30 days
about **3.2× more often**, and Perplexity runs a time-decay algorithm that gives
fresh publishers a real shot regardless of authority.

**Fix:** Add `updated` to frontmatter, display it, feed `Article.dateModified`, and
populate `lastModified` in the sitemap. Then adopt the `content-refresh` cadence —
comparison content every 3–6 months, high-traffic posts every 6 months, evergreen
guides annually.

#### H4 — Internal linking is roughly 10× under target

Measured across the ten insight articles:

| Article | Words | Internal links | Per 1,000 words |
|---|---:|---:|---:|
| custom-software-vs-off-the-shelf | 974 | 0 | 0.0 |
| hotel-management-software-features | 916 | 0 | 0.0 |
| how-much-does-a-custom-erp-system-cost | 1,297 | 1 | 0.8 |
| how-much-does-custom-healthcare-software-cost | 891 | 0 | 0.0 |
| odoo-alternatives-when-custom-erp-makes-sense | 1,582 | 1 | 0.6 |
| sell-online-without-breaking-your-shop-stock | 1,461 | 1 | 0.7 |
| what-does-owning-custom-software-actually-save-you | 1,388 | 0 | 0.0 |
| what-features-does-a-clinic-management-system-need | 1,666 | 0 | 0.0 |
| what-is-an-online-pos-system | 1,463 | 1 | 0.7 |
| wholesale-distribution-software-what-it-should-do | 1,517 | 1 | 0.7 |

`site-architecture` specifies **5–10 internal links per 1,000 words**. Across
13,155 words that implies roughly 66–132 contextual links; there are **5**, and all
five point to `/trade`. Industry pages and solution pages contain **zero** links to
insights or case studies.

Hub→spoke navigation works — nav and footer reach every L1 hub, everything is
within 3 clicks, and there are no orphan pages. What is missing is lateral linking,
so no topical cluster ever forms. That matters twice: it wastes crawl equity, and
it undercuts Google's query fan-out, which retrieves best from sites covering a
parent topic as a connected cluster.

**Fix:** Copy the `/trade` pattern. Related-reading blocks on every industry,
solution, and case-study page; links from each insight back to its industry page
and across to sibling articles. Descriptive anchor text, not "read more".

#### H5 — No breadcrumbs, and no `BreadcrumbList` outside `/trade`

The site has a clean 3-level hierarchy and expresses it nowhere. Detail templates
use a single "← All insights" back link instead of a trail. `site-architecture`
calls breadcrumbs "free internal links on every page" — which is also the cheapest
partial fix for H4.

**Fix:** Shared breadcrumb component + `BreadcrumbList` on all five detail
templates, mirroring the URL path.

#### H6 — No privacy policy or terms

No `/privacy`, `/terms`, or `/legal` route exists, while the site runs a
consultation form (`app/api/consult-request`) and an AI consultant widget
(`app/api/consultant`) that both accept user input.

`seo-audit` lists privacy policy and terms under E-E-A-T trustworthiness.
`directory-submissions` makes them a **hard block** — most Tier 1 and Tier 2
directories reject submissions without them, so this also gates the entire
off-site link-building layer.

**Fix:** Add both, link from the footer. Flag the compliance question to whoever
owns it; that is not a decision to make from the code.

#### H7 — Zero external citations and zero sourced statistics in the content

Measured across all 13 MDX files: **0 external links, 0 attributed sources.**

The Princeton GEO study (KDD 2024) ranks the nine optimization methods, and the
top two are exactly what is missing:

| Method | Visibility boost | Present on this site |
|---|---:|---|
| Cite sources | +40% | No |
| Add statistics | +37% | Unsourced only |
| Add quotations | +30% | No |
| Authoritative tone | +25% | Yes |
| Improve clarity | +20% | Yes |

The content makes real, specific, useful claims — "roughly 15–20% of build cost per
year" for maintenance, "low tens of thousands of dollars" for a focused system —
and attributes none of them. `platform-ranking-factors` notes Claude specifically
rewards factual density with named sources, and low-ranking sites gain the most
from citations (up to 115% visibility increase).

**Fix — and the hard limit on it:** `CONTEXT.md` §2 rule 3 forbids inventing
client counts, metrics, percentages, testimonials, or outcomes. This finding must
**never** be actioned by generating plausible-looking statistics. Two legitimate
routes only:

1. **Cite external authorities for market-level claims.** Industry maintenance-cost
   ratios, ERP failure rates, and per-seat licensing trends are all published by
   named sources. Link them. This is the +40% lever and it requires no first-party
   data at all.
2. **Attribute first-party figures only where the owner supplies them.** Where a
   number comes from systems Corewell has built, say so and date it — but only
   after the owner confirms it. Until then, leave the claim qualified as it
   currently is ("commonly estimated at roughly 15–20%") rather than dressing an
   estimate as a finding.

Route 1 is available immediately and unblocked. Route 2 is on the owner list.

#### H8 — RETRACTED. The demo subdomain is correctly configured.

An earlier draft of this audit reported `trade.corewellsystems.com` as fully
indexable. **That was wrong** — a truncated read of its `robots.txt` returned an
empty result and I took it at face value. The actual file disallows every
application screen (`/dashboard`, `/sales/`, `/purchases/`, `/inventory/`,
`/parties/`, `/accounting/`, `/reports/`, `/admin/`, `/pos`, `/store`, `/setup`,
and others) and allows only `/` and `/login`.

That matches the documented intent in `CONTEXT.md` §9 exactly: the `/login`
landing page is the only indexable surface, carrying a demo notice and metadata
aimed at "ERP / POS demo" searches, precisely so invented customer records never
enter search results. This is correct and should not be changed.

**One residual worth monitoring, not fixing:** the demo's `/login` page targets
ERP/POS demo queries, and `/trade` on the main domain targets overlapping terms.
If both start ranking for the same query, prefer `/trade` — but this is a
watch-item for Search Console, not a defect.

---

### MEDIUM

#### M1 — Thin indexable pages in the sitemap
`/industries/enterprise` renders **136 words**; `/industries/healthcare/demo` **154**;
`/industries/hospitality/demo` **191** — the demo value lives in client-side JS, so
there is almost nothing for a crawler or AI engine to read. The helpful-content
system is site-wide; a cluster of thin URLs can drag on stronger pages.
**Fix:** Give the demo pages a real written frame (what the demo shows, what to
click, what the underlying system does) — better than removal, because it makes them
citable. Expand `/industries/enterprise` or fold it into `/industries`.

#### M2 — No schema on solutions or case studies
Solutions carry `FAQPage` but no `Service` / `ProfessionalService`. Case studies
carry no structured data at all.
**Fix:** `Service` on solutions with `provider` `@id`-linked to the Organization;
`Article` on case studies.

#### M3 — Case studies are thin for their type
~420 rendered words each, no schema, no figures beyond prose. `content-strategy`
specifies Challenge → Solution → Results → Key learnings; the Results rung is the
weak one. The anonymization policy is a real constraint and is correctly enforced —
depth can still come from operational detail without naming clients.

#### M4 — Pricing is invisible to AI buying agents
`/pricing` is `noindex, nofollow` and withheld from the sitemap pending owner
sign-off, and there is no `/pricing.md`. AI agents comparing vendors filter out
what they cannot parse. `directory-submissions` also lists a real pricing page as a
Tier 1 submission requirement.
**Fix:** Business decision, not technical. If ranges are ever cleared, publish both
`/pricing` and `/pricing.md`.

#### M5 — Uneven industry depth
healthcare 1,558 words and hospitality 1,480 versus legal-professional-services
1,202, education 580, retail 580, construction 548, enterprise 136. Bring the
weaker pages toward the healthcare/hospitality standard, which is the right target.

#### M6 — Only 2 of 10 articles contain a table
`how-much-does-a-custom-erp-system-cost` (6 rows) and `what-is-an-online-pos-system`
(5 rows) have tables. The other eight have none — including
`custom-software-vs-off-the-shelf`, a directly comparative article with no
comparison table. `content-patterns` is explicit that tables beat prose for
comparison content and that comparison articles are the single most-cited content
type (~33% of AI citations).

#### M7 — No comparison or alternative pages
No `/vs/`, `/alternatives/`, or `/compare/` routes exist. The only competitor
content is one insight article about Odoo. The `competitors` skill defines four
formats and `directory-submissions` treats 3–5 alternative pages as a prerequisite
for the off-site layer, noting they convert at 5–15% versus 0.5–2% for generic
content.
**Caveat from `citations-vs-recommendations`:** Corewell is an emerging brand, so
expect these pages to earn citations and category framing rather than near-term
recommendations. Publish them for search intent and positioning, not on a promise
of shortlist placement.

#### M8 — No third-party review presence
`sameAs` lists LinkedIn, Instagram, and Facebook only. There is no Clutch, G2,
Capterra, or comparable listing. Per `citations-vs-recommendations`, being
*recommended* by an AI engine is governed by aggregate web consensus — reviews,
forums, analysts, press — largely independent of your own content. The test to
apply: *if a model ignored everything on our domain, would the rest of the web put
us on the shortlist?* Today, no.
**Fix:** Clutch is the highest-leverage listing for a custom software firm. This is
the highest-impact item that cannot be shipped from this repo.

#### M9 — Em-dash density is roughly 4× the guideline
Measured across the ten insight articles: **110 em dashes, averaging 7.9 per 1,000
words**, peaking at 11.6. The `ai-writing-detection` reference calls the em dash
"the primary AI tell" and suggests revising above roughly one per page (~2 per 1,000
words).
**Honest framing:** the writing itself reads as genuinely human and well-crafted,
and Google does not penalize AI-assisted content. This is a reader-perception item,
not a ranking one — but it matters more than average for a company selling
software-engineering credibility to skeptical buyers.
**Fix:** A single pass converting most em dashes to commas, colons, or parentheses.
Low effort, no structural change.

#### M10 — Title and meta-description lengths are out of range on most routes

Measured on production. `seo-audit` targets 50–60 characters for titles and
150–160 for descriptions.

| Route | Title | Desc | Issue |
|---|---:|---:|---|
| `/how-we-work` | 74 | 182 | both over |
| `/insights/what-is-an-online-pos-system` | 77 | 179 | both over |
| `/trade` | 72 | 162 | title over |
| `/about` | 70 | 210 | both over |
| `/insights` | 70 | 120 | title over, desc short |
| `/case-studies` | 65 | 131 | title over, desc short |
| `/technology` | 59 | 224 | desc far over |
| `/` | 54 | 213 | desc far over |
| `/solutions` | 28 | 157 | title wastes 30 chars |
| `/solutions/ai-automation` | 32 | 113 | both short |
| `/book-consultation` | 38 | 159 | title short |
| `/industries/enterprise` | 45 | 115 | both short |

The `"%s — Corewell Systems"` template in `app/layout.tsx` adds 18 characters, which
is what pushes most of the long ones over. Over-length titles truncate in the SERP;
short ones waste the most valuable real estate on the page.

**Fix:** Audit every route against the ranges. For long ones, shorten the page title
so title + template fits 60. For the four short ones, the template leaves room for a
real qualifier ("Solutions" → "Solutions — How We Turn Problems Into Systems").

#### M11 — Opening answer blocks run long for snippet extraction

`content-patterns` puts the optimal extraction window at **40–60 words**. Measured
first paragraphs:

| Article | Words |
|---|---:|
| custom-software-vs-off-the-shelf | 60 |
| sell-online-without-breaking-your-shop-stock | 71 |
| wholesale-distribution-software-what-it-should-do | 75 |
| hotel-management-software-features | 75 |
| what-does-owning-custom-software-actually-save-you | 78 |
| what-is-an-online-pos-system | 86 |
| how-much-does-a-custom-erp-system-cost | 90 |
| how-much-does-custom-healthcare-software-cost | 97 |
| odoo-alternatives-when-custom-erp-makes-sense | 99 |
| what-features-does-a-clinic-management-system-need | 101 |

Average 83, nearly 40% over the window. **This is a good problem** — the answers are
genuinely direct and complete, just longer than the ideal lift. One article hits the
target.

**Fix:** Do not delete content. Lead each article with a tight 40–60 word answer,
then let the current opening paragraph follow as the expansion. FAQ answers are in
better shape (39–62 word average against a 50–100 target), though
`custom-software-vs-off-the-shelf` (43) and `hotel-management-software-features` (39)
run thin enough to be worth padding toward 50.

#### M12 — No `.agents/product-marketing.md`
Every skill in the collection reads this file first for product, audience, and
positioning context. `.agents/` exists but contains only `skills/`. Creating it
would make every future marketing task in this repo cheaper and more consistent.

---

### LOW

- **L1 — `og:url` is not emitted on any page.** Next.js only outputs it when
  `openGraph.url` is set. Add it alongside the canonical fix.
- **L2 — `robots.txt` has no named AI-bot block and does not reference `llms.txt`.**
  The wildcard `Allow: /` already permits every AI crawler, so this is cosmetic —
  but an explicit named block documents the intent.
- **L3 — Page-level schema is not `@id`-linked to the Organization.** The `FAQPage`
  and `SoftwareApplication` blocks are free-floating graphs. Adding `isPartOf` /
  `publisher` / `provider` references consolidates everything into one entity graph.
- **L4 — `meta keywords` is present.** Ignored by every major engine; harmless.
- **L5 — Google retired FAQ rich results for most sites in 2023.** Keep the markup —
  Perplexity and other AI engines actively parse it — but do not expect Google rich
  results from it.
- **L6 — No public PDFs.** `platform-ranking-factors` notes Perplexity prioritizes
  publicly accessible PDFs. A buyer's guide to scoping a custom build would fit the
  existing content strategy.
- **L7 — No link-earning content formats.** Per `content-strategy`'s backlink data:
  statistics/data roundups earn **4.25×** their page share of backlinks, glossary
  pages 1.47×, interactive tools 1.38×. The site has none of the three. A
  maintained "custom software cost benchmarks" stats page would simultaneously fix
  H7 (its own citation infrastructure) and earn links.
- **L8 — No free tool.** The interactive industry demos are genuine
  engineering-as-marketing, but no ROI/cost calculator exists — the natural fit for
  a firm whose top-performing article is a cost question.
- **L9 — No OKF bundle.** Google's v0.1 Open Knowledge Format has no confirmed AI
  ranking signal today; treat as a protocol-layer bet, and note the generator
  doubles as an internal-linking audit that would have surfaced H4 visually.
- **L10 — International:** the site is monolingual English with `areaServed:
  "Worldwide"`. No hreflang is needed and none is missing. Nothing to fix; recorded
  so the dimension is not left open.
- **L11 — No YouTube presence.** `youtube-ai-citations` notes YouTube is one of the
  most-cited third-party surfaces in AI answers, and that models read the text layer
  (transcript, chapters, description), not the footage. The existing demo walkthroughs
  are most of the work already.

---

## Prioritized action plan

**Phase 1 — Unblock indexation (do first, together)**
1. C2 — settle the host. Redirect www → apex (preferred, zero code change), or
   switch `siteUrl` to www and update CONTEXT.md §7.
2. C1 — remove the root canonical, add per-page canonicals, verify in production.
3. C3 — set the Plausible domain; verify Bing Webmaster Tools; enable IndexNow.
4. Resubmit the sitemap and watch Search Console coverage recover.

**Phase 2 — Make the content citable**
5. H1 — `Article` schema on insights.
6. H2 — author attribution, visible and in schema.
7. H3 — `dateModified` in frontmatter, on the page, and `lastmod` in the sitemap.
8. H7 — attribute every statistic; date the first-party ones.

**Phase 3 — Connect the site to itself**
9. H5 — breadcrumbs + `BreadcrumbList` (cheapest partial fix for H4).
10. H4 — related-reading blocks and lateral links to 5–10 per 1,000 words.
11. M6 — comparison tables in the eight articles that lack them.

**Phase 4 — Trust and depth**
12. H6 — privacy and terms.
13. M10 — title and description lengths across all routes.
14. M11 — 40–60 word lead answers on the ten articles.
15. M1, M2, M3, M5 — thin pages, missing schema, case-study depth, industry parity.
16. M9 — the em-dash pass.

**Phase 5 — Expand and earn**
17. M7 — comparison/alternative pages, with emerging-brand expectations set.
18. M8 — Clutch and review-platform listings; add to `sameAs`.
19. L6, L7, L8 — a stats/benchmarks page, a glossary, a cost calculator.
20. M12 — write `.agents/product-marketing.md` so future work inherits the context.

**Ongoing — measure the ladder, not a single number**
Run the top 15–20 buyer queries through ChatGPT, Perplexity, and Google monthly and
log four rungs separately: retrieved, cited, mentioned, recommended — plus the
framing around each mention. A rising citation count with a flat recommendation
rate is a specific, diagnosable gap: the web does not yet corroborate the content.
Add a "how did you hear about us?" field to the consultation form; roughly 91% of
post-recommendation visits arrive via branded search or direct rather than as
visible AI referral traffic, so standard attribution will underreport this.

---

## The strategic point

Two-thirds of this report is on-site work that can be shipped from this repo. The
most important item cannot be.

Corewell Systems is an emerging brand in a category where AI recommendations are
governed by web-wide consensus. The on-site fixes will earn citations — that is
real, and it shapes how the models describe the category. But the shortlist itself
is decided by review platforms, communities, analysts, and earned media. Combined
with the Corewell Health entity collision, off-site presence carries double weight
here: it is what teaches the models that a second, unrelated Corewell exists at all.

Fix C1 today. Then treat Clutch listings, review generation, and genuine
participation where these buyers ask their questions as a first-class channel, not
an afterthought behind the content work.
