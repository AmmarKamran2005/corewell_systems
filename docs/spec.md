# KodeSparc — Web App Build Specification
*A working spec for building with Claude Code. Not a portfolio. A product-experience website for a boutique software company.*

---

## 0. How to use this document

Do **not** paste this entire file into Claude Code as one prompt. Long single mega-prompts cause agentic coding tools to lose the thread, skip steps, or make silent shortcuts on later sections.

Instead:
1. Save this file at `docs/spec.md` in your repo.
2. Start each Claude Code session with something like: *"Read docs/spec.md. We're on Phase 2 (Industries + Solutions pages). Implement that section only, following the design system in Section 4."*
3. Review each phase before starting the next. Commit after every phase.
4. Update this file as decisions change — it's your project's source of truth, not a one-time prompt.

Phases are listed in Section 12.

---

## 1. Project Identity

- **Company name:** Corewell Systems *(confirmed final by owner 2026-07)*
- **What this is NOT:** a freelancer portfolio, a template agency site, a "hire me" page, or a page built around any one named product.
- **What this IS:** an interactive product-experience site that makes visitors feel like they've opened a real, established software company's HQ — closer to how Stripe, Linear, or Vercel present themselves than a typical dev-for-hire site.
- **Brand identity, not personal identity:** the entire site speaks in company voice. No founder name, no personal bio, no "About the developer" section anywhere. This is a deliberate positioning choice — Corewell Systems should read as an established engineering company, not a solo operator's showcase.
- **No named, linked, or attributable real products:** none of the company's actual live systems are named or linked anywhere on the public site (no product names, no live URLs). Instead, capability is demonstrated through generic, industry-labeled interactive demos (see Section 6) and anonymized case studies (see Section 5). This protects existing client/product branding and lets the company present broader, more flexible capability than any single named product would imply.
- **Positioning statement:** "We design and build business software that solves real operational problems." Every page, CTA, and piece of copy should trace back to this line.
- **International framing:** the company should read as having delivered systems for organizations across multiple regions — Canada, the United States, Australia, and Pakistan — stated generally, never tied to a specific named client. *(Regions confirmed accurate by owner 2026-07.)*
- **Primary audience:** Non-technical decision-makers — clinic owners, hospital admins, school administrators, hotel owners, shop/retail owners, SME operators — plus international clients sourced via Upwork/LinkedIn who need to be convinced quickly that they're dealing with a real, capable company.
- **Core buyer psychology to design for:** the visitor is not evaluating code quality. They're evaluating *risk*. Every section should reduce perceived risk: interactive proof of working systems, clear process, no hype, no fake numbers, no fabricated names.

---

## 2. Tech Stack

Use this stack unless there's a specific reason to deviate — it's the standard, well-supported choice for this kind of site and keeps Claude Code's output predictable:

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router), TypeScript | SSR/SSG for SEO, industry standard |
| Styling | Tailwind CSS + a small custom design-token layer | Fast, consistent, avoids "generic Bootstrap" look if tokens are custom |
| Components | shadcn/ui as a base, heavily re-skinned | Accessible primitives, not a look-alike theme |
| Animation | Framer Motion | Purposeful motion, not particle-effect clutter |
| Content (blog/case studies) | MDX files in-repo to start; migrate to a headless CMS (Sanity) later if publishing volume grows | Ammar is a solo operator — don't over-engineer a CMS on day one |
| Forms / booking | Cal.com embed (or Calendly) for "Book Consultation"; Resend for transactional email | Reliable, cheap, fast to wire up |
| Analytics | Plausible or PostHog (privacy-respecting, GDPR-safe for international clients) | |
| Hosting | Vercel | Native Next.js support, easy previews per PR |
| AI Consultant widget | Anthropic API (server route calling Claude), streamed response | See Section 8 |
| Schema / SEO | `next-seo` + manual JSON-LD for Organization, SoftwareApplication, FAQPage | See Section 9 |

---

## 3. Information Architecture

```
Home
├── Industries (hub) — each page has an embedded generic interactive demo
│   ├── Healthcare
│   ├── Hospitality
│   ├── Education
│   ├── Retail & Shop Management
│   ├── Construction & Real Estate
│   ├── Legal & Professional Services
│   └── Enterprise / Custom (catch-all, styled as an invitation, not a numbered card)
├── Solutions
│   ├── Custom Software Development
│   ├── SaaS Platforms
│   ├── Mobile Apps
│   ├── Cloud & Deployment
│   └── AI Automation
├── Case Studies (anonymized — no client names, no live links; see Section 5)
├── Insights (blog — SEO/GEO/AEO engine)
├── Pricing (ranges/tiers, not a fixed price list)
├── About (company story only — no founder identity, see Section 5)
└── Book Consultation (single global CTA target)
```

