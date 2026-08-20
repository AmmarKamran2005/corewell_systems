# Corewell Systems — Unified Remediation Plan

**Supersedes:** `docs/AGENT-PLAN.md`, `docs/remediation-plan.md`,
`docs/seo-remediation-agent-plan.md`. Those stay on disk as evidence, along with
their source audits (`docs/competitive-position.md`, `docs/seo-geo-aeo-audit.md`),
but **this file is the one to execute.** Where it disagrees with them it
disagrees deliberately, and says why in §2.

**Created:** 2026-08-20
**Baseline:** commit `f55d40d` + 14 uncommitted copy files (82 insertions /
82 deletions — a symmetric copy-quality swap, not new claims)
**Verified against:** the working tree, `npx tsc --noEmit` (clean), computed
WCAG math, and read-only HTTP against production
**Target executor:** an AI coding agent with no conversation history, or a
person picking this up cold

---

## Execution status — updated 2026-08-20

## 🟢 SHIPPED. Deployed to production and verified live.

Nine commits, `f55d40d..261c03a`, pushed to `main` and deployed via Vercel.

**Owner decisions taken 2026-08-20** (previously D1–D3):
- **D1 · Corewell Trade = published product.** The five insight articles were
  aligned to `/trade`. Each keeps the sample-data fact and drops both the
  disputed maturity framing and the unverifiable claim about what the app's own
  screens say. ⚠️ Recorded at the time: the backend was **not** live when this
  was decided. If it slips further the label has to follow reality.
- **D2 · Canonical host = `www`.** `siteUrl` now matches what serves.
- **Push and deploy: yes.**
- **Content: only what needs no new claims.**

**Verified against `https://www.corewellsystems.com` after deploy:**

| Check | Result |
|---|---|
| Canonicals on 8 sampled routes | **All self-referencing on `www`** |
| Sitemap | 39 URLs, **39 `lastmod`**, `www` host, all returning **200 not 308** |
| `[PLACEHOLDER]` on `/industries/healthcare` | **0** |
| Security headers | CSP-Report-Only · Permissions-Policy · Referrer-Policy · HSTS · nosniff · X-Frame-Options — **all six live** |
| Article schema | `Article` + `FAQPage` + `BreadcrumbList` + `WebPage`, `Organization` ×1, `WebSite` ×1 |
| `/insights/feed.xml`, `/manifest.webmanifest`, `/robots.txt` | **200** |
| Retail title | `Retail & Shop Management Software \| Corewell Systems` |
| "design preview" left in the two sampled articles | **0** |
| Comparison table rendering live | 10 rows |

**Closed since:** analytics (Plausible live, per-site script), **CSP now
enforcing**, and the design taste calls (numbered labels retired outside the
`CONTEXT.md`-protected surfaces; the repeated three-card row broken into three
distinct families).

**CSP enforcement evidence.** Verified in a real browser against production
under the enforcing header: the Cal.com embed script *and* booking iframe both
load, Plausible's library actually runs, a demo route stays interactive, the
consultant widget opens, and the whole site loads exactly three external
resources — all allowed. Zero console errors, zero violations.
**Any third-party script, widget or font host added from here must be added to
the policy in the same commit or production will block it.**

**Still owed:** privacy/terms content (see `docs/privacy-terms-draft.md` — seven
questions), HSTS `preload` decision, durable lead storage, error tracking,
Clutch/G2 listings, and the Trade backend. Post-deploy: resubmit the sitemap in
Search Console and request re-indexing for the top 15 URLs. Expect two to four
weeks before judging any effect.

---

### What landed, task by task

| Task | What landed | Acceptance result |
|---|---|---|
| `P1-T1` | Removed the root-layout canonical; added `lib/seo.ts` `canonical()`; applied to all 16 routes | **40 of 40 pages self-canonicalize, 0 mismatched.** `/_not-found` correctly emits none |
| `P1-T2` | `[PLACEHOLDER]` replaced with a real case-study lookup; renders nothing where no study exists | **0 placeholders in build output.** Section present on healthcare/hospitality/retail, absent with no orphan on the other three |
| `P1-T5` | Added `Industry.metaTitle`; set it for retail | `Retail & Shop Management Software — Corewell Systems` |
| `P1-T6` | `llms.txt`: Education/Retail demos corrected to Design Preview; `/trade` added with only verifiable claims | No false statement remains |
| `P1-T7` | `CONTEXT.md` §3 corrected to 10 articles; §7 corrected to record the real www/apex behaviour | — |
| `P2-T1` | `--color-faint` → `#746C66`; corrected the stale accent-ratio comment | 4.89 / 4.64 / 5.15 — passes AA on all three surfaces |
| `P2-T2` | Smooth scroll gated behind `prefers-reduced-motion: no-preference` | Present in compiled CSS |
| `P2-T3` | `type="button"` added to 36 buttons across 13 files | **0 untyped buttons remain** |
| `P2-T4` | `autoComplete` on name/email/company; explicit unselected first option on both selects | Rendered; field `name`s and order untouched |
| `P2-T7` | `twitter: { card: "summary_large_image" }` | `<meta name="twitter:card">` present |
| `P2-T8` | Deleted `app/c_logo.png`, `public/Corewell_LOGO.png`, `public/WITHOUT_BG.png` | ~503 kB removed; all three confirmed unreferenced first |
| `P2-T9` | Form success wrapped in `role="status"`/`aria-live`, focus moved to the confirmation; error states in a persistent `role="alert"` region | Rendered in output |
| `P2-T11` | Real focus ring on the form's inputs, replacing bare `outline-none` | Applied |
| `P2-T12` | `viewport` export with `themeColor`; `not-found` title | `<meta name="theme-color" content="#FAF9F6">`; *Page Not Found — Corewell Systems* |
| `P2-T13` | `jsonLdScript()` helper; all 6 JSON-LD call sites routed through it | Escaping verified active in built output, and round-trips identically |

| `P2-T5` | Full `headers()` block in `next.config.mjs`; CSP **report-only** first | Verified on a real `next start` response: HSTS · nosniff · Referrer-Policy · Permissions-Policy · X-Frame-Options · CSP-Report-Only |
| `P2-T6` | `[\r\n]` stripped from the mail subject | Documented as defence in depth, not a vuln fix |
| `P2-T10` | Widget: `role="dialog"`, `aria-modal`, Escape, focus in on open, focus back to trigger on close. Mobile nav: Escape + focus return | **Browser-verified:** open → focus on the input; Escape → closed, focus back on trigger. Same for the nav |
| `P2-T11` | All remaining `focus:outline-none` replaced with real rings | **0** suppressed focus indicators remain |
| `P3-T1` | `updated?` plumbed through `InsightMeta`/`CaseStudyMeta` and all four readers | Not backfilled anywhere — no manufactured freshness |
| `P3-T2` | `Article` on insights **and** case studies; Organization as author by `@id` | Both emit `Article`; case studies had **no** page schema before |
| `P3-T3` | `components/Breadcrumbs.tsx`; applied to insights, case studies, industries, solutions; replaced the old back-links | **Browser-verified:** *Home / Industries / Healthcare*, last crumb `aria-current="page"` |
| `P3-T4` | Sitemap rewritten: `lastModified` per route, `changeFrequency`/`priority` dropped | **39 loc / 39 lastmod** (was 39/0) |
| `P3-T5` | `Service` on solutions; `@id` linkage on FAQ nodes; **duplicate nodes fixed** | `Organization` ×1 on industries (was ×2), `WebSite` ×1 on `/trade` (was ×2) |
| `P3-T8` | `openGraph` with `type: article` + published/modified times | `og:type=article`, `article:published_time` present |
| `P3-T9` | OG mark inlined as a data URI; self-fetch removed | No network dependency. Edge runtime **kept** — see note |
| `P3-T10` | `app/insights/feed.xml/route.ts`, discovery link via the `canonical()` helper | Feed serves **10 items**; `<link rel="alternate" type="application/rss+xml">` on every page |
| `P4-T8` | `error.tsx` now logs the digest; added `global-error.tsx` | Errors are no longer silently swallowed |
| `P0-T5` | `.github/workflows/ci.yml` — typecheck, lint, build, plus regression guards for placeholders, canonicals, focus rings, and advisories | Not pushed |

**Gate:** `npx tsc --noEmit` clean · `npm run lint` clean · `npm run build`
exit 0, 49 routes · every route smoke-tested `200` on `next start`, 404 correct.

**A note on `P3-T9`:** moving the OG route to the Node runtime so it could read
the mark from disk was tried and **reverted**. `@vercel/og`'s Node build calls
`fileURLToPath` on its own bundled assets and throws `TypeError: Invalid URL`
during prerender on Windows. The robustness problem is fixed anyway — the mark
is now an inlined data URI (`app/og-logo.ts`) instead of an HTTP fetch — but the
route stays `ƒ Dynamic`. If someone later wants it static, that is a
`@vercel/og` bug to work around, not a mistake in this code.

| `P3-T6` | Title separator `—` → `\|`; `metaTitle` added to `InsightMeta` and `Industry`; 9 article + 6 page + 3 demo titles shortened; 12 descriptions trimmed | **Titles over 60: 24 → 1. Descriptions over 160: 15 → 3.** Every H1 still carries the full question |
| `P4-T5` | Homepage reordered to Hero → IndustryMorph → **DemoStrip → ProofSection** → ProcessSection → Insights → CTA; `DemoStrip` and `ProcessSection` re-grounded | **Browser-verified** heading order and computed backgrounds — no two content sections share a ground |
| `P4-T4` | Delivery failure now logs the full payload before returning 502 | A lost lead is recoverable from platform logs. Durable storage still an owner call (stores personal data) |
| `P4-T7` | `checkDailyCeiling()` — instance-wide cap on metered Gemini calls | Spend is now **bounded**, not unbounded. No paid dependency added |
| `P5-T4` (part) | Title template `"%s \| Corewell Systems"` | One line; changes all 31 titles, every tab, every SERP entry |

**Gate:** `npx tsc --noEmit` clean · `npm run lint` clean · `npm run build`
exit 0, 49 routes · every route smoke-tested `200`, 404 correct · **browser
console completely clean** on `/`, `/book-consultation`, a demo route and
`/trade`.

**CSP is verified safe to enforce.** On `/book-consultation` — the riskiest
page — the only external resources the site loads at all are
`app.cal.com/embed/embed.js` and the Cal.com booking iframe, both explicitly
allowed by the policy. Zero violations were reported on any page tested. It
stays **report-only** anyway for one deliberate reason: Plausible is not yet
loaded (D3), so that one path is unverified. Switch the header name to
`Content-Security-Policy` and re-add `upgrade-insecure-requests` in the same
commit, after analytics land and real-world reports look clean.

**Structured data, verified by parsing the live DOM on `/trade`:** every JSON-LD
block parses, `Organization` ×1, `WebSite` ×1 (both were ×2), `BreadcrumbList`
×1, `FAQPage` ×1, and `SoftwareApplication` ×0 — correctly withheld.

**A note on `P2-T1`:** my earlier figure of "7 descriptions over 160" was an
undercount taken from a truncated list. The measured figure was **15**. Twelve
are now fixed; the three that remain are case-study `summary` fields, which are
**rendered as visible copy** on the hub, the detail page and the industry proof
block. Trimming them edits owner-approved published prose, so they are left
deliberately — the same reason the one remaining over-length title
(`/case-studies/connected-clinic-network`) is untouched.

| `P2-T12` (rest) | `app/apple-icon.png`, `app/manifest.ts` | Both serve `200`. Deliberately not a PWA — no service worker, none needed |
| `P5-T1` | `lib/related.ts` (explicit, reviewable map) + `components/RelatedReading.tsx`; applied to insight, industry, solution and case-study templates; 10 in-body anchors added by **wrapping phrases the prose already contained** | **Every article: 5–6 unique contextual internal links, up from 0–1.** Industry/solution/case-study pages linked to **zero** articles before |
| `P6-T1` (part) | `/trade`: 5 templated eyebrows deleted, heading spacing corrected; double middle-dot separator fixed | **8 → 4 eyebrows against a cap of 4.** Deletion only — every section keeps its own headline, no copy written |

### Judgment calls made rather than executed

Three plan items were **not** applied, because following the rubric would have
overridden something better-founded. Recording them so nobody reopens them as
oversights.

| Item | Why not |
|---|---|
| Eyebrow cull on `/book-consultation` (2 vs cap 1) | The two labels are *"Pick a time"* and *"Or write first"* — they distinguish two genuinely different actions. Deleting one degrades usability to satisfy a heuristic. The cap is a style-skill rule, not a standard. |
| `P6-T2` numbered step labels on `/solutions` and `/solutions/[slug]` | `CONTEXT.md` §3 explicitly specifies *"Solutions hub — numbered index"*. The numerals are a documented design decision, not templated rhythm. |
| `P6-T2` on `ProofLedger` | `CONTEXT.md` §5 calls it *"the signature element"*. Not something to restyle without the owner. |
| `P6-T2` on the remaining four, and `P6-T3` card rows | Defensible either way, but purely contestable taste with no correctness, accessibility or performance benefit — and §6 records that sibling skills in the pack directly contradict each other here. Owner's call, like the H1. |

**Also checked while in there:** the `stage.duration` labels on `/how-we-work`
read *"Days, not months"*, *"Approved before code"*, *"Reviewable throughout"*,
*"Ongoing"* — all qualitative. **No guardrail-5 timeline violation.** They are
stage metadata, not eyebrows; a naive `uppercase tracking` grep miscounts them.

