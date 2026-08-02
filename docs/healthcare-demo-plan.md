# Healthcare Demo — Build Plan

A whitelabelled, fully-isolated replica of the clinical platform, deployed as
a public demonstration system and linked from corewellsystems.com.

**Status: plan only. No work started, nothing committed.**

---

## 1. Decisions locked

| Decision | Choice |
|---|---|
| Approach | Shallow fork of the existing clinical codebase |
| Infrastructure | Fully separate — VM, server, database, cloud account, domain |
| Scope | The full system as it is |
| Mobile apps | **Excluded.** The two native tablet apps are out of scope |
| Branding | Removed from code entirely, not just from screens |
| Colours | New palette (proposed below) |
| Layout | Visibly different, deliberately not complicated |
| Access | Login screen with hardcoded demo accounts + seeded fake data |
| Third-party integrations | Removed, **but the UI stays** — attempting one shows a "not available in the demo, contact us" message |

**Guiding constraint:** keep the fork *shallow*. Change branding, UI shell, and
demo-mode behaviour. Do not refactor business logic — every deep change makes
it harder to port a future security fix from production into this demo.

---

## 2. Identity

### Name
Do **not** invent a product brand. Inventing one creates a new name to
protect and implies a product being sold off the shelf.

**Recommendation:** the application identifies itself as
**"Clinical Management System"**, with the Corewell Systems mark in the
corner and a permanent "Demonstration System — sample data" strip.

This reads as *Corewell's demonstration of what it builds*, which is exactly
what it is, and it matches how the marketing site already labels demos.

### Colour palette

The marketing site's warm off-white and generous whitespace are right for an
editorial page and wrong for dense clinical tables read for eight hours.
Keep the brand's teal for continuity, but build a proper application palette
around it.

| Role | Hex | Use |
|---|---|---|
| App background | `#F4F6F7` | Cool neutral — better than warm for data density |
| Surface | `#FFFFFF` | Cards, tables, panels |
| Border | `#E3E8EA` | Dividers, table rules |
| Primary text | `#0F1B21` | Near-black with a teal undertone |
| Secondary text | `#5A6B72` | Labels, metadata |
| **Navigation shell** | `#12232B` | **Dark sidebar/topbar with white text** |
| Primary accent | `#0F766E` | Corewell teal — actions, active nav, links |
| Accent hover | `#115E59` | |
| Success / completed | `#047857` | Signed, paid, completed |
| Warning / due | `#B45309` | Due, pending, unsigned |
| Danger / critical | `#BE123C` | Allergies, denials, overdue |
| Info / scheduled | `#1D4ED8` | Scheduled, informational |

Two notes:

- The **dark navigation shell is the single highest-impact, lowest-risk
  visual change.** It transforms the product's character in one stylesheet
  without touching a controller.
- The four semantic colours are the same ones already used as industry
  accents on the marketing site, so the two properties feel related without
  looking identical.

### Typography
**IBM Plex Sans** for the application — designed for interfaces, excellent at
small sizes, free, and visibly different from both the marketing site and
typical clinical software. Use its tabular figures for all numbers, IDs, and
times.

---

## 3. Layout changes — different, not complicated

Restyle heavily. Restructure lightly. Anything that moves logic between views
increases the future porting burden.

**Do:**
1. Dark navigation shell (above) — the biggest single differentiator
2. Regroup navigation by role area: Clinical · Front Desk · Billing · Admin
3. New density and corner treatment — tighter rows, squarer cards
4. New typography scale and a different icon set
5. Rebuilt dashboard arrangement — different card order and hierarchy
6. New login screen (it is the first impression and is fully standalone)

**Avoid:**
- Moving features between pages
- Renaming routes
- Changing form structures or data flow

---

## 4. Integration matrix

| Integration | Decision | Why |
|---|---|---|
| **AI (Gemini)** | **KEEP LIVE** — new separate key | The ambient scribe is the single most impressive thing in the system. Costs almost nothing at demo volume. Do not stub this |
| **Cloud storage** | **KEEP LIVE** — new bucket, new service account | Needed for documents and audio; simpler than changing the code |
| Insurance eligibility (Office Ally) | **STUB** | Real vendor contract; a second account is unlikely |
| Payments (Stripe) | **STUB** for v1 | Test-mode keys are a possible later upgrade if you want the payment flow live |
| Telehealth (Jitsi/JaaS) | **STUB** | Needs its own account; low demo value |
| Outbound email | **HARD-DISABLED** | See safety rules — non-negotiable |
| SMS | **STUB** | Already a stub in the codebase |
| Native tablet apps | **EXCLUDED** | Out of scope by decision. *Note: the kiosk check-in **web** screens can still be demonstrated in a browser* |

### The stub pattern
One `DemoMode` service, one interception point per integration, one shared
response the UI renders as a modal:

> **Not available in the demonstration**
> This screen connects to a live [insurance clearinghouse / payment
> processor / video service] in the deployed system. It is disabled here so
> the demo cannot transact with real services.
> **Contact us to see this working end to end.** → [Book a consultation]

This is honest, it demonstrates the capability exists, and every dismissal is
a soft conversion prompt.

---

## 5. Demo accounts

A login screen, with the credentials printed on it. Friction stays near zero
while the experience feels like real software.

| Role | Purpose |
|---|---|
| Administrator | Full system — settings, users, locations, reports |
| Clinician | Encounter workspace, notes, AI scribe, orders, prescribing |
| Front desk | Scheduling, check-in, patient registration, kiosk |
| Biller | Charges, claims, payments, accounts receivable |
| Nurse / Medical assistant | Vitals, history review — shows restricted access |

