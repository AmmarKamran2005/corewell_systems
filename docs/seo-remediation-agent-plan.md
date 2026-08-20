# SEO / GEO / AEO Remediation — Agent Execution Plan

**For:** an AI coding agent working in `D:\Main\Agency`
**Source of findings:** [`docs/seo-geo-aeo-audit.md`](seo-geo-aeo-audit.md)
**Authority documents:** `CONTEXT.md` (§2 rules, §4 maturity), `docs/spec.md`
**Created:** 2026-08-20

Work the tasks in order. Each has a goal, the exact files, an implementation
sketch, and a machine-checkable acceptance test. Do not start a phase until the
previous phase's acceptance tests pass.

---

## 0. Operating rules — read before touching anything

These override any generic SEO instinct. Breaking one damages the business more
than any ranking gain is worth.

1. **Never invent a fact.** No client counts, metrics, percentages, testimonials,
   outcomes, dates, or names. If a sentence needs a number you do not have, write
   the sentence without it, or leave `<!-- NEEDS: ... -->` and list it in your
   final report. This is `CONTEXT.md` §2 rule 3 and it is absolute.
2. **Company voice only.** No personal names, no author bios, no "meet the team".
   Article authorship attributes to the Organization. `CONTEXT.md` §2 rule 1.
3. **Respect maturity tiers.** `SoftwareApplication` schema emits only for
   `maturity === "production"` industries. Never label a design preview as live.
   `CONTEXT.md` §4.
4. **No geographic claims.** Do not add location pages, local SEO, city
   modifiers, or `LocalBusiness` schema. `CONTEXT.md` §2 rule 8.
5. **No fixed prices or timelines** in copy, schema, or machine-readable files.
6. **One primary CTA:** Book a Consultation. Any new page ends there.
7. **The repo is public.** No client names, no internal product names, nothing
   from `myprojects/` may enter a committed file.
8. **Do not touch `trade.corewellsystems.com`.** Its `robots.txt` is correct by
   design — only `/` and `/login` are indexable, every app screen is disallowed.
   Verified 2026-08-20.
9. **Verify before committing:** `npx tsc --noEmit`, then `npm run build`. Stop the
   dev server first — running dev and build together corrupts `.next`.
10. **Do not commit or push** unless explicitly asked. Report diffs instead.

---

## 1. Preflight

```bash
cd "D:/Main/Agency" && git status --short && npx tsc --noEmit && echo "TYPES OK"
```

Note the working tree already has uncommitted changes to eight content files and
four page files. Establish whether those are wanted before layering on top.

Capture a baseline so you can prove improvement later:

```bash
for p in / /insights /industries/healthcare /solutions/ai-automation /case-studies/regional-retail-chain; do printf "%-44s " "$p"; curl -sL --max-time 25 "https://corewellsystems.com$p" | grep -o '<link rel="canonical" href="[^"]*"'; done
```

Expected today: every line returns `href="https://corewellsystems.com"`.

---

## PHASE 1 — Unblock indexation

Nothing else in this plan pays off until Phase 1 is live. Do these three together;
shipping T2 while T1 is unresolved just produces correct-looking canonicals that
still resolve through a redirect.

### T1 — Settle the canonical host  🔴 blocks everything

**Problem:** `siteUrl` is the apex `https://corewellsystems.com`, but production
308-redirects apex → `www`. Every canonical, every sitemap entry, and the
`robots.txt` sitemap line therefore points at a redirecting host.

**This is an infrastructure decision, not a code one.** Two valid resolutions:

| Option | Action | Code change |
|---|---|---|
| **A (preferred)** | Flip the Vercel/DNS redirect to `www → apex` | None. `siteUrl`, sitemap, robots, llms.txt and CONTEXT.md §7 already say apex |
| **B** | Accept www as canonical | Change `siteUrl` in `lib/site.ts` to `https://www.corewellsystems.com`, update CONTEXT.md §7 |

**Recommend A** — it makes the live config match four files that already document
apex as canonical, and CONTEXT.md §7 records apex-canonical as the original intent,
so this is restoring a drifted setting rather than making a new choice.

**Ask the owner which, then act.** Do not guess.

**Acceptance:**
```bash
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://corewellsystems.com/insights
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.corewellsystems.com/insights
```
Exactly one host must return `200`; the other must `301`/`308` to it. That host must
equal `siteUrl`.

---

### T2 — Per-page canonicals  🔴 the single highest-impact fix

