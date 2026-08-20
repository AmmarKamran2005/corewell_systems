"use client";

import { useState } from "react";
import {
  DemoEntry,
  DemoFrame,
  PanelHeading,
  Pill,
  StatCard,
} from "@/components/demo/primitives";
import { HospitalityBooking } from "@/components/demo/HospitalityBooking";
import {
  demoFolios,
  demoListings,
  demoOwners,
  demoPlatformStats,
  demoReservations,
  demoRooms,
  demoWeeklyReport,
  folioTotal,
  hospitalityRoles,
  roomStatusLabels,
  type DemoRoom,
  type HospitalityRole,
  type RoomStatus,
} from "@/lib/demo/hospitality";
import { cn } from "@/lib/utils";

const statusTone: Record<
  RoomStatus,
  { pill: "green" | "amber" | "rose" | "gray" | "accent"; card: string }
> = {
  occupied: { pill: "accent", card: "border-accent/40 bg-accent/5" },
  "due-out": { pill: "amber", card: "border-amber-600/40 bg-amber-600/5" },
  "vacant-clean": { pill: "green", card: "border-emerald-600/40 bg-emerald-600/5" },
  "vacant-dirty": { pill: "rose", card: "border-rose-600/40 bg-rose-600/5" },
  "out-of-service": { pill: "gray", card: "border-line bg-canvas-subtle" },
};

const roleLabels: Record<HospitalityRole, string> = {
  guest: "Guest",
  manager: "Property Manager",
  frontdesk: "Front Desk",
  housekeeping: "Housekeeping",
  platform: "Platform Operator",
};

type View =
  | "book"
  | "rooms"
  | "reservations"
  | "folios"
  | "reports"
  | "owners"
  | "listings";

/**
 * Sandboxed Hospitality Management System demo — spec Section 6. Read-mostly:
 * the only mutation is housekeeping marking rooms clean (in-memory, resets on
 * reload). Roles shape both navigation and what a tap on a room reveals.
 */