**Requirements:**
- Two-factor and OTP **bypassed** for these accounts (outbound email is off)
- Passwords never reused anywhere else, and never present in the production
  codebase
- Accounts recreated by the nightly reset
- Seeded with a realistic clinic: multiple providers, a full appointment book,
  patients with history, in-flight claims, outstanding balances

---

## 6. Safety rules — non-negotiable

1. **Outbound email hard-disabled at the transport layer.** Not a config
   toggle someone can flip. A demo that emails a real person because a
   visitor typed their address is a serious incident.
2. **Synthetic data only.** Never copy production rows, not even
   "anonymised" ones. The codebase already contains demo-data generators and
   a seed endpoint — use those.
3. **Nightly reset** from a pristine seed database, so anything a visitor
   types disappears on a schedule.
4. **`noindex` across the entire demo**, so it never competes with the
   marketing site in search and Google never indexes invented patient names.
5. **Rate limiting on, file uploads off or tightly capped.** It is public and
   it will be scanned within days of going live.
6. **New keys for everything.** A production JWT or encryption key reused
   here would let a demo token or a leaked key reach the real system.
7. **Separate monitoring**, so demo noise never masks a production alert.
8. **Permanent on-screen label** on every page.

---

## 7. Brand removal checklist

Eight layers. Layers 2 and 7 are the ones teams miss.

1. **Display** — app name in layout, page titles, logo assets, favicon
2. **Class and file names** — the voice-feature and help-assistant classes
   carry the brand. Renaming touches DI registration, routes, JS imports, and
   the cache-busting version list. *Do this carefully or not at all — a
   half-rename breaks module loading*
3. **Email templates** — twelve HTML templates, sender identity, footers
4. **Hardcoded strings** — support address in the email service, **plus the
   hardcoded credential fallback that must be deleted regardless**
5. **External links** — the header link pointing at the live product
6. **Config** — production hostnames, CORS origins, database name
7. **The user guide** — the in-app AI help assistant is *grounded in this
   document*. If it is not rewritten, the assistant will name the real
   product to visitors when asked. **This is the sneakiest leak in the whole
   project**
8. **Generated documents** — claim forms, lien letters, consent PDFs carrying
   letterhead

**Verification step:** after the strip, grep the entire tree for the old
product names, the old domains, and the old support addresses. Zero matches
before deployment. Repeat against the published output, not just the source.

---

## 8. Environment and services to obtain

**Infrastructure**
- Windows VM (IIS + SQL Server), separate from production
- SQL Server instance — size it deliberately; the production system hit a
  buffer-pool exhaustion outage under load on a constrained instance
- Subdomain + SSL — `demo.corewellsystems.com` recommended for continuity and
  a single certificate, or a standalone domain if you want zero association
- Nightly scheduled job for the database reset
- Basic uptime monitoring

**Accounts and keys — all new, none shared with production**
- Google Gemini API key *(separate project, separate key)*
- Google Cloud Storage bucket + service account JSON *(separate project)*
- Freshly generated JWT signing key
- Freshly generated PHI/AES encryption key
- SQL login scoped to the demo database only

**Not needed** — because stubbed: clearinghouse, payment processor, video
service, SMTP, SMS.

---

## 9. Phases

| Phase | Work | Size |
|---|---|---|
| **1. Fork and boot** | Copy the codebase into a new repo, fresh database from the schema, run migrations, get it starting locally against nothing but its own DB | Mechanical |
| **2. Brand strip** | The eight layers in §7, ending with the grep verification | Medium, finicky |
| **3. Demo mode** | `DemoMode` service, integration stubs with the shared message, outbound comms disabled, demo accounts, OTP bypass, seed data expansion | Medium |
| **4. Reskin** | Palette, typography, dark navigation shell, nav regrouping, dashboard rearrangement, new login screen | **Largest — design work** |
| **5. Deploy and harden** | VM, IIS, SQL, SSL, noindex, rate limits, nightly reset job, monitoring | Medium |
| **6. Wire into the site** | Replace the current lightweight sandbox link, or keep both tiers | Small |

Phase 4 dominates. Phases 1–3 and 5 are largely mechanical.

---

## 10. Risks

1. **Permanent divergence.** Every production security fix must be ported by
   hand, forever. Keeping the fork shallow is the only mitigation.
2. **Public attack surface** carrying your name. Rate limits, no uploads,
   nightly reset, and no real data are the defences.
3. **Architecture becomes visible to competitors.** Acceptable — the moat is
   execution and domain knowledge, not secrecy — but worth deciding
   consciously.
4. **Density may overwhelm a non-technical buyer.** A clinic owner dropped
   into a full EHR may close the tab. *Recommendation: keep the lightweight
   guided sandbox as the instant taste, and link the full replica as
   "explore the complete system" for serious prospects.*
5. **⚠️ Ownership.** Before forking, confirm you hold the rights to reuse
   this codebase. If any part was built as work-for-hire under a client
   contract, that contract governs whether a derived demo is permitted.
   Worth ten minutes of checking now rather than a dispute later.

---

## 11. Open questions

1. **Subdomain or standalone domain?** Subdomain is cheaper, simpler, and
   keeps the entity association. Standalone gives total separation.
2. **Keep the lightweight sandbox as tier one**, or replace it entirely with
   the full replica?
3. **Payments:** stub for v1 as planned, or spend the extra setup to run
   Stripe in test mode so the payment flow is demonstrable?
4. **How much of the reskin do you want to specify**, versus me proposing
   screens for approval?