**In-body link density is honestly still short of target.** MDX-only density is
now 0.6–1.5 per 1,000 words against a 5.0 goal. Closing that gap purely in-body
means writing new sentences, which guardrail 1 forbids. What was achievable
without inventing copy was done: existing phrases wrapped as anchors, plus
breadcrumbs and related-reading blocks, which is why the *rendered* contextual
link count went from 0–1 to 5–6 per article. That is the number that affects
crawling; the 5.0/1k figure needs owner-approved new copy.

**Still open:** `P1-T3` (needs D1) · `P1-T4` (needs D2) · `P3-T7` (per-article
OG images) · `P4-T1`/`T2`/`T3`/`T6` · `P5-T2`/`T3`/`T5`/`T6`/`T7` (all require
authoring claims, or owner/legal content) · `P6-T2`/`T3`/`T4`/`T5` (taste and
real image assets) · `P7-T1`/`T4`.

> **Note for whoever picks this up:** starting `next dev` after a build wipes
> `.next`, so the build artifacts these acceptance tests read are destroyed by a
> dev server. Run the tests immediately after `npm run build`, or rebuild first.

---

## 0. How to use this document

1. **Read §1 before touching anything.** Those guardrails override every other
   instruction here. Violating one is worse than shipping every defect below.
2. **Work phases in order.** Task IDs encode dependencies. Do not batch phases.
3. **Every task has an acceptance test. Run it.** The edit applying is not the
   test. Report a task done only when its test passes.
4. **One commit per task**, repo-local identity
   (`Corewell Systems <info@corewellsystems.com>`). Imperative message
   describing the effect, not the mechanism — match `git log`.
5. **Do not push and do not deploy** unless explicitly told. Production
   verification is read-only `curl`.
6. **Stop the dev server before `npm run build`.** Running both corrupts
   `.next`. If in doubt, `rm -rf .next` first.
7. **If a task is wrong or already done, say so and skip it.** Do not
   manufacture work to fill the slot.

---

## 1. Guardrails — these override everything

From `CONTEXT.md` §2, `docs/spec.md` §§1/7/13, and explicit owner decisions.

1. **Never invent** client counts, metrics, percentages, testimonials, regions,
   dates, or outcomes. If a sentence needs a number you do not have, write the
   sentence without it, or leave `<!-- NEEDS OWNER: ... -->` and list it in your
   final report. Structural headings and UI chrome are fine to draft. **Claims
   are not.**
2. **No founder identity.** Company voice only. No personal name, no bio, no
   team page, no `/authors/`. Article authorship attributes to the Organization.
3. **No named or linked real products** except **Corewell Trade**, which is the
   company's own. Internal product names and live client URLs never appear.
   The repo is **public**.
4. **Maturity labelling is mandatory and load-bearing.** `production` /
   `design` / `concept` per `lib/industries.ts`. Calling a design preview "live"
   is the worst available error. `SoftwareApplication` schema emits only for
   `production` — the gates at `app/industries/[slug]/page.tsx:55` and
   `app/trade/page.tsx:63` are correct; do not add it anywhere new.
5. **No firm timelines or fixed prices** in copy, schema, or machine-readable
   files.
6. **One primary CTA everywhere:** Book a Consultation. Any new page ends there.
7. **Outcome language over technology language.** Tech never appears in a
   headline; it lives in "Under the hood" and on `/technology`.
8. **No geographic claims.** No location pages, no city modifiers, no
   `LocalBusiness` schema. This deletes an entire programmatic-SEO playbook that
   would otherwise fit — accepted deliberately.
9. **`myprojects/` is gitignored and `tsconfig`-excluded.** Nothing from it may
   enter this repo. Never commit secrets; `.env.local` stays ignored.
10. **`lib/testimonials.ts` stays empty** until real permissioned quotes exist.
    The component renders nothing when empty — that is the correct pattern and
    the model for every other "no true content yet" case.
11. **Case studies keep `illustrative: true`** and their visible sample-data
    label until real anonymised facts arrive.
12. **Never change without explicit approval:** route slugs, primary nav labels,
    form field `name` attributes and their order, the logo/wordmark, or any
    legal, consent, or disclaimer copy.
13. **Preserve the accessibility work already there.** 18 reduced-motion guards,
    implicit form labels, decorative `alt=""`, the skip link, focus-visible
    styling across 16 files. If a change removes a focus ring or a
    reduced-motion guard, the change is wrong.

---

## 2. Verification verdicts — what I checked in the three source plans

This section is why this document exists. The three plans agree on roughly half
their findings, contradict each other on several, and between them carry nine
errors that would have cost execution time or caused an agent to skip a real
defect.

Legend: **A** = `remediation-plan.md` (design/UI) · **B** = `AGENT-PLAN.md`
(full-stack) · **C** = `seo-remediation-agent-plan.md` (SEO/GEO/AEO).

### 2.1 Confirmed by direct verification

| Claim | Source | How verified |
|---|---|---|
| Root layout sets `alternates: { canonical: "/" }`, inherited by every route | B, C | `app/layout.tsx:46`; only `app/about/page.tsx:40` and `app/trade/page.tsx:17` override |
| `app/page.tsx` has **no** `metadata` export at all | B | Read in full — confirmed |
| Production serves `www`; apex 308-redirects to it; `siteUrl` is apex | B, C | `curl`: apex `308 → https://www.corewellsystems.com/`; www `200`. `lib/site.ts:8` = apex |
| Live `[PLACEHOLDER: …]` renders on all six industry pages | **B only** | `app/industries/[slug]/page.tsx:329`, shared template |
| Retail title reads "Retail & Shop Management **Management** Software" | **B only** | `page.tsx:36` appends `" Management Software"` to `lib/industries.ts:149` `"Retail & Shop Management"` |
| No `Article`/`BlogPosting` on insights; no page schema on case studies | A, B, C | `app/insights/[slug]/page.tsx:47` emits `FAQPage` only |
| `BreadcrumbList` exists only on `/trade` | B, C | Single hit, `app/trade/page.tsx:68` |
| Sitemap has no `lastmod`; emits only `changeFrequency` + `priority` | B, C | `app/sitemap.ts` read in full |
| No security response headers | A, B | `next.config.mjs` is 6 lines, `reactStrictMode` only |
| `scroll-behavior: smooth` ungated by reduced motion | **A only** | `app/globals.css:34–36`, inside `@layer base` |
| 39 `<button>` elements, **0** with an explicit `type` | **A only** | Exact match to A's count |
| No `twitter` card metadata anywhere | **A only** | Zero hits across `app/` |
| No dark mode: 0 `prefers-color-scheme`, 1 `dark:` | **A only** | Confirmed |
| Form inputs lack `autoComplete`; selects have no empty first option | **B only** | `ConsultForm.tsx:75,79,86,90,103` |
| Honeypot input lacks `aria-hidden` | **A only** | `ConsultForm.tsx:68` |
| `llms.txt` is factually stale | **B only** | Lines 33–36 call the Education and Retail demos "coming soon"; both are live. No mention of Trade |
| Rate limiting is a module-scope `Map`, per-instance | B | `lib/rate-limit.ts` — the file's own comment admits it |
| `app/c_logo.png` (184 kB) unused | **B only** | Only `c_logo-withoutbg.png` is imported |
| Hero H1 carries no vertical, outcome, or target term | B | `Hero.tsx:12` — *"Engineering software that powers modern businesses."* |
| Corewell Trade status contradicts itself across surfaces | **A only** | Real — and worse than A reported, see X4 |
| `SoftwareApplication` correctly gated to `production`; `/trade` withholds it | A, B, C | Both gates verified present and correct |
| `trade.corewellsystems.com` robots.txt is correct by design | C | C self-corrected an earlier wrong finding; the correction is right |
| Search Console is a **domain property** → covers both hosts, no re-verification | B | Matches `CONTEXT.md` §7 |
| `npx tsc --noEmit` clean on the current tree | B | Ran it |

### 2.2 Corrections — where a source plan is wrong

| # | Source claim | Verdict | Correction |
|---|---|---|---|
| X1 | **A-F3:** "13 pages emit **no** canonical URL. Next.js won't infer it." | **Wrong mechanism, understated severity** | App Router metadata **is inherited** down the tree. Those pages do emit a canonical — pointing at the **homepage**. That is not a missing signal, it is an active instruction telling ~41 interior URLs they are duplicates of `/`. A's remediation list is right; its diagnosis is not, and A never says to remove the root-layout line, which leaves the same trap armed for every page added later. |
| X2 | **B:** "Colour contrast passes AA — `#79716B` on `#FAF9F6` = 4.55:1", filed under *"do not fix these"* | **Incomplete, and dangerous as written** | True for `--color-canvas`. But `--color-canvas-subtle` is `#F5F3EF`, and `faint` on it computes to **4.32:1 — fails AA**. Computed: canvas 4.55 ✅ · canvas-subtle 4.32 ❌ · surface 4.79 ✅. **A is right, and B would have caused an agent to skip a real AA failure.** A's proposed `#746C66` clears all three (4.89 / 4.64 / 5.15) — verified. |
| X3 | **A-F10:** email header injection via `subject` | **Overstated** | `route.ts:79` posts JSON to `https://api.resend.com/emails`. `subject` is a JSON field, not a raw SMTP header — Resend builds the MIME. Not an injection vector. Worth a one-line strip as defence in depth and to keep subjects single-line; **not** a security finding. Demoted to hygiene. |
| X4 | **A-D1:** "two insights articles" call Trade a design preview | **Undercount** | **Five** do: `how-much-does-a-custom-erp-system-cost`, `odoo-alternatives-when-custom-erp-makes-sense`, `sell-online-without-breaking-your-shop-stock`, `what-is-an-online-pos-system`, `wholesale-distribution-software-what-it-should-do` — against `/trade` and `lib/consultant-prompt.ts:18` calling it "our own published product". This is a **guardrail-4 maturity contradiction**, the most serious content rule on the project, not a tidy-up. |
| X5 | **B-F20:** "Ten files of copy improvements uncommitted" | **Stale** | `git status` shows **14** modified files; `git diff --stat` shows 82 insertions / 82 deletions. |
| X6 | **A-F5** "~443 em-dashes", and A's Phase 1 gate requiring the harness to reproduce 443 / 4.32:1 / 13 gaps / "`/trade` 9 eyebrows" | **Not reproducible as stated** | Measured: 454 in `app`+`components`+`lib` **including comments**; 101 in insight MDX; 9 in case-study MDX. C's figure of 110 across content files is **exactly right**. A's eyebrow counts do not reproduce either — direct grep gives `/trade` 8 (not 9) and `/how-we-work` 3 (not 7). **Do not use A's numbers as pass/fail thresholds.** A harness required to match them fails at Phase 1 and stalls the entire plan. |
| X7 | **B-§4:** "Google deprecated FAQ rich results on 2026-05-07" | **Unverifiable here; conclusion survives anyway** | I cannot confirm that date from this machine and will not restate it as fact. It does not matter: FAQ rich results have been restricted to authoritative government and health sites since **August 2023**, so `FAQPage` was **never** a SERP lever for this site. B's strategic conclusion — keep the 47 FAQs, stop treating them as the schema strategy, put new effort into `Article`/`BreadcrumbList`/`Service` — is correct on the older, verifiable fact alone. Adopted on that basis. |
| X8 | **A-F2:** "No dark mode", ranked **High**, with a mandatory Phase 3 | **Wrong altitude** | That is a rule from one style skill, not a web standard. WCAG does not require dark mode; no Core Web Vital measures it. For a B2B marketing site whose buyers are clinic and hotel owners on daytime desktop, it is a nice-to-have with a large blast radius: every token, four hardcoded-colour components, and the video CTA scrim. **Demoted to optional and deferred to last**, gated on the owner wanting it. |
| X9 | **A, B, C all:** the apex/www decision "blocks everything" | **Not true — and it cost all three plans their first task** | Canonicals are declared as **relative** paths resolved against `metadataBase`, which derives from the single `siteUrl` constant at `lib/site.ts:8`. Canonicals, sitemap, `robots.txt` and JSON-LD `@id` all already derive from it. The host decision is therefore a **one-line change landable at any time**, and none of the canonical work needs to wait for it. Treating it as a blocker idles the highest-value fix behind an owner email. |
| X10 | **A-F18:** "Honeypot input not `aria-hidden`" | **False finding — retracted** | `ConsultForm.tsx:65` wraps the honeypot in `<div className="hidden" aria-hidden>`, and the input carries `tabIndex={-1}` and `autoComplete="off"` inside a proper `<label>`. `aria-hidden` on the ancestor removes the whole subtree from the accessibility tree — putting it on the input as well would be redundant. The implementation is already complete and correct. Do not "fix" it. |
| X11 | **A:** "focus-visible styling in 16 files — do not regress it" | **True but incomplete, and the framing hides a real gap** | 19 `focus-visible` usages do exist. But **four files apply `outline-none` with no `focus-visible` rule at all** — `ConsultForm`, `ConsultantWidget`, `HealthcareDemo`, `HospitalityBooking`. A's phrasing invites an agent to conclude focus handling is done and move on. See **U43**. |
| X12 | **A-F15:** "39 `<button>` elements without explicit `type`… Inside a form the HTML default is `submit`, which is a latent bug." | **Overstated — correcting my own earlier restatement of it** | The count is right, but the consequence is not. A naive grep misses multi-line JSX: the site has **one** `<form>` (`ConsultForm.tsx:81`), it contains **exactly one** button, and that button **already carries `type="submit"`**. **No untyped button is inside a form**, so nothing currently misbehaves. Typing them is still correct defensive practice — a button moved into a form later would silently submit it — but this is hygiene, not a bug. Demoted 🟡 → 🟢. |

### 2.3 Coverage gaps

