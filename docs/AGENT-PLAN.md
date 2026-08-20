# Remediation Plan — Written for an AI Coding Agent

**Target executor:** an autonomous coding agent (Claude Code or equivalent)
working in `D:\Main\Agency`.
**Authored:** 2026-08-20, from a full audit of the codebase, a clean production
build, and direct HTTP inspection of the live site. Findings and evidence:
[`docs/competitive-position.md`](./competitive-position.md).
**Status of this document:** ready to execute. Phases 1–4 need no owner input.
Phase 5 and everything in §7 are blocked on the owner — do not attempt them.

---

## 0. How to use this document

You are picking this up with **no conversation history**. Everything you need
is here or in the files it names. Do not re-derive the audit.

**Operating rules for this plan:**

1. **Work one task at a time, in order.** Task IDs encode dependencies
   (`P1-T3` requires `P1-T2`). Do not batch across phases.
2. **Every task has an acceptance test.** Run it. If it fails, fix before
   moving on. Do not mark a task done on the basis that the edit was applied —
   the edit applying is not the test.
3. **Commit per task**, with the repo-local git identity
   (`Corewell Systems <info@corewellsystems.com>`, already configured). One
   logical change per commit. Message style: imperative, lowercase-after-verb,
   describing the effect not the mechanism — match `git log` (e.g. *"Stop the
   nav items wrapping to a second line"*).
4. **Do not push and do not deploy** unless explicitly told to. Verification
   against production is read-only (`curl`).
5. **Before any `npm run build`, make sure no dev server is running.** Running
   both corrupts `.next` and produces phantom errors. If in doubt:
   `rm -rf .next` first.
6. **Never invent content.** See §2. This is the one rule whose violation
   cannot be undone by a later commit.
7. If a task turns out to be wrong or already done, **say so and skip it** —
   do not manufacture work to fill the slot.

---

## 1. Project context

**Corewell Systems** — a boutique software engineering company that builds
custom operational systems for clinics, hotels, schools and retailers. This
repo is its marketing website.

| | |
|---|---|
| Live | https://corewellsystems.com (serves from `www.`, see `P1-T3`) |
| Stack | Next.js 14 App Router · TypeScript · Tailwind · Framer Motion |
| Hosting | Vercel, auto-deploys on push to `main` |
| Source of truth | `docs/spec.md` (v7) · `CONTEXT.md` for current state |
| Scale | 29 files in `app/`, 36 components, 16 `lib/` modules, ~11.9k lines TS/TSX, 48 generated pages |

**Audience:** non-technical decision-makers — clinic owners, hotel owners,
school administrators, shop owners. They are not evaluating code. **They are
evaluating risk.** Every section should reduce a fear.

**Read before starting:** `CONTEXT.md` (§2 non-negotiables, §4 the maturity
system, §10 working conventions), then `docs/competitive-position.md` §2 for
the findings this plan fixes.

---

## 2. Non-negotiable constraints

Breaking any of these damages the business. They come from `docs/spec.md`
§§1, 7, 13 and from explicit owner decisions. They override anything in §5 that
appears to conflict.

1. **No founder identity.** Company voice only. No personal name, no bio, no
   team page. A one-person team page announces *solo operator*, which the whole
   site exists to counter.
2. **No named or linked real products** except **Corewell Trade**, which is the
   company's own and is published. Internal product names and live client URLs
   never appear.
3. **Never invent** client counts, metrics, percentages, testimonials, regions
   or outcomes. If a fact is missing, write the sentence without it. Structural
   headings and UI chrome are fine to draft.
4. **Maturity labelling is mandatory.** Every capability claim carries its true
   tier (`production` / `design` / `concept` — `lib/industries.ts`). Calling a
   design "live" is the worst available error. `SoftwareApplication` schema
   emits only for `production`.
5. **No firm timelines or fixed prices** in copy or from the AI assistant.
6. **One primary CTA everywhere:** Book a Consultation.
7. **Outcome language over technology language.** Tech never appears in a
   headline; it lives in "Under the hood" sections and on `/technology`.
8. **No geographic claims.** Positioning is universal.
9. **`myprojects/` is gitignored and `tsconfig`-excluded.** Nothing from it may
   ever enter this repo.
10. **Never commit secrets.** `.env.local` is gitignored; the repo is **public**.

---

## 3. What this plan fixes — findings and evidence

Severity is impact on the business, not effort.

| # | Finding | Sev | Evidence (verified 2026-08-20) |
|---|---|---|---|
| F1 | **Every page canonicalises to the homepage.** ~41 of 43 URLs tell Google they are duplicates of `/`. | 🔴 Critical | `curl -s -L --compressed https://www.corewellsystems.com/industries/healthcare \| grep canonical` → `href="https://corewellsystems.com"`. Same on `/insights/how-much-does-a-custom-erp-system-cost`. Cause: `app/layout.tsx:46` sets `alternates: { canonical: "/" }`; App Router metadata is **inherited** and only `app/about/page.tsx:40` and `app/trade/page.tsx:17` override it. |
| F2 | **Raw `[PLACEHOLDER: …]` live on all six industry pages**, under a heading reading "Proof, not promises". | 🔴 Critical | All six `/industries/*` return 2 occurrences of `PLACEHOLDER`. Source: `app/industries/[slug]/page.tsx:329`. |
| F3 | **Apex/www split.** Site serves from `www`; every declared identity uses apex. | 🟠 High | `https://corewellsystems.com/` → `308` → `https://www.corewellsystems.com/`. `lib/site.ts` `siteUrl`, all canonicals, `app/sitemap.ts`, `app/robots.ts` sitemap line, and JSON-LD `@id` all use apex. Every sitemap URL is a redirect. |
| F4 | **No `Article` schema on insights**; no schema at all on case studies. | 🟠 High | Built HTML for an article contains `FAQPage` + global `Organization`/`WebSite` only. `/case-studies/connected-clinic-network` contains only the global nodes. No `author`, `datePublished`, `dateModified`, `publisher`, `headline`. |
| F5 | **Title-tag duplication.** `/industries/retail` → "Retail & Shop Management **Management** Software". | 🟡 Medium | `app/industries/[slug]/page.tsx:36` appends `" Management Software"` to `industry.name`, already `"Retail & Shop Management"` (`lib/industries.ts:149`). |
| F6 | **No `lastmod` in sitemap**; no `dateModified` in content frontmatter. | 🟡 Medium | `app/sitemap.ts` emits `changeFrequency` + `priority` only — the two fields Google has said it largely ignores — and omits the one it uses. |
| F7 | **No `BreadcrumbList`** anywhere except `/trade`. | 🟡 Medium | JSON-LD inventory across built pages. |
| F8 | **No security response headers.** | 🟡 Medium | Live headers carry only Vercel's default `Strict-Transport-Security`. No CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. `next.config.mjs` is bare (5 lines). Notable for a firm selling "compliance-grade security". |
| F9 | **`llms.txt` is factually stale** — says Education and Retail demos are "coming soon" (both live for weeks); no mention of Corewell Trade or `/trade`. | 🟡 Medium | `public/llms.txt`. |
| F10 | **No analytics.** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` unset, so the script never renders. | 🟠 High | `app/layout.tsx` — conditional render is correct; the var is simply absent. Every optimisation below is unmeasured without it. |
| F11 | **No lead capture at the two highest-intent surfaces.** The AI consultant cannot take an email; the four demos cannot either. | 🟠 High | `components/consultant/ConsultantWidget.tsx`; `grep -rn "email" components/demo/*.tsx` returns only prose. |
| F12 | **Form submissions have no persistence.** A Resend failure loses the lead with no record anywhere. | 🟠 High | `app/api/consult-request/route.ts` → returns 502 and stores nothing. |
| F13 | **Rate limiting is per-instance in-memory**, so on Vercel's serverless model it is close to no limit across instances. Unbounded Gemini spend is possible. | 🟡 Medium | `lib/rate-limit.ts` — `Map` in module scope. |
| F14 | **Form fields lack `autoComplete`** (WCAG 2.1 AA, SC 1.3.5 Identify Input Purpose). Industry/budget selects have no empty first option, so every submission carries a value the user may never have chosen. | 🟡 Medium | `components/consult/ConsultForm.tsx:75,79,89,…` |
| F15 | **Title lengths exceed SERP truncation.** The `%s — Corewell Systems` template pushes article titles to ~84 chars. | 🟢 Low | e.g. *"Custom Software vs. Off-the-Shelf: How to Decide for Your Business — Corewell Systems"*. |
| F16 | **One shared OG image** for the entire site. | 🟢 Low | `app/opengraph-image.tsx` only. |
| F17 | **Homepage section order deprioritises the converting assets.** Process (undifferentiated) sits above DemoStrip and Proof. | 🟠 High | `app/page.tsx` — Hero → IndustryMorph → Process → DemoStrip → Proof → Testimonials → Insights → CTA. |
| F18 | **The H1 carries no vertical, outcome or target term.** | 🟠 High | `components/home/Hero.tsx` — *"Engineering software that powers modern businesses."* |
| F19 | Unused asset `app/c_logo.png` (184 kB); `public/media/cta-loop.mp4` is 2.87 MB. | 🟢 Low | Only `c_logo-withoutbg.png` is imported. The video is well-gated (see §4). |
| F20 | **Ten files of copy improvements uncommitted** in the working tree. | 🟡 Medium | `git diff --stat` — 10 files, all copy quality improvements. Build and typecheck are clean with them applied. |

### What is already correct — do not "fix" these

- `npx tsc --noEmit` clean · `npx next lint` clean · `npm run build` exit 0 across 48 pages.
- First Load JS 137–154 kB; live TTFB 0.20s; 12.5 kB compressed HTML.
- **`components/home/CtaBandVideo.tsx` is exemplary** — three gates (viewport
  width, `prefers-reduced-motion`, IntersectionObserver at `rootMargin: 100%`),
  `muted`/`playsInline`/`aria-hidden`/`tabIndex={-1}`, fades in on `canplay`.
  Leave it alone.
- Heading hierarchy: exactly one `<h1>` per page across all pages sampled.
- Decorative images correctly carry `alt=""`; `/trade` screenshots carry real alt text.
- `next/image` used correctly on `/trade` with `sizes` and `priority`.
- Mobile nav has `aria-expanded`, `aria-controls`, toggling `aria-label`.
- Consultant widget has `role="log"`, `aria-live="polite"`, labelled input.
- Demos use real `<button>` elements for interaction (keyboard-accessible).
- Colour contrast passes WCAG AA: `--color-faint` `#79716B` on `#FAF9F6` = **4.55:1**.
- `lib/testimonials.ts` empty-by-design with a component that renders nothing —
  this is the correct pattern, and `P1-T2` should copy it.
- Internal linking to `/trade` works (verified live: 2 links each from the POS
  article and `/industries/retail`).
- Both API routes validate input, rate-limit, keep keys server-side, store
  nothing; the consult form has a honeypot.
- `/trade` correctly withholds `SoftwareApplication` schema (backend not live).
- `/pricing` correctly `noindex` and withheld from the sitemap.

---

## 4. Best-practice baseline

What "correct" means for each area, with the source that establishes it. Use
these as the standard, not personal preference.

| Area | Best practice (2026) | Source | Repo status |
|---|---|---|---|
| Canonical URLs | *"Canonical metadata is inherited down the tree: set it per route, never once in the root layout."* Relative strings resolved by `metadataBase`. | Next.js metadata docs; multiple App Router SEO guides | ❌ F1 |
| Host canonicalisation | One host. Declared identity (canonical, sitemap, robots, JSON-LD `@id`) must equal served host. | Google Search Central | ❌ F3 |
| Article markup | `Article`/`BlogPosting` with `headline`, `author`, `datePublished`, `dateModified`, `publisher`, `mainEntityOfPage`. | schema.org / Google structured data guidelines | ❌ F4 |
| **FAQ schema** | **Google deprecated FAQ rich results on 2026-05-07**; the search-appearance filter, rich-result report and Rich Results Test support were removed in June. FAQPage remains a valid schema.org type, is still crawled by Bingbot / PerplexityBot / RAG crawlers, and is harmless to keep — **but it is no longer a Google SERP lever.** | Google developer docs deprecation notice, May 2026 | ⚠️ The site's whole schema investment is FAQPage (47 FAQs). Keep it; **stop treating it as the strategy** and shift new effort to `Article`, `BreadcrumbList`, `Service`, `Organization`. |
| Sitemap | `lastmod` is the field Google uses; `changefreq` and `priority` are largely ignored. | Google Search Central | ❌ F6 |
| Core Web Vitals | LCP ≤ 2.5s · **INP ≤ 200ms** · CLS ≤ 0.1, at the 75th percentile of field data. INP is the most-failed metric (43% of sites). | web.dev / CrUX 2026 | ⚠️ No field data — F10 blocks measurement |
| Security headers | CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, frame protection as baseline. | OWASP Secure Headers | ❌ F8 |
| Forms | `autocomplete` tokens on identity fields (WCAG 2.1 AA SC 1.3.5); programmatic label association; explicit unselected state on optional selects. | WCAG 2.1/2.2 | ⚠️ Labels correct (implicit wrapping); F14 outstanding |
| `llms.txt` | **Does not work.** Ahrefs across 137,000 sites: 97% received zero traffic in May 2026. Three studies across 300K+ domains: no citation impact. Google confirmed no support. Anthropic supports it; Perplexity retrieves it; neither yields measurable lift. | Ahrefs; matched-pair study of 2,400 domains / 8 engines / 90 days | ⚠️ Keep (zero cost) but **stop counting it as an entity defence**; fix its factual errors (F9) |
| Entity disambiguation | Stable `@id` Organization node ✅ · consistent `sameAs` ✅ · category-first `disambiguatingDescription` ✅ · **a real Wikidata item with P1889 "different from"** ❌ · **co-occurrence with category-anchoring entities** ⚠️ partial | Entity-SEO literature, 2026 | Two of four levers missing — see §7 |
| AI-answer visibility | 86% of citations come from brand-controlled sources: first-party sites (44%) + **business listings (42%)**. 51% of B2B tech brands have zero citations. ~15 domains (Reddit, Wikipedia, YouTube, LinkedIn, Forbes) account for ~68% of all citations. | Yext citation study; Everything-PR AI Citation Source Index (680M citations, 6 studies) | First-party ✅ · listings ❌ 0 — see §7 |
| Content that gets cited | Fully answers one specific question in one page ✅ · **contains research, surveys, experiments or proprietary data found nowhere else** ❌ | 252,000-trial LLM citation study; GEO research | The highest-upside gap, and nobody in the competitor set is doing it |
| Interactive demos | Demo engagers convert at **24.35% vs 3.05%**; companies with them close 23% faster; ~80% of the buying journey is asynchronous. | Walnut / Navattic / SaaSHero 2026 benchmarks | ✅ Four live — but F11 means none of that traffic is capturable |
| Social proof | Pages with credible social proof convert **12–34% higher**. Industry expertise (52%) has overtaken price (49%) as the top vendor-selection factor. | G2 2026 Buyer Behavior Report | ❌ Owner-blocked, §7 |

---

## 5. The work

### Phase 0 — Establish the baseline *(do this first, always)*

**`P0-T1` · Capture a pre-change snapshot**

```bash
cd "D:/Main/Agency"
mkdir -p .audit
git rev-parse HEAD > .audit/baseline-sha.txt
for p in "" industries/healthcare insights/how-much-does-a-custom-erp-system-cost technology trade about; do
  echo "/$p :: $(curl -s -L -m 25 --compressed "https://www.corewellsystems.com/$p" | grep -o 'rel="canonical" href="[^"]*"')"
done | tee .audit/canonical-before.txt
```

- **Acceptance:** `.audit/canonical-before.txt` shows `href="https://corewellsystems.com"` for at least four of the six.
- **Note:** `.audit/` is scratch. Add it to `.gitignore` in the same commit, or keep it out of git entirely. Do not commit audit scratch.

**`P0-T2` · Confirm a clean starting tree**

```bash
npx tsc --noEmit && npx next lint
```

- **Acceptance:** both exit 0. (They did at audit time, with the 10 uncommitted copy edits applied.)

**`P0-T3` · Land the pending copy edits (F20)**

The working tree holds 10 modified files, all copy quality improvements
(`app/about`, `app/case-studies/[slug]`, `app/how-we-work`, `app/technology`,
three case-study MDX files, one insight MDX, `lib/capabilities.ts`,
`lib/faqs.ts`). Review `git diff` to confirm they are copy-only, then commit.

- **Acceptance:** `git status --short` is clean; `npx tsc --noEmit` exits 0.
- **Guardrail:** if any hunk introduces a *claim* rather than rephrasing one, stop and flag it. These edits were reviewed as claim-neutral, but verify.

---

### Phase 1 — Critical defects 🔴

> Nothing later in this plan is worth anything until `P1-T1` ships. Every SEO,
> content and distribution action is currently being applied to pages that
> instruct Google to ignore them.

**`P1-T1` · Fix canonical inheritance (F1)**

1. **Remove** `alternates: { canonical: "/" }` from `app/layout.tsx:46`. Leave
   `metadataBase` in place — it is what resolves relative canonicals.
2. Add a self-referencing canonical to every route. `app/page.tsx` currently
   has **no `metadata` export at all** — it must gain one, or the homepage
   loses its canonical when the root-layout entry is removed.

| File | Canonical |
|---|---|
| `app/page.tsx` **(add a `metadata` export — none exists)** | `/` |
| `app/industries/page.tsx` | `/industries` |
| `app/industries/[slug]/page.tsx` (in `generateMetadata`) | `` `/industries/${params.slug}` `` |
| `app/industries/[slug]/demo/page.tsx` (in `generateMetadata`) | `` `/industries/${params.slug}/demo` `` |
| `app/solutions/page.tsx` | `/solutions` |
| `app/solutions/[slug]/page.tsx` (in `generateMetadata`) | `` `/solutions/${params.slug}` `` |
| `app/how-we-work/page.tsx` | `/how-we-work` |
| `app/technology/page.tsx` | `/technology` |
| `app/case-studies/page.tsx` | `/case-studies` |
| `app/case-studies/[slug]/page.tsx` (in `generateMetadata`) | `` `/case-studies/${params.slug}` `` |
| `app/insights/page.tsx` | `/insights` |
| `app/insights/[slug]/page.tsx` (in `generateMetadata`) | `` `/insights/${params.slug}` `` |
| `app/book-consultation/page.tsx` | `/book-consultation` |
| `app/pricing/page.tsx` | `/pricing` (keep `robots: { index: false, follow: false }`) |
| `app/about/page.tsx` | already correct — leave |
| `app/trade/page.tsx` | already correct — leave |

Use **relative** strings (`"/technology"`, not the absolute URL) so
`metadataBase` resolves them and a host change stays a one-line edit.

- **Verify:**
  ```bash
  rm -rf .next && npm run build
  for f in .next/server/app/index.html .next/server/app/technology.html \
           .next/server/app/industries/healthcare.html \
           .next/server/app/insights/how-much-does-a-custom-erp-system-cost.html \
           .next/server/app/case-studies/connected-clinic-network.html \
           .next/server/app/solutions/ai-automation.html; do
    echo "$f :: $(grep -o 'rel="canonical" href="[^"]*"' "$f")"
  done
  ```
- **Acceptance:** every path prints a canonical **matching its own path**, and no two differ only by pointing at `/`. (Locally the host will read `http://localhost:3000` because `.env.local` overrides `NEXT_PUBLIC_SITE_URL` — that is expected; check the **path**.)
- **Risk:** low. Purely additive metadata. Reversible in one commit.

**`P1-T2` · Remove the live `[PLACEHOLDER]` block (F2)**

`app/industries/[slug]/page.tsx:329`, the section headed *"Proof, not
promises"*.

Correct behaviour: render the matching case study where one exists, render
nothing where none does. Case studies carry an `industry` slug
(`lib/content.ts` → `CaseStudyMeta.industry`), so they can be looked up by
industry. Existing mappings: healthcare → `connected-clinic-network`,
hospitality → `boutique-hotel-group`, retail → `regional-retail-chain`.
Education, construction-real-estate and legal-professional-services have none.

Follow the `Testimonials.tsx` pattern — the section renders nothing when there
is nothing true to put in it.

- **Constraint:** do **not** write a substitute proof paragraph. §2 rule 3. A missing section is correct; an invented one is not.
- **Verify:**
  ```bash
  rm -rf .next && npm run build
  grep -rl "PLACEHOLDER" .next/server/app/ || echo "CLEAN — no placeholders in build output"
  ```
- **Acceptance:** prints `CLEAN`. Also confirm the three industries *with* a study now link to it, and the three without render no empty section shell (no orphan heading, no stray border).

**`P1-T3` · Resolve apex vs www (F3)**

The site serves from `www.corewellsystems.com`; everything declares the apex.
Two valid resolutions — **pick one and make all five surfaces agree**:

- **Option A (recommended, no DNS work):** change `lib/site.ts` `siteUrl`
  fallback to `https://www.corewellsystems.com`. Canonicals, sitemap,
  `robots.txt` and JSON-LD `@id` all follow automatically because they derive
  from `siteUrl`. Zero infrastructure change.
- **Option B:** change the Vercel domain config so the apex is primary and
  `www` redirects to it. Leaves code untouched but needs dashboard access.

Option A is a one-line code change and is the default unless the owner states
a preference for the bare apex.

- **Surfaces that must agree:** `lib/site.ts` `siteUrl` · every canonical (inherits) · `app/sitemap.ts` (inherits) · `app/robots.ts` sitemap line (inherits) · Organization + WebSite JSON-LD `@id`/`url` in `app/layout.tsx` (inherits).
- **Verify:**
  ```bash
  curl -s -o /dev/null -L -m 25 -w "final=%{url_effective} redirects=%{num_redirects}\n" https://corewellsystems.com/
  ```
  and after deploy, confirm sitemap URLs return `200` directly rather than `308`.
- **Acceptance:** `grep -rn "corewellsystems.com" lib/ app/ --include="*.ts*"` shows one host form only.
- **Note for the owner:** Search Console is a *domain property*, so it already covers both hosts — no re-verification needed. The sitemap does need resubmitting.

**`P1-T4` · Fix the duplicated word in the retail title (F5)**

`app/industries/[slug]/page.tsx:36` builds `` `${industry.name} Management Software` ``. `lib/industries.ts:149` sets `name: "Retail & Shop Management"`.

Prefer an explicit optional `metaTitle` (or `titleNoun`) field on the
`Industry` type over string-munging the name — string surgery will break again
the next time an industry is named with a trailing noun.

- **Verify:**
  ```bash
  grep -o '<title>[^<]*</title>' .next/server/app/industries/retail.html
  ```
- **Acceptance:** no doubled word. Check the other six industry titles are unregressed in the same command loop.

**`P1-T5` · Enable analytics (F10)**

`app/layout.tsx` already renders the Plausible script conditionally on
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. The code is correct; the variable is absent.

- **Owner-blocked** on the Plausible account/domain. Prepare `.env.example` documentation and the Vercel env-var instructions, then **stop and ask**.
- **Do not** substitute a different analytics provider without asking. A third-party script is a privacy and CSP decision, not an implementation detail.

**Phase 1 definition of done**

```bash
npx tsc --noEmit && npx next lint && rm -rf .next && npm run build
grep -rl "PLACEHOLDER" .next/server/app/ || echo "no placeholders"
```
…all clean, canonicals self-reference, one host form in the codebase, no
doubled title. **Then hand back for a deploy decision** and, after deploy,
request re-indexing in Search Console for the top 15 URLs. Expect two to three
weeks before judging any downstream effect.

---

### Phase 2 — Structured data and technical SEO 🟠

**`P2-T1` · Add `Article` schema to insights (F4)**

In `app/insights/[slug]/page.tsx`, alongside the existing `FAQPage` node, emit
`Article` (or `BlogPosting`) with: `headline`, `description`,
`datePublished`, `dateModified`, `author` → `{ "@id": siteUrl + "/#organization" }`,
`publisher` → same `@id`, `mainEntityOfPage` → the article URL, `inLanguage`.

- **Author must be the Organization**, never a person — §2 rule 1.
- Reuse the `@id` from the root layout's Organization node so the graph joins
  up rather than creating a second, unlinked entity.

**`P2-T2` · Add `dateModified` to content (F6, prerequisite for `P2-T1`)**

Add an optional `dateModified` field to `InsightMeta` and `CaseStudyMeta` in
`lib/content.ts`, plumbed from MDX frontmatter, falling back to `date` when
absent. Then add `dateModified` to the frontmatter of any file whose content
has materially changed — including the article edited in `P0-T3`.

- **Guardrail:** do not backfill `dateModified` with today's date across all ten articles to manufacture freshness. Set it only where the content actually changed. Fake freshness signals are the same class of error as fake metrics.

**`P2-T3` · Add schema to case studies (F4)**

`app/case-studies/[slug]/page.tsx` currently emits nothing page-specific.

- For `illustrative: true` studies, `Article` is the honest type — they are
  written explanations, not verified reports. Do **not** use `Review`,
  `CaseStudy`-flavoured `CreativeWork` with outcome claims, or anything
  implying a measured client result.
- Keep the visible "Illustrative scenario — sample data" badge exactly as is.

**`P2-T4` · Add `lastmod` to the sitemap (F6)**

`app/sitemap.ts` — add `lastModified` per route, sourced from
`dateModified ?? date` for MDX routes and from a sensible static value for
fixed pages. Consider dropping `changeFrequency` and `priority` in the same
change; Google has said it largely ignores both, and they are currently the
only signals present.

**`P2-T5` · Add `BreadcrumbList` site-wide (F7)**

`/trade` already has a working implementation — copy its shape. Apply to
`/industries/[slug]`, `/industries/[slug]/demo`, `/solutions/[slug]`,
`/insights/[slug]`, `/case-studies/[slug]`.

**`P2-T6` · Shorten SERP-truncating titles (F15)**

The `%s — Corewell Systems` template in `app/layout.tsx` pushes article titles
to ~84 characters. Either shorten the suffix, or give long-titled articles an
explicit shorter `title` in `generateMetadata` while the `<h1>` keeps the full
question (the H1 is the GEO/AEO answer target and should not be shortened).

**`P2-T7` · Correct `llms.txt` (F9)**

`public/llms.txt` claims Education and Retail demos are "coming soon" — both
have been live for weeks — and never mentions Corewell Trade or `/trade`.

- Fix the factual errors and add Trade with its correct maturity label.
- Keep the file. It costs nothing.
- **Do not expand the effort here.** Per §4 it does not affect AI citations;
  this task is about the site not stating false things about itself, which is a
  §2 rule-3 issue, not an SEO one.

**Phase 2 verify**

```bash
rm -rf .next && npm run build
for f in .next/server/app/insights/how-much-does-a-custom-erp-system-cost.html \
         .next/server/app/case-studies/connected-clinic-network.html; do
  echo "--- $f"; grep -o '"@type":"[A-Za-z]*"' "$f" | sort | uniq -c | sort -rn
done
grep -o '<lastmod>[^<]*</lastmod>' .next/server/app/sitemap.xml* 2>/dev/null | head
```
- **Acceptance:** articles show `Article` + `FAQPage` + `BreadcrumbList`; case studies show `Article` + `BreadcrumbList`; sitemap contains `lastmod`. Paste each page's JSON-LD through a schema validator before considering the phase done.

---

### Phase 3 — Security and hygiene 🟡

**`P3-T1` · Add security response headers (F8)**

`next.config.mjs` is five lines. Add a `headers()` block:

- `Content-Security-Policy` — must allow: `plausible.io` (script + connect),
  `fonts.googleapis.com` / `fonts.gstatic.com` (next/font self-hosts, so verify
  before allowing), Cal.com embed (`app.cal.com` — frame + script), and
  `generativelanguage.googleapis.com` is server-side only so it does **not**
  belong in a browser CSP.
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — deny camera, microphone, geolocation, payment.
- Frame protection via CSP `frame-ancestors` (preferred over `X-Frame-Options`).

- **Critical:** ship CSP in `Content-Security-Policy-Report-Only` first, load
  every page including `/book-consultation` (Cal.com embed) and a demo, check
  the console for violations, and only then switch to enforcing. A CSP that
  breaks the booking embed costs more than it protects.
- **Verify:** `curl -s -I -L https://www.corewellsystems.com/ | grep -i "content-security\|x-content-type\|referrer-policy\|permissions-policy"` after deploy.

**`P3-T2` · Harden rate limiting (F13)**

`lib/rate-limit.ts` is a module-scope `Map`, so each Vercel instance has its
own window — effectively no limit under concurrency, and the Gemini route is
metered spend.

Options in increasing order of effort: a hard per-day request ceiling in the
route; Vercel KV / Upstash Redis for a shared window; Vercel's own rate
limiting. At current traffic the exposure is small — but it is unbounded, which
is the wrong shape for a spend risk. Ask before adding a paid dependency.

**`P3-T3` · Form accessibility and data quality (F14)**

`components/consult/ConsultForm.tsx`:
- `autoComplete="name"` / `"email"` / `"organization"` on the respective inputs (WCAG 2.1 AA SC 1.3.5).
- Give the Industry and Budget selects an explicit unselected first option
  (e.g. `<option value="">Select…</option>`) so a submission never carries a
  value the user did not choose.
- Add `aria-invalid` + an `aria-describedby` error region on failed submit
  rather than relying solely on native validation.
- Labels are already correctly associated (implicit wrapping) — leave them.

**`P3-T4` · Asset cleanup (F19)**

Delete `app/c_logo.png` if nothing imports it (`grep -rn "c_logo\.png" app components lib` — only `c_logo-withoutbg.png` should appear). Leave `cta-loop.mp4`; `CtaBandVideo` already gates it correctly.

---

### Phase 4 — Conversion instrumentation 🟠

> Do `P1-T5` (analytics) first if the owner has supplied the domain. Shipping
> conversion changes with no measurement means you will not know if they worked.

**`P4-T1` · Lead capture in the AI consultant (F11)**

`components/consultant/ConsultantWidget.tsx`. The highest-intent visitors on
the site are in an open text channel with no way to leave contact details.

- After a substantive exchange (suggest: ≥3 user turns, or when the model has
  offered the consultation), surface an optional inline email field — *"Want
  this summarised and sent to you?"* — not a modal, not a gate. **The demo and
  the chat must remain fully usable without giving an email.** Gating them
  would contradict the site's central promise ("no signup, no sales call").
- Reuse `/api/consult-request` or add a sibling route. Same validation,
  honeypot and rate-limit treatment.
- The system prompt in `lib/consultant-prompt.ts` needs a matching rule so the
  assistant's behaviour and the UI agree. That file is the assistant's entire
  world model — anything the site does that is not written there is not
  sayable.

**`P4-T2` · Lead capture on demo exit (F11)**

The four demos in `components/demo/` have no capture surface. Add a
non-blocking one — an end-of-flow card, or a dismissible bar after N
interactions. Same rule: never gate the demo.

**`P4-T3` · Persist form submissions (F12)**

`app/api/consult-request/route.ts` returns 502 and stores nothing when Resend
fails. A lead can be lost silently.

Add durable capture before the send attempt — Vercel KV, a Google Sheet via a
service account, or a second delivery channel. Failing that, at minimum log the
payload server-side so it is recoverable from Vercel logs.

- **Privacy constraint:** this stores personal data. Keep it out of the public
  repo, keep credentials in env vars, and mention retention to the owner before
  choosing a store.

**`P4-T4` · Reorder the homepage (F17)**

`app/page.tsx` — move `DemoStrip` and `ProofSection` above `ProcessSection`:

```
Hero → IndustryMorph → DemoStrip → ProofSection → ProcessSection
     → Testimonials → InsightsPreview → CtaBand
```

Rationale: demo engagers convert at 24.35% vs 3.05%; process is the least
differentiated section on the page (every agency has four steps). Check the
alternating section backgrounds still alternate after the swap —
`ProofSection` carries `border-y` + `bg-canvas-subtle` and will now sit next to
different neighbours.

**`P4-T5` · Rewrite the H1 (F18)**

`components/home/Hero.tsx` — *"Engineering software that powers modern
businesses."* carries no vertical, no outcome and no target term, on a site
whose two structural problems are an entity collision and invisibility in
buyer-intent search.

- The raw material is already three lines below it: four working systems,
  openable without signup, in clinics and hotels.
- **Owner-review item.** Draft two or three options, keep them within voice
  (§2 rules 3, 7, 8 — no metrics, no tech in the headline, no geography), and
  present them rather than shipping unilaterally. Headline copy is the owner's
  call.

---

### Phase 5 — Content 🟢 *(only after Phase 1 has been live two to three weeks)*

Publishing more content onto pages that de-index themselves wastes it. Wait for
`P1-T1` to take effect.

**`P5-T1` · The Ring 2 comparison cluster** — the direct attack on the "buy"
option. One article per category:
- practice-management subscriptions vs owning a clinic system (Jane ~CAD $54–99/practitioner/mo; SimplePractice $49–99; a five-practitioner clinic pays $12,000+/yr)
- hotel PMS per-room pricing vs a group platform (Cloudbeds ~$15/room/mo; Mews ~$17; Little Hotelier $39/mo + 1% of bookings)
- the subscription-stack maths for a distributor

Each must end on the honest answer — **sometimes buying is right** — which the
"We say no when it's the right answer" principle on `/about` already commits
to, and which is what makes the rest credible.

**`P5-T2` · The Ring 4 cluster** — currently unclaimed territory, and credible
only from someone running production systems:
- what vibe-coded software gets wrong once real people depend on it
- a "we rebuild the prototype you shipped" service line

Citable public facts: Replit's agent deleted a live production database during
a code freeze and misreported it (July 2025); security testing of apps from
Lovable's **own showcase** found exposed Supabase endpoints, missing row-level
security and client-side auth bypasses letting testers self-upgrade to paid; 16
vulnerabilities logged in 30 days, with the same weaknesses noted in Bolt and
Replit; Replit holds SOC 2 Type II, Bolt and Lovable do not (early 2026).

- **Tone constraint:** this is analysis, not a hit piece. The market's own
  settled boundary — AI builders for prototypes and non-regulated MVPs, a firm
  once people depend on it operationally — is the honest framing and happens to
  be the favourable one.

**`P5-T3` · Answer the "90% of custom fit" objection** — the strongest line
Ring 2 has, unanswered anywhere on the site. Honest answer: the missing 10% is
where the operation actually differs, and the question is whether that 10% is a
spreadsheet workaround or a real cost. This belongs on
`/insights/custom-software-vs-off-the-shelf` and on `/solutions`.

**`P5-T4` · Per-article OG images (F16)** — one shared image for 43 pages.
Generate per-article cards from the existing `app/opengraph-image.tsx`
machinery.

---

## 6. Verification cookbook

```bash
# Full local gate — run before every commit
npx tsc --noEmit && npx next lint

# Clean production build (stop any dev server first)
rm -rf .next && npm run build

# Canonicals across the built output
for f in $(find .next/server/app -name "*.html" | sort); do
  echo "$(echo $f | sed 's|.next/server/app||') :: $(grep -o 'rel="canonical" href="[^"]*"' "$f")"
done

# JSON-LD inventory for one page
grep -o '"@type":"[A-Za-z]*"' .next/server/app/insights/SLUG.html | sort | uniq -c | sort -rn

# Title tags across the built output
for f in $(find .next/server/app -name "*.html" | sort); do
  echo "$(basename $f) :: $(grep -o '<title>[^<]*</title>' "$f" | head -1 | sed 's/<[^>]*>//g')"
done

# Live production checks (read-only)
curl -s -L -m 25 --compressed https://www.corewellsystems.com/PATH | grep -o 'rel="canonical" href="[^"]*"'
curl -s -I -L -m 25 https://www.corewellsystems.com/ | grep -iE "content-security|x-frame|x-content-type|referrer-policy|permissions-policy"
curl -s -o /dev/null -L -m 30 -w "size=%{size_download} ttfb=%{time_starttransfer}s\n" --compressed https://www.corewellsystems.com/

# Placeholder leak check
grep -rl "PLACEHOLDER" .next/server/app/ || echo "clean"

# Secret leak check before any commit
git diff --cached | grep -iE "api[_-]?key|secret|password|Bearer " && echo "STOP — possible secret" || echo "clean"
```

**Known environment gotchas** (from `CONTEXT.md` §10 — these have cost real time before):

- Stop the dev server before `npm run build`; running both corrupts `.next`.
- `.env.local` sets `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, so locally
  built canonicals show `localhost`. **Check the path, not the host.**
- The in-app browser pane reports `viewport 0x0` when hidden — call
  `resize_window` with explicit dimensions before measuring anything.
- Hidden panes suspend `requestAnimationFrame` (Framer freezes) and throttle
  `setTimeout`. Verify interactive state via `aria-*` and computed styles, and
  use `MessageChannel` ticks to await React renders.
- Labels styled `uppercase` return uppercase from `innerText` — case-sensitive
  assertions give false negatives.

---

## 7. Do not attempt — owner-blocked

Stop and ask. Do not work around any of these, and do not substitute invented
content for a missing fact.

| Item | Why blocked | What is needed |
|---|---|---|
| Publish `/pricing` | Ranges await sign-off. Also structurally blocked: `components/layout/NavBar.tsx` documents that the row already needs ~1130px of the 1176px available — adding "Pricing" back overflows it (this was the bug fixed in `eead461`). Publishing needs a nav decision, not just un-hiding a link. | Owner sign-off on $8–25k / $25–80k / scoped, plus a decision on what leaves the nav |
| Populate `lib/testimonials.ts` | §2 rule 3. It is also the single easiest claim on a website to disprove. | One real, permissioned quote |
| Set `illustrative: false` on any case study | Same rule. | Real anonymised facts: go-live year, whether multi-location is real, one true non-identifying outcome |
| Corewell Trade backend | 14 days past its own estimate; `myprojects/Sales Softwaer/corewell-trade` has no `api`/`server`/`prisma` directory. `/trade` is published as product marketing, which `CONTEXT.md` records was meant to happen *after* the backend shipped. | Owner decision: build it, or reframe `/trade` now. Drifting is the only option that costs credibility without buying anything |
| Move retail/education off `design` maturity | §2 rule 4. The label is driven by reality, not by marketing need. | A deployed installation |
| Clutch / GoodFirms / DesignRush / G2 profiles | 42% of AI citations come from business listings; Corewell has zero. This is the cheapest available fix for both the entity collision and AI invisibility — but it is an off-site account action. | Owner to create accounts; ideally one referenceable client |
| Wikidata item with P1889 "different from" → Corewell Health | The one entity-disambiguation lever that lives off-site and does not require naming a competitor in your own copy. Currently the site only references the generic Q1058914 "software company" as `additionalType`. | Owner decision; Wikidata notability rules apply |
| Plausible (`P1-T5`) | Env var absent. | Domain added at plausible.io |
| Retainer / recurring-revenue offer | A pricing and business-model decision. Market shape: hybrid fixed-build + monthly retainer is the 2026 default; SMB retainers run $500–2,000/mo. | Owner decision |
| `clinic.corewellsystems.com` healthcare replica | Would fix the inverted demo strategy — the `production` vertical currently has the weakest demo while the `design` vertical has the flagship. Plan exists at `docs/healthcare-demo-plan.md`. | Owner to confirm ownership of the source codebase first |
| Proprietary research (benchmark, survey, dataset) | The highest-weighted factor in AI citation selection, and nobody in the competitor set is doing it. But it requires real data. | Owner input on what can honestly be measured and published |

---

## 8. Definition of done

**Phase 1 (the phase that matters):**
- [ ] Every route emits a self-referencing canonical; verified in built output and, after deploy, live on five URLs.
- [ ] Zero `PLACEHOLDER` strings in build output; the three industries without a case study render no orphan section.
- [ ] One host form across `lib/`, `app/`, sitemap, robots and JSON-LD; sitemap URLs return `200`, not `308`.
- [ ] No duplicated word in any title tag.
- [ ] `tsc`, `lint` and `build` all clean; ten copy edits committed.
- [ ] Sitemap resubmitted and re-indexing requested for the top 15 URLs.

**Phases 2–4:**
- [ ] Articles carry `Article` + `FAQPage` + `BreadcrumbList`; case studies carry `Article` + `BreadcrumbList`; all validate.
- [ ] Sitemap carries `lastmod`, sourced from real modification dates only.
- [ ] Security headers present on live responses; CSP enforced only after a clean report-only pass covering `/book-consultation` and a demo.
- [ ] `llms.txt` states nothing false.
- [ ] A lead can be captured from the consultant and from a demo, without either being gated.
- [ ] A form submission survives a Resend failure.
- [ ] Homepage leads with demos and proof.

**Overall:** the site tells the truth about itself, is indexable, is
measurable, and can capture a lead from its two strongest assets. Everything
beyond that is owner-blocked and listed in §7.

---

## 9. Reporting back

When you stop — finished, blocked, or out of scope — report:

1. **Tasks completed**, by ID, with the acceptance test output for each.
2. **Tasks skipped**, by ID, with the reason (already done / wrong / blocked).
3. **Anything found that this plan did not anticipate**, especially anything
   that contradicts §3. This audit was thorough but it was a point-in-time
   snapshot of 2026-08-20; the tree may have moved.
4. **A consolidated list of what is still needed from the owner** — this is a
   standing convention on this project, not a one-off. Include the §7 table
   items that became relevant during the work.

Do not report a phase as complete on the strength of the edits having been
applied. Report it on the strength of its acceptance tests having passed.
