# Corewell Systems Web

Product-experience website for Corewell Systems. The project's source of truth
is [docs/spec.md](docs/spec.md) — read it before building anything.

> Brand note: "Corewell Systems" is pending trademark clearance (flagged risk
> vs. "Corewell Health"). Confirm before final domain purchase — spec Section 1.

## Status

**Phase 2 — Core content pages** (spec Section 12): Industries hub + industry
template (Healthcare first), Solutions hub + template, About page. Site speaks
in company voice only — no founder identity, no named or linked real products
anywhere (spec v2, Sections 1, 5, 6).

All copy marked `[PLACEHOLDER: …]` needs real content before launch. Per spec
Section 7, never replace a placeholder with an invented metric, client name, or
testimonial. Regional claims (Canada/US/Australia/Pakistan) are pending owner
confirmation before ship.

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
