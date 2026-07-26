/**
 * Seeded sample data for the Hospitality Management System demo — spec
 * Section 6. All records are fabricated demo content for the sandboxed
 * environment. Deterministic — no Date.now / randomness.
 */

export type HospitalityRole = "manager" | "frontdesk" | "housekeeping";

export const hospitalityRoles: {
  id: HospitalityRole;
  label: string;
  description: string;
}[] = [
  {
    id: "manager",
    label: "Login as Manager",
    description: "The whole property — rooms, reservations, and reports.",
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