export function HospitalityDemo({ exitHref }: { exitHref: string }) {
  const [role, setRole] = useState<HospitalityRole | null>(null);
  const [view, setView] = useState<View>("rooms");
  const [rooms, setRooms] = useState(demoRooms);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  if (!role) {
    return (
      <DemoEntry
        label="Hospitality Management System — Interactive Demo"
        blurb="Two sides of the same platform: book a stay as a guest, then run the property — or the marketplace above it."
        roles={hospitalityRoles}
        onSelect={(id) => {
          const next = id as HospitalityRole;
          setRole(next);
          setView(
            next === "guest" ? "book" : next === "platform" ? "owners" : "rooms"
          );
        }}
        exitHref={exitHref}
      />
    );
  }

  const nav: { id: View; label: string }[] =
    role === "guest"
      ? [{ id: "book", label: "Book a stay" }]
      : role === "platform"
        ? [
            { id: "owners", label: "Property owners" },
            { id: "listings", label: "Listings" },
            { id: "reports", label: "Platform revenue" },
          ]
        : role === "housekeeping"
          ? [{ id: "rooms", label: "Room board" }]
          : [
              { id: "rooms", label: "Room board" },
              { id: "reservations", label: "Reservations" },
              { id: "folios", label: "Guest folios" },
              ...(role === "manager"
                ? [{ id: "reports" as View, label: "Reports" }]
                : []),
            ];

  const markClean = (number: string) => {
    setRooms((current) =>
      current.map((room) =>
        room.number === number
          ? { ...room, status: "vacant-clean" as RoomStatus }
          : room
      )
    );
  };

  const sellable = rooms.filter((r) => r.status === "vacant-clean").length;
  const needsCleaning = rooms.filter((r) => r.status === "vacant-dirty").length;
  const occupied = rooms.filter(
    (r) => r.status === "occupied" || r.status === "due-out"
  ).length;

  const activeRoom: DemoRoom | undefined = rooms.find(
    (r) => r.number === selectedRoom
  );

  return (
    <DemoFrame
      title="Hospitality Management System"
      roleLabel={roleLabels[role]}
      onSwitchRole={() => {
        setRole(null);
        setSelectedRoom(null);
      }}
      exitHref={exitHref}
      nav={nav}
      activeView={view}
      onNavigate={(id) => setView(id as View)}
    >
      {view === "book" && role === "guest" && <HospitalityBooking />}

      {view === "owners" && role === "platform" && (
        <div>
          <PanelHeading>Property owners</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            A listing goes public only when every condition is met — documents
            verified, subscription active, payouts connected.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <StatCard
              label="Owners"
              value={String(demoPlatformStats.ownersOnboarded)}
              hint="Onboarded"
            />
            <StatCard
              label="Live listings"
              value={String(demoPlatformStats.activeListings)}
              hint="Publicly visible"
            />
            <StatCard
              label="Bookings"
              value={String(demoPlatformStats.bookingsThisMonth)}
              hint="This month"
            />
            <StatCard
              label="Platform fees"
              value={`$${demoPlatformStats.platformFees.toLocaleString("en-US")}`}
              hint="Collected this month"
            />
          </div>
          <div className="mt-5 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <thead className="bg-canvas-subtle text-xs uppercase tracking-wider text-faint">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Owner</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Properties</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Documents</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Subscription</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Payouts</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {demoOwners.map((owner) => (
                  <tr key={owner.id}>
                    <td className="px-4 py-3">
                      <span className="font-medium text-ink">{owner.name}</span>
                      <span className="block text-xs text-faint">
                        {owner.id}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-soft">{owner.properties}</td>
                    <td className="px-4 py-3">
                      <Pill tone={owner.documents === "verified" ? "green" : "amber"}>
                        {owner.documents === "verified" ? "Verified" : "Pending"}
                      </Pill>
                    </td>
                    <td className="px-4 py-3">
                      <Pill tone={owner.subscription === "active" ? "green" : "rose"}>
                        {owner.subscription === "active" ? "Active" : "Past due"}
                      </Pill>
                    </td>
                    <td className="px-4 py-3">
                      <Pill tone={owner.payouts === "connected" ? "green" : "gray"}>
                        {owner.payouts === "connected" ? "Connected" : "Not set up"}
                      </Pill>
                    </td>
                    <td className="px-4 py-3 text-ink">
                      ${owner.monthRevenue.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-xl border border-line bg-canvas p-4 text-xs leading-relaxed text-soft">
            When a subscription lapses, the platform withdraws that
            owner&apos;s listings automatically and restores them when payment
            succeeds — driven by the payment provider&apos;s own events.
          </p>
        </div>
      )}

      {view === "listings" && role === "platform" && (
        <div>
          <PanelHeading>Listings</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Every property across the marketplace, with the rating guests
            actually left after staying.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {demoListings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-xl border border-line bg-canvas p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {listing.name}
                    </p>
                    <p className="text-xs text-soft">
                      {listing.kind} · {listing.city}
                    </p>
                  </div>
                  <Pill tone="green">Live</Pill>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs">
                  <span className="text-soft">
                    ★ {listing.rating} · {listing.reviews} reviews
                  </span>
                  <span className="font-medium text-ink">
                    from ${listing.fromRate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "reports" && role === "platform" && (
        <div>
          <PanelHeading>Platform revenue</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Owner subscriptions and per-booking fees — read from the payment
            provider rather than local records, so the ledger and the bank
            agree.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Platform fees"
              value={`$${demoPlatformStats.platformFees.toLocaleString("en-US")}`}
              hint="This month"
            />
            <StatCard
              label="Bookings"
              value={String(demoPlatformStats.bookingsThisMonth)}
              hint="Across all properties"
            />
            <StatCard
              label="Subscriptions"
              value={`${demoOwners.filter((o) => o.subscription === "active").length} / ${demoOwners.length}`}
              hint="Owners in good standing"
            />
          </div>
          <div className="mt-5 rounded-xl border border-line bg-canvas p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              Revenue by owner
            </p>
            <ul className="mt-3 space-y-3">
              {demoOwners
                .filter((o) => o.monthRevenue > 0)
                .map((owner) => {
                  const max = Math.max(
                    ...demoOwners.map((o) => o.monthRevenue)
                  );
                  return (
                    <li key={owner.id}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink">{owner.name}</span>
                        <span className="font-medium text-ink">
                          ${owner.monthRevenue.toLocaleString("en-US")}
                        </span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                        <div
                          className="h-full rounded-full bg-accent/70"
                          style={{
                            width: `${(owner.monthRevenue / max) * 100}%`,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}

      {view === "rooms" && role !== "guest" && role !== "platform" && (
        <div>
          <PanelHeading>Room board</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            {role === "housekeeping"
              ? "Tap a room that needs cleaning and mark it ready — the front desk sees it instantly."
              : "The live picture of the property. Green rooms are sellable right now."}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <StatCard label="Sellable now" value={String(sellable)} hint="Vacant and clean" />
            <StatCard label="Occupied" value={String(occupied)} hint="Including due-outs" />
            <StatCard label="Needs cleaning" value={String(needsCleaning)} hint="Housekeeping queue" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {rooms.map((room) => (
              <button type="button"
                key={room.number}
                onClick={() =>
                  setSelectedRoom(
                    selectedRoom === room.number ? null : room.number
                  )
                }
                aria-pressed={selectedRoom === room.number}
                className={cn(
                  "rounded-xl border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  statusTone[room.status].card,
                  selectedRoom === room.number && "ring-2 ring-accent/50"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">
                    {room.number}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-faint">
                    {room.type}
                  </span>
                </div>
                <div className="mt-2">
                  <Pill tone={statusTone[room.status].pill}>
                    {roomStatusLabels[room.status]}
                  </Pill>
                </div>
              </button>
            ))}
          </div>

          {activeRoom && (
            <div className="mt-5 rounded-xl border border-line bg-canvas p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Room {activeRoom.number} — {activeRoom.type}
                  </p>
                  <p className="mt-1 text-xs text-soft">
                    {roomStatusLabels[activeRoom.status]}
                    {activeRoom.guest &&
                      role !== "housekeeping" &&
                      ` · Guest: ${activeRoom.guest}`}
                    {activeRoom.note && ` · ${activeRoom.note}`}
                  </p>
                </div>
                {activeRoom.status === "vacant-dirty" &&
                  role !== "frontdesk" && (
                    <button type="button"
                      onClick={() => markClean(activeRoom.number)}
                      className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-strong"
                    >
                      Mark clean
                    </button>
                  )}
              </div>
            </div>
          )}
        </div>
      )}

      {view === "reservations" && role !== "housekeeping" && (
        <div>
          <PanelHeading>Reservations</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Arrivals and departures for today and tomorrow.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-canvas-subtle text-xs uppercase tracking-wider text-faint">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Ref</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Guest</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Room</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">When</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Nights</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {demoReservations.map((res) => (
                  <tr key={res.id}>
                    <td className="px-4 py-3 font-medium text-ink">{res.id}</td>
                    <td className="px-4 py-3 text-ink">{res.guest}</td>
                    <td className="px-4 py-3 text-soft">
                      {res.room ?? `${res.roomType} (to assign)`}
                    </td>
                    <td className="px-4 py-3 text-soft">{res.when}</td>
                    <td className="px-4 py-3 text-soft">{res.nights}</td>
                    <td className="px-4 py-3">
                      <Pill
                        tone={res.status === "checked-in" ? "accent" : "gray"}
                      >
                        {res.status === "checked-in" ? "Checked in" : "Confirmed"}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "folios" && role !== "housekeeping" && (
        <div>
          <PanelHeading>Guest folios</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Charges accumulate through the stay — checkout is a review, not a
            reconstruction.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {demoFolios.map((folio) => (
              <div
                key={folio.id}
                className="rounded-xl border border-line bg-canvas p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">
                    {folio.guest}
                  </p>
                  <span className="text-xs text-faint">Room {folio.room}</span>
                </div>
                <p className="mt-0.5 text-xs text-soft">
                  {folio.id} · {folio.nights}{" "}
                  {folio.nights === 1 ? "night" : "nights"}
                </p>
                <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                  {folio.charges.map((charge) => (
                    <li
                      key={charge.item}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-soft">{charge.item}</span>
                      <span className="font-medium text-ink">
                        ${charge.amount}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
                  <span className="font-medium text-ink">Total</span>
                  <span className="font-semibold text-ink-strong">
                    ${folioTotal(folio)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "reports" && role === "manager" && (
        <div>
          <PanelHeading>This week</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            The numbers, without anyone compiling them.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Occupancy"
              value={`${demoWeeklyReport.occupancyPct}%`}
              hint="Week to date"
            />
            <StatCard
              label="Room revenue"
              value={`$${demoWeeklyReport.revenue.toLocaleString("en-US")}`}
              hint="Week to date"
            />
            <StatCard
              label="Average rate"
              value={`$${demoWeeklyReport.avgRate}`}
              hint="Per occupied room"
            />
          </div>
          <div className="mt-6 rounded-xl border border-line bg-canvas p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              Revenue by room type
            </p>
            <ul className="mt-3 space-y-3">
              {demoWeeklyReport.byType.map((row) => {
                const max = Math.max(
                  ...demoWeeklyReport.byType.map((r) => r.revenue)
                );
                return (
                  <li key={row.type}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink">{row.type}</span>
                      <span className="font-medium text-ink">
                        ${row.revenue.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                      <div
                        className="h-full rounded-full bg-accent/70"
                        style={{ width: `${(row.revenue / max) * 100}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </DemoFrame>
  );
}
