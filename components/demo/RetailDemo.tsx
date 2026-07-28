"use client";

import { useState } from "react";
import {
  DemoEntry,
  DemoFrame,
  PanelHeading,
  Pill,
  StatCard,
} from "@/components/demo/primitives";
import {
  demoBranchReport,
  demoProducts,
  demoSalesToday,
  retailRoles,
  type RetailRole,
} from "@/lib/demo/retail";
import { cn } from "@/lib/utils";

const roleLabels: Record<RetailRole, string> = {
  owner: "Owner",
  manager: "Branch Manager",
  cashier: "Cashier",
};

type View = "pos" | "inventory" | "sales" | "reports";

type CartLine = { sku: string; qty: number };

/**
 * Sandboxed Retail & POS demo — spec Section 6. The POS loop is live:
 * ring up items, complete the sale, and watch inventory and today's sales
 * update instantly (in-memory, resets on reload).
 */
export function RetailDemo({ exitHref }: { exitHref: string }) {
  const [role, setRole] = useState<RetailRole | null>(null);
  const [view, setView] = useState<View>("pos");
  const [products, setProducts] = useState(demoProducts);
  const [sales, setSales] = useState(demoSalesToday);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [lastReceipt, setLastReceipt] = useState<string | null>(null);
  const [receiptCounter, setReceiptCounter] = useState(1009);

  if (!role) {
    return (
      <DemoEntry
        kind="design"
        label="Retail & POS — Design Preview"
        blurb="Try our point-of-sale and inventory design the way staff would use it on the floor."
        roles={retailRoles}
        onSelect={(id) => {
          setRole(id as RetailRole);
          setView("pos");
        }}
        exitHref={exitHref}
      />
    );
  }

  const nav: { id: View; label: string }[] =
    role === "cashier"
      ? [
          { id: "pos", label: "Point of sale" },
          { id: "sales", label: "Today's sales" },
        ]
      : [
          { id: "pos", label: "Point of sale" },
          { id: "inventory", label: "Inventory" },
          { id: "sales", label: "Today's sales" },
          ...(role === "owner"
            ? [{ id: "reports" as View, label: "Reports" }]
            : []),
        ];

  const productBySku = (sku: string) => products.find((p) => p.sku === sku)!;

  const addToCart = (sku: string) => {
    setLastReceipt(null);
    setCart((current) => {
      const line = current.find((l) => l.sku === sku);
      const inCart = line?.qty ?? 0;
      if (productBySku(sku).stock <= inCart) return current;
      return line
        ? current.map((l) => (l.sku === sku ? { ...l, qty: l.qty + 1 } : l))
        : [...current, { sku, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce(
    (sum, line) => sum + productBySku(line.sku).price * line.qty,
    0
  );
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  const completeSale = () => {
    if (cart.length === 0) return;
    const receiptId = `R-${receiptCounter}`;
    setProducts((current) =>
      current.map((p) => {
        const line = cart.find((l) => l.sku === p.sku);
        return line ? { ...p, stock: p.stock - line.qty } : p;
      })
    );
    setSales((current) => [
      ...current,
      {
        id: receiptId,
        time: "Just now",
        items: cartCount,
        total: cartTotal,
        cashier: roleLabels[role],
      },
    ]);
    setReceiptCounter((n) => n + 1);
    setCart([]);
    setLastReceipt(receiptId);
  };

  const lowStock = products.filter((p) => p.stock <= p.lowStockAt);
  const revenueToday = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <DemoFrame
      kind="design"
      title="Retail & POS System"
      roleLabel={roleLabels[role]}
      onSwitchRole={() => {
        setRole(null);
        setCart([]);
        setLastReceipt(null);
      }}
      exitHref={exitHref}
      nav={nav}
      activeView={view}
      onNavigate={(id) => setView(id as View)}
    >
      {view === "pos" && (
        <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
          <div>
            <PanelHeading>Point of sale</PanelHeading>
            <p className="mt-1 text-xs text-soft">
              Tap products to ring them up — stock counts down with every
              completed sale.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {products.map((product) => {
                const inCart =
                  cart.find((l) => l.sku === product.sku)?.qty ?? 0;
                const soldOut = product.stock <= inCart;
                return (
                  <button
                    key={product.sku}
                    onClick={() => addToCart(product.sku)}
                    disabled={soldOut}
                    className={cn(
                      "rounded-xl border border-line bg-canvas p-3 text-left transition-colors hover:border-accent/50",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      soldOut && "opacity-45"
                    )}
                  >
                    <p className="text-sm font-medium leading-snug text-ink">
                      {product.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink-strong">
                        ${product.price}
                      </span>
                      <span className="text-[0.65rem] text-faint">
                        {product.stock - inCart} left
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="rounded-xl border border-line bg-canvas p-4">
            <p className="text-sm font-semibold text-ink">Current sale</p>
            {cart.length === 0 ? (
              lastReceipt ? (
                <div className="mt-4 rounded-lg border border-emerald-600/30 bg-emerald-600/5 p-3">
                  <p className="text-xs font-medium text-emerald-700">
                    Sale completed — receipt {lastReceipt}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-soft">
                    Inventory and today&apos;s sales updated instantly. Check
                    the other tabs.
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-xs leading-relaxed text-soft">
                  No items yet — tap a product to start.
                </p>
              )
            ) : (
              <>
                <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                  {cart.map((line) => {
                    const product = productBySku(line.sku);
                    return (
                      <li
                        key={line.sku}
                        className="flex items-center justify-between gap-2 text-xs"
                      >
                        <span className="text-soft">
                          {product.name} × {line.qty}
                        </span>
                        <span className="font-medium text-ink">
                          ${product.price * line.qty}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
                  <span className="font-medium text-ink">Total</span>
                  <span className="font-semibold text-ink-strong">
                    ${cartTotal}
                  </span>
                </div>
                <button
                  onClick={completeSale}
                  className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
                >
                  Complete sale (${cartTotal})
                </button>
              </>
            )}
          </aside>
        </div>
      )}

      {view === "inventory" && role !== "cashier" && (
        <div>
          <PanelHeading>Inventory</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Counted by the system, not by midnight stocktakes. Low-stock items
            surface themselves.
          </p>
          {lowStock.length > 0 && (
            <div className="mt-4 rounded-xl border border-amber-600/30 bg-amber-600/5 p-3 text-xs text-soft">
              <span className="font-medium text-amber-700">
                {lowStock.length} low-stock alert
                {lowStock.length > 1 ? "s" : ""}:
              </span>{" "}
              {lowStock.map((p) => p.name).join(", ")}
            </div>
          )}
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="bg-canvas-subtle text-xs uppercase tracking-wider text-faint">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">SKU</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Product</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Price</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">In stock</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {products.map((product) => (
                  <tr key={product.sku}>
                    <td className="px-4 py-3 text-soft">{product.sku}</td>
                    <td className="px-4 py-3 font-medium text-ink">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-soft">${product.price}</td>
                    <td className="px-4 py-3 text-ink">{product.stock}</td>
                    <td className="px-4 py-3">
                      <Pill
                        tone={
                          product.stock <= product.lowStockAt
                            ? "amber"
                            : "green"
                        }
                      >
                        {product.stock <= product.lowStockAt
                          ? "Low stock"
                          : "OK"}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "sales" && (
        <div>
          <PanelHeading>Today&apos;s sales</PanelHeading>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <StatCard
              label="Receipts"
              value={String(sales.length)}
              hint="Since opening"
            />
            <StatCard
              label="Revenue today"
              value={`$${revenueToday}`}
              hint="This branch"
            />
          </div>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
            {[...sales].reverse().map((sale) => (
              <li
                key={sale.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{sale.id}</p>
                  <p className="text-xs text-soft">
                    {sale.time} · {sale.items}{" "}
                    {sale.items === 1 ? "item" : "items"} · {sale.cashier}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink-strong">
                  ${sale.total}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === "reports" && role === "owner" && (
        <div>
          <PanelHeading>This week, all branches</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Every branch, one screen — no phone calls at midnight.
          </p>
          <div className="mt-4 rounded-xl border border-line bg-canvas p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              Revenue by branch
            </p>
            <ul className="mt-3 space-y-3">
              {demoBranchReport.branches.map((branch) => {
                const max = Math.max(
                  ...demoBranchReport.branches.map((b) => b.revenue)
                );
                return (
                  <li key={branch.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink">{branch.name}</span>
                      <span className="font-medium text-ink">
                        ${branch.revenue.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                      <div
                        className="h-full rounded-full bg-accent/70"
                        style={{ width: `${(branch.revenue / max) * 100}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4 rounded-xl border border-line bg-canvas p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              Top products this week
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {demoBranchReport.topProducts.map((name) => (
                <li key={name}>
                  <Pill tone="accent">{name}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </DemoFrame>
  );
}
