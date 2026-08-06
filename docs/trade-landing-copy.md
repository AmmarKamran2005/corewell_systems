# /trade — full copy draft

Draft for review. No markup written yet. Section numbers match
`docs/trade-landing-page-plan.md` §2.

Rules applied: company voice only, no invented numbers, no timelines or
prices, no geographic claims, one primary CTA (Book a Consultation),
outcome language above the fold and technology below it.

Open questions are collected at the end.

---

## Metadata

**Title:** Distribution ERP with a Built-in POS and Online Store — Corewell Trade

**Meta description:** One catalogue, one stock pool and one ledger across your
trade desk, your counter and your website. Open every screen of the system —
no signup.

**H1:** Distribution ERP with a built-in POS and online store

---

## 1 — Hero

**Eyebrow:** Trade desk · Counter · Online

**H1:** Distribution ERP with a built-in POS and online store

**Subline:**
One catalogue, one stock pool, one ledger — across your trade desk, your
counter and your website.

**Body:**
Corewell Trade runs wholesale orders, a point-of-sale till and a consumer
storefront as three faces of the same system. Sell a unit anywhere and every
other channel knows about it in the same moment.

**Primary CTA:** Book a Consultation
**Secondary CTA:** Open the system →

**Under the buttons:** Every screen is open, on sample data. The demo account
is printed on the sign-in page.

**Visual:** dashboard screenshot in a restrained browser frame.

---

## 2 — The problem

**Heading:** Three systems, three stock numbers

**Body:**

Most distribution businesses did not choose their software. They accumulated
it. A till at the counter, because the counter needed a till. An older package
on the trade desk, because that is what the trade desk has always used. A
website built later by somebody else, because customers started asking.

Each one keeps its own stock number. Each number is right for about an hour a
day — the hour after somebody exports a spreadsheet and imports it somewhere
else. In between, the website sells a case that left the building yesterday
morning, the trade desk promises a pallet the counter has already broken into,
and nobody finds out until picking.

The cost is not the software. It is the phone call afterwards, the credit note,
the customer who now checks stock by ringing rather than by ordering — and a
month-end where three sets of figures have to be argued into agreement before
anyone can close the books.

---

## 3 — The core idea (diagram section)

**Heading:** One catalogue. One stock pool. One ledger.

**Body:**
Corewell Trade does not synchronise three systems. There is only one, and the
three channels are ways into it. A product is defined once and priced per
channel. Stock is counted once, per warehouse, and every channel draws from
that count. Every sale — trade, counter or online — posts to the same
double-entry ledger as it happens.

**Diagram labels:**
- Inputs: `Trade desk` · `POS till` · `Online store`
- Core, top to bottom: `One catalogue` → `One stock pool` → `One ledger`
- Caption: Three ways to sell. One set of numbers.

---

## 4 — The three channels

**Section heading:** Three channels, one system
**Section intro:** Each channel is built for the people who work in it. What
they share is everything underneath.

### Tab 1 — Trade desk

**Heading:** The trade desk

A distribution business sells on account, and the risk is not the order — it is
the balance behind it. Corewell Trade checks credit at the moment the order is
entered, not at invoicing when the stock is already on a vehicle. An order that
takes a customer past their limit stops and goes to a credit hold queue, where
whoever carries that authority can see the exposure, release it or hold it.

Customers and suppliers are one party model, so a business that buys from you
and sells to you has one record and one net position rather than two files that
disagree. Orders move through a status chain from draft to delivered, with the
activity trail attached. When stock runs short, the shortfall becomes a
backorder rather than a deleted line, and the arriving purchase order is what
releases it.

**Screenshots:** sales order list · order detail · credit hold queue

### Tab 2 — POS till

**Heading:** The counter

The counter is a different job. It is fast, it is public, and the queue is
watching. The till is built for a keyboard and a scanner: search or scan into
the cart, take payment on a function key, done.

Payment is split across as many tenders as the customer wants to use, with
change due calculated as each one is entered. A sale can be parked mid-basket
when somebody goes back for another item, and recalled at any till. Returns are
handled at the counter against the original sale, so the stock goes back to the
right place and the credit posts to the right account. At the end of a shift the
till runs an X report without closing, or a Z report that closes the register
and shows the variance between counted cash and expected cash.

**Screenshots:** POS till with a live cart · tender dialog · register close

### Tab 3 — Online store

**Heading:** The storefront

The storefront sells the same catalogue at retail prices to whoever finds it.
Products, categories and images come from the same product records the trade
desk uses; the price comes from the retail price list rather than the trade one,
so consumer pricing and wholesale pricing never have to be reconciled by hand.

Online stock is drawn from the same pool as everything else, so the storefront
cannot sell what the counter has just sold. Orders arrive in the same order
queue the trade desk works from, and are picked, packed and dispatched by the
same people through the same screens. Customers track their own order and start
their own return without a phone call.

**Screenshots:** storefront · product page · online order in the back office

---

## 5 — Full feature grid

**Heading:** What is in the system

**Intro:** Around 120 screens. This is the whole of it, not a selection.

**Inventory**
Products · categories · brands · units of measure · stock levels · stock
movements · adjustments · branch transfers · warehouses · price lists

**Purchasing**
Purchase orders · goods receipts · purchase invoices · purchase returns ·
supplier ledger

**Sales**
Sales orders · invoices · sales returns · credit holds · backorders · online
orders

**Accounting**
Chart of accounts · journal entries · vouchers · expenses · general ledger ·
trial balance · profit and loss · balance sheet · cash flow · bank
reconciliation · period close · Zakat

**Reports**
A library of 19 reports — sales summary, sales by product, sales by
salesperson, top customers, sales trends, purchase summary, inventory
valuation, slow moving, dead stock, stock movements, AR and AP aging, customer
statements, supplier ledgers, and the financial statements

