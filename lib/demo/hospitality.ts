/**
 * Seeded sample data for the Hospitality Management System demo — spec
 * Section 6. All records are fabricated demo content for the sandboxed
 * environment. Deterministic — no Date.now / randomness.
 */

export type HospitalityRole =
  | "guest"
  | "manager"
  | "frontdesk"
  | "housekeeping"
  | "platform";

export const hospitalityRoles: {
  id: HospitalityRole;
  label: string;
  description: string;
}[] = [
  {
    id: "guest",
    label: "Book as a Guest",
    description:
      "The customer journey — search, choose rooms, pay, and get confirmed.",
  },
  {
    id: "frontdesk",
    label: "Login as Front Desk",
    description: "Room board, arrivals, departures, and guest folios.",
  },
  {
    id: "housekeeping",
    label: "Login as Housekeeping",
    description: "Room status list — mark rooms clean as you go.",
  },
  {
    id: "manager",
    label: "Login as Property Manager",
    description: "The whole property — rooms, reservations, and reports.",
  },
  {
    id: "platform",
    label: "Login as Platform Operator",
    description:
      "The marketplace above the properties — owners, listings, and revenue.",
  },
];

export type RoomStatus =
  | "occupied"
  | "due-out"
  | "vacant-clean"
  | "vacant-dirty"
  | "out-of-service";

export type DemoRoom = {
  number: string;
  type: "Standard" | "Deluxe" | "Suite";
  status: RoomStatus;
  guest?: string;
  note?: string;
};

export type DemoReservation = {
  id: string;
  guest: string;
  roomType: "Standard" | "Deluxe" | "Suite";
  room?: string;
  when: "Arriving today" | "Arriving tomorrow" | "Departing today";
  nights: number;
  status: "confirmed" | "checked-in";
};

export type DemoFolio = {
  id: string;
  guest: string;
  room: string;
  nights: number;
  charges: { item: string; amount: number }[];
};

export const roomStatusLabels: Record<RoomStatus, string> = {
  occupied: "Occupied",
  "due-out": "Due out",
  "vacant-clean": "Clean",
  "vacant-dirty": "Needs cleaning",
  "out-of-service": "Out of service",
};

export const demoRooms: DemoRoom[] = [
  { number: "101", type: "Standard", status: "occupied", guest: "Hannah Weber" },
  { number: "102", type: "Standard", status: "vacant-clean" },
  { number: "103", type: "Standard", status: "due-out", guest: "Marcus Lee" },
  { number: "104", type: "Standard", status: "vacant-dirty" },
  { number: "105", type: "Standard", status: "occupied", guest: "Zainab Malik" },
  { number: "106", type: "Standard", status: "vacant-clean" },
  { number: "201", type: "Deluxe", status: "occupied", guest: "Tom Bergström" },
  { number: "202", type: "Deluxe", status: "vacant-dirty" },
  { number: "203", type: "Deluxe", status: "due-out", guest: "Priya Sharma" },
  { number: "204", type: "Deluxe", status: "vacant-clean" },
  { number: "205", type: "Deluxe", status: "out-of-service", note: "AC repair — vendor booked" },
  { number: "206", type: "Deluxe", status: "occupied", guest: "James O'Connor" },
  { number: "301", type: "Suite", status: "occupied", guest: "Ayesha Siddiqui" },
  { number: "302", type: "Suite", status: "vacant-clean" },
  { number: "303", type: "Suite", status: "vacant-dirty" },
  { number: "304", type: "Suite", status: "occupied", guest: "Robert Fields" },
];

export const demoReservations: DemoReservation[] = [
  { id: "R-8841", guest: "Nadia Hussain", roomType: "Deluxe", when: "Arriving today", nights: 3, status: "confirmed" },
  { id: "R-8842", guest: "Chris Taylor", roomType: "Standard", when: "Arriving today", nights: 1, status: "confirmed" },
  { id: "R-8836", guest: "Marcus Lee", roomType: "Standard", room: "103", when: "Departing today", nights: 2, status: "checked-in" },
  { id: "R-8834", guest: "Priya Sharma", roomType: "Deluxe", room: "203", when: "Departing today", nights: 4, status: "checked-in" },
  { id: "R-8845", guest: "Sofia Marino", roomType: "Suite", when: "Arriving tomorrow", nights: 2, status: "confirmed" },
  { id: "R-8846", guest: "Daniel Kim", roomType: "Standard", when: "Arriving tomorrow", nights: 5, status: "confirmed" },
];

export const demoFolios: DemoFolio[] = [
  {
    id: "F-501",
    guest: "Hannah Weber",
    room: "101",
    nights: 2,
    charges: [
      { item: "Room — Standard × 2 nights", amount: 240 },
      { item: "Breakfast × 2", amount: 36 },
      { item: "Laundry", amount: 18 },
    ],
  },
  {
    id: "F-502",
    guest: "Tom Bergström",
    room: "201",
    nights: 3,
    charges: [
      { item: "Room — Deluxe × 3 nights", amount: 510 },
      { item: "Room service", amount: 42 },
    ],
  },
  {
    id: "F-503",
    guest: "Ayesha Siddiqui",
    room: "301",
    nights: 1,
    charges: [
      { item: "Room — Suite × 1 night", amount: 290 },
      { item: "Airport transfer", amount: 55 },
      { item: "Late checkout", amount: 40 },
    ],
  },
];

