/**
 * Corewell Trade — content for the /trade product page.
 *
 * Kept out of the page component for the same reason as `industries.ts`: the
 * copy is reviewed by the owner and the markup is not, so the two should not
 * be edited in the same place. Every capability listed here exists as a screen
 * in the system — nothing is aspirational, and no counts, outcomes or customer
 * claims appear anywhere in this file (spec Section 7).
 */

export type Channel = {
  id: string;
  tab: string;
  heading: string;
  lede: string;
  body: string[];
  /** Screens shown beside the copy, in the order a visitor should read them. */
  shots: { src: string; alt: string; caption: string }[];
};

export const channels: Channel[] = [
  {
    id: "trade-desk",
    tab: "Trade desk",
    heading: "The trade desk",
    lede: "Selling on account, where the risk is the balance behind the order.",
    body: [
      "A distribution business sells on credit terms, and the exposure is not the order — it is the balance behind it. Corewell Trade checks credit at the moment the order is entered, not at invoicing when the stock is already on a vehicle. An order that takes a customer past their limit stops and goes to a credit hold queue, where whoever carries that authority can see the exposure and release it or hold it.",
      "Customers and suppliers are one party model, so a business that buys from you and sells to you has one record and one net position rather than two files that disagree. Orders move through a status chain from draft to delivered with the activity trail attached. When stock runs short the shortfall becomes a backorder rather than a deleted line, and the arriving purchase order is what releases it.",
    ],
    shots: [
      {
        src: "/trade/sales-orders.png",
        alt: "Sales order list showing order numbers, customers, branches, values and statuses",
        caption: "Order book across every branch",
      },
      {
        src: "/trade/order-detail.png",
        alt: "A single sales order with its status chain, line items, totals and customer panel",
        caption: "One order, draft through delivered",
      },
      {
        src: "/trade/credit-holds.png",
        alt: "Credit hold queue listing orders stopped for exceeding a customer credit limit",
        caption: "The credit hold queue",
      },
    ],
  },
  {
    id: "pos-till",
    tab: "POS till",
    heading: "The counter",
    lede: "Fast, public, and watched by a queue — a different job entirely.",
    body: [
      "The counter is built for a keyboard and a scanner: search or scan into the cart, take payment on a function key, done. Nothing on the till needs a mouse, because at a counter a mouse is the slowest thing in the room.",
      "Payment splits across as many tenders as the customer wants to use, with change due calculated as each one is entered. A sale can be parked mid-basket when somebody goes back for another item, and recalled at any till. Returns are handled at the counter against the original sale, so stock goes back to the right place and the credit posts to the right account. At the end of a shift the till runs an X report without closing, or a Z report that closes the register and shows the variance between counted cash and expected cash.",
    ],
    shots: [
      {
        src: "/trade/pos-till.png",
        alt: "Point-of-sale till with a product grid, barcode search and a three-line cart",
        caption: "Scan or search into the cart",
      },
      {
        src: "/trade/pos-tender.png",
        alt: "Take payment dialog showing total, tendered and balance due with multiple tender methods",
        caption: "Split tender, change due as you go",
      },
      {
        src: "/trade/pos-close.png",
        alt: "Register close screen showing counted cash against expected cash and the variance",
        caption: "Z report and drawer variance",
      },
    ],
  },
  {
    id: "online-store",
    tab: "Online store",
    heading: "The storefront",
    lede: "The same catalogue, at retail, to whoever finds it.",
    body: [
      "Products, categories and images come from the same product records the trade desk uses. The price comes from the retail price list rather than the trade one, so consumer pricing and wholesale pricing never have to be reconciled by hand.",
      "Online stock is drawn from the same pool as everything else, so the storefront cannot sell what the counter has just sold. Orders arrive in the same order queue the trade desk works from, and are picked, packed and dispatched by the same people through the same screens. Customers track their own order and start their own return without a phone call.",
    ],
    shots: [
      {
        src: "/trade/storefront.png",
        alt: "Consumer storefront home page with product categories and featured products",
        caption: "The consumer storefront",
      },
      {
        src: "/trade/store-product.png",
        alt: "Storefront product page with price, availability and add to cart",
        caption: "Retail price list, live availability",
      },
      {
        src: "/trade/online-orders.png",
        alt: "Online orders queue in the back office showing web orders awaiting fulfilment",
        caption: "Web orders in the same queue",
      },
    ],
  },
];

