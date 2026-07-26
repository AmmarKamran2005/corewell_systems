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

- **Company name:** KodeSparc Technologies *(placeholder — confirm trademark/domain clearance before committing; see naming note from Ammar's conversation)*
- **What this is NOT:** a freelancer portfolio, a template agency site, a "hire me" page.
- **What this IS:** an interactive product-experience site that makes visitors feel like they've opened a live software company's HQ — closer to how Stripe, Linear, or Vercel present themselves than a typical dev-for-hire site.
- **Positioning statement:** "We design and build business software that solves real operational problems." Every page, CTA, and piece of copy should trace back to this line.
- **Primary audience:** Non-technical decision-makers — clinic owners, hospital admins, school administrators, hotel owners, SME operators — plus international clients sourced via Upwork/LinkedIn who need to be convinced quickly that they're dealing with a real company, not a solo freelancer.
- **Core buyer psychology to design for:** the visitor is not evaluating code quality. They're evaluating *risk*. Every section should reduce perceived risk: proof of real systems, clear process, no hype, no fake numbers.

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
├── Industries
│   ├── Healthcare
│   ├── Hospitality
│   ├── Education
│   ├── Retail
│   └── Enterprise / Custom
├── Solutions
│   ├── Custom Software Development
│   ├── SaaS Platforms
│   ├── Mobile Apps
│   ├── Cloud & Deployment
│   └── AI Automation
├── Products
│   ├── the clinical platform (EHR) — live
│   ├── the therapy platform — live
│   ├── the hospitality platform — live
│   ├── POS System — live/custom
│   └── School ERP — concept/custom
├── Case Studies (one per real product, expandable over time)
├── Insights (blog — SEO/GEO/AEO engine)
├── Pricing (ranges/tiers, not a fixed price list — see Section 6)
├── About (founder + company story)
└── Book Consultation (single global CTA target)
```

No "Portfolio" nav item, anywhere. If a visitor wants to see past work, that lives inside Products and Case Studies, framed as evidence, not a gallery.

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
4. Featured products strip (the clinical platform, the therapy platform, the hospitality platform) with real "Live Product" badges
5. Proof section — real metrics only (e.g., "Live in production since 2024," "X active clinics using the clinical platform" — only if true and verifiable)
6. Insights preview (2–3 latest articles, pulls GEO/AEO traffic into the funnel)
7. Closing CTA band

### Industries (hub + one page per industry)
- Hub: grid of industry cards, each linking to a dedicated page
- Each industry page: the operational problem in that industry → how software solves it → relevant product(s) from your catalog → relevant case study (or "coming soon" if none yet) → CTA

### Solutions
- Framed as capabilities, not tech stack. Each solution page: problem it solves, what's included, example industries it applies to, CTA. Mention technologies only in a small "Under the hood" collapsible section for technical buyers — never in headlines.

### Products (hub + one page per product)
- Hub: card grid, clearly separating **Live Products** from **Concepts / Available as Custom Build** (see Section 7 — this distinction must be visually unmistakable, not just a small label)
- Each live product page: problem → feature walkthrough → **Try Live Demo** button → screenshots/screen recording → tech notes (optional, collapsed) → related case study → CTA

### Case Studies
- Template per case study: Business problem → Solution → Key features → Architecture (optional, technical readers only) → Outcome (only if you have real, permissioned data — otherwise omit outcome metrics entirely rather than invent them)

### Insights (blog)
- This is the GEO/AEO engine. See Section 9 for the content strategy this page structure needs to support: one-question-one-answer article template, FAQ schema per article, clear H1/H2 structure.

### Pricing
- Present as ranges/tiers tied to project complexity (e.g., "Starter System," "Growth Platform," "Enterprise Build") rather than a fixed price list. Always end with "Get a tailored quote" CTA, not a checkout.

### About
- Company story (why KodeSparc exists) + Founder section (Ammar Kamran, real background, real experience — this is the "people buy from people" trust layer)

### Book Consultation
- Cal.com/Calendly embed + short qualifying form (company/industry/rough budget band) so you triage leads before the call.

---

## 6. Product Showcase & Live Demo Environments

This is the single highest-leverage feature on the site — it's what makes it "infinitely more convincing than screenshots."

**Approach:**
- For each live product (the clinical platform, the therapy platform, the hospitality platform, POS), build or reuse a **sandboxed demo environment** with seeded fake data — never real client/patient data.
- Simplest implementation: a `/demo/[product]` route with a pre-filled "Login as Admin / Login as Doctor / Login as Front Desk" quick-access button (no real credential entry needed) that drops the visitor into a read-mostly dashboard view of that product.
- If the actual product isn't safe to expose live (compliance concerns for healthcare data), build a **lightweight demo replica** — same UI, same flows, fabricated dummy data, clearly labeled "Interactive Demo Environment." This is honest as long as it's labeled and doesn't claim to be the live client-facing system.
- Priority order for build effort: the clinical platform and the hospitality platform first (most visually rich, most relatable to non-technical buyers), then the therapy platform, then POS.

---

## 7. Ethical Content Rules (non-negotiable)

- Never claim a product is live/deployed/in-production if it isn't.
- Never publish fabricated client counts, revenue numbers, or testimonials.
- Unbuilt products/ideas get one of these labels, always visible, never buried: **"Concept — Available as Custom Build"** or **"In Development."**
- If a case study has no permissioned outcome data, omit the outcome section rather than inventing numbers.
- The AI Consultant (Section 8) must follow the same rule — it should never promise timelines, prices, or capabilities that haven't been confirmed.

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
5. **Demo environments** — start with the clinical platform and the hospitality platform sandboxed demos
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


```

---

*End of specification. Update this file as decisions firm up — treat it as the project's living source of truth, not a one-off prompt.*