/** Static weekly report figures for the manager view (sample data). */
export const demoWeeklyReport = {
  occupancyPct: 72,
  revenue: 18460,
  avgRate: 164,
  byType: [
    { type: "Standard", revenue: 6840 },
    { type: "Deluxe", revenue: 7420 },
    { type: "Suite", revenue: 4200 },
  ],
};

export function folioTotal(folio: DemoFolio): number {
  return folio.charges.reduce((sum, charge) => sum + charge.amount, 0);
}

/* ------------------------------------------------------------------ *
 * Guest booking journey — the customer side of the platform:
 * search → property → rooms and dates → payment → confirmation.
 * ------------------------------------------------------------------ */

export type DemoListing = {
  id: string;
  name: string;
  kind: "Hotel" | "Guest House" | "Resort";
  city: string;
  rating: number;
  reviews: number;
  fromRate: number;
  amenities: string[];
  blurb: string;
};

export const demoListings: DemoListing[] = [
  {
    id: "L-01",
    name: "Harbour View Hotel",
    kind: "Hotel",
    city: "Halifax",
    rating: 4.6,
    reviews: 128,
    fromRate: 120,
    amenities: ["Free Wi-Fi", "Breakfast", "Parking", "Gym"],
    blurb:
      "Waterfront rooms a short walk from the boardwalk, with breakfast included.",
  },
  {
    id: "L-02",
    name: "Maple Lane Guest House",
    kind: "Guest House",
    city: "Halifax",
    rating: 4.8,
    reviews: 64,
    fromRate: 95,
    amenities: ["Free Wi-Fi", "Breakfast", "Garden"],
    blurb:
      "A restored heritage home with six rooms and a long shared breakfast table.",
  },
  {
    id: "L-03",
    name: "Cedar Point Resort",
    kind: "Resort",
    city: "Banff",
    rating: 4.4,
    reviews: 211,
    fromRate: 185,
    amenities: ["Free Wi-Fi", "Pool", "Spa", "Parking", "Restaurant"],
    blurb:
      "Mountain-side suites with a spa, a heated pool, and trail access from the door.",
  },
];

export type DemoRoomOffer = {
  id: string;
  listingId: string;
  type: "Standard" | "Deluxe" | "Suite";
  sleeps: number;
  rate: number;
  left: number;
};

export const demoRoomOffers: DemoRoomOffer[] = [
  { id: "RO-1", listingId: "L-01", type: "Standard", sleeps: 2, rate: 120, left: 4 },
  { id: "RO-2", listingId: "L-01", type: "Deluxe", sleeps: 3, rate: 170, left: 2 },
  { id: "RO-3", listingId: "L-01", type: "Suite", sleeps: 4, rate: 240, left: 1 },
  { id: "RO-4", listingId: "L-02", type: "Standard", sleeps: 2, rate: 95, left: 3 },
  { id: "RO-5", listingId: "L-02", type: "Deluxe", sleeps: 3, rate: 130, left: 2 },
  { id: "RO-6", listingId: "L-03", type: "Deluxe", sleeps: 3, rate: 185, left: 5 },
  { id: "RO-7", listingId: "L-03", type: "Suite", sleeps: 5, rate: 320, left: 2 },
];

/** Tax applied at checkout in the demo booking flow. */
export const DEMO_TAX_RATE = 0.13;

export function offersFor(listingId: string): DemoRoomOffer[] {
  return demoRoomOffers.filter((offer) => offer.listingId === listingId);
}

/* ------------------------------------------------------------------ *
 * Platform operator view — the marketplace above the properties.
 * ------------------------------------------------------------------ */

export type DemoOwner = {
  id: string;
  name: string;
  properties: number;
  documents: "verified" | "pending";
  subscription: "active" | "past due";
  payouts: "connected" | "not connected";
  monthRevenue: number;
};

export const demoOwners: DemoOwner[] = [
  {
    id: "OWN-114",
    name: "Harbour Hospitality Ltd.",
    properties: 2,
    documents: "verified",
    subscription: "active",
    payouts: "connected",
    monthRevenue: 18460,
  },
  {
    id: "OWN-118",
    name: "Maple Lane Holdings",
    properties: 1,
    documents: "verified",
    subscription: "active",
    payouts: "connected",
    monthRevenue: 7320,
  },
  {
    id: "OWN-121",
    name: "Cedar Point Group",
    properties: 3,
    documents: "verified",
    subscription: "past due",
    payouts: "connected",
    monthRevenue: 24180,
  },
  {
    id: "OWN-126",
    name: "Riverside Rooms",
    properties: 1,
    documents: "pending",
    subscription: "active",
    payouts: "not connected",
    monthRevenue: 0,
  },
];

export const demoPlatformStats = {
  activeListings: 6,
  ownersOnboarded: 4,
  bookingsThisMonth: 148,
  platformFees: 2940,
};