- **A missed** the live `[PLACEHOLDER]` on six pages, the canonical inheritance
  mechanism, the apex/www split, the duplicated retail title, the stale
  `llms.txt`, and every measurement and conversion gap. It is a design audit
  that overreached into SEO.
- **B missed** the `canvas-subtle` contrast failure — and actively told the
  agent not to look — plus ungated smooth scroll, the untyped buttons, the
  missing twitter card, the honeypot `aria-hidden`, and the Trade contradiction.
- **C missed** the `[PLACEHOLDER]` block and everything outside SEO. Fair, given
  its scope, but it means C alone is not executable as a whole-site plan.
- **None of them** noticed that **`CONTEXT.md` is itself stale**: §3 says
  "`/insights` 5 articles" (there are **10**), and §7 records "apex canonical,
  www redirects" when production does the exact reverse. An agent trusting
  `CONTEXT.md` as ground truth is misled on both. Fixed in `P1-T7`.

### 2.4 Conflicts, resolved

| Conflict | A | B | C | **Resolution** |
|---|---|---|---|---|
| Canonical host | silent | code → `www` | DNS → apex | **Owner's brand call, and not blocking.** Default to **code → `www`** absent an answer: one line, no dashboard access, matches what already serves, cannot break delivery. Flipping DNS to apex is equally valid but changes what serves. Either way it is one edit to `lib/site.ts:8`. |
| Em-dash scope | zero across all 31 pages incl. body copy | silent | ≤ 2 per 1,000 words in content | **C's target.** Zero is an overcorrection that forces rewriting owner-approved sentences for no reader benefit. Take the two high-value pieces: the **title template** (one line, changes all 31 titles and every SERP entry) and a **content pass to ≤ 2/1k**. Leave deliberate emphasis dashes. |
| Contrast | real AA failure, fix the token | "already correct, do not fix" | silent | **A** — verified by computation, see X2. |
| Dark mode | mandatory, Phase 3 | silent | silent | **Deferred, optional** — see X8. |
| Maintenance 15–20% figure | "confirm or cut" | silent | leave hedged; add a real source if one exists; never harden | **C.** The copy already reads *"commonly estimated at roughly 15–20%"* — honest hedging, not a false claim. Cutting removes true, useful information; hardening it into false precision is the actual failure mode. |
| `FAQPage` schema | keep | keep, stop investing | keep, extend `@id` linkage | **B's strategy + C's linkage.** Keep all 47, join them to the entity graph, spend new effort on `Article`/`BreadcrumbList`/`Service`. |
| Homepage order | silent | move DemoStrip + Proof above Process | silent | **B.** Verified current order is Hero → IndustryMorph → **Process** → DemoStrip → Proof. Process is the least differentiated section on the page. |

### 2.5 Independent audit — dimensions no source plan covered

The three plans between them audited design, SEO/GEO, schema, copy, and parts of
accessibility and security. Merging them still leaves a site that is **not
demonstrably production-grade**, because whole categories were never examined.
The following were audited from scratch. Findings enter the register below as
**U39–U53**.

**Audited and clean — record these so nobody "fixes" them:**

| Area | Result |
|---|---|
| **Secret exposure** (public repo) | ✅ `.gitignore` covers `.env*.local` and `.env`; `.env.local` is **not tracked**; git history contains no secret file — only `.env.example`. `.env.example` documents every variable with intent. |
| **Per-industry accent contrast** | ✅ **All seven accents and all six `accentStrong` values pass AA** on `canvas`, `canvas-subtle` and `surface`, *and* as white-text-on-accent. The claim in `lib/industries.ts:20` is verified true. Tightest is hospitality amber `#B45309` at **4.53:1** on `canvas-subtle` — almost no headroom, so `--color-canvas-subtle` must not darken. |
| **TypeScript rigour** | ✅ `strict: true`, **zero** `any`, **zero** `console.*` in `app`/`components`/`lib`. |
| **External links** | ✅ Every `target="_blank"` carries `rel="noopener"` or `noopener noreferrer`. |
| **API hardening** | ✅ Both routes: `runtime = "nodejs"`, rate limited, `MAX_FIELD` 200 / `MAX_MESSAGE` 2000 / `MAX_MESSAGES` 24, `req.json().catch(() => null)`, keys server-side, nothing stored. |
| **Colour-only meaning** (WCAG 1.4.1) | ✅ `Pill` renders `children` as text alongside the tone colour — colour is not the sole signal. |
| **Error/404 routes** | ✅ `app/error.tsx` (with `reset`) and `app/not-found.tsx` both exist and are well written. |
| **Skip link** | ✅ Correctly wired to `<main id="main">`. `<html lang="en">` present. |
| **Heading structure** | ✅ Exactly one `<h1>` per page; no level skips found. |
| **robots.txt / AI crawlers** | ✅ No `Disallow` rules means AI crawlers are **default-allowed** — which is exactly right for the GEO/AEO strategy. **Do not "harden" this by blocking GPTBot/PerplexityBot/ClaudeBot; it would destroy the strategy.** |
| **`/pricing` exclusion** | ✅ Crawlable + `meta noindex` is the **correct** pattern. A robots `Disallow` would stop Google crawling it to *see* the noindex, risking a URL-only index entry. Do not change it. |
| **`X-Powered-By`** | ✅ Already absent from live responses — Vercel strips it. `poweredByHeader: false` is unnecessary. |

**Audited and defective — new findings U39–U53.** The two that matter most:

- **U39 — the contact form is broken for screen-reader users, on the one flow
  that makes money.** On success, `ConsultForm` replaces the entire `<form>`
  with a plain `<div>`. There is no `role="status"`, no `aria-live`. The result
  is never announced (**WCAG 4.1.3 Status Messages, AA**), *and* focus was on
  the submit button which no longer exists, so **focus is destroyed to
  `<body>`** (**WCAG 2.4.3**). A screen-reader user submits and receives
  silence. All three plans praised this form; none of them submitted it.
- **U40 — the framework is past its security-patch window.** Installed
  `next@14.2.35` is the **terminal 14.x release** (`npm view next dist-tags` →
  `next-14: 14.2.35`; `latest: 16.3.1`). `npm audit --omit=dev` reports **4 high
  severity** advisories whose only offered fix is `next@16.3.1`, a breaking
  major. Honest applicability to *this* app: the Server-Action advisories (DoS,
  SSRF, unbounded payload, unauthenticated Server Function disclosure) do **not**
  apply — `grep '"use server"'` returns zero. The Pages-Router i18n middleware
  bypass does not apply — no middleware, no i18n, App Router. The rewrites SSRF
  does not apply — no rewrites. The `postcss` advisories are build-time. **So
  immediate exploitable risk is low.** But "no patched version exists for the
  major we run" is not a production-grade posture, and it only gets worse. This
  needs a planned upgrade, not a panic.

### 2.6 Build-verified measurements

A clean `rm -rf .next && npm run build` was run against the current tree
(**exit 0**, 48 routes, 41 static HTML pages). Every figure below comes from
that output, not from inspection. Where a source plan gave a number, the
measured value replaces it.

**Canonicals — the exact scope of U1.** Of 41 built pages, **exactly two
self-canonicalize** (`/about`, `/trade`). **The other 39 all emit the site root.**

> A said "13 pages", B said "~41 of 43", C said "30 of 32". **The measured
> answer is 39 of 41.** Use this figure.

(The built host reads `http://localhost:3000` because `.env.local` overrides
`NEXT_PUBLIC_SITE_URL` — expected. The **path** is the signal, and 39 pages have
no path at all.)

**Titles and descriptions — U21 is larger than reported.**

| Measure | Measured | What the plans said |
|---|---|---|
| Titles over 60 chars | **24 of 41** | C: "12 of 15 routes" |
| Longest title | **87** — *"Custom Software vs. Off-the-Shelf: How to Decide for Your Business — Corewell Systems"* | C: worst was 77 |
| Longest description | **226** (`/technology`) | C: 224 |
| Descriptions over 160 | `/technology` 226 · `/` 215 · `/about` 210 · `wholesale-distribution` 205 · `odoo-alternatives` 196 · `sell-online` 191 · `connected-clinic-network` 190 | C listed 3 |

The retail title duplication (U5) is confirmed in built output:
*"Retail & Shop Management **Management** Software — Corewell Systems"*.

**Sitemap — U18 confirmed exactly.** 39 `<loc>`, **0 `<lastmod>`**, 39
`<changefreq>`, 39 `<priority>`. `/pricing` correctly absent.

**Schema inventory — U17 and U19 confirmed, plus a new defect.**

| Page | Emits |
|---|---|
| `/` | `WebSite`, `Organization`, `ContactPoint` |
| `/insights/*` | `FAQPage` + Q&A — **no `Article`** |
| `/case-studies/*` | **global nodes only — nothing page-specific** |
| `/industries/healthcare` | `FAQPage`, `SoftwareApplication` ✅ correctly gated, **`Organization` × 2** |
| `/solutions/*` | `FAQPage` only — no `Service` |
| `/trade` | `WebPage`, `BreadcrumbList`, `ListItem`, `FAQPage`, **`WebSite` × 2** |

**New:** duplicate `Organization` and `WebSite` nodes — the page-level blocks
inline a second copy of an entity the root layout already declares with an
`@id`, instead of referencing it. That is precisely the fragmentation `P3-T5`
fixes, and it is now evidenced rather than theorised.

**`/opengraph-image` is dynamic, and the build says so.** It is marked
`ƒ (Dynamic) server-rendered on demand`, and the build emits
`⚠ Using edge runtime on a page currently disables static generation for that
page`. So the self-referential `fetch(`${siteUrl}/icon.png`)` in **U45** runs on
**every single render**, uncached, through the apex→www 308. Dropping
`runtime = "edge"` and inlining the logo makes the card static. This raises U45
from a robustness nit to a measurable one.

**Confirmed live on production, not just in the build.** Both 🔴 defects were
re-checked against `https://www.corewellsystems.com` at audit time:

```
/industries/healthcare                  canonical → "https://corewellsystems.com"
/insights/what-is-an-online-pos-system  canonical → "https://corewellsystems.com"
/case-studies/connected-clinic-network  canonical → "https://corewellsystems.com"
curl .../industries/healthcare | grep -c PLACEHOLDER   →  1
```

Note the canonical is doubly wrong: it names the **homepage** *and* the **apex
host**, which 308-redirects to `www`. So every interior page declares itself a
duplicate of a URL that is itself a redirect.

`[PLACEHOLDER: …]` renders in the built HTML of **all six** industry pages —
`construction-real-estate`, `education`, `healthcare`, `hospitality`,
`legal-professional-services`, `retail` — and is confirmed live. The visible
string is *"[PLACEHOLDER: anonymized case study block for healthcare — real,
non-identifying…]"*, sitting under a heading that reads **"Proof, not
promises"**. This is publicly visible to every visitor and every crawler today.

**Performance — verified genuinely good. Do not "optimise" this.**

- First Load JS shared by all: **87.3 kB**. Per route: **96.2–154 kB**.
- Heaviest routes: `/trade` 154 kB, `/` 152 kB, `/industries/[slug]` 147 kB.
- The demo routes carry 18.4 kB of route-specific JS — the largest single
  chunk, and appropriate for four interactive applications.
- `npx tsc --noEmit` clean · `npm run lint` clean · `npm run build` **exit 0**
  across 48 routes.

This is comfortably inside every 2026 bundle-budget guideline. **Performance is
not a problem on this site and needs no work in this plan.**

---

## 3. Unified findings register

Severity is business impact, not effort. **Src** shows which plan found it —
`—` means none did.

