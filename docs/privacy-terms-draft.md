# Privacy Policy & Terms — superseded, kept as working notes

> **STATUS: SUPERSEDED. The pages are written and live at `/privacy` and
> `/terms`** (`app/privacy/page.tsx`, `app/terms/page.tsx`).
>
> Owner direction 2026-08-20: a normal, readable policy rather than a strict
> one, using sensible general wording instead of waiting on precise answers.
> The published pages do that — plain language, everything in them true against
> the code, and no invented specifics (no registration number, no fabricated
> retention period, no governing-law clause).
>
> **Part 1 below is still worth keeping**: it is the verified record of what the
> code actually does with data, and it is what the published pages were written
> from. If the data flows change, check them against Part 1 and update both.
>
> **The one open decision is Google Analytics cookies** — see the Cookies
> section in Part 1. Everything else is settled.
>
> Parts 2 and 3 are the earlier draft text, now replaced by the live pages.
>
> This is not legal advice and has not been reviewed by a lawyer. It exists so
> the owner has something concrete to correct rather than a blank page.
>
> Everything stated as fact below was **verified against the code on
> 2026-08-20** and is cited to the file that proves it. Everything I cannot
> know from the code is marked **`NEEDS OWNER`** and must be answered before
> this can ship. Do not publish with any marker still in it.

**Why this matters beyond compliance:** most Tier 1 and Tier 2 directories —
Clutch, G2, GoodFirms — reject submissions from sites with no privacy policy.
This document is the gate on the entire off-site listing layer, which is the
highest-impact item in `docs/unified-remediation-plan.md` §4.2.

---

## Part 1 — What the code actually does

Established by reading the source, not by assumption. Cite these if anyone asks.

### The consultation form

`components/consult/ConsultForm.tsx` → `app/api/consult-request/route.ts`

| | |
|---|---|
| **Collected** | Name, email, message (all required); company, industry, budget band (all optional) |
| **Where it goes** | Posted to the Resend API and delivered as a plain-text email to the company inbox. The sender's address is set as `reply_to`. |
| **Stored by this site** | **Nothing**, in the normal path. |
| **Exception** | If delivery fails, the payload is written to the hosting platform's function logs so the enquiry is recoverable rather than lost silently (`route.ts:94`). It is retained for as long as the platform keeps logs. **`NEEDS OWNER`: state that retention window, or remove this behaviour.** |
| **Anti-spam** | A hidden honeypot field, and a rate limit keyed on the request IP held in memory only — never written anywhere (`lib/rate-limit.ts`). |

### The AI consultant

`components/consultant/ConsultantWidget.tsx` → `app/api/consultant/route.ts`

| | |
|---|---|
| **Collected** | Only what the visitor types into the chat. |
| **Where it goes** | Sent to Google's Gemini API to generate a reply. |
| **Stored by this site** | **Nothing.** |
| **Conversation history** | Lives in React state in the browser tab only (`useState`). Closing or refreshing the tab discards it. No `localStorage`, no `sessionStorage`, no cookie. |
| **Rate limiting** | IP-keyed, in memory, plus a per-day instance ceiling on calls. |

### Cookies

⚠️ **This changed on 2026-08-20 and the change is material.**

The site's own code still sets no cookies — no `cookies()`, `document.cookie`
or `Set-Cookie` anywhere in the source. **But Google Analytics 4 was added, and
GA4 sets cookies** (`_ga`, and `_ga_<measurement-id>`), typically with a
two-year lifetime.

Consequences:

- The site is **no longer cookieless**. Any earlier statement to that effect is
  now wrong and must not be published.
- **A consent banner may be legally required.** Under GDPR/ePrivacy, analytics
  cookies generally need consent before they are set. GA4 currently loads
  unconditionally on every page.
- Plausible remains cookieless and needs no consent. It is GA that creates the
  obligation.

> **`NEEDS OWNER` — decide one of three:**
> 1. **Keep GA and add a consent banner** that blocks it until the visitor
>    agrees. Most correct, most work.
> 2. **Keep GA, rely on your jurisdiction not requiring consent.** Your call
>    with legal advice — not something to assume.
> 3. **Drop GA and keep Plausible only.** Restores a cookieless site with no
>    banner, no consent obligation, and a simpler policy. Plausible already
>    gives you traffic, sources, pages and countries.
>
> Until this is answered, **do not publish this policy**, because the cookie
> section cannot be written truthfully without the decision.

### Third parties that receive data

| Service | What it receives | Why |
|---|---|---|
| **Resend** | Form submissions, as email | Delivery |
| **Google (Gemini)** | Chat messages | Generating the assistant's replies |
| **Cal.com** | Whatever the visitor enters into the embedded booking widget — handled entirely by Cal.com, never by this site | Booking |
| **Vercel** | Standard request logs; failed-delivery payloads | Hosting |
| **Plausible** | Cookieless, aggregate page analytics | Measurement |
| **Google Analytics 4** | Page views, device and approximate location, plus its own cookies | Measurement |

> **`NEEDS OWNER`** — each of these has its own retention policy and its own
> sub-processor list. A policy should link them. I have deliberately not
> guessed any retention period.

---

## Part 2 — Draft privacy policy

> Replace every `NEEDS OWNER` before publishing.

### Who we are

Corewell Systems designs and builds custom operational software. You can reach
us at **info@corewellsystems.com**.

