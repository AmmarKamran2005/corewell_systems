/**
 * Seeded sample data for the Retail & POS demo — spec Section 6. All records
 * are fabricated demo content. Deterministic — no Date.now / randomness.
 */

export type RetailRole = "owner" | "manager" | "cashier";

export const retailRoles: {
  id: RetailRole;
  label: string;
  description: string;
}[] = [
  {
    id: "owner",
    label: "Login as Owner",
    description: "Every branch — sales, stock, and reports.",
  },
  {
    id: "manager",
    label: "Login as Branch Manager",
    description: "This branch — POS, inventory, and today's sales.",
  },
  {
    id: "cashier",
    label: "Login as Cashier",
    description: "The counter — ring up sales, see today's receipts.",
  },
];

export type DemoProduct = {
  sku: string;
  name: string;
  price: number;
  stock: number;
  lowStockAt: number;
};

export type DemoSale = {
  id: string;
  time: string;
  items: number;
  total: number;
  cashier: string;
};

export const demoProducts: DemoProduct[] = [
  { sku: "TS-001", name: "Green Tea 100g", price: 6, stock: 42, lowStockAt: 10 },
  { sku: "TS-002", name: "Basmati Rice 5kg", price: 14, stock: 18, lowStockAt: 8 },
  { sku: "TS-003", name: "Olive Oil 1L", price: 11, stock: 7, lowStockAt: 8 },
  { sku: "TS-004", name: "Honey 500g", price: 9, stock: 24, lowStockAt: 6 },
  { sku: "TS-005", name: "Almonds 250g", price: 8, stock: 31, lowStockAt: 10 },
  { sku: "TS-006", name: "Dates 400g", price: 7, stock: 5, lowStockAt: 6 },
  { sku: "TS-007", name: "Black Pepper 80g", price: 4, stock: 53, lowStockAt: 12 },
  { sku: "TS-008", name: "Ghee 1kg", price: 16, stock: 12, lowStockAt: 5 },
];

export const demoSalesToday: DemoSale[] = [
  { id: "R-1006", time: "09:12", items: 3, total: 27, cashier: "Areeba" },
  { id: "R-1007", time: "10:05", items: 1, total: 14, cashier: "Areeba" },
  { id: "R-1008", time: "11:38", items: 5, total: 46, cashier: "Areeba" },
];

/** Static weekly figures for the owner report (sample data). */
export const demoBranchReport = {
  branches: [
    { name: "Main Street", revenue: 4820 },
    { name: "City Mall", revenue: 6140 },
    { name: "North Plaza", revenue: 3390 },
  ],
  topProducts: ["Basmati Rice 5kg", "Ghee 1kg", "Almonds 250g"],
};