| # | Finding | Sev | Src | Task |
|---|---|---|---|---|
| U1 | **39 of 41 built pages canonicalise to the site root** (only `/about` and `/trade` self-reference) | 🔴 | B, C | `P1-T1` |
| U2 | `[PLACEHOLDER: …]` renders under "Proof, not promises" on **all six** industry pages — **confirmed live on production** | 🔴 | B | `P1-T2` |
| U3 | Trade is "published product" on three surfaces and "design preview, not deployed" in five articles | 🔴 | A | `P1-T3` |
| U4 | Declared host (apex) ≠ served host (www); all 39 sitemap URLs are redirects | 🟠 | B, C | `P1-T4` |
| U5 | Duplicated word in the retail title tag | 🟠 | B | `P1-T5` |
| U6 | `llms.txt` states false things about the site's own demos | 🟠 | B | `P1-T6` |
| U7 | `CONTEXT.md` §3 and §7 are factually stale | 🟠 | — | `P1-T7` |
| U8 | `--color-faint` on `--color-canvas-subtle` = 4.32:1, fails WCAG AA 1.4.3 | 🟠 | A | `P2-T1` |
| U9 | `scroll-behavior: smooth` ungated (WCAG 2.3.3) | 🟡 | A | `P2-T2` |
| U10 | 38 of 39 `<button>` carry no explicit `type` — **defensive, not a live bug, see X12** | 🟢 | A | `P2-T3` |
| ~~U11~~ | ~~Honeypot input not `aria-hidden`~~ — **retracted, see X10** | — | A | none |
| U12 | No `autoComplete`; selects carry unchosen default values (WCAG 1.3.5) | 🟡 | B | `P2-T4` |
| U13 | No security response headers | 🟡 | A, B | `P2-T5` |
| U14 | Unsanitised name interpolated into the mail subject | 🟢 | A | `P2-T6` |
| U15 | No `twitter` card metadata | 🟢 | A | `P2-T7` |
| U16 | 184 kB unused `app/c_logo.png` | 🟢 | B | `P2-T8` |
| U17 | No `Article` schema on insights; no page schema on case studies | 🟠 | A, B, C | `P3-T2` |
| U18 | No `dateModified`/`updated` anywhere; no sitemap `lastmod` | 🟡 | B, C | `P3-T1`, `P3-T4` |
| U19 | `BreadcrumbList` only on `/trade` | 🟡 | B, C | `P3-T3` |
| U20 | No `Service` on solutions; `@id` graph not joined — **duplicate `Organization` on industry pages and duplicate `WebSite` on `/trade`**, evidenced in build output | 🟡 | C | `P3-T5` |
| U21 | **24 of 41 titles exceed 60 chars** (worst 87); 7 descriptions exceed 160 (worst 226) | 🟡 | B, C | `P3-T6` |
| U22 | One shared OG image for 43 pages | 🟢 | B | `P3-T7` |
| U23 | No analytics — `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` unset | 🟠 | B, C | `P4-T1` |
| U24 | No lead capture at the two highest-intent surfaces (consultant, demos) | 🟠 | B | `P4-T2`, `P4-T3` |
| U25 | Form submissions not persisted — a Resend failure loses the lead | 🟠 | B | `P4-T4` |
| U26 | Homepage buries demos and proof below an undifferentiated process section | 🟠 | B | `P4-T5` |
| U27 | H1 carries no vertical, outcome, or target term | 🟠 | B | `P4-T6` |
| U28 | Rate limiting is per-instance; Gemini spend is unbounded | 🟡 | A, B | `P4-T7` |
| U29 | Internal link density 0.0–0.8 per 1k words against a 5–10 target | 🟠 | C | `P5-T1` |
| U30 | Only 2 of 10 articles contain a comparison table | 🟡 | C | `P5-T2` |
| U31 | Opening answers average 83 words vs the 40–60 extraction window | 🟡 | C | `P5-T3` |
| U32 | Em-dash density 7.9/1k in content; title template puts one in all 31 titles | 🟡 | A, C | `P5-T4` |
| U33 | Thin pages: `/industries/enterprise` 136 words; demo routes 154–191 | 🟡 | C | `P5-T5` |
| U34 | No `/privacy` or `/terms` — blocks the entire directory layer | 🟠 | C | `P5-T6` |
| U35 | Eyebrow overuse; repeated three-equal-card rows; numbered step labels | 🟢 | A | `P6-T1`–`T3` |
| U36 | 9 of 11 pages render zero images | 🟡 | A | `P6-T4` |
| U37 | Hero is a div-built fake product UI with invented patient names | 🟡 | A | `P6-T5` |
| U38 | No dark mode | ⚪ opt | A | `P7-T1` |
| U39 | **Form result not announced; focus destroyed on success** (WCAG 4.1.3 + 2.4.3) — primary conversion path | 🟠 | — | `P2-T9` |
| U40 | **Next 14.2.35 is the terminal 14.x release**; 4 high advisories, no fix inside the major | 🟠 | — | `P7-T4` |
| U41 | Consultant widget: no dialog semantics, no Escape-to-close, no focus move or return | 🟡 | — | `P2-T10` |
| U42 | Mobile nav: no Escape-to-close, no focus management | 🟡 | — | `P2-T10` |
| U43 | 4 files use `outline-none` with no `focus-visible` replacement in file | 🟡 | — | `P2-T11` |
| U44 | Insight pages emit **no** `openGraph` block — no `og:type: article`, no published time | 🟡 | — | `P3-T8` |
| U45 | `opengraph-image.tsx` fetches its own `/icon.png` over HTTP at render, through the 308 | 🟡 | — | `P3-T9` |
| U46 | No error tracking anywhere; `error.tsx` discards the `error` prop; no `global-error.tsx` | 🟡 | — | `P4-T8` |
| U47 | **No tests and no CI** — zero automated guard on typecheck, lint, build, or schema | 🟠 | — | `P0-T5` |
| U48 | No RSS/Atom feed for 10 articles | 🟢 | — | `P3-T10` |
| U49 | Two **more** unused public assets — total dead weight is ~503 kB, not 184 kB | 🟢 | — | `P2-T8` |
| U50 | No `viewport` export → no `themeColor` for mobile browser chrome | 🟢 | — | `P2-T12` |
| U51 | `not-found.tsx` exports no metadata — the 404 inherits the default title | 🟢 | — | `P2-T12` |
| U52 | No `apple-icon`, no web app manifest | 🟢 | — | `P2-T12` |
| U53 | HSTS is Vercel's default `max-age` only — no `includeSubDomains`, no `preload` | 🟢 | — | `P2-T5` |
| U54 | All six JSON-LD blocks inject raw `JSON.stringify` into `dangerouslySetInnerHTML` without escaping `<` | 🟢 | — | `P2-T13` |

### Verified correct — do not "fix" these

- `components/home/CtaBandVideo.tsx` — three independent gates (viewport width,
  `prefers-reduced-motion`, IntersectionObserver at `rootMargin: 100%`), plus
  `muted`/`playsInline`/`aria-hidden`/`tabIndex={-1}`, fading in on `canplay`.
  Better than most production sites. **Leave it alone.**
- `lib/testimonials.ts` empty with a component that renders nothing — the
  correct pattern, and the model `P1-T2` should copy.
- `SoftwareApplication` gating on both surfaces.
- `/pricing` correctly `noindex` and withheld from the sitemap.
- `trade.corewellsystems.com` robots.txt — only `/` and `/login` indexable, by
  design.
- Exactly one `<h1>` per page; decorative images `alt=""`; `/trade` screenshots
  carry real alt text; `next/image` on `/trade` uses `sizes` and `priority`
  correctly.
- Mobile nav `aria-expanded`/`aria-controls`; consultant widget `role="log"` +
  `aria-live="polite"`; form labels correctly associated by wrapping.
- API routes: input validation, length caps, honeypot, server-side keys,
  plain-text mail body, nothing stored, graceful 503.
- Single teal accent, tokenised, passing AA. Semantic emerald/rose/amber
  confined to demo status UI and form errors. **Correct as-is.**
- Warm off-white canvas over pure white; 1240px container cap; no `h-screen`
  heroes; clean client/server boundary at 20 leaf client components.
- `case-studies` `region` values are counts ("Four locations"), **not**
  geography — no guardrail-8 violation despite the field name.
- **Performance.** Build-verified: 87.3 kB shared First Load JS, 96.2–154 kB per
  route, 48 routes, exit 0. Comfortably inside every 2026 bundle budget.
  **Performance needs no work in this plan** — do not add a bundler analyser, do
  not code-split further, do not chase a number that is already good.
- **The honeypot.** Already correct — see X10. Do not touch it.
- **`/pricing` handling.** Prerendered, `noindex`, absent from the sitemap, and
  deliberately *not* robots-disallowed so Google can crawl it to see the
  noindex. All three choices are right.
- **AI-crawler access.** `robots.txt` default-allows everything. That is the
  correct posture for the GEO/AEO strategy — **never add `Disallow` rules for
  GPTBot, PerplexityBot, ClaudeBot or similar.**

---

## 4. Owner decisions

Deduplicated from A's six gates, B's ten blocked items, and C's seven. Split by
whether they actually block work — the source plans over-blocked.

### 4.1 Blocking a specific task, nothing else

| # | Question | Blocks | Default if unanswered |
|---|---|---|---|
| **D1** | **Is Corewell Trade a published product or a design preview?** Three surfaces say one thing, five articles say the other. | `P1-T3` | **None — must be answered.** Guardrail 4. Do not guess a maturity label. |
| **D2** | **Apex or `www` as the canonical host?** | `P1-T4` only | `www` (matches what serves; one line; zero infra risk) |
| **D3** | **Plausible domain** — add `corewellsystems.com` at plausible.io, set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Vercel. | `P4-T1` | Ship the rest unmeasured, and say so |
| **D4** | **Privacy + terms content**, including what the AI widget stores and for how long. | `P5-T6`, and the whole directory layer | Build the routes, leave content as `NEEDS OWNER` |
| **D5** | **Dark mode — do you want it?** | `P7-T1` | No. Skip. |
| **D6** | **HSTS `includeSubDomains; preload`?** It binds `trade.corewellsystems.com` and every future subdomain to HTTPS-only, and preload submission is effectively irreversible. | part of `P2-T5` | Ship HSTS without `preload`; add it later once subdomain plans are settled |
| **D7** | **Error tracking service** (Sentry or similar)? A third-party script, a privacy decision, a CSP entry, and a cost. | part of `P4-T8` | No service. Log the error digest to Vercel logs — that needs no dependency and no permission |
| **D8** | **When to take the Next.js major upgrade?** Not urgent — nothing in the advisory set is exploitable here — but 14.x will never be patched again. | `P7-T4` | After Phase 1 is live and verified. Never stacked on top of unverified indexation fixes |

### 4.2 Blocked, but not blocking anything else

Do not work around these. Do not substitute invented content.

| Item | Why blocked | What unblocks it |
|---|---|---|
| Publish `/pricing` | Ranges await sign-off, **and** it is structurally blocked: `NavBar.tsx` documents the row already needs ~1130 of 1176px — adding "Pricing" overflows it (the bug fixed in `eead461`). Publishing needs a nav decision, not just un-hiding a link. | Sign-off on $8–25k / $25–80k / scoped, **plus** a decision on what leaves the nav |
| Populate `lib/testimonials.ts` | Guardrail 1. Also the single easiest claim on a website to disprove. | One real, permissioned quote |
| Set `illustrative: false` on a case study | Guardrail 1 / 11. | Go-live year, whether multi-location is real, one true non-identifying outcome |
| Corewell Trade backend | 15 days past its own estimate; no `api`/`server`/`prisma` directory exists. `/trade` is published as product marketing, which `CONTEXT.md` records was meant to happen *after* the backend shipped. | Owner decision: build it, or reframe `/trade`. Drifting is the only option that costs credibility without buying anything. Feeds **D1**. |
| Move retail/education off `design` maturity | Guardrail 4. The label follows reality, not marketing need. | A deployed installation |
| Clutch / G2 / Capterra / GoodFirms profiles | Off-site account work. Cannot ship from this repo — and it is the **highest-impact item in any of the three plans**, because recommendation is governed by aggregate web consensus, not your own copy. | Owner to create accounts; ideally one referenceable client |
| Wikidata item with `P1889` "different from" → the similarly-named health system | The one entity-disambiguation lever that lives off-site and does not require naming a competitor in your own copy. | Owner decision; Wikidata notability rules apply |
| Sources for the 15–20% maintenance ratio and the Odoo "tens of thousands" claim | Guardrail 1 — real source or stay hedged. | A named, linked, dated source, or leave as-is |
| Confirm the "systems we build and operate" experience line | Guardrail 1 — do not assert operational experience this audit cannot verify. | Owner confirmation before publishing |
| Retainer / recurring-revenue offer | Business-model decision. | Owner decision |
| `clinic.corewellsystems.com` healthcare replica | Would fix the inverted demo strategy — the `production` vertical currently has the weakest demo while a `design` vertical has the flagship. Plan at `docs/healthcare-demo-plan.md`. | Owner to confirm ownership of the source codebase first |
| Proprietary research (benchmark, survey, dataset) | Highest-weighted factor in AI citation selection, and nobody in the competitor set is doing it. Requires real data. | Owner input on what can honestly be measured and published |
| `.agents/`, `.claude/skills/`, `skills-lock.json` — commit or ignore? | Housekeeping only. | Owner preference; default is **gitignore** |

---

## 5. The work

### Phase 0 — Baseline

**`P0-T1` · Snapshot before touching anything**

```bash
mkdir -p .audit && git rev-parse HEAD > .audit/baseline-sha.txt
for p in "" industries/healthcare insights/what-is-an-online-pos-system technology trade about; do
  echo "/$p :: $(curl -sL -m 25 --compressed "https://www.corewellsystems.com/$p" | grep -o 'rel="canonical" href="[^"]*"')"
done | tee .audit/canonical-before.txt
```

- **Acceptance:** at least four of six print `href="https://corewellsystems.com"`.
- Add `.audit/` to `.gitignore` in the same commit. Never commit audit scratch.

**`P0-T2` · Confirm a clean tree** — `npx tsc --noEmit && npm run lint`, both
exit 0. (Both did at audit time with the 14 copy edits applied.)

**`P0-T3` · Land the pending copy edits**

14 modified files, 82 insertions / 82 deletions. Review `git diff` to confirm
they are rephrasings, then commit as one commit so this plan's changes stay
separable from them.

- **Guardrail:** if any hunk introduces a *claim* rather than rephrasing one,
  stop and flag it.
- **Acceptance:** `git status --short` clean except intended untracked files.

**`P0-T4` · Resolve the `.gitignore` question** (owner default: ignore)

**`P0-T5` · Add CI (U47)** — *the highest-leverage task in Phase 0*

There is no `.github/`, no test runner, and no CI of any kind. Every check in
this plan is currently a check someone has to remember to run. Add
`.github/workflows/ci.yml` running on push and pull request:

```yaml
- npx tsc --noEmit
- npm run lint
- npm run build
- npm run audit          # the §6 harness, once P7-T2 lands
```

Full unit tests are overkill for a marketing site — but zero automated guard
means every regression in this document can silently come back. This workflow is
the cheapest insurance available and it costs one file.

- **Acceptance:** a deliberately broken type or a reintroduced `PLACEHOLDER`
  string fails the workflow.
- **Note:** CI runs on GitHub. If the owner wants this session's work to stay
  local, commit the workflow but do not push until they say so.

---

### Phase 1 — Stop the site lying about itself 🔴

> Nothing later is worth anything until `P1-T1` and `P1-T2` ship. Every SEO,
> content and distribution action is currently being applied to pages that tell
> Google to ignore them, under a heading that reads "Proof, not promises" above
> a literal `[PLACEHOLDER]`.

