# Corewell Systems Web

Product-experience website for Corewell Systems. The project's source of truth
is [docs/spec.md](docs/spec.md) — read it before building anything.

## Status

**All 8 build phases implemented** (spec Section 12). Pending owner inputs
before launch — see `.env.example` for every key:

- `GEMINI_API_KEY` — activates the "Ask Our Software Architect" widget
  (graceful fallback until then)
- `RESEND_API_KEY` — activates consultation-form delivery (503 fallback
  until then; `CONSULT_TO_EMAIL` is info@corewellsystems.com)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — enables analytics
- Cal.com/Calendly booking link — replaces the placeholder panel on
  /book-consultation
- Social links; About "How we think" copy; real anonymized case-study
  facts; pricing-range sign-off

Domain is corewellsystems.com (canonical URL hardcoded as the fallback in
`lib/site.ts`); contact email is info@corewellsystems.com, wired in the
footer, form fallback, and Organization JSON-LD.

Site speaks in company voice only — no founder identity, no named or linked
real products anywhere. Demos and case studies run on labeled sample data
(spec Sections 1, 5, 6, 7).

All copy marked `[PLACEHOLDER: …]` needs real content before launch. Per spec
Section 7, never replace a placeholder with an invented metric, client name, or
testimonial.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS with a custom design-token
layer (`app/globals.css` + `tailwind.config.ts`).

## Develop

```bash
npm install
npm run dev
```

## Git identity

This repo's local git identity is `Corewell Systems
<info@corewellsystems.com>`. Commits before 2026-07-27 carry earlier
placeholder identities.