No "Portfolio" nav item, anywhere. No standalone "Products" nav item either — capability is shown *inside* each Industry page as an interactive demo, not as a catalog of named, linkable products. If a visitor wants to see past work, that lives inside Industries and Case Studies, framed as evidence, never as a gallery of real branded systems.

---

## 4. Design System

**Reaction against generic dev-agency look:** no all-black hero, no purple/blue gradient blobs, no floating particle canvas, no neon glow buttons. Aim for *premium consulting firm meets modern SaaS*.

**Color palette:**
- Background: warm off-white (`#FAF9F6`–`#F5F3EF` range), not pure white
- Primary text/headings: deep navy or near-charcoal (`#111827`–`#1B2430`)
- Neutrals: soft warm grays for secondary text, borders, cards
- One accent color only — pick one: teal (`#0F766E`), emerald (`#047857`), or deep blue (`#1D4ED8`). Used sparingly: CTAs, active states, key icons. Not backgrounds.
- Dark mode: optional toggle, not the default identity of the brand.

**Typography:**
- Headings: a confident geometric or grotesque sans (e.g., Inter Display, General Sans, or a licensed alternative) at tight tracking
- Body: a highly readable sans (Inter, IBM Plex Sans)
- Avoid mixing more than 2 typefaces total.

**Spacing & layout:**
- Generous whitespace — sections should breathe, not feel cramped like a SaaS landing-page template
- 8pt spacing scale
- Max content width ~1200–1280px, full-bleed only for hero/industry-morph sections

**Motion principles (important — this is a differentiator):**
- Animate to *reveal meaning*, not to decorate. Example: scrolling into the Healthcare industry card should visually build up a mini system (Hospital → Doctor → Patient → Appointment → Invoice) as connected nodes, not just fade in.
- Page transitions between Industries should shift the accent theme and swap featured products/case studies — this is the "site feels alive" moment GPT described, and it's worth the engineering effort because it's the single most memorable interaction on the site.
- No autoplay carousels. No infinite marquees of logos unless the logos are real and permissioned.

**Component inventory to build once, reuse everywhere:** primary/secondary buttons, industry card, product card, case-study card, stat pill (only with real numbers), testimonial block (only with real testimonials), FAQ accordion, sticky nav with scroll-aware shrink, footer.

---

## 5. Page-by-Page Specs

### Home
1. Hero: one confident sentence (e.g., "Engineering software that powers modern businesses.") + subline + single primary CTA ("Book a Consultation") + secondary CTA ("Explore Industries")
2. Industry selector grid (5–6 cards) — clicking one re-themes the page preview inline, not just navigates away
3. "How we work" — 3–4 step process (Discover → Design → Build → Support), stated plainly, no jargon
4. Featured products strip (the real systems, named) with real "Live Product" badges
5. Proof section — real metrics only (e.g., "Live in production since 2024," "X active clinics using the clinical platform" — only if true and verifiable)
6. Insights preview (2–3 latest articles, pulls GEO/AEO traffic into the funnel)
7. Closing CTA band

### Industries (hub + one page per industry)
- Hub: grid of industry cards (Healthcare, Hospitality, Education, Retail & Shop Management, Construction & Real Estate, Legal & Professional Services, Enterprise/Custom), each linking to a dedicated page
- Each industry page: the operational problem in that industry → how software solves it → an embedded **generic interactive demo** for that industry (see Section 6 — labeled by function, e.g. "Healthcare Management System — Interactive Demo," never by a real product name) → an anonymized case study or proof block → CTA
- Industries with no real underlying system yet (currently: Construction & Real Estate, Legal & Professional Services) get an honest **"Concept — Available as Custom Build"** treatment instead of a demo, per Section 7. Do not fabricate a demo for these.

### Solutions
- Framed as capabilities, not tech stack. Each solution page: problem it solves, what's included, example industries it applies to, CTA. Mention technologies only in a small "Under the hood" collapsible section for technical buyers — never in headlines.

### Products
- **No standalone Products page.** Capability is demonstrated inside each Industry page via the embedded generic demo (Section 6). This avoids naming, linking, or exposing any real production system while still proving the company can build real, working software.

