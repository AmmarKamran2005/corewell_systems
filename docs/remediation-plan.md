# Corewell Systems: Remediation Plan for an AI Agent

**Status:** proposed, not started
**Author:** audit pass, 2026-08-20
**Audited against:** `taste-skill` pack (`design-taste-frontend` v2 as primary), WCAG 2.1 AA, Core Web Vitals, Next.js 14 App Router practice, schema.org, OWASP basics
**Baseline commit:** `f55d40d` plus 14 uncommitted copy files from the AI-slop copy pass

---

## 0. How to use this document

You are an AI coding agent working on the Corewell Systems marketing site
(Next.js 14 App Router, TypeScript, Tailwind, Framer Motion).

Read Section 1 before touching anything. It contains constraints that override
any design rule in this plan. Then work phases in order. Do not skip ahead:
later phases assume earlier ones landed, and Phase 1 exists to make the rest
verifiable.

Each task carries an **acceptance criterion** that is mechanically checkable.
Run the check. If it does not pass, the task is not done.

Do not batch phases into one commit. One commit per phase, message describing
what changed and why, using the repo-local git identity.

---

## 1. Guardrails (these override everything below)

These come from the project owner and from `docs/spec.md`. Violating one of
these is worse than shipping every design defect in this plan.

### 1.1 Content provenance

* **Never invent copy, facts, metrics, client names, testimonials, regions, or
  product status.** If a task seems to need new factual copy, stop and add the
  question to the owner-decision list instead.
* Structural headings and UI chrome are fine to draft. Claims are not.
* `lib/testimonials.ts` must stay empty until real permissioned quotes exist.
  It renders nothing when empty by design. Do not add placeholders.
* Case studies are labelled `illustrative: true`. Do not remove that label and
  do not add figures, quotes, or named outcomes to them.

### 1.2 Brand and anonymity

* Company voice only. No founder name anywhere on the public site.
* Internal product names (Medocs, RehabDox, Hotelire) must never appear
  publicly. Corewell Trade is the one named product and may be described freely.
* Industries with no real system (Construction and Real Estate, Legal and
  Professional Services) keep their visible "Concept" labelling.
* Maturity labels are load-bearing: healthcare and hospitality are production,
  education and retail are Design Preview. Never relabel a design preview
  as live.

### 1.3 What never changes without explicit approval

Per `design-taste-frontend` Section 11.F and the project's own SEO position:

* URL structure and route slugs
* Primary nav labels
* Form field `name` attributes and their order (breaks analytics and autofill)
* The logo and wordmark
* Any legal, consent, or disclaimer copy, including the case-study
  illustrative notice

### 1.4 Preserve the accessibility work already there

The site has 18 `prefers-reduced-motion` / `useReducedMotion` usages, correct
implicit form labels, correct decorative `alt=""` on the logo, a skip link, and
focus-visible styling in 16 files. Do not regress any of it. If a change would
remove a focus ring or a reduced-motion guard, the change is wrong.

---

## 2. Decision gates: blocked until the owner answers

Do not start these. Surface them and wait.

| # | Question | Blocks |
|---|---|---|
| D1 | Corewell Trade status: "published product" (as `/trade` and `lib/consultant-prompt.ts:18` say) or "design preview, not a deployed installation" (as two insights articles say)? The site currently contradicts itself. | Phase 6 |
| D2 | Approve rewriting owner-approved sentences across all 31 pages to remove em-dashes? This is a copy change, not a visual one. | Phase 5 |
| D3 | Keep Inter, or switch display face? All four style skills discourage it; v2 allows it for accessibility-first B2B, which this arguably is. | Phase 4 |
| D4 | Is the hero's hand-built clinical panel replaceable with a real screenshot? Its purpose is "proof before the fold", so the fix must preserve that. | Phase 4 |
| D5 | Confirm the unsourced "15 to 20% of build cost per year" maintenance figure, used 4 times across 3 articles. | Phase 6 |
| D6 | Should `.agents/`, `.claude/skills/`, `skills-lock.json` be gitignored or committed? | Phase 0 |