**Problem:** `app/layout.tsx:46` sets `alternates: { canonical: "/" }`, inherited by
every route. 30 of 32 URLs declare the homepage as canonical.

**Step 1 — add a helper.** New file `lib/seo.ts`:

```ts
import type { Metadata } from "next";

/**
 * Per-page canonical + og:url.
 *
 * The root layout must NOT set `alternates` — Next.js inherits it into every
 * child route, which previously made all 30 interior pages canonicalize to the
 * homepage. Every page owns its canonical instead.
 *
 * Paths are root-relative and resolved against `metadataBase`.
 */
export function canonical(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}`;
  return {
    alternates: { canonical: clean },
    openGraph: { url: clean },
  };
}
```

**Step 2 — remove the inherited canonical.** In `app/layout.tsx`, delete the
`alternates: { canonical: "/" }` line from the root `metadata` export. Leave
`metadataBase` in place.

**Step 3 — apply to every route.**

Static pages — spread `canonical(...)` into the existing `metadata` object:

| File | Path |
|---|---|
| `app/page.tsx` | `/` — has no `metadata` export today; add one |
| `app/industries/page.tsx` | `/industries` |
| `app/solutions/page.tsx` | `/solutions` |
| `app/how-we-work/page.tsx` | `/how-we-work` |
| `app/technology/page.tsx` | `/technology` |
| `app/case-studies/page.tsx` | `/case-studies` |
| `app/insights/page.tsx` | `/insights` |
| `app/about/page.tsx` | already correct — migrate to the helper for consistency |
| `app/book-consultation/page.tsx` | `/book-consultation` |
| `app/trade/page.tsx` | already correct — migrate to the helper |
| `app/pricing/page.tsx` | `/pricing` — keep `robots: { index: false }` |

Dynamic segments — add inside each `generateMetadata`:

| File | Path expression |
|---|---|
| `app/insights/[slug]/page.tsx` | `/insights/${params.slug}` |
| `app/case-studies/[slug]/page.tsx` | `/case-studies/${params.slug}` |
| `app/industries/[slug]/page.tsx` | `/industries/${params.slug}` |
| `app/industries/[slug]/demo/page.tsx` | `/industries/${params.slug}/demo` |
| `app/solutions/[slug]/page.tsx` | `/solutions/${params.slug}` |

Example:
```ts
return {
  title: insight.title,
  description: insight.description,
  keywords: insight.keywords,
  ...canonical(`/insights/${params.slug}`),
};
```

**Watch for:** the early-return `if (!insight) return {};` branches — leave those
alone, they precede `notFound()`.

**Acceptance:** run against a local build, then production after deploy. Every route
must self-canonicalize:
```bash
for p in / /industries /solutions /how-we-work /technology /case-studies /insights /trade /about /book-consultation /industries/healthcare /industries/healthcare/demo /solutions/ai-automation /insights/what-is-an-online-pos-system /case-studies/regional-retail-chain; do printf "%-44s " "$p"; curl -sL --max-time 25 "https://corewellsystems.com$p" | grep -o '<link rel="canonical" href="[^"]*"'; done
```
Zero lines may read `href="https://corewellsystems.com"` unless the path is `/`.

---

### T3 — Turn on measurement

Search Console is already verified (domain property, per `CONTEXT.md` §7) — do not
redo it. Missing:

1. **Plausible.** Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=corewellsystems.com` in Vercel
   env. The script in `app/layout.tsx:137` is already wired and renders
   conditionally — no code change.
2. **Bing Webmaster Tools.** Verify the site, submit the sitemap. Bing is Copilot's
   index; most sites skip it.
3. **IndexNow.** Enable in Bing Webmaster for faster recrawl after these fixes.

**Acceptance:** `curl -s https://corewellsystems.com/ | grep -c plausible` returns
`1`.

**After Phase 1 deploys:** resubmit the sitemap in Search Console and watch the
Coverage report. Expect "Alternate page with proper canonical tag" exclusions to
fall as pages get reindexed. Give it two to four weeks.

---

## PHASE 2 — Make the content citable

This is the GEO/AEO core. Every task here targets a documented citation lever.

### T4 — `Article` schema on insights

**File:** `app/insights/[slug]/page.tsx` — currently emits `FAQPage` only.

Add an `Article` node alongside it. Per `schema-examples` and
`platform-ranking-factors` (Perplexity looks for publication *and* modification
timestamps; schema is the biggest single lever for Google AI Overviews):