### Case Studies
- Anonymized by design: no client name, no company name, no live link. Reference general descriptors instead — e.g. "a multi-location hospital network in North America," "a boutique hotel group in Canada," "a regional retail chain in Pakistan."
- Template per case study: Business problem → Solution → Key features → Architecture (optional, technical readers only) → Outcome (only if genuinely true and non-identifying — otherwise omit outcome metrics rather than invent them)

### Insights (blog)
- This is the GEO/AEO engine. See Section 9 for the content strategy this page structure needs to support: one-question-one-answer article template, FAQ schema per article, clear H1/H2 structure.

### Pricing
- Present as ranges/tiers tied to project complexity (e.g., "Starter System," "Growth Platform," "Enterprise Build") rather than a fixed price list. Always end with "Get a tailored quote" CTA, not a checkout.

### About
- Company story only — why Corewell Systems exists, how it works, what it believes about software. No founder name, no personal bio, no "meet the team" section. The trust layer here comes from clarity of process and specificity of industry knowledge, not from a personal face.

### Book Consultation
- Cal.com/Calendly embed + short qualifying form (company/industry/rough budget band) so you triage leads before the call.

---

## 6. Industry Demo Environments (no named or linked real products)

This is still the single highest-leverage feature on the site — it's what makes it "infinitely more convincing than screenshots." The approach has changed: demos are presented as generic, industry-labeled capability, never as a specific named or linkable product.

**Approach:**
- For each industry with a real underlying system already built, reskin/whitelabel it into a generic sandboxed demo — seeded with fake data, never real client/patient data, never linked to its actual production domain or branded with its real product name.
- Labeling convention: **"[Industry] Management System — Interactive Demo"** — e.g. "Healthcare Management System — Interactive Demo," "Hospitality Management System — Interactive Demo." Never "Try [product name]" or similar.
- Route structure: `/industries/[industry]` with the demo embedded inline (iframe or embedded route), not a separate `/demo/[product]` page tied to a product identity.
- Quick-access pattern stays the same internally: "Login as Admin / Login as Doctor / Login as Front Desk" with no real credential entry, dropping the visitor into a read-mostly dashboard.
- **Which industries currently have a real system to reskin:** Healthcare, Hospitality, Education, Retail & Shop Management. Build these first, in that priority order (most visually rich and relatable to non-technical buyers first).
- **Which industries don't yet:** Construction & Real Estate, Legal & Professional Services. These get the "Concept — Available as Custom Build" treatment (Section 7) instead of a demo — do not build a fake demo to fill the gap.
- Technical note: this can literally be the same codebase/data model as the real product underneath, just re-themed and re-labeled for the public site and hosted separately from the real production instance — no need to rebuild from scratch.

---

## 7. Ethical Content Rules (non-negotiable)

- Never claim a capability is real/deployed/in-production if it isn't.
- Never publish fabricated client counts, revenue numbers, or testimonials.
- Unbuilt industries/systems get one of these labels, always visible, never buried: **"Concept — Available as Custom Build"** or **"In Development."** Anonymizing a real product's name is fine; presenting a genuinely unbuilt system as a working demo is not — that line still holds even though branding is now generic.
- No real company/client names, no personal founder name, no live production links anywhere on the public site — this is an intentional brand-anonymization decision, not a shortcut around honesty. The systems and capability shown must still be real; only the identifying names/links are withheld.
- If a case study has no permissioned outcome data, omit the outcome section rather than inventing numbers.
- Regional claims (Canada/US/Australia/Pakistan) must reflect where work has genuinely been delivered — confirm before publishing, don't round up.
- The AI Consultant (Section 8) must follow the same rule — it should never promise timelines, prices, or capabilities that haven't been confirmed, and should never name specific past clients even if asked.

---

## 8. AI Consultant Widget

- Placement: persistent bottom-corner launcher, labeled "Ask Our Software Architect" (not generic "Chat with us").
- Backend: a Next.js API route that calls the Claude API server-side (never expose the API key client-side), streaming the response back to the widget.
- System prompt for this assistant should:
  - Know the company's real product catalog, industries served, and general process — nothing fabricated
  - Ask 1–2 qualifying questions (industry, rough scope) before suggesting a direction
  - Give a *rough* module/feature suggestion and a *range* estimate at most — never a firm quote or delivery date
  - Always end by offering the "Book a Consultation" CTA
  - Explicitly refuse to promise things outside what's confirmed (pricing certainty, timelines, integrations not actually supported)
- Keep conversation history in-memory per session only; no need for persistent chat storage at launch.

---

## 9. SEO / GEO / AEO Strategy