---

## 3. Findings summary

Ranked by severity times confidence. "Rule" cites `design-taste-frontend` v2
unless noted.

| # | Finding | Severity | Rule / standard | Phase |
|---|---|---|---|---|
| F1 | `text-faint` on `bg-canvas-subtle` measures 4.32:1, fails AA | High | WCAG 2.1 AA 1.4.3, skill 4.5 | 2 |
| F2 | No dark mode anywhere (0 `prefers-color-scheme`, 1 `dark:`) | High | skill 6.C | 3 |
| F3 | 13 pages emit no canonical URL | High | SEO practice | 2 |
| F4 | Insights articles carry no `Article` / `BlogPosting` schema | High | schema.org, Google rich results | 2 |
| F5 | ~443 user-visible em-dashes; title template puts one in all 31 titles | High | skill 9.G | 5 |
| F6 | Hero is a div-built fake product UI with fake names | High | skill 9.F, 4.8, 9.D | 4 |
| F7 | 9 of 11 pages have zero images | Med-High | skill 4.8 | 4 |
| F8 | Eyebrow overuse: `/trade` 9 vs cap 4, `/how-we-work` 7 vs cap 2 | Medium | skill 4.7 | 4 |
| F9 | No security headers configured | Medium | OWASP secure headers | 2 |
| F10 | `subject` interpolates unsanitised name into an email header | Medium | header-injection hardening | 2 |
| F11 | `scroll-behavior: smooth` not gated behind reduced motion | Medium | WCAG 2.3.3, skill 6.B | 2 |
| F12 | Hero: 3-line H1, 26-word subtext, banned sub-CTA tagline | Medium | skill 4.7 | 4 |
| F13 | Numbered step labels (`01`/`02`/`03`) in 7 components | Medium | skill 9.F | 4 |
| F14 | Three-equal-card feature rows in 3 places | Medium | skill 9.C | 4 |
| F15 | 39 `<button>` elements without explicit `type` | Low-Med | React practice | 2 |
| F16 | Nav measures 81px against an 80px cap | Low | skill 4.7 | 4 |
| F17 | Lists over 5 items rendered as plain lists | Low | skill 4.9 | 4 |
| F18 | Honeypot input not `aria-hidden` | Low | a11y | 2 |
| F19 | Middle-dot separator used twice on one line on `/trade` | Low | skill 9.F | 4 |
| F20 | No `twitter` card metadata | Low | SEO practice | 2 |

**Deliberately not findings.** The following were checked and pass, and must
not be "fixed": single teal accent with semantic emerald/rose/amber confined to
demo status UI and form errors; `Badge` live-dot (conveys real product status,
the permitted exception); no `h-screen` in heroes; no scroll cues, version
labels, or emoji; warm off-white canvas rather than pure white; 1240px container
cap; grid over flex math; client/server boundary (20 leaf client components);
API route rate limiting, honeypot, length caps, and plain-text email body.

---

## Phase 0: Setup and safety net

**Goal:** make later phases reversible and verifiable.

1. Resolve **D6**. If ignoring, add to `.gitignore`:
   ```
   .agents/
   .claude/skills/
   skills-lock.json
   ```
2. Commit the 14 pending copy files from the AI-slop pass as their own commit
   so this plan's changes are separable from them.
3. Record a baseline: run the harness in Section 4 and save the output to
   `docs/audit-baseline.txt`.

**Acceptance:** `git status --short` shows a clean tree except intended
untracked files. `npm run build` exits 0.

---

## Phase 1: Verification harness (do this before any fix)

**Goal:** every later phase is checked by a script, not by eyeballing.

Create `scripts/audit.mjs` that prints a report and exits non-zero on
regression. It must check:

1. **Em-dash count** in user-visible strings. Parse `.tsx`/`.ts`/`.mdx`,
   exclude comment lines, count `—` and `–`. Report per file.
