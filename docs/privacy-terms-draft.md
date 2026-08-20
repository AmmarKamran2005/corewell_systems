# Privacy Policy & Terms — DRAFT for owner review

> **STATUS: DRAFT. NOT PUBLISHED. NO ROUTES BUILT.**
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

**The site sets none.** Verified two ways: no `cookies()`, `document.cookie` or
`Set-Cookie` anywhere in the source, and no `Set-Cookie` header on a live
production response.

This means **no cookie banner is required** for the site's own operation. Do
not add one; it would be a consent prompt for consent that is not needed.

> **`NEEDS OWNER`** — this changes if Plausible is enabled. Plausible is
> cookieless and does not collect personal data, which is why it is the right
> choice here, but the policy should name it once it is live.

### Third parties that receive data

| Service | What it receives | Why |
|---|---|---|
| **Resend** | Form submissions, as email | Delivery |
| **Google (Gemini)** | Chat messages | Generating the assistant's replies |
| **Cal.com** | Whatever the visitor enters into the embedded booking widget — handled entirely by Cal.com, never by this site | Booking |
| **Vercel** | Standard request logs; failed-delivery payloads | Hosting |
| **Plausible** *(when enabled)* | Cookieless, aggregate page analytics | Measurement |

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

We do not use your information for advertising, we do not sell it, and we do
not share it with anyone except the service providers listed below who are
required to deliver it.

### Cookies

**This website does not set cookies.** There is nothing to consent to and no
banner to dismiss.

> **`NEEDS OWNER`** — add one sentence naming Plausible once analytics are live:
> cookieless, aggregate only, no personal data, no cross-site tracking.

### Service providers

We rely on: **Resend** (delivering your enquiry as email), **Google** (the
Gemini model powering the assistant), **Cal.com** (the booking calendar
embedded on our consultation page, which handles what you enter there
directly), and **Vercel** (hosting).

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

1. Answer every **`NEEDS OWNER`** above. There are nine.
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