**SEO (buyer-intent keywords, not vanity keywords):**
Target phrases like *hospital management software*, *clinic management system*, *restaurant POS software*, *school ERP development*, *custom healthcare software development* — not generic *web developer Karachi*-type terms. Bake these into page titles, H1s, and meta descriptions naturally.

**GEO (Generative Engine Optimization — content structured so AI answer engines cite it):**
Publish long-form pages that directly answer questions people ask ChatGPT/Perplexity/Claude, e.g. *"How much does hospital management software cost?"*, *"What features does a clinic management system need?"*, *"SaaS vs custom ERP — which is right for a school?"* Structure: clear question as H1, direct answer in the first paragraph, supporting detail after. This first-paragraph-answers-the-question pattern is what gets pulled into AI-generated answers.

**AEO (Answer Engine Optimization):**
One question, one page, one clear answer. Add FAQ schema (JSON-LD `FAQPage`) to these articles so they're eligible for rich results.

**Technical implementation:**
- JSON-LD `Organization` schema on every page (name, logo, sameAs social links)
- JSON-LD `SoftwareApplication` schema on each product page
- JSON-LD `FAQPage` schema on Insights articles with Q&A structure
- Consider adding an `llms.txt` file at the site root summarizing the company/products in plain language for AI crawlers
- Clean semantic HTML (proper heading hierarchy) throughout — this matters more for GEO/AEO than for classic SEO

**Content cadence:** one Insights article per week minimum, each targeting one buyer-intent question.

---

## 10. Conversion Rate Optimization (CRO)

- Every page has exactly **one** primary CTA goal: Book a Consultation. Secondary links (read case study, try demo) are fine, but never compete visually with the primary CTA.
- Sticky/persistent "Book a Consultation" button in nav on scroll.
- Forms stay short — qualify deeper on the call, not in the form.
- No pop-ups, no exit-intent modals — they undercut the "premium company" feel this site is going for.

---

## 11. Non-Functional Requirements

- **Performance:** target Core Web Vitals "Good" thresholds — LCP < 2.5s, CLS < 0.1, INP < 200ms. Lazy-load demo environments and heavy animation assets.
- **Accessibility:** WCAG 2.1 AA minimum — keyboard navigable, sufficient color contrast (test the accent color against the off-white background specifically), alt text on all real imagery.
- **Responsive:** mobile-first; the industry-morph hero interaction needs a simplified mobile fallback (tap instead of hover/scroll-driven).
- **Security:** contact/consultation forms need spam protection (honeypot + rate limiting minimum); demo environments must never touch real client data.

---

## 12. Build Phases (feed to Claude Code one at a time)

1. **Foundation** — repo scaffold, design tokens, typography, base components (button, card, nav, footer), Home page static layout (no animation yet)
2. **Core content pages** — Industries hub + 1 industry template, Solutions hub + template, Products hub + 1 product template (static content, real copy)
3. **Motion layer** — industry-morph hero interaction, scroll-reveal animations, page transitions
4. **Case Studies + Insights** — MDX content pipeline, article template with FAQ schema, first 3 real articles
5. **Demo environments** — start with the clinical and hospitality systems, sandboxed
6. **AI Consultant widget** — API route, streaming UI, system prompt, booking handoff
7. **SEO/schema/performance pass** — JSON-LD across all page types, image optimization, Lighthouse audit, accessibility audit
8. **Launch checklist** — analytics wired, forms tested end-to-end, 404/error pages, favicon/OG images, domain + SSL

---

## 13. Copy Voice Guidelines

Outcome language over technology language, always:

| Instead of | Say |
|---|---|
| "We build websites" | "We digitize businesses" |
| "React / Node.js development" | "Scalable business platforms" |
| "We know AWS" | "Reliable, secure cloud deployment" |
| "Portfolio" | "Products" / "Solutions" / "Case Studies" |

Apple-style principle: lead with the outcome, not the stack. Technical detail is available for buyers who want it, but never in a headline.

---

## 14. Ready-to-Paste Kickoff Prompt (Phase 1)

Copy this into Claude Code to start:

```
Read docs/spec.md in full before starting. We are building Phase 1 only
(Foundation), as defined in Section 12.

Scope for this session:
- Scaffold a Next.js 14 App Router project with TypeScript and Tailwind CSS
- Implement the design tokens from Section 4 (colors, typography, spacing)
  as a Tailwind config + CSS variables layer
- Build reusable base components: Button (primary/secondary), Card,
  NavBar (scroll-aware, sticky), Footer
- Build the Home page static layout per Section 5, using placeholder
  copy marked clearly as [PLACEHOLDER] where real copy isn't in the spec yet
- No animation yet — that's Phase 3
- No CMS/demo/AI widget yet — those are later phases

Do not invent client names, testimonials, or metrics. Where real content
is needed but not provided, insert a clearly marked placeholder and list
everything you need from me at the end of your response.
```

---

---

## 15. Ready-to-Paste Kickoff Prompt (Phase 2)

Copy this into Claude Code to start Phase 2. It supersedes the Phase 1 decisions on naming, founder identity, and product branding — read it carefully before implementing.

```
Read docs/spec.md in full — it has been updated since Phase 1. Key changes
before you start:

1. GIT IDENTITY: Do not use the personal address for any commits. Configure
   this repo's local git identity instead:
     git config user.name "Corewell Systems"
     git config user.email "dev@corewellsystems.placeholder"
   Flag clearly in your response that this is a placeholder email and
   should be replaced once a real domain/inbox exists.

2. RENAME: Replace all instances of "KodeSparc" / "KodeSparc Technologies"
   with "Corewell Systems" across the codebase, copy, and metadata.

3. REMOVE FOUNDER IDENTITY: Remove any founder name, bio, or "About the
   developer" content from the About page or anywhere else. The site
   speaks entirely in company voice — no personal name anywhere.

4. REMOVE NAMED/LINKED PRODUCTS: There is no more standalone Products
   page and no named real products (no real product names,
   no live URLs to real systems) anywhere on the public site. Capability
   is shown via generic per-industry demos instead (Section 6 of the spec).

5. UPDATED INDUSTRIES: Industries hub now has 7 tiles: Healthcare,
   Hospitality, Education, Retail & Shop Management, Construction & Real
   Estate, Legal & Professional Services, and Enterprise/Custom (styled
   as a closing "don't see your industry?" invitation, not a numbered card).

Scope for this session (Phase 2, per spec Section 12):
- Build the Industries hub page (7 cards, per above)
- Build one full Industry page template, applied first to Healthcare
- Build the Solutions hub + one Solutions page template
- Use the real content below — do not use [PLACEHOLDER] for these, they
  are final unless I say otherwise:

HERO HEADLINE:
"Engineering software that powers modern businesses."

HERO SUBLINE:
"We design and build custom software — from healthcare platforms to
hospitality and retail systems — for businesses across Canada, the
United States, Australia, and Pakistan."

INDUSTRIES GRID INTRO:
"Every industry runs on different workflows. We build software around
yours — not the other way around."

INDUSTRY ONE-LINERS:
- Healthcare: "Patient records, appointments, billing, and care
  coordination — systems built for how clinics and hospitals actually run."
- Hospitality: "Front desk, reservations, housekeeping, and reporting in
  one connected platform for hotels and resorts."
- Education: "Admissions, attendance, gradebooks, and parent
  communication — a school management system built around real
  academic workflows."
- Retail & Shop Management: "Point-of-sale, inventory, and
  multi-location reporting that keeps a retail business running
  without the spreadsheet chaos."
- Construction & Real Estate: "Project timelines, budgets, subcontractor
  coordination, and property records — built for how construction and
  real estate teams actually work." [CONCEPT — no demo, custom build only]
- Legal & Professional Services: "Case management, document workflows,
  billing, and client communication for law firms and professional
  practices." [CONCEPT — no demo, custom build only]
- Enterprise/Custom (closing tile): "Have a workflow no off-the-shelf
  tool handles? We design custom systems around how your business
  actually operates."

DEMO LABELS (for industries with a real underlying system):
- Healthcare Management System — Interactive Demo: "Explore a full
  clinical workflow — patient intake, scheduling, records, and
  billing — in a live interactive environment."
- Hospitality Management System — Interactive Demo: "Walk through a
  hotel's daily operations — bookings, check-in/out, housekeeping,
  and reporting."
- Education Management System — Interactive Demo: "See how admissions,
  attendance, and gradebooks work together in one system."
- Retail & POS — Interactive Demo: "Try a point-of-sale and inventory
  system the way your staff would use it on the floor."
(Build the demo embeds themselves in a later phase — for Phase 2, wire
the CTA button/route and label it correctly, backed by a "demo coming
soon" state if the actual embed isn't ready yet.)

PROOF SECTION (Home + About):
"Production systems designed for healthcare, hospitality, education,
and retail operations — for businesses across Canada, the United
States, Australia, and Pakistan."
[FLAG: confirm with me which regions are accurate before this ships —
do not treat this as final without my confirmation.]

ABOUT PAGE BODY (company voice, no founder):
"Corewell Systems is a software design and engineering company building
operational systems for healthcare, hospitality, education, and retail
businesses. We work with organizations across Canada, the United
States, Australia, and Pakistan, designing software around how teams
actually work — not the other way around."

Still placeholder — leave marked [PLACEHOLDER] and list at the end of
your response:
- Insights article content (Phase 4 — 3 draft titles below for later use
  only, don't build yet): "How Much Does Custom Healthcare Software
  Cost?", "Hotel Management Software: What Features Actually Matter",
  "Custom Software vs. Off-the-Shelf: How to Decide for Your Business"
- Footer contact email + social links (I'll provide these separately)
- Final confirmation on "Corewell Systems" as the legal/brand name
  (trademark clearance still pending against "Corewell Health")

Follow the design system in Section 4 and the copy voice guidelines in
Section 13. Do not invent any content not listed above or marked as
mine to provide.
```