**`P1-T1` · Fix canonical inheritance (U1)** — *the single highest-value change
in this document*

1. **Remove** `alternates: { canonical: "/" }` from `app/layout.tsx:46`. Keep
   `metadataBase` — it is what resolves relative canonicals.
2. Add `lib/seo.ts` with a helper so this cannot regress:

```ts
import type { Metadata } from "next";

/**
 * Per-page canonical + og:url.
 *
 * The root layout must NOT set `alternates` — App Router metadata is inherited
 * into every child route, which previously made all interior pages canonicalize
 * to the homepage. Every page owns its canonical instead.
 *
 * Paths are root-relative and resolved against `metadataBase`, so the canonical
 * host stays a one-line change in lib/site.ts.
 */
export function canonical(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}`;
  return { alternates: { canonical: clean }, openGraph: { url: clean } };
}
```

3. Spread `...canonical("/route")` into every page's metadata:

| File | Path | Note |
|---|---|---|
| `app/page.tsx` | `/` | **has no `metadata` export — add one** |
| `app/industries/page.tsx` | `/industries` | |
| `app/solutions/page.tsx` | `/solutions` | |
| `app/how-we-work/page.tsx` | `/how-we-work` | |
| `app/technology/page.tsx` | `/technology` | |
| `app/case-studies/page.tsx` | `/case-studies` | |
| `app/insights/page.tsx` | `/insights` | |
| `app/book-consultation/page.tsx` | `/book-consultation` | |
| `app/pricing/page.tsx` | `/pricing` | keep `robots: { index: false, follow: false }` |
| `app/about/page.tsx` | `/about` | migrate to the helper |
| `app/trade/page.tsx` | `/trade` | migrate to the helper |
| `app/industries/[slug]/page.tsx` | `` `/industries/${params.slug}` `` | inside `generateMetadata` |
| `app/industries/[slug]/demo/page.tsx` | `` `/industries/${params.slug}/demo` `` | inside `generateMetadata` |
| `app/solutions/[slug]/page.tsx` | `` `/solutions/${params.slug}` `` | inside `generateMetadata` |
| `app/insights/[slug]/page.tsx` | `` `/insights/${params.slug}` `` | inside `generateMetadata` |
| `app/case-studies/[slug]/page.tsx` | `` `/case-studies/${params.slug}` `` | inside `generateMetadata` |

- **Watch for** the early-return `if (!x) return {};` branches in
  `generateMetadata` — leave them, they precede `notFound()`.
- **Use relative strings.** Never absolute URLs. This is what makes **D2**
  non-blocking.
- **Verify:**
  ```bash
  rm -rf .next && npm run build
  for f in $(find .next/server/app -name "*.html" | sort); do
    echo "$(echo $f | sed 's|.next/server/app||') :: $(grep -o 'rel="canonical" href="[^"]*"' "$f")"
  done
  ```
- **Acceptance:** every path prints a canonical **matching its own path**, and
  no two pages share one. Locally the host reads `http://localhost:3000` because
  `.env.local` overrides `NEXT_PUBLIC_SITE_URL` — **check the path, not the
  host.**
- **Risk:** low. Purely additive metadata, reversible in one commit.

**`P1-T2` · Remove the live `[PLACEHOLDER]` (U2)**

`app/industries/[slug]/page.tsx:329`, under *"Proof, not promises"*.

Correct behaviour: render the matching case study where one exists, render
**nothing** where none does. Case studies carry an `industry` slug
(`lib/content.ts` → `CaseStudyMeta.industry`). Existing mappings: healthcare →
`connected-clinic-network`, hospitality → `boutique-hotel-group`, retail →
`regional-retail-chain`. Education, construction-real-estate and
legal-professional-services have none.

Follow the `Testimonials.tsx` pattern — the section renders nothing when there
is nothing true to put in it.

- **Constraint:** do **not** write a substitute proof paragraph. Guardrail 1. A
  missing section is correct; an invented one is not.
- **Verify:** `grep -rl "PLACEHOLDER" .next/server/app/ || echo "CLEAN"`
- **Acceptance:** prints `CLEAN`; the three industries with a study link to it;
  the three without render no orphan heading and no stray border.

**`P1-T3` · Resolve the Corewell Trade contradiction (U3) — needs D1**

Three surfaces say "published product": `app/trade/page.tsx`,
`lib/consultant-prompt.ts:18`, and the nav. Five articles say "a design preview
on fabricated sample data, not a deployed installation".

Once **D1** is answered, align **all eight surfaces** in one commit. Also verify
the articles' claim that it "says so on every screen" is actually true of the
deployed app before leaving that sentence in.

- **Do not guess.** Guardrail 4: calling a design preview live is the worst
  available error, and the reverse understates a real asset.
- **Acceptance:** `grep -rn "design preview" content/ app/ lib/` and the `/trade`
  copy describe one status, consistently.

**`P1-T4` · Settle the canonical host (U4) — needs D2, blocks nothing else**

Both resolutions are valid; Google's only requirement is that you pick one and
be consistent.

| Option | Action | Change |
|---|---|---|
| **www** *(default)* | Accept what already serves | `lib/site.ts:8` → `https://www.corewellsystems.com`; update `CONTEXT.md` §7 |
| **apex** | Flip the Vercel domain config so apex is primary | No code change; needs dashboard access |

Everything downstream — canonicals, sitemap, `robots.txt`, JSON-LD `@id` —
derives from `siteUrl`, so this is genuinely one edit.

- **Verify:** `curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n"` on
  both hosts. Exactly one returns `200`; the other `301`/`308` to it; that host
  equals `siteUrl`.
- **Acceptance:** `grep -rn "corewellsystems.com" lib/ app/ --include="*.ts*"`
  shows one host form. After deploy, sitemap URLs return `200`, not `308`.
- **Note:** Search Console is a domain property — it already covers both hosts.
  No re-verification. The sitemap does need resubmitting.

**`P1-T5` · Fix the duplicated retail title (U5)**

`app/industries/[slug]/page.tsx:36` builds `` `${industry.name} Management
Software` ``; `lib/industries.ts:149` is already `"Retail & Shop Management"`.

Add an optional `metaTitle` (or `titleNoun`) to the `Industry` type rather than
string-munging the name — string surgery breaks again the next time an industry
is named with a trailing noun.

- **Acceptance:** `grep -o '<title>[^<]*</title>'` on the built retail page shows
  no doubled word; the other six industry titles are unregressed.

**`P1-T6` · Correct `llms.txt` (U6)**

Lines 33–36 call the Education and Retail demos "coming soon"; both have been
live for weeks. Corewell Trade and `/trade` are not mentioned at all.

- Fix the factual errors, add Trade with the maturity label **D1** settles.
- **Keep the file** — it costs nothing — but do not expand effort on it. This is
  a guardrail-1 issue (the site stating false things about itself), not an SEO
  one. Treat `llms.txt` as zero-weight for AI citations.

**`P1-T7` · Correct `CONTEXT.md` (U7)**

§3 says "`/insights` 5 articles" — there are **10**. §7 says "apex canonical,
www redirects" — production does the reverse. Both mislead any agent that
treats `CONTEXT.md` as ground truth. Update §3, and update §7 to whatever
`P1-T4` settles.

**Phase 1 done when:**

```bash
npx tsc --noEmit && npm run lint && rm -rf .next && npm run build
grep -rl "PLACEHOLDER" .next/server/app/ || echo "no placeholders"
```
…all clean, canonicals self-reference, one host form, no doubled title, Trade
described consistently. **Then hand back for a deploy decision**, and after
deploy resubmit the sitemap and request re-indexing for the top 15 URLs. Expect
**two to four weeks** before judging any downstream effect.

---

### Phase 2 — Standards compliance, zero copy risk 🟠

Everything here is mechanical. No visual redesign, not one word of copy.

**Do `P2-T9` first, out of numeric order.** It is the only WCAG failure in this
plan sitting on the conversion path — a screen-reader user currently submits the
consultation form and receives silence, with focus thrown to `<body>`. The
numbering follows the source plans' grouping; the priority does not.

**`P2-T1` · Fix the contrast failure (U8)**

`app/globals.css:22` — `--color-faint: 121 113 107;` (`#79716B`) computes to
**4.32:1** on `--color-canvas-subtle` (`#F5F3EF`). Change to:

```css
--color-faint: 116 108 102; /* #746C66 — 4.89 canvas / 4.64 canvas-subtle / 5.15 surface */
```

Verified: clears AA on all three surfaces at the smallest perceptual change.

While here, correct the stale comment at `globals.css:26–27` — it claims the
accent passes "at ~5.9:1"; the measured value is **5.20:1** on canvas. Still
passes; the comment is just wrong.

- **Acceptance:** the contrast check in §6 reports zero failures.

**`P2-T2` · Gate smooth scroll (U9)**

`app/globals.css:34–36`:

```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

- **Acceptance:** with `prefers-reduced-motion: reduce` emulated, anchor
  navigation jumps instantly.

**`P2-T3` · Button types (U10)**

Add `type="button"` to every non-submit `<button>` — **39 occurrences, none
currently typed.** Inside a form the HTML default is `submit`; this is a latent
bug, not a style preference. Leave the one real submit button at
`ConsultForm.tsx:127` as `type="submit"`.

- **Do not** touch the honeypot — plan A's finding on it was wrong (X10); it is
  already correctly hidden from assistive technology by its wrapper.
- **Acceptance:** `grep -rho '<button' app components | wc -l` equals the count
  with `type=`; axe-core reports no new violations.

**`P2-T4` · Form accessibility and data quality (U12)**

`components/consult/ConsultForm.tsx`:
- `autoComplete="name"` / `"email"` / `"organization"` on lines 75 / 79 / 86
  (WCAG 2.1 AA SC 1.3.5).
- Give the Industry (`:90`) and Budget (`:103`) selects an explicit unselected
  first option — `<option value="">Select…</option>` — so no submission carries
  a value the user never chose.
- Add `aria-invalid` and an `aria-describedby` error region on failed submit
  rather than relying only on native validation.
- **Do not touch** field `name` attributes or their order (guardrail 12).
  Labels are already correctly associated by wrapping — leave them.

**`P2-T5` · Security headers (U13)**

`next.config.mjs` is 6 lines. Add a `headers()` block:

- `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` denying camera, microphone, geolocation, payment.
- **`Strict-Transport-Security` (U53):** live responses carry only Vercel's
  default `max-age=63072000` — no `includeSubDomains`, no `preload`. Upgrade to
  `max-age=63072000; includeSubDomains; preload`. **Check with the owner
  first:** `includeSubDomains` also binds `trade.corewellsystems.com` and any
  future subdomain to HTTPS-only, and `preload` is effectively irreversible
  once submitted to the browser preload list.

Verified live on production — the response carries **only** HSTS and
`Server: Vercel`. `X-Powered-By` is already stripped, so `poweredByHeader: false`
is unnecessary.
- Frame protection via CSP `frame-ancestors` (preferred over
  `X-Frame-Options`).
- **CSP must allow:** Cal.com embed (`app.cal.com` — frame + script), Plausible
  (`plausible.io` — script + connect) if **D3** lands, and Google Fonts only if
  `next/font` is not self-hosting (verify first — it usually does).
  `generativelanguage.googleapis.com` is **server-side only** and does **not**
  belong in a browser CSP.
- **Critical:** ship as `Content-Security-Policy-Report-Only` first. Load every
  page — especially `/book-consultation` with its Cal.com embed, and one demo
  route — check the console, then switch to enforcing in a follow-up commit. A
  CSP that breaks the booking embed costs more than it protects.
- **Acceptance:** `curl -I` on the deployed preview shows each header; CSP is
  report-only on first ship.

**`P2-T6` · Mail subject hygiene (U14)**

`app/api/consult-request/route.ts:79`. Strip `[\r\n]` from any value used in a
subject line. **Note honestly:** this posts JSON to Resend's API, so it is not
an SMTP header-injection vector — this is defence in depth and keeps subjects
single-line. One line of code; do not describe it as a vulnerability fix.

**`P2-T7` · Twitter card metadata (U15)** — add
`twitter: { card: "summary_large_image" }` to the root metadata in
`app/layout.tsx`.

**`P2-T8` · Asset cleanup (U16, U49)**

Three unused image assets, not one. Verify each has zero references, then delete:

| File | Size | Referenced by |
|---|---|---|
| `app/c_logo.png` | 184 kB | nothing (only `c_logo-withoutbg.png` is imported) |
| `public/Corewell_LOGO.png` | 215 kB | **nothing** |
| `public/WITHOUT_BG.png` | 103 kB | **nothing** |

~503 kB of dead weight, all publicly served from a public repo. Leave
`public/media/cta-loop.mp4` — `CtaBandVideo` gates it correctly.

- **Verify:** `grep -rl "<name>" app components lib content public` returns
  nothing for each before deleting.

**`P2-T9` · Announce the form result and keep focus (U39)** — *fix this before
any other accessibility item; it is on the only flow that makes money*

`components/consult/ConsultForm.tsx` swaps the whole `<form>` for a success
`<div>`. Two failures, one fix:

1. **WCAG 4.1.3 (AA):** the result is never announced. Wrap the success, error
   and `unconfigured` states in a container carrying `role="status"` and
   `aria-live="polite"` (`role="alert"` for the error state). The live region
   must exist in the DOM **before** the state change so the update is
   announced — a region that appears at the same moment as its content is
   unreliable across screen readers.
2. **WCAG 2.4.3:** focus sat on the submit button, which unmounts. Move focus
   deliberately to the success heading — give it `tabIndex={-1}` and `.focus()`
   in an effect — so the user lands on the confirmation instead of `<body>`.

- **Acceptance:** submit with a screen reader (or NVDA/VoiceOver) — the
  confirmation is spoken and focus lands on it. Repeat for the failure path.
- **Note:** this pairs naturally with `P2-T4`'s `aria-invalid` /
  `aria-describedby` work. Do them in one commit.

**`P2-T10` · Escape and focus for overlays (U41, U42)**

- `components/consultant/ConsultantWidget.tsx` — the panel opens over the page
  with `aria-expanded` on the trigger and `role="log"` inside, but no dialog
  semantics. Add `role="dialog"` + `aria-modal="true"` + an accessible name,
  close on `Escape`, move focus into the panel on open, and **return focus to
  the trigger on close**.
- `components/layout/NavBar.tsx` — the mobile menu has correct
  `aria-expanded`/`aria-controls`/`aria-label` but no `Escape` handler and no
  focus management. Add both.
- **Acceptance:** keyboard-only, open each, press `Escape`, and confirm focus
  returns to the control that opened it.

**`P2-T11` · Restore focus indicators (U43)**

Four files apply `outline-none` with no `focus-visible` rule in the same file:
`ConsultForm.tsx`, `ConsultantWidget.tsx`, `HealthcareDemo.tsx`,
`HospitalityBooking.tsx`. The form and widget substitute only a 1px
`focus:border-accent` — which does clear 1.4.11 non-text contrast (5.47:1 on
`surface`), but is a weak indicator on the conversion path.

Replace with a real ring: `focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`, and
keep `outline-none` scoped to `focus-visible` so mouse users see nothing extra.

- **Guardrail 13:** do not remove any existing focus ring while doing this.
- **Acceptance:** every interactive element in those four files shows a visible
  ring on keyboard focus.

**`P2-T12` · Document head completeness (U50, U51, U52)**

- Add a `viewport` export to `app/layout.tsx` (Next 14 moved `viewport` and
  `themeColor` out of `metadata`): `export const viewport: Viewport = {
  themeColor: "#FAF9F6" }`.
- Give `app/not-found.tsx` a `metadata` export with its own title — the 404
  currently inherits the site default.
- Add `app/apple-icon.png` and `app/manifest.ts`. Low value individually; they
  are what "complete" looks like in a head audit.

**`P2-T13` · Escape JSON-LD before injection (U54)**

All six JSON-LD blocks do
`dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }}`:
`app/layout.tsx:142,148` · `app/industries/[slug]/page.tsx:76` ·
`app/insights/[slug]/page.tsx:59` · `app/trade/page.tsx:90` ·
`components/FaqSection.tsx:38`.

`JSON.stringify` does **not** escape `<`. A value containing `</script>` closes
the tag early and everything after it is parsed as HTML:

```
JSON.stringify({name: "Test</script><img src=x onerror=alert(1)>"})
→ {"name":"Test</script><img src=x onerror=alert(1)>"}     ← breaks out
```

**There is no live vulnerability today** — every input is repo-authored
(`lib/industries.ts`, `lib/faqs.ts`, hardcoded objects). The one path that could
change is `faqJsonLd` on insights, which is built from **MDX frontmatter**: the
moment anyone authors an FAQ answer containing that string, it injects.

Add one shared helper and route all six through it:

```ts
export const jsonLdScript = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
```

`<` is valid JSON and parses back to `<`, so the structured data is
unchanged — validators see identical output.

- **Acceptance:** all six call sites use the helper; a schema validator still
  passes on `/trade` and one insight page; adding `</script>` to a test FAQ
  answer produces escaped output rather than a broken page.
- **Severity note:** report this honestly as defence-in-depth, not as a live
  exploit. Overstating it is the same error as A-F10 (X3).

**Phase 2 gate:** `npx tsc --noEmit`, `npm run lint`, `npm run build`, the §6
harness, and Lighthouse on `/` and `/trade`. Record a11y and SEO scores next to
the Phase 0 numbers.

---

### Phase 3 — Structured data and discovery 🟠

**`P3-T1` · Add `updated` to content (prerequisite for `P3-T2` and `P3-T4`)**

- Add optional `updated?: string` to `InsightMeta` and `CaseStudyMeta` in
  `lib/content.ts` (currently `date` only), read from MDX frontmatter, falling
  back to `date`.
- Render "Last updated {date}" beside the publish date only when `updated`
  exists and differs.
- **Guardrail:** do **not** backfill `updated` across all ten articles to
  manufacture freshness. Set it only where content actually changed — including
  the files touched in `P0-T3`. Fake freshness is the same class of error as a
  fake metric.

**`P3-T2` · `Article` schema on insights and case studies (U17)**

`app/insights/[slug]/page.tsx` emits `FAQPage` only (`:47`). Add an `Article`
node in the same `@graph`:

```ts
{
  "@context": "https://schema.org",
  "@type": "Article",
  headline: insight.title,          // truncate to 110 chars for schema only, never the H1
  description: insight.description,
  datePublished: insight.date,
  dateModified: insight.updated ?? insight.date,
  author:    { "@id": `${siteUrl}/#organization` },   // Organization, never a person — guardrail 2
  publisher: { "@id": `${siteUrl}/#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/insights/${insight.slug}` },
  inLanguage: "en",
}
```

Reuse the root layout's Organization `@id` so the graph joins up instead of
creating a second, unlinked entity.

For case studies: `Article` is the honest type for `illustrative: true` pieces —
they are written explanations, not verified reports. **Do not** use `Review`, or
any `CreativeWork` flavour implying a measured client result. Keep the visible
sample-data badge exactly as is.

- **Acceptance:** built articles show `Article` + `FAQPage` + `BreadcrumbList`;
  case studies show `Article` + `BreadcrumbList`; each validates at
  `validator.schema.org` with zero errors.

**`P3-T3` · `BreadcrumbList` site-wide (U19)**

New `components/Breadcrumbs.tsx` — a server component taking
`{ trail: { name: string; href: string }[] }`, rendering
`<nav aria-label="Breadcrumb">` with an ordered list (last item unlinked,
`aria-current="page"`) and emitting the JSON-LD. Copy the shape already proven
at `app/trade/page.tsx:64–82`, then refactor `/trade` onto the component so
there is one implementation.

Apply to `insights/[slug]`, `case-studies/[slug]`, `industries/[slug]`,
`industries/[slug]/demo`, `solutions/[slug]`. Replace the existing
"← All insights" / "← All case studies" back-links — do not keep both.

This is also the cheapest partial fix for `P5-T1`: breadcrumbs are free internal
links on every page.

**`P3-T4` · Sitemap `lastmod` (U18)**

`app/sitemap.ts` emits `changeFrequency` and `priority` — the two fields Google
has said it largely ignores — and omits `lastModified`, the one it uses. Add
`lastModified` per route from `updated ?? date` for MDX routes and the last git
commit date for static ones. Consider dropping `changeFrequency`/`priority` in
the same change.

- **Acceptance:** `<lastmod>` count equals the `<loc>` count (39), not 0.

**`P3-T5` · `Service` schema and `@id` linkage (U20)**

- `Service` on `/solutions/[slug]` with `provider: { "@id": siteUrl +
  "/#organization" }` and `serviceType` from `lib/solutions.ts`. **No price
  fields** (guardrail 5).
- Add `isPartOf` / `publisher` / `provider` pointing at the Organization `@id`
  on the existing free-floating `FAQPage` and `SoftwareApplication` blocks so
  everything joins one entity graph.
- **Fix the duplicate nodes the build revealed.** `/industries/healthcare`
  emits `Organization` **twice** and `/trade` emits `WebSite` **twice** — the
  page-level blocks inline a second copy of an entity the root layout already
  declares with a stable `@id`. Replace every inlined copy with an `@id`
  reference. Duplicate entity nodes are the specific thing that stops a
  knowledge graph resolving one entity, which is the whole point of the
  disambiguation work in `app/layout.tsx`.
- **Do not** add `SoftwareApplication` anywhere new (guardrail 4).
- **Acceptance:** `grep -o '"@type":"Organization"' <built page> | wc -l`
  returns **1** on every page; same for `WebSite`.

**`P3-T6` · Title and description lengths (U21)**

Targets: titles 50–60 chars *including* the ` — Corewell Systems` suffix;
descriptions 150–160. Measured from built output, so these are exact:

- **24 of 41 titles exceed 60.** Worst offenders: `custom-software-vs-off-the-shelf`
  **87**, `sell-online-without-breaking-your-shop-stock` **84**,
  `what-is-an-online-pos-system` **79**, `/how-we-work` **78**,
  `wholesale-distribution-software-what-it-should-do` **77**,
  `hotel-management-software-features-that-actually-matter` **77**,
  `odoo-alternatives-when-custom-erp-makes-sense` **76**.
- **Descriptions over 160:** `/technology` **226**, `/` **215**, `/about` **210**,
  `wholesale-distribution` **205**, `odoo-alternatives` **196**, `sell-online`
  **191**, `connected-clinic-network` **190**.
- **Wastefully short:** `/solutions` (28), `/solutions/ai-automation` (32),
  `/book-consultation` (38), `/industries/enterprise` (45) — the template leaves
  real room here; use it for a qualifier that earns the click, not padding.
- **`P5-T4`'s title-template change helps every one of these** by reclaiming
  characters from the separator. Sequence them together.

Where an article's title must shorten, give it an explicit shorter `title` in
`generateMetadata` while the `<h1>` keeps the full question — **the H1 is the
GEO/AEO answer target and must not be shortened.**

**`P3-T7` · Per-article OG images (U22)** — ⚠️ **attempted and reverted; blocked
on a toolchain bug, not on design.**

`app/insights/[slug]/opengraph-image.tsx` was written and it typechecks, but the
build fails: reading article titles from the MDX collection requires the **Node**
runtime, and `@vercel/og`'s Node build calls `fileURLToPath` on its own bundled
assets and throws `TypeError: Invalid URL` during prerender **on Windows**. This
is the same bug that forced `P3-T9` back to the edge runtime.

It would very likely build on Linux — CI and Vercel both run Ubuntu — but
shipping something that cannot be built on the machine it is developed on is a
bad trade for a 🟢 Low finding.

Two ways forward, neither taken:
1. **Edge runtime + a generated `slug → title` map** (the `app/og-logo.ts`
   pattern). Works today, but duplicates titles into a second file that can
   drift from the MDX — the exact failure mode this project already suffers
   from elsewhere. Only worth it with a regeneration step wired into the build.
2. **Develop on WSL/Linux**, where the Node runtime path works.

Until then the site keeps one shared OG card. Revisit when `@vercel/og` fixes
the Windows path handling.

**`P3-T8` · `openGraph` on insight pages (U44)**

`app/insights/[slug]/page.tsx` emits **no** `openGraph` block at all, so every
article inherits the root's `type: "website"`. Add per-article:

```ts
openGraph: {
  type: "article",
  publishedTime: insight.date,
  modifiedTime: insight.updated ?? insight.date,
  title: insight.title,
  description: insight.description,
  url: `/insights/${params.slug}`,
}
```

The `url` comes free if you use the `canonical()` helper from `P1-T1`. Mirror
the same for case studies.

**`P3-T9` · Fix the OG image's self-fetch (U45)**

`app/opengraph-image.tsx` sets `export const runtime = "edge"` and does
`await fetch(`${siteUrl}/icon.png`)` **at render time** — a self-referential HTTP
call that, because `siteUrl` is the apex, follows a 308 to `www` on every card
generated.

The build confirms the cost: the route is marked
`ƒ (Dynamic) server-rendered on demand`, and the build emits
`⚠ Using edge runtime on a page currently disables static generation for that
page`. **So the fetch runs on every single render, uncached.** It is wrapped in
`try/catch` and degrades to a logo-less card, so it never errors — it just
silently produces a broken brand card whenever the site is briefly unreachable
or `NEXT_PUBLIC_SITE_URL` points somewhere without that asset (local dev, every
preview deploy).

Two changes, both small:
1. Replace the fetch with a static import or an inlined base64 buffer so the
   card has **no network dependency**.
2. Drop `runtime = "edge"` so the card can be statically generated. Nothing in
   it needs the edge runtime once the fetch is gone.

- **Acceptance:** the OG card renders with the logo when the site is
  unreachable — test by building with `NEXT_PUBLIC_SITE_URL` set to a dead host.
  The build no longer prints the edge-runtime warning.

**`P3-T10` · RSS/Atom feed (U48)**

Ten articles and no feed. Add `app/insights/feed.xml/route.ts` emitting RSS 2.0
or Atom from `getInsights()`, and reference it from the root layout:
`alternates: { types: { "application/rss+xml": "/insights/feed.xml" } }`.

Cheap, standards-expected for a content site, and a genuine discovery and
citation surface — feed readers and aggregators are exactly the kind of
third-party surface §4.2 notes the site currently has none of.

---

### Phase 4 — Measurement and conversion 🟠

> Do `P4-T1` first if **D3** has landed. Shipping conversion changes with no
> measurement means you will not know whether they worked.

**`P4-T1` · Enable analytics (U23) — needs D3**

`app/layout.tsx:137` already renders Plausible conditionally on
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. The code is correct; the variable is absent. Set
it in Vercel. **Do not substitute a different provider without asking** — a
third-party script is a privacy and CSP decision, not an implementation detail.

Also worth doing while here: **Bing Webmaster Tools** verification and sitemap
submission (Bing is Copilot's index and most sites skip it), and **IndexNow**
for faster recrawl after the Phase 1 fixes.

- **Acceptance:** `curl -s https://<host>/ | grep -c plausible` returns `1`.