```ts
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: insight.title,
  description: insight.description,
  datePublished: insight.date,
  dateModified: insight.updated ?? insight.date,   // see T6
  // Company voice only (CONTEXT.md §2 rule 1) — the Organization is the author.
  author: { "@id": `${siteUrl}/#organization` },
  publisher: { "@id": `${siteUrl}/#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/insights/${insight.slug}`,
  },
  image: `${siteUrl}/opengraph-image`,
  inLanguage: "en",
};
```

`headline` must not exceed 110 characters — truncate for schema only, never the
visible H1.

**Acceptance:** the page emits `"@type":"Article"` with non-empty `datePublished`,
`dateModified`, `author`, and `publisher`. Validate one URL at
https://validator.schema.org/ — zero errors.

---

### T5 — Visible attribution, in company voice

**Files:** `app/insights/[slug]/page.tsx`, `app/case-studies/[slug]/page.tsx`

Add a byline beside the existing date line: **"By Corewell Systems"**.

Do **not** add a person, a bio, or a headshot. Do not create `/authors/`.

Where it can be said truthfully, add one standing line establishing first-hand
experience in company voice — something to the effect that the article draws on
systems the company has built and operates. **Confirm with the owner before
publishing any such claim**; do not assert operational experience the audit cannot
verify.

**Acceptance:** byline renders on all 10 insight pages and 3 case studies; grep for
personal names returns nothing.

---

### T6 — Freshness signals

Three coordinated changes. ChatGPT cites content updated within 30 days ~3.2× more
often (`platform-ranking-factors`), and the sitemap currently emits no `<lastmod>`
at all.

**a) Frontmatter.** Add an optional `updated: "YYYY-MM-DD"` to insight and
case-study frontmatter. Do **not** backfill it with invented dates — only set it
when a file is genuinely edited.

**b) `lib/content.ts`.** Add `updated?: string` to `InsightMeta` and
`CaseStudyMeta`; read `data.updated` in `getInsights`/`getInsight`/
`getCaseStudies`/`getCaseStudy`.

**c) Display.** Render "Last updated {formatDate(updated)}" beside the publish date
when `updated` exists and differs from `date`.

**d) `app/sitemap.ts`.** Populate `lastModified` for every URL:
- insights and case studies → `updated ?? date`
- static routes → the deploy date or the file's last git commit date

**Acceptance:**
```bash
curl -s https://corewellsystems.com/sitemap.xml | grep -c "<lastmod>"
```
must equal the URL count (39), not 0.

**Then adopt the refresh cadence** from `copy-editing/content-refresh`: comparison
content every 3–6 months, high-traffic posts every 6 months, evergreen annually.

---

### T7 — External citations  ⚠️ read the constraint

**The finding:** zero external citations and zero sourced statistics across all 13
content files. Princeton GEO ranks these #1 (+40%) and #2 (+37%).

**The hard limit:** `CONTEXT.md` §2 rule 3. **Do not generate statistics.** Do not
write "studies show" without a study. Do not invent a source to satisfy this task.

**What you may do:**

1. **Cite named external authorities for market-level claims only.** Software
   maintenance-cost ratios, ERP implementation failure rates, per-seat licensing
   trends — these are published by identifiable organisations. Find the real
   source, link it, name it, date it. If you cannot find a real source for a claim,
   leave the claim qualified exactly as it is.
2. **Flag first-party figures for owner confirmation.** Where a number would come
   from Corewell's own delivery experience, add
   `<!-- NEEDS OWNER: confirm figure + date -->` and list it in your report. Do not
   publish it until confirmed.

Existing hedged phrasing like "commonly estimated at roughly 15–20%" is honest and
should stay hedged until it has a source. Adding a real citation to it is the win;
hardening it into a false precision is the failure mode.

**Acceptance:** every new numeric claim has a named, linked, dated source. Report a
list of every `NEEDS OWNER` marker added.

---

## PHASE 3 — Connect the site to itself

### T8 — Breadcrumbs + `BreadcrumbList`

Do this before T9 — `site-architecture` calls breadcrumbs "free internal links on
every page", so it is also the cheapest partial fix for the link-density problem.

**New file:** `components/Breadcrumbs.tsx` — a server component taking
`{ trail: { name: string; href: string }[] }`, rendering a `<nav aria-label="Breadcrumb">`
with an ordered list (last item unlinked, `aria-current="page"`) and emitting
`BreadcrumbList` JSON-LD.

Copy the schema shape already proven in `app/trade/page.tsx:64-82`.

**Apply to five templates**, mirroring the URL path:

| Template | Trail |
|---|---|
| `insights/[slug]` | Home → Insights → {title} |
| `case-studies/[slug]` | Home → Case Studies → {title} |
| `industries/[slug]` | Home → Industries → {name} |
| `industries/[slug]/demo` | Home → Industries → {name} → Demo |
| `solutions/[slug]` | Home → Solutions → {name} |

Replace the existing "← All insights" / "← All case studies" back-links with the
breadcrumb trail — do not keep both.

Refactor `/trade` to use the new component so there is one implementation.

**Acceptance:** all five templates emit `"@type":"BreadcrumbList"`; visible trail
matches the URL path; `/trade` still validates.

---

### T9 — Contextual internal linking  🟠 largest content gap

**Measured:** 0.0–0.8 links per 1,000 words against `site-architecture`'s 5–10
target. Five internal links exist across 13,155 words of insight content, all
pointing at `/trade`.

**Target:** at least 5 per 1,000 words — roughly 7 contextual links in a
1,400-word article.

**a) Model to copy.** `app/trade/page.tsx:21-45` already defines a
`relatedReading` array and renders it. Generalise that into
`components/RelatedReading.tsx`.

**b) Map the clusters first.** Do not guess. Build the map from existing data:
industry slug on each case study (`content.ts`), the keyword arrays in insight
frontmatter, and `lib/solutions.ts` `appliesTo`. Write the map to
`lib/related.ts` as explicit data — not inferred at runtime — so it is reviewable.

Natural clusters visible today:
- **ERP / POS / distribution:** the five articles already linking to `/trade`, plus
  `/industries/retail`, `/trade`, `case-studies/regional-retail-chain`
- **Healthcare:** `how-much-does-custom-healthcare-software-cost`,
  `what-features-does-a-clinic-management-system-need`, `/industries/healthcare`,
  `case-studies/connected-clinic-network`
- **Hospitality:** `hotel-management-software-features-that-actually-matter`,
  `/industries/hospitality`, `case-studies/boutique-hotel-group`
- **Build-vs-buy (cross-cutting):** `custom-software-vs-off-the-shelf`,
  `what-does-owning-custom-software-actually-save-you`,
  `odoo-alternatives-when-custom-erp-makes-sense`

**c) Add links in three directions:**
1. **In-body contextual links** inside the MDX, on descriptive anchor text. Never
   "read more" or "click here". This is where most of the density must come from.
2. **Related-reading blocks** on industry, solution, and case-study pages — these
   currently link to zero articles.
3. **Reciprocal links** from each article back to its industry page.

**Acceptance:**
```bash
for f in content/insights/*.mdx; do w=$(wc -w < $f); l=$(grep -o "](/[a-z0-9/-]*)" $f | wc -l); printf "%-56s %.1f/1k\n" "$(basename $f .mdx)" "$(awk "BEGIN{print $l/$w*1000}")"; done
```
Every article ≥ 5.0/1k. Plus: every industry and solution page links to ≥ 2
articles; no broken internal links (`npm run build` will catch bad `next/link`
targets, but MDX links need a manual sweep).

---

### T10 — Comparison tables

Only 2 of 10 articles contain a table. `content-patterns` is explicit that tables
beat prose for comparison content, and comparison articles are the single
most-cited content type (~33% of AI citations).

**Priority order:**
1. `custom-software-vs-off-the-shelf` — a directly comparative article with **no
   comparison table**. Highest value in the set.
2. `odoo-alternatives-when-custom-erp-makes-sense`
3. `what-does-owning-custom-software-actually-save-you`
4. `hotel-management-software-features-that-actually-matter` — features that matter
   vs. features that are overrated is already the article's structure

Use the Comparison Table Block pattern: criteria in the left column, honest
assessments across, a "Best for" row, and a bottom-line sentence.

**Constraint:** be genuinely balanced. `competitors` is explicit that obviously
biased comparisons get penalised by AI systems and disbelieved by readers who are
mid-evaluation. Where off-the-shelf genuinely wins, say so.

`remark-gfm` is already configured, so GFM tables render without changes.

**Acceptance:** `grep -c "^|" content/insights/*.mdx` shows ≥ 4 rows in at least 6
of 10 articles.

---

## PHASE 4 — Trust, precision, depth

### T11 — Privacy policy and terms  ⚠️ needs owner/legal input

No `/privacy`, `/terms`, or `/legal` exists, while the site runs a consultation form
and a Gemini-backed AI widget that both accept user input.

This is both an E-E-A-T trust gap (`seo-audit`) and a **hard block on the entire
off-site directory layer** — most Tier 1 and Tier 2 directories reject submissions
without them (`directory-submissions` Rule 1).

**Do not draft legal text as fact.** Build the routes and the footer links; the
content needs owner sign-off, and the AI-widget data handling in particular needs a
real answer about what is stored and for how long.

Add both to the footer's Company column and to `app/sitemap.ts`.

---

### T12 — Title and description lengths

Targets: titles 50–60 characters *including* the `" — Corewell Systems"` template
(18 chars); descriptions 150–160.

Over-length today: `/how-we-work` (74), `/insights/what-is-an-online-pos-system`
(77), `/trade` (72), `/about` (70), `/insights` (70), `/case-studies` (65).
Descriptions far over: `/technology` (224), `/` (213), `/about` (210).
Wastefully short: `/solutions` (28), `/solutions/ai-automation` (32),
`/book-consultation` (38), `/industries/enterprise` (45).

For short ones the template leaves real room — use it for a qualifier that earns
the click, not keyword padding.

**Acceptance:** re-run the length sweep; every route within range, or documented as
a deliberate exception.

---

### T13 — 40–60 word lead answers

Opening paragraphs average 83 words against `content-patterns`' 40–60 optimal
extraction window; only one of ten is in range.

**Do not delete content.** The existing openings are direct and complete — that is
the site's real strength. Add a tight 40–60 word answer as the first block, then let
the current paragraph follow as expansion.

Also lift the two thin FAQ sets toward 50 words:
`custom-software-vs-off-the-shelf` (43 avg) and
`hotel-management-software-features` (39 avg).

**Acceptance:** every article's first paragraph is 40–60 words.

---

### T14 — Remaining schema

- **`Service` on `/solutions/[slug]`** — `provider: { "@id": siteUrl + "/#organization" }`,
  `serviceType` from `lib/solutions.ts`. No price fields (§2 rule 5).
- **`Article` on `/case-studies/[slug]`** — same shape as T4.
- **`@id` linkage** — add `isPartOf` / `publisher` / `provider` pointing at
  `${siteUrl}/#organization` on the existing free-floating `FAQPage` and
  `SoftwareApplication` blocks so everything joins one entity graph.
- **Do not** add `SoftwareApplication` anywhere new. `CONTEXT.md` §4 reserves it for
  `maturity === "production"`, and the existing gate in
  `app/industries/[slug]/page.tsx:58` is correct.

---

### T15 — Thin pages

- `/industries/enterprise` — 136 rendered words. Expand or fold into `/industries`
  as a section rather than an indexable URL.
- `/industries/[slug]/demo` — 154–191 rendered words; the value is locked in client
  JS. Add a written frame: what the demo shows, what to click, what the underlying
  system does. Preferred over removing them from the sitemap, because it makes them
  citable. Keep the maturity badge language exactly as `demoBadge()` produces it.
- Industry depth parity: healthcare 1,558 and hospitality 1,480 versus education
  580, retail 580, construction 548. Bring the weak ones up toward that standard.

---

### T16 — Em-dash pass

110 em dashes across the insight content, averaging 7.9 per 1,000 words, peaking at
11.6. `ai-writing-detection` names the em dash the primary AI tell and suggests
roughly 2 per 1,000.

Convert most to commas, colons, or parentheses. Keep a few for genuine emphasis.

**Framing:** this is reader perception, not ranking — Google does not penalise
AI-assisted content, and this writing reads as human. It matters here because the
company sells engineering credibility to skeptical buyers. Purely mechanical, no
structural change, safe to do in one pass.

Also sweep for the other tells while in there: "delve", "leverage", "robust",
"comprehensive", "seamless", "in today's...", "It's worth noting that".

---

## PHASE 5 — Expand and earn

### T17 — Comparison and alternative pages

No `/vs/`, `/alternatives/`, or `/compare/` routes exist. Comparison content is the
most-cited content type in AI answers and converts at 5–15% versus 0.5–2% for
generic content (`directory-submissions`).

Follow the `competitors` skill formats. Candidates the existing content already
implies: Odoo, generic off-the-shelf suites, per-seat SaaS.

**Set expectations honestly.** Per `citations-vs-recommendations`: Corewell is an
emerging brand, so these pages will earn **citations and category framing**, not
near-term recommendations. In one 100-query B2B study, 69% of AI Overview citations
earned by self-promotional listicles appeared in answers that recommended
competitors instead. Publish for search intent and positioning; do not build a
plethora of self-ranked lists.

### T18 — Off-site presence  ⚠️ cannot be shipped from this repo

`sameAs` lists LinkedIn, Instagram, Facebook only. No Clutch, G2, or Capterra.

Recommendation is governed by aggregate web consensus, not your own content. The
test: *if a model ignored everything on our domain, would the rest of the web put us
on the shortlist?* Today, no.

**Clutch is the highest-leverage listing for a custom software firm.** Once live,
add to `socialLinks` in `lib/site.ts` so it flows into `sameAs`.

This is the highest-impact item in the entire plan and it is owner work, not agent
work. Say so plainly in your report.

### T19 — Link-earning and agent-readable assets

Ordered by measured payoff (`content-strategy` backlink data):
- **Stats/benchmarks page (4.25× backlink share).** A maintained "custom software
  cost benchmarks" page. Doubles as the fix for T7 — but only with real sourced
  figures. Blocked on sources.
- **Glossary (1.47×).** Definition pages for the terms buyers search. Low risk, no
  owner input needed, directly feeds "what is X" AEO queries.
- **Cost calculator (1.38×).** Natural fit — the top article is a cost question.
  Must output **ranges with an explicit "indicative only, scoped per engagement"
  disclaimer** to stay inside §2 rule 5.
- **`/pricing.md`** — blocked. `/pricing` is unpublished pending owner sign-off
  (drafted: Starter $8k–$25k, Growth $25k–$80k, Enterprise scoped). Rule 5 forbids
  fixed prices, so if this ships it must be ranges plus the disclaimer.

### T20 — `.agents/product-marketing.md`

Every skill in the marketingskills collection reads this first. `.agents/` exists
but holds only `skills/`. Auto-draft from `CONTEXT.md`, `docs/spec.md`, and
`docs/marketing-brief.md`, then have the owner correct it. Makes every future
marketing task cheaper and more consistent.

---

## Verification harness

Save as `scripts/seo-check.sh`. Run against production after each phase.

```bash
#!/usr/bin/env bash
# SEO regression check. Usage: bash scripts/seo-check.sh [base-url]
BASE="${1:-https://corewellsystems.com}"
ROUTES="/ /industries /solutions /how-we-work /technology /case-studies /insights /trade /about /book-consultation /industries/healthcare /industries/healthcare/demo /solutions/ai-automation /insights/what-is-an-online-pos-system /case-studies/regional-retail-chain"

echo "=== CANONICALS (each must be self-referential) ==="
for p in $ROUTES; do
  c=$(curl -sL --max-time 25 "$BASE$p" | grep -o '<link rel="canonical" href="[^"]*"' | sed 's/.*href="//;s/"//')
  want="$BASE$p"; [ "$p" = "/" ] && want="$BASE"
  [ "$c" = "$want" ] && printf "  OK   %s\n" "$p" || printf "  FAIL %-42s got:%s\n" "$p" "$c"
done

echo "=== TITLE/DESC LENGTHS (50-60 / 150-160) ==="
for p in $ROUTES; do
  h=$(curl -sL --max-time 25 "$BASE$p")
  t=$(echo "$h" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g')
  d=$(echo "$h" | grep -o '<meta name="description" content="[^"]*"' | head -1 | sed 's/.*content="//;s/"$//')
  printf "  T:%3d D:%3d  %s\n" "${#t}" "${#d}" "$p"
done

echo "=== SCHEMA TYPES PRESENT ==="
for p in /insights/what-is-an-online-pos-system /case-studies/regional-retail-chain /solutions/ai-automation /industries/healthcare; do
  printf "  %-44s " "$p"
  curl -sL --max-time 25 "$BASE$p" | grep -o '"@type":"[A-Za-z]*"' | sort -u | tr '\n' ' '; echo
done

echo "=== SITEMAP lastmod coverage ==="
sm=$(curl -sL --max-time 25 "$BASE/sitemap.xml")
printf "  urls:%s lastmod:%s\n" "$(echo "$sm" | grep -c '<loc>')" "$(echo "$sm" | grep -c '<lastmod>')"

echo "=== INTERNAL LINK DENSITY (target >=5.0/1k) ==="
for f in content/insights/*.mdx; do
  w=$(wc -w < "$f"); l=$(grep -o "](/[a-z0-9/-]*)" "$f" | wc -l)
  printf "  %-56s %.1f\n" "$(basename "$f" .mdx)" "$(awk "BEGIN{print $l/$w*1000}")"
done

echo "=== EM-DASH DENSITY (target <=2.0/1k) ==="
for f in content/insights/*.mdx; do
  w=$(wc -w < "$f"); d=$(grep -o '—' "$f" | wc -l)
  printf "  %-56s %.1f\n" "$(basename "$f" .mdx)" "$(awk "BEGIN{print $d/$w*1000}")"
done
```

---

## Definition of done

**Phase 1 (critical):**
- [ ] Exactly one host serves `200`; the other redirects to it; it matches `siteUrl`
- [ ] Every route self-canonicalizes — zero interior pages pointing at `/`
- [ ] Plausible renders; Bing verified; sitemap submitted to both engines
- [ ] Search Console Coverage shows "Alternate page with proper canonical tag"
      falling (allow 2–4 weeks)

**Phase 2:**
- [ ] `Article` schema on all 10 insights, validating with zero errors
- [ ] "By Corewell Systems" byline visible; no personal names anywhere
- [ ] `<lastmod>` on all 39 sitemap URLs
- [ ] Every new numeric claim carries a real named source, or is left hedged

**Phase 3:**
- [ ] Breadcrumbs + `BreadcrumbList` on all five detail templates
- [ ] Every insight ≥ 5.0 internal links per 1,000 words
- [ ] Every industry and solution page links to ≥ 2 articles
- [ ] ≥ 6 of 10 articles contain a comparison table

**Phase 4:**
- [ ] `/privacy` and `/terms` live, footer-linked, in the sitemap
- [ ] Titles and descriptions in range on every route
- [ ] Every article opens with a 40–60 word answer
- [ ] `Service` on solutions, `Article` on case studies, `@id` linkage throughout
- [ ] Em-dash density ≤ 2.0 per 1,000 words

**Always:**
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` clean
- [ ] No invented facts; every `NEEDS OWNER` marker listed in the final report

---

## Blocked on the owner — surface these early

These gate real work. Ask up front rather than discovering them mid-phase.

| # | Question | Blocks |
|---|---|---|
| 1 | Apex or www as canonical host? | **T1 — and therefore everything** |
| 2 | Privacy/terms content, and what the AI widget stores | T11, and the whole directory layer |
| 3 | Sources for the maintenance-ratio and cost claims, or permission to cite external authorities only | T7, T19 |
| 4 | Any true, non-identifying case-study outcomes + go-live years | Case-study depth, `illustrative` flag |
| 5 | Pricing sign-off — publish ranges or keep withheld | T19, `/pricing.md` |
| 6 | Will Clutch/G2 listings be created? | T18 — the highest-impact item here |
| 7 | Confirm the "systems we build and operate" experience line is accurate | T5 |

---

## What this plan will not do, and why

Recorded so nobody re-opens them as oversights:

- **No named human authors.** `CONTEXT.md` §2 rule 1. The E-E-A-T cost is accepted
  deliberately.
- **No location pages or local SEO.** §2 rule 8 — no geographic claims. This removes
  an entire `programmatic-seo` playbook that would otherwise be an obvious fit.
- **No published fixed prices.** §2 rule 5. Ranges with a disclaimer at most.
- **No changes to `trade.corewellsystems.com`.** Its robots.txt is correct.
- **No invented statistics** to satisfy the +37%/+40% GEO levers. Real sources or
  hedged language — never a fabricated number.
- **No `SoftwareApplication` schema on non-production tiers.** §4.
- **No OKF bundle yet.** Google's v0.1 spec has no confirmed AI ranking signal.
  Revisit if an engine announces support. Note the generator doubles as an
  internal-linking audit — which would have surfaced T9 visually.

---

## The one-line summary

Fix the host and the canonicals this week, because nothing else counts until
interior pages can be indexed at all. Then spend the content effort on attribution,
freshness, and internal linking — and understand that the highest-impact item in
this entire plan, third-party review presence, cannot be shipped from this repo.