> **`NEEDS OWNER`** — registered legal entity name, registered address, and the
> jurisdiction whose law applies. A privacy policy that does not identify the
> controller is not usable for directory submission, and in most jurisdictions
> is not compliant.

### What we collect, and why

We collect information in exactly two places, and only what you type:

**When you request a consultation.** Your name, email address and your
description of the problem, plus optionally your company, industry and budget
range. We use it solely to reply to you and to prepare for that conversation.
It reaches us as an email; we do not store it in a database on this website.

**When you use the AI assistant.** The messages you send. They are passed to
Google's Gemini service to generate a reply and are not recorded by this site.
The conversation exists only in your browser tab and is gone when you close it.

**When you browse.** We use two analytics tools: Plausible, which is cookieless
and records only aggregate page statistics, and Google Analytics, which sets
cookies on your device.

> **`NEEDS OWNER`** — this paragraph depends on the cookie decision above. If
> GA is dropped, delete the second half of the sentence.

We do not use your information for advertising, we do not sell it, and we do
not share it with anyone except the service providers listed below who are
required to deliver it.

### Cookies

Our own site sets no cookies. **Google Analytics, which we use to understand
how the site is used, does set cookies** on your device.

We also use Plausible, which is cookieless and records only aggregate
statistics — no cookies, no personal data, no tracking across other websites.

> **`NEEDS OWNER` — this section cannot be finalised until the GA decision in
> Part 1 is made.** If GA stays, this needs to say which cookies, how long they
> last, and how a visitor refuses them. If GA goes, this section reverts to a
> single sentence saying the site sets no cookies at all.

### Service providers

We rely on: **Resend** (delivering your enquiry as email), **Google** (the
Gemini model powering the assistant, and Google Analytics), **Cal.com** (the
booking calendar embedded on our consultation page, which handles what you
enter there directly), **Plausible** (cookieless analytics), and **Vercel**
(hosting).

> **`NEEDS OWNER`** — link each provider's privacy policy, and state their
> retention periods.

### How long we keep things

Enquiries reach us as email and are kept in our inbox for as long as we are in
contact with you or may reasonably need to be.

> **`NEEDS OWNER`** — state a real retention period. Also decide whether the
> failed-delivery log (Part 1) stays; if it does, say how long the hosting
> platform keeps those logs.

### Your rights

You can ask us what we hold about you, ask us to correct it, or ask us to
delete it. Email **info@corewellsystems.com** and we will respond.

> **`NEEDS OWNER`** — a response deadline, and whether a supervisory-authority
> complaint route needs naming, depends on jurisdiction.

### Children

This site is intended for businesses and is not directed at children.

### Changes

We will update this page if our practices change, and revise the date below.

**Last updated:** `NEEDS OWNER — set on publication`

---

## Part 3 — Draft terms of use

### What this site is

Corewell Systems' website. It describes services, publishes articles, and
offers interactive demonstrations of software we have designed and built.

### The demonstrations

Every interactive demo runs on **sample data**. The records in them are
invented. They are there so you can judge how a system behaves, not to
represent any real business, customer or patient.

Each demo carries a label describing what stands behind it — see our
descriptions on the relevant pages. Those labels are accurate and we keep them
that way.

> This mirrors the maturity system in `CONTEXT.md` §4. Keep this paragraph
> consistent with those labels — if a label changes, this changes.

### The AI assistant

The assistant gives general guidance about software and about what we do. It
is not a quotation, not a contract, and not professional advice. Nothing it
says commits us to a price, a timeline or a scope. For anything binding, speak
to us directly.

### Articles

Our articles are general information, not advice for your specific situation.
Figures we cite are indicative and vary by circumstance. Where we quote an
external source we name it.

### Our content

The text, design and code of this site are ours. You are welcome to read,
quote and link to it with attribution. Please do not republish it wholesale.

### No warranty, and limits

We work to keep this site accurate and available, but we provide it as-is.

> **`NEEDS OWNER`** — a limitation-of-liability clause and a governing-law
> clause belong here. **I have deliberately not drafted them.** Both have real
> legal consequence and vary by jurisdiction; they should be written or
> reviewed by a lawyer rather than adapted from a template.

### Contact

**info@corewellsystems.com**

---

## Part 4 — Shipping checklist

1. Answer every **`NEEDS OWNER`** above — ten markers, covering seven distinct
   questions (several appear twice, once in Part 1 and again in the draft text):
   - Registered legal entity, address and governing jurisdiction
   - Retention periods — including whether the failed-delivery log stays
   - Links and retention for Resend, Google, Cal.com and Vercel
   - Whether to name Plausible, once analytics are live
   - The data-rights response process and deadline
   - Publication date
   - Limitation of liability and governing law *(lawyer)*
2. Have a lawyer review, particularly the liability and governing-law clauses
   in Part 3.
3. Create `app/privacy/page.tsx` and `app/terms/page.tsx` following the
   existing static-page pattern — `...canonical("/privacy")` from `lib/seo.ts`,
   matching typography.
4. Add both to the footer's Company column and to `app/sitemap.ts`.
5. Rebuild, confirm both self-canonicalise, and confirm they appear in the
   sitemap.
6. **Then** start directory submissions — this was the gate.

**Do not publish this file's content as-is.** It is a starting point that
saves you a blank page, not a finished policy.