2. **Contrast**: compute WCAG ratios for every token pair actually used
   (`faint`/`soft`/`accent`/`ink` against `canvas`/`canvas-subtle`/`surface`)
   and fail any combination below 4.5:1 for normal text.
3. **Eyebrow ratio** per page: count `uppercase tracking` occurrences against
   `<section` count; fail when count exceeds `ceil(sections / 3)`.
4. **Canonical coverage**: every `page.tsx` exporting metadata declares
   `alternates.canonical`.
5. **Image presence**: every marketing route renders at least one `next/image`.
6. **Banned patterns**: `h-screen` outside `body`, `type="button"` absence on
   non-submit buttons, hardcoded hex outside `globals.css`.

Add `"audit": "node scripts/audit.mjs"` to `package.json` scripts.

**Acceptance:** `npm run audit` runs, reports current state, and its numbers
match Section 3 of this document (443 em-dashes, 4.32:1 contrast failure,
13 canonical gaps, `/trade` 9 eyebrows).

---

## Phase 2: Correctness, accessibility, SEO, security

**Goal:** everything mechanical and zero-risk to copy or brand. No visual
redesign in this phase.

### 2.1 Fix the contrast failure (F1)

In `app/globals.css`, change:

```
--color-faint: 121 113 107;   /* #79716B, 4.32:1 on canvas-subtle: FAILS */
```
to
```
--color-faint: 116 108 102;   /* #746C66 */
```

Verified ratios at the new value: 4.64 on `canvas-subtle`, 4.89 on `canvas`,
5.15 on `surface`. This is the smallest change that clears AA on all three.

**Acceptance:** `npm run audit` reports no contrast failure.

### 2.2 Gate smooth scroll behind reduced motion (F11)

```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

**Acceptance:** with `prefers-reduced-motion: reduce` emulated, anchor
navigation jumps instantly.

### 2.3 Add canonical URLs to 13 pages (F3)

Add `alternates: { canonical: "<route>" }` to the metadata export of:
`book-consultation`, `case-studies`, `case-studies/[slug]`, `how-we-work`,
`industries`, `industries/[slug]`, `industries/[slug]/demo`, `insights`,
`insights/[slug]`, `pricing`, `solutions`, `solutions/[slug]`, `technology`.

Dynamic routes build the path from the slug inside `generateMetadata`.
`pricing` stays `noindex`; it still gets a canonical.

**Acceptance:** every rendered page emits exactly one `<link rel="canonical">`
matching its own route.

### 2.4 Add Article schema to insights (F4)

`app/insights/[slug]/page.tsx` currently emits only `FAQPage`. Add a
`BlogPosting` node using the frontmatter that already exists
(`title`, `description`, `date`) plus `Organization` as publisher. Keep the
existing FAQ node; emit both in a `@graph`.

Do not invent an author. Use the Organization as author, consistent with the
company-voice-only rule in 1.2.

**Acceptance:** Google Rich Results Test passes for `Article` and `FAQPage` on
one insights URL.

### 2.5 Add security headers (F9)

In `next.config.mjs`, add `headers()` returning at minimum:
`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`,
`X-Frame-Options: DENY`, and a `Permissions-Policy` denying
camera/microphone/geolocation.

Add a `Content-Security-Policy` in report-only mode first. The site loads
Google Fonts, Plausible (conditional), and a Cal.com embed, so a blocking CSP
will break the booking embed if written blind. Ship report-only, observe, then
enforce in a follow-up.

**Acceptance:** `curl -I` on the deployed preview shows each header. CSP is
`Content-Security-Policy-Report-Only` on first ship.

### 2.6 Harden the email subject (F10)

`app/api/consult-request/route.ts:79` interpolates `cleanName` into `subject`.
`str()` trims and length-caps but does not strip control characters. Strip
`[\r\n]` from any value used in a header position.

**Acceptance:** posting a name containing `\r\nBcc: x@y.z` produces a single
subject line and no additional recipient.

### 2.7 Small a11y and correctness items

* Add `type="button"` to every non-submit `<button>` (39 occurrences). Inside a
  form the HTML default is `submit`, which is a latent bug. (F15)
* Add `aria-hidden="true"` to the honeypot input in `ConsultForm.tsx`. (F18)
* Add `twitter: { card: "summary_large_image" }` to the root metadata. (F20)

**Acceptance:** `npm run audit` reports zero untyped buttons; axe-core reports
no new violations.

### 2.8 Phase gate

Run `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npm run audit`, and
Lighthouse on `/` and `/trade`. Record Lighthouse a11y and SEO scores in
`docs/audit-baseline.txt` next to the Phase 0 numbers.

---

## Phase 3: Dark mode (F2)

**Goal:** satisfy the mandatory dark-mode rule without touching a single string
of copy.

1. Add a dark token block in `globals.css` under
   `@media (prefers-color-scheme: dark)`, redefining only the existing
   variables. Keep the same variable names so no component changes.
2. Suggested direction, to be checked against the ratios in Phase 1's harness:
   near-black warm charcoal canvas rather than pure black (skill 9.A bans
   `#000000`); raise accent lightness so teal keeps at least 4.5:1 on the dark
   canvas, since `#0F766E` will not.