**`P4-T2` · Lead capture in the AI consultant (U24)**

`components/consultant/ConsultantWidget.tsx`. The highest-intent visitors on the
site sit in an open text channel with no way to leave contact details.

- After a substantive exchange (≥3 user turns, or once the model has offered the
  consultation), surface an **optional inline** email field — *"Want this
  summarised and sent to you?"* Not a modal. Not a gate.
- **The chat must remain fully usable without an email.** Gating it contradicts
  the site's central promise of no signup and no sales call.
- Reuse `/api/consult-request` or add a sibling route with the same validation,
  honeypot and rate-limit treatment.
- `lib/consultant-prompt.ts` needs a matching rule so the assistant's behaviour
  and the UI agree — that file is the assistant's entire world model, and
  anything the site does that is not written there is not sayable.

**`P4-T3` · Lead capture on demo exit (U24)** — a non-blocking end-of-flow card
or dismissible bar after N interactions in `components/demo/`. Same rule: never
gate the demo.

**`P4-T4` · Persist form submissions (U25)**

`app/api/consult-request/route.ts` returns 502 and stores nothing when Resend
fails — a lead can be lost silently. Add durable capture **before** the send
attempt (Vercel KV, a Sheet via a service account, or a second delivery
channel); at minimum log the payload server-side so it is recoverable from
Vercel logs.

