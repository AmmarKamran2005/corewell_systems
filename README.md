# Corewell Systems Web

Product-experience website for Corewell Systems. The project's source of truth
is [docs/spec.md](docs/spec.md) — read it before building anything.

## Status

**All 8 build phases implemented** (spec Section 12). Pending owner inputs
before launch — see `.env.example` for every key:

- `GEMINI_API_KEY` — activates the "Ask Our Software Architect" widget
  (graceful fallback until then)
- `RESEND_API_KEY` + `CONSULT_TO_EMAIL` — activates consultation-form
  delivery (503 fallback until then)
- `NEXT_PUBLIC_SITE_URL` — canonical domain for metadata/sitemap/OG
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — enables analytics
- Cal.com/Calendly booking link — replaces the placeholder panel on
  /book-consultation
- Footer contact email + social links; About "How we think" copy; real
  anonymized case-study facts; pricing-range sign-off; Education + Retail
  demo builds

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
<dev@corewellsystems.placeholder>` — a placeholder address. Replace it once a
real domain/inbox exists:

```bash
git config user.email "dev@<real-domain>"
```