export type FeatureGroup = { name: string; items: string[] };

/**
 * Deliberately complete rather than curated — this is the section a buyer
 * scans for the one module they cannot do without.
 */
export const featureGroups: FeatureGroup[] = [
  {
    name: "Inventory",
    items: [
      "Products",
      "Categories",
      "Brands",
      "Units of measure",
      "Stock levels",
      "Stock movements",
      "Adjustments",
      "Branch transfers",
      "Warehouses",
      "Price lists",
    ],
  },
  {
    name: "Purchasing",
    items: [
      "Purchase orders",
      "Goods receipts",
      "Purchase invoices",
      "Purchase returns",
      "Supplier ledger",
    ],
  },
  {
    name: "Sales",
    items: [
      "Sales orders",
      "Invoices",
      "Sales returns",
      "Credit holds",
      "Backorders",
      "Online orders",
    ],
  },
  {
    name: "Accounting",
    items: [
      "Chart of accounts",
      "Journal entries",
      "Vouchers",
      "Expenses",
      "General ledger",
      "Trial balance",
      "Profit and loss",
      "Balance sheet",
      "Cash flow",
      "Bank reconciliation",
      "Period close",
    ],
  },
  {
    name: "Reports",
    items: [
      "Sales summary",
      "Sales by product",
      "Sales by salesperson",
      "Top customers",
      "Sales trends",
      "Purchase summary",
      "Inventory valuation",
      "Slow moving",
      "Dead stock",
      "AR and AP aging",
      "Customer statements",
      "Supplier ledgers",
    ],
  },
  {
    name: "Administration",
    items: [
      "Users",
      "Roles and permissions",
      "Branches",
      "Audit log",
      "Backup and restore",
      "Notification templates",
    ],
  },
];

export const audiences = [
  {
    name: "Wholesale distributors",
    line: "Selling on account, on credit terms, from stock.",
  },
  {
    name: "Importers and traders",
    line: "Long lead times, landed cost, and money tied up in stock that has not arrived yet.",
  },
  {
    name: "Multi-branch retailers",
    line: "Several counters and warehouses that need to behave as one business.",
  },
  {
    name: "Trade and direct together",
    line: "The same catalogue at two prices, without two systems.",
  },
];

/** Also emitted as FAQPage structured data by `FaqSection`. */
export const tradeFaqs = [
  {
    q: "Is this one system or three products?",
    a: "One system. The trade desk, the till and the storefront are three interfaces over the same catalogue, the same stock and the same ledger. Nothing is synchronised between them because there is nothing to synchronise.",
  },
  {
    q: "Does the online store share stock with the counter?",
    a: "Yes. Every channel draws from the same stock pool, so a unit sold at the counter is no longer available online, and an online order reduces what the trade desk can promise.",
  },
  {
    q: "Can it run more than one branch or warehouse?",
    a: "Yes. Stock is held per warehouse, branches transfer between each other, and users can be scoped to a branch. Reporting can be read per branch or across all of them.",
  },
  {
    q: "How does credit control work?",
    a: "Credit is checked when the order is entered. An order that would take a customer past their limit is held and queued for whoever has authority to release it, rather than being discovered at invoicing when the goods are already loaded.",
  },
  {
    q: "Is the accounting real, or does it export to something else?",
    a: "It is real double-entry accounting inside the system — chart of accounts, journals, vouchers, general ledger, trial balance, profit and loss, balance sheet, cash flow, bank reconciliation and period close. Sales, purchases and till takings post to it as they happen.",
  },
  {
    q: "Can we use our existing barcode scanners?",
    a: "The till reads barcodes through its search field, which is how a keyboard-wedge scanner — the common counter type — sends them.",
  },
  {
    q: "What happens to the products, customers and balances we already have?",
    a: "They are migrated as part of the implementation. Existing product records, parties and opening balances are brought across so the system starts from where the business actually is.",
  },
  {
    q: "Can it be changed to fit how we work?",
    a: "Yes — that is the point of it. Corewell Trade is built and maintained by us, so a process that differs from the default becomes a change to the software rather than a workaround your staff perform every day.",
  },
  {
    q: "Where does it run?",
    a: "On your own infrastructure or on cloud infrastructure we manage, with backup and restore built into the admin area either way.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the size of the operation, the number of branches, and how much of it you need changed. Book a consultation and you will get a scoped figure rather than a range.",
  },
];