**Administration**
Users · roles and permissions · branches · audit log · backup and restore ·
notification templates

---

## 6 — Try it

**Heading:** Open it and look around

**Body:**
There is no form in front of the demo. Sign in with the account printed on the
sign-in page and every screen is open — enter an order, take a payment at the
till, buy something from the storefront, run the trial balance. The data is
fabricated and nothing you type is kept.

**CTA:** Open the system →

**Screenshot:** sign-in screen

---

## 7 — Under the hood (collapsible)

**Heading:** Under the hood

For anyone evaluating the engineering rather than the workflow.

The application is TypeScript throughout — a Next.js front end over a NestJS
API, with PostgreSQL underneath and Prisma between them. Every screen is typed
against the same contract the API publishes, so a field cannot quietly mean two
different things in two places.

Access is by role, and the permission matrix is granular enough to keep a
counter user out of the ledger and a branch user out of another branch's
figures. Actions that change money or stock are written to an audit log with the
user, the time and the before-and-after. Backup and restore are in the admin
area rather than in somebody's cron job.

It is built to run on your own infrastructure or on ours.

---

## 8 — Why it is different from an off-the-shelf suite

**Heading:** Against an off-the-shelf suite

**Body:**
A general ERP suite is built to be configured into any business, which is why
implementing one is a project of its own. The modules are broad, the parts you
need are spread across several of them, and the parts you do not need are still
in front of your staff every day. What you adapt is your operation, and you keep
adapting it for as long as you own the software.

Corewell Trade starts from the opposite end. It is a distribution system with
the counter and the storefront already in it, so the three channels are not an
integration project. Where it does not match how you work, it is changed — the
source is ours to change, and the system belongs to the business running it.

**Links out:**
- Odoo alternatives — when a custom ERP makes sense
- Wholesale distribution software — what it should do
- What is an online POS system

---

## 9 — Who it is for

**Heading:** Who it is for

- **Wholesale distributors** — selling on account, on credit terms, from stock.
- **Importers and traders** — long lead times, landed cost, and money tied up
  in stock that has not arrived yet.
- **Multi-branch retailers** — several counters and warehouses that need to
  behave as one business.
- **Businesses selling both trade and direct** — the same catalogue at two
  prices, without two systems.

---

## 10 — FAQ

**Is this one system or three products?**
One system. The trade desk, the till and the storefront are three interfaces
over the same catalogue, the same stock and the same ledger. Nothing is
synchronised between them because there is nothing to synchronise.

**Does the online store share stock with the counter?**
Yes. Every channel draws from the same stock pool, so a unit sold at the counter
is no longer available online, and an online order reduces what the trade desk
can promise.

**Can it run more than one branch or warehouse?**
Yes. Stock is held per warehouse, branches transfer between each other, and
users can be scoped to a branch. Reporting can be read per branch or across all
of them.

**How does credit control work?**
Credit is checked when the order is entered. An order that would take a customer
past their limit is held and queued for whoever has authority to release it,
rather than being discovered at invoicing.

**Is the accounting real, or does it export to something else?**
It is real double-entry accounting inside the system — chart of accounts,
journals, vouchers, general ledger, trial balance, profit and loss, balance
sheet, cash flow, bank reconciliation and period close. Sales, purchases and
till takings post to it as they happen.

**Can we use our existing barcode scanners?**
The till reads barcodes through its search field, which is how a keyboard-wedge
scanner — the common counter type — sends them.

**What happens to the products, customers and balances we already have?**
They are migrated as part of the implementation. Existing product records,
parties and opening balances are brought across so the system starts from where
the business actually is.

**Can it be changed to fit how we work?**
Yes — that is the point of it. Corewell Trade is built and maintained by us, so
a process that differs from the default becomes a change to the software rather
than a workaround your staff perform every day.

**Where does it run?**
On your own infrastructure or on cloud infrastructure we manage, with backup and
restore built into the admin area either way.

**What does it cost?**
It depends on the size of the operation, the number of branches, and how much of
it you need changed. Book a consultation and you will get a scoped figure rather
than a range.

---

## 11 — Closing CTA band

**Heading:** One system for the whole operation

**Body:** Tell us how your business sells today, and we will tell you honestly
whether this fits.

**Primary CTA:** Book a Consultation
**Secondary CTA:** Open the system →

---

## Open questions for the owner

1. **The screenshots carry regional signals.** The demo's sample data uses PKR,
   branch names of real cities, local phone numbers, and the tender dialog
   offers Easypaisa and JazzCash. The copy makes no geographic claim, but the
   images do. Options: leave as is, reseed the demo with neutral currency and
   place names, or crop tighter. Needs a decision before publish.

2. **"Around 120 screens"** — used in §5. It is a count of routes in the app,
   which is verifiable, but say the word if you would rather the page carried no
   number at all.

3. **Migration answer in the FAQ.** "They are migrated as part of the
   implementation" is a commitment about scope of work. Confirm it, or it comes
   out.

4. **Deployment answer in the FAQ.** Same — "on your own infrastructure or on
   cloud infrastructure we manage" needs to be true of how you want to sell it.

5. **Barcode scanner answer.** Written narrowly (keyboard-wedge scanners typing
   into a search field) to avoid claiming hardware integration that does not
   exist. Confirm that is the honest version.

6. **Nav item.** The nav's `Demo` currently points at the subdomain. Once this
   page exists it probably should point here, with the page's own CTA going to
   the app.

7. **Publish timing.** The page is written as product marketing with no
   prototype hedging, which is only accurate once the backend is live. Confirm
   it is live before this goes out.