- **Privacy:** this stores personal data. Keep it out of the public repo,
  credentials in env vars, and raise retention with the owner before choosing a
  store.

**`P4-T5` · Reorder the homepage (U26)**

`app/page.tsx` — verified current order is
Hero → IndustryMorph → **ProcessSection** → DemoStrip → ProofSection →
Testimonials → InsightsPreview → CtaBand. Move demos and proof up:

```
Hero → IndustryMorph → DemoStrip → ProofSection → ProcessSection
     → Testimonials → InsightsPreview → CtaBand
```

Process is the least differentiated section on the page — every agency has four
steps — while the demos are the site's actual argument. Check the alternating
section backgrounds still alternate afterwards: `ProofSection` carries
`border-y` + `bg-canvas-subtle` and will sit next to different neighbours.

**`P4-T6` · Rewrite the H1 (U27) — owner review**

`components/home/Hero.tsx:12` — *"Engineering software that powers modern
businesses."* — carries no vertical, no outcome and no target term, on a site
whose two structural problems are an entity collision and invisibility in
buyer-intent search. The raw material is already three lines below it: four
working systems, openable without signup, in clinics and hotels.

**Draft two or three options and present them.** Do not ship unilaterally —
headline copy is the owner's call. Keep within guardrails 1, 7 and 8: no
metrics, no tech in the headline, no geography.

**`P4-T7` · Bound the rate limiter (U28)**

`lib/rate-limit.ts` is a module-scope `Map`, so each Vercel instance has its own
window — effectively no shared limit, and the Gemini route is metered spend. At
current traffic the exposure is small, but it is *unbounded*, which is the wrong
shape for a spend risk. Cheapest fix: a hard per-day request ceiling in the
route. Shared-window options (Vercel KV, Upstash) add a paid dependency — **ask
before adding one.**

**`P4-T8` · Error visibility (U46)**

Today an error in production is invisible. `app/error.tsx` destructures only
`reset` — the `error` prop (with its `digest`) is **discarded**, so nothing is
logged, reported, or recoverable. There is no `global-error.tsx`, so a throw in
the root layout falls through to Next's default page. And there is no error
tracking dependency of any kind.

1. In `app/error.tsx`, add a `useEffect` that reports `error` (and
   `error.digest`) — at minimum `console.error`, which surfaces in Vercel's
   function logs and makes the digest traceable.
2. Add `app/global-error.tsx` with its own `<html>`/`<body>`, since it replaces
   the root layout.
3. **Ask before adding a tracking service.** Sentry and friends are a third-party
   script, a privacy decision, a CSP entry (`P2-T5`), and a cost — the owner
   decides, not the agent. Steps 1 and 2 need no dependency and no permission.

---

### Phase 5 — Content depth 🟡

> Only after Phase 1 has been live two to three weeks. Publishing more content
> onto pages that de-index themselves wastes it.

**`P5-T1` · Internal linking (U29)** — measured 0.0–0.8 links per 1,000 words
against a 5–10 target; five internal links across 13,155 words of insight
content, all pointing at `/trade`.

- Build the cluster map from **existing data**, not guesswork: the `industry`
  slug on each case study, the `keywords` arrays in insight frontmatter, and
  `lib/solutions.ts` `appliesTo`. Write it to `lib/related.ts` as explicit,
  reviewable data.
- Clusters visible today: **ERP/POS/distribution** (the five `/trade`-linking
  articles + `/industries/retail` + `regional-retail-chain`); **healthcare**;
  **hospitality**; **build-vs-buy** (cross-cutting).
- Three directions: in-body contextual links on descriptive anchor text (never
  "read more"); related-reading blocks on industry, solution and case-study
  pages (currently linking to zero articles); reciprocal links from each article
  back to its industry page.
- Generalise the `relatedReading` array already at `app/trade/page.tsx:21–45`
  into `components/RelatedReading.tsx`.
- **Acceptance:** every article ≥ 5.0 links/1k words; every industry and
  solution page links to ≥ 2 articles; no broken MDX links.

**`P5-T2` · Comparison tables (U30)** — only 2 of 10 articles have one, and
comparison content is the most-cited content type in AI answers. Priority:
`custom-software-vs-off-the-shelf` (a directly comparative article with **no
table** — highest value in the set), then `odoo-alternatives-when-custom-erp-makes-sense`,
`what-does-owning-custom-software-actually-save-you`,
`hotel-management-software-features-that-actually-matter`.

- **Be genuinely balanced.** Obviously biased comparisons are penalised by AI
  systems and disbelieved by readers mid-evaluation. Where off-the-shelf
  genuinely wins, say so — that is also what `/about`'s "we say no when it's the
  right answer" already commits to.
- `remark-gfm` is configured; GFM tables render without changes.

**`P5-T3` · 40–60 word lead answers (U31)** — openings average 83 words; one of
ten is in range. **Do not delete content** — the existing openings are direct
and complete, which is the site's real strength. Add a tight 40–60 word answer
as the first block and let the current paragraph follow as expansion. Also lift
the two thin FAQ sets (`custom-software-vs-off-the-shelf` 43 avg,
`hotel-management-software-features` 39 avg) toward 50 words.

**`P5-T4` · Em-dash pass (U32)** — target **≤ 2 per 1,000 words** in content,
not zero.

1. **Title template first.** `app/layout.tsx:30` is `"%s — Corewell Systems"` —
   one line that puts an em-dash in all 31 page titles, every browser tab and
   every SERP entry. Chrome, not prose: the largest visible win at the lowest
   copy risk. This also helps `P3-T6`.
2. Structural and label strings (nav, badges, captions, alt text, buttons).
3. Body copy last, and only to the ≤ 2/1k target. Restructure sentences —
   period, comma, parentheses, colon. **A hyphen substituted for an em-dash is a
   typographic error, not a fix.**
- **Constraint:** meaning must not drift. Several sentences carry deliberate
  hedging that protects factual claims. Where a rewrite would change what a
  sentence asserts, **leave it and log it.**
- Sweep for the other tells while in there: "delve", "leverage", "robust",
  "comprehensive", "seamless", "in today's…", "it's worth noting that".
- **Framing:** this is reader perception, not ranking. Google does not penalise
  AI-assisted content. It matters because the company sells engineering
  credibility to skeptical buyers.

**`P5-T5` · Thin pages (U33)** — `/industries/enterprise` at 136 rendered words;
demo routes at 154–191 with the value locked in client JS. Add a written frame
to demo routes (what it shows, what to click, what the underlying system does) —
preferred over removing them from the sitemap, because it makes them citable.
Keep the maturity badge language exactly as `demoBadge()` produces it. Bring
education (580), retail (580) and construction (548) toward the healthcare
(1,558) and hospitality (1,480) standard.

**`P5-T6` · `/privacy` and `/terms` (U34) — needs D4**

Neither exists, while the site runs a consultation form and a Gemini-backed
widget that both accept user input. This is an E-E-A-T trust gap **and a hard
block on the entire off-site directory layer** — most Tier 1 and Tier 2
directories reject submissions without them.

**Build the routes and the footer links; do not draft legal text as fact.** The
content needs owner sign-off, and the widget's data handling needs a real answer
about what is stored and for how long. Add both to `app/sitemap.ts`.

**`P5-T7` · Content expansion** *(sequenced after the above, each its own
decision)*

- **The "buy" comparison cluster** — per-seat SaaS maths versus owning a system,
  one article per vertical. Each must end on the honest answer: **sometimes
  buying is right.** That is what makes the rest credible.
- **Answer the "90% of custom fit" objection** — the strongest line the
  off-the-shelf option has, unanswered anywhere on the site. The honest answer
  is that the missing 10% is where the operation actually differs, and the
  question is whether that 10% is a spreadsheet workaround or a real cost.
  Belongs on `/insights/custom-software-vs-off-the-shelf` and `/solutions`.
- **Glossary** — definition pages for the terms buyers search. Low risk, no
  owner input, feeds "what is X" queries directly.
- **Cost calculator** — natural fit, since the top article is a cost question.
  Must output **ranges** with an explicit "indicative only, scoped per
  engagement" disclaimer to stay inside guardrail 5.
- **Stats/benchmarks page** — the highest-value link-earning asset, and
  **blocked on real sourced figures**. Do not build it from invented numbers.

---

### Phase 6 — Visual and layout debt 🟢

Deliberately last. This is the design audit's core, and it is real — but design
debt costs nothing while the pages it decorates are telling Google to ignore
them. Do not start before Phase 1 is live.

**Do not use A's counts as thresholds** (see X6). Re-measure first and set
thresholds from what you actually observe.

**`P6-T1` · Eyebrow cull (U35)** — target roughly one per three sections.
`/trade` and `/how-we-work` are the worst. On `/trade`, the sequence
"The problem / The idea / The channels / Everything in it / Try it / The
comparison / The fit / Straight answers" is the exact templated rhythm the rule
exists to stop — the headline alone carries each section. `industries/[slug]` is
one template, so fixing it once fixes six pages. **Deletion only, no new copy.**

**`P6-T2` · Retire numbered step labels (U35)** — remove the
`String(i + 1).padStart(2, "0")` treatment in `ProcessSection`, `ProofSection`,
`ProofLedger`, `how-we-work`, `solutions`, `solutions/[slug]`,
`book-consultation`. **Keep `<ol>` semantics** for screen readers; drop only the
rendered `01`/`02` glyph. Where the number carried visual rhythm, substitute a
hairline rule or accent tick so the layout does not collapse.

**`P6-T3` · Break the three-equal-card rows (U35)** — three instances:
`app/about/page.tsx:146`, `app/how-we-work/page.tsx:221`,
`app/book-consultation/page.tsx:38`. Give each a different layout family so no
two pages repeat: a 2-column split with grouped items; a `divide-y` list with
generous row padding; an asymmetric 2+1 grid.

Also: nav height 81px → ≤ 80px; the `/trade` eyebrow using two middle dots on
one line; lists over 5 items (the 9-item list on `/industries/healthcare`)
regrouped into chunks or a card grid.

**`P6-T4` · Images (U36)** — 9 of 11 pages render zero images. Priority: `/`
(hero plus one supporting), `/industries/[slug]` (one per industry — the
template makes this five pages at once), `/how-we-work`, `/about`.

Source in order: **real screenshots from the four working demo routes** — free,
and exactly on-brand for a company whose argument is "open it and look"; then
image generation if available; then labelled placeholder slots plus a note to
the owner. **Do not** fill space with hand-rolled decorative SVG, and do not use
div-built fakes. Every image needs `next/image`, correct `sizes`, `priority`
only on the LCP image, and real alt text.

- **Acceptance:** every marketing route renders at least one real image; LCP
  under 2.5s on `/`; CLS under 0.1.

**`P6-T5` · The hero panel (U37)**

`components/home/HeroSystem.tsx` is a div-built clinical UI with invented
patient names. Its job is "proof before the fold", so any fix must preserve
that. Preferred: a real screenshot in the existing `BrowserFrame` component,
which already handles `next/image`, sizing and the address pill — there are 16
real screenshots in `public/trade/`, and a healthcare equivalent can be captured
from the existing demo route. **At minimum, replace the invented patient
names.**

Also in the hero: cut the subtext from 26 words to ≤ 20; remove the sub-CTA
tagline ("Four working systems you can open right now") — move it to the
DemoStrip heading, which already makes the same point; reduce the H1 scale so it
sets in 2 lines at 1280px rather than 3.

- Note `P4-T6` may replace the H1 entirely — **do these together** if so.

---

### Phase 7 — Optional and regression guard

**`P7-T1` · Dark mode (U38) — only if D5 says yes**

Add a dark token block under `@media (prefers-color-scheme: dark)`, redefining
only the existing variables so no component changes. Warm charcoal, not
`#000000`. Raise accent lightness — `#0F766E` will not hold 4.5:1 on a dark
canvas. Audit the four components that hardcode non-token colours
(`HeroSystem`, `ConsultForm`, `demo/primitives`, demo screens). Verify the
`CtaBand` video scrim does not invert. One theme per page — no section inverts
independently.

**`P7-T2` · Wire the harness into a guard** — add §6 to a pre-commit hook or CI
with thresholds **measured after Phase 6**, not copied from A's figures.

**`P7-T3` · Update the record** — `docs/spec.md` changelog, `PROGRESS.md`,
`OWNER-CHECKLIST.md`, and `CONTEXT.md` for anything this work closed or newly
owes.