3. Audit the four places that hardcode non-token colors
   (`HeroSystem.tsx`, `ConsultForm.tsx`, `demo/primitives.tsx`, demo screens)
   and give each a dark counterpart.
4. `CtaBand` sits on `bg-ink-strong` with a video scrim. Verify the white text
   still reads in dark mode and that the scrim does not invert.
5. Respect skill 4.11: the page has one theme. No section may invert
   independently.

**Acceptance:** every token pair passes AA in both modes under
`npm run audit`; no section visually inverts mid-scroll in either mode;
screenshots of `/`, `/trade`, `/industries/healthcare` in both modes attached
to the commit.

---

## Phase 4: Visual and layout (the design debt)

**Goal:** remove the templated signals. This phase changes structure and
labels, not claims.

### 4.1 Hero (F6, F12): needs D4

Once D4 is answered:

* Replace the div-built clinical panel in `components/home/HeroSystem.tsx`.
  Preferred: a real screenshot in the existing `BrowserFrame` component, which
  already handles `next/image`, sizing, and the address pill. You have 16 real
  screenshots in `public/trade/`; a healthcare equivalent needs capturing from
  the existing healthcare demo route.
* If the panel survives D4, at minimum replace the fake patient names. Skill
  9.D bans the `S. Mitchell` / `D. Chen` family.