---

## Change Log

- **v7 (2026-07-27):** Site rebuilt on evidence from our own product codebases (analysis held privately, outside the repo). Healthcare and Hospitality upgraded to full capability pages backed by production systems; Solutions pages gained an evidence ledger; Education and Retail relabelled "Design Preview" (our designs, prototyped, offered as custom builds — not deployed installations); Legal keeps its Concept label for case management and gains proof of adjacent work built for the sector. **Proof-copy correction:** the owner-approved line "Production systems designed for healthcare, hospitality, education, and retail operations" claimed production status for two industries where only design work exists. Revised on Home, About, and the brand kit to "Production systems for healthcare and hospitality operations, with design work in education and retail" — regions unchanged and still owner-confirmed. Flagged for owner review.

- **v6 (2026-07-26):** Phases 6–8 implemented. AI Consultant ("Ask Our Software Architect") built on the **Gemini API** per owner decision (supersedes the Anthropic choice in Section 2) — server-side streaming route, Section 8 prompt rules enforced, graceful fallback until GEMINI_API_KEY is provided. Book Consultation page (qualifying form + honeypot + rate limiting, Resend-ready delivery, Cal.com embed placeholder) and Pricing page (three tiers with indicative ranges — owner sign-off pending) added. SEO pass: Organization + SoftwareApplication JSON-LD, sitemap, robots, llms.txt, skip-link. Launch assets: 404/error pages, favicon, OG image, conditional Plausible. Remaining owner inputs listed in README.
- **v5 (2026-07-26):** Phase 5 implemented — sandboxed demo environments for Healthcare and Hospitality (priority order per Section 6), built as in-site replicas at `/industries/[slug]/demo`: quick-access role logins (Admin/Doctor/Front Desk; Manager/Front Desk/Housekeeping), seeded deterministic sample data, role-based navigation and data visibility, read-mostly with light in-memory interactions (check-in, mark paid, mark room clean), permanent "Interactive Demo — sample data" labeling. Education and Retail keep the coming-soon state until their environments are built.
- **v4 (2026-07-26):** Phase 4 implemented — MDX content pipeline, Insights hub + article template with FAQPage JSON-LD, Case Studies hub + template. Four articles published (the three planned buyer-intent titles plus an ownership-ROI deep dive). Case studies are anonymized composites running on sample data per owner direction, each carrying a visible "Illustrative scenario — sample data" label to stay within Section 7; replace with real anonymized engagement facts when available.
- **v3 (2026-07-26):** Owner confirmed "Corewell Systems" as the final brand name and confirmed the regional claims (Canada/US/Australia/Pakistan) as accurate. Solutions copy, industry problem narratives, and the closing-CTA subline drafted in-house with owner approval. Phase 3 (motion layer) implemented: industry-morph selector on Home, per-industry accent theming, node-chain reveals, scroll reveals, page transitions.
- **v2:** Renamed brand from KodeSparc to Corewell Systems (pending trademark clearance). Removed founder identity from site entirely. Removed named/linked real products — replaced with generic, unbranded per-industry demos. Added Construction & Real Estate and Legal & Professional Services as new industries (concept-stage, no demo). Added international/regional positioning language. Updated ethical content rules to cover anonymization without compromising honesty.
- **v1:** Initial spec (KodeSparc Technologies, named products, founder-led About page).

*End of specification. Update this file as decisions firm up — treat it as the project's living source of truth, not a one-off prompt.*