**`P7-T4` · Plan the Next.js major upgrade (U40)**

`next@14.2.35` is the **last** 14.x release. `npm audit --omit=dev` reports 4
high-severity advisories whose only offered remedy is `next@16.3.1` — a breaking
major. Nothing in the current advisory set is exploitable here (no Server
Actions, no middleware, no i18n, no rewrites, no custom server; the `postcss`
issues are build-time), so **this is not an emergency**. But no patched 14.x will
ever exist, so the gap only widens.

Treat it as a scheduled project, not a Phase-2 chore:

1. Read the 14 → 15 and 15 → 16 upgrade guides. The 15 jump is the substantive
   one: `params`/`searchParams` become async in `generateMetadata` and page
   props, and fetch caching defaults changed. **Every `generateMetadata` touched
   by `P1-T1` is affected** — which is an argument for doing the canonical work
   now and the upgrade after, not the reverse.
2. Upgrade on a branch. `npx @next/codemod@canary upgrade latest` handles most
   of it.
3. Gate on the full §6 harness plus a visual pass on `/`, `/trade`, one industry
   page and one demo. Framer Motion, `next-mdx-remote` and `@calcom/embed-react`
   are the three dependencies most likely to need their own bumps.
4. **Do not run `npm audit fix --force` on `main`.** It performs exactly this
   major upgrade with no testing.

- **Acceptance:** `npm audit --omit=dev` reports zero high severity; the harness
  passes; Cal.com embed, the consultant widget and all four demos still work.
- **Sequencing:** after Phase 1 is live and verified. Do not stack a framework
  major on top of unverified indexation fixes — if something breaks you will not
  know which change caused it.

---

## 6. Verification harness

Build this as `scripts/audit.mjs` + `scripts/seo-check.sh` and add
`"audit": "node scripts/audit.mjs"` to `package.json`.

**Critical:** seed its thresholds from **its own first run**, not from the
numbers in the source plans. A's figures do not reproduce (X6), and a harness
required to match them will fail immediately and stall the plan.

```bash
# Full local gate — before every commit
npx tsc --noEmit && npm run lint

# Clean production build (stop any dev server first)
rm -rf .next && npm run build

# Canonicals across built output — each must match its own path
for f in $(find .next/server/app -name "*.html" | sort); do
  echo "$(echo $f | sed 's|.next/server/app||') :: $(grep -o 'rel="canonical" href="[^"]*"' "$f")"
done

# JSON-LD inventory for one page
grep -o '"@type":"[A-Za-z]*"' .next/server/app/insights/SLUG.html | sort | uniq -c | sort -rn

# Title tags across built output
for f in $(find .next/server/app -name "*.html" | sort); do
  echo "$(basename $f) :: $(grep -o '<title>[^<]*</title>' "$f" | sed 's/<[^>]*>//g')"
done

# Placeholder leak check
grep -rl "PLACEHOLDER" .next/server/app/ || echo "clean"

# Untyped buttons
echo "buttons: $(grep -rho '<button' app components | wc -l) typed: $(grep -rho '<button[^>]*type=' app components | wc -l)"

# Em-dash density per content file (target <= 2.0/1k)
for f in content/insights/*.mdx; do
  w=$(wc -w < "$f"); d=$(grep -o '—' "$f" | wc -l)
  printf "  %-56s %.1f\n" "$(basename "$f" .mdx)" "$(awk "BEGIN{print $d/$w*1000}")"
done

# Internal link density (target >= 5.0/1k)
for f in content/insights/*.mdx; do
  w=$(wc -w < "$f"); l=$(grep -o "](/[a-z0-9/-]*)" "$f" | wc -l)
  printf "  %-56s %.1f\n" "$(basename "$f" .mdx)" "$(awk "BEGIN{print $l/$w*1000}")"
done

# Live production checks (read-only)
curl -sL -m 25 --compressed https://<host>/PATH | grep -o 'rel="canonical" href="[^"]*"'
curl -sI -L -m 25 https://<host>/ | grep -iE "content-security|x-frame|x-content-type|referrer-policy|permissions-policy"

# Secret leak check before any commit
git diff --cached | grep -iE "api[_-]?key|secret|password|Bearer " && echo "STOP" || echo "clean"

# Dependency advisories (production tree only)
npm audit --omit=dev

# Focus-indicator smell: outline-none with no focus-visible in the same file
grep -rln "outline-none" app components --include="*.tsx" | while read f; do
  grep -q "focus-visible" "$f" || echo "  NO FOCUS RING: $f"
done

# Unused public/app image assets
for a in $(ls public/*.png app/*.png 2>/dev/null); do
  n=$(basename "$a")
  grep -rq "$n" app components lib content 2>/dev/null || echo "  UNUSED: $a"
done

# Every target="_blank" carries rel
grep -rn -A2 'target="_blank"' app components | grep -c 'rel=' 
```

**Contrast check** — the token pairs, computed. Current measured values:

| | canvas `#FAF9F6` | canvas-subtle `#F5F3EF` | surface `#FFFFFF` |
|---|---|---|---|
| `faint` `#79716B` | 4.55 ✅ | **4.32 ❌** | 4.79 ✅ |
| `soft` `#57534E` | 7.25 ✅ | 6.88 ✅ | 7.63 ✅ |
| `ink` `#1B2430` | 14.87 ✅ | 14.12 ✅ | 15.65 ✅ |
| `accent` `#0F766E` | 5.20 ✅ | 4.94 ✅ | 5.47 ✅ |
| `faint` → `#746C66` *(proposed)* | 4.89 ✅ | 4.64 ✅ | 5.15 ✅ |

**Environment gotchas** — these have cost real time before (`CONTEXT.md` §10):

- Stop the dev server before `npm run build`; running both corrupts `.next`.
- `.env.local` sets `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, so locally
  built canonicals show `localhost`. **Check the path, not the host.**
- The in-app browser pane reports `viewport 0x0` when hidden — call
  `resize_window` with explicit dimensions before measuring anything.
- Hidden panes suspend `requestAnimationFrame` (Framer freezes) and throttle
  `setTimeout`. Verify interactive state via `aria-*` and computed styles; use
  `MessageChannel` ticks to await React renders.
- Labels styled `uppercase` return uppercase from `innerText` — case-sensitive
  assertions give false negatives.

---

## 7. Out of scope — do not do these

- **Rewriting the demos in `components/demo/`.** They are simulated product UI.
  Marketing design rules — the eyebrow cap, the three-card ban, the middle-dot
  ration — do not apply to them, and their semantic emerald/rose/amber status
  colours are correct.
- **Changing the accent colour.** Single teal, tokenised, passing AA. It is
  right.
- **Adding testimonials, metrics, client names, or case-study figures.**
- **Publishing `/pricing`.** `noindex` pending sign-off *and* a nav decision.
- **Location pages, city modifiers, or `LocalBusiness` schema.** Guardrail 8.
- **`SoftwareApplication` on any non-production tier.** Guardrail 4.
- **Named human authors, `/authors/`, or author bios.** Guardrail 2. The E-E-A-T
  cost is accepted deliberately.
- **Invented statistics** to satisfy any GEO citation lever. Real sources or
  hedged language — never a fabricated number.
- **Changes to `trade.corewellsystems.com`.** Its robots.txt is correct.
- **Adopting GSAP, nested "double-bezel" card shells, or a serif display face.**
  These come from sibling skills that contradict the primary rubric. Where they
  disagree, the primary rubric wins — recorded below so nobody "fixes" one rule
  into violating another.
- **Expanding `llms.txt` beyond factual correction.** Treat it as zero-weight
  for AI citations; fix it because the site should not state false things about
  itself, not for SEO.

### Recorded skill-pack contradictions

| Topic | Primary rubric | Conflicting sibling skill |
|---|---|---|
| Eyebrows | max 1 per 3 sections | `high-end-visual-design`: one before every H1/H2 |
| Serif display | strongly discouraged | `minimalist-ui`: Playfair / Instrument Serif for heroes |
| Centered hero | banned above variance 4 | `gpt-taste`: "Cinematic Center (highly preferred)" |
| Card surfaces | only when elevation earns it | `high-end-visual-design`: double-bezel shells on every card |
| Motion library | Framer Motion; never mix with GSAP | `gpt-taste`: "you MUST write real GSAP" |
| Inter | discouraged, with an accessibility-first override that applies here | v1 / `high-end` / `minimalist-ui`: banned outright |

---

## 8. Definition of done

**Phase 1 — the phase that matters:**
- [ ] Every route emits a self-referencing canonical; verified in built output
      and, after deploy, live on five URLs
- [ ] Zero `PLACEHOLDER` strings in build output; the three industries without a
      case study render no orphan section
- [ ] Corewell Trade described with one consistent maturity status across all
      eight surfaces
- [ ] One host form across `lib/`, `app/`, sitemap, robots and JSON-LD; sitemap
      URLs return `200`, not `308`
- [ ] No duplicated word in any title tag; `llms.txt` and `CONTEXT.md` state
      nothing false
- [ ] `tsc`, `lint` and `build` clean; the 14 copy edits committed
- [ ] Sitemap resubmitted; re-indexing requested for the top 15 URLs

**Phases 2–4:**
- [ ] All token pairs pass WCAG AA on every surface they are used on
- [ ] **The consultation form announces its result and keeps focus** — verified
      with a real screen reader on both the success and failure paths
- [ ] Consultant widget and mobile nav close on `Escape` and return focus to
      their trigger
- [ ] No interactive element suppresses its focus indicator without replacing it
- [ ] `npm audit --omit=dev` output reviewed and its applicability recorded
- [ ] CI runs typecheck, lint, build and the audit harness on every push
- [ ] Smooth scroll gated; 39 buttons typed; honeypot `aria-hidden`; form
      `autoComplete` and unselected select defaults in place
- [ ] Security headers live; CSP enforced only after a clean report-only pass
      covering `/book-consultation` and one demo route
- [ ] Articles carry `Article` + `FAQPage` + `BreadcrumbList`; case studies carry
      `Article` + `BreadcrumbList`; all validate with zero errors
- [ ] Sitemap carries `lastmod`, from real modification dates only
- [ ] Titles and descriptions in range, or documented as deliberate exceptions
- [ ] Analytics reporting; a lead can be captured from the consultant and from a
      demo, neither gated; a submission survives a Resend failure
- [ ] Homepage leads with demos and proof

**Phase 5+:**
- [ ] Every article ≥ 5.0 internal links per 1,000 words and ≤ 2.0 em-dashes per
      1,000 words
- [ ] ≥ 6 of 10 articles carry a comparison table; every article opens with a
      40–60 word answer
- [ ] `/privacy` and `/terms` live, footer-linked, in the sitemap
- [ ] No marketing route renders zero images; no page repeats a layout family

**Overall:** the site tells the truth about itself, is indexable, is measurable,
and can capture a lead from its two strongest assets. Everything past that is
owner-blocked and listed in §4.2.

---

## 9. Reporting back

When you stop — finished, blocked, or out of scope — report:

1. **Tasks completed**, by ID, with acceptance-test output for each.
2. **Tasks skipped**, by ID, with the reason (already done / wrong / blocked).
3. **Anything found that this plan did not anticipate**, especially anything
   contradicting §3. This was a point-in-time snapshot of 2026-08-20.
4. **Every `NEEDS OWNER` marker added**, verbatim, with its file and line.
5. **A consolidated list of what is still needed from the owner** — a standing
   convention on this project, not a one-off. Include any §4.2 item that became
   relevant during the work.

Do not report a phase complete on the strength of the edits having been applied.
Report it on the strength of its acceptance tests having passed.

---

## 10. The one-paragraph summary

Two defects are actively destroying the site's search presence, one is actively
embarrassing it, and one quietly breaks the only flow that makes money: every
interior page tells Google it is a duplicate of the homepage; the declared host
is not the served host; six industry pages render a literal `[PLACEHOLDER]`
under a heading reading "Proof, not promises"; and the consultation form
announces nothing and destroys keyboard focus when it succeeds. Fix those
first — they are a day and a half of work and nothing else counts until they
ship. Then close the mechanical standards gaps that carry no copy risk, then the
structured data, then measurement and lead capture, and only then the design
debt, which is real but costs nothing while the pages it decorates are invisible.
Two things sit outside all of that and both need a decision rather than a commit:
the framework major is past its patch window (not exploitable here, but it will
never be patched again), and the single highest-impact item in any of these
plans — third-party review presence on Clutch and G2 — cannot be shipped from
this repo at all.

**What "production-grade" means here, and where the site stands:**

| Dimension | Status |
|---|---|
| Correct, indexable, honest about itself | ❌ U1–U7 |
| Accessible (WCAG 2.1 AA) | ❌ U8–U12, U39, U41–U43 — including one failure on the conversion path |
| Secure (headers, secrets, input handling) | ⚠️ secrets and input handling ✅; response headers ❌ U13; framework EOL ⚠️ U40 |
| Discoverable (schema, sitemap, feeds, social) | ❌ U17–U22, U44, U48 |
| Measurable | ❌ U23 — no analytics, no error visibility (U46) |
| Converts what it attracts | ❌ U24–U27 |
| Guarded against regression | ❌ U47 — no tests, no CI |
| Performant | ✅ verified good — gated video, correct `next/image` on `/trade`, clean bundles |
| Type-safe and clean | ✅ `strict: true`, zero `any`, zero `console.*` |
| Design integrity | ⚠️ U35–U37 real but lowest priority |

Nine of eleven dimensions have open work. None of it is deep — the site is well
built, and most findings are single-file fixes. But "well built" and
"production-grade" are not the same claim, and today only the last three
columns support the second one.
