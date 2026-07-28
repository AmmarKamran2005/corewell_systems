"use client";

import { useState } from "react";
import { PanelHeading, Pill } from "@/components/demo/primitives";
import {
  DEMO_TAX_RATE,
  demoListings,
  offersFor,
  type DemoListing,
} from "@/lib/demo/hospitality";
import { cn } from "@/lib/utils";

type Stage = "search" | "property" | "review" | "payment" | "confirmed";

const stageOrder: { id: Stage; label: string }[] = [
  { id: "search", label: "Search" },
  { id: "property", label: "Choose rooms" },
  { id: "review", label: "Review" },
  { id: "payment", label: "Pay" },
  { id: "confirmed", label: "Confirmed" },
];

/**
 * The guest side of the booking platform, on sample data: search a
 * destination, pick rooms and nights, see the total before paying, pay, and
 * receive a confirmation.
 *
 * No card is charged and no payment provider is contacted — the payment
 * step is a scripted pause. In the production platform the payment is
 * verified with the provider before the booking is written, and the guest's
 * funds route to the property owner's own account.
 */
export function HospitalityBooking() {
  const [stage, setStage] = useState<Stage>("search");
  const [city, setCity] = useState("All destinations");
  const [listing, setListing] = useState<DemoListing | null>(null);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [paying, setPaying] = useState(false);

  const cities = [
    "All destinations",
    ...Array.from(new Set(demoListings.map((l) => l.city))),
  ];
  const results =
    city === "All destinations"
      ? demoListings
      : demoListings.filter((l) => l.city === city);

  const offers = listing ? offersFor(listing.id) : [];
  const selected = offers.filter((o) => (cart[o.id] ?? 0) > 0);
  const roomsChosen = selected.reduce((n, o) => n + cart[o.id], 0);
  const capacity = selected.reduce((n, o) => n + o.sleeps * cart[o.id], 0);
  const subtotal = selected.reduce(
    (sum, o) => sum + o.rate * cart[o.id] * nights,
    0
  );
  const tax = Math.round(subtotal * DEMO_TAX_RATE);
  const total = subtotal + tax;
  const overCapacity = roomsChosen > 0 && guests > capacity;

  const stageIndex = stageOrder.findIndex((s) => s.id === stage);

  const setQty = (offerId: string, delta: number, max: number) => {
    setCart((current) => {
      const next = Math.min(max, Math.max(0, (current[offerId] ?? 0) + delta));
      return { ...current, [offerId]: next };
    });
  };

  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setStage("confirmed");
    }, 1400);
  };

  const restart = () => {
    setStage("search");
    setListing(null);
    setCart({});
    setNights(2);
    setGuests(2);
  };

  return (
    <div>
      {/* Journey rail */}
      <nav aria-label="Booking steps" className="overflow-x-auto">
        <ol className="flex min-w-max items-center gap-2">
          {stageOrder.map((s, index) => {
            const done = index < stageIndex;
            const active = index === stageIndex;
            return (
              <li key={s.id} className="flex items-center gap-2">
                <span
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
                    active
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : done
                        ? "border-emerald-600/30 bg-emerald-600/5 text-emerald-700"
                        : "border-line bg-surface text-faint"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem]",
                      done
                        ? "bg-emerald-600 text-white"
                        : active
                          ? "bg-accent text-white"
                          : "bg-canvas-subtle text-faint"
                    )}
                  >
                    {done ? "✓" : index + 1}
                  </span>
                  {s.label}
                </span>
                {index < stageOrder.length - 1 && (
                  <span aria-hidden className="h-px w-4 bg-line" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-6">
        {stage === "search" && (
          <div>
            <PanelHeading>Find a place to stay</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              The public side of the platform — what a guest sees before they
              have an account.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                    city === c
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-line bg-surface text-soft hover:text-ink"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <ul className="mt-5 grid gap-4 lg:grid-cols-3">
              {results.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => {
                      setListing(l);
                      setCart({});
                      setStage("property");
                    }}
                    className="flex h-full w-full flex-col rounded-xl border border-line bg-canvas p-4 text-left transition-colors hover:border-accent/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {l.name}
                        </p>
                        <p className="text-xs text-soft">
                          {l.kind} · {l.city}
                        </p>
                      </div>
                      <Pill tone="accent">★ {l.rating}</Pill>
                    </div>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-soft">
                      {l.blurb}
                    </p>
                    <div className="mt-3 flex items-end justify-between border-t border-line pt-3">
                      <span className="text-xs text-faint">
                        {l.reviews} verified reviews
                      </span>
                      <span className="text-sm font-semibold text-ink-strong">
                        from ${l.fromRate}
                        <span className="text-xs font-normal text-soft">
                          {" "}
                          / night
                        </span>
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {stage === "property" && listing && (
          <div>
            <button
              onClick={() => setStage("search")}
              className="text-xs font-medium text-accent hover:text-accent-strong"
            >
              ← All results
            </button>
            <PanelHeading>
              <span className="mt-3 block">{listing.name}</span>
            </PanelHeading>
            <p className="mt-1 text-xs text-soft">
              {listing.kind} · {listing.city} · ★ {listing.rating} (
              {listing.reviews} verified reviews)
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {listing.amenities.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-soft"
                >
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_16rem]">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  Available rooms
                </p>
                <ul className="mt-3 space-y-2">
                  {offers.map((offer) => {
                    const qty = cart[offer.id] ?? 0;
                    return (
                      <li
                        key={offer.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-canvas p-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-ink">
                            {offer.type}
                          </p>
                          <p className="text-xs text-soft">
                            Sleeps {offer.sleeps} · {offer.left} left ·{" "}
                            <span className="text-ink">${offer.rate}</span> /
                            night
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty(offer.id, -1, offer.left)}
                            disabled={qty === 0}
                            aria-label={`Remove one ${offer.type}`}
                            className="h-7 w-7 rounded-full border border-line text-sm text-ink disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm tabular-nums text-ink">
                            {qty}
                          </span>
                          <button
                            onClick={() => setQty(offer.id, 1, offer.left)}
                            disabled={qty >= offer.left}
                            aria-label={`Add one ${offer.type}`}
                            className="h-7 w-7 rounded-full border border-line text-sm text-ink disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <aside className="rounded-xl border border-line bg-canvas p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  Your stay
                </p>
                <label className="mt-3 block text-xs text-soft">
                  Nights
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={nights}
                    onChange={(e) =>
                      setNights(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="mt-3 block text-xs text-soft">
                  Guests
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={guests}
                    onChange={(e) =>
                      setGuests(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
                  />
                </label>

                {overCapacity && (
                  <p className="mt-3 rounded-lg border border-amber-600/30 bg-amber-600/5 p-2.5 text-xs leading-relaxed text-amber-700">
                    Those rooms sleep {capacity}. Add another room or reduce
                    the party.
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
                  <span className="text-soft">Subtotal</span>
                  <span className="font-semibold text-ink-strong">
                    ${subtotal}
                  </span>
                </div>
                <button
                  onClick={() => setStage("review")}
                  disabled={roomsChosen === 0 || overCapacity}
                  className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-45"
                >
                  Continue
                </button>
              </aside>
            </div>
          </div>
        )}

        {stage === "review" && listing && (
          <div>
            <button
              onClick={() => setStage("property")}
              className="text-xs font-medium text-accent hover:text-accent-strong"
            >
              ← Change rooms
            </button>
            <PanelHeading>
              <span className="mt-3 block">Review your booking</span>
            </PanelHeading>
            <div className="mt-4 max-w-xl rounded-xl border border-line bg-canvas p-5">
              <p className="text-sm font-semibold text-ink">{listing.name}</p>
              <p className="text-xs text-soft">
                {listing.city} · {nights}{" "}
                {nights === 1 ? "night" : "nights"} · {guests}{" "}
                {guests === 1 ? "guest" : "guests"}
              </p>
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {selected.map((offer) => (
                  <li
                    key={offer.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-soft">
                      {offer.type} × {cart[offer.id]} × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </span>
                    <span className="text-ink">
                      ${offer.rate * cart[offer.id] * nights}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-soft">Subtotal</span>
                  <span className="text-ink">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft">Tax (13%)</span>
                  <span className="text-ink">${tax}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-base">
                  <span className="font-medium text-ink">Total</span>
                  <span className="font-semibold text-ink-strong">
                    ${total}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setStage("payment")}
                className="mt-5 w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
              >
                Continue to payment
              </button>
            </div>
          </div>
        )}

        {stage === "payment" && listing && (
          <div>
            <PanelHeading>Payment</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              No card is charged and no payment provider is contacted — this
              step is simulated.
            </p>
            <div className="mt-4 max-w-md rounded-xl border border-line bg-canvas p-5">
              <div className="space-y-3">
                <label className="block text-xs text-soft">
                  Card number
                  <input
                    readOnly
                    value="4242 4242 4242 4242"
                    className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-mono text-sm text-faint"
                  />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-xs text-soft">
                    Expiry
                    <input
                      readOnly
                      value="12 / 30"
                      className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-mono text-sm text-faint"
                    />
                  </label>
                  <label className="block text-xs text-soft">
                    CVC
                    <input
                      readOnly
                      value="•••"
                      className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-mono text-sm text-faint"
                    />
                  </label>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="text-soft">Amount</span>
                <span className="font-semibold text-ink-strong">${total}</span>
              </div>
              <button
                onClick={pay}
                disabled={paying}
                className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
              >
                {paying ? "Confirming payment…" : `Pay $${total}`}
              </button>
              <p className="mt-3 text-[0.7rem] leading-relaxed text-faint">
                In production the payment is verified with the provider —
                status, exact amount, and destination — before the booking is
                written, and the funds route to the property owner&apos;s own
                account.
              </p>
            </div>
          </div>
        )}

        {stage === "confirmed" && listing && (
          <div>
            <PanelHeading>Booking confirmed</PanelHeading>
            <div className="mt-4 max-w-xl rounded-xl border border-emerald-600/30 bg-emerald-600/5 p-5">
              <p className="text-sm font-semibold text-emerald-700">
                Confirmation CONF-20871
              </p>
              <p className="mt-2 text-sm text-ink">
                {listing.name} · {listing.city}
              </p>
              <p className="mt-1 text-xs text-soft">
                {roomsChosen} {roomsChosen === 1 ? "room" : "rooms"} · {nights}{" "}
                {nights === 1 ? "night" : "nights"} · {guests}{" "}
                {guests === 1 ? "guest" : "guests"} · ${total} paid
              </p>
              <ul className="mt-4 space-y-1.5 border-t border-emerald-600/20 pt-4 text-xs text-soft">
                <li>· Confirmation email and invoice sent to the guest</li>
                <li>· The property owner is notified and the rooms are held</li>
                <li>· Those nights are now removed from public availability</li>
                <li>· After checkout, a review invitation is sent automatically</li>
              </ul>
              <button
                onClick={restart}
                className="mt-5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                Book another stay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