* Remove the tagline below the CTAs ("Four working systems you can open right
  now"). Skill 4.7 bans sub-CTA taglines outright. Move it to the DemoStrip
  section heading, which already makes the same point.
* Cut hero subtext from 26 words to 20 or fewer.
* Reduce H1 scale so it sets in 2 lines at 1280px. It currently sets in 3 at
  `text-6xl` / `leading-none`. Either drop to `text-5xl` at `lg` or shorten
  the headline (needs owner approval, it is approved copy).

**Acceptance:** at 1280x720, H1 is at most 2 lines, hero subtext is at most
20 words, hero contains at most 4 text elements, and both CTAs are above the
fold.

### 4.2 Eyebrow cull (F8)

Target `ceil(sections / 3)` per page.

* `/trade`: 11 sections, 9 eyebrows, cap 4. Delete at least 5. The sequence
  "The problem / The idea / The channels / Everything in it / Try it / The
  comparison / The fit / Straight answers" is the exact templated rhythm the
  rule exists to stop. The headline alone carries each section.
* `/how-we-work`: 5 sections, 7 eyebrows, cap 2. Delete at least 5.
* `/industries/healthcare` and the other `industries/[slug]` pages: 9 sections,
  5 eyebrows, cap 3. Delete at least 2. This is one template, so fix it once.
* `/book-consultation`: 3 sections, 2 eyebrows, cap 1.

This is deletion only. No new copy required, so it is not blocked on D2.

**Acceptance:** `npm run audit` reports no page above its eyebrow cap.

### 4.3 Retire numbered step labels (F13)

Remove `String(index + 1).padStart(2, "0")` treatments in
`ProcessSection`, `ProofSection`, `ProofLedger`, `how-we-work`, `solutions`,
`solutions/[slug]`, `book-consultation`. Skill 9.F: "the actual step content is
the label."

Keep the ordered-list semantics (`<ol>`) for screen readers; drop only the
rendered `01`/`02` glyph. Where the number carried visual rhythm, replace with
a hairline rule or accent tick so the layout does not collapse.

**Acceptance:** no rendered zero-padded index remains on a marketing page;
`<ol>` semantics preserved.

### 4.4 Break the three-equal-card rows (F14)

Three instances: About "principles" (`app/about/page.tsx:146`), How We Work
"standards" (`app/how-we-work/page.tsx:221`), book-consultation "expectations"
(`app/book-consultation/page.tsx:38`).

Skill 9.C bans the pattern. Replace each with a different family so the page
does not repeat a layout (skill 4.7 Section-Layout-Repetition Ban). Suggested,
one each so no two look alike: a 2-column split with grouped items; a
`divide-y` list with generous row padding; an asymmetric 2+1 grid.

**Acceptance:** no marketing page renders three identically-styled cards in an
equal 3-column row; each page uses at least 4 distinct layout families.

### 4.5 Images (F7)

Nine of eleven pages render zero images. Skill 4.8: a pure-text page is
incomplete work, not minimalism.

Ordered by value: `/` (hero plus one supporting), `/industries/[slug]` (one per
industry, and the template makes this five pages at once), `/how-we-work`,
`/about`.

Source in priority order: real screenshots from the four working demo routes,
which is both free and on-brand for a company whose argument is "open it and
look"; then an image-generation tool if one is available; then labelled
placeholder slots and a note to the owner. Do not fill space with hand-rolled
decorative SVG (skill 4.8) and do not use div-built fakes (skill 9.F).

Every image needs `next/image`, correct `sizes`, `priority` only on the LCP
image, and real alt text.

**Acceptance:** every marketing route renders at least one real image; LCP
stays under 2.5s on `/`; CLS under 0.1.

### 4.6 Small items

* Nav height 81px to 80px or below (F16).
* `/trade` eyebrow `Trade desk · Counter · Online` uses two middle dots; skill
  9.F allows one per line (F19).
* Lists over 5 items: the 9-item list on `/industries/healthcare` and the
  feature groups on `/trade` should use grouped chunks or a card grid (F17).

---

## Phase 5: The em-dash purge (F5), needs D2

**Goal:** zero `—` and zero `–` in user-visible text.

Scope: roughly 443 instances across page components, `lib/*.ts` content
modules, 13 MDX files, 8 page titles, the title template, and the site
description.

**This is a copy rewrite touching owner-approved sentences. Do not start it
without D2.**

Method, in this order:

1. **Title template first.** `app/layout.tsx:30` is
   `template: "%s — Corewell Systems"`. This single line puts an em-dash in all
   31 page titles, in browser tabs, and in Google results. Changing the
   separator to `|` or a hyphen is one edit for the largest visible win, and it
   is chrome rather than prose, so it carries the least copy risk.
2. **Eight page titles** that carry their own em-dash.
3. **Structural and label strings** (nav, badges, captions, alt text, button
   labels). Mechanical, low risk.
4. **Body copy last.** Restructure each sentence rather than swapping the
   character. Skill 9.G: two sentences with a period, or a comma, or
   parentheses, or a colon. A hyphen substituted for an em-dash is a typographic
   error, not a fix.

**Constraint:** meaning must not drift. This site's copy was reviewed by the
owner and several sentences carry deliberate hedging that protects factual
claims. When a rewrite would change what a sentence asserts, leave it and log
it for owner review instead.

**Acceptance:** `npm run audit` reports 0 em-dashes and 0 en-dashes in
user-visible strings; `git diff` reviewed sentence by sentence for meaning
drift; no claim strengthened or weakened.

---

## Phase 6: Content consistency, needs D1 and D5

1. **D1, Corewell Trade status.** Once answered, align all three surfaces:
   `app/trade/page.tsx`, `lib/consultant-prompt.ts:18`, and the two insights
   articles that call it "a design preview on fabricated sample data, not a
   deployed installation, and it says so on every screen." That last clause
   also asserts something about the product's own screens; verify it is true
   before leaving it in.
2. **D5, the maintenance percentage.** Either attribute the "15 to 20% of build
   cost per year" figure to a source, or soften it to a qualitative statement,
   in `how-much-does-a-custom-erp-system-cost.mdx`,
   `how-much-does-custom-healthcare-software-cost.mdx`, and
   `odoo-alternatives-when-custom-erp-makes-sense.mdx`.
3. Re-verify the unsourced Odoo claim ("deployed in tens of thousands of
   companies").

---

## Phase 7: Regression guard

1. Wire `npm run audit` into CI, or into a pre-commit hook if there is no CI.
2. Add the counts from this plan as thresholds so the numbers cannot silently
   climb back.
3. Update `docs/spec.md` changelog and `OWNER-CHECKLIST.md` with anything this
   work closed or newly owes.

---

## 4. Verification harness

Run all of these at every phase gate. All must pass.

```bash
npx tsc --noEmit
```

```bash
npm run lint
```

```bash
npm run build
```

```bash
npm run audit
```

Notes for the agent:

* Stop the dev server before running `npm run build`. Building while
  `next dev` is running corrupts `.next` in this repo. If it happens,
  `rm -rf .next` and rebuild.
* The in-app browser pane may not be displayed, in which case screenshots time
  out. Verify via `read_page`, computed styles through `javascript_tool`, and
  `curl` instead. Those are more precise for contrast and layout metrics anyway.
* A hidden browser pane throttles `setTimeout` and suspends `requestAnimationFrame`,
  which stalls Framer `AnimatePresence` swaps. Verify motion state via ARIA
  attributes and computed styles, not visual change.

---

## 5. Out of scope

Do not do these as part of this plan:

* Rewriting the demo applications in `components/demo/`. They are simulated
  product UI. Marketing design rules such as the eyebrow cap, the three-card
  ban, and the middle-dot ration do not apply to them, and their semantic
  emerald/rose/amber status colors are correct as they stand.
* Changing the accent color. Single teal, tokenised, passing AA. It is right.
* Adding testimonials, metrics, client names, or case-study figures.
* Publishing the pricing page. It is `noindex` pending owner sign-off.
* Adopting GSAP, or the "Double-Bezel" nested card treatment, or a serif
  display face. Those come from sibling skills in the pack that directly
  contradict `design-taste-frontend` v2, which is the primary rubric here.
  See Section 6.

---

## 6. Known contradictions inside the skill pack

Recorded so a future agent does not "fix" one rule into violating another.
`design-taste-frontend` v2 is primary; where a sibling skill disagrees, v2 wins.

| Topic | v2 (primary) | Conflicting skill |
|---|---|---|
| Eyebrows | max 1 per 3 sections | `high-end-visual-design`: eyebrow before every H1/H2 |
| Serif display | very discouraged; bans Instrument Serif and Fraunces | `minimalist-ui`: Playfair or Instrument Serif for heroes |
| Centered hero | banned above variance 4 | `gpt-taste`: "Cinematic Center (Highly Preferred)" |
| Card surfaces | cards only when elevation earns it | `high-end-visual-design`: Double-Bezel shells on every card |
| Motion library | Framer Motion; never mix with GSAP | `gpt-taste`: "You MUST write real GSAP" |
| Inter | discouraged, with an accessibility-first override | v1, `high-end`, `minimalist-ui`: banned outright |
